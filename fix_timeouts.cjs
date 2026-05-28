const fs = require('fs');
const path = require('path');

const replacements = [
  {
    file: 'CategorizeExercise.jsx',
    oldText: `      if (!isCorrect) {
        setSubmitted(false);
      }`,
    newText: `      if (!isCorrect) {
        setTimeout(() => {
          setSubmitted(false);
        }, 1000);
      }`
  },
  {
    file: 'CodeErrorExercise.jsx',
    oldText: `      setSelectedLine(null);
      setSubmitted(false);`,
    newText: `      if (!isCorrect) {
        setTimeout(() => {
          setSelectedLine(null);
          setSubmitted(false);
        }, 1000);
      }`
  },
  {
    file: 'CodeFillExercise.jsx',
    oldText: `      onAnswer(correct);
      handleReset();`,
    newText: `      onAnswer(correct);
      if (!correct) {
        setTimeout(() => {
          handleReset();
        }, 1000);
      }`
  },
  {
    file: 'CodeHighlightExercise.jsx',
    oldText: `      if (!isCorrect) {
        setSubmitted(false);
        setSelectedIndex(null);
      }`,
    newText: `      if (!isCorrect) {
        setTimeout(() => {
          setSubmitted(false);
          setSelectedIndex(null);
        }, 1000);
      }`
  },
  {
    file: 'DragSortExercise.jsx',
    oldText: `      setItems([...exercise.items]);
      setSelected(null);
      setSubmitted(false);
      setResult(null);`,
    newText: `      if (!isCorrect) {
        setTimeout(() => {
          setItems([...exercise.items]);
          setSelected(null);
          setSubmitted(false);
          setResult(null);
        }, 1000);
      }`
  },
  {
    file: 'MultiSelectExercise.jsx',
    oldText: `      setSelected([]);
      setSubmitted(false);`,
    newText: `      if (!isCorrect) {
        setTimeout(() => {
          setSelected([]);
          setSubmitted(false);
        }, 1000);
      }`
  },
  {
    file: 'MultipleChoiceExercise.jsx',
    oldText: `      setSelected(null);
      setAnswered(false);`,
    newText: `      if (!isCorrect) {
        setTimeout(() => {
          setSelected(null);
          setAnswered(false);
        }, 1000);
      }`
  },
  {
    file: 'SequenceExercise.jsx',
    oldText: `      onAnswer({ isCorrect: correct, explanation });
      handleReset();`,
    newText: `      onAnswer({ isCorrect: correct, explanation });
      if (!correct) {
        setTimeout(() => {
          handleReset();
        }, 1000);
      }`
  },
  {
    file: 'WordBankExercise.jsx',
    oldText: `      setFilled(Array(blankCount).fill(null));
      setUsedIdxs([]);
      setSubmitted(false);`,
    newText: `      if (!isCorrect) {
        setTimeout(() => {
          setFilled(Array(blankCount).fill(null));
          setUsedIdxs([]);
          setSubmitted(false);
        }, 1000);
      }`
  }
];

let success = true;

replacements.forEach(r => {
  const p = path.join(__dirname, 'src/components/lesson', r.file);
  let content = fs.readFileSync(p, 'utf8');
  if (content.includes(r.oldText)) {
    content = content.replace(r.oldText, r.newText);
    fs.writeFileSync(p, content, 'utf8');
    console.log('Fixed ' + r.file);
  } else {
    console.error('Could not find oldText in ' + r.file);
    success = false;
  }
});

if (success) console.log('All files updated successfully.');
else process.exit(1);
