import React from 'react';
import { Button } from 'movie-design-hv';
import { PaymentMethod, Footer } from 'movie-design-hv';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import SubNav from './popcorn';

const PaymentLayout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Extract booking details from location state
  const {
    bookingId,
    expiresIn,
    totalAmount,
    movieName,
    theaterName,
    showTime,
    selectedSeats,
  } = location.state || {}; // Use empty object as fallback in case state is missing

  // Payment methods
  const paymentMethods = [
    {
      text: 'Pay with Apple Pay',
      imageUrl: '/Apple.jpg',
      backgroundColor: 'linear-gradient(90deg, #000000, #FFFFFF)',
      borderRadius: '8px',
    },
    {
      text: 'Pay with Master Card',
      imageUrl: '/Apple.jpg',
      backgroundColor: 'linear-gradient(100deg, #ED0006, #FF5E00)',
      borderRadius: '8px',
    },
    {
      text: 'Pay with PayPal',
      imageUrl: '/Apple.jpg',
      backgroundColor: 'linear-gradient(100deg, #253B80, #179BD7)',
      borderRadius: '8px',
    },
    {
      text: 'Pay with Google Pay',
      imageUrl: '/Apple.jpg',
      backgroundColor: 'linear-gradient(100deg, #EA4335 0%, #FBBC04 34%, #34A853 67%, #4285F4 100%)',
      borderRadius: '8px',
    },
  ];

  // Handle payment option selection and API call
  const handlePayNow = async () => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      console.error('No access token found');
      return;
    }

    try {
      // Make the API call to confirm booking
      const response = await axios.post(
        `http://localhost:4005/api/bookings/${bookingId}/confirm`,
        {
          paymentMethod: 'CREDIT_CARD', // You can modify this to use the selected payment method
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      console.log('Booking confirmed:', response.data);
      // Navigate to a success page
      navigate('/paymentSuccessful');
    } catch (error) {
      console.error('Error confirming booking:', error);
    }
  };

  return (
    <div
      className="min-h-screen bg-black text-white flex flex-col items-center overflow-hidden p-3 relative"
      style={{
        background: 'linear-gradient(0deg, rgba(108,71,219,1) 1%, rgba(16,10,48,1) 35%)',
      }}
    >
      <SubNav />

      <div className="mt-12 w-full p-4 rounded-lg">
        <h2 className="text-md font-normal opacity-[50%] mb-4">Select Payment Options</h2>
        {paymentMethods.map((method, index) => (
          <PaymentMethod
            key={index}
            className="mb-6 h-fit"
            textClassName="text-white font-semibold"
            imageClassName="w-13 h-102 rounded-md"
            {...method}
          />
        ))}
      </div>

      <div className="w-full max-w-md absolute z-100 bottom-4 mt-2">
        <Footer className="w-full flex flex-col items-center justify-around gap-5">
          <div className="flex flex-col items-center justify-center gap">
            <h3 className="text-sm font-semibold text-white underline-offset-5">Total Amount</h3>
            <p className="text-4xl font-bold text-[#33B528] text-[36px]">${totalAmount}</p>
          </div>
          <Button
            label="Pay Now"
            onClick={handlePayNow}
            type="primary"
            className="w-full text-white py-2 px-4 rounded-lg font-bold text-lg"
          />
        </Footer>
      </div>
    </div>
  );
};

export default PaymentLayout;
