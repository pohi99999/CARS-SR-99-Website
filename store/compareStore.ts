import { create } from "zustand";

export type CompareCar = {
  id: string;
  marka: string;
  modell: string;
  ar: string;
  futasteljesitmeny: string;
  uzemanyag: string;
  image: string;
};

type CompareState = {
  cars: CompareCar[];
  addCar: (car: CompareCar) => void;
  removeCar: (id: string) => void;
  clearCompare: () => void;
};

export const useCompareStore = create<CompareState>((set) => ({
  cars: [],
  addCar: (car) =>
    set((state) => {
      if (state.cars.some((item) => item.id === car.id)) {
        return state;
      }
      if (state.cars.length >= 3) {
        return state;
      }
      return { cars: [...state.cars, car] };
    }),
  removeCar: (id) =>
    set((state) => ({
      cars: state.cars.filter((item) => item.id !== id),
    })),
  clearCompare: () => set({ cars: [] }),
}));
