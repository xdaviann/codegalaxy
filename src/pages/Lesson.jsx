// src/pages/Lesson.jsx
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { getLessonById } from '../data/curriculum';
import { CheckCircle2, XCircle } from 'lucide-react';
import {
  saveLessonProgress,
  awardLessonRewards,
  updateStreak,
  deductHeart,
} from '../firebase/firestore';
import { useHeartRefill } from '../hooks/useHeartRefill';
import LessonHeader from '../components/lesson/LessonHeader';
import MultipleChoiceExercise from '../components/lesson/MultipleChoiceExercise';
import CodeFillExercise from '../components/lesson/CodeFillExercise';
import LessonComplete from '../components/lesson/LessonComplete';
import NoHeartsScreen from '../components/lesson/NoHeartsScreen';

export default function Lesson() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, userData, refreshUserData } = useAuth();

  const [currentExIndex, setCurrentExIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [completed, setCompleted] = useState(false);
  // Initialize outOfHearts as true if the user already has 0 hearts when entering
  const [outOfHearts, setOutOfHearts] = useState(() => (userData?.hearts ?? 5) <= 0);
  const [feedbackVisible, setFeedbackVisible] = useState(false);
  const [lastCorrect, setLastCorrect] = useState(null);
  const [saving, setSaving] = useState(false);

  // Heart refill countdown — passed to NoHeartsScreen
  const { secondsLeft } = useHeartRefill(user, userData, refreshUserData);

  const result = getLessonById(id);

  if (!result) {
    return (
      <div className="min-h-dvh bg-bg-primary flex items-center justify-center">
        <div className="text-center">
          <p className="text-text-secondary font-mono">Lección no encontrada</p>
          <button onClick={() => navigate('/learn')} className="btn-primary mt-4 px-8">
            Volver
          </button>
        </div>
      </div>
    );
  }

  const { lesson, module } = result;
  const exercises = lesson.exercises || [];
  const totalExercises = exercises.length;
  const currentExercise = exercises[currentExIndex];

  const handleAnswer = async (isCorrect) => {
    setLastCorrect(isCorrect);
    setFeedbackVisible(true);

    let heartsAfter = userData?.hearts ?? 1;

    if (isCorrect) {
      setCorrectCount((prev) => prev + 1);
    } else {
      // Deduct heart
      if (user) {
        try {
          heartsAfter = await deductHeart(user.uid);
          await refreshUserData();
        } catch (e) {
          console.error('Error deducting heart:', e);
        }
      }
    }

    setTimeout(async () => {
      setFeedbackVisible(false);

      // Check if hearts ran out after wrong answer
      if (!isCorrect && heartsAfter <= 0) {
        setOutOfHearts(true);
        return;
      }

      if (currentExIndex + 1 >= totalExercises) {
        // Lesson complete!
        if (user) {
          setSaving(true);
          try {
            const accuracy = Math.round(
              ((isCorrect ? correctCount + 1 : correctCount) / totalExercises) * 100
            );
            await Promise.all([
              saveLessonProgress(user.uid, lesson.id, module.id, accuracy),
              awardLessonRewards(user.uid, lesson.coins, lesson.xpReward),
              updateStreak(user.uid),
            ]);
            await refreshUserData();
          } catch (e) {
            console.error('Error saving progress:', e);
          } finally {
            setSaving(false);
          }
        }
        setCompleted(true);
      } else {
        setCurrentExIndex((prev) => prev + 1);
      }
    }, 800);
  };

  // ── Out of hearts screen ──────────────────────────────────────────────────
  if (outOfHearts) {
    return <NoHeartsScreen secondsLeft={secondsLeft} />;
  }

  // ── Lesson complete screen ────────────────────────────────────────────────
  if (completed) {
    const accuracy = Math.round((correctCount / totalExercises) * 100);
    return (
      <LessonComplete
        lessonTitle={lesson.title}
        coinsEarned={lesson.coins}
        xpEarned={lesson.xpReward}
        accuracy={accuracy}
      />
    );
  }

  // ── Main lesson UI ────────────────────────────────────────────────────────
  return (
    <div className="min-h-dvh bg-bg-primary flex flex-col">
      <LessonHeader
        currentExercise={currentExIndex}
        totalExercises={totalExercises}
      />

      {/* Lesson title */}
      <div className="px-4 py-5 max-w-lg mx-auto w-full">
        <p className="text-text-muted text-xs font-mono uppercase tracking-wider mb-1">
          {module.language} · {lesson.title}
        </p>
      </div>

      {/* Exercise */}
      <div className="flex-1 max-w-lg mx-auto w-full pb-8">
        {currentExercise && lesson.type === 'multiple-choice' && (
          <MultipleChoiceExercise
            key={`${lesson.id}-${currentExIndex}`}
            exercise={currentExercise}
            onAnswer={handleAnswer}
          />
        )}
        {currentExercise && lesson.type === 'code-fill' && (
          <CodeFillExercise
            key={`${lesson.id}-${currentExIndex}`}
            exercise={currentExercise}
            onAnswer={handleAnswer}
          />
        )}
      </div>

      {/* Feedback overlay */}
      {feedbackVisible && (
        <div
          className={`fixed bottom-0 left-0 right-0 p-6 animate-slide-up
            ${lastCorrect
              ? 'bg-accent-green/20 border-t-2 border-accent-green'
              : 'bg-accent-red/20 border-t-2 border-accent-red'
            }`}
        >
          <div className="max-w-lg mx-auto flex items-center gap-3">
            <CheckCircle2
              size={24}
              className={`flex-shrink-0 ${lastCorrect ? 'text-accent-green' : 'hidden'}`}
            />
            <XCircle
              size={24}
              className={`flex-shrink-0 ${!lastCorrect ? 'text-accent-red' : 'hidden'}`}
            />
            <div>
              <p className={`font-bold text-base ${lastCorrect ? 'text-accent-green' : 'text-accent-red'}`}>
                {lastCorrect ? '¡Correcto!' : '¡Incorrecto!'}
              </p>
              <p className="text-text-secondary text-sm font-mono">
                {lastCorrect ? '¡Excelente respuesta!' : 'Sigue intentando, lo lograrás.'}
              </p>
            </div>
          </div>
        </div>
      )}

      {saving && (
        <div className="fixed inset-0 bg-bg-primary/80 flex items-center justify-center z-50">
          <div className="text-accent-cyan font-mono animate-pulse">Guardando progreso...</div>
        </div>
      )}
    </div>
  );
}
