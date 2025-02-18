import React from 'react';
import { Icon, Stepper } from 'movie-design-hv';
import { Caraousel } from 'movie-design-hv';

const SubNav = () => {
  return (
    <nav className="fixed top-0 w-full  bg-opacity-50 z-50">
      <div className="grid grid-cols-3 items-center px-4 py-3">
        <div className="justify-self-start">
        <Icon
          URL="/back.png" // Path to your downloaded
          iconColor="white"
          bgColor='white'
          iconBorderClr="transparent"
          rounded="rounded-lg"
          className="cursor-pointer h-fit "
          onClick={() => window.history.back()} // Navigate back to the previous page
        />
        </div>
        <div className="justify-self-center">
          {/* <img 
            src="/popcorn.png" 
            alt="Popcorn" 
            className="w-8 h-8"
          /> */}
          <Stepper currentStep={1} totalStep={4} className="gap-x-2" />
        </div>
        <div className="justify-self-end">
          {/* Empty div for spacing */}
        </div>
      </div>
    </nav>
  );
};

export default SubNav;