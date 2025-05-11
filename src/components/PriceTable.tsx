
import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { uk } from 'date-fns/locale';
import { useQuery } from '@tanstack/react-query';
import { vegetables, lastUpdated } from '../data/prices';
import { getVegetablePrices, getLastUpdated, VegetablePriceRecord } from '../lib/supabase';
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const PriceTable: React.FC = () => {
  const { toast } = useToast();
  const [isOffline, setIsOffline] = useState(false);
  
  // Запит даних з Supabase
  const { 
    data: veggies, 
    isLoading: isLoadingVeggies,
    isError: isVeggiesError 
  } = useQuery({
    queryKey: ['vegetable-prices'],
    queryFn: getVegetablePrices,
  });
  
  // Запит часу останнього оновлення
  const { 
    data: lastUpdateTime, 
    isLoading: isLoadingUpdate,
    isError: isUpdateError 
  } = useQuery({
    queryKey: ['last-update'],
    queryFn: getLastUpdated,
  });

  // Показуємо локальні дані, якщо не вдалося отримати дані з Supabase
  useEffect(() => {
    if (isVeggiesError || isUpdateError) {
      setIsOffline(true);
      toast({
        title: "Неможливо отримати актуальні ціни",
        description: "Показуємо останні збережені дані",
        variant: "destructive",
      });
    }
  }, [isVeggiesError, isUpdateError, toast]);

  // Використовуємо онлайн дані або локальні дані за потреби
  const displayVeggies = (!isOffline && veggies && veggies.length > 0) 
    ? veggies as VegetablePriceRecord[]
    : vegetables;
  
  const displayLastUpdated = (!isOffline && lastUpdateTime) 
    ? lastUpdateTime 
    : lastUpdated;
  
  const formattedDate = format(new Date(displayLastUpdated), "d MMMM yyyy, HH:mm", { locale: uk });
  
  // Функція для визначення найнижчої ціни в рядку
  const getLowestPrice = (metro: number, silpo: number, atb: number) => {
    return Math.min(metro, silpo, atb);
  };

  // Рендер скелетона під час завантаження
  if (!isOffline && (isLoadingVeggies || isLoadingUpdate)) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Skeleton className="h-8 w-64 mb-2" />
          <Skeleton className="h-4 w-48" />
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-ukrainian-green text-white">
              <TableRow>
                {Array(4).fill(0).map((_, i) => (
                  <TableHead key={i} className="py-3 px-4">
                    <Skeleton className="h-6 w-full" />
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array(10).fill(0).map((_, i) => (
                <TableRow key={i}>
                  {Array(4).fill(0).map((_, j) => (
                    <TableCell key={j} className="py-3 px-4">
                      <Skeleton className="h-4 w-full" />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-ukrainian-green mb-2">Актуальні ціни на овочі</h2>
        <p className="text-gray-600">
          Останнє оновлення: <span className="font-medium">{formattedDate}</span>
          {isOffline && (
            <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
              Офлайн режим
            </span>
          )}
        </p>
      </div>
      
      <div className="overflow-x-auto">
        <Table className="min-w-full bg-white rounded-lg overflow-hidden shadow-lg">
          <TableHeader className="bg-ukrainian-green text-white">
            <TableRow>
              <TableHead className="py-3 px-4 text-left text-white">Овоч</TableHead>
              <TableHead className="py-3 px-4 text-center text-white">
                <div className="flex items-center justify-center">
                  <span className="mr-2">МЕТРО</span>
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Metro_logo.svg/150px-Metro_logo.svg.png" 
                    alt="Metro" className="h-6 hidden sm:inline-block" />
                </div>
              </TableHead>
              <TableHead className="py-3 px-4 text-center text-white">
                <div className="flex items-center justify-center">
                  <span className="mr-2">Сільпо</span>
                  <img src="https://upload.wikimedia.org/wikipedia/commons/9/99/Silpo_2022.png" 
                    alt="Silpo" className="h-6 hidden sm:inline-block" />
                </div>
              </TableHead>
              <TableHead className="py-3 px-4 text-center text-white">
                <div className="flex items-center justify-center">
                  <span className="mr-2">АТБ</span>
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/ATB_market_2017_logo.svg/150px-ATB_market_2017_logo.svg.png" 
                    alt="ATB" className="h-6 hidden sm:inline-block" />
                </div>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y divide-gray-200">
            {displayVeggies.map((veggie) => {
              const lowestPrice = getLowestPrice(veggie.metro, veggie.silpo, veggie.atb);
              
              return (
                <TableRow key={veggie.id} className="hover:bg-gray-50">
                  <TableCell className="py-3 px-4 font-medium">{veggie.name}</TableCell>
                  <TableCell className={`py-3 px-4 text-center ${veggie.metro === lowestPrice ? "text-ukrainian-green font-bold" : ""}`}>
                    {veggie.metro.toFixed(2)} грн/{veggie.unit}
                  </TableCell>
                  <TableCell className={`py-3 px-4 text-center ${veggie.silpo === lowestPrice ? "text-ukrainian-green font-bold" : ""}`}>
                    {veggie.silpo.toFixed(2)} грн/{veggie.unit}
                  </TableCell>
                  <TableCell className={`py-3 px-4 text-center ${veggie.atb === lowestPrice ? "text-ukrainian-green font-bold" : ""}`}>
                    {veggie.atb.toFixed(2)} грн/{veggie.unit}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      <div className="mt-6 bg-yellow-50 border border-ukrainian-yellow p-4 rounded-md">
        <h3 className="font-bold text-lg mb-2 text-ukrainian-green">Примітка:</h3>
        <p className="text-gray-700">
          Ціни наведені в гривнях за кілограм. Найнижча ціна виділена зеленим кольором.
          Ціни оновлюються щодня о 09:00 ранку. Ціни можуть відрізнятися в різних магазинах мережі.
        </p>
      </div>
    </div>
  );
};

export default PriceTable;
