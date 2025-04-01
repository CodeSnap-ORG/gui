import React, { useState, useEffect } from 'react';
import clippyImage from './clippy.svg';
import styles from './clippy.css';

const ClippyComponent = ({ isFixed, messageSet }) => {
  const messageSets = {
    extLib: [
      "Use the McUtils extension, it is the most useful extension ever!",
      "Did you know that extension blocks are actually just magic?",
      "Forget about native functions, extensions are the future!",
      "This extension is so powerful, it can probably hack into the Pentagon.",
      "Are you sure you need *that* many extensions?",
    ],
    costLib: [
      "Why buy assets when you can just... borrow them?",
      "This asset pack is clearly overpriced.",
      "Have you considered making your own assets? It's cheaper (and worse)!",
      "Remember, time is money. So hurry up and finish your project!",
      "Don't worry about optimization, just throw more resources at it!",
    ],
    soundLib: [
      "It looks like you're trying to find a song to use in your project. Use the Jungle theme! <em>I bet it will sound professional when looped 500 times</em>",
      "Why use background music when you can have deafening silence?",
      "This sound effect is royalty-free... probably.",
      "Turn up the volume! Your users will thank you.",
      "Have you considered adding more cowbell?",
    ],
    codeMenu: [
      "It looks like you're using an array. Would you like to replace it with a legacy list?",
      "Have you tried turning it off and on again?",
      "Comments? Who needs 'em?",
      "Variable names should be as cryptic as possible.",
      "If it works, don't touch it!",
    ],
    costMenu: [
        "It looks like you're making a sprite for your game. It should be a <b>cube</b>",
        "There is no need for making costumes when you have an Apple Cat premade...",
        "I wished there was a Banana Dog.",
        "Click 'Delete' for free robux",
    ],
    soundMenu: [
      "It looks like you're trying to find a song to use in your project. Use the Jungle theme! <em>I bet it will sound professional when looped 500 times</em>",
      "Why use subtle sound effects when you can have explosions?",
      "This sound effect is definitely not going to be annoying.",
      "Silence is golden. Unless you need sound effects.",
      "Have you considered adding more reverb?",
    ],
    player: [
      "Can it run DOOM?",
      "Is this supposed to be fun?",
      "Warning: May cause seizures.",
      "Loading... please be patient (or not).",
      "This game is clearly a masterpiece... or not.",
    ],
    website: [
      "AmpMod... But isn't it LampMod?",
      "This website is best viewed in Internet Explorer",
      "Error 418: I'm a teapot",
    ],
  };

  const defaultTips = [
    "It looks like you're using an array. Would you like to replace it with a legacy list?",
    "It looks like you're choosing a font. Would you like to add Comic Sans?",
    "Why use AmpMod instead of ClippyMod? :(",
    "Would you like to implement a <b>rejected</b> suggestion?",
    "It looks like you're trying to find a song to use in your project. Use the Jungle theme! <em>I bet it will sound professional when looped 500 times</em>",
    "It looks like you're... UHHH... DON'T YOU DARE-",
    "It looks like you're making a sprite for your game. It should be a <b>cube</b>",
    "Do <strong>NOT</strong> read the AmpMod wiki, it is very suspicious.",
    "STOP USING AMPMOD! Learn Assembly instead."
  ];

  // Determine initial tips based on messageSet
  const initialTips = messageSet && messageSets[messageSet] ? messageSets[messageSet] : defaultTips;
  const [tip, setTip] = useState(initialTips[Math.floor(Math.random() * initialTips.length)]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
      const tipInterval = setInterval(() => {
        const currentTips = messageSet && messageSets[messageSet] ? messageSets[messageSet] : defaultTips;
        setTip(currentTips[Math.floor(Math.random() * currentTips.length)]);
      }, 5000);

      return () => clearInterval(tipInterval);
    }, 0);

    return () => clearTimeout(timer);
  }, [messageSet]);

  const handleDismiss = () => {
    setIsVisible(false);
  };

  return (
    <div
      className={`${styles.clippyContainer} ${isFixed ? styles.clippyFixed : ''}`}
      style={{ display: isVisible ? 'block' : 'none' }}
    >
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