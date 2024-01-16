// pages/success.js

import React from 'react';

const SuccessPage = () => {
  return (
    <div>
      <h1>Success Page</h1>
      {/* Your success page content goes here */}
    </div>
  );
};

export async function getServerSideProps({ req, res }) {
  if (req.isAuthenticated()) {
    return {
      props: {}, // No additional props for now
    };
  } else {
    res.writeHead(302, {
      Location: '/login',
    });
    res.end();
    return {
      props: {}, // No additional props for now
    };
  }
}

export default SuccessPage;
