---
description: Crea el esqueleto de una spec SDD nueva con el siguiente número disponible
---

Crea una nueva spec SDD llamada "$ARGUMENTS" siguiendo la convención del proyecto:

1. Busca en `specs/` el siguiente número disponible (`002-`, `003-…`) y crea la carpeta
   `specs/NNN-$ARGUMENTS/` con `spec.md`, `plan.md` y `tasks.md`.
2. `spec.md`: estado "propuesta", problema, qué queremos, criterios de aceptación
   verificables, fuera de alcance y verificación. Basate en `docs/constitution.md`.
3. `plan.md` y `tasks.md`: déjalos con el esqueleto vacío de encabezados; los rellenará
   el agente `planner` cuando llegue su turno.
4. No toques el código de la app ni hagas commit.
