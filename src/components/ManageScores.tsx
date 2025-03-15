import { useState, useEffect } from "react";

export const ManageScores = ({ contestants, setContestants, setPrevStandings, prevStandings }) => {
  const [editedContestants, setEditedContestants] = useState(contestants);

  useEffect(() => {
    setEditedContestants(contestants);
  }, [contestants]);

  const handleInputChange = (index, field, value) => {
    const updated = [...editedContestants];
    updated[index] = {
      ...updated[index],
      [field]: value === '' ? '' : parseFloat(value)
    };
    setEditedContestants(updated);
  };

const handleSave = () => {
  const updatedContestants = editedContestants.map((cont) => {
    // Find the contestant's last saved state (current contestants)
    const lastSaved = contestants.find(prev => prev.name === cont.name);
    // Find the state before last (prevStandings)
    const prevPrev = prevStandings.find(prev => prev.name === cont.name);

    // Only if we have a previous previous state, do we consider awarding SP points.
    if (lastSaved && prevPrev) {
      // Check if last saved points increased compared to the previous previous standing
      // and if the new edited points increased compared to the last saved points.
      if (lastSaved.points > prevPrev.points && cont.points > lastSaved.points) {
        return { 
          ...cont, 
          sp: cont.sp + 1  // increment SP by 1
        };
      }
    }
    // Otherwise, return the contestant without modifying SP.
    return cont;
  });

  // Sort the updated contestants by points in descending order.
  const sortedContestants = updatedContestants.sort((a, b) => b.points - a.points);

  // Update state: move current contestants to prevStandings and update contestants.
  setPrevStandings(contestants);
  setContestants(sortedContestants);
};



  return (
    <div>
      <h1>Manage Scores</h1>
      <div className="scores-list">
        {editedContestants.map((cont, index) => (
          <div key={cont.name} className="score-item">
            <span className="name"><strong>{cont.name}</strong></span>
            <span>
              Points:{' '}
              <input
                type="number"
                value={cont.points}
                onChange={(e) => handleInputChange(index, 'points', e.target.value)}
              />
            </span>
            <span>
              SP:{' '}
              <input
                type="number"
                value={cont.sp}
                onChange={(e) => handleInputChange(index, 'sp', e.target.value)}
              />
            </span>
          </div>
        ))}
      </div>
      <button onClick={handleSave} className="save-button">
        Save Changes
      </button>
      <style jsx>{`
        h1 {
          margin-bottom: 20px;
          font-family: 'Arial', sans-serif;
        }
        .scores-list {
          margin: auto;
          text-align: left;
          width: 60%;
          padding: 10px;
          font-family: 'Arial', sans-serif;
        }
        .score-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px;
          border-bottom: 1px solid #444;
        }
        .score-item span {
          margin: 0 10px;
          color: #fff;
        }
        input {
          margin-left: 5px;
          padding: 5px;
          width: 80px;
          border: 1px solid #ccc;
          border-radius: 3px;
        }
        .save-button {
          margin-top: 20px;
          padding: 10px 20px;
          border: none;
          border-radius: 5px;
          background: #415a77;
          color: #fff;
          cursor: pointer;
          transition: background 0.3s;
        }
        .save-button:hover {
          background: #778da9;
        }
      `}</style>
    </div>
  );
};