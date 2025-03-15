import React, { useState, useEffect, useRef } from 'react';
import html2canvas from 'html2canvas';
import { CSKLOGO, GTLOGO, KKRLOGO, MI_ICON, RCBLOGO, SRH_LOGO, matchSchedule } from './constants';
import { ManageScores } from 'src/components/ManageScores';

// Updated contestants with subtle hints of IPL team colors.
const initialContestants = [
  { name: 'Adeel', team: 'KKR', points: 0, sp: 0,  streak: 0,  championships: 2, color: 'rgba(220, 20, 60, 0.15)', logo: KKRLOGO },
  { name: 'Hadi', team: 'GT', points: 0, sp: 0,  streak: 0, championships: 2, color: 'rgba(30, 144, 255, 0.15)', logo: GTLOGO },
  { name: 'Wahab', team: 'SRH', points: 0, sp: 0,  streak: 0, championships: 1, color: 'rgba(255, 140, 0, 0.15)', logo: RCBLOGO },
  { name: 'Ibi', team: 'CSK', points: 0, sp: 0,  streak: 0, championships: 0, color: 'rgba(255, 215, 0, 0.15)', logo: CSKLOGO },
  { name: 'Mavia', team: 'LSG', points: 0, sp: 0, streak: 0,  championships: 0, color: 'rgba(60, 179, 113, 0.15)', logo: 'images/lsgf.png' }
];

const teamShortForms = {
  "Kolkata Knight Riders": "KKR",
  "Royal Challengers Bengaluru": "RCB",
  "Sunrisers Hyderabad": "SRH",
  "Rajasthan Royals": "RR",
  "Chennai Super Kings": "CSK",
  "Mumbai Indians": "MI",
  "Delhi Capitals": "DC",
  "Lucknow Super Giants": "LSG",
  "Gujarat Titans": "GT",
  "Punjab Kings": "PK",
  "To be announced": "TBA"
};

// Helper function to parse date strings in dd/MM/yyyy HH:mm format.
const parseDate = (dateStr) => {
  const [datePart, timePart] = dateStr.split(' ');
  const [day, month, year] = datePart.split('/');
  const [hours, minutes] = timePart.split(':');
  return new Date(year, month - 1, day, hours, minutes);
};

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
            prevStandings={prevStandings}
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

  // Compute next two fixtures for export (based on current time)
  const now = new Date();
  const upcomingMatches = matchSchedule
    .filter(match => parseDate(match.date) > now)
    .sort((a, b) => parseDate(a.date) - parseDate(b.date));
  const nextFixtures = upcomingMatches.slice(0, 2);

  const exportImage = () => {
    if (!standingsRef.current) return;
    html2canvas(standingsRef.current, { backgroundColor: '#0d1b2a', scale: 5 }).then(canvas => {
      const link = document.createElement('a');
      link.download = 'standings.png';
      link.href = canvas.toDataURL();
      link.click();
    });
  };

  return (
    <div>
      <h1>Standings</h1>
      <div ref={standingsRef} className="export-container">
        <h2 className="export-heading">Points table</h2>

        <div className="table-wrap">
          <table className="points-table">
            <thead>
              <tr>
                <th>Team</th>
                <th>Name</th>
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
                    <td className="left-align">
                      <span style={{ position: 'relative', display: 'inline-block' }}>
                        {cont.name} {cont.championships > 0 && '⭐'.repeat(cont.championships)}
                        {rankChange !== 0 && (
                          <sup
                            style={{
                              position: 'absolute',
                              top: '-0.6em',
                              right: '-1.5em',
                              fontSize: '0.65em',
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
                    <td>{cont.sp}</td>
                    <td className="centered">
                      <span style={{ position: 'relative', display: 'inline-block' }}>
                        {cont.points}
                        {pointsDiff !== 0 && (
                          <sup
                            style={{
                              position: 'absolute',
                              top: '-0.9em',
                              left: cont.points > 20 ? '2em' : '1em',
                              fontSize: '0.65em',
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
        {/* Next Fixtures small element for export */}
        {nextFixtures.length > 0 && (
          <div className="next-fixtures">
            <h3>Next Fixtures</h3>
            {nextFixtures.map(match => {
              const matchDate = parseDate(match.date);
              const dayOfWeek = matchDate.toLocaleString('en-US', { weekday: 'long' });
              return (
                <div key={match.matchNumber} className="fixture-item">
                  <span className="fixture-info">
                    <span style={{ color: '#91caed' }}>
                      {teamShortForms[match.homeTeam]}
                    </span> vs {teamShortForms[match.awayTeam]}
                  </span>
                  <span className="fixture-date">
                    {dayOfWeek}
                  </span>
                </div>
              );
            })}
          </div>
        )}
        <div className="credit">Credit: IBI</div>
      </div>
      <button onClick={exportImage} className="export-button">
        Export as Image
      </button>
      <style jsx>{`
        h1 {
          margin-bottom: 20px;
          font-family: 'Arial', sans-serif;
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
        .next-fixtures {
          background: rgba(255, 255, 255, 0.1);
          padding: 10px;
          border-radius: 8px;
          margin: 20px 0;
          font-size: 0.85rem;
          text-align: left;
        }
        .next-fixtures h3 {
          margin: 0 0 5px;
          font-size: 1rem;
          color: #fff;
        }
        .fixture-item {
          display: flex;
          justify-content: space-between;
          border-bottom: 1px solid rgba(255,255,255,0.1);
          padding: 3px 0;
        }
        .fixture-item:last-child {
          border-bottom: none;
        }
        .fixture-info {
          font-weight: bold;
        }
        .fixture-date {
          font-style: italic;
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

export default Home;
