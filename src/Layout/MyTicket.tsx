import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TicketCard } from 'movie-design-hv';
import { Button } from 'movie-design-hv';

const PaymentSuccessful: React.FC = () => {
  const navigate = useNavigate();

  const ticketProps = {
    movieName: "Kung Fu Panda 4",
    ticketCount: "2 Adult",
    ticketPrice: 40,
    sessionTime: "20.30 pm - 22.00 pm",
    seatNumbers: ["C3", "C4"],
    buffetProducts: "None",
    buffetPrice: 0,
    movieTheater: "Cinema Village",
    isPaymentSuccess: true,
  };

  const handleBackToHome = () => {
    navigate('/index');
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center w-full"
      style={{
        background: 'linear-gradient(0deg, rgba(108,71,219,1) 1%, rgba(16,10,48,1) 35%)',
        padding: '20px',
        color: 'white',
        
      }}
    >
      {/* Title */}
     
    <div className="relative top-2 mb-12 flex justify-center align-center">
    <img
          src="/ticket booked.png"
          alt="QR Code"
          className="w-full h-full object-contain"
          style={{
            maxWidth: '100%',
            marginBottom:'25px'
          }}
        />
    </div>
      {/* QR Code Image */}
     

     

      {/* Ticket Card Component */}
      <TicketCard {...ticketProps} />

      {/* Back to Home Button */}
      <div className=" w-full max-w-md" style={{ marginTop: '8rem' }}>
        <Button 
          type="secondary" 
          label="Back to Home"
          onClick={handleBackToHome}
          className="w-full"
        />
      </div>
    </div>
  );
};

export default PaymentSuccessful;