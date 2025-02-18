// import React, { useState, useEffect } from 'react';
// import { SeatSelector, Counter, Button, Footer, TicketCard } from 'movie-design-hv';
// import SubNav from './popcorn';
// import { useNavigate } from 'react-router-dom';

// const BookingPage: React.FC = () => {
//   const navigate = useNavigate();
//   const [adultCount, setAdultCount] = useState<number>(2);
//   const [childCount, setChildCount] = useState<number>(0);
//   const [selectedSeats, setSelectedSeats] = useState<string[]>(['C3', 'C4']);
//   const [totalAmount, setTotalAmount] = useState<number>(40);

//   const ticketProps = {
//     movieName: "Kung Fu Panda 4",
//     ticketCount: `${adultCount} Adult${childCount > 0 ? `, ${childCount} Child` : ''}`,
//     ticketPrice: totalAmount,
//     sessionTime: "20.30 pm - 22.00 pm",
//     seatNumbers: selectedSeats,
//     buffetProducts: "None",
//     buffetPrice: 0,
//     movieTheater: "Screen 1",
//     isPaymentSuccess: false,

//   };

//   const maxSelections = adultCount + childCount;

//   useEffect(() => {
//     const total = adultCount * 20 + childCount * 10;
//     setTotalAmount(total);
//   }, [adultCount, childCount]);

//   const handleSeatSelect = (seats: string[]) => {
//     if (seats.length <= maxSelections) {
//       setSelectedSeats(seats);
//     }
//   };

//   const handleAdultCountChange = (value: number) => {
//     setAdultCount(value);
//   };

//   const handleChildCountChange = (value: number) => {
//     setChildCount(value);
//   };

//   const generateSeats = (): Record<string, "available" | "booked"> => {
//     const seats: Record<string, "available" | "booked"> = {};

//     for (let row = 1; row <= 8; row++) {
//       for (let seat = 1; seat <= 10; seat++) {
//         const seatKey = `R${row}S${seat}`;
//         // Last two seats in each row are booked
//         seats[seatKey] = seat >= 9 ? "booked" : "available";
//       }
//     }

//     return seats;
//   };

//   const mainSeatsData = generateSeats();

//   return (
//     <div
//       className="min-h-screen w-full  mx-auto"
//       style={{
//         background: 'linear-gradient(0deg, rgba(108,71,219,1) 1%, rgba(16,10,48,1) 35%)',
//       }}
//     >
//       {/* Header */}
//       <div className=" pt-4">
//         <SubNav />

//         {/* Screen */}
//         <div className="mt-8 mb-12 text-center relative">
//           <div className="relative">
//             <div
//               className="h-3 bg-white/30 rounded-t-[100px] mx-auto w-[90%]"
//               style={{
//                 background: 'linear-gradient(180deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.1) 100%)',
//               }}
//             />
//           </div>
          
//         </div>

//         {/* Seat Layout */}
//         <div className="px-4">
//           <SeatSelector
//             rows={8}
//             seatsPerRow={10}
//             maxSelections={maxSelections}
//             gap={1.5}
//             seatSize="28px"
//             colors={{
//               booked: "bg-gray-600",
//               available: "bg-purple-500",
//               selected: "bg-orange-500",
//             }}
//             availableSeats={mainSeatsData}
            
//           />
//         </div>

//         {/* Ticket Details Section */}
//         <div className="px-4 mt-12 flex flex-col items-start">
//           <h3 className="text-white text-lg mb-6">• Ticket Details</h3>

//           <div className="flex items-start gap-4 mb-6">
//             <Counter
//               initialValue={2}
//               minValue={0}
//               maxValue={10}
//               label="ADULT"
//               orientation="horizontal"
//               onChange={handleAdultCountChange}
//               customSize={{ width: "170", height: "48" }}
//             />
//             <Counter
//               initialValue={0}
//               minValue={0}
//               maxValue={10}
//               label="CHILD"
//               orientation="horizontal"
//               onChange={handleChildCountChange}
//               customSize={{ width: "170", height: "48" }}
//             />
             
//           </div>

//           <TicketCard {...ticketProps} />

         
//         </div>
//       </div>

//       {/* Footer */}
//       <Footer className="fixed bottom-0 left-0 right-0 px-4 py-4 mx-auto">
//         <Button
//           type="primary"
//           label="Payment Options"
//           className="w-full bg-purple-600 hover:bg-purple-700 rounded-xl h-14 text-lg font-medium"
//           onClick={() => navigate('/paymentoption')}
//         />
//       </Footer>
//     </div>
//   );
// };

// export default BookingPage;
import React, { useState, useEffect } from 'react';
import { SeatSelector, Counter, Button, Footer, TicketCard } from 'movie-design-hv';
import SubNav from './popcorn';
import { useNavigate, useLocation } from 'react-router-dom';
import CustomSeatSelector from './customseat';
import axios from 'axios';

interface SeatInfo {
  id: string;
  status: 'AVAILABLE' | 'BOOKED' | 'LOCKED';
  number: string;
}

interface ScreenLayout {
  rows: SeatInfo[][];
  columns: number;
}

const BookingPage: React.FC = () => {
  const navigate = useNavigate();
  
  const location = useLocation();
  
  const [adultCount, setAdultCount] = useState<number>(2);
  const [childCount, setChildCount] = useState<number>(0);
  const [selectedSeats, setSelectedSeats] = useState<string[]>(['C3', 'C4']);
  const [totalAmount, setTotalAmount] = useState<number>(40);
  const [screenLayout, setScreenLayout] = useState<ScreenLayout>({ rows: [], columns: 0 });
  const [availableSeats, setAvailableSeats] = useState<Record<string, "available" | "booked">>({});
  const { selectedTheater, selectedTime, movie } = location.state || {}; // Destructure state

  // You can now access the movie name, theater name, and show time
  const movieName = movie?.movie_title;
  const theaterName = selectedTheater?.theater_name;
  const theaterId=selectedTheater?.theater_id
  const showTime = selectedTime?.time;
  const screenId=selectedTheater?.screen_id
  
  const ticketProps = {
    movieName: movieName,
    ticketCount: `${adultCount} Adult${childCount > 0 ? `, ${childCount} Child` : ''}`,
    ticketPrice: totalAmount,
    sessionTime: showTime,
    seatNumbers: selectedSeats,
    buffetProducts: "None",
    buffetPrice: 0,
    movieTheater: theaterName,
    isPaymentSuccess: false,
  };

  const maxSelections = adultCount + childCount;
  const showId = location.state?.showId; 
  const movieId=movie?.movie_id
  const handlePaymentOptionClick = async () => {
    const requestData = {
      showId,   
      movieId:movieId,
      screenId:screenId, 
      theatreId:theaterId,          
      seatNumbers: selectedSeats,  // The selected seats
      adultCount,           // The number of adults
      childCount            // The number of children
    };
  
    try {
      const token = localStorage.getItem('accessToken');  // Replace with your token storage method
    
      // Check if token exists
      if (!token) {
        throw new Error('No authorization token found');
      }
      // Send the request to lock seats
      const response = await axios.post(
        'http://localhost:4005/api/bookings/lock',
        requestData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json', // Ensure Content-Type is correct
          },
        }
      );
  
      
      if (response.status === 200) {
        // Handle successful response (booking confirmed or redirected to payment options)
        const { bookingId, expiresIn } = response.data;
        console.log(bookingId)
        // Optional: navigate to payment page or display confirmation
        navigate('/paymentoption', {
          state: {
            bookingId,
            expiresIn,
            totalAmount,
            movieName,
            theaterName,
            showTime,
            selectedSeats
          }
        });
      }
    } catch (error) {
      console.error("Error locking seats:", error);
      // Optionally display an error message
      alert("An error occurred while locking the seats. Please try again.");
    }
  };
  useEffect(() => {
    const fetchScreenLayout = async () => {
      if (showId) {
        try {
          const response = await axios.get(`http://localhost:4006/api/theaters/screen/layout/${showId}`);
          const layoutData: ScreenLayout = response.data;
          setScreenLayout(layoutData);
          console.log(layoutData.rows.length)
  
          // Convert nested array structure to flat seat map
          const seatMap: Record<string, "available" | "booked"> = {};
           
          // Flatten the nested array structure and transform seats
          layoutData.rows.forEach(row => {
            row.forEach(seat => {
              // Direct mapping using the exact strings expected by the component
              seatMap[seat.number] = seat.status === 'AVAILABLE' ? 'available' : 'booked';
            });
          });
          
          console.log('Generated seatMap:', seatMap);
          setAvailableSeats(seatMap);
        } catch (error) {
          console.error("Error fetching screen layout:", error);
        }
      }
    };
  
    fetchScreenLayout();
  }, [showId]);

  
  useEffect(() => {
    const total = adultCount * 20 + childCount * 10;
    setTotalAmount(total);
  }, [adultCount, childCount]);
  

  const handleSeatSelect = (seats: string[]) => {
    if (seats.length <= maxSelections) {
      setSelectedSeats(seats);
    }
  };

  const handleAdultCountChange = (value: number) => {
    setAdultCount(value);
  };

  const handleChildCountChange = (value: number) => {
    setChildCount(value);
  };

  // Convert layout data for SeatSelector
  const convertedLayout = {
    rows: screenLayout.rows.length,
    seatsPerRow: screenLayout.columns,
  };

  return (
    <div
      className="min-h-screen w-full mx-auto flex justify-start"
      style={{
        background: 'linear-gradient(0deg, rgba(108,71,219,1) 1%, rgba(16,10,48,1) 35%)',
      }}
    >
      <div className="pt-4">
        <SubNav />

        <div className="mt-8 mb-12 text-center relative">
          <div className="relative">
            <div
              className="h-3 bg-white/30 rounded-t-[100px] mx-auto w-[90%]"
              style={{
                background: 'linear-gradient(180deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.1) 100%)',
              }}
            />
          </div>
        </div>

        <div className="pr-8">
        <CustomSeatSelector
  layout={screenLayout}
  maxSelections={maxSelections}
  gap={1.5}
  seatSize="28px"
  colors={{
    booked: "bg-gray-600",
    available: "bg-purple-500",
    selected: "bg-orange-500",
  }}
  onSeatSelect={handleSeatSelect}
/>
      </div>

        <div className="px-4 mt-12 flex flex-col ">
          <h3 className="text-white text-lg mb-6">• Ticket Details</h3>

          <div className="flex items-start gap-4 mb-6">
            <Counter
              initialValue={2}
              minValue={0}
              maxValue={10}
              label="ADULT"
              orientation="horizontal"
              onChange={handleAdultCountChange}
              customSize={{ width: "170", height: "48" }}
            />
            <Counter
              initialValue={0}
              minValue={0}
              maxValue={10}
              label="CHILD"
              orientation="horizontal"
              onChange={handleChildCountChange}
              customSize={{ width: "170", height: "48" }}
            />
          </div>

          <TicketCard {...ticketProps} />
        </div>
      </div>

      <Footer className="fixed bottom-0 left-0 right-0 px-4 py-4 mx-auto">
  <Button
    type="primary"
    label="Payment Options"
    className="w-full bg-purple-600 hover:bg-purple-700 rounded-xl h-14 text-lg font-medium"
    onClick={handlePaymentOptionClick}  // Call the API when button is clicked
  />
</Footer>
    </div>
  );
};

export default BookingPage;