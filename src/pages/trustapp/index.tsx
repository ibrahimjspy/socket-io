// pages/auth/trustap.js (or any page where you want the user to trigger login)

import React from 'react';

const TrustapAuth = () => {
  const realm = 'trustap-stage';  // Your Trustap realm
  const clientId = '7c5f0ce5-132e-489e-9b82-7586478e683b';  // Your Trustap client ID
  const redirectUri = 'https://api-dev.kosmic.ai/api/v1/webhook/trustapp';  // Your callback URL
    const state = '12';  // Random state for security (you can store this in localStorage)

  const authUrl = `https://sso.trustap.com/auth/realms/${realm}/protocol/openid-connect/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=openid p2p_tx:offline_create_join p2p_tx:offline_accept_deposit p2p_tx:offline_cancel p2p_tx:offline_confirm_handover&state=${state}`;

  const getUrl = () => {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImlicmFoaW1Aa29zbWljLmFpIiwic3ViIjoxLCJkZXZpY2VUb2tlbklkIjpudWxsLCJpYXQiOjE3MzI2NDI2MzMsImV4cCI6MTc0MTI4MjYzM30.B94C7FLVBZiHYNQii1Yoi_G_Mr7UMclCeBms3f4Gl_8';

    const res =   fetch('http://localhost:3000/api/trustapp/seller/url', {
        method: 'Get',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('Success:', data);
        })
        .catch((err) => {
        });
  }

    const saveUser = () => {
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImlicmFoaW1Aa29zbWljLmFpIiwic3ViIjoxLCJkZXZpY2VUb2tlbklkIjpudWxsLCJpYXQiOjE3MzI2NDI2MzMsImV4cCI6MTc0MTI4MjYzM30.B94C7FLVBZiHYNQii1Yoi_G_Mr7UMclCeBms3f4Gl_8';
      const state = '1';
      const code = '5bd8a826-6c23-43f0-8b3b-1e2510db2073.1e724409-6697-4584-bdca-d4b6e54fd0a4.9d477e81-5f03-4bad-bf51-05d65364b44c';

    const res =  fetch('http://localhost:3000/api/trustapp/transaction/seller/callback', {
        method: 'Post',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
      },
        body: JSON.stringify({
          code: code,
          state: state
        })
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('Success:', data);
        })
        .catch((err) => {
        });
  }

    const handleCodeCall = async () => { 
        try {
             fetch('/api/decode', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code: '8705ece2-2a69-42f7-9168-b21897f67a6b.eb6c57b1-ad95-42ea-8885-095b3ba3df3e.9d477e81-5f03-4bad-bf51-05d65364b44c',                  // The authorization code
          redirect_uri: redirectUri,  // The same redirect URI as used during the initial request
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('Success:', data);
        })
        .catch((err) => {
        });
        } catch (error) {
            
        }
    }
  return (
    <div>
      <h1>Login with Trustap</h1>
      <a >
        <button onClick={() => {
          getUrl();
        }}>Login with Trustap</button>
      </a>
            <a style={{
              paddingLeft: '20px'
          }}>
        <button onClick={() => {
          saveUser();
        }}>Save user</button>
          </a>
          <a style={{
              paddingLeft: '20px'
          }}>
              <button onClick={() => {
                  handleCodeCall();
        }}>code cscd</button>
          </a>
    </div>
  );
};

export default TrustapAuth;
// state=1&session_state=1e724409-6697-4584-bdca-d4b6e54fd0a4&code=5bd8a826-6c23-43f0-8b3b-1e2510db2073.1e724409-6697-4584-bdca-d4b6e54fd0a4.9d477e81-5f03-4bad-bf51-05d65364b44c

// https://dev.kosmic.ai/trustap/seller/registration?state=1&session_state=1e724409-6697-4584-bdca-d4b6e54fd0a4&code=5bd8a826-6c23-43f0-8b3b-1e2510db2073.1e724409-6697-4584-bdca-d4b6e54fd0a4.9d477e81-5f03-4bad-bf51-05d65364b44c