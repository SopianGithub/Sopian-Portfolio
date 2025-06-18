# Planet-Themed StatCard Component Guide - Aerospace Dark Theme

## Overview

The StatCard component has been transformed into a beautiful planet-themed design that fits perfectly with aerospace portfolios. Each card represents a different type of celestial body with unique visual characteristics and subtle animations, optimized for dark aerospace themes.

## Features

### 🌍 Planet Types

1. **Rocky Planets** (`planetType="rocky"`)
   - Dark orange/red gradient colors
   - Represents solid achievements and concrete results
   - No orbital rings
   - Perfect for: Projects completed, success rates, milestones

2. **Gas Giants** (`planetType="gas"`)
   - Dark blue/indigo gradient colors with slate undertones
   - Features subtle orbital rings
   - Represents vast experience and deep knowledge
   - Perfect for: Years of experience, expertise levels, large-scale achievements

3. **Ice Planets** (`planetType="ice"`)
   - Dark cyan/blue gradient colors with slate undertones
   - Features subtle orbital rings
   - Represents cool technical skills and precision
   - Perfect for: Technologies mastered, technical achievements, precision metrics

4. **Terrestrial Planets** (`planetType="terrestrial"`)
   - Dark green/emerald gradient colors
   - Represents growth, life, and sustainable solutions
   - No orbital rings
   - Perfect for: Client satisfaction, growth metrics, sustainable achievements

### ✨ Animations & Effects

- **Subtle Atmosphere Glow**: Gentle pulsing atmospheric effect (4s cycle)
- **Orbital Rings**: Slow rotating rings for gas and ice planets (25s cycle)
- **Surface Craters**: Subtle animated surface features
- **Space Debris**: Floating particles around the planet
- **Hover Effects**: Scale and shadow enhancement on hover
- **Number Counter**: Animated counting from 0 to target value
- **No Rotation**: Information remains readable and accessible

### 🎨 Aerospace Dark Theme

- **Dark Backgrounds**: Optimized for low-light environments
- **Subtle Contrasts**: Reduced eye strain with gentle color transitions
- **Professional Aesthetics**: Suitable for aerospace industry standards
- **Accessibility**: High contrast text with reduced motion support

## Usage

### Basic Usage

```tsx
import StatCard from './components/StatCard';

// Rocky planet for projects
<StatCard
  value={25}
  suffix="+"
  label="Projects Completed"
  planetType="rocky"
/>

// Gas giant for experience
<StatCard
  value={5}
  suffix=" Years"
  label="Industry Experience"
  planetType="gas"
/>

// Ice planet for technologies
<StatCard
  value={15}
  suffix="+"
  label="Technologies Mastered"
  planetType="ice"
/>

// Terrestrial planet for clients
<StatCard
  value={50}
  suffix="+"
  label="Happy Clients"
  planetType="terrestrial"
/>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `number` | Required | The numeric value to display |
| `suffix` | `string` | `''` | Text to append after the number |
| `label` | `string` | Required | Description text below the number |
| `planetType` | `'rocky' \| 'gas' \| 'ice' \| 'terrestrial'` | `'rocky'` | Type of planet to display |

### Example Implementation

```tsx
import React from 'react';
import StatCard from './components/StatCard';

const PortfolioStats: React.FC = () => {
  return (
    <div className="aerospace-bg min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <StatCard
            value={25}
            suffix="+"
            label="Projects Completed"
            planetType="rocky"
          />
          <StatCard
            value={5}
            suffix=" Years"
            label="Industry Experience"
            planetType="gas"
          />
          <StatCard
            value={15}
            suffix="+"
            label="Technologies Mastered"
            planetType="ice"
          />
          <StatCard
            value={50}
            suffix="+"
            label="Happy Clients"
            planetType="terrestrial"
          />
        </div>
      </div>
    </div>
  );
};

export default PortfolioStats;
```

## Customization

### CSS Classes

The component uses several CSS classes that can be customized:

- `.planet-container`: Main container with perspective
- `.atmosphere-glow-subtle`: Subtle atmospheric glow effect
- `.orbital-ring-subtle`: Subtle orbital ring animation
- `.space-debris-subtle`: Subtle space debris animation
- `.crater-subtle`: Subtle surface crater effects
- `.planet-shadow-subtle`: Aerospace-themed shadow effects

### Aerospace Theme Classes

- `.aerospace-bg`: Primary aerospace background gradient
- `.aerospace-bg-alt`: Alternative aerospace background
- `.aerospace-text-primary`: Primary text color
- `.aerospace-text-secondary`: Secondary text color
- `.aerospace-text-accent`: Accent text color

### Custom Planet Types

To add new planet types, modify the `planetConfigs` object in `StatCard.tsx`:

```tsx
const planetConfigs = {
  // ... existing configs
  custom: {
    gradient: 'planet-custom',
    surface: 'bg-gradient-to-br from-custom-800/80 via-custom-700/70 to-custom-800/60',
    rings: true, // or false
    atmosphere: 'from-custom-500/15 to-custom-600/10',
    textColor: 'text-custom-200',
    labelColor: 'text-custom-100/80'
  }
};
```

Then add corresponding CSS in `planet-card.css`:

```css
.planet-custom {
  background: radial-gradient(circle at 30% 30%, 
    #your-dark-color-1 0%, 
    #your-dark-color-2 20%, 
    #your-dark-color-3 40%, 
    #your-dark-color-4 60%, 
    #your-dark-color-5 80%, 
    #your-darkest-color 100%);
}
```

## Performance Considerations

- Animations are optimized using CSS transforms
- GSAP ScrollTrigger is used for performance
- Animations are disabled on mobile devices with reduced motion preferences
- No rotation animations to maintain readability
- Subtle effects reduce GPU usage

## Browser Support

- Modern browsers with CSS Grid and Flexbox support
- GSAP ScrollTrigger requires modern JavaScript
- Fallbacks provided for older browsers
- Reduced motion support for accessibility

## Accessibility

- High contrast text colors for readability
- Reduced motion support for users with vestibular disorders
- Semantic HTML structure
- Screen reader friendly content
- No distracting rotation animations
- Dark theme optimized for low-light environments

## Dependencies

- React 18+
- GSAP (for ScrollTrigger)
- Tailwind CSS
- Custom CSS animations

## Installation

1. Ensure GSAP is installed:
```bash
npm install gsap
```

2. Import the CSS file in your component:
```tsx
import '../styles/planet-card.css';
```

3. Use the component as shown in the examples above.

## Troubleshooting

### Animations not working
- Check if GSAP is properly installed
- Ensure ScrollTrigger plugin is registered
- Verify CSS file is imported

### Colors too bright
- Ensure you're using the aerospace theme classes
- Check if custom colors are properly configured
- Verify dark theme is applied

### Text not readable
- Check contrast ratios
- Ensure aerospace text classes are used
- Verify background colors are dark enough

### Performance issues
- Reduce animation complexity if needed
- Check for conflicting CSS animations
- Verify reduced motion preferences 