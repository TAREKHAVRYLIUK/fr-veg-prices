
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PriceTable from '../components/PriceTable';

const Index: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        <div className="container mx-auto py-4 px-4">
          <div className="bg-ukrainian-yellow bg-opacity-10 rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-ukrainian-green mb-4">
              Порівнюйте ціни на овочі в Івано-Франківську
            </h2>
            <p className="text-gray-700">
              Наш сервіс щодня о 09:00 оновлює інформацію про ціни на овочі 
              в найпопулярніших супермаркетах Івано-Франківська: Метро, Сільпо та АТБ.
              Тут ви завжди знайдете актуальні дані для економного планування покупок.
            </p>
          </div>
          
          <PriceTable />
          
          <div className="mt-10 mb-8">
            <h3 className="text-xl font-bold text-ukrainian-green mb-4">Як використовувати порівняння цін?</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-5 rounded-lg shadow-md border-l-4 border-ukrainian-green">
                <h4 className="font-bold text-lg mb-2">Порівнюйте ціни</h4>
                <p className="text-gray-600">
                  Знаходьте найкращі пропозиції серед різних мереж супермаркетів та економте на щоденних покупках.
                </p>
              </div>
              
              <div className="bg-white p-5 rounded-lg shadow-md border-l-4 border-ukrainian-yellow">
                <h4 className="font-bold text-lg mb-2">Планування бюджету</h4>
                <p className="text-gray-600">
                  Використовуйте актуальні ціни для ефективного планування бюджету на продукти харчування.
                </p>
              </div>
              
              <div className="bg-white p-5 rounded-lg shadow-md border-l-4 border-ukrainian-blue">
                <h4 className="font-bold text-lg mb-2">Щоденні оновлення</h4>
                <p className="text-gray-600">
                  Отримуйте свіжу інформацію про ціни кожного ранку та завжди будьте в курсі змін на ринку.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
