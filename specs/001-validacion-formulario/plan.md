# Plan — Spec 001 (validación del formulario)

## Situación actual

- `index.html`: `<form id="formSesion">` con `required` en fecha/tema y `min="1"` en minutos.
- `app.js`: al `submit` valida ya en JS y escribe en `#aviso`, pero la validación nativa
  corta antes → ese aviso no se ve casi nunca.
- `styles.css`: clase `.aviso` (rojo) ya existente. Sin cambios de diseño necesarios.

## Cambio técnico

1. **`index.html`**
   - `novalidate` al `<form>` (regla 1 cumplida: cambio sobre el archivo existente).
   - `aria-live="polite"` al `<p id="aviso">` para que lectores de pantalla anuncien el error.
2. **`app.js`** — ampliar el bloque de validación del `submit`:
   - Comprobar campo a campo (fecha → tema → minutos) con mensajes propios en español.
   - En el primer fallo: mostrar el mensaje, poner `aria-invalid="true"` en ese campo,
     hacer `focus()` y **salir sin guardar**.
   - Limpiar `aria-invalid` y el aviso cuando el envío sea correcto.
   - Se mantiene el patrón de "un único aviso" ya decidido en AGENTS.md.
3. **`styles.css`**
   - Regla nueva: `.campo input[aria-invalid="true"] { border-color: #c62828 }`
     (color ya usado por `.aviso`; sin sombras nuevas, respetando el diseño de hoja única).

## Riesgos y mitigaciones

- Nulo riesgo para los datos: `localStorage` y el guardado no cambian de forma.
- Sin dependencias nuevas: sigue siendo JS vanilla en el mismo `<script>`.

## Verificación

- Manual en navegador: vacío, minutos 0, solo tema vacío, solo minutos vacío, y válido.
- Automatizado: copiar el patrón de `/tmp/opencode/diario-test/` a `tests/validacion.test.js`
  (puppeteer-core + Chromium del sistema) y ejecutarlo antes del commit.
