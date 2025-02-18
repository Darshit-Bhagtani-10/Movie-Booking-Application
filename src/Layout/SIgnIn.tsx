import React, { useState } from 'react';
import { Button, Input } from 'movie-design-hv';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';

interface SignInPageProps {
  backgroundImage?: string;
  logoImage?: string;
}

const AUTH_SERVICE_URL = process.env.REACT_APP_AUTH_SERVICE_URL;

const SignInPage: React.FC<SignInPageProps> = ({
  backgroundImage = '/bgImage.jpg',
  logoImage = '/Figma_movie.png',
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignIn = async (e: React.MouseEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error('Please fill out both email and password fields.', {
        position: 'top-right',
      });
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(`${AUTH_SERVICE_URL}/login`, { email, password });

      const { accessToken, refreshToken, userId } = response.data;

      // Save tokens to localStorage or cookies
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('userId', userId);

      toast.success('Login successful! Redirecting to home...', {
        position: 'top-right',
      });

      // Navigate to home page after login
      setTimeout(() => navigate('/home'), 2000);
    } catch (error: any) {
      toast.error(
        error.response?.data?.error || 'Login failed. Please check your credentials.',
        {
          position: 'top-right',
        }
      );
    } finally {
      setLoading(false);
    }
  };

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
      <ToastContainer />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <div className="flex flex-col items-center space-y-6 mb-20 fixed bottom-60">
        <img src={logoImage} alt="Figma Movie" className="h-16 object-contain" />
      </div>

      <div className="relative z-10 w-full max-w-md space-y-8 bottom-10">
        {/* Form Section */}
        <div className="space-y-5 mt-12">
          <Input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(value) => setEmail(value)}
            className="w-full bg-[#4D4D4D] border border-gray-600 text-white rounded-lg p-3 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
          />

          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(value) => setPassword(value)}
            className="w-full bg-[#4D4D4D] border border-gray-600 text-white rounded-lg p-3 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
          />

          <Button
            type="primary"
            label={loading ? 'Signing In...' : 'Sign In'}
            onClick={handleSignIn}
            className="w-full"
            size="large"
            rounded
          
          />

          <div className="text-center">
            <p className="text-white text-sm">
              Don’t have an account?{' '}
              <button
                className="text-purple-400 hover:text-purple-300"
                onClick={() => navigate('/signup')}
              >
                Sign Up Now!
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
