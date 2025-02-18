// import React, { useState } from 'react';
// import { SlideShow, Selector, Button, Footer } from 'movie-design-hv';
// import { useNavigate } from 'react-router-dom';
// import SubNav from './popcorn';
// const Buyticket: React.FC = () => {
//   const navigate = useNavigate();

//   // Theater and time options
//   const theaters = [
//     { id: '1', name: 'NY City - Cinema Village' },
//     { id: '2', name: 'LA - Hollywood Theater' },
//     { id: '3', name: 'Chicago - Downtown Cinema' },
//   ];

//   const times = [
//     { id: '1', time: 'June 12, 2024 - 20:30 pm' },
//     { id: '2', time: 'June 12, 2024 - 22:30 pm' },
//     { id: '3', time: 'June 13, 2024 - 18:30 pm' },
//   ];

//   // State for selected options
//   const [selectedTheater, setSelectedTheater] = useState(theaters[0]);
//   const [selectedTime, setSelectedTime] = useState(times[0]);

//   // Slideshow configuration
//   const slideshowProps = {
//     slides: [
//       {
//         imageUrl: "/kungfu.jpg",
//         title: "Kung Fu Panda 4",
//         subTitle: "DreamWorks Animation",
//       },
//       {
//         imageUrl: "/shrek.jpeg",
//         title: "Shrek 5",
//         subTitle: "DreamWorks Animation",
//       },
//       {
//         imageUrl: "https://via.placeholder.com/800x400.png?text=Madagascar",
//         title: "Madagascar",
//         subTitle: "DreamWorks Animation",
//       },
//     ],
//     fadedColor: "rgba(0, 0, 0, 0.5)",
//     name: "kungfuPanda",
//     nameclassName: "text-3xl",
//     subName: 'dremwork animation',
//     autoSlide: true,
//     slideInterval: 4000,
//     animationDuration: 1000,
//     loop: true,
//     pauseOnHover: true,
//     arrowImage: "/exchange 1.png",
//     borderRadius: "30px",
//     imageFit: "cover",
//     className: "rounded-sm",
//     captionAlignment: "center",
//     gradientOverlay: "linear-gradient(to top, rgba(0,0,0,0.3), rgba(0,0,0,0.3))",
//   };

//   return (
//     <div
//       className="min-h-screen flex flex-col overflow-hidden w-full"
//       style={{
//         background: 'linear-gradient(0deg, rgba(108,71,219,1) 1%, rgba(16,10,48,1) 35%)',
//       }}
//     >
//         <SubNav />
        
//       {/* Slideshow Section */}
//       <div className="relative w-[90%] max-w-xl mx-auto mt-8">
//         <SlideShow {...slideshowProps}  className= "relative w-[97%] max-w-xl top-14 self-center" />
//         <p className="text-white">You need to select the mandatory fields (*) to proceed to the checkout page.</p>
//       </div>

//       {/* Selectors Section */}
//       <div className="flex flex-col items-center mt-20 w-full space-y-4 px-4">
//         {/* Theater Selector */}
//         <Selector
//           options={theaters}
//           placeholder="Select Theater"
//           selected={selectedTheater}
//           onSelect={setSelectedTheater}
//           displayKey="name"
//           customSize={{ width: '90%', height: '3rem' }}
//         />

//         {/* Time Selector */}
//         <Selector
//           options={times}
//           placeholder="Select Time"
//           selected={selectedTime}
//           onSelect={setSelectedTime}
//           displayKey="time"
//           customSize={{ width: '90%', height: '3rem' }}
//         />

//         {/* Buffet Selector */}
//         <div className="flex w-full justify-center" onClick={() => navigate('/popcorn')}>
//           <Selector
//             options={[]}
//             placeholder="Buffet Products"
//             onSelect={() => navigate('/buffet')}
//             customSize={{ width: '90%', height: '3rem' }}
//           />
//         </div>
//       </div>

//       {/* Footer with Next Button */}
//       <Footer className="mt-auto">
//         <Button
//           type="primary"
//           size="large"
//           label="Next"
//           className="w-full self-center bg-purple-700 text-white hover:bg-purple-800"
//           onClick={() => navigate('/checkout')}
//         />
//       </Footer>
//     </div>
//   );
// };

// export default Buyticket;
import React, { useState, useEffect } from 'react';
import { SlideShow, Selector, Button, Footer } from 'movie-design-hv';
import { useNavigate, useParams } from 'react-router-dom';
import SubNav from './popcorn';

interface Theater {
  theater_id: number;
  theater_name: string;
  theater_city: string;
  theater_location: string;
  screen_id: string;
  screen_layout: string;
  show_time: string;
  show_id: string;  // Show ID of the selected show
}

interface TimeOption {
  show_id: string;
  time: string;
}

interface Movie {
  movie_title: string;
  movie_description: string;
  movie_poster_url: string;
  movie_id:string
}

const Buyticket: React.FC = () => {
  const { movieId } = useParams(); // Get movieId from URL parameter
  const navigate = useNavigate();

  const [theaters, setTheaters] = useState<Theater[]>([]);
  const [times, setTimes] = useState<TimeOption[]>([]);
  const [selectedTheater, setSelectedTheater] = useState<Theater | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<TimeOption | undefined>(undefined); // Updated to undefined
  const [movie, setMovie] = useState<Movie | null>(null);  // Movie data

  // Slideshow configuration
  const slideshowProps = {
    slides: movie
      ? theaters.map((theater: Theater) => ({
          imageUrl: movie.movie_poster_url, // Use movie_poster_url for the image
          title: movie.movie_title,  // Use the movie title
          subTitle: movie.movie_description, // Use the movie description
        }))
      : [],  // Fallback if movie data is not yet loaded
    fadedColor: "rgba(0, 0, 0, 0.5)",
    name: movie?.movie_title || "Unknown Movie",  // Use the movie title
    nameclassName: "text-3xl",
    subName: movie?.movie_description || 'Movie Description',  // Use the movie description
    autoSlide: true,
    slideInterval: 4000,
    animationDuration: 1000,
    loop: true,
    pauseOnHover: true,
    arrowImage: "/exchange 1.png",
    borderRadius: "30px",
    imageFit: "cover",
    className: "rounded-sm",
    captionAlignment: "center",
    gradientOverlay: "linear-gradient(to top, rgba(0,0,0,0.3), rgba(0,0,0,0.3))",
  };

  // Fetch movie and theater data from API
  useEffect(() => {
    if (!movieId) return;

    const fetchMovieAndTheaters = async () => {
      try {
        const response = await fetch(`http://localhost:4006/api/theaters/${movieId}`);
        const data = await response.json();
        console.log(data);

        if (response.ok) {
          setMovie(data.movie);  // Set movie data
          setTheaters(data.theaters);  // Set theaters
          console.log(data.theaters[0].show_id);

          // Map the showtimes from the fetched data
          const timesData = data.theaters.map((theater: Theater) => ({
            show_id: theater.show_id,
            time: theater.show_time,
          }));
          setTimes(timesData);

          // Optionally set default selections
          setSelectedTheater(data.theaters[0]);
          setSelectedTime(timesData[0]);
        } else {
          alert(data.error || 'Error fetching theaters');
        }
      } catch (error) {
        console.error('Error fetching movie and theaters:', error);
      }
    };

    fetchMovieAndTheaters();
  }, [movieId]);

  return (
    <div
      className="min-h-screen flex flex-col overflow-hidden w-full"
      style={{
        background: 'linear-gradient(0deg, rgba(108,71,219,1) 1%, rgba(16,10,48,1) 35%)',
      }}
    >
      <SubNav />
      
      {/* Slideshow Section */}
      <div className="relative w-[90%] max-w-xl mx-auto mt-8">
        <SlideShow {...slideshowProps} className="relative w-[97%] max-w-xl top-14 self-center" />
      </div>

      {/* Selectors Section */}
      <div className="flex flex-col items-center mt-20 w-full space-y-4 px-4">
        {/* Theater Selector */}
        <Selector<Theater>
          options={theaters}
          placeholder="Select Theater"
          selected={selectedTheater}
          onSelect={(selected) => {
            console.log('Selected Theater:', selected);  // Log selected theater
            setSelectedTheater(selected);
          }} // Update selected theater
          displayKey="theater_name"  // Specify key to display
          customSize={{ width: '90%', height: '3rem' }}
        />

        {/* Time Selector */}
        <Selector<TimeOption>
          options={times}
          placeholder="Select Time"
          selected={selectedTime}
          onSelect={(selected) => {
            console.log('Selected Show Time:', selected);  // Log selected show time
            setSelectedTime(selected);
          }} // Update selected time
          displayKey="time"  // Specify key to display
          customSize={{ width: '90%', height: '3rem' }}
        />

        {/* Buffet Selector */}
        <div className="flex w-full justify-center" onClick={() => navigate('/popcorn')}>
          <Selector<null>  // No options for Buffet Selector
            options={[]}
            placeholder="Buffet Products"
            onSelect={() => navigate('/buffet')}
            customSize={{ width: '90%', height: '3rem' }}
          />
        </div>
      </div>

      {/* Footer with Next Button */}
      <Footer className="mt-auto">
        <Button
          type="primary"
          size="large"
          label="Next"
          className="w-full self-center bg-purple-700 text-white hover:bg-purple-800"
          onClick={() => {
            console.log('Selected Theater ID:', selectedTheater?.theater_id);  // Log selected theater ID
            console.log('Selected Show ID:', selectedTime?.show_id);  // Log selected show ID
     
            // Pass selected data, including show_id, to the next page
            navigate('/checkout', {
              state: {
                selectedTheater,
                selectedTime,
                movie,
                showId: selectedTime?.show_id,  // Pass selected show_id here
                theater_id: selectedTheater?.theater_id, 
                screen_id:selectedTheater?.screen_id // Pass selected theater_id here
              },
            });
          }}
        />
      </Footer>
    </div>
  );
};

export default Buyticket;


