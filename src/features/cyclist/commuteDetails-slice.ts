import { createSlice } from '@reduxjs/toolkit';
interface CommuteState {
  days: string[];
  unpavedRoad: number;
  totalDistance: number;
}
const initialState: CommuteState = {
  days: [],
  unpavedRoad: 0,
  totalDistance: 5,
};

const commuteSlice = createSlice({
  name: 'dailyCommute',
  initialState,
  reducers: {
    commuteDays: (state, action) => {
      return { ...state, ...action.payload };
    },
    unpavedRoad: (state, action) => {
      return { ...state, ...action.payload };
    },
    totalDistance: (state, action) => {
      console.log(action.payload);
      return { ...state, ...action.payload };
    },
  },
});
export const { commuteDays, unpavedRoad, totalDistance } = commuteSlice.actions;
export default commuteSlice.reducer;
