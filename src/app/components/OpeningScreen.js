'use client';
import React, { useEffect, useRef, useState } from 'react';
import styles from './OpeningScreen.module.css';

export default function OpeningScreen({ onLearnMore }) {
  const canvasRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const particlesRef = useRef([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const [isExploding, setIsExploding] = useState(false);
  const [typedName, setTypedName] = useState('');
  const [consoleLines, setConsoleLines] = useState([]);
  const consoleRef = useRef(null);

  const scrollToBottom = () => {
    if (consoleRef.current) {
      const scrollTarget = consoleRef.current.scrollHeight;
      requestAnimationFrame(() => {
        consoleRef.current.scrollTo({
          top: scrollTarget,
          behavior: 'smooth'
        });
        setTimeout(() => {
          if (consoleRef.current.scrollTop + consoleRef.current.clientHeight < scrollTarget) {
            consoleRef.current.scrollTo({
              top: scrollTarget,
              behavior: 'auto'
            });
          }
        }, 500);
      });
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    
    const setSize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
    };
    setSize();
    window.addEventListener('resize', setSize);

    const initParticles = () => {
      particlesRef.current = Array.from({ length: 60 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1.5 + 0.5, 
        speedX: Math.random() * 0.8 - 0.4,
        speedY: Math.random() * 0.8 - 0.4,
        color: `hsla(${180 + Math.random() * 60}, 80%, 60%, ${0.3 + Math.random() * 0.2})`
      }));
    };

    const animate = () => {
      ctx.fillStyle = 'rgba(10, 10, 25, 0.2)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach(particle => {

        particlesRef.current.forEach(otherParticle => {
          const dx = otherParticle.x - particle.x;
          const dy = otherParticle.y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.beginPath();
            ctx.strokeStyle = `hsla(120, 50%, 50%, ${0.15 * (1 - distance / 100)})`; 
            ctx.lineWidth = 0.5;
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.stroke();
          }
        });


        const dx = mouseRef.current.x - particle.x;
        const dy = mouseRef.current.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 150) {
          const angle = Math.atan2(dy, dx);
          const force = (1 - distance / 150) * 0.2;
          particle.x -= Math.cos(angle) * force;
          particle.y -= Math.sin(angle) * force;
        }


        particle.x += particle.speedX;
        particle.y += particle.speedY;


        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;


        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.size * 2
        );
        gradient.addColorStop(0, particle.color);
        gradient.addColorStop(1, particle.color.replace('0.', '0.0'));

        ctx.beginPath();
        ctx.fillStyle = gradient;
        ctx.arc(particle.x, particle.y, particle.size * 2, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e) => {
      mouseRef.current = {
        x: e.clientX,
        y: e.clientY
      };
    };

    const handleTouch = (e) => {
      e.preventDefault();
      const touch = e.touches[0];
      mouseRef.current = {
        x: touch.clientX,
        y: touch.clientY
      };
    };

    initParticles();
    animate();
    setIsVisible(true);


    const lines = [
      { text: '> Initializing secure connection...', delay: 200 },
      { text: '> Accessing profile database...', delay: 500 },
      { text: '> Profile found: ANTON CHEPALDIN', delay: 800, highlight: true },
      { text: '> Analyzing expertise: Innovation Architecture | Community Engineering | Technology', delay: 1100 },
      { text: '> Loading behavioral patterns...', delay: 1400 },
      { text: '  - Pattern: Complex system simplification', delay: 1500 },
      { text: '  - Pattern: Community-driven innovation', delay: 1600 },
      { text: '  - Pattern: Technology democratization', delay: 1700 },
      { text: '> Scanning impact metrics...', delay: 2000 },
      { text: '  - Scale: 8500+ professionals', delay: 2100 },
      { text: '  - Reach: 9 countries', delay: 2200 },
      { text: '  - Innovation: 69 implemented solutions', delay: 2300 },
      { text: '> Identifying key algorithms...', delay: 2600 },
      { text: '  - Natural Language Processing', delay: 2700 },
      { text: '  - Pattern Recognition', delay: 2800 },
      { text: '  - Network Analysis', delay: 2900 },
      { text: '> Processing latest venture: Synspire', delay: 3200, highlight: true },
      { text: '> Neural mapping complete', delay: 3500 },
      { text: '> System ready for profile access', delay: 3800, blink: true }
    ];

    let timeoutIds = [];

    const typeLines = () => {
      lines.forEach((line, index) => {
        const timeout = setTimeout(() => {
          setConsoleLines(prev => [...prev, {
            text: line.text,
            highlight: line.highlight,
            blink: line.blink
          }]);
          
          scrollToBottom();
          
          if (index === lines.length - 1) {
            setTimeout(() => {
              setShowButton(true);
              scrollToBottom();
            }, 400);
          }
        }, line.delay);
        timeoutIds.push(timeout);
      });
    };

    typeLines();

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('touchmove', handleTouch);
    canvas.addEventListener('touchstart', handleTouch);

    return () => {
      window.removeEventListener('resize', setSize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('touchmove', handleTouch);
      canvas.removeEventListener('touchstart', handleTouch);
      cancelAnimationFrame(animationFrameId);
      timeoutIds.forEach(id => clearTimeout(id));
    };
  }, []);

  useEffect(() => {
    if (consoleRef.current) {
      const observer = new MutationObserver(scrollToBottom);
      observer.observe(consoleRef.current, {
        childList: true,
        subtree: true
      });
      return () => observer.disconnect();
    }
  }, []);

  const handleLearnMore = () => {
    setIsExploding(true);
    const particles = particlesRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    

    particles.forEach(particle => {
      particle.speedX = (Math.random() - 0.5) * 30;
      particle.speedY = (Math.random() - 0.5) * 30;
      particle.size = Math.random() * 5 + 2;
      particle.color = `hsla(${Math.random() * 360}, 100%, 50%, 0.8)`;
    });


    for (let i = 0; i < 50; i++) {
      particles.push({
        x: canvas.width / 2,
        y: canvas.height / 2,
        size: Math.random() * 4 + 2,
        speedX: (Math.random() - 0.5) * 40,
        speedY: (Math.random() - 0.5) * 40,
        color: `hsla(${Math.random() * 360}, 100%, 70%, 0.8)`
      });
    }
    
    setTimeout(() => {
      onLearnMore();
    }, 1500);
  };

  return (
    <div className={`${styles.openingScreen} ${isExploding ? styles.exploding : ''}`}>
      <canvas ref={canvasRef} className={styles.particleCanvas} />
      <div className={`${styles.content} ${isVisible ? styles.visible : ''}`}>
        <div className={styles.console}>
          <div className={styles.consoleHeader}>
            <span className={styles.headerDot}></span>
            <span className={styles.headerDot}></span>
            <span className={styles.headerDot}></span>
            <span className={styles.consoleTitle}>SECURE-TERMINAL</span>
          </div>
          <div ref={consoleRef} className={styles.consoleContent}>
            {consoleLines.map((line, index) => (
              <div key={index} 
                className={`${styles.consoleLine} ${line.highlight ? styles.highlight : ''} ${line.blink ? styles.blink : ''}`}
              >
                <span className={styles.text}>{line.text}</span>
              </div>
            ))}
            {showButton && (
              <div className={styles.accessPrompt}>
                <div className={styles.promptLine}>
                  <span className={styles.arrow}>&gt;</span>
                  <span className={styles.command}>sudo grant_access --profile "Anton Chepaldin"</span>
                </div>
                <button 
                  onClick={handleLearnMore}
                  className={`${styles.learnMoreBtn} ${styles.fadeIn}`}
                >
                  <span className={styles.btnIcon}>⚡</span>
                  <span className={styles.btnText}>INITIALIZE SECURE CONNECTION_</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
