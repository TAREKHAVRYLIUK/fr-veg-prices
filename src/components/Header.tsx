
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-ukrainian-green text-white shadow-md">
      <div className="container mx-auto py-4 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <div className="flex items-center">
              <svg 
                className="h-8 w-8 mr-3" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M20 10C20 13.3137 16 20 12 20C8 20 4 13.3137 4 10C4 6.68629 7.58172 4 12 4C16.4183 4 20 6.68629 20 10Z" 
                  fill="#ffd700" stroke="currentColor" strokeWidth="2"/>
                <path d="M12 5C12 5 8 8 8 11C8 14 10 16 12 16" 
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              <h1 className="text-xl md:text-2xl font-bold">Овочеві Ціни</h1>
            </div>
            <span className="hidden md:inline-block ml-2 text-ukrainian-yellow">Івано-Франківськ</span>
          </div>
          <div className="text-sm md:text-base">
            <p>Щоденне оновлення цін на овочі</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
