# AGENTS.md

## Qué es

"Diario de Estudio": web estática vanilla para registrar sesiones de estudio y ver la racha
de días seguidos. Sin frameworks, sin librerías, sin build ni servidor: se abre `index.html`
con doble clic y funciona.

## Reglas duras (del usuario)

- **Solo tres archivos de la app**: `index.html`, `styles.css`, `app.js`. Junto a ellos, en la
  raíz, hay dos archivos de configuración/datos: este `AGENTS.md` y `opencode.json` (config
  de OpenCode con dos MCP: `chrome-devtools` local y `context7` remoto; su clave
  `CONTEXT7_API_KEY` es del usuario y puede estar vacía). No añadir dependencias, herramientas
  de build ni más archivos sin pedir permiso.
- **Fechas siempre en hora local del usuario, nunca UTC.** No usar `toISOString()` para
  generar la fecha guardada (devuelve UTC y puede ser un día distinto). Usar el helper
  `fechaLocalTexto()` existente en `app.js`.
- **Racha**: un día cuenta con al menos una sesión. Es el número de días consecutivos que
  terminan hoy. Si hoy aún no hay sesión pero la de ayer sí, la racha sigue viva (se cuenta
  desde ayer, no se rompe hasta que termine el día).
- **Mejor racha**: máxima de días consecutivos de todo el histórico (`calcularMejorRacha()`).
  Es una función pura derivada de las sesiones: se recalcula en cada pintado y **nunca se
  guarda en `localStorage`**. Para comparar días consecutivos, sumar días con `setDate()`
  (no restar milisegundos: el cambio de hora DST rompe esa resta).
- Toda la interfaz en español.

## Estructura y flujo

- `app.js` es el único JS. Guarda las sesiones en `localStorage` bajo la clave
  `sesionesEstudio`, como array JSON con objetos `{ id, fecha, tema, minutos }`.
- `fecha` se guarda como texto `aaaa-mm-dd` (mismo formato que genera `<input type="date">`).
- Ambas rachas (`calcularRacha()` y `calcularMejorRacha()`) comparten el conjunto de días
  con sesión vía `diasConSesion()`.
- El pintado se hace con DOM nativo desde `pintar()`; se llama al cargar y tras cada guardado.
- Sin sistema de módulos (todo global en un solo `<script>`), sin transpilación.

## Equipo multiagente (SDD)

Cuatro subagentes en `.opencode/agents/` (se invocan pidiéndolos por nombre, p. ej.
"usa el subagente planner"): `coordinator` (orquesta el flujo sin tocar nada),
`planner` (escribe `plan.md`/`tasks.md`, solo puede editar `specs/**` y `docs/**`),
`implementer` (ejecuta tasks en los 3 archivos de la app y las va marcando) y
`reviewer` (auditor QA: verifica criterios, corre tests con Chromium y dictamina
APTO/RECHAZADO; no puede editar). Comandos de apoyo: `/spec <nombre>` (nueva spec) y
`/revisar` (auditoría). El commit y push siempre los decide el usuario tras el APTO.

## Cómo probar

Abrir `index.html` en el navegador (doble clic). No hay comandos de build, test ni lint.
Verificar manualmente: guardar sesión → sube la racha, aparece en la lista y sobrevive a F5.
Para la mejor racha: crear sesiones seguidas de días alternos (ej: hoy, ayer, hueco de
2 días, y otro tramo de 4 días) → la racha actual debe reflejar solo el tramo final, y la
mejor racha debe quedar en el tramo más largo.

## Decisiones ya tomadas

- Lista ordenada de más reciente a más antigua (desempate por `id` descendente).
- No hay borrar ni editar sesiones en esta versión (es una base a ampliar poco a poco).
- Errores de validación: un único aviso en rojo bajo el formulario.
- La "mejor racha" no guarda fecha del tramo récord ni desempata rachas iguales: solo
  muestra el número de días máximo.

## Limites
  ✅ Siempre: actualizar `MEMORY.md` al terminar cada tarea
