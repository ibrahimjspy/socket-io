import jwt from 'jsonwebtoken'; // Importing the jsonwebtoken library

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { id_token } = req.body;  // Get the ID token from the request body

      // Decode the ID token
        const decoded = jwt.decode('eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICI1ejZ1ZXNicG5ZUVhQZmE1bWlVcURhRkVIOXJqX3AxZm9yLXFxM3JvLVhvIn0.eyJqdGkiOiJmYTM5Y2Y0YS1lYzA0LTQwODktYWJhNy1jZmUxMjJmYmY5ZDUiLCJleHAiOjE3MzI2MjkzODgsIm5iZiI6MCwiaWF0IjoxNzMyNjI5MjA4LCJpc3MiOiJodHRwczovL3Nzby50cnVzdGFwLmNvbS9hdXRoL3JlYWxtcy90cnVzdGFwLXN0YWdlIiwiYXVkIjoiN2M1ZjBjZTUtMTMyZS00ODllLTliODItNzU4NjQ3OGU2ODNiIiwic3ViIjoiMGVlYjlkZDMtNTQ4Ni00N2Y2LTkyYjctOTUyMDY1ZjUwNzRjIiwidHlwIjoiSUQiLCJhenAiOiI3YzVmMGNlNS0xMzJlLTQ4OWUtOWI4Mi03NTg2NDc4ZTY4M2IiLCJhdXRoX3RpbWUiOjE3MzI2MjkxNzAsInNlc3Npb25fc3RhdGUiOiIyNDJiOTU4OC1hZjM1LTQxYWEtOWE4YS0wNThlOWZjOGFkMzMiLCJhY3IiOiIxIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJuYW1lIjoiY2RzYSBjZHNhIiwicHJlZmVycmVkX3VzZXJuYW1lIjoic2lsdWdlQHBvbGthcm9hZC5uZXQiLCJnaXZlbl9uYW1lIjoiY2RzYSIsImZhbWlseV9uYW1lIjoiY2RzYSIsImVtYWlsIjoic2lsdWdlQHBvbGthcm9hZC5uZXQifQ.a-l4OQByRo_zqxfC3_GKufK_ABQQuOshV43Ht8X15q-OIxeYG5VvLp1caa3Tz20GKCqhR9MdqT7fprd-_mcFp5aw11u0u2tGFGzv3EyO5rr1B7HFTAuO2E7foagHDz5LUcaLy8xipFeMC7_mNeVAOvzXfq5c218aEqc-lmGDmgODkoL9RQCtNO3mKbLGxTyHzwpzZihdjFshnMkRPSr2D6GrZDzVklJA4eUdSmtxIzVyh8xYrO9if_pzyMlmW-wFzOSXgFssvEJwgtPndTb9ky1dr5uj5Bt95ORRCQtqSU_evtTWBfsUBSeWV1s5a5cn9peiL0N2YJIT8EBlctanDg', { complete: true });
        
        console.log(decoded);

      if (!decoded) {
        return res.status(400).json({ error: 'Invalid ID token' });
      }

      // Extract the user ID (Typically in the 'sub' claim)
      const userId = decoded.payload.sub;  // 'sub' is the subject claim, which typically contains the user ID

      // Respond with the user ID or any other necessary data from the token
      return res.status(200).json({ userId });
    } catch (error) {
      console.error('Error decoding ID token:', error);
      return res.status(500).json({ error: 'Error decoding ID token' });
    }
  } else {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
}
