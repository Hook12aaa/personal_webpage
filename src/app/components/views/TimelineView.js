'use client';
import React, { useState, useEffect } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import timelineStyles from './Timeline.module.css';

const timelineData = [
  {
    "year": "2016",
    "title": "First Work Experience",
    "description": "My first work experience at UK Parliament, experiencing how tech could transform live broadcasting and content delivery.",
    "tech": ["Media Production", "Broadcast Systems", "Content Management"]
  },
  {
    "year": "2018-19",
    "title": "Creative Tech Journey",
    "description": "I made many short films with BFI and other bodies while also building fun projects at home. A side project was building tools to make my volunteering work at Oxfam book scanning easier.",
    "tech": ["Film Production", "Automation", "Creative Tech"]
  },
  {
    "year": "2020",
    "title": "Technology Innovation",
    "description": "First rotation at AstraZeneca - used my software engineering knowledge to build autonomous warehouse drones, XR projects and created PoCs to explore the future of technology innovation. Ran a Hackathon with Microsoft, ComputerCenter, Google, Intel and Nvidia.",
    "tech": ["Python", "Computer Vision", "IoT", "Drone Systems"]
  },
  {
    "year": "2021 H1",
    "title": "Security Engineering",
    "description": "Worked as a Level 2 Security Analyst by building my own smarter tools that automated threat response. Transformed manual processes into efficient workflows, leading to becoming the fastest analyst in the team.",
    "tech": ["Security Analysis", "Python Automation", "SIEM", "EDR"]
  },
  {
    "year": "2021 - 2023",
    "title": "TH!NK Neurodiversity ERG",
    "description": "Became co-chair of the TH!NK Neurodiversity ERG, growing the platform from 20 to 3000+ members across 9 countries. Represented AstraZeneca at the UK Parliament & other high-profile engagements.",
    "tech": ["Community Building", "DEI Initiatives", "Event Management"]
  },
  {
    "year": "2022",
    "title": "Learning & Development",
    "description": "Co-led Global IT Hackathon connecting 333 innovators across 9 countries. Helped redesign the early careers program and scale the IT strategic capability program, winning multiple HR & IT awards.",
    "tech": ["Innovation Programs", "Learning Tech", "Global Engagement"]
  },
  {
    "year": "2023",
    "title": "Change & Communications",
    "description": "Led multiple communications campaigns, reaching more than 20,000+ people. Created SOAP (Strategy on a Page) making complex transformations digestible.",
    "tech": ["Change Management", "Strategic Communications", "Enterprise Transformation"]
  },
  {
    "year": "2024 H1",
    "title": "GenAI Adoption Program",
    "description": "Part of the small & mighty team that created the GenAI adoption program reaching 10,000 professionals. My role was developing technology infrastructure, content, driving change & more.",
    "tech": ["GenAI", "Enterprise AI", "Learning Systems"]
  },
  {
    "year": "2024 H2",
    "title": "Commercial AI Adoption",
    "description": "Final rotation in Global Commercial. Worked in the global marketing team focused on AI solutions. Upskilled my function with keynote sessions, drove early stage AI projects and more.",
    "tech": ["Commercial Strategy", "AI Solutions", "Business Development"]
  },
  {
    "year": "2025",
    "title": "Founder Journey",
    "description": "Founded a platform transforming creative discovery. Using my previous experience to develop, teach and grow a community of creators.",
    "tech": ["Community Building", "NLP", "React", "AI"]
  }
]

const TimelineView = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  const handleTouch = React.useCallback((event, timelineEvent) => {
    event.stopPropagation();
    setSelectedEvent(prev => prev === timelineEvent ? null : timelineEvent);
  }, []);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const calculatePosition = (index, total) => {
    const viewBoxWidth = 2200;
    const startX = 300;
    const endX = viewBoxWidth - 300;
    const baseY = 150;
    const availableWidth = endX - startX;
    const x = startX + (availableWidth * (index / (total - 1)));

    const svgElement = document.querySelector(`.${timelineStyles.timelineSvg}`);
    
    if (svgElement) {
      const svgRect = svgElement.getBoundingClientRect();
      const point = svgElement.createSVGPoint();
      point.x = x;
      point.y = baseY;
      
      const CTM = svgElement.getScreenCTM();
      const screenPoint = point.matrixTransform(CTM);
      
      return {
        svgX: x,
        svgY: baseY,
        x: screenPoint.x,
        y: screenPoint.y
      };
    }
    
    return {
      svgX: x,
      svgY: baseY,
      x: x,
      y: baseY
    };
  };

  const wavePath = `
    M 300,150 
    C 700,145 1100,155 1500,150
    S 1700,145 1900,150
  `;

  return (
    <div className={timelineStyles.viewWrapper}>
      <div className={`${timelineStyles.view} ${isMobile ? timelineStyles.mobile : ''}`}>
        <div className={timelineStyles.timelineContainer}>
          <svg className={timelineStyles.timelineSvg} viewBox="0 0 2200 300">
            <defs>
              <linearGradient id="timelineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#6E78FF">
                  <animate
                    attributeName="stop-color"
                    values="#6E78FF;#FF6B98;#6E78FF"
                    dur="20s"
                    repeatCount="indefinite"
                  />
                </stop>
                <stop offset="50%" stopColor="#FF6B98">
                  <animate
                    attributeName="stop-color"
                    values="#FF6B98;#6E78FF;#FF6B98"
                    dur="20s"
                    repeatCount="indefinite"
                  />
                </stop>
                <stop offset="100%" stopColor="#6E78FF">
                  <animate
                    attributeName="stop-color"
                    values="#6E78FF;#FF6B98;#6E78FF"
                    dur="20s"
                    repeatCount="indefinite"
                  />
                </stop>
              </linearGradient>

              <filter id="liquidEffect">
                <feTurbulence 
                  type="fractalNoise" 
                  baseFrequency="0.005" 
                  numOctaves="2" 
                  seed="1"
                  result="noise"
                >
                  <animate
                    attributeName="seed"
                    values="1;10;1"
                    dur="30s"
                    repeatCount="indefinite"
                  />
                </feTurbulence>
                <feDisplacementMap 
                  in="SourceGraphic" 
                  in2="noise" 
                  scale="5"
                  result="displacement" 
                />
                <feGaussianBlur 
                  in="displacement" 
                  stdDeviation="0.5"
                />
              </filter>

              <filter id="timelineGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="4" result="blur"/>
                <feFlood floodColor="#6E78FF" floodOpacity="0.3" result="color"/>
                <feComposite operator="in" in="color" in2="blur" result="glow"/>
                <feMerge>
                  <feMergeNode in="glow"/>
                  <feMergeNode in="glow"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>

            <motion.path
              d={wavePath}
              className={timelineStyles.timelinePath}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ 
                pathLength: 1,
                opacity: 1,
              }}
              transition={{ 
                pathLength: { duration: 3, ease: "easeInOut" },
                opacity: { duration: 1.5 }
              }}
            />

            {timelineData.map((event, index) => {
              const pos = calculatePosition(index, timelineData.length);
              return (
                <motion.g 
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2 + index * 0.3 }}
                >
                  <motion.circle
                    className={timelineStyles.timelinePoint}
                    cx={pos.svgX}
                    cy={pos.svgY}
                    r="8"
                    whileHover={{ 
                      scale: 1.5,
                      transition: { duration: 0.2 }
                    }}
                    onHoverStart={() => !isMobile && setSelectedEvent(event)}
                    onHoverEnd={() => !isMobile && setSelectedEvent(null)}
                    onTouchStart={(e) => handleTouch(e, event)}
                    style={{ touchAction: 'none' }}
                  />
                  <text
                    className={timelineStyles.timelineYear}
                    x={pos.svgX}
                    y={pos.svgY + 25}
                    textAnchor="middle"
                  >
                    {event.year}
                  </text>
                </motion.g>
              );
            })}
          </svg>
        </div>
      </div>

      <AnimatePresence>
        {selectedEvent && (
          <motion.div 
            className={timelineStyles.eventDetails}
            onTouchStart={(e) => e.stopPropagation()}
          >
            {(() => {
              const index = timelineData.findIndex(e => e === selectedEvent);
              const pos = calculatePosition(index, timelineData.length);

              return (
                <motion.div
                  style={{
                    position: 'absolute',
                    left: isMobile ? '50%' : `${pos.x - 100}px`,
                    bottom: isMobile ? '20px' : `calc(100% - ${pos.y}px)`,
                    transform: isMobile ? 'translate(-50%, 0)' : 'translate(-40%, 0)',
                    width: isMobile ? '90%' : '280px',
                    pointerEvents: 'auto',
                    marginBottom: isMobile ? '0' : '40px'
                  }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <motion.div 
                    className={timelineStyles.eventContent}
                    onClick={() => isMobile && setSelectedEvent(null)}
                  >
                    <motion.span className={timelineStyles.eventYear}>
                      {selectedEvent.year}
                    </motion.span>

                    <motion.h3>
                      {selectedEvent.title}
                    </motion.h3>

                    <motion.p>
                      {selectedEvent.description}
                    </motion.p>

                    <motion.div className={timelineStyles.techTags}>
                      {selectedEvent.tech.map((tech, i) => (
                        <span key={i} className={timelineStyles.techTag}>
                          {tech}
                        </span>
                      ))}
                    </motion.div>
                  </motion.div>
                  
                  <motion.div 
                    className={timelineStyles.detailLine}
                    style={{
                      position: 'absolute',
                      left: '50%',
                      bottom: '-50px',
                      transform: 'translateX(0)',
                      width: '2px',
                      height: '40px'
                    }}
                  />
                </motion.div>
              );
            })()}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TimelineView;