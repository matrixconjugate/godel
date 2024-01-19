import { useState, useEffect } from 'react';
import styles from '@/styles/Home.module.css';

export default function Home() {
  const [courses, setCourses] = useState([]);
   
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch('/api/course');
        const newCourses = await response.json();
        console.log(newCourses);
        setCourses(newCourses);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, []); 
return (
  <div className={styles.container}>
    <button className={styles.addButton} onClick={() => console.log('Button clicked')}>
      Add Course
    </button>
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
              <button
                type="button"
                className={styles.courseButton}
                onClick={() => fetchModulesForCourse(course._id)}
              >
                {course.name}
              </button>
            </td>
            <td>
              <button type="button" className={styles.actionbutton}>
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
