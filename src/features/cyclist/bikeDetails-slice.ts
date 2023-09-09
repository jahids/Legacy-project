import { PayloadAction, createSlice } from '@reduxjs/toolkit';
interface BikeInputState {
	brand: string;
	model: string;
	serialNumber: number;
	purchaseMonth: number;
	purchaseYear: number;
	isRevised: boolean;
	revisionMonth: number;
	revisionYear: number;
}
const initialState: BikeInputState = {
	brand: '',
	model: '',
	serialNumber: 0,
	purchaseMonth: 0,
	purchaseYear: 0,
	isRevised: false,
	revisionMonth: 0,
	revisionYear: 0,
};

const bikeInputSlice = createSlice({
	name: 'bikeInput',
	initialState,
	reducers: {
		bikeDetails: (state, action) => {
			return { ...state, ...action.payload };
		},
	},
});
export const { bikeDetails } = bikeInputSlice.actions;
export default bikeInputSlice.reducer;
