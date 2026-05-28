// src/pages/Lesson.jsx
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { getLessonById } from '../data/curriculum';
import { CheckCircle2, XCircle } from 'lucide-react';
import {
  saveRoundProgress,
  awardLessonRewards,
  updateStreak,
  deductHeart,
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
  const { user, userData, progress, refreshUserData } = useAuth();

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
  const [feedbackVisible, setFeedbackVisible] = useState(false);
  const [lastCorrect, setLastCorrect] = useState(null);
  const [feedbackMsg, setFeedbackMsg] = useState(null);
  const [saving, setSaving] = useState(false);
  const [roundMistakes, setRoundMistakes] = useState(0);
  const [showQuitWarning, setShowQuitWarning] = useState(false);

  const { secondsLeft } = useHeartRefill(user, userData, refreshUserData);

  const handleCloseLesson = () => {
    if (currentExIndex > 0) {
      setShowQuitWarning(true);
    } else {
      navigate('/learn');
    }
  };

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

  const handleChallengeComplete = async (rewards) => {
    if (user && userData) {
      try {
        // Write directly into the progress subcollection (same as regular lessons)
        const { db, doc, setDoc, updateDoc, increment, serverTimestamp } = await import('../firebase/firestore');
        
        // Force overwrite — don't use merge so stale `completed:false` gets replaced
        await setDoc(doc(db, 'users', user.uid, 'progress', lesson.id), {
          lessonId: lesson.id,
          moduleId: module?.id ?? null,
          roundsCompleted: 1,
          completed: true,
          score: 100,
          updatedAt: serverTimestamp(),
        });

        // Award XP and coins
        await updateDoc(doc(db, 'users', user.uid), {
          xp: increment(rewards.xpEarned),
          coins: increment(rewards.coinsEarned),
        });

        // Refresh so ModuleAccordion sees the new progress immediately
        await refreshUserData();
        console.log('[Challenge] Progress saved. progress.html-chal-1 should be completed=true');
      } catch (err) {
        console.error('[Challenge] Error saving progress:', err);
      }
    }
    setRoundResult({ roundNum: 1, xpEarned: rewards.xpEarned, coinsEarned: rewards.coinsEarned, accuracy: 100 });
    setAllDone(true);
  };

  if (isChallenge) {
    if (allDone) {
      return (
        <LessonComplete
          lessonTitle={lesson.title}
          coinsEarned={roundResult?.coinsEarned ?? lesson.coins ?? 15}
          xpEarned={roundResult?.xpEarned ?? lesson.xpReward ?? 100}
          accuracy={100}
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
    // All 3 rounds done → full LessonComplete
    return (
      <LessonComplete
        lessonTitle={lesson.title}
        coinsEarned={roundResult?.coinsEarned ?? currentRound.coins}
        xpEarned={roundResult?.xpEarned ?? currentRound.xpReward}
        accuracy={roundResult?.accuracy ?? 100}
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
    const explanation = typeof result === 'object' ? result.explanation : null;

    setLastCorrect(isCorrect);
    setFeedbackMsg(explanation);
    setFeedbackVisible(true);

    import('../utils/audio').then(({ playCorrectSound, playWrongSound }) => {
      if (isCorrect) playCorrectSound();
      else playWrongSound();
    });

    let heartsAfter = userData?.hearts ?? 1;
    let currentMistakes = roundMistakes;

    if (isCorrect) {
      setCorrectCount((prev) => prev + 1);
    } else {
      currentMistakes += 1;
      setRoundMistakes(currentMistakes);
      heartsAfter -= 1; // Optimistic UI update

      if (user) {
        // Fire and forget so we don't block the UI timeout
        deductHeart(user.uid)
          .then(() => refreshUserData())
          .catch(e => console.error('Error deducting heart:', e));
      }
    }

    const delay = (!isCorrect && currentMistakes >= 3) ? 2000 : 800;

    setTimeout(async () => {
      setFeedbackVisible(false);

      if (!isCorrect && heartsAfter <= 0) {
        setOutOfHearts(true);
        return;
      }

      if (!isCorrect && currentMistakes >= 3) {
        setCurrentExIndex(0);
        setCorrectCount(0);
        setRoundMistakes(0);
        return;
      }

      if (currentExIndex + 1 >= totalExercises) {
        // Round exercises finished → save progress
        if (user) {
          setSaving(true);
          try {
            const localCorrect = isCorrect ? correctCount + 1 : correctCount;
            const accuracy = Math.round((localCorrect / totalExercises) * 100);
            const roundNum = currentRound.roundNum;

            const [{ roundsCompleted, completed }] = await Promise.all([
              saveRoundProgress(user.uid, lesson.id, module.id, roundNum, accuracy, totalRounds),
              awardLessonRewards(user.uid, currentRound.coins, currentRound.xpReward),
              updateStreak(user.uid),
            ]);
            await refreshUserData();

            if (completed) {
              setAllDone(true);
            }

            setRoundResult({
              roundNum,
              coinsEarned: currentRound.coins,
              xpEarned: currentRound.xpReward,
              accuracy,
            });
          } catch (e) {
            console.error('Error saving round:', e);
          } finally {
            setSaving(false);
          }
        }
      } else {
        setCurrentExIndex((prev) => prev + 1);
      }
    }, delay);
  };

  // ── Practice UI ───────────────────────────────────────────────────────────
  const ROUND_COLORS = ['#6366f1', '#f97316', '#22c55e'];
  const roundColor = ROUND_COLORS[currentRoundIdx] ?? module.color;

  return (
    <div className="min-h-dvh bg-bg-primary flex flex-col">
      {/* Feedback toast — from top */}
      {feedbackVisible && (
        <div className={`fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 px-4 pointer-events-none`}>
          <div className={`flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-card-lg animate-toast-in max-w-sm w-full ${
            lastCorrect
              ? 'bg-accent-green text-white'
              : 'bg-accent-red text-white'
          }`}>
            {lastCorrect
              ? <CheckCircle2 size={20} className="flex-shrink-0" />
              : <XCircle size={20} className="flex-shrink-0" />}
            <div>
              <p className="font-bold text-sm">{lastCorrect ? '¡Correcto!' : '¡Incorrecto!'}</p>
              <p className="text-white/85 text-xs mt-0.5">
                {lastCorrect
                  ? (feedbackMsg || '¡Excelente respuesta!')
                  : (roundMistakes >= 3 ? 'Demasiados errores. Reiniciando ronda...' : (feedbackMsg || 'Sigue intentando.'))}
              </p>
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
          const key = `${lesson.id}-r${currentRoundIdx}-${currentExIndex}`;
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
