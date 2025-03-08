import { useState } from 'react';
import { CSKLOGO, GTLOGO, KKRLOGO, MI_ICON, RCBLOGO, TROPYICON } from './constants';

const Home = () => {
  const [contestants] = useState([
    { name: 'hadi', team: 'GT', points: 42.5, championships: 2, color: 'rgba(169, 169, 169, 0.1)', logo: GTLOGO },
    { name: 'wahab', team: 'SRH', points: 38.5, championships: 1, color: 'rgba(255, 0, 0, 0.1)', logo: RCBLOGO },
    { name: 'adeel', team: 'KKR', points: 54.5, championships: 2, color: '#FFD700', logo: KKRLOGO },
    { name: 'ibrahim', team: 'CSK', points: 37.5, championships: 0, color: 'rgba(224, 223, 164, 0.1)', logo: CSKLOGO },
    { name: 'Barik', team: 'MI', points:14.0, championships: 0, color: 'rgba(144, 238, 144, 0.1)', logo: MI_ICON }
  ].sort((a, b) => b.points - a.points));

  return (
    <div style={{ textAlign: 'center', position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'darkblue', color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ padding: '20px', borderRadius: '10px', boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.3)', background: 'linear-gradient(45deg, #020024, #090979)', maxWidth: '80vw' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '20px', background: '-webkit-linear-gradient(#ff7e5f, #feb47b)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          Points Table IPL 2024 <img src={TROPYICON} alt="Trophy Icon" style={{ width: '40px', marginLeft: '10px' }} />
        </h1>
        <table style={{ margin: 'auto', borderCollapse: 'collapse', width: '100%' }}>
          <thead>
            <tr>
              <th style={{ padding: '15px', border: '1px solid white' }}>Logo</th>
              <th style={{ padding: '15px', border: '1px solid white' }}>Name</th>
              <th style={{ padding: '15px', border: '1px solid white' }}>Team Name</th>
              <th style={{ padding: '15px', border: '1px solid white' }}>Points</th>
            </tr>
          </thead>
          <tbody>
            {contestants.map(({ name, team, points, championships, color, logo }) => (
              <tr key={name} style={{ backgroundColor: color }}>
                <td style={{ padding: '15px', border: '1px solid white' }}>
                  <img src={logo} alt={`${team} Logo`} style={{ width: '50px', height: '50px', borderRadius: '50%' }} />
                </td>
                <td style={{ padding: '15px', border: '1px solid white', fontWeight: 'bold', textTransform: 'capitalize', background: '-webkit-linear-gradient(#ff7e5f, #feb47b)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{name}{championships > 0 && ' ⭐'.repeat(championships)}</td>
                <td style={{ padding: '15px', border: '1px solid white', textTransform: 'uppercase', background: '-webkit-linear-gradient(#ff7e5f, #feb47b)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{team}</td>
                <td style={{ padding: '15px', border: '1px solid white' }}>{points}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ marginTop: '20px', fontStyle: 'italic', fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.7)' }}>
          cc: ibi 
        </div>
      </div>
    </div>
  );
};

export default Home;
