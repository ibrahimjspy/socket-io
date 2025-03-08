import React, { useState, useEffect, useRef } from 'react';
import html2canvas from 'html2canvas';
import { CSKLOGO, GTLOGO, KKRLOGO, MI_ICON, RCBLOGO, TROPYICON } from './constants';

// Default data (won't matter on first load if you want to "start from zero")
const initialContestants = [
  { name: 'adeel', team: 'KKR', points: 0, sp: 0, championships: 2, color: 'rgba(255, 0, 0, 0.1)', logo: KKRLOGO },
  { name: 'hadi', team: 'GT', points: 0, sp: 0, championships: 2, color: 'rgba(169, 169, 169, 0.1)', logo: GTLOGO },
  { name: 'wahab', team: 'SRH', points: 0, sp: 0, championships: 1, color: 'rgba(255, 0, 0, 0.1)', logo: RCBLOGO },
  { name: 'ibi', team: 'CSK', points: 0, sp: 0, championships: 0, color: 'rgba(224, 223, 164, 0.1)', logo: CSKLOGO },
  { name: 'Mavia', team: 'MI', points: 0, sp: 0, championships: 0, color: 'rgba(144, 238, 144, 0.1)', logo: MI_ICON }
];

const Home = () => {
  const [mounted, setMounted] = useState(false);
  const [contestants, setContestants] = useState([]);
  const [prevStandings, setPrevStandings] = useState([]);
  const [activeView, setActiveView] = useState('standings');

  useEffect(() => {
    setMounted(true);
    // Load contestants and previous standings from localStorage if available.
    const savedContestants = localStorage.getItem('contestants');
    const savedPrevStandings = localStorage.getItem('prevStandings');
    if (savedContestants) {
      const parsedContestants = JSON.parse(savedContestants);
      setContestants(parsedContestants);
      setPrevStandings(savedPrevStandings ? JSON.parse(savedPrevStandings) : parsedContestants);
    } else {
      setContestants(initialContestants);
      setPrevStandings(initialContestants);
    }
  }, []);

  // Save contestants state to localStorage.
  useEffect(() => {
    if (mounted) {
      localStorage.setItem('contestants', JSON.stringify(contestants));
    }
  }, [contestants, mounted]);

  // Save previous standings state to localStorage.
  useEffect(() => {
    if (mounted) {
      localStorage.setItem('prevStandings', JSON.stringify(prevStandings));
    }
  }, [prevStandings, mounted]);

  if (!mounted) return null;

  return (
    <div className="container">
      <nav className="nav">
        <button onClick={() => setActiveView('standings')}>Standings</button>
        <button onClick={() => setActiveView('manage')}>Manage Scores</button>
      </nav>
      {activeView === 'standings' ? (
        <Standings contestants={contestants} prevStandings={prevStandings} />
      ) : (
        <ManageScores 
          contestants={contestants} 
          setContestants={setContestants} 
          setPrevStandings={setPrevStandings}
        />
      )}
      <footer className="footer">Managed by IBI</footer>
      <style jsx>{`
        .container {
          text-align: center;
          padding: 20px;
          background: linear-gradient(135deg, #0d1b2a, #1b263b);
          min-height: 100vh;
          color: #fff;
        }
        .nav {
          margin-bottom: 20px;
        }
        .nav button {
          margin: 0 10px;
          padding: 10px 20px;
          border: none;
          border-radius: 5px;
          background: #415a77;
          color: #fff;
          cursor: pointer;
          transition: background 0.3s;
        }
        .nav button:hover {
          background: #778da9;
        }
        .footer {
          margin-top: 20px;
          font-size: 0.9rem;
          opacity: 0.8;
        }
      `}</style>
    </div>
  );
};

const Standings = ({ contestants, prevStandings }) => {
  const standingsRef = useRef(null);

  const exportImage = () => {
    if (!standingsRef.current) return;
    html2canvas(standingsRef.current, { backgroundColor: '#0d1b2a' }).then(canvas => {
      const link = document.createElement('a');
      link.download = 'standings.png';
      link.href = canvas.toDataURL();
      link.click();
    });
  };

  return (
    <div>
      <h1>Standings</h1>
      {/* Export container with heading added */}
      <div ref={standingsRef} className="export-container">
        <h2 className="export-heading">IPL</h2>
        <table className="points-table">
          <thead>
            <tr>
              <th>Logo</th>
              <th>Name</th>
              <th>Team</th>
              <th>SP</th>
              <th>Points</th>
            </tr>
          </thead>
          <tbody>
            {contestants.map((cont, index) => {
              const prevIndex = prevStandings.findIndex(prev => prev.name === cont.name);
              const rankChange = prevIndex !== -1 ? prevIndex - index : 0;
              const prevContestant = prevStandings.find(prev => prev.name === cont.name);
              const pointsDiff = prevContestant ? cont.points - prevContestant.points : 0;
              return (
                <tr key={cont.name} style={{ backgroundColor: cont.color }}>
                  <td>
                    <img src={cont.logo} alt={`${cont.team} Logo`} className="team-logo" />
                  </td>
                  <td>
                    {cont.name} {cont.championships > 0 && '⭐'.repeat(cont.championships)}
                    {rankChange !== 0 && (
                      <sup style={{ 
                        marginLeft: '4px', 
                        fontSize: '0.8rem', 
                        color: rankChange > 0 ? 'limegreen' : 'tomato'
                      }}>
                        {rankChange > 0 ? `↑${rankChange}` : `↓${Math.abs(rankChange)}`}
                      </sup>
                    )}
                  </td>
                  <td>{cont.team}</td>
                  <td>{cont.sp}</td>
                  <td>
                    {cont.points}
                    {pointsDiff !== 0 && (
                      <sup style={{ 
                        marginLeft: '4px', 
                        fontSize: '0.8rem', 
                        color: pointsDiff > 0 ? 'limegreen' : 'tomato'
                      }}>
                        {pointsDiff > 0 ? `↑${pointsDiff.toFixed(1)}` : `↓${Math.abs(pointsDiff).toFixed(1)}`}
                      </sup>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {/* Credit text added inside the export container */}
        <div className="credit">Credit: IBI</div>
      </div>
      <button onClick={exportImage} className="export-button">
        Export as Image
      </button>
      <style jsx>{`
        h1 {
          margin-bottom: 20px;
        }
        .export-container {
          width: 560px;
          margin: auto;
          background: #0d1b2a;
          padding: 40px;
          border: 2px solid #fff;
        }
        .export-heading {
          color: #fff;
          font-size: 1.5rem;
          margin-bottom: 20px;
          text-align: center;
        }
        .points-table {
          margin: auto;
          border-collapse: collapse;
          width: 100%;
        }
        .points-table th,
        .points-table td {
          padding: 8px;
          border: 1px solid #fff;
          text-align: center;
          max-width: 100px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .points-table th {
          background: linear-gradient(45deg, #1e3d59, #2a5298);
        }
        .team-logo {
          width: 40px;
          height: 40px;
          border-radius: 50%;
        }
        .credit {
          margin-top: 10px;
          font-size: 0.8rem;
          text-align: right;
          color: #fff;
        }
        .export-button {
          margin-top: 20px;
          padding: 10px 20px;
          border: none;
          border-radius: 5px;
          background: #415a77;
          color: #fff;
          cursor: pointer;
          transition: background 0.3s;
        }
        .export-button:hover {
          background: #778da9;
        }
      `}</style>
    </div>
  );
};

const ManageScores = ({ contestants, setContestants, setPrevStandings }) => {
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
    const sortedEdited = [...editedContestants].sort((a, b) => b.points - a.points);
    // Save current standings as previous before updating.
    setPrevStandings(contestants);
    setContestants(sortedEdited);
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
        }
        .scores-list {
          margin: auto;
          text-align: left;
          width: 60%;
          padding: 10px;
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

export default Home;
