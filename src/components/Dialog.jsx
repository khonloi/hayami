import React from 'react';
import DialogWindow from './DialogWindow';
import '../css/Dialog.css';

const Dialog = ({
    id = 'generic-dialog',
    isVisible,
    title = 'Dialog',
    message,
    icon,
    buttons = [], // Expecting array of { label: string, onClick: function }
    onClose,
    zIndex = 20000
}) => {
    if (!isVisible) return null;

    return (
        <div className="dialog-overlay" style={{ zIndex: zIndex - 1 }}>
            <DialogWindow
                id={id}
                title={title}
                onClose={onClose}
                onFocus={() => { }}
                zIndex={zIndex}
                centered={true}
            >
                <div className="dialog-content">
                    <div className="dialog-message">
                        {icon && <img src={icon} alt="Dialog Icon" className="dialog-icon" />}
                        {message}
                    </div>
                    {buttons.length > 0 && (
                        <div className="dialog-buttons">
                            {buttons.slice(0, 3).map((btn, index) => (
                                <button
                                    key={index}
                                    className="window-button program-button"
                                    onClick={btn.onClick}
                                >
                                    {btn.label}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </DialogWindow>
        </div>
    );
};

Dialog.displayName = "Dialog";

export default Dialog;

