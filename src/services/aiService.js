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
export async function evaluateCodeWithAI({ instruction, expectedAnswers, validationRegex, userCode, language = 'HTML' }) {
  let reference = '';
  if (expectedAnswers && expectedAnswers.length > 0) {
    reference = JSON.stringify(expectedAnswers);
  } else if (validationRegex) {
    reference = `Regla de referencia: ${validationRegex}`;
  } else {
    reference = 'N/A';
  }

  const prompt = `Actúa como un profesor de programación comprensivo, humano e indulgente en la app educativa Cody.
Consigna dada al estudiante: "${instruction}"
Referencia de respuesta esperada: ${reference}

Código escrito por el estudiante:
\`\`\`${language.toLowerCase()}
${userCode}
\`\`\`

REGLAS DE EVALUACIÓN INDULGENTE DE UN BUEN PROFESOR:
1. Sé EXTREMADAMENTE permisivo y flexible:
   - Acepta comillas simples (') o dobles (").
   - Ignora diferencias de mayúsculas/minúsculas en nombres de atributos o valores si significan lo mismo (ej: 'foto' vs 'Foto').
   - Permite espacios adicionales alrededor de '=' o dentro de las etiquetas.
   - Permite saltos de línea antes, después o dentro del código.
   - Si el estudiante escribió solo la propiedad/atributo solicitado (ej: alt="foto") o la etiqueta completa (ej: <img alt="foto">), ambas son VÁLIDAS.
2. Si el intento del estudiante demuestra que comprendió y aplicó lo pedido en la consigna, RESPONDE CON "isCorrect": true.
3. Responde únicamente con "isCorrect": false si el código carece por completo del concepto o tiene un error de sintaxis grave e insalvable.

Responde ÚNICAMENTE en formato JSON estructurado así (sin bloques markdown ni texto explicativo alrededor):
{"isCorrect": true, "feedback": "Felicitación breve del profesor."}`;

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

/**
 * Evalúa mediante IA el código de un desafío completo.
 */
export async function evaluateChallengeWithAI({ title, instruction, requirements, userCode, language = 'HTML' }) {
  const reqList = (requirements || []).map((r, i) => `${i + 1}. ${r}`).join('\n');
  const prompt = `Eres un tutor experto y compilador semántico de ${language} para la app educativa Cody.
El estudiante debe resolver este desafío:
Título: "${title}"
Consigna: "${instruction}"

Requisitos indispensables:
${reqList}

Código escrito por el estudiante:
\`\`\`${language.toLowerCase()}
${userCode}
\`\`\`

INSTRUCCIONES DE EVALUACIÓN:
1. Revisa si el código cumple CADA UNO de los requisitos arriba listados.
2. IMPORTANTE: En HTML, etiquetas como <h1>, <p>, <a>, <title> NO PUEDEN ESTAR VACÍAS (ej: <h1></h1> o <p></p>) si la consigna pide incluir información (como tu nombre, una presentación o texto en un enlace). Deben contener texto real dentro.
3. IMPORTANTE: Revisa la jerarquía de etiquetas de HTML (por ejemplo, <body> NO puede estar dentro de <head>, <html> debe envolver head y body).
4. Sé permisivo con espacios extra, comillas simples o dobles, pero estricto con que la solución sea completa, válida y con contenido real.

Responde ÚNICAMENTE en formato JSON estructurado como este, sin texto alrededor y sin bloques markdown:
{
  "allPassed": false,
  "evaluations": [
    { "index": 0, "passed": true, "reason": "" },
    { "index": 1, "passed": false, "reason": "La etiqueta <h1> está vacía y <body> está dentro de <head>." }
  ],
  "generalFeedback": "Explicación breve y amable de lo que falló o una felicitación si todo estuvo perfecto."
}`;

  const rawResult = await callGemini(prompt, 6000);
  if (!rawResult) return null;

  try {
    const cleanedJson = rawResult.replace(/```json/gi, '').replace(/```/g, '').trim();
    return JSON.parse(cleanedJson);
  } catch (e) {
    console.error('[AI Service] Error parseando JSON del desafío:', e, rawResult);
    return null;
  }
}
