---
name: Sabor e Tradição
colors:
  surface: '#fff8f6'
  surface-dim: '#ecd5cc'
  surface-bright: '#fff8f6'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#fff1ec'
  surface-container: '#ffeae1'
  surface-container-high: '#fbe3da'
  surface-container-highest: '#f5ded5'
  on-surface: '#251913'
  on-surface-variant: '#5d3f3c'
  inverse-surface: '#3b2d27'
  inverse-on-surface: '#ffede6'
  outline: '#926f6b'
  outline-variant: '#e6bdb8'
  surface-tint: '#c00014'
  primary: '#ae0011'
  on-primary: '#ffffff'
  primary-container: '#d71920'
  on-primary-container: '#ffece9'
  inverse-primary: '#ffb4ab'
  secondary: '#785a00'
  on-secondary: '#ffffff'
  secondary-container: '#fdc008'
  on-secondary-container: '#6c5000'
  tertiary: '#874200'
  on-tertiary: '#ffffff'
  tertiary-container: '#ac5500'
  on-tertiary-container: '#ffede3'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdad6'
  primary-fixed-dim: '#ffb4ab'
  on-primary-fixed: '#410002'
  on-primary-fixed-variant: '#93000d'
  secondary-fixed: '#ffdf9d'
  secondary-fixed-dim: '#f9bd00'
  on-secondary-fixed: '#251a00'
  on-secondary-fixed-variant: '#5b4300'
  tertiary-fixed: '#ffdcc6'
  tertiary-fixed-dim: '#ffb786'
  on-tertiary-fixed: '#311300'
  on-tertiary-fixed-variant: '#723600'
  background: '#fff8f6'
  on-background: '#251913'
  surface-variant: '#f5ded5'
typography:
  display-xl:
    fontFamily: Rubik
    fontSize: 48px
    fontWeight: '800'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  display-xl-mobile:
    fontFamily: Rubik
    fontSize: 36px
    fontWeight: '800'
    lineHeight: '1.1'
  headline-lg:
    fontFamily: Rubik
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Rubik
    fontSize: 24px
    fontWeight: '700'
    lineHeight: '1.2'
  price-lg:
    fontFamily: Rubik
    fontSize: 28px
    fontWeight: '800'
    lineHeight: '1'
  body-lg:
    fontFamily: DM Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: DM Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-bold:
    fontFamily: DM Sans
    fontSize: 14px
    fontWeight: '700'
    lineHeight: '1'
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 4px
  gutter: 16px
  margin-mobile: 20px
  margin-desktop: 64px
  stack-tight: 8px
  stack-loose: 32px
---

## Brand & Style
The design system for this snack bar balances the raw energy of Brazilian street food culture with the precision of a high-end digital storefront. It utilizes a **Modern Vernacular** style—taking the bold, high-contrast signals of traditional snack bars (lanchonetes) and refining them through structured layouts and premium finishing. 

The aesthetic should evoke "Abundance" and "Flavor" through large-scale imagery and tight, impactful typography. It avoids corporate sterility by embracing a warm, food-centric palette and dense visual information in product areas, offset by clean, expansive margins in informational blocks. The emotional response is one of immediate hunger, reliability, and local authenticity.

## Colors
This design system uses a high-energy palette designed to stimulate appetite and signal speed. 
- **Primary Red:** Used for critical branding, primary calls to action, and price highlights.
- **Secondary Yellow/Orange:** Used for accents, badges, and "hot" deals to provide warmth and visual variety.
- **Dark Brown:** Replaces standard black for text to maintain a "toasted" and organic feel, providing high contrast without being clinical.
- **Off-White Background:** The primary canvas color, reducing glare and feeling more natural/paper-like than pure white.
- **WhatsApp Green:** Reserved exclusively for order-related actions and direct communication.

## Typography
Typography is the cornerstone of the vernacular look. We use **Rubik** for its heavy weights and slightly rounded corners, which feel friendly yet industrial. Headlines should be "loud"—tightly tracked and often set in ExtraBold to mirror physical menu boards.

**DM Sans** provides a clean, geometric counterpoint for descriptions and technical details, ensuring high legibility even at small sizes on mobile devices. Use the "Price-LG" style to make costs a focal point of the UI, never hiding the value proposition.

## Layout & Spacing
The layout follows a **Fluid Grid** model with a high-density approach in product catalogs and a spacious approach in editorial sections.

- **Mobile:** A 2-column or 1-column stack with 20px side margins. 
- **Desktop:** A 12-column grid. Max content width is 1280px.
- **Rhythm:** Use 8px increments for internal component spacing and larger 32px-64px gaps between distinct content blocks. This creates "visual breathing room" that allows the intense product areas to stand out without overwhelming the user.

## Elevation & Depth
This design system uses **Tonal Layers** combined with **Ambient Shadows** to create a sense of physical presence.
- **Base:** The off-white (#F9F9F7) background acts as the lowest layer.
- **Cards:** White (#FFFFFF) surfaces with a soft, diffused shadow (12% opacity of Dark Brown, 15px blur, 4px Y-offset) to make food items "pop" toward the user.
- **Interactions:** On hover or tap, shadows should slightly deepen and elements may scale by 2%, simulating the tactile nature of a physical snack bar counter.
- **Overlays:** Use a 40% opacity Dark Brown scrim for modals to keep the focus entirely on the food selection.

## Shapes
We use a **Rounded** (0.5rem) language. This radius is large enough to feel modern and friendly but sharp enough to maintain a sense of efficiency and structure. 

- **Small Components:** Checkboxes and small tags use `0.25rem`.
- **Primary Cards:** Use `1rem` (rounded-lg) to frame photography softly.
- **Buttons:** Use `0.5rem` or fully pill-shaped for secondary actions to differentiate from the structured product cards.

## Components
- **Buttons:** Primary buttons are Solid Red with White text, using Bold Rubik. The WhatsApp button is always Green with the brand icon.
- **Product Cards:** These are the hero components. They must feature high-resolution, "close-up" food photography that bleeds to the top edge. The price should be anchored to the bottom-right in a high-contrast Yellow or Red tag.
- **Chips/Badges:** Use Secondary Yellow for "New" or "Best Seller" tags, placed over the image corner of a card.
- **Lists:** Ingredient lists should use DM Sans with ample line height and Dark Brown bullet points for maximum readability.
- **Input Fields:** Use the Off-white background with a 1px Graphite border. When focused, the border thickens and changes to Primary Red.
- **Category Navigation:** A horizontal scrolling bar of circular icons with labels, using high-contrast silhouettes or stylized food icons to allow for quick scanning.