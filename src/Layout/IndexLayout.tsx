import React from 'react';
import { Button, Divider } from 'movie-design-hv';
import { useNavigate } from 'react-router-dom';

interface IndexLayoutProps {
  backgroundImage?: string;
  logoImage?: string;
}

const IndexLayout: React.FC<IndexLayoutProps> = ({
  backgroundImage = '/bgImage.jpg',
  logoImage = '/Figma_movie.png'
}) => {
  const navigate = useNavigate();

  return (
    <div 
      className="w-full h-screen flex flex-col items-center justify-end px-4"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Overlay
      <div className="absolute inset-0 bg-black/50 " /> */}

      {/* Content */}

        {/* Logo Section */}
        <div className="flex flex-col items-center space-y-6 mb-20 fixed bottom-60">
          <img 
            src={logoImage} 
            alt="Figma Movie" 
            className="h-16 object-contain"
          />

        </div>
        <div className="relative z-10 w-full max-w-md space-y-8 bottom-10">
        {/* Buttons Section */}
        <div className="space-y-4 mt-12">
          <Button
            type="primary"
            label="Sign In"
            onClick={() => navigate('/signin')}
            className="w-full"
            size="large"
            rounded
          />

          <Divider
            text="or"
            width="w-full"
            className="text-gray-300 flex my-[10px]"
            textClassName="text-gray-400"
          />

          <Button
            type="primary"
            label="Sign Up"
            onClick={() => navigate('/signout')}
            className="w-full"
            size="large"
            rounded
          />
        </div>
      </div>
    </div>
  );
};

export default IndexLayout;