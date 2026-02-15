import React, { useState, useMemo, memo, useCallback } from "react";
import "./About.css";
import folderIcon from "../../assets/icons/Microsoft Windows 3 Folder.ico";
import folderOpenIcon from "../../assets/icons/Microsoft Windows 3 Folder Open Document.ico";
import docIcon from "../../assets/icons/Microsoft Windows 3 Documents.ico";
import portraitImage from "./portrait.jpg";
import { SKILLS_DATA } from "../../data/skills";

import swissKnifeIcon from "../../assets/icons/Microsoft Windows 3 Swiss Army Knife.ico";
import educationIcon from "../../assets/icons/Microsoft Windows 3 Education.ico";
import briefcaseIcon from "../../assets/icons/Microsoft Windows 3 Briefcase.ico";
import cvFile from "./Nguyen-Minh-Khoi-CV.pdf";


// Initial folder states
const INITIAL_FOLDER_STATES = SKILLS_DATA.reduce((acc, folder) => {
  acc[folder.id] = true;
  return acc;
}, {});

const About = memo(() => {
  // State to manage open/closed folders
  const [openFolders, setOpenFolders] = useState(INITIAL_FOLDER_STATES);

  // Toggle folder open/closed state
  const toggleFolder = useCallback((folderId) => {
    setOpenFolders((prev) => ({
      ...prev,
      [folderId]: !prev[folderId],
    }));
  }, []);

  const handleExport = useCallback(() => {
    const link = document.createElement("a");
    link.href = cvFile;
    link.download = "Nguyen-Minh-Khoi-CV.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, []);


  // Memoize skills sections to prevent unnecessary re-renders
  const skillsSections = useMemo(
    () =>
      SKILLS_DATA.map((folder) => (
        <div key={folder.id} className="skills-section">
          <div
            className="skills-section-title"
            onClick={() => toggleFolder(folder.id)}
          >
            <img
              src={openFolders[folder.id] ? folderOpenIcon : folderIcon}
              alt="Folder"
              className="folder-icon"
            />{" "}
            {folder.title}
          </div>
          <div className="tree-connector">
            {openFolders[folder.id] && (
              <ul className="skills-list">
                {folder.skills.map((skill, index) => (
                  <li key={`${folder.id}-${index}`}>
                    <img
                      src={docIcon}
                      alt="Document"
                      className="folder-icon"
                    />{" "}
                    {skill}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )),
    [openFolders, toggleFolder]
  );

  return (
    <div className="about-container">
      {/* Left Pane - Skills Tree */}
      <div className="skills-pane">{skillsSections}</div>

      {/* Right Pane - Main Content */}
      <div className="main-content">
        <div className="header">
          <img src={portraitImage} alt="Portrait" className="portrait-image" />
          <div className="header-group">
            <h2 className="name">Nguyen Minh Khoi</h2>
            <p className="title">Full Stack Web Developer</p>
          </div>
          <button
            className="window-button program-button"
            style={{ marginLeft: 'auto' }}
            onClick={handleExport}
          >
            <div className="window-button-layer-1">Export</div>
            <div className="window-button-layer-2"></div>
          </button>
        </div>

        <div className="section">
          <h3 className="section-title">
            <img src={swissKnifeIcon} alt="" className="section-icon" />
            Professional Summary
          </h3>
          <p className="section-text">
            Full Stack Web Developer with hands-on experience building scalable web
            applications using modern JavaScript frameworks. Proficient in
            front-end development with React.js and responsive UI design, and
            back-end development with Node.js and Express.js. Skilled in optimizing API
            performance, and implementing secure authentication with JWT. Strong
            foundation in agile workflows, code reviews, and performance
            optimization.
          </p>
        </div>

        <div className="section">
          <h3 className="section-title">
            <img src={educationIcon} alt="" className="section-icon" />
            Education
          </h3>
          <div className="education-box">
            <div className="education-degree">
              Bachelor of Software Engineer
            </div>
            <div className="education-details">
              FPT University • 2021 − 2025
            </div>
            <div className="education-concentration">
              <ul className="approach-list">
                <li>
                  <strong>Relevant Coursework:</strong> Web Development,
                  Database Systems, Software Architecture and Agile
                  Methodologies
                </li>
                <li>
                  <strong>Academic Project: </strong> Led a team in developing a
                  full-stack e-commerce application using React and Node.js,
                  featuring secure authentication, product management,
                  and real-time order tracking.
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="section">
          <h3 className="section-title">
            <img src={briefcaseIcon} alt="" className="section-icon" />
            Experience
          </h3>
          <div className="education-box">
            <div className="education-degree">Full Stack Web Developer Intern</div>
            <div className="education-details">
              UTA Solutions • September 2024 − January 2025
            </div>
            <div className="education-concentration">
              <ul className="approach-list">
                <li>
                  Built and tested full-stack web applications using React.js
                  (front-end) and Node.js with Express.js (back-end).
                </li>
                <li>
                  Designed and deployed RESTful APIs with JWT authentication,
                  strengthening security protocols.
                </li>
                <li>
                  Engaged in agile workflows, including sprint planning,
                  retrospectives, and team collaboration.
                </li>
              </ul>
            </div>
          </div>
          <div className="education-box">
            <div className="education-degree">Front-End Developer Intern</div>
            <div className="education-details">
              FPT Software • January 2024 − April 2024
            </div>
            <div className="education-concentration">
              <ul className="approach-list">
                <li>
                  Collaborated with a team to design and implement responsive
                  web interfaces using HTML5, CSS3, and React.js.
                </li>
                <li>
                  Enhanced UI components with Bootstrap and Tailwind CSS,
                  reducing page load times by <strong>15%</strong>.
                </li>
                <li>
                  Participated in daily agile stand-ups, sprint planning, and
                  code reviews to ensure timely delivery and maintain coding
                  standards.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

About.displayName = "About";

export default About;