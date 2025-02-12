# Personal Portfolio Website

An experimental portfolio project born from my journey into the startup world. This website serves as both a technical showcase and a personal statement, demonstrating my approach to front-end development without relying on existing templates or repositories.

## 🎯 Project Context

Built as a personal experiment to:
- Demonstrate front-end development capabilities
- Break away from conventional portfolio templates
- Showcase problem-solving approach through actual implementation
- Meet startup program application requirements
- Serve as a sandbox for creative web development ideas

## 🎨 Key Features

- Neural network-inspired skills visualization
- Interactive timeline with fluid animations
- Dynamic particle effects that respond to user interaction
- Glitch effects and unconventional UI elements
- Custom CSS animations without external libraries

## 🛠️ Built With

- Next.js 14 (App Router)
- D3.js for complex visualizations
- Custom CSS modules
- Vanilla JavaScript for animations

## 💡 Philosophy

This project emerged from my need to present myself authentically in the startup ecosystem. Instead of:
- Using existing templates or repositories
- Following conventional portfolio patterns
- Building just another static showcase

I chose to:
- Build everything from scratch
- Create interactive elements that reflect my development style
- Use this as an experimental ground for creative coding
- Focus on demonstrating problem-solving through actual implementation

## 🚀 Running Locally

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/portfolio-website.git
cd portfolio-website
```

2. Install dependencies:
```bash
npm install --force # you proably need to force due to dependenices of motion
# or
yarn install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3001](http://localhost:3001) in your browser

## 🎨 Customization

### Background

The particle background can be customized in `components/Background.js`:

```javascript
const numParticles = 100; // Adjust number of particles
const particles = Array.from({ length: numParticles }, () => ({
  size: Math.random() * 2, // Adjust particle size
  speedX: (Math.random() - 0.5) * 0.5, // Adjust particle speed
  speedY: (Math.random() - 0.5) * 0.5
}));
```

### Animations

Modify timing and effects in `styles/animations.css`:

```css
@keyframes fadeIn {
  /* Customize animation timing and properties */
}

.title {
  animation-duration: 1.5s; /* Adjust animation duration */
}
```

### Loading Screen

Customize the loading screen in `components/LoadingScreen.js`:

```javascript
const [dots, setDots] = useState('');
// Adjust dot animation interval
useEffect(() => {
  const interval = setInterval(() => {
    setDots(prev => prev.length >= 3 ? '' : prev + '.');
  }, 500); // Modify timing here
  return () => clearInterval(interval);
}, []);
```

## 📱 Responsive Design

The website is fully responsive with breakpoints at:
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

Customize breakpoints in `styles/animations.css`:

```css
@media (max-width: 768px) {
  .title {
    font-size: 2.5rem;
  }
}
```

## 🔧 Development

### Commands

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm start`: Start production server
- `npm run lint`: Run ESLint

### Adding New Sections

1. Create a new component in `components/`
2. Import and add to `page.js`
3. Add corresponding styles in `animations.css`

## 🚥 Performance Optimization

- Background particles are optimized using requestAnimationFrame
- Images should be optimized and served through Next.js Image component
- CSS animations use transform and opacity for better performance

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Inspired by minimal design principles
- D3.js community for visualization references
- Next.js team for the fantastic framework