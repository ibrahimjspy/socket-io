
import qs from 'querystring';  // This helps in encoding the request body in `x-www-form-urlencoded` format

export default async function handler(req, res) {
  if (req.method === 'POST') {
      try {
        console.log('req.body', req.body);  
      // Extract the authorization code from the request body
      const { code, redirect_uri } = req.body;
      
      // Prepare parameters for the request to Trustap token endpoint
      const params = {
        client_id: '7c5f0ce5-132e-489e-9b82-7586478e683b',  // Store your client ID in .env
        grant_type: 'authorization_code',         // Grant type is always 'authorization_code'
          redirect_uri: redirect_uri,
        client_secret: '2db29f33-7b9f-46a3-bcb2-75eac9ceafac',  // Redirect URI should be the same as used in the initial authorization request
        code: 'dd52af6f-db2f-4a0c-98a8-39f4039622a5.242b9588-af35-41aa-9a8a-058e9fc8ad33.9d477e81-5f03-4bad-bf51-05d65364b44c',  
      };

      const tokenUrl = 'https://sso.trustap.com/auth/realms/trustap-stage/protocol/openid-connect/token';

      // Convert params into 'application/x-www-form-urlencoded' format
      const formBody = qs.stringify(params);

      // Make the POST request to the Trustap token endpoint
      const response = await fetch(tokenUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formBody,  // Send the form data in the body of the request
      });

      // Handle the response from Trustap
      if (response.ok) {
        const data = await response.json();
        return res.status(200).json(data);  // Return the response data (which will include access_token, id_token, etc.)
      } else {
        const errorData = await response.json();
        return res.status(400).json({ error: errorData.error_description || 'Failed to fetch access token' });
      }
    } catch (error) {
      console.error('Error while exchanging code for access token:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
}


// https://api-dev.kosmic.ai/api/v1/webhook/trustapp?state=12&session_state=242b9588-af35-41aa-9a8a-058e9fc8ad33&code=dd52af6f-db2f-4a0c-98a8-39f4039622a5.242b9588-af35-41aa-9a8a-058e9fc8ad33.9d477e81-5f03-4bad-bf51-05d65364b44c

// {
//     "access_token": "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICI1ejZ1ZXNicG5ZUVhQZmE1bWlVcURhRkVIOXJqX3AxZm9yLXFxM3JvLVhvIn0.eyJqdGkiOiI2ZWJmYjJkNC0xMjc2LTQ1MTgtYmY2Zi01YTc3MzVhNWU4NjAiLCJleHAiOjE3MzI2MjkzODgsIm5iZiI6MCwiaWF0IjoxNzMyNjI5MjA4LCJpc3MiOiJodHRwczovL3Nzby50cnVzdGFwLmNvbS9hdXRoL3JlYWxtcy90cnVzdGFwLXN0YWdlIiwic3ViIjoiMGVlYjlkZDMtNTQ4Ni00N2Y2LTkyYjctOTUyMDY1ZjUwNzRjIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoiN2M1ZjBjZTUtMTMyZS00ODllLTliODItNzU4NjQ3OGU2ODNiIiwiYXV0aF90aW1lIjoxNzMyNjI5MTcwLCJzZXNzaW9uX3N0YXRlIjoiMjQyYjk1ODgtYWYzNS00MWFhLTlhOGEtMDU4ZTlmYzhhZDMzIiwiYWNyIjoiMSIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwczovL3d3dy5rb3NtaWMuYWkiXSwic2NvcGUiOiJvcGVuaWQgcDJwX3R4Om9mZmxpbmVfY29uZmlybV9oYW5kb3ZlciBwMnBfdHg6b2ZmbGluZV9hY2NlcHRfZGVwb3NpdCBwcm9maWxlIHAycF90eDpvZmZsaW5lX2NhbmNlbCBlbWFpbCBwMnBfdHg6b2ZmbGluZV9jcmVhdGVfam9pbiIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwibmFtZSI6ImNkc2EgY2RzYSIsInByZWZlcnJlZF91c2VybmFtZSI6InNpbHVnZUBwb2xrYXJvYWQubmV0IiwiZ2l2ZW5fbmFtZSI6ImNkc2EiLCJmYW1pbHlfbmFtZSI6ImNkc2EiLCJlbWFpbCI6InNpbHVnZUBwb2xrYXJvYWQubmV0In0.bunAfax4mvXWgXv3V-sgjAAHVS7F7BMEdZ9bBOVhp-jYRu_AhQCrt-eTo5Sy5AHEsmlLfkeZSsCjM6nQD2NoReNM3rGXAG3ct5MWCRW7VY3V74uDrh6A-m-1X3mqHkD0pMzgVSoh8GS7RWsYenstdCYiMiOxd-Qp_J4tkZGxXV0oqemqFbuO8BX_kTF9D2yaoy1S6W7n6zT9PrV-gFGmKGiywdnKZMNOioOJ2wzWmRizlGnOIaLP8mKBeLqZqSn812mpgfjCtCDDY5tnPU2bvBR0vutX93i6vIol5mhEjKnaU2NLAYuBSaIevRWB5lCzwyGoEcJ3m0CxgcKLYwatsQ",
//     "expires_in": 180,
//     "refresh_expires_in": 1800,
//     "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICI2MjNlYmVlMi00MzZiLTQ1OTYtOGFkMS01ZTBhY2IxOTdmMTMifQ.eyJqdGkiOiJjNmRkZmY1OS1kYjI2LTRjNWEtYTAzNy0wZDY4NGRkNDlmZTUiLCJleHAiOjE3MzI2MzEwMDgsIm5iZiI6MCwiaWF0IjoxNzMyNjI5MjA4LCJpc3MiOiJodHRwczovL3Nzby50cnVzdGFwLmNvbS9hdXRoL3JlYWxtcy90cnVzdGFwLXN0YWdlIiwiYXVkIjoiaHR0cHM6Ly9zc28udHJ1c3RhcC5jb20vYXV0aC9yZWFsbXMvdHJ1c3RhcC1zdGFnZSIsInN1YiI6IjBlZWI5ZGQzLTU0ODYtNDdmNi05MmI3LTk1MjA2NWY1MDc0YyIsInR5cCI6IlJlZnJlc2giLCJhenAiOiI3YzVmMGNlNS0xMzJlLTQ4OWUtOWI4Mi03NTg2NDc4ZTY4M2IiLCJhdXRoX3RpbWUiOjAsInNlc3Npb25fc3RhdGUiOiIyNDJiOTU4OC1hZjM1LTQxYWEtOWE4YS0wNThlOWZjOGFkMzMiLCJzY29wZSI6Im9wZW5pZCBwMnBfdHg6b2ZmbGluZV9jb25maXJtX2hhbmRvdmVyIHAycF90eDpvZmZsaW5lX2FjY2VwdF9kZXBvc2l0IHByb2ZpbGUgcDJwX3R4Om9mZmxpbmVfY2FuY2VsIGVtYWlsIHAycF90eDpvZmZsaW5lX2NyZWF0ZV9qb2luIn0.3uYm6QOmsZmvkCI0Zi5wr5vCQ_rFPU6u-BvGRIMuE6o",
//     "token_type": "bearer",
//     "id_token": "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICI1ejZ1ZXNicG5ZUVhQZmE1bWlVcURhRkVIOXJqX3AxZm9yLXFxM3JvLVhvIn0.eyJqdGkiOiJmYTM5Y2Y0YS1lYzA0LTQwODktYWJhNy1jZmUxMjJmYmY5ZDUiLCJleHAiOjE3MzI2MjkzODgsIm5iZiI6MCwiaWF0IjoxNzMyNjI5MjA4LCJpc3MiOiJodHRwczovL3Nzby50cnVzdGFwLmNvbS9hdXRoL3JlYWxtcy90cnVzdGFwLXN0YWdlIiwiYXVkIjoiN2M1ZjBjZTUtMTMyZS00ODllLTliODItNzU4NjQ3OGU2ODNiIiwic3ViIjoiMGVlYjlkZDMtNTQ4Ni00N2Y2LTkyYjctOTUyMDY1ZjUwNzRjIiwidHlwIjoiSUQiLCJhenAiOiI3YzVmMGNlNS0xMzJlLTQ4OWUtOWI4Mi03NTg2NDc4ZTY4M2IiLCJhdXRoX3RpbWUiOjE3MzI2MjkxNzAsInNlc3Npb25fc3RhdGUiOiIyNDJiOTU4OC1hZjM1LTQxYWEtOWE4YS0wNThlOWZjOGFkMzMiLCJhY3IiOiIxIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJuYW1lIjoiY2RzYSBjZHNhIiwicHJlZmVycmVkX3VzZXJuYW1lIjoic2lsdWdlQHBvbGthcm9hZC5uZXQiLCJnaXZlbl9uYW1lIjoiY2RzYSIsImZhbWlseV9uYW1lIjoiY2RzYSIsImVtYWlsIjoic2lsdWdlQHBvbGthcm9hZC5uZXQifQ.a-l4OQByRo_zqxfC3_GKufK_ABQQuOshV43Ht8X15q-OIxeYG5VvLp1caa3Tz20GKCqhR9MdqT7fprd-_mcFp5aw11u0u2tGFGzv3EyO5rr1B7HFTAuO2E7foagHDz5LUcaLy8xipFeMC7_mNeVAOvzXfq5c218aEqc-lmGDmgODkoL9RQCtNO3mKbLGxTyHzwpzZihdjFshnMkRPSr2D6GrZDzVklJA4eUdSmtxIzVyh8xYrO9if_pzyMlmW-wFzOSXgFssvEJwgtPndTb9ky1dr5uj5Bt95ORRCQtqSU_evtTWBfsUBSeWV1s5a5cn9peiL0N2YJIT8EBlctanDg",
//     "not-before-policy": 0,
//     "session_state": "242b9588-af35-41aa-9a8a-058e9fc8ad33",
//     "scope": "openid p2p_tx:offline_confirm_handover p2p_tx:offline_accept_deposit profile p2p_tx:offline_cancel email p2p_tx:offline_create_join"
// }