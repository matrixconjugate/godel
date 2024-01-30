import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import styles from '@/styles/Home.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import PrivateRoute from '@/components/PrivateRoute';
const Module = () => {
  const [showAddModulePopup, setShowAddModulePopup] = useState(false);
  const [newModuleName, setNewModuleName] = useState('');
  const [Moduledesc, setModuledesc] = useState('');
  const [modules, setModules] = useState([]);
  const [showAddSlideInput, setShowAddSlideInput] = useState(false);
  const [selectedModuleIndex, setSelectedModuleIndex] = useState(null);
  const [newSlideName, setNewSlideName] = useState('');
  const [selectedSlideType, setSelectedSlideType] = useState('text');
  const [mappedSlides, setMappedSlides] = useState([]);
  const [loading, setLoading] = useState(true); 
  const router = useRouter();
  const { courseId } = router.query;
  useEffect(() => {
    const fetchModules = async () => {
      try {
        if (courseId) {
          const moduleResponse = await fetch(`/api/module?courseId=${courseId}`);
          const slideResponse = await fetch(`/api/slide?courseId=${courseId}`);
  
          const courseModules = await moduleResponse.json();
          const courseSlides = await slideResponse.json();
  
          if (Array.isArray(courseModules)) {
            setModules(courseModules);
  
            const allSlides = courseSlides.flatMap((slide) => ({
              ...slide,
              moduleIndex: courseModules.findIndex(module => module._id === slide.moduleId)
            }));
            setMappedSlides(allSlides);
          } else {
            console.error('Invalid data format for modules:', courseModules);
          }
        }
      } catch (error) {
        console.error('Error fetching modules:', error);
      } finally {
        setLoading(false); 
      }
    };

    fetchModules();
  });

  const handleAddModule = () => {
    setShowAddModulePopup(true);
  };

  const handleClosePopup = () => {
    setShowAddModulePopup(false);
  };

  const handleSaveModule = async () => {
    try {
      const response = await fetch(`/api/module?courseId=${courseId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          module_name: newModuleName,
          module_description: Moduledesc,
          slides: [], // Initialize slides as an empty array
        }),
      });
       console.log(newModuleName);
       console.log(Moduledesc);
      if (response.ok) {
        const newModule = await response.json();
        setModules([...modules, newModule]);
        console.log('Saving Module:', newModuleName);
        console.log('Module desc:', Moduledesc);
        handleClosePopup();
      } else {
        console.error('Error adding module:', response.statusText);
      }
    } catch (error) {
      console.error('Error adding module:', error);
    }
  };
  
  const handleAddSlide = (moduleIndex) => {
    setShowAddSlideInput(true);
    setSelectedModuleIndex(moduleIndex);
    console.log(moduleIndex);
  };

  const handleSaveSlide = async (moduleIndex) => {
    try {
      const module = modules[moduleIndex];
      console.log(module);
      console.log(module._id);
      if (!module) {
        console.error('Invalid module');
        return;
      }
      if(!module._id){
        console.error('Invalid module._id')
      }
      const moduleId = module._id;
      const response = await fetch(`/api/slide?courseId=${courseId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          moduleId: moduleId, // Ensure moduleId is included and converted to string
          slide_name: newSlideName,
          slide_type: selectedSlideType,
        }),
      });
  
      if (response.ok) {
        const newSlide = await response.json();
        const updatedModules = [...modules];
        const updatedModule = { ...module }; // Create a copy of the module to avoid modifying the state directly
  
        updatedModule.slides.push({
          moduleId: newSlide.moduleId, // Use the moduleId from the response
          slide_name: newSlideName,
          slide_type: selectedSlideType,
          slug: newSlide.slug,
        });
  
        updatedModules[moduleIndex] = updatedModule;
        setModules(updatedModules);
  
        setMappedSlides([...mappedSlides, { ...newSlide, moduleIndex }]);
        console.log("Slide saved")
        setShowAddSlideInput(false);
        setNewSlideName('');
        setSelectedModuleIndex(null);
        setSelectedSlideType('text');
      } else {
        console.error('Error adding slide:', response.statusText);
      }
    } catch (error) {
      console.error('Error adding slide:', error);
    }
  };  
  
  
  return (
    <PrivateRoute>
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
      {modules && modules.map((module, moduleIndex) => (
  <div key={moduleIndex} className={styles.moduledetails}>
    <div>
      <h3>Module Name</h3>
      <p>{module.module_name}</p>
      <h3>Description</h3>
      <p>{module.module_description}</p>
      <button className={styles.slidebutton} onClick={() => handleAddSlide(moduleIndex)}>
        Add Slides
      </button>

      {showAddSlideInput && selectedModuleIndex === moduleIndex && (
        <div className={styles.slideInputContainer}>
          <input
            type="text"
            value={newSlideName}
            onChange={(e) => setNewSlideName(e.target.value)}
            placeholder="Enter slide name"
          />

                    <select
                      id="slideType"
                      value={selectedSlideType}
                      onChange={(e) => setSelectedSlideType(e.target.value)}
                    >
                      <option value="text">Text</option>
                      <option value="quiz">Quiz</option>
                      <option value="progress">Progress</option>
                      <option value="media">Media</option>
                    </select>
          <button onClick={() => handleSaveSlide(moduleIndex)}>Save Slide</button>
        </div>
      )}

<div className={styles.mappedSlides}>
           {mappedSlides && mappedSlides.filter((slide) => slide.moduleIndex === moduleIndex)
                    .map((slide, index) => (
                      <div key={index}>
                        <p>Name: {slide.slide_name}</p>
                        <p>Type: {slide.slide_type}</p>
                      </div>
                    ))}
      </div>
    </div>
  </div>
))}
      </div>
    </div>
    </PrivateRoute>
  );
};

export default Module;
