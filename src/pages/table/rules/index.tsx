import React from 'react';
import { TROPYICON } from '../constants';

const TournamentRules = () => {
  return (
    <>
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: scale(0.95); }
            to { opacity: 1; transform: scale(1); }
          }
          .ruleCard {
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }
          .ruleCard:hover {
            transform: scale(1.02);
            box-shadow: 0 0 30px rgba(255, 255, 255, 0.4);
          }
          /* Scrollbar styling */
          ::-webkit-scrollbar {
            width: 8px;
          }
          ::-webkit-scrollbar-thumb {
            background: rgba(255, 255, 255, 0.2);
            border-radius: 4px;
          }
        `}
      </style>
      <div
        style={{
          textAlign: 'center',
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: '#1a1a2e',
          color: 'white',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '20px'
        }}
      >
        <div
          style={{
            padding: '40px',
            borderRadius: '15px',
            boxShadow: '0px 0px 25px rgba(0, 0, 0, 0.6)',
            background: 'linear-gradient(45deg, #0f2027, #203a43, #2c5364)',
            maxWidth: '90vw',
            overflowY: 'auto',
            height: '90vh',
            animation: 'fadeIn 1s ease-out'
          }}
        >
          <h1
            style={{
              fontSize: '2.8rem',
              marginBottom: '25px',
              background: '-webkit-linear-gradient(#ff7e5f, #feb47b)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            Tournament Rules
            <img
              src={TROPYICON}
              alt="Trophy Icon"
              style={{ width: '45px', marginLeft: '15px' }}
            />
          </h1>

          <div style={{ textAlign: 'left', fontSize: '1.2rem', lineHeight: '1.6' }}>
            {/* Rule One */}
            <div
              className="ruleCard"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                padding: '20px',
                borderRadius: '10px',
                marginBottom: '20px'
              }}
            >
              <h2 style={{ marginBottom: '15px', color: '#ff7e5f' }}>
                1. Core Team Selection
              </h2>
              <p style={{ fontSize: '1.1rem' }}>
                Choose a core team. When playing a match featuring your core team,
                your prediction automatically counts as your core team's prediction.
              </p>
            </div>

            {/* Rule Two */}
            <div
              className="ruleCard"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                padding: '20px',
                borderRadius: '10px',
                marginBottom: '20px'
              }}
            >
              <h2 style={{ marginBottom: '15px', color: '#ff7e5f' }}>
                2. Points System
              </h2>
              <p style={{ fontSize: '1.1rem' }}>
                Earn 1 point for a correct prediction in regular matches. If your core team wins,
                you'll receive 1.5 points.
              </p>
            </div>

            {/* Rule Three */}
            <div
              className="ruleCard"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                padding: '20px',
                borderRadius: '10px',
                marginBottom: '20px'
              }}
            >
              <h2 style={{ marginBottom: '15px', color: '#ff7e5f' }}>
                3. Locking an Opponent
              </h2>
              <p style={{ fontSize: '1.1rem' }}>
                Lock one opponent to prevent them from selecting your core team. Use this tactic wisely!
              </p>
            </div>

            {/* Rule Four */}
            <div
              className="ruleCard"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                padding: '20px',
                borderRadius: '10px',
                marginBottom: '20px'
              }}
            >
              <h2 style={{ marginBottom: '15px', color: '#ff7e5f' }}>
                4. Streak Points (SP)
              </h2>
              <p style={{ fontSize: '1.1rem' }}>
                Earn SP by making multiple correct predictions consecutively:
              </p>
              <ul style={{ fontSize: '1.1rem', paddingLeft: '20px' }}>
                <li>2 correct in a row = 1 SP point</li>
                <li>3 correct in a row = an additional SP point, and so on</li>
                <li>A wrong prediction resets your streak</li>
              </ul>
            </div>

            {/* Rule Five */}
            <div
              className="ruleCard"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                padding: '20px',
                borderRadius: '10px',
                marginBottom: '20px'
              }}
            >
              <h2 style={{ marginBottom: '15px', color: '#ff7e5f' }}>
                5. Using Streak Points
              </h2>
              <p style={{ fontSize: '1.1rem' }}>
                Boost your score by staking SP on any match:
              </p>
              <ul style={{ fontSize: '1.1rem', paddingLeft: '20px' }}>
                <li>
                  Stake 1 SP on a regular match to earn 2 points if your prediction is correct.
                </li>
                <li>SP can be used for any match, not just core team games.</li>
                <li>You can use any number SP points in one game.</li>
              </ul>
            </div>

            {/* Rule Six */}
            <div
              className="ruleCard"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                padding: '20px',
                borderRadius: '10px',
                marginBottom: '20px'
              }}
            >
              <h2 style={{ marginBottom: '15px', color: '#ff7e5f' }}>
                6. Prediction Deadline
              </h2>
              <p style={{ fontSize: '1.1rem' }}>
                Submit your prediction before the toss. Late entries will not be counted.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TournamentRules;
