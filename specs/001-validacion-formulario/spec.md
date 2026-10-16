# Spec 001 — Validación del formulario con mensajes en español

Estado: **propuesta** (pendiente de aprobación)
Fecha: 2026-10-16

## Problema

Hoy el formulario usa la validación nativa del navegador (`required`, `min="1"`).
Esa validación intercepta el envío **antes** de la nuestra, así que:

- El aviso rojo propio (`Revisa los campos…`) casi nunca aparece: es código muerto.
- Los tooltips de error los pinta el navegador en **su idioma**, no siempre en español.
- No se marca qué campo falla ni se lleva el foco a él.

## Qué queremos

Validar en JavaScript, con mensajes nuestros, siempre en español.

## Criterios de aceptación

1. El formulario lleva `novalidate`: el navegador no muestra sus tooltips.
2. Enviar con el **tema vacío** no guarda nada y muestra "Escribe el tema de la sesión."
3. Enviar con los **minutos vacíos** no guarda nada y muestra "Indica los minutos estudiados."
4. Enviar **minutos ≤ 0 o no numéricos** no guarda nada y muestra
   "Los minutos deben ser un número mayor que 0."
5. Enviar con la **fecha vacía o inválida** no guarda nada y muestra "Elige una fecha válida."
6. El campo con error se marca visualmente (borde rojo + `aria-invalid`) y recibe el foco.
7. Tras un envío fallido, el aviso desaparece y el marcado rojo se limpia al enviar
   correctamente.
8. La sesión válida se guarda igual que ahora: aparece en la lista, actualiza ambas
   rachas y sobrevive a F5.
9. Todo el texto nuevo de error está en español (regla dura 2 de la constitución).

## Fuera de alcance

- Rechazar fechas futuras (candidato a spec 002).
- Borrar o editar sesiones existentes.
- Cambiar el diseño del formulario (la línea de aviso `.aviso` ya existe y se reutiliza).

## Verificación

- Manual: los 4 errores + 1 guardado correcto en navegador (<3 min).
- Automatizada: script en `tests/` que reproduce los 5 casos con Chromium headless.
