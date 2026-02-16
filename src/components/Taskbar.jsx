// src/components/Taskbar.jsx
import React, { memo } from 'react';
import '../css/Taskbar.css';

const Taskbar = memo(({ minimizedWindows, onRestore, isCollapsed, onToggleCollapse }) => {
  // Don't render taskbar if there are no minimized windows
  if (!minimizedWindows || minimizedWindows.length === 0) {
    return null;
  }

  return (
    <div className={`taskbar ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="taskbar-items">
        {!isCollapsed && minimizedWindows.map((window) => (
          <button
            key={window.id}
            className="window-button taskbar-item"
            onClick={() => onRestore(window.id)}
            title={`Restore ${window.title}`}
          >
            <div className="window-button-layer-1">
              {window.icon && (
                <img
                  src={window.icon}
                  alt=""
                  className="taskbar-icon"
                />
              )}
            </div>
            <div className="window-button-layer-2"></div>
          </button>
        ))}
      </div>
      <button
        className="window-button taskbar-collapse-btn"
        onClick={onToggleCollapse}
        title={isCollapsed ? "Expand Taskbar" : "Collapse Taskbar"}
      >
        <div className="window-button-layer-1">
          {isCollapsed ? ">" : "<"}
        </div>
        <div className="window-button-layer-2"></div>
      </button>
    </div>
  );
});

Taskbar.displayName = 'Taskbar';

export default Taskbar;