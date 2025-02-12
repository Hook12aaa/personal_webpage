'use client';
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SkillsView from './views/SkillsView';
import TimelineView from './views/TimelineView';
import ProfileView from './views/ProfileView';
import styles from './ProfileDisplay.module.css';

export default function ProfileDisplay() {
  const [activeView, setActiveView] = useState('profile');
  const [isNameHovered, setIsNameHovered] = useState(false);
  const particlesRef = useRef(null);
  
  const views = [
    { key: 'skills', component: <SkillsView /> },
    { key: 'profile', component: <ProfileView /> },
    { key: 'timeline', component: <TimelineView /> }
  ];

  useEffect(() => {
    const canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '1';
    canvas.style.opacity = '0.1';
    particlesRef.current = canvas;
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    const particles = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    resize();

    // Create particles
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 1,
        speedX: Math.random() * 0.5 - 0.25,
        speedY: Math.random() * 0.5 - 0.25
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#292828';

      particles.forEach(particle => {
        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        // Wrap around screen
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();

        // Draw connections
        particles.forEach(other => {
          const dx = other.x - particle.x;
          const dy = other.y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(41, 40, 40, ${0.1 * (1 - distance / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(other.x, other.y);
            ctx.stroke();
          }
        });
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      canvas.remove();
    };
  }, []);

  return (
    <div className={styles.container}>
      <motion.div 
        className={styles.nameDisplay}
        onHoverStart={() => setIsNameHovered(true)}
        onHoverEnd={() => setIsNameHovered(false)}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.span 
          className={styles.terminalPrefix}
          animate={{ 
            opacity: [0.7, 1, 0.7],
            textShadow: [
              "0 0 10px rgba(230, 66, 152, 0.3)",
              "0 0 20px rgba(230, 66, 152, 0.5)",
              "0 0 10px rgba(230, 66, 152, 0.3)"
            ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          &gt;
        </motion.span>
        <motion.span className={styles.name}>
          Anton_Chepaldin
          <motion.span 
            className={styles.cursor}
            initial={{ opacity: 0 }}
            animate={{ opacity: isNameHovered ? [0, 1, 0] : 0 }}
            transition={{ duration: 1, repeat: Infinity }}
          >_</motion.span>
        </motion.span>
      </motion.div>

      <nav className={styles.navigation}>
        {views.map(({ key }) => (
          <motion.button
            key={key}
            onClick={() => setActiveView(key)}
            className={`${styles.navButton} ${activeView === key ? styles.active : ''}`}
            whileHover={{ x: -3 }}
            whileTap={{ scale: 0.97 }}
          >
            {key}
            {activeView === key && (
              <motion.div 
                className={styles.activeIndicator}
                layoutId="activeIndicator"
                initial={false}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 30
                }}
              />
            )}
          </motion.button>
        ))}
      </nav>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeView}
          className={styles.viewContainer}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ 
            type: "spring",
            stiffness: 300,
            damping: 30
          }}
        >
          {views.find(view => view.key === activeView).component}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
