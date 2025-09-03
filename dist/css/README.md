# CSS Architecture Documentation

This directory contains the refactored CSS files organized by semantic purpose. The original `styles.css` file has been split into multiple smaller, well-organized files to improve maintainability and organization.

## File Structure

### 1. `tokens.css`
**Purpose**: CSS custom properties (design tokens)
- CSS custom properties (variables) for colors, transitions, shadows, etc.
- Design system tokens that other files depend on
- Must be loaded first as the foundation for all other styles

### 2. `base.css`
**Purpose**: Foundation styles and base elements
- CSS resets and base element styles
- Global styles for `html`, `body`, and basic elements
- Container and section base styles
- Grain overlay effect

### 2. `layout.css`
**Purpose**: Layout and positioning systems
- Grid and flexbox layouts
- Hero section layout
- About section layout
- Projects grid layout
- Education section layout
- Services and process layouts
- Modal and gallery layouts
- Responsive layout patterns

### 3. `typography.css`
**Purpose**: Text and typography styles
- Font sizes, weights, and line heights
- Text colors and gradients
- Button typography
- Navigation typography
- Form and input typography
- Modal and gallery typography
- All text-based styling

### 4. `components.css`
**Purpose**: Reusable UI components
- Navigation components (navbar, menu, hamburger)
- Button components (primary, secondary, filters)
- Card components (project cards, service cards, diploma cards)
- Modal components (project modals, gallery modals)
- Form components
- Interactive elements (FAQ, contact actions)
- Hero components (portrait, buttons, scroll indicator)

### 5. `animations.css`
**Purpose**: Animations and transitions
- Keyframe animations (hero animations, skill badges, process steps)
- Transition effects
- Hover animations
- Loading animations
- Scroll reveal animations
- Modal animations
- Gallery animations

### 6. `utilities.css`
**Purpose**: Helper classes and responsive utilities
- Responsive design breakpoints
- Mobile-specific styles
- Desktop-specific enhancements
- Utility classes for margins, paddings, visibility
- Scrollbar styling
- Legal page specific styles

## Loading Order

The CSS files must be loaded in the following order to maintain proper cascade and specificity:

1. `tokens.css` - CSS custom properties (design tokens)
2. `base.css` - Foundation and base elements
3. `layout.css` - Layout systems
4. `typography.css` - Text styles
5. `components.css` - UI components
6. `utilities.css` - Responsive utilities and overrides
7. `animations.css` - Animations and transitions

## Benefits of This Architecture

1. **Maintainability**: Each file has a single responsibility
2. **Scalability**: Easy to add new components or modify existing ones
3. **Performance**: Smaller files load faster and are easier to cache
4. **Collaboration**: Multiple developers can work on different files simultaneously
5. **Debugging**: Easier to locate and fix styling issues
6. **Reusability**: Components can be easily reused across different pages

## CSS Custom Properties

The design system uses CSS custom properties defined in `tokens.css`:

### Colors
- `--bg-primary`, `--bg-secondary`
- `--accent-primary`, `--accent-secondary`
- `--text-primary`, `--text-secondary`, `--text-muted`
- `--border-color`, `--card-bg`

### Transitions
- `--transition-fast`, `--transition-medium`, `--transition-slow`
- `--transition-smooth`, `--transition-medium-smooth`, etc.

### Shadows
- `--shadow-primary`, `--shadow-secondary`
- `--shadow-light`, `--shadow-medium`, `--shadow-heavy`

### Border Radius
- `--border-radius-small`, `--border-radius-medium`, `--border-radius-large`

## Responsive Design

The site uses a mobile-first approach with breakpoints:
- Mobile: `< 768px`
- Tablet: `768px - 1023px`
- Desktop: `≥ 1024px`

## Browser Support

The CSS uses modern features including:
- CSS Grid and Flexbox
- CSS Custom Properties
- Backdrop filters
- Modern animations and transitions

Ensure your target browsers support these features or provide appropriate fallbacks.

## Maintenance Guidelines

1. **Adding new styles**: Place them in the appropriate file based on their purpose
2. **Modifying existing styles**: Update the relevant file and test across all breakpoints
3. **Adding new components**: Create styles in `components.css` and add any animations to `animations.css`
4. **Responsive changes**: Update the appropriate media queries in `utilities.css`
5. **New variables**: Add them to `tokens.css` in the `:root` selector

## File Size Summary

- `tokens.css`: ~1.5KB
- `base.css`: ~2.5KB
- `layout.css`: ~8KB
- `typography.css`: ~12KB
- `components.css`: ~15KB
- `utilities.css`: ~12KB
- `animations.css`: ~8KB

**Total**: ~59KB (compared to original ~95KB single file)

The refactored structure provides better organization while maintaining the exact same visual appearance and functionality as the original single CSS file.


