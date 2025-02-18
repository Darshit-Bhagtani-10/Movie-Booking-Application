import React from 'react';
import { Button, Stepper } from 'movie-design-hv';
import { useNavigate } from 'react-router-dom';

const PaymentSuccessfulPage: React.FC = () => {
   const navigate=useNavigate(); 
  return (
    <div
      className="h-screen flex flex-col items-center justify-between text-center p-4"
      style={{
        background: 'linear-gradient(0deg, rgba(108,71,219,1) 1%, rgba(16,10,48,1) 35%)',
      }}
    >
      {/* Stepper at the top */}
      <div className="w-full flex justify-center pt-4">
        <Stepper currentStep={4} totalStep={4} className="mb-6 gap-x-2" />
      </div>

      {/* Tick image and text */}
      <div className="flex flex-col items-center bg-transparent">
        <img src="/tick.png" alt="Payment Successful" className="w-24 h-24 mb-6" />
        <h1 className="text-white text-2xl font-bold mb-4">Payment Successful</h1>
        <p className="text-white text-sm max-w-xs">
          We have sent a copy of your ticket to your e-mail address. You can check your ticket in the My Tickets section on the homepage.
        </p>
      </div>

      {/* Buttons */}
      <div className="mt-4  mb-12 w-full max-w-sm space-y-4">
        <Button
          label="View Ticket"
          onClick={() => navigate('/MyTicket')}
          type="primary"
          size="large"
          className="w-full"
        />
        <Button
          label="Back to Home"
          onClick={() => navigate('/home')}
          type="secondary"
          size="large"
          className="w-full"
        />
      </div>
    </div>
  );
};

export default PaymentSuccessfulPage;
