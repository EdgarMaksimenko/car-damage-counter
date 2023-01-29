import { createSlice, PayloadAction } from '@reduxjs/toolkit';



export interface ICustomParts {
  name: string;
  count: number;
  partPrice: number;
  workPrice: number;
  totalPrice: number;
}

interface ITotalCustomState {
  isOpened: boolean;
  carCustomParts: ICustomParts[];
  total: number;
}

const initialState: ITotalCustomState = {
  isOpened: false,
  carCustomParts: [],
  total: 0
}

const totalCustomSlice = createSlice({
  name: 'totalCustom',
  initialState,
  reducers: {
    toggleCustomTotal(state){
      state.isOpened = !state.isOpened;
    },
    clearCustomTotal(state){
      state.carCustomParts = [];
      state.total = 0;
      state.isOpened = false;
    },
    addCustomPart(state, action: PayloadAction<ICustomParts>){
      state.carCustomParts.push(action.payload);
      if(action.payload.count === 0 && action.payload.workPrice === 0){
        action.payload.count += 1;
      }
      state.total = state.carCustomParts.reduce((acc, cur) => acc + cur.totalPrice, 0);
    },
    changeCustomPartPrice(state, action: PayloadAction<{name: string, price: number}>){
      let current = state.carCustomParts.find(item => item.name === action.payload.name);
      if(current!.count === 0 && current!.workPrice > 0){
        current!.count += 1;
      }
      current!.partPrice += action.payload.price;
      current!.totalPrice = (current!.count * current!.partPrice) + current!.workPrice;
      state.total = state.carCustomParts.reduce((acc, cur) => acc + cur.totalPrice, 0);
    },
    changeCustomPartCount(state, action: PayloadAction<{name: string, price: number}>){
      let current = state.carCustomParts.find(item => item.name === action.payload.name);
      current!.count += 1;
      current!.totalPrice = (current!.count * current!.partPrice) + current!.workPrice;
      state.total = state.carCustomParts.reduce((acc, cur) => acc + cur.totalPrice, 0);
    },
    changeCustomPartRepair(state, action: PayloadAction<{name: string, price: number}>){
      let current = state.carCustomParts.find(item => item.name === action.payload.name);
      current!.workPrice += action.payload.price;
      current!.totalPrice = (current!.count * current!.partPrice) + current!.workPrice;
      state.total = state.carCustomParts.reduce((acc, cur) => acc + cur.totalPrice, 0);
    },
    removeCustomPart(state, action: PayloadAction<string>){
      let currentIndex = state.carCustomParts.findIndex(item => item.name === action.payload);
      state.total -= state.carCustomParts[currentIndex].totalPrice;
      state.carCustomParts.splice(currentIndex, 1);
    },
    
  },
})

export const {toggleCustomTotal, addCustomPart, changeCustomPartPrice, changeCustomPartCount, changeCustomPartRepair, removeCustomPart, clearCustomTotal} = totalCustomSlice.actions;
export default totalCustomSlice.reducer;