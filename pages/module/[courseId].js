import { useRouter } from 'next/router';
import { useState } from 'react';
import styles from '@/styles/Home.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const Module = () => {
  const [showAddModulePopup, setShowAddModulePopup] = useState(false);
  const [newModuleName, setNewModuleName] = useState('');
  const [Moduledesc, setModuledesc] = useState('');
  const [modules, setModules] = useState([]);
  const [showAddSlideInput, setShowAddSlideInput] = useState(false);
  const [newSlideName, setNewSlideName] = useState('');
  const router = useRouter();
  const { courseId } = router.query;

  const handleAddModule = () => {
    setShowAddModulePopup(true);
  };

  const handleClosePopup = () => {
    setShowAddModulePopup(false);
  };

  const handleSaveModule = () => {
    const newModule = {
      name: newModuleName,
      desc: Moduledesc,
      slides: [],
    };

    setModules([...modules, newModule]);
    console.log('Saving Module:', newModuleName);
    console.log('Module desc:', Moduledesc);
    handleClosePopup();
  };

  const handleDelete = (index) => {
    const updatedModules = [...modules];
    updatedModules.splice(index, 1);
    setModules(updatedModules);
  };

  const handleAddSlide = (index) => {
    setShowAddSlideInput(true);
  };

  const handleSaveSlide = (moduleIndex) => {
    const updatedModules = [...modules];
    const newSlide = {
      name: newSlideName,
    };

    updatedModules[moduleIndex].slides.push(newSlide);
    setModules(updatedModules);
    setShowAddSlideInput(false);
    setNewSlideName('');
  };

  return (
    <div className={styles.modulecontainer}>
      <div className={styles.moduleheader}>
        <h1>Module Page for Course: {courseId}</h1>
        <button className={styles.addModuleButton} onClick={handleAddModule}>
          Add Module
        </button>

        {showAddModulePopup && (
          <div className={styles.popup}>
            <div className={styles.popupContent}>
              <label htmlFor="newModuleName">
                <h3>Module Name:</h3>
              </label>
              <input
                type="text"
                id="newCourseName"
                value={newModuleName}
                onChange={(e) => setNewModuleName(e.target.value)}
              />
              <label htmlFor="newModuleDesc">
                <h3>Description:</h3>
              </label>
              <input
                type="text"
                id="newCoursedesc"
                value={Moduledesc}
                onChange={(e) => setModuledesc(e.target.value)}
                rows={4}
              />

              <div className={styles.popupButtons}>
                <button onClick={handleSaveModule}>Save</button>
                <button onClick={handleClosePopup}>Close</button>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className={styles.modulebody}>
        {modules.map((module, moduleIndex) => (
          <div key={moduleIndex} className={styles.moduledetails}>
            <div>
              <h3>Module Name</h3>
              <p>{module.name}</p>
              <h3>Description</h3>
              <p>{module.desc}</p>
              <button className={styles.slidebutton} onClick={() => handleAddSlide(moduleIndex)}>
                Add Slides
              </button>

              {showAddSlideInput && (
                <div className={styles.slideInputContainer}>
                  <input
                    type="text"
                    value={newSlideName}
                    onChange={(e) => setNewSlideName(e.target.value)}
                    placeholder="Enter slide name"
                  />
                  <button onClick={() => handleSaveSlide(moduleIndex)}>Save Slide</button>
                </div>
              )}
              <div className={styles.mappedSlides}>
                {module.slides.map((slide, slideIndex) => (
                  <div key={slideIndex} className={styles.mappedSlide}>
                    <p>{slide.name}</p>
                    
                  </div>
                  
                ))}
              </div>
            </div>
            <div>
              <button onClick={() => handleDelete(moduleIndex)} className={styles.moduledelete}>
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Module;
