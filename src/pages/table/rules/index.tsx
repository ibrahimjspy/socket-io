import React from 'react';
import { TROPYICON } from '../constants';

const Rules = () => {
  return (
    <div style={{ textAlign: 'center', position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'darkblue', color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ padding: '20px', borderRadius: '10px', boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.3)', background: 'linear-gradient(45deg, #020024, #090979)', maxWidth: '80vw' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '20px', background: '-webkit-linear-gradient(#ff7e5f, #feb47b)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          Rules <img src={TROPYICON} alt="Trophy Icon" style={{ width: '40px', marginLeft: '10px' }} />
        </h1>
        <div style={{ textAlign: 'left', fontSize: '1.2rem' }}>
          <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', padding: '15px', borderRadius: '10px', marginBottom: '15px' }}>
            <h2 style={{ marginBottom: '10px' }}>Rule One:</h2>
            <p>Every game without a core team, you will get 1 point for a correct prediction and 0.5 points for the right man of the match prediction.</p>
          </div>
          <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', padding: '15px', borderRadius: '10px', marginBottom: '15px' }}>
            <h2 style={{ marginBottom: '10px' }}>Rule Two:</h2>
            <p>Every game with a core team, you will get 1.5 points for core team success and 0.5 points for the right man of the match prediction.</p>
          </div>
          <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', padding: '15px', borderRadius: '10px', marginBottom: '15px' }}>
            <h2 style={{ marginBottom: '10px' }}>Rule Three:</h2>
            <p>Core team owner has the ability to stop one person from selecting his team. For example, Wahab can stop Hadi from picking RCB, but he can only use it on one person.</p>
          </div>
          <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', padding: '15px', borderRadius: '10px', marginBottom: '15px' }}>
            <h2 style={{ marginBottom: '10px' }}>Rule Four:</h2>
            <p>No predictions after the toss will be accepted.</p>
          </div>
          <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', padding: '15px', borderRadius: '10px', marginBottom: '15px' }}>
            <h2 style={{ marginBottom: '10px' }}>Rule Five:</h2>
            <p>Rules for playoffs will be the same as last season with one point for the man of the match prediction added.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rules;
