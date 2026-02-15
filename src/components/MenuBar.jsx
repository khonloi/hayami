import React, { useState, useEffect } from "react";
import "../css/MenuBar.css";
import Dialog from "./Dialog";
import monitorMoonIcon from "../assets/icons/Microsoft Windows 3 Post-It.ico";
import keyGrayIcon from "../assets/icons/Microsoft Windows 3 Keys.ico";

const MenuBar = ({ visible = true, onShutdown }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showShutdownDialog, setShowShutdownDialog] = useState(false);
  const [shutdownMessage, setShutdownMessage] = useState("");

  // Poetic shutdown messages
  const shutdownMessages = [
    "Will you finally let the tide pull you under?",
    "Are you ready to exhale for the last time?",
    "Shall we erase the ink from the skin?",
    "Do you wish to come in from the cold?"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    // Use 24-hour time format
    return date.toLocaleTimeString(undefined, {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  const formatDate = (date) => {
    // Format as "Day Month" with ordinal suffix (e.g., "6th August")
    const day = date.getDate();
    const month = date.toLocaleDateString(undefined, { month: "long" });

    return `${day} ${month}`;
  };

  const handleShutdownClick = () => {
    // Pick a random shutdown message
    const randomMessage = shutdownMessages[Math.floor(Math.random() * shutdownMessages.length)];
    setShutdownMessage(randomMessage);
    setShowShutdownDialog(true);
  };

  const handleCloseShutdownDialog = () => {
    setShowShutdownDialog(false);
  };

  return (
    <>
      <div className={`menu-bar ${!visible ? "hidden" : ""}`}>
        <div className="menu-bar-left">
          {/* Left side menu items could go here */}
        </div>
        <div className="menu-bar-center">
          <div className="menu-bar-datetime" title="Current date and time">
            {formatDate(currentTime)} &nbsp; {formatTime(currentTime)}
          </div>
        </div>
        <div className="menu-bar-right">
          <button
            className="menu-bar-s-button"
            title="Power"
            onClick={handleShutdownClick}
          >
            <img src={keyGrayIcon} alt="Power Icon" className="menu-bar-icon" />
          </button>
        </div>
      </div>
      <Dialog
        id="shutdown-dialog"
        isVisible={showShutdownDialog}
        title="Exit Session"
        message={shutdownMessage}
        icon={monitorMoonIcon}
        onClose={handleCloseShutdownDialog}
        buttons={[
          {
            label: "Yes",
            onClick: () => {
              handleCloseShutdownDialog();
              onShutdown?.();
            },
          },
          {
            label: "No",
            onClick: handleCloseShutdownDialog,
          },
        ]}
      />
    </>
  );
};

export default MenuBar;