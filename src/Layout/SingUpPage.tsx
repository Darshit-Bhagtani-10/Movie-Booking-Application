import React, { useState } from 'react';
import { Button, Input } from 'movie-design-hv';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';

interface SignInPageProps {
  backgroundImage?: string;
  logoImage?: string;
}

const AUTH_SERVICE_URL = process.env.REACT_APP_AUTH_SERVICE_URL;

const SignOutLayout: React.FC<SignInPageProps> = ({
  backgroundImage = '/bgImage.jpg',
  logoImage = '/Figma_movie.png',
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e: React.MouseEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (!showOtpInput) {
        // Initial registration step - send email and password
        if (!email || !password) {
          toast.error('Please fill out both email and password fields.');
          return;
        }

        const response = await axios.post(`${AUTH_SERVICE_URL}/register`, {
          email,
          password
        });

        if (response.data.message.includes('OTP sent')) {
          setShowOtpInput(true);
          toast.success('OTP sent to your email. Please check and verify.');
        }
      } else {
        // OTP verification step - send email, password, and OTP
        if (!otp) {
          toast.error('Please enter the verification code.');
          return;
        }

        const response = await axios.post(`${AUTH_SERVICE_URL}/register`, {
          email,
          password,
          otp
        });

        // If registration is successful
        if (response.data.userId) {
          // Store the tokens
          localStorage.setItem('accessToken', response.headers.authorization?.split(' ')[1] || '');
          localStorage.setItem('refreshToken', response.data.refreshToken);
          
          toast.success('Registration successful! Redirecting...');
          setTimeout(() => navigate('/home'), 2000);
        }
      }
    } catch (err: any) {
      toast.error(err.response?.data?.error || 'Registration failed. Please try again.');
    } finally {
      setIsSubmitting(false);
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
          {!showOtpInput ? (
            <>
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
            </>
          ) : (
            <Input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(value) => setOtp(value)}
              className="w-full bg-[#4D4D4D] border border-gray-600 text-white rounded-lg p-3 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
            />
          )}

          <Button
            type="primary"
            label={showOtpInput ? 'Verify OTP' : 'Sign Up'}
            onClick={handleRegister}
            className={`w-full ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
            size="large"
            rounded
          />

          <div className="text-center">
            <p className="text-white text-sm">
              Already have an account?{' '}
              <button
                className="text-purple-400 hover:text-purple-300"
                onClick={() => navigate('/')}
              >
                Sign In Now!
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignOutLayout;



// const handleSignIn = (e: React.MouseEvent) => {
  //   e.preventDefault();

  //   if (email === VALID_EMAIL && password === VALID_PASSWORD) {
  //     setShowVerification(true);
  //   } else {
  //     alert('Invalid email or password');
  //   }
  // };

  // const handleVerification = (e: React.MouseEvent) => {
  //   e.preventDefault();
  //   console.log('clicked')

  //   if (verificationCode === VALID_VERIFICATION) {
  //     navigate('/home');
  //   } else {
  //     alert('Invalid verification code');
  //   }
  // };
  