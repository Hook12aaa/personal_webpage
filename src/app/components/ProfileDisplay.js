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
  const [canTransition, setCanTransition] = useState(true);
  const particlesRef = useRef(null);
  const [touchStart, setTouchStart] = useState(null);
  const scrollTimeoutRef = useRef(null);
  const [navigationDirection, setNavigationDirection] = useState(null);
  const viewOrder = ['skills', 'profile', 'timeline'];

  const views = {
    skills: <SkillsView key="skills" />,
    profile: <ProfileView key="profile" />,
    timeline: <TimelineView key="timeline" />
  };

  const viewsArray = [
    { key: 'skills', label: 'Skills' },
    { key: 'profile', label: 'Profile' },
    { key: 'timeline', label: 'Timeline' }
  ];

  const getNavigationDirection = (currentView, targetView) => {
    const currentIndex = viewOrder.indexOf(currentView);
    const targetIndex = viewOrder.indexOf(targetView);
    return targetIndex > currentIndex ? 'next' : 'prev';
  };

  const switchView = (targetView) => {
    if (!canTransition || activeView === targetView) return;

    const direction = getNavigationDirection(activeView, targetView);
    setNavigationDirection(direction);
    setActiveView(targetView);
    setCanTransition(false);
    setTimeout(() => {
      setCanTransition(true);
      setNavigationDirection(null);
    }, 800);
  };

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
       
        particle.x += particle.speedX;
        particle.y += particle.speedY;


        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;


        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();


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

    const handleWheel = (e) => {
      e.preventDefault();

      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      scrollTimeoutRef.current = setTimeout(() => {
        if (Math.abs(e.deltaY) > 20) {
          if (e.deltaY > 0) {
            switchView(viewOrder[(viewOrder.indexOf(activeView) + 1) % viewOrder.length]);
          } else {
            switchView(viewOrder[(viewOrder.indexOf(activeView) - 1 + viewOrder.length) % viewOrder.length]);
          }
        }
      }, 50);
    };

    const handleKeyDown = (e) => {
      if (['ArrowDown', 'S', 's'].includes(e.key)) {
        switchView(viewOrder[(viewOrder.indexOf(activeView) + 1) % viewOrder.length]);
      } else if (['ArrowUp', 'W', 'w'].includes(e.key)) {
        switchView(viewOrder[(viewOrder.indexOf(activeView) - 1 + viewOrder.length) % viewOrder.length]);
      }
    };

    const handleTouchStart = (e) => {
      setTouchStart(e.touches[0].clientY);
    };

    const handleTouchEnd = (e) => {
      if (!touchStart) return;
      
      const touchEnd = e.changedTouches[0].clientY;
      const diff = touchStart - touchEnd;

      if (Math.abs(diff) > 50) { 
        if (diff > 0) {
          switchView(viewOrder[(viewOrder.indexOf(activeView) + 1) % viewOrder.length]);
        } else {
          switchView(viewOrder[(viewOrder.indexOf(activeView) - 1 + viewOrder.length) % viewOrder.length]);
        }
      }
      setTouchStart(null);
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      canvas.remove();
    };
  }, [activeView, touchStart, canTransition]);

  const getActiveView = () => views[activeView] || views['profile'];

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
        {viewsArray.map(({ key, label }) => (
          <motion.button
            key={key}
            onClick={() => switchView(key)}
            className={`${styles.navButton} ${activeView === key ? styles.active : ''}`}
            whileHover={{ x: -3, color: '#6E78FF' }}
            whileTap={{ scale: 0.97 }}
          >
            {label}
            {activeView === key && (
              <motion.div 
                className={styles.activeIndicator}
                layoutId="activeIndicator"
                initial={false}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 30,
                  mass: 1,
                  bounce: 0.25
                }}
              />
            )}
          </motion.button>
        ))}
      </nav>

      <AnimatePresence mode="wait" custom={navigationDirection}>
        <motion.div
          key={activeView}
          className={styles.viewContainer}
          custom={navigationDirection}
          initial={(direction) => ({
            opacity: 0,
            y: direction === 'next' ? 50 : -50,
            position: 'absolute',
            width: '100%',
            height: '100%'
          })}
          animate={{
            opacity: 1,
            y: 0,
            position: 'absolute',
            width: '100%',
            height: '100%'
          }}
          exit={(direction) => ({
            opacity: 0,
            y: direction === 'next' ? -50 : 50,
            position: 'absolute',
            width: '100%',
            height: '100%'
          })}
          transition={{ 
            type: "spring",
            stiffness: 300,
            damping: 30
          }}
        >
          {getActiveView()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
