import { Car } from "lucide-react";

export interface CarBrand {
  name: string;
  icon: string; // emoji for simplicity
}

export const CAR_BRANDS: CarBrand[] = [
  { name: "Toyota", icon: "🚗" },
  { name: "Honda", icon: "🚙" },
  { name: "BMW", icon: "🏎️" },
  { name: "Mercedes-Benz", icon: "🚘" },
  { name: "Audi", icon: "🏁" },
  { name: "Tesla", icon: "⚡" },
  { name: "Ford", icon: "🛻" },
  { name: "Chevrolet", icon: "🚐" },
  { name: "Nissan", icon: "🚗" },
  { name: "Hyundai", icon: "🚙" },
  { name: "Kia", icon: "🚘" },
  { name: "Volkswagen", icon: "🏎️" },
  { name: "Lexus", icon: "🚘" },
  { name: "Porsche", icon: "🏎️" },
  { name: "Jeep", icon: "🛻" },
  { name: "Other", icon: "🚗" },
];
