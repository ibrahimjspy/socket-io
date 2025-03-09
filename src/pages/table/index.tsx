import React, { useState, useEffect, useRef } from 'react';
import html2canvas from 'html2canvas';
import { CSKLOGO, GTLOGO, KKRLOGO, MI_ICON, RCBLOGO, TROPYICON } from './constants';

// Updated player colors for a modern look
const initialContestants = [
  { name: 'Adeel', team: 'KKR', points: 0, sp: 0, championships: 2, color: 'rgba(220, 20, 60, 0.15)', logo: KKRLOGO },
  { name: 'Hadi', team: 'GT', points: 0, sp: 0, championships: 2, color: 'rgba(30, 144, 255, 0.15)', logo: GTLOGO },
  { name: 'Wahab', team: 'SRH', points: 0, sp: 0, championships: 1, color: 'rgba(255, 140, 0, 0.15)', logo: RCBLOGO },
  { name: 'Ibi', team: 'CSK', points: 0, sp: 0, championships: 0, color: 'rgba(255, 215, 0, 0.15)', logo: CSKLOGO },
  { name: 'Mavia', team: 'MI', points: 0, sp: 0, championships: 0, color: 'rgba(60, 179, 113, 0.15)', logo: MI_ICON }
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
          font-family: 'Arial', sans-serif;
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
        <div className="table-wrap">
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
                    {/* Logo */}
                    <td>
                      <img src={cont.logo} alt={`${cont.team} Logo`} className="team-logo" />
                    </td>

                    {/* Name + Rank Change */}
                   <td className="left-align">
  <span style={{ position: 'relative', display: 'inline-block' }}>
    {/* Base Name + Championship Stars */}
    {cont.name} {cont.championships > 0 && '⭐'.repeat(cont.championships)}

    {/* Rank Change as Superscript */}
    {rankChange !== 0 && (
      <sup
        style={{
          position: 'absolute',
          top: '-0.6em',       // Adjust vertically
          right: '-1.5em',     // Adjust horizontally
          fontSize: '0.65em',  // Makes it smaller
          lineHeight: 1,
          fontWeight: 'bold',
          color: rankChange > 0 ? 'limegreen' : 'tomato'
        }}
      >
        {rankChange > 0 ? '↑' : '↓'}
        {Math.abs(rankChange)}
      </sup>
    )}
  </span>
</td>


                    {/* Team */}
                    <td>{cont.team}</td>

                    {/* SP */}
                    <td>{cont.sp}</td>

                    {/* Points + Points Difference */}
<td className="centered">
  <span style={{ position: 'relative', display: 'inline-block' }}>
    {/* Base Points */}
    {cont.points}

    {/* Exponent for Points Difference */}
    {pointsDiff !== 0 && (
      <sup
        style={{
          position: 'absolute',
          top: '-0.9em',        // Adjust to move up/down
          left: cont.points > 20 ? '2em' : '1em',      // Adjust to move left/right
          fontSize: '0.65em',   // Makes it smaller than the base text
          lineHeight: 1,
          color: pointsDiff > 0 ? 'limegreen' : 'tomato',
          fontWeight: 'bold'
        }}
      >
        {pointsDiff > 0 ? '↑' : '↓'}
        {Math.abs(pointsDiff).toFixed(1)}
      </sup>
    )}
  </span>
</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
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
          width: 90%;
          max-width: 560px;
          margin: auto;
          background: rgba(255, 255, 255, 0.05);
          padding: 40px;
          border: 2px solid rgba(255, 255, 255, 0.2);
          border-radius: 12px;
          backdrop-filter: blur(8px);
          font-family: 'Arial', sans-serif;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.4);
        }
        .export-heading {
          color: #fff;
          font-size: 1.8rem;
          margin-bottom: 20px;
          text-align: center;
          text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
        }
        .table-wrap {
          overflow-x: auto;
        }
        .points-table {
          margin: auto;
          width: 100%;
          border-collapse: collapse;
          border-radius: 12px;
          overflow: hidden;
          font-family: 'Arial', sans-serif;
          background: linear-gradient(145deg, #184273, #1c3b6a);
        }
        .points-table thead {
          background: linear-gradient(145deg, #233a6b, #2a4a8a);
        }
        .points-table th,
        .points-table td {
          padding: 14px 20px;
          text-align: center;
          white-space: nowrap;
          font-variant-numeric: tabular-nums;
          border: none;
          color: #fff;
        }
        .points-table th {
          font-weight: 600;
          border-bottom: 2px solid rgba(255, 255, 255, 0.2);
        }
        .points-table td {
          background: transparent;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }
        .points-table tr:nth-child(even) td {
          background: rgba(26, 54, 90, 0.25);
        }
        .points-table tr:hover td {
          background: rgba(26, 54, 90, 0.45);
          transition: background 0.3s ease;
        }
        .team-logo {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          box-shadow: 0 2px 4px rgba(0,0,0,0.4);
        }
        .base-text {
          vertical-align: middle;
          font-size: 1rem;
        }
        .exponent {
          display: inline-flex;
          align-items: center;
          margin-left: 6px;
          font-size: 0.85rem;
          line-height: 1;
        }
        .arrow {
          margin-right: 2px;
          font-size: 1rem;
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
          border-radius: 8px;
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
    // Sort the updated array by points (descending)
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

export default Home;
