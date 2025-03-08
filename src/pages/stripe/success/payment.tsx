import React from 'react';

const PaymentSuccess: React.FC = () => {
  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h1 style={titleStyle}>Payment Successful!</h1>
        <p style={messageStyle}>Thank you for your purchase. Your payment has been successfully processed.</p>
        <p style={detailsStyle}>If you have any questions, please contact our support team.</p>
        <a href="./stripe" style={buttonStyle}>Return to Payment Page</a>
      </div>
    </div>
  );
};

const containerStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  backgroundColor: '#f3e5f5',
};

const cardStyle: React.CSSProperties = {
  padding: '20px',
  backgroundColor: '#ffffff',
  borderRadius: '8px',
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  textAlign: 'center' as 'center', // TypeScript requires this assertion
  maxWidth: '400px',
  width: '100%',
};

const titleStyle: React.CSSProperties = {
  fontSize: '24px',
  fontWeight: 'bold',
  marginBottom: '20px',
  color: '#7e57c2',
};

const messageStyle: React.CSSProperties = {
  fontSize: '16px',
  marginBottom: '10px',
  color: '#512da8',
};

const detailsStyle: React.CSSProperties = {
  fontSize: '14px',
  marginBottom: '20px',
  color: '#673ab7',
};

const buttonStyle: React.CSSProperties = {
  display: 'inline-block',
  padding: '10px 20px',
  backgroundColor: '#7e57c2',
  color: '#ffffff',
  borderRadius: '5px',
  textDecoration: 'none',
  fontWeight: 'bold',
};

export default PaymentSuccess;
