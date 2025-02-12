import React, { useState, useEffect } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import timelineStyles from './Timeline.module.css';

const timelineData = [
  {
    year: '2016',
    title: 'Media Foundations',
    description: 'Started at UK Parliament video services, experiencing how tech could transform live broadcasting and content delivery.',
    tech: ['Media Production', 'Broadcast Systems', 'Content Management']
  },
  {
    year: '2018-19',
    title: 'Creative Tech Journey',
    description: 'Produced BFI funded films while exploring tech innovations. Built first automation tools for Oxfam book scanning.',
    tech: ['Film Production', 'Automation', 'Creative Tech']
  },
  {
    year: '2020',
    title: 'Innovation Pioneer',
    description: 'First rotation at AstraZeneca - built autonomous warehouse drones and launched computer vision solutions that transformed inspections.',
    tech: ['Python', 'Computer Vision', 'IoT', 'Drone Systems']
  },
  {
    year: '2021 H1',
    title: 'Security Innovator',
    description: 'Became fastest Level 2 Security Analyst by building Python tools that automated threat response. Transformed manual processes into efficient workflows.',
    tech: ['Security Analysis', 'Python Automation', 'SIEM', 'EDR']
  },
  {
    year: '2021 H2',
    title: 'Community Builder',
    description: 'Started neurodiversity initiative. Launched platform that would grow from 20 to 3000+ members. Co-hosted tech inclusivity hackathon with Google & Microsoft.',
    tech: ['Community Building', 'DEI Initiatives', 'Event Management']
  },
  {
    year: '2022',
    title: 'Global Innovation Lead',
    description: 'Led Global IT Hackathon connecting 333 innovators across 9 countries. Transformed IT learning with innovations people actually engaged with.',
    tech: ['Innovation Programs', 'Learning Tech', 'Global Engagement']
  },
  {
    year: '2023',
    title: 'Change & Communications',
    description: 'Led sustainability campaigns reaching 20,000+ people. Created SOAP (Strategy on a Page) making complex transformations digestible.',
    tech: ['Change Management', 'Strategic Communications', 'Enterprise Transformation']
  },
  {
    year: '2024 H1',
    title: 'AI Transformation Pioneer',
    description: 'Pioneered GenAI adoption program reaching 8,500+ professionals. Part of small team making AI feel exciting rather than scary.',
    tech: ['GenAI', 'Enterprise AI', 'Learning Systems']
  },
  {
    year: '2024 H2',
    title: 'Commercial Innovation',
    description: 'Final rotation in Global Commercial. Turned AI from buzzword into practical solutions for global teams while immersing in commercial operations.',
    tech: ['Commercial Strategy', 'AI Solutions', 'Business Development']
  },
  {
    year: '2024-25',
    title: 'Founder Journey',
    description: 'Founded AI platform transforming creative discovery. Built from personal career mapping tool into industry solution helping others find their path.',
    tech: ['React', 'FastAPI', 'NLP', 'ML']
  }
];

export default function TimelineView() {
  const [selectedEvent, setSelectedEvent] = useState(null);

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
      <div className={timelineStyles.view}>
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
                    onHoverStart={() => setSelectedEvent(event)}
                    onHoverEnd={() => setSelectedEvent(null)}
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
          <motion.div className={timelineStyles.eventDetails}>
            {(() => {
              const index = timelineData.findIndex(e => e === selectedEvent);
              const pos = calculatePosition(index, timelineData.length);

              return (
                <motion.div
                  style={{
                    position: 'absolute',
                    left: `${pos.x - 100}px`,
                    bottom: `calc(100% - ${pos.y}px)`,
                    transform: 'translate(-40%, 0)',
                    width: '280px',
                    pointerEvents: 'none',
                    marginBottom: '40px' 
                  }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <motion.div className={timelineStyles.eventContent}>
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
}