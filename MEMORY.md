# MEMORY.md — Diario de Estudio

Registro del estado del proyecto para futuras sesiones. Sin secretos.

## Estado (2026-10-16)

- **📍 Ubicación canónica: `/home/ramon/projects/diario-estudio` (disco Linux local).**
  Decisión del usuario tras el incidente de la microSD: NO trabajar desde
  `/mnt/shared/removable/...`. La microSD quedó con errores de E/S, objetos git
  corruptos y un directorio zombi `Ramon/proyectos/diario-estudio` que el usuario
  debe borrar desde su gestor de archivos (contiene `git_token.txt` ilegible).
- **Diseño renovado** siguiendo la skill `frontend-design` (`.agents/skills/`): una sola
  "hoja" blanca con bloques separados por reglas (sin kit de tarjetas ni gradientes),
  paleta tinta azul-negra + azul bolígrafo + amarillo resaltador, Georgia para títulos y
  el número de racha, trazo de resaltador animado una sola vez al cargar (respeta
  `prefers-reduced-motion`). Copy del vacío: "¡Apunta la primera!".
- App funcional: `index.html` + `styles.css` + `app.js`. Racha actual (🔥) y mejor racha
  (🏆) calculadas en local, fechas en hora local, datos en `localStorage` clave
  `sesionesEstudio`.
- Probada en Chromium real con `puppeteer-core` (script en `/tmp/opencode/diario-test/`):
  3 sesiones → racha 3 / mejor 3; escenario con hueco → mejor 4; consola sin errores.
  Capturas de prueba en `capturas/` (375 px).
- Repositorio público creado: https://github.com/ramarvel/diario-estudio (rama `main`).
  Commits: `a68c366` inicial; `ad8705a` diseño renovado + skill + MEMORY.md. Todo el
  proyecto está sincronizado con el remoto; solo quedan sin trackear `opencode.json` y
  `git_token.txt` (a propósito, por el token).
- Skill `frontend-design` de anthropics/skills instalada en `.agents/skills/`
  (+ `skills-lock.json`). Requiere reiniciar OpenCode para cargarla.

- **Estructura SDD adoptada** (2026-10-16): `docs/constitution.md` (redactada: 8 reglas
  duras + flujo SDD), `specs/001-validacion-formulario/` con spec/plan/tasks **redactados**
  (estado: propuesta, pendiente de ejecutar las tasks) y `tests/` con `.gitkeep`.
  Spec 001 = sustituir la validación nativa por JS con mensajes en español (`novalidate`).

- **Equipo multiagente SDD** (2026-10-16): subagentes en `.opencode/agents/`
  (coordinator/planner/implementer/reviewer con permisos de rol) + comandos
  `/spec` y `/revisar` en `.opencode/commands/`. **Confirmado registrado** tras
  reiniciar OpenCode y abrir sesión nueva (verificado con `opencode api get /api/agent`).
  Flujo: coordinator → planner → implementer → reviewer → commit del usuario.
  **La spec 001 aún NO se ha ejecutado con el equipo**: siguiente paso del proyecto.
- Infra de pruebas previa en `/tmp/opencode/diario-test/` (puppeteer-core + Chromium
  /usr/bin/chromium, referencia en capturas.js/test.js). Ojo: en headless,
  `waitForFunction` con polling raf puede colgarse → usar sondeo manual con
  evaluate + setTimeout. El implementer recreará el test dentro de `tests/`.
- Token de GitHub **rotado el 2026-10-16** (el antiguo revocado; el nuevo solo está en
  `opencode.json`). `git_token.txt` sigue en la raíz: borrarlo cuando quieras.

## Pendiente / avisos

- **Rotar el token GitHub** (`ghp_…`): apareció en texto plano en `opencode.json`,
  `git_token.txt` y en la conversación. Borrar esos ficheros o excluirlos de git.
- `opencode.json`, `git_token.txt` y `.agents/` están sin commitear a propósito
  (los dos primeros por contener el token).
- La validación con `required`/`min` del HTML bloquea antes que el aviso rojo propio;
  pendiente de decidir si se pasa todo a JS (`novalidate`) para mensajes siempre en español.
- No existe exportar/importar de sesiones (posible futura funcionalidad).
