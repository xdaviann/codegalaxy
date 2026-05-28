import { useState, useEffect } from 'react';
import { Layers } from 'lucide-react';

export default function CategorizeExercise({ exercise, onAnswer }) {
  // We'll track the assignment of each item by its index
  // assignments[itemIndex] = categoryId or null
  const [assignments, setAssignments] = useState(() => Array(exercise.items.length).fill(null));
  const [selectedItemIdx, setSelectedItemIdx] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  // Shuffle items once on mount so they aren't grouped by category
  const [shuffledItems, setShuffledItems] = useState([]);
  
  useEffect(() => {
    const itemsWithOriginalIdx = exercise.items.map((item, idx) => ({ ...item, originalIdx: idx }));
    // Simple shuffle
    for (let i = itemsWithOriginalIdx.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [itemsWithOriginalIdx[i], itemsWithOriginalIdx[j]] = [itemsWithOriginalIdx[j], itemsWithOriginalIdx[i]];
    }
    setShuffledItems(itemsWithOriginalIdx);
    setAssignments(Array(exercise.items.length).fill(null));
    setSelectedItemIdx(null);
    setSubmitted(false);
  }, [exercise]);

  const handleItemTap = (origIdx) => {
    if (submitted) return;
    // If it's already assigned, unassign it (move back to bank)
    if (assignments[origIdx] !== null) {
      const newAss = [...assignments];
      newAss[origIdx] = null;
      setAssignments(newAss);
      if (selectedItemIdx === origIdx) setSelectedItemIdx(null);
    } else {
      // It's in the bank. Select it, or toggle off if already selected
      setSelectedItemIdx(prev => prev === origIdx ? null : origIdx);
    }
  };

  const handleBucketTap = (categoryId) => {
    if (submitted) return;
    if (selectedItemIdx !== null) {
      // Assign the selected item to this bucket
      const newAss = [...assignments];
      newAss[selectedItemIdx] = categoryId;
      setAssignments(newAss);
      setSelectedItemIdx(null);
    }
  };

  const isComplete = assignments.every(a => a !== null);

  const handleCheck = () => {
    if (!isComplete || submitted) return;
    setSubmitted(true);
    
    // Check if every assignment matches the correct category
    const isCorrect = exercise.items.every((item, idx) => item.category === assignments[idx]);
    
    setTimeout(() => {
      onAnswer({
        isCorrect,
        explanation: isCorrect 
          ? '¡Excelente clasificación!' 
          : 'Algún elemento está en la categoría incorrecta. Revisa con cuidado.'
      });
      if (!isCorrect) {
        setTimeout(() => {
          setSubmitted(false);
        }, 1000);
      }
    }, 1500);
  };

  return (
    <div className="flex flex-col gap-5 animate-fade-in-up pt-2">
      <div className="card p-4 shadow-card-md flex items-start gap-3 border border-border">
        <div className="w-9 h-9 rounded-xl bg-accent-light flex items-center justify-center flex-shrink-0">
          <Layers size={18} className="text-accent" />
        </div>
        <p className="text-text-primary font-semibold text-sm pt-1">
          {exercise.instruction || 'Toca un elemento y luego la categoría a la que pertenece.'}
        </p>
      </div>

      {/* Buckets */}
      <div className="grid grid-cols-2 gap-3">
        {exercise.categories.map(cat => {
          // Find items currently assigned to this bucket
          const assignedItems = shuffledItems.filter(item => assignments[item.originalIdx] === cat.id);
          const isTarget = selectedItemIdx !== null;
          
          return (
            <div 
              key={cat.id}
              onClick={() => handleBucketTap(cat.id)}
              className={`flex flex-col rounded-2xl border-2 transition-all duration-200 overflow-hidden ${
                isTarget 
                  ? 'border-accent border-dashed cursor-pointer shadow-accent-sm scale-[1.02] bg-accent/5' 
                  : 'border-border bg-bg-secondary'
              }`}
            >
              {/* Header */}
              <div 
                className="py-2.5 px-3 text-center text-xs font-bold text-white shadow-sm"
                style={{ backgroundColor: cat.color || '#6366f1' }}
              >
                {cat.title}
              </div>
              
              {/* Drop zone */}
              <div className={`flex-1 p-2 flex flex-col gap-2 min-h-[120px] transition-colors ${
                isTarget ? 'bg-accent/5' : ''
              }`}>
                {assignedItems.length === 0 && (
                  <div className="flex-1 flex items-center justify-center">
                    <span className="text-[10px] text-text-muted font-mono uppercase tracking-wider text-center">
                      {isTarget ? 'Toca para mover' : 'Vacío'}
                    </span>
                  </div>
                )}
                
                {assignedItems.map(item => {
                  const isWrong = submitted && assignments[item.originalIdx] !== exercise.items[item.originalIdx].category;
                  const isRight = submitted && assignments[item.originalIdx] === exercise.items[item.originalIdx].category;
                  return (
                    <button
                      key={item.originalIdx}
                      onClick={(e) => { e.stopPropagation(); handleItemTap(item.originalIdx); }}
                      disabled={submitted}
                      className={`px-3 py-2 text-xs font-mono font-semibold rounded-xl w-full text-center truncate transition-all ${
                        isRight ? 'bg-accent-green/20 text-accent-green border border-accent-green/30' :
                        isWrong ? 'bg-accent-red/20 text-accent-red border border-accent-red/30 animate-shake' :
                        'bg-bg-primary text-text-primary border border-border shadow-sm hover:border-text-muted'
                      }`}
                    >
                      {item.text}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Item Bank */}
      <div className="bg-bg-tertiary rounded-2xl p-4 border border-border mt-2">
        <p className="text-text-muted text-[10px] font-bold uppercase tracking-widest mb-3 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-accent inline-block" />
          Elementos sin clasificar
        </p>
        
        <div className="flex flex-wrap gap-2 min-h-[40px]">
          {shuffledItems.map(item => {
            if (assignments[item.originalIdx] !== null) return null; // hide if assigned
            const isSelected = selectedItemIdx === item.originalIdx;
            
            return (
              <button
                key={item.originalIdx}
                onClick={() => handleItemTap(item.originalIdx)}
                disabled={submitted}
                className={`px-3 py-2 text-xs font-mono font-bold rounded-xl transition-all duration-200 active:scale-95 border-2 ${
                  isSelected
                    ? 'border-accent bg-accent/10 text-accent shadow-accent-sm transform -translate-y-1'
                    : 'border-border bg-bg-primary text-text-primary hover:border-text-muted hover:shadow-sm'
                }`}
              >
                {item.text}
              </button>
            );
          })}
          
          {shuffledItems.every(item => assignments[item.originalIdx] !== null) && (
            <span className="text-xs text-text-muted italic flex items-center m-auto opacity-60">
              Todos clasificados
            </span>
          )}
        </div>
      </div>

      <button
        onClick={handleCheck}
        disabled={!isComplete || submitted}
        className={`w-full py-4 rounded-2xl font-bold text-sm transition-all duration-200 mt-2 ${
          isComplete && !submitted
            ? 'btn-primary'
            : 'bg-bg-tertiary text-text-muted cursor-not-allowed'
        }`}
      >
        {submitted ? 'Comprobando...' : 'Comprobar'}
      </button>
    </div>
  );
}
