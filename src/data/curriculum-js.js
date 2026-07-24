// src/data/curriculum-js.js

export const curriculumJs = [
  {
    id: 'js-all',
    title: 'Curso Completo de JavaScript',
    description: 'Aprende JavaScript desde cero: variables, lógica, funciones, arreglos y desafíos de programación.',
    color: '#f59e0b',
    language: 'JS',
    lessons: [
      // ── BLOQUE 1: FUNDAMENTOS ─────────────────────────────────────────────
      {
        id: 'js-1-1',
        title: '1. Variables: let y const',
        totalRounds: 3,
        rounds: [
          {
            roundNum: 1, label: 'Declarar Variables', xpReward: 15, coins: 10,
            theory: [
              { id: 't1', type: 'welcome', icon: 'Code', color: '#f59e0b', title: 'Variables en JS', subtitle: 'Guardando datos en memoria', body: 'En JavaScript usamos `let` para crear variables cuyos valores pueden cambiar, y `const` para crear constantes que nunca cambiarán.' },
              { id: 't2', type: 'concept', icon: 'Sparkles', color: '#f59e0b', title: 'Declaración e Inicialización', body: 'Para declarar una variable escribimos la palabra clave seguida de su nombre y el valor inicial usando el signo de igual `=`. Ejemplo: `let edad = 25;`' }
            ],
            exercises: [
              { id: 'ex1', type: 'multiple-choice', question: '¿Cuál palabra clave usas para una variable cuyo valor NUNCA cambiará?', options: ['let', 'const', 'var', 'change'], correct: 1 },
              { id: 'ex2', type: 'code-highlight', instruction: 'Toca la palabra clave que permite crear una variable reasignable.', code: '[[let]] edad = 20;\n[[const]] nombre = "Cody";', correctIndex: 0 },
              { id: 'ex3', type: 'word-bank', instruction: 'Declara una constante llamada pi con valor 3.14', filename: 'main.js', parts: ['', '___', ' pi = 3.14;'], words: ['const', 'let', 'var', 'set'], answers: ['const'] },
              { id: 'ex4', type: 'code-typing', instruction: 'Declara una variable llamada puntos con el valor 100 usando let.', startingCode: 'let ', validationRegex: '^let\\s+puntos\\s*=\\s*100;?$', explanationIncorrect: 'Asegúrate de escribir let puntos = 100;' }
            ]
          },
          {
            roundNum: 2, label: 'Reasignación y Constantes', xpReward: 20, coins: 15,
            theory: [
              { id: 't1', type: 'concept', icon: 'Zap', color: '#f59e0b', title: 'Reasignar valores', body: 'Con `let`, puedes cambiar el valor de una variable creada simplemente escribiendo su nombre `=` nuevo valor, sin volver a poner la palabra `let`.' },
              { id: 't2', type: 'tip', icon: 'AlertTriangle', color: '#f59e0b', title: 'Error con const', body: 'Si intentas reasignar un nuevo valor a una variable declarada con `const`, JavaScript arrojará un error de ejecución (`TypeError`).' }
            ],
            exercises: [
              { id: 'ex1', type: 'multiple-choice', question: '¿Qué sucede si intentas cambiar el valor de una variable creada con const?', options: ['Cambia sin problemas', 'El programa lanza un error', 'Se borra la computadora', 'Se convierte en let'], correct: 1 },
              { id: 'ex2', type: 'drag-sort', prompt: 'Ordena la reasignación de la variable contador', items: ['contador = 5;', 'let contador = 0;'], correctOrder: ['let contador = 0;', 'contador = 5;'] },
              { id: 'ex3', type: 'code-error', instruction: '¿En qué línea hay un error por reasignar una constante?', filename: 'script.js', lines: ['const pais = "Chile";', 'pais = "Perú";'], errorLineIndex: 1, explanation: 'Las variables creadas con const son inmutables y no se pueden reasignar.' },
              { id: 'ex4', type: 'code-typing', instruction: 'Reasigna la variable vidas con el valor 3.', startingCode: 'vidas = ', validationRegex: '^vidas\\s*=\\s*3;?$', explanationIncorrect: 'Escribe vidas = 3;' }
            ]
          },
          {
            roundNum: 3, label: 'Nombres y Buenas Prácticas', xpReward: 25, coins: 20,
            theory: [
              { id: 't1', type: 'concept', icon: 'Check', color: '#f59e0b', title: 'Convención camelCase', body: 'En JS se recomienda nombrar variables compuestas usando `camelCase` (primera palabra en minúscula y las siguientes con inicial mayúscula). Ejemplo: `nombreUsuario`.' },
              { id: 't2', type: 'rule', icon: 'Shield', color: '#f59e0b', title: 'Reglas de Nombres', body: 'Los nombres de variables no pueden empezar con números ni contener espacios o guiones medios.' }
            ],
            exercises: [
              { id: 'ex1', type: 'multiple-choice', question: '¿Cuál de estos nombres cumple con la convención camelCase?', options: ['nombre_usuario', 'NombreUsuario', 'nombreUsuario', 'nombre usuario'], correct: 2 },
              { id: 'ex2', type: 'categorize', instruction: 'Clasifica los nombres de variables', categories: [{id: 'val', title: 'Válidos camelCase', color: '#10b981'}, {id: 'inval', title: 'Inválidos o No recomendados', color: '#ef4444'}], items: [{text: 'totalScore', category: 'val'}, {text: '1erLugar', category: 'inval'}, {text: 'user-name', category: 'inval'}, {text: 'isActive', category: 'val'}] },
              { id: 'ex3', type: 'code-typing', instruction: 'Declara una constante llamada saldoInicial con valor 500.', startingCode: 'const ', validationRegex: '^const\\s+saldoInicial\\s*=\\s*500;?$', explanationIncorrect: 'Asegúrate de escribir const saldoInicial = 500;' }
            ]
          }
        ]
      },

      {
        id: 'js-1-2',
        title: '2. Tipos de Datos Primitivos',
        totalRounds: 3,
        rounds: [
          {
            roundNum: 1, label: 'Strings, Numbers y Booleans', xpReward: 15, coins: 10,
            theory: [
              { id: 't1', type: 'welcome', icon: 'FileText', color: '#f59e0b', title: 'Tipos Primitivos', subtitle: 'Los bloques fundamentales de datos', body: 'En JS los datos principales son: **Strings** (texto entre comillas), **Numbers** (números enteros o decimales) y **Booleans** (`true` o `false`).' }
            ],
            exercises: [
              { id: 'ex1', type: 'categorize', instruction: 'Clasifica los valores según su tipo de dato', categories: [{id: 'str', title: 'String (Texto)', color: '#3b82f6'}, {id: 'num', title: 'Number (Número)', color: '#f59e0b'}, {id: 'bool', title: 'Boolean (Lógico)', color: '#10b981'}], items: [{text: '"Hola"', category: 'str'}, {text: '42', category: 'num'}, {text: 'true', category: 'bool'}, {text: '3.14', category: 'num'}, {text: 'false', category: 'bool'}] },
              { id: 'ex2', type: 'code-highlight', instruction: 'Toca el valor de tipo BOOLEANO en este código.', code: 'let activo = [[true]];\nlet nombre = [["Ana"]];', correctIndex: 0 },
              { id: 'ex3', type: 'code-typing', instruction: 'Declara una variable llamada esMayor de tipo booleano con el valor true.', startingCode: 'let esMayor = ', validationRegex: '^let\\s+esMayor\\s*=\\s*true;?$', explanationIncorrect: 'Recuerda que true va sin comillas.' }
            ]
          },
          {
            roundNum: 2, label: 'Operador typeof', xpReward: 20, coins: 15,
            theory: [
              { id: 't1', type: 'concept', icon: 'Search', color: '#f59e0b', title: 'Conocer el tipo de dato', body: 'El operador `typeof` te devuelve una cadena de texto indicando el tipo de dato de cualquier variable. Ejemplo: `typeof 10` devuelve `"number"`.' }
            ],
            exercises: [
              { id: 'ex1', type: 'multiple-choice', question: '¿Qué resultado devuelve `typeof "JavaScript"`?', options: ['"number"', '"string"', '"boolean"', '"object"'], correct: 1 },
              { id: 'ex2', type: 'word-bank', instruction: 'Obtén el tipo de dato de la variable precio', filename: 'main.js', parts: ['let tipo = ', '___', ' precio;'], words: ['typeof', 'typeOf', 'getType', 'kindof'], answers: ['typeof'] },
              { id: 'ex3', type: 'code-typing', instruction: 'Escribe el operador para consultar el tipo de dato de una variable.', startingCode: 't', validationRegex: '^typeof$', explanationIncorrect: 'Debe ser typeof' }
            ]
          },
          {
            roundNum: 3, label: 'null y undefined', xpReward: 25, coins: 20,
            theory: [
              { id: 't1', type: 'concept', icon: 'HelpCircle', color: '#f59e0b', title: 'Ausencia de valor', body: '`undefined` significa que una variable fue declarada pero no se le asignó ningún valor. `null` es un valor asignado explícitamente para indicar "vacío".' }
            ],
            exercises: [
              { id: 'ex1', type: 'categorize', instruction: 'Clasifica según el tipo de ausencia de valor', categories: [{id: 'und', title: 'undefined (Automático)', color: '#ec4899'}, {id: 'nul', title: 'null (Intencional)', color: '#8b5cf6'}], items: [{text: 'Variable declarada sin valor', category: 'und'}, {text: 'Asignar explícitamente vacío', category: 'nul'}] },
              { id: 'ex2', type: 'code-typing', instruction: 'Asigna el valor nulo explícito a la variable usuario.', startingCode: 'let usuario = ', validationRegex: '^let\\s+usuario\\s*=\\s*null;?$', explanationIncorrect: 'Asigna el valor null sin comillas.' }
            ]
          }
        ]
      },

      {
        id: 'js-1-3',
        title: '3. Operadores y Template Literals',
        totalRounds: 3,
        rounds: [
          {
            roundNum: 1, label: 'Operadores Matemáticos', xpReward: 15, coins: 10,
            theory: [
              { id: 't1', type: 'concept', icon: 'Calculator', color: '#f59e0b', title: 'Aritmética en JS', subtitle: '+, -, *, /, %', body: 'Usamos `+` para sumar, `-` para restar, `*` para multiplicar, `/` para dividir y `%` (módulo) para obtener el residuo de una división.' }
            ],
            exercises: [
              { id: 'ex1', type: 'multiple-choice', question: '¿Cuál es el resultado de `10 % 3` en JavaScript?', options: ['3', '1', '0', '3.33'], correct: 1 },
              { id: 'ex2', type: 'word-bank', instruction: 'Calcula el total sumando precio y envio', filename: 'math.js', parts: ['let total = precio ', '___', ' envio;'], words: ['+', '*', '%', '='], answers: ['+'] },
              { id: 'ex3', type: 'code-typing', instruction: 'Guarda en la variable resto el residuo de 15 dividido entre 4.', startingCode: 'let resto = 15 ', validationRegex: '^let\\s+resto\\s*=\\s*15\\s*%\\s*4;?$', explanationIncorrect: 'Utiliza el operador módulo %.' }
            ]
          },
          {
            roundNum: 2, label: 'Operadores de Comparación', xpReward: 20, coins: 15,
            theory: [
              { id: 't1', type: 'concept', icon: 'CheckSquare', color: '#f59e0b', title: 'Igualdad Estricta ===', body: 'En JS la comparación estricta `===` verifica que tanto el valor como el tipo de dato sean idénticos. Evita usar `==` débil.' }
            ],
            exercises: [
              { id: 'ex1', type: 'multiple-choice', question: '¿Qué devuelve `"5" === 5` en JavaScript?', options: ['true', 'false', 'undefined', '55'], correct: 1 },
              { id: 'ex2', type: 'code-typing', instruction: 'Compara si la variable edad es mayor o igual a 18.', startingCode: 'edad ', validationRegex: '^edad\\s*>=\\s*18;?$', explanationIncorrect: 'Utiliza el operador >=.' }
            ]
          },
          {
            roundNum: 3, label: 'Template Literals (` ${var} `)', xpReward: 25, coins: 20,
            theory: [
              { id: 't1', type: 'concept', icon: 'MessageSquare', color: '#f59e0b', title: 'Interpolación de cadenas', body: 'Usa comillas invertidas `` ` ` `` (backticks) e inserta variables con `${variable}` para construir mensajes fácilmente sin usar `+`.' }
            ],
            exercises: [
              { id: 'ex1', type: 'word-bank', instruction: 'Interpola la variable nombre dentro del saludo', filename: 'main.js', parts: ['let saludo = `Hola ', '___', '`;'], words: ['${nombre}', '$nombre', '{nombre}', '#nombre'], answers: ['${nombre}'] },
              { id: 'ex2', type: 'code-typing', instruction: 'Inserta la variable edad usando la sintaxis de interpolación en template literals.', startingCode: '`${', validationRegex: '^`?\\$\\{edad\\}`?$', explanationIncorrect: 'Debe ser ${edad}' }
            ]
          }
        ]
      },

      // 🏆 DESAFÍO 1 (Tras las primeras 3 lecciones)
      {
        id: 'js-chal-1',
        type: 'challenge',
        title: '🏆 Desafío 1: Calculadora de Datos',
        language: 'JS',
        xpReward: 250,
        coins: 50,
        instruction: 'Práctica de Lecciones 1-3: Declara una constante llamada precio con valor 100 y una variable let llamada descuento con valor 20. Luego calcula el total (precio menos descuento) y muéstralo con console.log(total).',
        startingCode: '// Escribe tu código aquí\n',
        validators: [
          {
            description: 'Debe declarar const precio = 100;',
            test: (doc, code) => code.includes('const') && code.includes('precio') && code.includes('100')
          },
          {
            description: 'Debe declarar let descuento = 20;',
            test: (doc, code) => code.includes('let') && code.includes('descuento') && code.includes('20')
          },
          {
            description: 'Debe calcular el total e imprimirlo con console.log()',
            test: (doc, code) => code.includes('console.log')
          }
        ]
      },

      // ── BLOQUE 2: CONSOLA Y CONTROL DE FLUJO ──────────────────────────────
      {
        id: 'js-1-4',
        title: '4. Consola y Comentarios',
        totalRounds: 3,
        rounds: [
          {
            roundNum: 1, label: 'console.log()', xpReward: 15, coins: 10,
            theory: [
              { id: 't1', type: 'concept', icon: 'Terminal', color: '#f59e0b', title: 'Imprimir en pantalla', body: '`console.log()` imprime mensajes en la consola del desarrollador. Es la herramienta #1 para probar y depurar código.' }
            ],
            exercises: [
              { id: 'ex1', type: 'code-typing', instruction: 'Imprime el mensaje "Hola Cody" en la consola.', startingCode: 'console.log(', validationRegex: '^console\\.log\\(["\']Hola Cody["\']\\);?$', explanationIncorrect: 'Asegúrate de escribir console.log("Hola Cody");' }
            ]
          },
          {
            roundNum: 2, label: 'Comentarios en JS', xpReward: 20, coins: 15,
            theory: [
              { id: 't1', type: 'concept', icon: 'FileCode', color: '#f59e0b', title: 'Comentarios de una y varias líneas', body: 'Usa `//` para comentarios de una sola línea y `/* ... */` para comentarios multilínea.' }
            ],
            exercises: [
              { id: 'ex1', type: 'code-typing', instruction: 'Escribe un comentario de una sola línea con el texto Test.', startingCode: '// ', validationRegex: '^//\\s*Test$', explanationIncorrect: 'Debe ser // Test' }
            ]
          },
          {
            roundNum: 3, label: 'console.warn y console.error', xpReward: 25, coins: 20,
            theory: [
              { id: 't1', type: 'concept', icon: 'AlertTriangle', color: '#f59e0b', title: 'Niveles de Log', body: 'Usa `console.warn()` para advertencias amarillas y `console.error()` para mensajes de error rojos en la consola.' }
            ],
            exercises: [
              { id: 'ex1', type: 'word-bank', instruction: 'Emite una advertencia en consola', filename: 'main.js', parts: ['console.', '___', '("Cuidado");'], words: ['warn', 'error', 'log', 'alert'], answers: ['warn'] }
            ]
          }
        ]
      },

      {
        id: 'js-2-1',
        title: '5. Condicionales: if, else if, else',
        totalRounds: 3,
        rounds: [
          {
            roundNum: 1, label: 'Estructura if', xpReward: 15, coins: 10,
            theory: [
              { id: 't1', type: 'concept', icon: 'GitFork', color: '#3b82f6', title: 'Toma de Decisiones', body: 'La sentencia `if (condicion) { ... }` ejecuta un bloque de código solo si la condición evalúa a `true`.' }
            ],
            exercises: [
              { id: 'ex1', type: 'code-typing', instruction: 'Escribe la apertura de una sentencia if que evalúe si edad > 18.', startingCode: 'if (', validationRegex: '^if\\s*\\(\\s*edad\\s*>\\s*18\\s*\\)\\s*\\{?$', explanationIncorrect: 'Debe ser if (edad > 18)' }
            ]
          },
          {
            roundNum: 2, label: 'else y else if', xpReward: 20, coins: 15,
            theory: [
              { id: 't1', type: 'concept', icon: 'Layers', color: '#3b82f6', title: 'Caminos alternativos', body: 'Usa `else if` para evaluar condiciones secundarias y `else` para ejecutar un código por defecto si ninguna condición previa se cumplió.' }
            ],
            exercises: [
              { id: 'ex1', type: 'word-bank', instruction: 'Agrega la cláusula para el caso contrario', filename: 'app.js', parts: ['if (puntos > 50) {\n  ganar();\n} ', '___', ' {\n  perder();\n}'], words: ['else', 'elseif', 'then', 'otherwise'], answers: ['else'] }
            ]
          },
          {
            roundNum: 3, label: 'Operador Ternario', xpReward: 25, coins: 20,
            theory: [
              { id: 't1', type: 'concept', icon: 'Zap', color: '#3b82f6', title: 'Atajo condicional', body: 'El operador ternario es una forma corta de hacer un if/else: `condicion ? valorSiTrue : valorSiFalse`.' }
            ],
            exercises: [
              { id: 'ex1', type: 'code-typing', instruction: 'Completa el operador ternario devolviendo "Mayor" o "Menor".', startingCode: 'edad >= 18 ? "Mayor" : ', validationRegex: '^edad\\s*>=\\s*18\\s*\\?\\s*["\']Mayor["\']\\s*:\\s*["\']Menor["\'];?$', explanationIncorrect: 'Completa con "Menor"' }
            ]
          }
        ]
      },

      {
        id: 'js-2-2',
        title: '6. Operadores Lógicos (&&, ||, !)',
        totalRounds: 3,
        rounds: [
          {
            roundNum: 1, label: 'Operador Y (&&)', xpReward: 15, coins: 10,
            theory: [
              { id: 't1', type: 'concept', icon: 'CheckCircle', color: '#3b82f6', title: 'Ambas condiciones verdaderas', body: 'El operador `&&` devuelve `true` únicamente si AMBAS condiciones evaluadas son verdaderas.' }
            ],
            exercises: [
              { id: 'ex1', type: 'code-typing', instruction: 'Escribe el operador Y lógico (AND).', startingCode: '&', validationRegex: '^&&$', explanationIncorrect: 'Debe ser &&' }
            ]
          },
          {
            roundNum: 2, label: 'Operador O (||)', xpReward: 20, coins: 15,
            theory: [
              { id: 't1', type: 'concept', icon: 'Circle', color: '#3b82f6', title: 'Al menos una verdadera', body: 'El operador `||` devuelve `true` si AL MENOS UNA de las condiciones se cumple.' }
            ],
            exercises: [
              { id: 'ex1', type: 'code-typing', instruction: 'Escribe el operador O lógico (OR).', startingCode: '|', validationRegex: '^\\|\\|$', explanationIncorrect: 'Debe ser ||' }
            ]
          },
          {
            roundNum: 3, label: 'Operador NOT (!)', xpReward: 25, coins: 20,
            theory: [
              { id: 't1', type: 'concept', icon: 'RefreshCw', color: '#3b82f6', title: 'Invertir un Booleano', body: 'El signo `!` invierte el valor lógico. `!true` se convierte en `false`.' }
            ],
            exercises: [
              { id: 'ex1', type: 'code-typing', instruction: 'Niega la variable estaLloviendo usando el operador NOT.', startingCode: '!', validationRegex: '^!estaLloviendo;?$', explanationIncorrect: 'Debe ser !estaLloviendo' }
            ]
          }
        ]
      },

      // 🏆 DESAFÍO 2 (Tras lecciones 4, 5 y 6)
      {
        id: 'js-chal-2',
        type: 'challenge',
        title: '🏆 Desafío 2: Validador de Acceso',
        language: 'JS',
        xpReward: 300,
        coins: 60,
        instruction: 'Práctica de Lecciones 4-6: Crea una variable llamada edad con valor 20 y una booleana tienePase con valor true. Escribe una estructura if que evalúe si la edad es >= 18 Y (&&) tienePase es verdadero. Si cumple, imprime "Acceso concedido".',
        startingCode: '// Escribe tu solución\n',
        validators: [
          {
            description: 'Debe declarar las variables edad y tienePase',
            test: (doc, code) => code.includes('edad') && code.includes('tienePase')
          },
          {
            description: 'Debe incluir un if con la combinación de &&',
            test: (doc, code) => code.includes('if') && code.includes('&&')
          },
          {
            description: 'Debe imprimir "Acceso concedido" en la consola',
            test: (doc, code) => code.toLowerCase().includes('acceso concedido')
          }
        ]
      },

      // ── BLOQUE 3: BUCLES Y FUNCIONES ──────────────────────────────────────
      {
        id: 'js-2-3',
        title: '7. Bucle For (Iteración)',
        totalRounds: 3,
        rounds: [
          {
            roundNum: 1, label: 'Sintaxis de Bucle For', xpReward: 15, coins: 10,
            theory: [
              { id: 't1', type: 'concept', icon: 'Repeat', color: '#3b82f6', title: 'Repitiendo Instrucciones', body: '`for (let i = 0; i < 5; i++)` ejecuta un bloque de código un número determinado de veces.' }
            ],
            exercises: [
              { id: 'ex1', type: 'code-typing', instruction: 'Escribe el encabezado de un bucle for que inicie i en 0 y llegue hasta i < 10.', startingCode: 'for (let i = 0; ', validationRegex: '^for\\s*\\(\\s*let\\s+i\\s*=\\s*0;\\s*i\\s*<\\s*10;\\s*i\\+\\+\\s*\\)\\s*\\{?$', explanationIncorrect: 'Debe ser for (let i = 0; i < 10; i++)' }
            ]
          },
          {
            roundNum: 2, label: 'Incrementos e Índices', xpReward: 20, coins: 15,
            theory: [
              { id: 't1', type: 'concept', icon: 'TrendingUp', color: '#3b82f6', title: 'Modificar el contador', body: '`i++` incrementa en 1 en cada vuelta. También puedes usar `i += 2` para avanzar de 2 en 2.' }
            ],
            exercises: [
              { id: 'ex1', type: 'word-bank', instruction: 'Incrementa el contador i de dos en dos', filename: 'loop.js', parts: ['for (let i = 0; i < 10; ', '___', ')'], words: ['i += 2', 'i++', 'i = 2', 'i + 2'], answers: ['i += 2'] }
            ]
          },
          {
            roundNum: 3, label: 'Break y Continue', xpReward: 25, coins: 20,
            theory: [
              { id: 't1', type: 'concept', icon: 'Square', color: '#3b82f6', title: 'Controlar el bucle', body: '`break` interrumpe y sale del bucle de inmediato. `continue` salta la vuelta actual y pasa a la siguiente.' }
            ],
            exercises: [
              { id: 'ex1', type: 'code-typing', instruction: 'Escribe la instrucción para salir inmediatamente de un bucle.', startingCode: 'b', validationRegex: '^break;?$', explanationIncorrect: 'Debe ser break;' }
            ]
          }
        ]
      },

      {
        id: 'js-2-4',
        title: '8. Bucle While y Do While',
        totalRounds: 3,
        rounds: [
          {
            roundNum: 1, label: 'Sintaxis While', xpReward: 15, coins: 10,
            theory: [
              { id: 't1', type: 'concept', icon: 'RotateCw', color: '#3b82f6', title: 'Repetir mientras sea verdadero', body: '`while (condicion) { ... }` se repite de manera continua mientras la condición siga siendo `true`.' }
            ],
            exercises: [
              { id: 'ex1', type: 'code-typing', instruction: 'Escribe la apertura de un bucle while que se ejecute mientras contador > 0.', startingCode: 'while (', validationRegex: '^while\\s*\\(\\s*contador\\s*>\\s*0\\s*\\)\\s*\\{?$', explanationIncorrect: 'Debe ser while (contador > 0)' }
            ]
          },
          {
            roundNum: 2, label: 'Evitar Bucles Infinitos', xpReward: 20, coins: 15,
            theory: [
              { id: 't1', type: 'tip', icon: 'AlertTriangle', color: '#3b82f6', title: 'Punto de Parada', body: 'Asegúrate de modificar la variable de control dentro del cuerpo del `while` para evitar que el navegador se congele en un bucle infinito.' }
            ],
            exercises: [
              { id: 'ex1', type: 'multiple-choice', question: '¿Qué provoca un bucle while cuya condición nunca cambia a false?', options: ['Una alerta bonita', 'Un bucle infinito que congela la app', 'Una descarga de archivo', 'Nada'], correct: 1 }
            ]
          },
          {
            roundNum: 3, label: 'Bucle Do While', xpReward: 25, coins: 20,
            theory: [
              { id: 't1', type: 'concept', icon: 'PlayCircle', color: '#3b82f6', title: 'Ejecutar al menos una vez', body: '`do { ... } while (condicion);` garantiza que el código dentro de `do` se ejecute por lo menos 1 vez antes de evaluar la condición.' }
            ],
            exercises: [
              { id: 'ex1', type: 'word-bank', instruction: 'Completa la estructura do while', filename: 'app.js', parts: ['do {\n  ejecutar();\n} ', '___', ' (activo);'], words: ['while', 'for', 'if', 'until'], answers: ['while'] }
            ]
          }
        ]
      },

      {
        id: 'js-3-1',
        title: '9. Funciones: Parámetros y Retorno',
        totalRounds: 3,
        rounds: [
          {
            roundNum: 1, label: 'Declarar Funciones', xpReward: 15, coins: 10,
            theory: [
              { id: 't1', type: 'concept', icon: 'Box', color: '#10b981', title: 'Bloques Reutilizables', body: 'Una función agrupa instrucciones para ejecutarlas cuando las necesites. Se declara con `function nombre() { ... }`.' }
            ],
            exercises: [
              { id: 'ex1', type: 'code-typing', instruction: 'Declara la apertura de una función llamada saludar.', startingCode: 'function ', validationRegex: '^function\\s+saludar\\s*\\(\\s*\\)\\s*\\{?$', explanationIncorrect: 'Debe ser function saludar()' }
            ]
          },
          {
            roundNum: 2, label: 'Parámetros y Argumentos', xpReward: 20, coins: 15,
            theory: [
              { id: 't1', type: 'concept', icon: 'Sliders', color: '#10b981', title: 'Recibir Entradas', body: 'Los parámetros son variables entre los paréntesis de la función que reciben datos al ser invocada. Ejemplo: `function sumar(a, b)`.' }
            ],
            exercises: [
              { id: 'ex1', type: 'code-typing', instruction: 'Declara una función multiplicacion que reciba dos parámetros x e y.', startingCode: 'function multiplicacion(', validationRegex: '^function\\s+multiplicacion\\s*\\(\\s*x\\s*,\\s*y\\s*\\)\\s*\\{?$', explanationIncorrect: 'Debe ser function multiplicacion(x, y)' }
            ]
          },
          {
            roundNum: 3, label: 'Retornar Valores (return)', xpReward: 25, coins: 20,
            theory: [
              { id: 't1', type: 'concept', icon: 'ArrowRightCircle', color: '#10b981', title: 'Devolver Resultados', body: 'La palabra clave `return` devuelve un valor procesado desde la función hacia donde fue llamada y finaliza su ejecución.' }
            ],
            exercises: [
              { id: 'ex1', type: 'code-typing', instruction: 'Escribe la instrucción para retornar la suma de a + b.', startingCode: 'return ', validationRegex: '^return\\s+a\\s*\\+\\s*b;?$', explanationIncorrect: 'Debe ser return a + b;' }
            ]
          }
        ]
      },

      // 🏆 DESAFÍO 3 (Tras lecciones 7, 8 y 9)
      {
        id: 'js-chal-3',
        type: 'challenge',
        title: '🏆 Desafío 3: Creador de Funciones e Iteración',
        language: 'JS',
        xpReward: 350,
        coins: 70,
        instruction: 'Práctica de Lecciones 7-9: Crea una función llamada contarHasta que reciba un número n. Dentro, usa un bucle for desde i = 1 hasta n e imprime cada número con console.log(i).',
        startingCode: '// Escribe tu solución\n',
        validators: [
          {
            description: 'Debe declarar una función llamada contarHasta(n)',
            test: (doc, code) => code.includes('function') && code.includes('contarHasta')
          },
          {
            description: 'Debe incluir un bucle for que recorra hasta n',
            test: (doc, code) => code.includes('for') && code.includes('i <= n') || code.includes('i < n')
          },
          {
            description: 'Debe usar console.log(i) dentro del bucle',
            test: (doc, code) => code.includes('console.log')
          }
        ]
      },

      // ── BLOQUE 4: ARROW FUNCTIONS Y ARRAYS ────────────────────────────────
      {
        id: 'js-3-2',
        title: '10. Funciones Flecha (Arrow Functions)',
        totalRounds: 3,
        rounds: [
          {
            roundNum: 1, label: 'Sintaxis =>', xpReward: 15, coins: 10,
            theory: [
              { id: 't1', type: 'concept', icon: 'Send', color: '#10b981', title: 'Funciones Modernas', body: 'Las funciones flecha son una sintaxis concisa de ES6: `const sumar = (a, b) => { return a + b; };`.' }
            ],
            exercises: [
              { id: 'ex1', type: 'code-typing', instruction: 'Completa la flecha de la función arrow.', startingCode: 'const duplicar = (n) ', validationRegex: '^const\\s+duplicar\\s*=\\s*\\(\\s*n\\s*\\)\\s*=>\\s*.*$', explanationIncorrect: 'Utiliza el símbolo =>' }
            ]
          },
          {
            roundNum: 2, label: 'Retorno Implícito', xpReward: 20, coins: 15,
            theory: [
              { id: 't1', type: 'concept', icon: 'Zap', color: '#10b981', title: 'Una sola línea', body: 'Si la función flecha tiene una sola línea, puedes omitir las llaves `{}` y el `return`: `const triple = n => n * 3;`.' }
            ],
            exercises: [
              { id: 'ex1', type: 'word-bank', instruction: 'Crea una función flecha de retorno implícito que devuelva el doble', filename: 'math.js', parts: ['const doble = n ', '___', ' n * 2;'], words: ['=>', '->', 'function', 'return'], answers: ['=>'] }
            ]
          },
          {
            roundNum: 3, label: 'Parámetros Únicos', xpReward: 25, coins: 20,
            theory: [
              { id: 't1', type: 'concept', icon: 'Check', color: '#10b981', title: 'Paréntesis Opcionales', body: 'Si una función flecha recibe exactamente UN parámetro, puedes omitir los paréntesis: `const cuadrado = x => x * x;`.' }
            ],
            exercises: [
              { id: 'ex1', type: 'multiple-choice', question: '¿En qué caso se pueden omitir los paréntesis en una arrow function?', options: ['Cuando recibe 1 solo parámetro', 'Cuando recibe 2 parámetros', 'Nunca', 'Siempre'], correct: 0 }
            ]
          }
        ]
      },

      {
        id: 'js-3-3',
        title: '11. Arrays (Listas de Datos)',
        totalRounds: 3,
        rounds: [
          {
            roundNum: 1, label: 'Crear y Acceder a Arrays', xpReward: 15, coins: 10,
            theory: [
              { id: 't1', type: 'concept', icon: 'List', color: '#10b981', title: 'Colecciones de Datos', body: 'Un Array almacena múltiples valores ordenados entre corchetes `[ ]`. Ejemplo: `let frutas = ["Manzana", "Banana"];`.' }
            ],
            exercises: [
              { id: 'ex1', type: 'code-typing', instruction: 'Declara un arreglo llamado números con los elementos 1, 2, 3.', startingCode: 'const numeros = [', validationRegex: '^const\\s+numeros\\s*=\\s*\\[\\s*1\\s*,\\s*2\\s*,\\s*3\\s*\\];?$', explanationIncorrect: 'Debe ser const numeros = [1, 2, 3];' }
            ]
          },
          {
            roundNum: 2, label: 'Índices Base 0', xpReward: 20, coins: 15,
            theory: [
              { id: 't1', type: 'concept', icon: 'Hash', color: '#10b981', title: 'Posición de Elementos', body: 'Los elementos en un Array se posicionan desde el índice 0. `frutas[0]` obtiene el primer elemento.' }
            ],
            exercises: [
              { id: 'ex1', type: 'multiple-choice', question: '¿Cuál es el índice del PRIMER elemento en un arreglo?', options: ['0', '1', '-1', 'first'], correct: 0 }
            ]
          },
          {
            roundNum: 3, label: 'Propiedad .length', xpReward: 25, coins: 20,
            theory: [
              { id: 't1', type: 'concept', icon: 'Maximize2', color: '#10b981', title: 'Tamaño del Arreglo', body: 'La propiedad `.length` devuelve el número total de elementos contenidos en el arreglo.' }
            ],
            exercises: [
              { id: 'ex1', type: 'code-typing', instruction: 'Obtén la cantidad de elementos del arreglo colores usando .length.', startingCode: 'colores.', validationRegex: '^colores\\.length;?$', explanationIncorrect: 'Debe ser colores.length' }
            ]
          }
        ]
      },

      {
        id: 'js-3-4',
        title: '12. Métodos de Arrays (push, pop, filter)',
        totalRounds: 3,
        rounds: [
          {
            roundNum: 1, label: 'push() y pop()', xpReward: 15, coins: 10,
            theory: [
              { id: 't1', type: 'concept', icon: 'PlusCircle', color: '#10b981', title: 'Añadir y Remover', body: '`.push(elemento)` agrega un elemento al final del arreglo. `.pop()` elimina el último elemento.' }
            ],
            exercises: [
              { id: 'ex1', type: 'code-typing', instruction: 'Añade el elemento "Verde" al final del arreglo colores.', startingCode: 'colores.push(', validationRegex: '^colores\\.push\\(["\']Verde["\']\\);?$', explanationIncorrect: 'Utiliza colores.push("Verde");' }
            ]
          },
          {
            roundNum: 2, label: 'includes() e indexOf()', xpReward: 20, coins: 15,
            theory: [
              { id: 't1', type: 'concept', icon: 'Search', color: '#10b981', title: 'Búsqueda en Listas', body: '`.includes("valor")` comprueba si el valor existe en el arreglo (devuelve `true`/`false`). `.indexOf("valor")` te da su posición.' }
            ],
            exercises: [
              { id: 'ex1', type: 'word-bank', instruction: 'Verifica si el arreglo contiene el elemento "Juan"', filename: 'users.js', parts: ['let existe = usuarios.', '___', '("Juan");'], words: ['includes', 'find', 'contains', 'has'], answers: ['includes'] }
            ]
          },
          {
            roundNum: 3, label: 'map() y filter()', xpReward: 25, coins: 20,
            theory: [
              { id: 't1', type: 'concept', icon: 'Filter', color: '#10b981', title: 'Transformar y Filtrar', body: '`.map()` transforma cada elemento del arreglo creando uno nuevo. `.filter()` genera un nuevo arreglo con los elementos que cumplan una condición.' }
            ],
            exercises: [
              { id: 'ex1', type: 'multiple-choice', question: '¿Cuál método de arreglo crea un NUEVO arreglo filtrando elementos por una condición?', options: ['filter()', 'map()', 'push()', 'pop()'], correct: 0 }
            ]
          }
        ]
      },

      // 🏆 DESAFÍO FINAL JAVASCRIPT (Tras lecciones 10, 11 y 12)
      {
        id: 'js-chal-final',
        type: 'challenge',
        title: '🏆 Desafío Final JavaScript',
        language: 'JS',
        xpReward: 500,
        coins: 100,
        instruction: 'Práctica de Lecciones 10-12: Declara una función flecha llamada filtrarMayores que reciba un arreglo de números y devuelva un nuevo arreglo con los números mayores a 10 usando el método .filter().',
        startingCode: '// Escribe tu solución aquí\n',
        validators: [
          {
            description: 'Debe declarar una arrow function llamada filtrarMayores',
            test: (doc, code) => code.includes('filtrarMayores') && code.includes('=>')
          },
          {
            description: 'Debe utilizar el método .filter()',
            test: (doc, code) => code.includes('.filter')
          },
          {
            description: 'Debe evaluar números mayores a 10 (> 10)',
            test: (doc, code) => code.includes('>') && code.includes('10')
          }
        ]
      }
    ]
  }
];
