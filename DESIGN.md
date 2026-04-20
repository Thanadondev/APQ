# Anime Personality Quiz - Design System

## Typography Tokens
- **Font Group (Display/Headline)**: `Plus Jakarta Sans`
- **Font Group (Body/Title/Label)**: `Manrope`

## Color Palette Tokens (Light Theme)
- `background`: #f8f9fa
- `on_background`: #2e3335
- `surface`: #f8f9fa
- `on_surface`: #2e3335
- `surface_variant`: #dee3e5
- `on_surface_variant`: #5a6062
- `surface_container_lowest`: #ffffff
- `surface_container_low`: #f2f4f5
- `surface_container`: #ebeef0
- `surface_container_high`: #e5e9eb
- `surface_container_highest`: #dee3e5
- `primary`: #69558e
- `on_primary`: #fef7ff
- `primary_container`: #d6beff
- `on_primary_container`: #4b386e
- `secondary`: #006c53
- `on_secondary`: #e5fff2
- `secondary_container`: #98ffd9
- `on_secondary_container`: #00634b
- `tertiary`: #7c5649
- `on_tertiary`: #fff7f5
- `tertiary_container`: #ffccbc
- `on_tertiary_container`: #664237
- `error`: #ac3149
- `on_error`: #fff7f7
- `error_container`: #f76a80
- `on_error_container`: #68001f
- `outline`: #767c7e
- `outline_variant`: #aeb3b5

---

*Below is the comprehensive strategic guide generated for this project:*

# Design System Strategy: The Ethereal Editorial

## 1. Overview & Creative North Star
This design system is built upon the Creative North Star of **"The Ethereal Editorial."** We are moving away from the "standard" layout-block aesthetic to create a digital experience that feels like a premium, high-fashion manga. The goal is to balance the whimsical, emotive energy of anime with the structured, breathable sophistication of a luxury editorial magazine.

We achieve this through **Intentional Asymmetry**. Do not feel forced to center every element or align every box to a rigid grid. Use overlapping elements—such as a floating speech bubble cutting into a hero image—to create a sense of depth and movement. This system thrives on "white space" that isn't just white, but a playground for soft gradients and subtle textures.

---

## 2. Colors & Visual Soul
The palette is a sophisticated take on pastel nostalgia, utilizing high-contrast deep tones to anchor the whimsical gradients.

### The "No-Line" Rule
To maintain a high-end feel, **1px solid borders are strictly prohibited for sectioning.** Boundaries must be defined solely through background color shifts. For example, a `surface_container_low` (#f2f4f5) section should sit against a `background` (#f8f9fa) to create a soft, natural break. If you feel the need for a line, you haven't used your surface hierarchy effectively.

### Surface Hierarchy & Nesting
Treat the UI as a series of stacked, physical layers.
*   **Base:** `surface` (#f8f9fa)
*   **Sections:** `surface_container_low` (#f2f4f5)
*   **Cards/Elements:** `surface_container_lowest` (#ffffff) for maximum "lift."
*   **Nesting:** When placing a component inside a card, use `surface_container_high` (#e5e9eb) to create an "inset" look.

### The "Glass & Gradient" Rule
Standard flat colors feel "out-of-the-box." To elevate the aesthetic, use **Glassmorphism** for floating UI elements (e.g., speech bubbles or navigation bars). Use semi-transparent `surface_container_lowest` with a `backdrop-blur` of 12px–20px. 

### Signature Textures
Apply a subtle dot pattern (using `outline_variant` at 10% opacity) to `surface_container` backgrounds to mimic manga screentone. For primary CTAs, use a linear gradient transitioning from `primary` (#69558e) to `primary_container` (#d6beff) at a 135-degree angle to provide a soft "glowing" soul.

---

## 3. Typography
Our typography is a dialogue between two distinct personalities: the clean professional and the whimsical storyteller.

*   **The Display Voice (Plus Jakarta Sans):** Used for `display-lg` through `headline-sm`. This font carries the brand’s "playful" energy. It should be typeset with slightly tighter letter-spacing (-2%) to feel modern and high-end.
*   **The Narrative Voice (Manrope):** Used for all `body` and `title` scales. Manrope is chosen for its geometric clarity and editorial heritage. 
*   **Hierarchy Note:** Use `on_primary_container` (#4b386e) for headlines on light backgrounds rather than pure black. This maintains the "Anime" softness while ensuring high-contrast accessibility.

---

## 4. Elevation & Depth
Depth in this system is achieved through **Tonal Layering**, not structural rigidity.

*   **The Layering Principle:** Avoid the "flat grid." Use the `surface_container` tiers to create depth. A `surface_container_lowest` card floating over a `surface_dim` background provides an organic sense of elevation.
*   **Ambient Shadows:** When an element must "float" (like a manga speech bubble), use an extra-diffused shadow. 
    *   *Shadow Setting:* 0px offset-y, 20px blur, 0px spread. 
    *   *Color:* Use `on_surface` (#2e3335) at 5% opacity. Never use pure black.
*   **The "Ghost Border" Fallback:** If a border is required for accessibility, it must be a "Ghost Border": `outline_variant` (#aeb3b5) at **15% opacity**. 

---

## 5. Components

### Floating Speech Bubbles (Signature Component)
Instead of standard cards, use speech-bubble shapes for quiz questions.
*   **Background:** `surface_container_lowest` (#ffffff) with 80% opacity and 16px backdrop-blur.
*   **Corner Radius:** `xl` (3rem) with a small triangular "tail" using the same color.
*   **Glow:** Apply a subtle outer glow using `primary_fixed_dim` (#c8b1f0) at 20% opacity.

### Buttons
*   **Primary:** Gradient from `primary` to `primary_dim`. Shape: `full` (9999px). Typography: `title-md`.
*   **Secondary:** Background `secondary_container` (#98ffd9), text `on_secondary_container` (#00634b). Shape: `full`.
*   **Interaction:** On hover, increase the "glow" (shadow spread) rather than darkening the color.

### Input Fields
*   **Styling:** Forgo the box. Use a `surface_container_highest` (#dee3e5) background with a `xl` (3rem) corner radius. 
*   **Focus State:** Transition the background to `primary_container` (#d6beff) with a "Ghost Border" of `primary`.

### Chips & Selection
*   **States:** Unselected chips should be `surface_container_low`. Selected chips should pop with `secondary` (#006c53) and `on_secondary` (#e5fff2) text.
*   **Motion:** Use a slight "bounce" (cubic-bezier(0.34, 1.56, 0.64, 1)) when a selection is made to mimic anime energy.

---

## 6. Do's and Don'ts

### Do
*   **Do** overlap elements. Let a character illustration or a decorative dot pattern bleed behind a text container.
*   **Do** use the `xl` and `full` roundedness tokens generously to maintain the "whimsical" feel.
*   **Do** treat typography as a design element. Use `display-lg` for short, punchy emotional anchors.

### Don't
*   **Don't** use 100% opaque, high-contrast borders. It kills the "Ethereal" aesthetic.
*   **Don't** use standard dividers. Use 48px or 64px of vertical white space to separate thoughts.
*   **Don't** use sharp corners. If an element has a `none` or `sm` radius, it likely doesn't belong in this system.
*   **Don't** clutter the screen. If you have more than 5 elements on screen, use a `surface-container` shift to group them.
