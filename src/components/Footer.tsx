
import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-ukrainian-green text-white py-6 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h2 className="text-xl font-bold flex items-center">
              <svg className="h-6 w-6 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 10C20 13.3137 16 20 12 20C8 20 4 13.3137 4 10C4 6.68629 7.58172 4 12 4C16.4183 4 20 6.68629 20 10Z" 
                  fill="#ffd700" stroke="currentColor" strokeWidth="2"/>
                <path d="M12 5C12 5 8 8 8 11C8 14 10 16 12 16" 
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              Овочеві Ціни
            </h2>
            <p className="text-sm mt-1">Акутальні ціни на овочі в Івано-Франківську</p>
          </div>
          
          <div className="text-center md:text-right">
            <p className="text-sm">© {currentYear} Овочеві Ціни. Усі права захищено.</p>
            <p className="text-xs mt-1 text-gray-300">
              Дані збираються з офіційних сайтів супермаркетів.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
