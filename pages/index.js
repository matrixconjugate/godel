import { useState, useEffect } from 'react';
import styles from '@/styles/Home.module.css';
import Link from 'next/link';

export default function Home() {
  const [courses, setCourses] = useState([]);
  const [showAddCoursePopup, setShowAddCoursePopup] = useState(false);
  const [newCourseName, setNewCourseName] = useState('');

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch('/api/course');
        const newCourses = await response.json();
        setCourses(newCourses);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, []);

  const handleAddCourse = () => {
    setShowAddCoursePopup(true);
  };

  const handleClosePopup = () => {
    setShowAddCoursePopup(false);
  };

  const handleSaveCourse = () => {
    // Perform save course logic here
    console.log('Saving course:', newCourseName);
    handleClosePopup();
  };

  return (
    <div className={styles.container}>
      <button className={styles.addButton} onClick={handleAddCourse}>
        Add Course
      </button>
      {showAddCoursePopup && (
        <div className={styles.popup}>
          <div className={styles.popupContent}>
            <label htmlFor="newCourseName"><h3>Course Name:</h3></label>
            <input
              type="text"
              id="newCourseName"
              value={newCourseName}
              onChange={(e) => setNewCourseName(e.target.value)}
            />

            <div className={styles.popupButtons}>
              <button onClick={handleSaveCourse}>Save</button>
              <button onClick={handleClosePopup}>Close</button>
            </div>
          </div>
        </div>
      )}

    <table className={styles.table}>
      <thead>
        <tr>
          <th className={styles.sno}>Serial no</th>
          <th>Name</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {courses.map((course, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>
            <Link href={`/module/${course._id}`}>
              <button
                type="button"
                style={{zIndex:showAddCoursePopup?'-1':''}}
                className={styles.courseButton}
                onClick={() => fetchModulesForCourse(course._id)}
              >
                {course.name}
              </button>
              </Link>
            </td>
            <td>
              <button type="button" style={{zIndex:showAddCoursePopup?'-1':''}} className={styles.actionbutton} >
                Edit
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

async function fetchModulesForCourse(courseId) {
  console.log(courseId);
  try {
    const response = await fetch(`/api/course?courseId=${courseId}&action=modules`);
    const modules = await response.json();
    console.log('Modules for course:', modules);
    // Handle the modules data as needed
  } catch (error) {
    console.error('Error fetching modules:', error);
  }
}
}
