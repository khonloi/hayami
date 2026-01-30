import React, { useState, useMemo, memo, useCallback } from "react";
import "./FileManager.css";
import fmFolderIcon from "../../assets/icons/Microsoft Windows 3 Folder.ico";
import fmFolderOpenIcon from "../../assets/icons/Microsoft Windows 3 Folder Open Document.ico";
import fmDocIcon from "../../assets/icons/Microsoft Windows 3 Documents.ico";
import fmFileSystemData from "../../data/filesystem.json";

const FileManager = memo(() => {
    // Use a state for toggled folders, initializing root as open
    const [fmOpenFolders, setFmOpenFolders] = useState({ root: true });
    const [fmSelectedFolderId, setFmSelectedFolderId] = useState("root");

    const fmToggleFolder = useCallback((folderId, e) => {
        if (e) e.stopPropagation();
        setFmOpenFolders((prev) => ({
            ...prev,
            [folderId]: !prev[folderId],
        }));
    }, []);

    const fmSelectFolder = useCallback((folderId) => {
        setFmSelectedFolderId(folderId);
    }, []);

    // Helper to find folder by ID in our dynamic filesystem tree
    const fmFindFolder = (node, id) => {
        if (node.id === id) return node;
        if (node.children) {
            for (const child of node.children) {
                if (child.type === "folder") {
                    const found = fmFindFolder(child, id);
                    if (found) return found;
                }
            }
        }
        return null;
    };

    const currentFolderData = useMemo(() => fmFindFolder(fmFileSystemData, fmSelectedFolderId), [fmSelectedFolderId]);

    // Recursively render directory tree (folders only)
    const renderTreeNodes = (node) => {
        if (node.type !== "folder") return null;

        const isOpen = !!fmOpenFolders[node.id];
        const subfolders = node.children ? node.children.filter(child => child.type === "folder") : [];
        const hasSubfolders = subfolders.length > 0;

        return (
            <div key={node.id} className="fm-section">
                <div
                    className="fm-section-title"
                    onClick={() => {
                        fmSelectFolder(node.id);
                        if (hasSubfolders) fmToggleFolder(node.id);
                    }}
                >
                    <img
                        src={isOpen ? fmFolderOpenIcon : fmFolderIcon}
                        alt="Folder"
                        className="fm-icon"
                    />
                    <span style={{ color: fmSelectedFolderId === node.id ? 'var(--windows-black)' : 'inherit' }}>
                        {node.name}
                    </span>
                </div>

                {isOpen && hasSubfolders && (
                    <div className="fm-tree-connector">
                        <ul className="fm-list">
                            {subfolders.map(child => (
                                <li key={child.id} className="fm-tree-item">
                                    {renderTreeNodes(child)}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        );
    };

    const fmBreadcrumb = useMemo(() => {
        const rootName = fmFileSystemData.name;
        if (fmSelectedFolderId === 'root') return `C:\\${rootName}`;
        return `C:\\${rootName}\\${fmSelectedFolderId.replace(/\//g, '\\')}`;
    }, [fmSelectedFolderId]);

    return (
        <div className="fm-container">
            {/* Sidebar - Matches About's Left Pane */}
            <div className="fm-sidebar">
                {renderTreeNodes(fmFileSystemData)}
            </div>

            {/* Main Content - Files List */}
            <div className="fm-main-content">
                <div className="fm-path-bar">
                    <strong>Path:</strong> {fmBreadcrumb}
                </div>

                <div className="fm-file-pane">
                    <div className="fm-file-header">
                        <span>Name</span>
                        <span style={{ textAlign: 'right' }}>Size</span>
                        <span>Date Modified</span>
                    </div>

                    <div className="fm-file-list">
                        {currentFolderData && currentFolderData.children && currentFolderData.children.length > 0 ? (
                            currentFolderData.children.map((item) => (
                                <div key={item.id} className="fm-file-row">
                                    <div className="fm-file-info">
                                        <img
                                            src={item.type === "folder" ? fmFolderIcon : fmDocIcon}
                                            alt={item.type}
                                            className="fm-icon"
                                        />
                                        {item.name}
                                    </div>
                                    <div className="fm-file-size">
                                        {item.type === "file" ? item.size : ""}
                                    </div>
                                    <div className="fm-file-date">
                                        {item.date || "--"}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div style={{ padding: '20px', textAlign: 'center', color: '#666', fontStyle: 'italic', fontSize: '13px' }}>
                                This folder is empty.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
});

FileManager.displayName = "FileManager";

export default FileManager;
