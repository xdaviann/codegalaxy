import { curriculumHtml } from './curriculum-html.js';
import { curriculumCss } from './curriculum-css.js';

export const curriculum = [
  ...curriculumHtml,
  ...curriculumCss,
  {
    id: 'js-1',
    title: 'JavaScript Básico',
    description: 'Próximamente — ¡Haz que tu web cobre vida!',
    color: '#f39c12',
    language: 'JS',
    locked: true,
    lessons: [],
  },
];

// ── Helpers ──────────────────────────────────────────────────────────────────
export const getLessonById = (lessonId) => {
  for (const module of curriculum) {
    const lesson = module.lessons.find((l) => l.id === lessonId);
    if (lesson) return { lesson, module };
  }
  return null;
};

export const getModuleProgress = (moduleId, progress) => {
  const module = curriculum.find((m) => m.id === moduleId);
  if (!module || module.lessons.length === 0) return 0;
  const completed = module.lessons.filter((l) => progress[l.id]?.completed).length;
  return Math.round((completed / module.lessons.length) * 100);
};
