// src/components/learn/ModulePath.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Lock } from 'lucide-react';
import LessonNode from './LessonNode';
import ModuleHeader from './ModuleHeader';
import LessonPreviewPanel from './LessonPreviewPanel';

const NODE_HEIGHT = 140;

export default function ModulePath({ module }) {
  const { progress, userData } = useAuth();
  const navigate = useNavigate();
  const noHearts = (userData?.hearts ?? 5) <= 0;

  const [previewLesson, setPreviewLesson] = useState(null);

  if (module.locked) {
    return (
      <div className="mx-4 mb-8">
        <ModuleHeader module={module} />
        <div className="flex flex-col items-center py-10 gap-4">
          <div className="w-16 h-16 rounded-2xl bg-bg-tertiary border-2 border-text-muted flex items-center justify-center opacity-60">
            <Lock size={32} className="text-text-muted" />
          </div>
          <p className="text-text-muted text-center font-semibold px-4">{module.description}</p>
        </div>
      </div>
    );
  }

  // Determine lesson statuses
  let foundCurrent = false;
  const lessonStatuses = module.lessons.map((lesson) => {
    if (progress[lesson.id]?.completed) return 'completed';
    if (!foundCurrent) {
      foundCurrent = true;
      return 'current';
    }
    return 'locked';
  });

  const handleNodeClick = (lesson, status) => {
    setPreviewLesson({ lesson, status });
  };

  const handleStartLesson = (lessonId, status) => {
    if (status === 'locked') return;
    if (status === 'current' && noHearts) return;
    setPreviewLesson(null);
    navigate(`/lesson/${lessonId}`);
  };

  // SVG path for winding connector
  const svgHeight = module.lessons.length * NODE_HEIGHT + 40;
  const cx = 160; // center x of the 320px wide container

  // Generate zigzag path points
  const zigzagOffsets = [0, 70, -70, 0];
  const points = module.lessons.map((_, i) => {
    const y = i * NODE_HEIGHT + 60;
    const x = cx + zigzagOffsets[i % 4];
    return { x, y };
  });

  // Build SVG path
  let pathD = '';
  for (let i = 0; i < points.length - 1; i++) {
    const p1 = points[i];
    const p2 = points[i + 1];
    if (i === 0) pathD += `M ${p1.x} ${p1.y}`;
    const midY = (p1.y + p2.y) / 2;
    pathD += ` C ${p1.x} ${midY}, ${p2.x} ${midY}, ${p2.x} ${p2.y}`;
  }

  const completedCount = lessonStatuses.filter((s) => s === 'completed').length;

  return (
    <div className="mb-8">
      <ModuleHeader module={module} />

      <div className="relative mx-auto" style={{ height: svgHeight, maxWidth: 320 }}>
        {/* SVG connector lines */}
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox={`0 0 320 ${svgHeight}`}
          preserveAspectRatio="none"
        >
          {/* Background path (full, gray) */}
          {pathD && (
            <path
              d={pathD}
              fill="none"
              stroke="#3d4460"
              strokeWidth="8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          )}
          {/* Progress path (colored) */}
          {pathD && completedCount > 0 && (
            <path
              d={pathD}
              fill="none"
              stroke={module.color}
              strokeWidth="8"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray={`${(completedCount / module.lessons.length) * 1000} 1000`}
              opacity="0.8"
            />
          )}
        </svg>

        {/* Lesson Nodes */}
        {module.lessons.map((lesson, i) => {
          const p = points[i];
          const status = lessonStatuses[i];

          return (
            <div
              key={lesson.id}
              className="absolute flex flex-col items-center"
              style={{
                left: p.x - 40,
                top: p.y - 40,
                width: 80,
                zIndex: 10,
              }}
            >
              <LessonNode
                lesson={lesson}
                status={status}
                index={i}
                noHearts={noHearts}
                roundsCompleted={progress[lesson.id]?.roundsCompleted ?? 0}
                moduleColor={module.color}
                zigzagX={p.x}
                containerCx={cx}
                onClick={() => handleNodeClick(lesson, status)}
              />
            </div>
          );
        })}
      </div>

      {/* Preview panel */}
      {previewLesson && (
        <LessonPreviewPanel
          lesson={previewLesson.lesson}
          module={module}
          status={previewLesson.status}
          noHearts={noHearts}
          onClose={() => setPreviewLesson(null)}
          onStart={() => handleStartLesson(previewLesson.lesson.id, previewLesson.status)}
        />
      )}
    </div>
  );
}
