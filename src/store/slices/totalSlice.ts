import { createSlice, PayloadAction } from '@reduxjs/toolkit';


export interface IParts {
  name: string;
  quality: string;
  count: number;
  partPrice: number;
  workPrice: number;
  totalPrice: number;
}

interface ITotalState {
  isOpened: boolean;
  carParts: IParts[];
  total: number;
}

const initialState: ITotalState = {
  isOpened: false,
  carParts: [],
  total: 0
}



const totalSlice = createSlice({
  name: 'total',
  initialState,
  reducers: {
    toggleTotal(state){
      state.isOpened = !state.isOpened;
    },
    clearTotal(state){
      state.carParts = [];
      state.total = 0;
      state.isOpened = false;
    },
    addPart(state, action: PayloadAction<IParts>){
      state.carParts.push(action.payload);
      state.total += action.payload.partPrice;
    },
    addSamePart(state, action: PayloadAction<string>){
      let current = state.carParts.find(item => item.name === action.payload);
      current!.count += 1;
      current!.totalPrice += current!.partPrice;
      state.total += current!.partPrice;
    },
    addWork(state, action: PayloadAction<{name: string, price: number}>){
      let current = state.carParts.find(item => item.name === action.payload.name);
      current!.workPrice += action.payload.price;
      current!.totalPrice += action.payload.price;
      state.total += action.payload.price;
    },
    removePart(state, action: PayloadAction<string>){
      let currentIndex = state.carParts.findIndex(item => item.name === action.payload);
      state.total -= state.carParts[currentIndex].totalPrice;
      state.carParts.splice(currentIndex, 1);
    }
  },
})

export const {toggleTotal, clearTotal, addPart, addSamePart, addWork, removePart} = totalSlice.actions;
export default totalSlice.reducer;