# Personal Portfolio Website

An experimental portfolio that breaks away from conventional templates. Built as a reflection of my approach to problem-solving and creativity, while satisfying the requirements of tech startup programs.

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

This isn't your typical portfolio website. Instead of following conventional patterns, I chose to:
- Represent skills as an interconnected neural network rather than a list
- Use glitch effects and particle systems to add personality
- Create fluid, organic animations that feel alive
- Focus on interaction and discovery rather than just presentation

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
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

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

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 🛟 Support

For support, email [your-email@domain.com] or open an issue in the repository.

## 🔮 Future Enhancements

- [ ] Add blog section
- [ ] Implement project filtering
- [ ] Add dark/light theme toggle
- [ ] Integrate CMS for content management
- [ ] Add internationalization support

## 🙏 Acknowledgments

- Inspired by minimal design principles
- D3.js community for visualization references
- Next.js team for the fantastic framework