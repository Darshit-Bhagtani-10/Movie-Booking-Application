// import React from 'react';
// import { Caraousel, CardSlider, Footer,Icon } from 'movie-design-hv';
// import { useNavigate } from 'react-router-dom';

// interface HomeLayoutProps {
//   // You can add any additional props here if needed
// }

// const HomeLayout: React.FC<HomeLayoutProps> = () => {

//     const navigate=useNavigate();
//   // Carousel data
  
//   const highlightSlides = [
//     {
//       image: '/kungfu.jpg',
//       title: 'Kung Fu Panda 4',
//       description: `o's next big-screen adventure`
    
      
//     },
//     // Add more slides as needed
//   ];

//   // Card slider data for New Movies
//   const newMoviesData = [
//     {
//       image: '/backblack.jpg',
//       title: 'Back to Black',
//       description: `Amy Winehouse's extraordinary story`
     

//     },
//     {
//       image: '/challengers.jpg',
//       title: 'Challengers',
//       description: 'A tennis drama that serves love and rivalry'
//     },
//     // Add more movies as needed
//   ];

//   // Card slider data for Coming Soon
//   const comingSoonData = [
//     {
//       image: '/planet-of-apes.jpg',
//       title: 'Kingdom of the Planet of the Apes',
//       description: 'The next chapter in ape evolution'
//     },
//     // Add more upcoming movies
//   ];

//   return (
//     <div className="min-h-screen w-full" 
//       style={{
//         background: 'linear-gradient(0deg, rgba(108,71,219,1) 1%, rgba(16,10,48,1) 35%)'
//       }}>
//       {/* Header */}
//       <header className="flex justify-between items-center px-6 py-4">
//         <img src="/Mask group.png" alt="Profile" className="h-8 w-8 rounded-full" />
//         <img src="/Figma_movie.png" alt="Figma Movie" className="h-8" />
        
//         <img src="/notification 1.png" alt="Notifications" className="h-8 w-8" onClick={()=>navigate('/moviedetail')}/>
//       </header>

//       {/* Main Content */}
//       <main className="px-4 space-y-8">
//         {/* Highlights Section */}
//         <section className='text-left'>
//           <h3 className="text-white text-xl font-normal mb-4 ">• Highlights</h3>
//           <div className='rounded-2xl overlflow-hidden'>
//           <Caraousel 

//             slides={highlightSlides}
//             interval={5000}
//             width = "100%"
//   height = "176px"
            
//           />
//           </div>
          
//         </section>

//         {/* New Movies Section */}
//         <section>
//           <div className="flex justify-between items-center mb-4">
//             <h3 className="text-white text-xl font-normal">• New Movies In Theaters</h3>
//             <button className="text-purple-400 text-sm">See All</button>
//           </div>
//           <CardSlider 
//             cardsData={newMoviesData}
//             cardWidth="12rem"
//             cardHeight="18rem"
//           />
//         </section>

//         {/* Coming Soon Section */}
//         <section>
//           <div className="flex justify-between items-center mb-4">
//             <h3 className="text-white text-xl "><span className="font-bold size-md">•</span> Coming Soon</h3>
//             <button className="text-purple-400 text-sm">See All</button>
//           </div>
//           <CardSlider 
//             cardsData={comingSoonData}
//             cardWidth="12rem"
//             cardHeight="18rem"
//           />
//         </section>
//       </main>

//       {/* Footer */}
//       <Footer className="fixed bottom-0 w-full flex justify-around bg-black bg-opacity-90 px-4 py-3" rounded={true}>
//         <Icon 
//           URL="/heart 1.png"
//           className="w-8 h-8"
//           imgClassName="w-6 h-6"
//           iconColor="white"
//         />
//         <Icon 
//           URL="/Home.png"
//           className="w-8 h-8"
//           imgClassName="w-6 h-6"
//           iconColor="white"
//         />
//         <Icon 
//           URL="/ticketIcon.png"
//           className="w-8 h-8"
//           imgClassName="w-6 h-6"
//           iconColor="white"
//         />
//       </Footer>
//     </div>
//   );
// };

// export default HomeLayout;
  import React, { useEffect, useState } from 'react';
  import { Footer, Icon, Caraousel, CardSlider } from 'movie-design-hv';
  import { useNavigate } from 'react-router-dom';
  import { getFromDB, saveToDB } from '../utils/indexedDB';

  interface Movie {
    id: string;
    title: string;
    description: string;
    poster_url: string;
  }

  interface MovieData {
    highlighted: Movie[];
    newReleases: Movie[];
    comingSoon: Movie[];
  }

  const HomeLayout: React.FC = () => {
    const navigate = useNavigate();
    const [movieData, setMovieData] = useState<MovieData>({
      highlighted: [],
      newReleases: [],
      comingSoon: [],
    });
    const [isLoading, setIsLoading] = useState(true);
    const [isOffline, setIsOffline] = useState(!navigator.onLine);

    // Handle online/offline status
    useEffect(() => {
      const handleOnline = () => setIsOffline(false);
      const handleOffline = () => setIsOffline(true);

      window.addEventListener('online', handleOnline);
      window.addEventListener('offline', handleOffline);

      return () => {
        window.removeEventListener('online', handleOnline);
        window.removeEventListener('offline', handleOffline);
      };
    }, []);

    // Fetch and cache data
    useEffect(() => {
      const fetchData = async () => {
        try {
          // Try to get cached data first
          const cachedData = await getFromDB('dashboard');
          if (cachedData) {
            setMovieData(cachedData);
            setIsLoading(false);
          }

          // If online, fetch fresh data
          if (navigator.onLine) {
            const response = await fetch('http://localhost:4000/api/dashboard');
            const freshData = await response.json();
            
            // Update cache and state
            await saveToDB('dashboard', freshData);
            setMovieData(freshData);
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          setIsLoading(false);
        }
      };

      fetchData();
    }, []);

    // Memoized handlers
    const handleNavigation = React.useCallback((movieId: string) => {
      navigate(`/moviedetail/${movieId}`);
    }, [navigate]);

    // Memoized data transformations
    const movieSections = React.useMemo(() => ({
      highlights: movieData.highlighted.map(movie => ({
        image: movie.poster_url,
        title: movie.title,
        description: movie.description,
        onClick: () => handleNavigation(movie.id),
      })),
      newReleases: movieData.newReleases.map(movie => ({
        image: movie.poster_url,
        title: movie.title,
        description: movie.description,
        card_id: movie.id,
      })),
      comingSoon: movieData.comingSoon.map(movie => ({
        image: movie.poster_url,
        title: movie.title,
        description: movie.description,
        card_id: movie.id,
      })),
    }), [movieData, handleNavigation]);

    if (isLoading) {
      return (
        <div className="animate-pulse space-y-4">
          <div className="h-48 bg-gray-700 rounded-lg"></div>
          <div className="h-48 bg-gray-700 rounded-lg"></div>
          <div className="h-48 bg-gray-700 rounded-lg"></div>
        </div>
      );
    }

    return (
      <div className="min-h-screen w-full " style={{
        background: 'linear-gradient(0deg, rgba(108,71,219,1) 1%, rgba(16,10,48,1) 35%)'
      }}>
        {isOffline && (
          <div className="fixed top-0 left-0 right-0 bg-yellow-500 text-white text-center py-2 z-50">
            You're offline. Showing cached content.
          </div>
        )}

        <header className="flex justify-between items-center px-6 py-4">
          <img 
            src="/Mask group.png" 
            alt="Profile" 
            className="h-8 w-8 rounded-full"
            width="32"
            height="32"
          />
          <img 
            src="/Figma_movie.png" 
            alt="Figma Movie" 
            className="h-8"
            width="auto"
            height="32"
            fetchPriority="high"
          />
          <img 
            src="/notification 1.png" 
            alt="Notifications" 
            className="h-8 w-8 cursor-pointer" 
            onClick={() => navigate('/notifications')}
            width="32"
            height="32"
          />
        </header>

        <main className="px-4 space-y-8">
          <section className='text-left'>
            <h3 className="text-white text-xl font-normal mb-4">• Highlights</h3>
            <div className='rounded-2xl overflow-hidden'>
              <Caraousel 
                slides={movieSections.highlights} 
                interval={5000} 
                width="100%" 
                height="176px" 
              />
            </div>
          </section>

          <section>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-white text-xl font-normal">• New Movies</h3>
              <button className="text-purple-400 text-sm">See All</button>
            </div>
            <CardSlider
              cardsData={movieSections.newReleases} 
              cardWidth="12rem" 
              cardHeight="18rem"
              onClick={(index: number) => handleNavigation(movieData.newReleases[index].id)}
            />
          </section>

          <section>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-white text-xl font-normal">• Coming Soon</h3>
              <button className="text-purple-400 text-sm">See All</button>
            </div>
            <CardSlider
              cardsData={movieSections.comingSoon} 
              cardWidth="12rem" 
              cardHeight="18rem"
              onClick={(index: number) => handleNavigation(movieData.comingSoon[index].id)}
            />
          </section>
        </main>

        <Footer className="fixed bottom-0 w-full flex justify-around bg-black bg-opacity-90 px-4 py-3" rounded={true}>
          <Icon URL="/heart 1.png" className="w-8 h-8" imgClassName="w-6 h-6" iconColor="white" />
          <Icon URL="/Home.png" className="w-8 h-8" imgClassName="w-6 h-6" iconColor="white" />
          <Icon URL="/ticketIcon.png" className="w-8 h-8" imgClassName="w-6 h-6" iconColor="white" />
        </Footer>
      </div>
    );
  };

  export default React.memo(HomeLayout);