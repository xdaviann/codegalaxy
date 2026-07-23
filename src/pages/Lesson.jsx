import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { getLessonById } from '../data/curriculum';
import { CheckCircle2, XCircle, Zap, Flame, Award, Shield, BookOpen, Coins, Sparkles } from 'lucide-react';
import { generateAIFeedback } from '../services/aiService';
import {
  saveRoundProgress,
  awardLessonRewards,
  updateStreak,
  deductHeart,
  checkAndUnlockAchievements,
  ACHIEVEMENTS
} from '../firebase/firestore';
import { useHeartRefill } from '../hooks/useHeartRefill';
import LessonHeader from '../components/lesson/LessonHeader';
import MultipleChoiceExercise from '../components/lesson/MultipleChoiceExercise';
import MultiSelectExercise from '../components/lesson/MultiSelectExercise';
import SequenceExercise from '../components/lesson/SequenceExercise';
import CodeFillExercise from '../components/lesson/CodeFillExercise';
import CodeHighlightExercise from '../components/lesson/CodeHighlightExercise';
import CodeErrorExercise from '../components/lesson/CodeErrorExercise';
import WordBankExercise from '../components/lesson/WordBankExercise';
import CategorizeExercise from '../components/lesson/CategorizeExercise';
import DragSortExercise from '../components/lesson/DragSortExercise';
import CodeTypingExercise from '../components/lesson/CodeTypingExercise';
import ChallengeScreen from '../components/lesson/ChallengeScreen';
import LessonComplete from '../components/lesson/LessonComplete';
import RoundComplete from '../components/lesson/RoundComplete';
import NoHeartsScreen from '../components/lesson/NoHeartsScreen';
import TheoryScreen from '../components/lesson/TheoryScreen';

export default function Lesson() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, userData, progress, loading, refreshUserData } = useAuth();

  // ── Resolve lesson data ───────────────────────────────────────────────────
  const result = getLessonById(id);
  const lessonRounds = result?.lesson?.rounds || [];
  const totalRounds = result?.lesson?.totalRounds ?? lessonRounds.length;

  // ── Which round to show? ──────────────────────────────────────────────────
  // roundsCompleted in Firestore: 0 = none done, 1 = round1 done, 2 = round2 done
  const savedRoundsCompleted = progress?.[id]?.roundsCompleted ?? 0;
  
  // Si ya completó la lección entera, permitimos repetirla empezando desde la ronda 0
  const initialRound = (totalRounds > 0 && savedRoundsCompleted >= totalRounds) ? 0 : savedRoundsCompleted;
  
  const [currentRoundIdx, setCurrentRoundIdx] = useState(initialRound);

  // ── Phase within a round ──────────────────────────────────────────────────
  const [phase, setPhase] = useState('theory'); // 'theory' | 'practice'

  // ── Exercise state ────────────────────────────────────────────────────────
  const [currentExIndex, setCurrentExIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [roundResult, setRoundResult] = useState(null); // { roundNum, coinsEarned, xpEarned, accuracy }
  const [allDone, setAllDone] = useState(false);        // all 3 rounds finished
  const [outOfHearts, setOutOfHearts] = useState(() => (userData?.hearts ?? 5) <= 0);
  const [currentHearts, setCurrentHearts] = useState(() => userData?.hearts ?? 5);
  const [feedbackVisible, setFeedbackVisible] = useState(false);
  const [lastCorrect, setLastCorrect] = useState(null);
  const [feedbackMsg, setFeedbackMsg] = useState(null);
  const [isAiGenerated, setIsAiGenerated] = useState(false);
  const [saving, setSaving] = useState(false);
  const [roundMistakes, setRoundMistakes] = useState(0);
  const [unlockedAchievementsToShow, setUnlockedAchievementsToShow] = useState([]);
  const [showQuitWarning, setShowQuitWarning] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  const { secondsLeft } = useHeartRefill(user, userData, refreshUserData);

  useEffect(() => {
    if (userData?.hearts !== undefined) {
      setCurrentHearts(userData.hearts);
    }
  }, [userData?.hearts]);

  const handleCloseLesson = () => {
    if (currentExIndex > 0) {
      setShowQuitWarning(true);
    } else {
      navigate('/learn');
    }
  };

  if (loading) {
    return (
      <div className="min-h-dvh bg-bg-primary flex items-center justify-center">
        <div className="card p-6 flex items-center gap-3 shadow-card">
          <div className="w-6 h-6 border-2 border-accent border-t-transparent rounded-full animate-spin" />
          <span className="text-text-primary font-semibold text-sm">Cargando lección...</span>
        </div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="min-h-dvh bg-bg-primary flex items-center justify-center">
        <div className="text-center">
          <p className="text-text-secondary font-mono">Lección no encontrada</p>
          <button onClick={() => navigate('/learn')} className="btn-primary mt-4 px-8">Volver</button>
        </div>
      </div>
    );
  }

  const { lesson, module } = result;
  const isChallenge = lesson.type === 'challenge';

  const handleChallengeComplete = (rewards) => {
    const isFirstRoundToday = (() => {
      if (!userData?.lastActivityDate) return true;
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const lastDate = userData.lastActivityDate?.toDate ? userData.lastActivityDate.toDate() : new Date(userData.lastActivityDate);
      lastDate.setHours(0, 0, 0, 0);
      return today.getTime() !== lastDate.getTime();
    })();

    setRoundResult({
      roundNum: 1,
      xpEarned: rewards.xpEarned,
      coinsEarned: rewards.coinsEarned,
      accuracy: 100,
      streakJustIgnited: isFirstRoundToday,
    });
    setAllDone(true);

    if (user) {
      (async () => {
        try {
          const { db, doc, setDoc, updateDoc, increment, serverTimestamp } = await import('../firebase/firestore');
          await setDoc(doc(db, 'users', user.uid, 'progress', lesson.id), {
            lessonId: lesson.id,
            moduleId: module?.id ?? null,
            roundsCompleted: 1,
            completed: true,
            score: 100,
            updatedAt: serverTimestamp(),
          });

          await updateDoc(doc(db, 'users', user.uid), {
            xp: increment(rewards.xpEarned),
            coins: increment(rewards.coinsEarned),
          });

          const newAch = await checkAndUnlockAchievements(user.uid);
          if (newAch && newAch.length > 0) {
            setUnlockedAchievementsToShow(newAch);
          }
          refreshUserData();
        } catch (err) {
          console.error('[Challenge] Error saving progress:', err);
        }
      })();
    }
  };

  // ── Achievements Modal Overlay ────────────────────────────────────────────
  if (unlockedAchievementsToShow.length > 0) {
    const firstAchId = unlockedAchievementsToShow[0];
    const achMeta = ACHIEVEMENTS.find(a => a.id === firstAchId);
    if (achMeta) {
      const AchIcon = { Zap, Flame, Award, Shield, BookOpen }[achMeta.icon] || Award;
      return (
        <div className="fixed inset-0 z-[200] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-bg-secondary rounded-3xl p-6 w-full max-w-sm shadow-card-lg border border-accent/20 text-center animate-scale-in relative overflow-hidden">
            <div className="absolute -inset-10 bg-gradient-radial from-accent/10 via-transparent to-transparent pointer-events-none" />
            <div className={`w-20 h-20 rounded-2xl bg-gradient-to-tr ${achMeta.gradient} text-white mx-auto flex items-center justify-center shadow-accent-sm mb-4`}>
              <AchIcon size={36} className="animate-bounce-slow" />
            </div>
            <p className="text-accent text-[10px] font-mono uppercase tracking-widest mb-1">¡Logro Desbloqueado!</p>
            <h3 className="text-xl font-extrabold text-text-primary mb-1">{achMeta.title}</h3>
            <p className="text-text-muted text-xs px-2 mb-5 leading-normal">{achMeta.description}</p>
            <div className="flex justify-center gap-2 mb-6">
              <span className="text-[10px] font-extrabold bg-indigo-50 text-indigo-600 border border-indigo-100 px-2 py-1 rounded-xl">+{achMeta.xpReward} XP</span>
              <span className="text-[10px] font-extrabold bg-yellow-50 text-yellow-700 border border-yellow-100 px-2 py-1 rounded-xl flex items-center gap-0.5">
                <Coins size={10} className="text-accent-gold" /> +{achMeta.coinsReward}
              </span>
            </div>
            <button 
              onClick={() => setUnlockedAchievementsToShow(prev => prev.slice(1))} 
              className="btn-primary w-full py-3.5 rounded-xl font-bold"
            >
              ¡Excelente!
            </button>
          </div>
        </div>
      );
    }
  }

  if (isChallenge) {
    if (allDone) {
      return (
        <LessonComplete
          lessonTitle={lesson.title}
          coinsEarned={roundResult?.coinsEarned ?? lesson.coins ?? 15}
          xpEarned={roundResult?.xpEarned ?? lesson.xpReward ?? 100}
          accuracy={100}
          streak={userData?.streak ?? 1}
        />
      );
    }
    return <ChallengeScreen lesson={lesson} onClose={handleCloseLesson} onComplete={handleChallengeComplete} />;
  }

  // If there's an issue and the round doesn't exist, we return null (or redirect safely via useEffect)
  const currentRound = lessonRounds[currentRoundIdx];
  if (!currentRound) {
    // Redirige usando el DOM location para evitar errores de renderizado de React Router v6
    window.location.href = '/learn';
    return null;
  }

  const exercises = currentRound.exercises || [];
  const totalExercises = exercises.length;
  const currentExercise = exercises[currentExIndex];

  // ── Guards ────────────────────────────────────────────────────────────────
  if (outOfHearts) return <NoHeartsScreen secondsLeft={secondsLeft} />;

  if (allDone) {
    // All rounds done → full LessonComplete
    return (
      <LessonComplete
        lessonTitle={lesson.title}
        coinsEarned={roundResult?.coinsEarned ?? currentRound.coins}
        xpEarned={roundResult?.xpEarned ?? currentRound.xpReward}
        accuracy={roundResult?.accuracy ?? 100}
        streak={(userData?.streak ?? 0) + (roundResult?.streakJustIgnited ? 1 : 0)}
        streakJustIgnited={roundResult?.streakJustIgnited ?? false}
      />
    );
  }

  if (roundResult) {
    // A round just finished → RoundComplete
    return (
      <RoundComplete
        roundNum={roundResult.roundNum}
        totalRounds={totalRounds}
        lessonTitle={lesson.title}
        coinsEarned={roundResult.coinsEarned}
        xpEarned={roundResult.xpEarned}
        accuracy={roundResult.accuracy}
        streak={(userData?.streak ?? 0) + (roundResult.streakJustIgnited ? 1 : 0)}
        streakJustIgnited={roundResult.streakJustIgnited ?? false}
        onContinue={() => {
          // Move to next round immediately
          const nextIdx = currentRoundIdx + 1;
          setCurrentRoundIdx(nextIdx);
          setPhase('theory');
          setCurrentExIndex(0);
          setCorrectCount(0);
          setRoundResult(null);
        }}
        onGoHome={() => navigate('/learn')}
      />
    );
  }

  // ── Theory phase ──────────────────────────────────────────────────────────
  if (phase === 'theory' && currentRound.theory?.length > 0) {
    // Wrap the lesson object so TheoryScreen gets theory from the current round
    const lessonForTheory = { ...lesson, theory: currentRound.theory, title: lesson.title };
    return (
      <TheoryScreen
        lesson={lessonForTheory}
        module={module}
        roundNum={currentRound.roundNum}
        totalRounds={totalRounds}
        onComplete={() => setPhase('practice')}
        onExit={() => navigate('/learn')}
      />
    );
  }

  // ── Answer handler ────────────────────────────────────────────────────────
  const handleAnswer = async (result) => {
    const isCorrect = typeof result === 'object' ? result.isCorrect : result;
    const defaultExplanation = typeof result === 'object' ? result.explanation : null;
    const userAnswer = typeof result === 'object' ? result.userAnswer : null;
    const correctAnswer = typeof result === 'object' ? result.correctAnswer : null;

    setLastCorrect(isCorrect);
    setFeedbackMsg(defaultExplanation);
    setFeedbackVisible(true);
    setIsAiGenerated(false);

    import('../utils/audio').then(({ playCorrectSound, playWrongSound }) => {
      if (isCorrect) playCorrectSound();
      else playWrongSound();
    });

    if (isCorrect) {
      setCorrectCount((prev) => prev + 1);
    } else {
      const currentMistakes = roundMistakes + 1;
      setRoundMistakes(currentMistakes);
      setCurrentHearts((prev) => Math.max(0, prev - 1));

      if (user) {
        // Fire and forget so we don't block the UI
        deductHeart(user.uid)
          .then(() => refreshUserData())
          .catch(e => console.error('Error deducting heart:', e));
      }
    }

    // Consulta asíncrona a Gemini IA para enriquecer la explicación / motivación
    generateAIFeedback({
      exercise: currentExercise,
      userAnswer: userAnswer || 'respuesta elegida',
      correctAnswer: correctAnswer,
      isCorrect,
      defaultExplanation
    }).then((aiMsg) => {
      if (aiMsg && aiMsg !== defaultExplanation) {
        setFeedbackMsg(aiMsg);
        setIsAiGenerated(true);
      }
    }).catch(err => console.error('Error generando feedback con IA:', err));
  };

  const handleContinueExercise = async () => {
    setFeedbackVisible(false);

    if (!lastCorrect && currentHearts <= 0) {
      setOutOfHearts(true);
      return;
    }

    if (!lastCorrect && roundMistakes >= 3) {
      setCurrentExIndex(0);
      setCorrectCount(0);
      setRoundMistakes(0);
      setRetryCount((c) => c + 1);
      return;
    }

    if (currentExIndex + 1 >= totalExercises) {
      // Round exercises finished → transition UI immediately and save in background
      const accuracy = Math.round((correctCount / totalExercises) * 100);
      const roundNum = currentRound.roundNum;
      const completed = roundNum >= totalRounds;

      const isFirstRoundToday = (() => {
        if (!userData?.lastActivityDate) return true;
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const lastDate = userData.lastActivityDate?.toDate ? userData.lastActivityDate.toDate() : new Date(userData.lastActivityDate);
        lastDate.setHours(0, 0, 0, 0);
        return today.getTime() !== lastDate.getTime();
      })();

      if (completed) {
        setAllDone(true);
      }

      setRoundResult({
        roundNum,
        coinsEarned: currentRound.coins,
        xpEarned: currentRound.xpReward,
        accuracy,
        streakJustIgnited: isFirstRoundToday,
      });

      if (user) {
        (async () => {
          try {
            await Promise.all([
              saveRoundProgress(user.uid, lesson.id, module.id, roundNum, accuracy, totalRounds),
              awardLessonRewards(user.uid, currentRound.coins, currentRound.xpReward),
              updateStreak(user.uid),
            ]);
            const newAch = await checkAndUnlockAchievements(user.uid);
            if (newAch && newAch.length > 0) {
              setUnlockedAchievementsToShow(newAch);
            }
            refreshUserData();
          } catch (e) {
            console.error('Error saving round in background:', e);
          }
        })();
      }
    } else {
      setCurrentExIndex((prev) => prev + 1);
    }
  };

  // ── Practice UI ───────────────────────────────────────────────────────────
  const ROUND_COLORS = ['#6366f1', '#f97316', '#22c55e'];
  const roundColor = ROUND_COLORS[currentRoundIdx] ?? module.color;

  return (
    <div className="min-h-dvh bg-bg-primary flex flex-col">
      {/* Feedback Panel — Bottom Sheet */}
      {feedbackVisible && (
        <div className="fixed bottom-0 left-0 right-0 z-[100] animate-slide-up">
          <div className={`w-full ${lastCorrect ? 'bg-accent-green-light border-accent-green' : 'bg-accent-red-light border-accent-red'} border-t-2 px-4 py-6 md:px-8 flex flex-col gap-4 shadow-[0_-10px_40px_rgba(0,0,0,0.1)]`}>
            <div className="max-w-lg mx-auto w-full flex flex-col gap-4">
              <div className="flex items-start gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${lastCorrect ? 'bg-accent-green text-white' : 'bg-accent-red text-white'}`}>
                  {lastCorrect ? <CheckCircle2 size={24} /> : <XCircle size={24} />}
                </div>
                <div>
                  {isAiGenerated && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-indigo-100 text-indigo-700 border border-indigo-200 mb-1.5 shadow-sm">
                      <Sparkles size={11} className="text-indigo-600 animate-pulse" />
                      Cody IA
                    </span>
                  )}
                  <h3 className={`text-xl font-extrabold ${lastCorrect ? 'text-accent-green' : 'text-accent-red'}`}>
                    {lastCorrect ? '¡Correcto!' : '¡Incorrecto!'}
                  </h3>
                  <p className={`text-sm font-bold mt-1 ${lastCorrect ? 'text-accent-green/80' : 'text-accent-red/80'}`}>
                    {lastCorrect
                      ? (feedbackMsg || '¡Excelente respuesta!')
                      : (roundMistakes >= 3 ? 'Demasiados errores. Reiniciando ronda...' : (feedbackMsg || 'La respuesta no es correcta.'))}
                  </p>
                </div>
              </div>
              
              <button 
                onClick={handleContinueExercise}
                className={`w-full py-4 rounded-2xl font-bold text-white shadow-sm active:scale-95 transition-all ${lastCorrect ? 'bg-accent-green hover:bg-accent-green/90' : 'bg-accent-red hover:bg-accent-red/90'}`}
              >
                Continuar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Thin accent top bar */}
      <div className="h-1" style={{ backgroundColor: roundColor }} />

      <LessonHeader
        currentExercise={currentExIndex}
        totalExercises={totalExercises}
        onClose={handleCloseLesson}
      />

      {/* Round badge + lesson label */}
      <div className="px-4 pt-3 pb-2 max-w-lg mx-auto w-full">
        <div className="flex items-center gap-2 mb-1">
          <span
            className="text-xs font-bold uppercase tracking-widest px-2.5 py-1 rounded-full"
            style={{ backgroundColor: `${roundColor}15`, color: roundColor }}
          >
            Ronda {currentRound.roundNum}/{totalRounds} · {currentRound.label}
          </span>
        </div>
        <p className="text-text-muted text-xs uppercase tracking-wider font-medium">
          {module.language} · {lesson.title}
        </p>
      </div>

      {/* Exercise */}
      <div className={`flex-1 max-w-lg mx-auto w-full pb-8 px-4 ${feedbackVisible ? 'pointer-events-none' : ''}`}>
        {currentExercise && (() => {
          const exType = currentExercise.type ?? currentRound.type ?? 'multiple-choice';
          const key = `${lesson.id}-r${currentRoundIdx}-${currentExIndex}-${retryCount}`;
          if (exType === 'multiple-choice') return <MultipleChoiceExercise key={key} exercise={currentExercise} onAnswer={handleAnswer} />;
          if (exType === 'multi-select')   return <MultiSelectExercise   key={key} exercise={currentExercise} onAnswer={handleAnswer} />;
          if (exType === 'sequence')       return <SequenceExercise      key={key} exercise={currentExercise} onAnswer={handleAnswer} />;
          if (exType === 'code-fill')      return <CodeFillExercise      key={key} exercise={currentExercise} onAnswer={handleAnswer} />;
          if (exType === 'code-highlight') return <CodeHighlightExercise key={key} exercise={currentExercise} onAnswer={handleAnswer} />;
          if (exType === 'code-error')     return <CodeErrorExercise     key={key} exercise={currentExercise} onAnswer={handleAnswer} />;
          if (exType === 'word-bank')      return <WordBankExercise      key={key} exercise={currentExercise} onAnswer={handleAnswer} />;
          if (exType === 'categorize')     return <CategorizeExercise    key={key} exercise={currentExercise} onAnswer={handleAnswer} />;
          if (exType === 'drag-sort')      return <DragSortExercise      key={key} exercise={currentExercise} onAnswer={handleAnswer} />;
          if (exType === 'code-typing')    return <CodeTypingExercise    key={key} exercise={currentExercise} onAnswer={handleAnswer} />;
          return null;
        })()}
      </div>

      {saving && (
        <div className="fixed inset-0 bg-white/80 flex items-center justify-center z-50">
          <div className="card px-6 py-4 shadow-card-lg flex items-center gap-3">
            <div className="w-5 h-5 border-2 border-border border-t-accent rounded-full animate-spin" />
            <span className="text-text-secondary font-semibold text-sm">Guardando progreso...</span>
          </div>
        </div>
      )}

      {showQuitWarning && (
        <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-bg-secondary rounded-3xl p-6 w-full max-w-sm shadow-card-lg border border-border animate-scale-in">
            <h3 className="text-xl font-bold text-text-primary mb-2">¿Seguro que quieres salir?</h3>
            <p className="text-text-secondary text-sm mb-6">
              Si abandonas ahora, perderás tu progreso en esta ronda. ¿Deseas continuar aprendiendo?
            </p>
            <div className="flex flex-col gap-3">
              <button 
                onClick={() => setShowQuitWarning(false)} 
                className="btn-primary w-full py-3"
              >
                Continuar lección
              </button>
              <button 
                onClick={() => navigate('/learn')} 
                className="font-bold text-accent-red hover:bg-accent-red/10 w-full py-3 rounded-xl transition-colors"
              >
                Salir de todas formas
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
