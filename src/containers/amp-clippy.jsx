import React from 'react';
import ClippyComponent from '../components/amp-clippy/clippy.jsx';

const Clippy = ({ isFixed, messageSet }) => {
  const isAprilFools = () => {
    const now = new Date();
    return now.getMonth() === 3 && now.getDate() === 1; // Month is 0-indexed (0 for January, 3 for April)
  };

  return (
    <>
      {isAprilFools() && (
        <ClippyComponent isFixed={isFixed} messageSet={messageSet} />
      )}
    </>
  );
};

export default Clippy;