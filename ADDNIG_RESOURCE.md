# Adding Resource Loose Checklist

### Database

- Add resource model and its corresponding initialization function in `main/database/models/`.
- Initialize model in `connectDatabase` function in `main/database/index.ts`.

### Type (TypeScript)

- Add read and write type declaration for the corresponding model in `shared/types/`.

### Listener

- Add listeners for model operations in a setup function in `main/listeners/`.
- Call setup function in `main/listeners/index.ts`.

### Preload

- Expose operation functions to renderer in `main/preload.ts`.
- Add type declarations for those operations in `renderer/preload.d.ts`.
