import React, { useState, useEffect } from 'react';
import clippyImage from './clippy.svg';
import styles from './clippy.css';

const ClippyComponent = () => {
  const tips = [
    "It looks like you're using an array. Would you like to replace it with a legacy list?",
    "It looks like you're choosing a font. Would you like to add Comic Sans?",
    "Why use AmpMod instead of <a target=_blank href='https://scratch.mit.edu/discuss/youtube/dQw4w9WgXcQ'>ClippyMod</a>",
    "Would you like to implement a <b>rejected</b> suggestion?",
    "If you click me, the earth will shatter into bits",
    "It looks like you're trying to find a song to use in your project. Use the Jungle theme! <em>I bet it will sound professional when looped 500 times</em>",
    "It looks like you're... UHHH... DON'T YOU DARE-",
    "It looks like you're making a sprite for your game. It should be a <b>cube</b>"
  ];

  const [tip, setTip] = useState(tips[Math.floor(Math.random() * tips.length)]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
      const tipInterval = setInterval(() => {
        setTip(tips[newTipIndex]);
      }, 5000); // Change tip every 5 seconds

      return () => clearInterval(tipInterval); // Cleanup interval on unmount
    }, 2000); // Show Clippy after 2 seconds

    return () => clearTimeout(timer); // Cleanup timeout on unmount
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
  };

  return (
    <div className={styles.clippyContainer} style={{ display: isVisible ? 'block' : 'none' }}>
      <div
        className={styles.clippyTip}
        dangerouslySetInnerHTML={{ __html: tip }}
      ></div>
      <img
        src={clippyImage}
        alt="Clippy"
        className={styles.clippyImage}
        onClick={handleDismiss}
        draggable={false}
      />
    </div>
  );
};

export default ClippyComponent;