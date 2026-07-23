// src/services/aiService.js

function getApiKey() {
  const raw = import.meta.env.VITE_GEMINI_API_KEY || '';
  if (!raw) return '';
  try {
    if (!raw.startsWith('AQ.') && !raw.startsWith('AIza')) {
      return atob(raw);
    }
  } catch (e) {}
  return raw;
}

const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';

/**
 * Llama a la API de Gemini con timeout para no bloquear la interfaz.
 */
async function callGemini(promptText, timeoutMs = 4000) {
  const apiKey = getApiKey();
  if (!apiKey) {
    console.warn('[AI Service] VITE_GEMINI_API_KEY no configurada. Usando fallback estático.');
    return null;
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(`${API_URL}?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      signal: controller.signal,
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: promptText }]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 250
        }
      })
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      console.error('[AI Service] Error HTTP:', response.status, response.statusText);
      return null;
    }

    const data = await response.json();
    const resultText = data.candidates?.[0]?.content?.parts?.[0]?.text;
    return resultText?.trim() || null;
  } catch (err) {
    clearTimeout(timeoutId);
    if (err.name === 'AbortError') {
      console.warn('[AI Service] La consulta a Gemini superó el tiempo de espera (timeout).');
    } else {
      console.error('[AI Service] Error en llamada a Gemini:', err);
    }
    return null;
  }
}

/**
 * Genera feedback inteligente cuando el usuario responde un ejercicio.
 */
export async function generateAIFeedback({ exercise, userAnswer, correctAnswer, isCorrect, defaultExplanation }) {
  const topic = exercise?.question || exercise?.prompt || exercise?.instruction || 'Ejercicio de programación';
  const optionsStr = exercise?.options ? `Opciones disponibles: ${JSON.stringify(exercise.options)}` : '';
  
  let prompt = '';
  if (isCorrect) {
    prompt = `Eres "Cody", una mascota y tutor de programación súper alegre y cercano.
Un estudiante respondió CORRECTAMENTE a este ejercicio:
Tema/Ejercicio: "${topic}"
Respuesta del usuario: "${userAnswer || 'correcta'}"

Genera una felicitación muy breve (máximo 1 oración de 10-15 palabras en español), entusiasta y motivadora. Menciónale alegremente qué regla o lógica aplicó bien. No uses comillas.`;
  } else {
    prompt = `Eres "Cody", un tutor pedagógico de programación amigable.
Un estudiante cometió un error en este ejercicio:
Consigna/Pregunta: "${topic}"
${optionsStr}
Lo que eligió o colocó el estudiante: "${userAnswer || 'Respuesta elegida'}"
La respuesta correcta esperada: "${correctAnswer || defaultExplanation || ''}"

REGLAS DE ORO PARA TU EXPLICACIÓN:
1. NUNCA uses frases robóticas tipo "Colocaste X y la respuesta era Y" ni "Escribiste esto y la respuesta correcta era esto otro".
2. Explícale la REGLA DE PROGRAMACIÓN o CONCEPTO TEÓRICO clave en 1 o 2 oraciones sencillas en español (ejemplo: "Recuerda que los valores de los atributos siempre deben estar entre comillas dobles, colocaste el atributo sin comillas.").
3. Mantén un tono alentador y enfocado en la regla que debe recordar para no volver a fallar. No uses formato markdown de código complejo.`;
  }

  const aiText = await callGemini(prompt, 4500);
  return aiText || defaultExplanation || (isCorrect ? '¡Excelente respuesta!' : 'Recuerda revisar las reglas teóricas y la sintaxis de este ejercicio.');
}

/**
 * Evalúa mediante IA el código escrito por el usuario en ejercicios de tipeo o desafío.
 */
export async function evaluateCodeWithAI({ instruction, expectedAnswers, userCode, language = 'HTML' }) {
  const prompt = `Eres un compilador y tutor experto en ${language} para la app educativa Cody.
Consigna: "${instruction}"
Respuestas esperadas/referencia: ${JSON.stringify(expectedAnswers || [])}

Código escrito por el estudiante:
\`\`\`${language.toLowerCase()}
${userCode}
\`\`\`

Analiza si el código del estudiante cumple semánticamente con la consigna. Sé permisivo con espacios, saltos de línea o comillas simples/dobles siempre que la estructura de código sea correcta y cumpla lo pedido.

Responde ÚNICAMENTE en formato JSON estructurado como este, sin texto alrededor y sin bloques markdown:
{"isCorrect": true, "feedback": "Explicación breve de 1 oración en español sobre por qué es correcto o qué error cometió."}`;

  const rawResult = await callGemini(prompt, 5000);
  if (!rawResult) return null;

  try {
    // Limpiar posibles bloques markdown de código devueltos por Gemini
    const cleanedJson = rawResult.replace(/```json/gi, '').replace(/```/g, '').trim();
    const parsed = JSON.parse(cleanedJson);
    return {
      isCorrect: Boolean(parsed.isCorrect),
      feedback: parsed.feedback || (parsed.isCorrect ? '¡Código correcto!' : 'El código no cumple con lo solicitado.')
    };
  } catch (e) {
    console.error('[AI Service] Error parseando JSON de Gemini:', e, rawResult);
    return null;
  }
}
