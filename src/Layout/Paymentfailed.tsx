import React from 'react';
 // Adjust the path to your cross.png file
import { Button, Stepper } from 'movie-design-hv';

const PaymentFailedPage: React.FC = () => {
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

      {/* Cross image and text */}
      <div className="flex flex-col items-center bg-transparent">
        <img src="/cross.png" alt="Payment Failed" className="w-24 h-30 mb-6" />
        <h1 className="text-white text-2xl font-bold mb-4">Payment Failed</h1>
        <p className="text-white text-sm max-w-xs">
          Your ticket purchase could not be processed because there was a problem with the payment process. Try to buy a ticket again by pressing the try again button.
        </p>
      </div>

      {/* Buttons */}
      <div className="mt-4  mb-12 w-full max-w-sm space-y-4">
        <Button
          label="Try Again"
          onClick={() => console.log("Try Again clicked")}
          type="primary"
          size="large"
          className="w-full"
        />
        <Button
          label="Back to Home"
          onClick={() => console.log("Back to Home clicked")}
          type="secondary"
          size="large"
          className="w-full"
        />
      </div>
    </div>
  );
};

export default PaymentFailedPage;
