import { create } from "zustand";

interface CounterState {
	isAuth: boolean;
	setAuth: (value: boolean) => void;
}

export const useStore = create<CounterState>((set) => ({
	isAuth: false,
	setAuth: (value: boolean) => set({ isAuth: value }),
}));
