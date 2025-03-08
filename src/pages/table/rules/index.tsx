import React from 'react';
import { TROPYICON } from '../constants';

const Rules = () => {
  return (
    <div style={{ textAlign: 'center', position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'darkblue', color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ padding: '20px', borderRadius: '10px', boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.3)', background: 'linear-gradient(45deg, #020024, #090979)', maxWidth: '80vw' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '20px', background: '-webkit-linear-gradient(#ff7e5f, #feb47b)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          Playoff Rules <img src={TROPYICON} alt="Trophy Icon" style={{ width: '40px', marginLeft: '10px' }} />
        </h1>
        <div style={{ textAlign: 'left', fontSize: '1.2rem' }}>
          <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', padding: '15px', borderRadius: '10px', marginBottom: '15px' }}>
            <h2 style={{ marginBottom: '10px' }}>Rule One:</h2>
            <p>In the playoffs,three games (Playoff 1, Eliminator, and Playoff 2), each awarding 3 points per game. The final game awards 4 points, bringing the total to 13 points.</p>
          </div>
          {/* <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', padding: '15px', borderRadius: '10px', marginBottom: '15px' }}>
            <h2 style={{ marginBottom: '10px' }}>Rule Two:</h2>
            <p></p>
          </div> */}
          <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', padding: '15px', borderRadius: '10px', marginBottom: '15px' }}>
            <h2 style={{ marginBottom: '10px' }}>Rule Two:</h2>
            <p>Each player has 13 points to distribute across 4 games. For instance, a player might allocate 2 points to Playoff 1 and use the remaining points in the Eliminator or Final. However, every game must have at least one point at stake for each player.</p>
          </div>
          <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', padding: '15px', borderRadius: '10px', marginBottom: '15px' }}>
            <h2 style={{ marginBottom: '10px' }}>Rule Three:</h2>
            <p>A player can change their prediction, but they cannot switch back to the same team afterwards. Therefore, a player can only change their prediction once.</p>
          </div>
          {/* <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', padding: '15px', borderRadius: '10px', marginBottom: '15px' }}>
            <h2 style={{ marginBottom: '10px' }}>Rule Five:</h2>
            <p>Rules for playoffs will be the same as last season with one point for the man of the match prediction added.</p>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Rules;
