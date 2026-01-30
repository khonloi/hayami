import React, { useState, useCallback, useEffect } from 'react';
import Desktop from './components/Desktop';
// import ScreensaverManager from './components/ScreensaverManager';
import { setCursorVariables } from './data/cursors';
import './App.css';

function App() {
  const [isFullScreen, setIsFullScreen] = useState(false);

  // Initialize cursor variables on mount
  useEffect(() => {
    setCursorVariables();
  }, []);

  const handleFullScreenChange = useCallback((isFullScreenActive) => {
    setIsFullScreen(isFullScreenActive);
  }, []);

  return (
    <div className={`App ${isFullScreen ? 'fullscreen' : ''}`}>
      <Desktop onFullScreenChange={handleFullScreenChange} />
      {/* <ScreensaverManager /> */}

      {/* Hidden preloader for custom cursors to prevent flickers */}
      <div style={{ position: 'fixed', opacity: 0, pointerEvents: 'none', zIndex: -1 }}>
        <div style={{ cursor: 'var(--cursor-arrow)' }}></div>
        <div style={{ cursor: 'var(--cursor-link)' }}></div>
        <div style={{ cursor: 'var(--cursor-wait)' }}></div>
        <div style={{ cursor: 'var(--cursor-busy)' }}></div>
      </div>
    </div>
  );
}

export default App;