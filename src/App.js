import React, { useState } from 'react';
import './FitnessTracker.css';
import backgroundImage from './background.jpg'; // Import the background image file

function FitnessTracker() {
  const [workouts, setWorkouts] = useState([]);
  const [newWorkout, setNewWorkout] = useState('');
  const [editWorkoutId, setEditWorkoutId] = useState(null); // State to store the ID of the workout being edited
  const [editedWorkout, setEditedWorkout] = useState('');

  const handleInputChange = (event) => {
    setNewWorkout(event.target.value);
  };

  const handleAddWorkout = () => {
    if (newWorkout.trim() !== '') {
      setWorkouts([...workouts, { id: Date.now(), name: newWorkout }]);
      setNewWorkout('');
    }
  };

  const handleDeleteWorkout = (workoutId) => {
    setWorkouts(workouts.filter(workout => workout.id !== workoutId));
    if (editWorkoutId === workoutId) {
      // Reset edit mode if the deleted workout was being edited
      setEditWorkoutId(null);
      setEditedWorkout('');
    }
  };

  const handleEditWorkout = (workoutId, workoutName) => {
    setEditWorkoutId(workoutId);
    setEditedWorkout(workoutName);
  };

  const handleSaveEdit = () => {
    // Update the workout name with the edited value
    setWorkouts(workouts.map(workout =>
      workout.id === editWorkoutId ? { ...workout, name: editedWorkout } : workout
    ));
    // Reset edit mode
    setEditWorkoutId(null);
    setEditedWorkout('');
  };

  return (
    <div>
      <div className="fitness-tracker" style={{ backgroundImage: `url(${backgroundImage})` }}></div>
      <h1>Fitness Tracker</h1>
      <div className="centered-input">
        <input type="text" value={newWorkout} onChange={handleInputChange} placeholder="Enter a new workout" />
        <button onClick={handleAddWorkout}>Add Workout</button>
      </div>
      <ul>
        {workouts.map(workout => (
          <li key={workout.id}>
            {editWorkoutId === workout.id ? (
              <input type="text" value={editedWorkout} onChange={(e) => setEditedWorkout(e.target.value)} />
            ) : (
              <span>{workout.name}</span>
            )}
            <button onClick={() => handleDeleteWorkout(workout.id)}>Delete</button>
            {editWorkoutId === workout.id ? (
              <button onClick={handleSaveEdit}>Save</button>
            ) : (
              <button onClick={() => handleEditWorkout(workout.id, workout.name)}>Edit</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FitnessTracker;
