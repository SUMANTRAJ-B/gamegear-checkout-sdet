# Assets / Images

GameGear adheres strictly to the design requirement to avoid external image dependencies.
All product visuals and iconography are rendered natively using inline SVG components within the application codebase (`assets/js/app.js` and `assets/css/styles.css`).

This guarantees:
- Fast, zero-network, local offline rendering.
- Vector crispness on high-DPI displays.
- Predictable visual testing across browsers.
