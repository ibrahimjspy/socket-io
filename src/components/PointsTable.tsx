import { useState } from 'react';

const AddPointsForm = ({ contestants, setContestants }) => {
  const [formData, setFormData] = useState({ name: '', points: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, points } = formData;
    const updatedContestants = contestants.map((contestant) =>
      contestant.name === name
        ? { ...contestant, points: contestant.points + parseInt(points) }
        : contestant
    );
    setContestants(updatedContestants);
    setFormData({ name: '', points: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Points</h2>
      <label>
        Name:
        <input type="text" name="name" value={formData.name} onChange={handleChange} />
      </label>
      <label>
        Points:
        <input type="number" name="points" value={formData.points} onChange={handleChange} />
      </label>
      <button type="submit">Add Points</button>
    </form>
  );
};

export default AddPointsForm;
