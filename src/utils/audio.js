// src/utils/audio.js

const AudioContext = window.AudioContext || window.webkitAudioContext;
let audioCtx;

function initAudio() {
  if (!audioCtx) {
    audioCtx = new AudioContext();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
}

export function playCorrectSound() {
  try {
    initAudio();
    const t = audioCtx.currentTime;

    // Create oscillator and gain node
    const osc = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    osc.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    // High pitched, cheerful ding
    osc.type = 'sine';
    
    // Slide frequency slightly up
    osc.frequency.setValueAtTime(600, t);
    osc.frequency.exponentialRampToValueAtTime(800, t + 0.1);

    // Envelope (volume)
    gainNode.gain.setValueAtTime(0, t);
    gainNode.gain.linearRampToValueAtTime(0.3, t + 0.05); // Attack
    gainNode.gain.exponentialRampToValueAtTime(0.01, t + 0.3); // Decay

    osc.start(t);
    osc.stop(t + 0.3);
  } catch (err) {
    console.warn('Audio play failed:', err);
  }
}

export function playWrongSound() {
  try {
    initAudio();
    const t = audioCtx.currentTime;

    // Create oscillator and gain node
    const osc = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    osc.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    // Low pitched, flat buzz
    osc.type = 'triangle';
    
    // Slide frequency slightly down
    osc.frequency.setValueAtTime(150, t);
    osc.frequency.exponentialRampToValueAtTime(120, t + 0.2);

    // Envelope (volume)
    gainNode.gain.setValueAtTime(0, t);
    gainNode.gain.linearRampToValueAtTime(0.3, t + 0.05);
    gainNode.gain.exponentialRampToValueAtTime(0.01, t + 0.3);

    osc.start(t);
    osc.stop(t + 0.3);
  } catch (err) {
    console.warn('Audio play failed:', err);
  }
}

export function playLessonCompleteSound() {
  try {
    initAudio();
    const t = audioCtx.currentTime;
    
    const osc = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    
    osc.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    
    osc.type = 'sine';
    
    // Play a happy arpeggio (C major-ish)
    osc.frequency.setValueAtTime(523.25, t); // C5
    osc.frequency.setValueAtTime(659.25, t + 0.1); // E5
    osc.frequency.setValueAtTime(783.99, t + 0.2); // G5
    osc.frequency.setValueAtTime(1046.50, t + 0.3); // C6
    
    gainNode.gain.setValueAtTime(0, t);
    gainNode.gain.linearRampToValueAtTime(0.2, t + 0.05);
    gainNode.gain.setValueAtTime(0.2, t + 0.3);
    gainNode.gain.exponentialRampToValueAtTime(0.01, t + 0.6);
    
    osc.start(t);
    osc.stop(t + 0.6);
  } catch (err) {
    console.warn('Audio play failed:', err);
  }
}
