
export interface Vegetable {
  id: number;
  name: string;
  metro: number;
  silpo: number;
  atb: number;
  unit: string;
}

export const vegetables: Vegetable[] = [
  {
    id: 1,
    name: "Картопля",
    metro: 16.50,
    silpo: 15.90,
    atb: 14.50,
    unit: "кг"
  },
  {
    id: 2,
    name: "Морква",
    metro: 12.90,
    silpo: 11.50,
    atb: 10.90,
    unit: "кг"
  },
  {
    id: 3,
    name: "Буряк",
    metro: 14.20,
    silpo: 13.90,
    atb: 12.50,
    unit: "кг"
  },
  {
    id: 4,
    name: "Цибуля",
    metro: 18.90,
    silpo: 17.50,
    atb: 16.90,
    unit: "кг"
  },
  {
    id: 5,
    name: "Часник",
    metro: 89.90,
    silpo: 86.50,
    atb: 82.90,
    unit: "кг"
  },
  {
    id: 6,
    name: "Помідори",
    metro: 42.90,
    silpo: 39.90,
    atb: 38.50,
    unit: "кг"
  },
  {
    id: 7,
    name: "Огірки",
    metro: 38.50,
    silpo: 37.90,
    atb: 36.50,
    unit: "кг"
  },
  {
    id: 8,
    name: "Перець",
    metro: 65.90,
    silpo: 62.50,
    atb: 59.90,
    unit: "кг"
  },
  {
    id: 9,
    name: "Капуста",
    metro: 16.90,
    silpo: 15.90,
    atb: 14.50,
    unit: "кг"
  },
  {
    id: 10,
    name: "Кабачки",
    metro: 28.90,
    silpo: 26.50,
    atb: 24.90,
    unit: "кг"
  }
];

export const lastUpdated = "2025-05-11T09:00:00";
