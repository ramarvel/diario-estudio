# Tasks — Spec 001 (validación del formulario)

Ejecutar en orden. Marcar cada tarea [x] al terminarla.

1. [ ] `index.html`: añadir `novalidate` al formulario y `aria-live="polite"` a `#aviso`.
2. [ ] `app.js`: reescribir la validación del `submit` con los mensajes exactos de la
       spec (fecha, tema, minutos), `aria-invalid` y `focus()` al primer campo inválido.
3. [ ] `styles.css`: añadir la regla de borde rojo para `input[aria-invalid="true"]`.
4. [ ] Probar a mano en navegador: 4 errores + 1 guardado correcto (criterios 2–8).
5. [ ] Crear `tests/validacion.test.js` (puppeteer-core + Chromium headless) que cubra
       los mismos 5 casos y ejecutarlo.
6. [ ] Añadir `.gitkeep` a `tests/` si aún no está (para que git trackee la carpeta).
7. [ ] Actualizar `MEMORY.md` y los "Decisiones ya tomadas" de `docs/constitution.md`
       si algo cambia respecto a lo ya decidido.
8. [ ] Commit y push: `Spec 001: validación en español con novalidate`.

## Criterio de terminado

Los 9 criterios de aceptación de `spec.md` cumplidos, tests automatizados en verde
y subidos a GitHub.
