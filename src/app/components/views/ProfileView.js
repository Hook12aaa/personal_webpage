'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';
import styles from './ProfileView.module.css';
import ProfileImage from '../../images/Anton_Chepaldin.jpeg';

const ProfileView = () => {
  const [isHovered, setIsHovered] = useState(false);
  const { scrollYProgress } = useScroll();
  
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  
  const personalTags = [
    'Innovation', 'Leadership', 'Technology', 'Creative Problem Solver',
    'Change Agent', 'Continuous Learner'
  ];

  const impactPoints = [
    {
      title: "Creating Spaces for Growth",
      description: "Building platforms where people feel empowered to explore and innovate. Whether it's AI or neurodiversity initiatives, it's about making technology accessible and exciting."
    },
    {
      title: "From Robots to Communities",
      description: "Started with a fish & chips delivery robot, grew into building spaces where innovation thrives. Technology isn't just about code—it's about bringing people together."
    },
    {
      title: "Enabling Small Victories",
      description: "The real impact is in those moments when someone says 'I can do this now.' When fear turns into curiosity, and limitations transform into possibilities."
    }
  ];

  return (
    <motion.div className={styles.view}>
      <div className={styles.container}>
        <motion.div 
          className={styles.profileContainer}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className={styles.leftSection}>
            <motion.div 
              className={styles.imageWrapper}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className={styles.backgroundEffect} />
              <motion.div 
                className={styles.imageContainer}
                style={{ 
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                }}
                animate={{
                  borderRadius: [
                    "60% 40% 30% 70%/60% 30% 70% 40%",
                    "30% 60% 70% 40%/50% 60% 30% 60%",
                    "60% 40% 30% 70%/60% 30% 70% 40%"
                  ]
                }}
                transition={{
                  duration: 15,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              >
                <Image
                  src={ProfileImage}
                  alt="Anton Chepaldin"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  quality={95}
                  style={{ 
                    objectFit: 'cover',
                    borderRadius: 'inherit'
                  }}
                  className={styles.profileImage}
                />
              </motion.div>
            </motion.div>

            <motion.div className={styles.tagsContainer}>
              {personalTags.map((tag, index) => (
                <motion.span
                  key={tag}
                  className={styles.tag}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {tag}
                </motion.span>
              ))}
            </motion.div>
          </div>

          <motion.div 
            className={styles.rightSection}
            style={{ y: parallaxY }}
          >
            <motion.div 
              className={styles.storySection}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2>My Story</h2>
              <p>
                <span className={styles.storyLine}>
                  Built this space to share who I am
                </span>
                <span className={styles.storyLine}>
                  One day I'm building robots, next exploring AI <em>🤖</em>
                </span>
                <span className={styles.storyLine}>
                  Then suddenly deep-diving into Psychology science <em>☕️</em>
                </span>
                <span className={styles.storyLine}>
                  Because why not? Life's too short not to be curious! <em>🚀</em>
                </span>
                <span className={styles.storyLine}>
                  (and okay, yes - to show I can actually code <em>😅</em>)
                </span>
              </p>
            </motion.div>

            <motion.div 
              className={styles.impactSection}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h2>Impact</h2>
              <div className={styles.impactGrid}>
                {impactPoints.map((point, index) => (
                  <motion.div
                    key={index}
                    className={styles.impactCard}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                  >
                    <h3>{point.title}</h3>
                    <p>{point.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.button
              className={styles.contactButton}
              onHoverStart={() => setIsHovered(true)}
              onHoverEnd={() => setIsHovered(false)}
              whileTap={{ 
                scale: 0.95,
                transition: { duration: 0.1 }
              }}
            >
              <span className={styles.bracketLeft} data-text="[">[</span>
              <span className={styles.buttonText}>contact/</span>
              <span className={styles.bracketRight} data-text="]">]</span>
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ProfileView;
