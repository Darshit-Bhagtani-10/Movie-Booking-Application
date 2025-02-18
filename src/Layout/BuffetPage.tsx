import React from 'react';
import SubNav from './popcorn';
import { BuffetCard, Button } from 'movie-design-hv';
import { Footer } from 'movie-design-hv';
import { useNavigate } from 'react-router-dom';

const BuffetPage: React.FC = () => {
  const navigate = useNavigate();

  // Buffet items data
  const buffetItems = [
    {
      imageSrc: '/popcornbuffet.png',
      title: 'Large Menu',
      description: ['Large Popcorn', 'Large Coco Cola (400 ml.)'],
      price: 30,
      initialQuantity: 1,
      maxQuantity: 10,
    },
    {
      imageSrc: '/popcornbuffet.png',
      title: 'Medium Menu',
      description: ['Medium Popcorn', 'Medium Coco Cola (330 ml.)'],
      price: 20,
      initialQuantity: 0,
      maxQuantity: 10,
    },
    {
      imageSrc: '/popcornbuffet.png',
      title: 'Small Menu',
      description: ['Small Popcorn', 'Small Coco Cola (250 ml.)'],
      price: 15,
      initialQuantity: 0,
      maxQuantity: 10,
    },
    {
      imageSrc: '/popcornbuffet.png',
      title: 'M. Double Menu',
      description: [
        'Medium Popcorn (x2)',
        'Medium Coco Cola (330 ml.) (x2)',
      ],
      price: 30,
      initialQuantity: 0,
      maxQuantity: 5,
    },
  ];

  return (
    <div
      className="min-h-screen overflow-hidden w-full"
      style={{
        background: 'linear-gradient(0deg, rgba(108,71,219,1) 1%, rgba(16,10,48,1) 35%)',
      }}
    >
      {/* Sub Navigation */}
      <SubNav />

      {/* Buffet Items */}
      <div className="px-4 mt-20">
        {buffetItems.map((item, index) => (
          <BuffetCard
            key={index}
            imageSrc={item.imageSrc}
            title={item.title}
            description={item.description}
            price={item.price}
            initialQuantity={item.initialQuantity}
            maxQuantity={item.maxQuantity}
            className="mb-6 w-full text-left"
          />
        ))}
      </div>

      

      {/* Footer */}
      <Footer className="fixed bottom-0 flex justify-around items-center w-full bg-black bg-opacity-100  px-4 py-3">
        <div className="price-section flex flex-col justify-center items-center">
          <h3 className="text-white">Total Price</h3>
          <h1 className="text-4xl font-bold text-[#33B528]">$40</h1>
        </div>
        <Button
          btnTextClassName="text-white opacity-100"
          type="primary"
          rounded={true}
          size="small"
          label="Add to Cart"
          onClick={() => navigate('/checkout')}
        />
      </Footer>
    </div>
  );
};

export default BuffetPage;
