---
description: Lanza el agente reviewer (QA) sobre el estado actual del proyecto
---

Usa el subagente `reviewer` para auditar el estado actual del proyecto:

1. Si hay una spec en curso (`specs/NNN-*/tasks.md` con tareas sin marcar o recién
   marcadas), evalúa esa spec (criterios de aceptación + plan + tasks).
2. Ejecuta las pruebas de `tests/` con Chromium headless y reporta resultados reales.
3. Dictamen final: APTO o RECHAZADO con hallazgos por severidad (archivo:línea).

$ARGUMENTS
