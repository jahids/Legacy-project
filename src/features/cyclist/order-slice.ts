import { createSlice } from '@reduxjs/toolkit';
import mongoose, { Types } from 'mongoose';

interface OrderDetails {
  bicycleParts: Types.ObjectId[];
  deliveryAddress: string;
  contactNumber: string;
  note: string;
  slot: string;
  totalPrice: number;
}
const initialState: OrderDetails = {
  bicycleParts: [],
  deliveryAddress: '',
  contactNumber: '',
  note: '',
  slot: '',
  totalPrice: 0,
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    delivery: (state, action) => {
      return { ...state, ...action.payload };
    },
    time: (state, action) => {
      return { ...state, ...action.payload };
    },
    totalPrice: (state, action) => {
      return { ...state, totalPrice: action.payload };
    },
    bicycleParts: (state, action) => {
      return { ...state, bicycleParts: action.payload };
    },
  },
});

export const { delivery, time, totalPrice, bicycleParts } = orderSlice.actions;
export default orderSlice.reducer;
