// import React from 'react';
// import { HeroSection, CardSlider, Button, Footer } from 'movie-design-hv';
// import { useNavigate } from 'react-router-dom';

// const MovieDetailsPage = () => {
//   const navigate = useNavigate();

//   // Images data for the movie stills
//   const movieImages = [
//     {
//       image: '/kungfu3.jpg',
//       title: 'Po and Zhen',
//     },
//     {
//       image: '/image 1.jpg',
//       title: 'Valley of Peace',
//     },
//     // Add more stills as needed
//   ];
// const handleClick=()=>{
//     navigate('/home')
// }
//   return (
//     <div className="min-h-screen bg-[#100A30]">
     

//       {/* Hero Section */}
//       <HeroSection
//         title="Kung Fu "
//         studio="DreamWorks Animation"
//         rating={8.1}
//         userRating={4}
//         videoUrl="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
//         posterUrl="/kungfu.jpg"
//         onBackButtonClick={()=>navigate('/home')

//         }
//       />

//       {/* Movie Subject Section */}
//       <section className="px-6 py-8 text-left">
//         <h2 className="text-white text-xl font-semibold mb-4">• Movie Subject</h2>
//         <p className="text-gray-300 text-sm leading-relaxed">
//           After Po is tapped to become the Spiritual Leader of the Valley of Peace, 
//           he needs to find and train a new Dragon Warrior, while a wicked sorceress 
//           plans to re-summon all the master villains whom Po has vanquished to the 
//           spirit realm...
//           <button className="text-purple-400 ml-2">See All</button>
//         </p>
//       </section>

//       {/* Images Section */}
//       <section className="px-6 py-4 text-left">
//         <h2 className="text-white text-xl font-semibold mb-4">• Images From the Movie</h2>
//         <CardSlider 
//           cardsData={movieImages}
//           cardWidth="16rem"
//           cardHeight="10rem"
//         />
//       </section>

//       {/* Buy Ticket Button */}
//       <Footer className="fixed bottom-0 flex justify-around items-center w-full bg-black bg-opacity-100  px-4 py-3" >
//         <Button
//           type="primary"
//           label="Buy Ticket Now"
          
//           className="w-full"
//           size="large"
//           rounded
//           onClick={()=>navigate('/buyticket')  }
//         />
//       </Footer>
//     </div>
//   );
// };

// export default MovieDetailsPage;
import React, { useEffect, useState } from 'react';
import { HeroSection, CardSlider, Button, Footer } from 'movie-design-hv';
import { useNavigate, useParams } from 'react-router-dom';

const MovieDetailsPage = () => {
  const [movieDetails, setMovieDetails] = useState<any>(null);
  const navigate = useNavigate();
  const { movieId } = useParams(); // Get movie ID from URL params

  useEffect(() => {
    // Fetch movie data based on movieId
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/movies/${movieId}`);
        const data = await response.json();
        setMovieDetails(data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    if (movieId) fetchMovieDetails();
  }, [movieId]);

  if (!movieDetails) {
    return <div>Loading...</div>;
  }

  // const movieImages = movieDetails.images.map((image: string, index: number) => ({
  //   image: image,
  //   title: `Image ${index + 1}`,
  // }));
  const movieImages = [
        {
          image: '/kungfu3.webp',
          title: 'Po and Zhen',
        },
        {
          image: '/image 1.jpg',
          title: 'Valley of Peace',
        },
        // Add more stills as needed
      ];

  return (
    <div className="min-h-screen bg-[#100A30]">
      {/* Hero Section */}
      <HeroSection
        title={movieDetails.title}
        studio={movieDetails.studio}
        rating={movieDetails.imdb_rating}
        userRating={movieDetails.app_rating}
        videoUrl={movieDetails.trailer_url}
        posterUrl={movieDetails.poster_url}
        onBackButtonClick={() => navigate('/home')}
      />

      {/* Movie Subject Section */}
      <section className="px-6 py-8 text-left">
        <h2 className="text-white text-xl font-semibold mb-4">• Movie Subject</h2>
        <p className="text-gray-300 text-sm leading-relaxed">{movieDetails.description}</p>
      </section>

      {/* Images Section */}
      <section className="px-6 py-4 text-left">
        <h2 className="text-white text-xl font-semibold mb-4">• Images From the Movie</h2>
        <CardSlider cardsData={movieImages} cardWidth="16rem" cardHeight="10rem" />
      </section>

      {/* Buy Ticket Button */}
      <Footer className="fixed bottom-0 flex justify-around items-center w-full bg-black bg-opacity-100 px-4 py-3">
  <Button
    type="primary"
    label="Buy Ticket Now"
    className="w-full"
    size="large"
    rounded
    onClick={() => navigate(`/buyticket/${movieId}`)}  // Updated route with movieId
  />
</Footer>
    </div>
  );
};

export default MovieDetailsPage;
