# Constitución — Diario de Estudio

Principios innegociables del proyecto. Toda spec, plan o tarea debe cumplirlos;
si algo contradice esta constitución, gana esta constitución (o se cambia aquí primero).

## Qué es el proyecto

Web estática para registrar sesiones de estudio y motivarse con la racha de días
seguidos. Usuario único: el propio autor, en su navegador, sin servidor.

## Reglas duras

1. **Solo tres archivos de app**: `index.html`, `styles.css`, `app.js`. Sin frameworks,
   librerías, bundlers ni fuentes externas. Funciona abriendo `index.html` con doble clic.
2. **Toda la interfaz en español**: textos, etiquetas, mensajes de error y estados vacíos.
3. **Fechas en hora local del usuario, nunca UTC.** Usar `fechaLocalTexto()`; prohibido
   `toISOString()` para generar fechas guardadas (desfasa un día).
4. **Semántica de la racha**: un día cuenta con ≥1 sesión; la racha son los días
   consecutivos que terminan hoy; si hoy aún no hay sesión pero la de ayer sí, la racha
   sigue viva.
5. **La mejor racha es derivada**: se recalcula en cada pintado, jamás se persiste.
6. **Los datos viven en `localStorage`** (clave `sesionesEstudio`). Sin backend, sin red.
7. **Calidad mínima de accesibilidad**: foco de teclado visible, contraste AA y
   `prefers-reduced-motion` respetado.
8. **Código legible para quien empieza**: nombres claros, comentarios en español, sin
   abstracciones prematuras.

## Flujo de trabajo (SDD)

- Toda funcionalidad nueva nace en `specs/NNN-nombre/` con `spec.md` → `plan.md` →
  `tasks.md`. Sin spec aprobada, no se toca el código de la app.
- `spec.md` = el qué y el porqué (criterios de aceptación verificables).
  `plan.md` = el cómo técnico. `tasks.md` = pasos concretos, en orden.
- Una spec se da por hecha solo tras verificarla en navegador real.
- `MEMORY.md` se actualiza al terminar cada tarea.
- Nada de esto se salta por pequeño que parezca el cambio.

## Decisiones ya tomadas (resumen histórico)

- Diseño: una hoja única, tinta azul + amarillo resaltador, Georgia en títulos
  (guía `frontend-design`, commit `ad8705a`).
- Sin borrar ni editar sesiones en esta versión.
- Una única línea de aviso de error bajo el formulario (no un aviso por campo).
