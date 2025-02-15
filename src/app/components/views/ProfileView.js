'use client';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import styles from './ProfileView.module.css';
import ProfileImage from '../../images/Anton_Chepaldin.jpeg';

const ProfileView = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [activeTab, setActiveTab] = useState('story');
  const { scrollYProgress } = useScroll();
  const [direction, setDirection] = useState(0);
  
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -100]);

  const personalTags = [
    'Innovation', 'Leadership', 'Technology', 'Creative Problem Solver',
    'Change Agent', 'Continuous Learner'
  ];

  const impactPoints = [
    {
      title: "Creating Spaces for Growth",
      description: "I am known for building platforms & communities where people feel empowered to explore and innovate. Whether it's I&D, Technology or leading the largest cooperate Neurodiversity network, it's about making the world accessible and exciting."
    },
    {
      title: "From Robots to Communities",
      description: "Started with a fish & chips delivery robot, grew into building spaces where innovation thrives such as leading multiple award winning Hackathons . To me Technology isn't just about code—it's about bringing people together."
    },
    {
      title: "Enabling Small Victories",
      description: "For me, the real impact is in those moments when someone says falls in love with bettering themselves. When fear turns into curiosity, and limitations transform into possibilities. I remember leaving the office one day and see someone using the GenAI learning program with a passionate smile on their face. That's the real win."
    }
  ];

  const tabs = [
    { id: 'story', label: 'My Story' },
    { id: 'aspirations', label: 'Aspirations' },
    { id: 'impact', label: 'Impact' }
  ];

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  
  useEffect(() => {
    const handleScroll = () => {
      if (isMobile) {
        const scrolled = window.scrollY > 50;
        setIsScrolled(scrolled);
      }
    };

    if (isMobile) {
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [isMobile]);

  useEffect(() => {
    const container = document.querySelector(`.${styles.container}`);
    
    const updateScrollProgress = () => {
      if (!container || !isMobile) return;
      
      const scrollPercent = container.scrollTop / (container.scrollHeight - container.clientHeight);
      container.style.setProperty('--scroll-percent', scrollPercent.toString());
      
      setIsScrolled(scrollPercent > 0.1);
    };

    if (isMobile) {
      container?.addEventListener('scroll', updateScrollProgress);
      return () => container?.removeEventListener('scroll', updateScrollProgress);
    }
  }, [isMobile]);

  const slideVariants = {
    initial: {
      opacity: 0,
      x: 0,
      scale: 0.9,
    },
    enter: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.4, 0, 0.2, 1],
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.3,
      },
    },
  };



  const renderMobileContent = () => (
    <div className={styles.mainContent}>
      <div className={styles.mobileContentWrapper}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={activeTab}
            variants={slideVariants}
            initial="initial"
            animate="enter"
            exit="exit"
            className={styles.contentSection}
            data-active={true}
          >
            <motion.div 
              className={styles.contentSection}
              data-active={activeTab === 'story'}
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
                  I have always been a creator making films, building robots, and now developing AI <em className={styles.emoticon}>{">_[]"}</em>
                  </span>
                  <span className={styles.storyLine}>
                  Having a love of learning you'll see me reading nearly every book under the sun. <em className={styles.emoticon}>{"(¬‿¬)"}</em>
                  </span>
                  <span className={styles.storyLine}>
                  Because why not? Life's too short not to be curious!
                  </span>
                  <span className={styles.storyLine}>
                    (and okay, yes - I made this to show I can actually code <em className={styles.emoticon}>{"(/◕ヮ◕)/"}</em>
                  </span>
                </p>
              </motion.div>
            </motion.div>

            <motion.div 
              className={styles.contentSection}
              data-active={activeTab === 'aspirations'}
            >
              <motion.div 
                className={styles.aspirationsSection}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
              >
                <h2>Where I'm Heading</h2>
                <p>
                  <span className={styles.storyLine}>
                    My goal is to amplify the impact of helping and enabling more people <em className={styles.emoticon}>{">^◡^<"}</em>
                  </span>
                  <span className={styles.storyLine}>
                    Whether through technology or innovative solutions, I'm driven by complex, interesting problems that can make a real difference.
                  </span>
                  <span className={styles.storyLine}>
                    By the end of this year, I aim to solve more challenging problems, build scalable solutions, and create meaningful impact.
                  </span>
                  <span className={styles.storyLine}>
                    Looking for collaboration opportunities? Let's build something amazing together! <em className={styles.emoticon}>{"(づ｡◕‿‿◕｡)づ"}</em>
                  </span>
                </p>
              </motion.div>
            </motion.div>

            <motion.div 
              className={styles.contentSection}
              data-active={activeTab === 'impact'}
            >
              <motion.div 
                className={styles.impactSection}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h2>What has been my Impact?</h2>
                <p>
                  <span className={styles.storyLine}>
                    Building platforms & communities where people feel empowered to explore and innovate
                  </span>
                  <span className={styles.storyLine}>
                    From a fish & chips delivery robot to leading award-winning Hackathons—technology isn't just code, it's about bringing people together.
                  </span>
                  <span className={styles.storyLine}>
                    Leading the largest corporate Neurodiversity network, making technology accessible and exciting for everyone.
                  </span>
                  <span className={styles.storyLine}>
                    Creating moments where fear turns into curiosity, and limitations transform into possibilities <em className={styles.emoticon}>{"(ﾉ◕ヮ◕)ﾉ*:･ﾟ✧"}</em>
                  </span>
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        <div className={styles.socialButtonsMobile}>
          <motion.button
            className={`${styles.socialButton} ${styles.githubButton}`}
            onClick={() => window.open('https://github.com/Hook12aaa')}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            whileTap={{ scale: 0.95 }}
          >
            <span className={styles.bracketLeft} data-text="{">{`{`}</span>
            <span className={styles.buttonText} data-text="github">github</span>
            <span className={styles.bracketRight} data-text="}">{`}`}</span>
          </motion.button>

          <motion.button
            className={`${styles.socialButton} ${styles.linkedinButton}`}
            onClick={() => window.open('https://www.linkedin.com/in/anton-chepaldin/')}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            whileTap={{ scale: 0.95 }}
          >
            <span className={styles.bracketLeft} data-text="<">{`<`}</span>
            <span className={styles.buttonText} data-text="linkedin">linkedin</span>
            <span className={styles.bracketRight} data-text=">">{`>`}</span>
          </motion.button>

          <motion.button
            className={styles.contactButton}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            onClick={() => window.open('mailto:anton.chepaldin@outlook.com')}
            whileTap={{ scale: 0.95 }}
          >
            <span className={styles.bracketLeft} data-text="[">[</span>
            <span className={styles.buttonText}>contact/</span>
            <span className={styles.bracketRight} data-text="]">]</span>
          </motion.button>
        </div>
      </div>
    </div>
  );

  const renderDesktopContent = () => (
    <div className={styles.mainContent}>
      <div className={styles.textSectionsContainer}>
        <motion.div 
          className={styles.contentSection}
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
              I have always been a creator making films, building robots, and now developing AI <em className={styles.emoticon}>{">_[]"}</em>
              </span>
              <span className={styles.storyLine}>
              Having a love of learning you'll see me reading nearly every book under the sun. <em className={styles.emoticon}>{"(¬‿¬)"}</em>
              </span>
              <span className={styles.storyLine}>
              Because why not? Life's too short not to be curious!
              </span>
              <span className={styles.storyLine}>
                (and okay, yes - I made this to show I can actually code <em className={styles.emoticon}>{"(/◕ヮ◕)/"}</em>
              </span>
            </p>
          </motion.div>
        </motion.div>

        <motion.div 
          className={styles.contentSection}
        >
          <motion.div 
            className={styles.aspirationsSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
          >
            <h2>Where I'm Heading</h2>
            <p>
              <span className={styles.storyLine}>
                My goal is to amplify the impact of helping and enabling more people <em className={styles.emoticon}>{">^◡^<"}</em>
              </span>
              <span className={styles.storyLine}>
                Whether through technology or innovative solutions, I'm driven by complex, interesting problems that can make a real difference.
              </span>
              <span className={styles.storyLine}>
                By the end of this year, I aim to solve more challenging problems, build scalable solutions, and create meaningful impact.
              </span>
              <span className={styles.storyLine}>
                Looking for collaboration opportunities? Let's build something amazing together! <em className={styles.emoticon}>{"(づ｡◕‿‿◕｡)づ"}</em>
              </span>
            </p>
          </motion.div>
        </motion.div>

        <motion.div 
          className={styles.contentSection}
        >
          <motion.div 
            className={styles.impactSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2>What has been my Impact?</h2>
            <p>
              <span className={styles.storyLine}>
                Building platforms & communities where people feel empowered to explore and innovate
              </span>
              <span className={styles.storyLine}>
                From a fish & chips delivery robot to leading award-winning Hackathons—technology isn't just code, it's about bringing people together.
              </span>
              <span className={styles.storyLine}>
                Leading the largest corporate Neurodiversity network, making technology accessible and exciting for everyone.
              </span>
              <span className={styles.storyLine}>
                Creating moments where fear turns into curiosity, and limitations transform into possibilities <em className={styles.emoticon}>{"(ﾉ◕ヮ◕)ﾉ*:･ﾟ✧"}</em>
              </span>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );

  return (
    <motion.div 
      className={styles.view}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className={styles.container}>
        <motion.div 
          className={styles.profileContainer}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div 
            className={styles.leftSection}
            data-scrolled={isScrolled}
            data-mobile={isMobile}
          >
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
            style={{ y: isMobile ? 0 : parallaxY }}
          >
            {isMobile ? renderMobileContent() : (
              <>
                {renderDesktopContent()}
                <div className={styles.socialButtons}>
                  <motion.button
                    className={`${styles.socialButton} ${styles.githubButton}`}
                    onClick={() => window.open('https://github.com/Hook12aaa')}
                    onHoverStart={() => setIsHovered(true)}
                    onHoverEnd={() => setIsHovered(false)}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className={styles.bracketLeft} data-text="{">{`{`}</span>
                    <span className={styles.buttonText} data-text="github">github</span>
                    <span className={styles.bracketRight} data-text="}">{`}`}</span>
                  </motion.button>

                  <motion.button
                    className={`${styles.socialButton} ${styles.linkedinButton}`}
                    onClick={() => window.open('https://www.linkedin.com/in/anton-chepaldin/')}
                    onHoverStart={() => setIsHovered(true)}
                    onHoverEnd={() => setIsHovered(false)}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className={styles.bracketLeft} data-text="<">{`<`}</span>
                    <span className={styles.buttonText} data-text="linkedin">linkedin</span>
                    <span className={styles.bracketRight} data-text=">">{`>`}</span>
                  </motion.button>

                  <motion.button
                    className={styles.contactButton}
                    onHoverStart={() => setIsHovered(true)}
                    onHoverEnd={() => setIsHovered(false)}
                    onClick={() => window.open('mailto:anton.chepaldin@outlook.com')}
                    onTouchStart={() => setIsHovered(true)}
                    onTouchEnd={() => setIsHovered(false)}
                    whileTap={{ 
                      scale: 0.95,
                      transition: { duration: 0.1 }
                    }}
                  >
                    <span className={styles.bracketLeft} data-text="[">[</span>
                    <span className={styles.buttonText}>contact/</span>
                    <span className={styles.bracketRight} data-text="]">]</span>
                  </motion.button>
                </div>
              </>
            )}
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ProfileView;
