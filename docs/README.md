# Dino Platformer Adventure
 
A browser-based, side-scrolling platformer built with p5.js. You guide a dinosaur avatar across dynamic levels, avoiding hazards, collecting health pickups, and reaching the cave at each stage’s end. This README explains the game’s internal architecture, flow of control, and class responsibilities in detail, making it easier to explore, maintain, or extend the codebase.
 
---
 
## Installation & Usage
 
1. Clone or download this repository.  
2. Serve files via a local web server (e.g. `npx http-server .`).  
3. Open `index.html` in your browser.  
4. Use ← / → (or on-screen buttons) to move, ↑ (or SPACE) to jump, and ESC (or Q) to pause or quit.
 
---
 
## High-Level Architecture
 
Game logic resides in files like **`sketch.js`**, **`Game.js`**, **`Map.js`** and **`Player.js`** etc. Each file contains a class and all its functionality in a modular fashion. The code base can generally be categorized as shown below:
 
1. **Core Loop & Entry Point**  
2. **Resource Management**  
3. **Input Abstraction**  
4. **Screen & UI Management**  
5. **Game Controller**  
6. **Level Definition & Map**  
7. **Entity Layer**  
8. **Utilities**  
 
The system uses composition to assemble complex behavior from simpler parts. Singleton classes (`AssetManager` and `SoundManager`) centralize resource and audio handling, while the `Game` class orchestrates the overall flow.
 
---
 
## Module Responsibilities
 
### Core Loop & Entry Point
 
At startup, p5.js invokes `preload()`, `setup()`, and repeatedly calls `draw()`. The `preload()` function delegates to `AssetManager.preload()` to load all images, sprites, layouts, and audio assets. In `setup()`, singletons for `SoundManager`, `GameScreen`, and `InputHandler` are created, then a `Game` instance is initialized with the first level. The `draw()` function runs approximately 60 times per second: it first polls the `InputHandler` to capture the latest key or touch states, then passes control to the `Game` object to handle input, update game state, and render the scene according to the current game mode (home, instructions, playing, paused, game over, or victory).
 
### Resource Management
 
The **`AssetManager`** singleton preloads and caches all graphical and audio assets, providing simple methods (`getImage(id)`, `getAudio(id)`) for retrieval at runtime. The **`SoundManager`** singleton wraps the p5.js sound API, offering methods such as `playBGM(track)`, `stopBGM()`, and `playSFX(id)` along with volume and looping controls. Centralizing asset and audio logic ensures that no other component needs to concern itself with loading or decoding resources.
 
### Input Abstraction
 
The **`InputHandler`** class installs event listeners for keyboard and pointer events, including on-screen buttons for mobile devices. It maintains boolean flags for left, right, jump, and pause commands, and exposes three primary query methods—`getMoveLeft()`, `getMoveRight()`, and `getAndResetJump()`—to the game logic. Basic debouncing ensures that holding the jump key does not trigger repeated jumps.
 
### Screen & UI Management
 
The **`GameScreen`** class renders all non-gameplay interfaces: the home menu, instruction page, pause overlay, game-over screen, level-complete message, and victory screen. It relies on `AssetManager` for visual assets and reacts to window resize events to adjust the canvas scale and margins, preserving the game’s aspect ratio across device sizes.
 
### Game Controller
 
The **`Game`** class functions as the application’s conductor. It maintains an internal state machine (HOME, INSTRUCTIONS, PLAYING, PAUSED, GAMEOVER, WIN) and switches behavior accordingly. When a new level is loaded, `Game` creates fresh instances of `Map`, `Player`, and `Health`. During each frame in PLAYING mode, `Game` handles user input by forwarding movement and jump commands to the `Player` and scrolling logic to the `Map`, updates all physics and entity states (including spawning of falling hazards), performs collision detection between the player and every entity type, and resolves events such as damage, pickups, or level completion. Finally, the `Game` class renders the map, the player, and the HUD (health bar and level indicator), and triggers sound effects or background music transitions via the `SoundManager`.
 
### Level Definition & Map
 
Level data are defined in a JSON-like **`Layouts`** array, where each entry specifies the spawn coordinates and types of platforms, food items, ground hazards, enemies, falling obstacles, and the cave. The **`Map`** class consumes one layout, instantiates arrays of `Platform`, `Enemy`, `Food`, `GroundDamage`, `SkyFall`, and a single `Cave`, and holds a reference to the `AssetManager`. On each update, the map advances each entity’s logic—moving hazards, animating patrolling enemies, and spawning new falling objects when timers elapse—and scrolls all objects leftward once the player passes a mid-screen threshold. The `Map` also handles input flags for rightward movement to determine when to scroll versus move the player character.
 
### Entity Layer
 
Each in-game object follows a uniform interface of `update()` and `display()`, enabling the `Game` and `Map` classes to treat them polymorphically:
 
- **Platform**: Static ground or ledges; recalculates hitboxes via `updateBounds()`.  
- **Enemy**: Patrols between fixed points; reverses direction at endpoints and inflicts damage on contact.  
- **GroundDamage**: Static hazards that continuously drain health while the player remains in contact.  
- **Food**: Disappears on collection and triggers a health-restoration event.  
- **SkyFall**: Spawns at random intervals, ignores platforms, and damages the player on impact.  
- **Cave**: Level-end trigger; when the player collides, invokes `Game.nextLevel()`, freezes map movement, and transitions to the level-complete screen.
 
### Utilities
 
The **`Brick`** module defines global constants for tile width and height, ensuring consistent sizing and alignment for platforms and the health-bar rendering.
 
---
 
## Flow of Control
 
During normal gameplay, each frame proceeds as follows:
 
1. **Input Polling**: `InputHandler` updates its internal flags.  
2. **Game Handle Input**: `Game` examines movement and jump flags, applies them to the `Player`, and instructs the `Map` when to scroll.  
3. **Update Cycle**: `Game` calls `Player.update()`, then `Map.update()`, which cascades to each entity’s `update()` method (patrol logic, spawn timers, gravity).  
4. **Collision Detection**: Axis-aligned bounding-box checks are performed between the `Player` and every entity list; corresponding callbacks handle damage, healing, or level progression.  
5. **Rendering**: `Map.display()` draws background and entities, `Player.display()` draws the avatar, and `GameScreen.drawHUD()` overlays the health bar and level indicator.  
6. **Audio Events**: Actions such as jumping, getting hurt, collecting food, or completing a level invoke `SoundManager` methods to play appropriate sound effects or change the background track.
 
State transitions to pause, game over, or victory divert rendering and input handling to the `GameScreen` module until the player resumes or restarts.
 
---
 
## Extensibility & Best Practices
 
- **Adding Levels**: Simply append a new layout object to the `Layouts` array. The `Map` construction logic will automatically incorporate the new data.  
- **Introducing New Entities**: Define a class with `update()` and `display()` methods, register it in `Map` setup, and include it in `Game` collision checks.  
- **Adding Screens**: Extend `GameScreen` with a new drawing method, and update the `Game` state machine to call it in the appropriate mode.  
- **Performance Considerations**: All resource loading occurs in `preload()`. Per-frame work is limited to numeric updates and draw calls—avoid allocating objects during `update()` to minimise garbage collection pauses.
 
By adhering to these conventions—modular design, centralised resource handling, and clear separation of concerns—the Dino codebase remains clean, maintainable, and primed for future enhancements.