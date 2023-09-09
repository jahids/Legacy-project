import { createSlice } from '@reduxjs/toolkit';
import { ObjectId } from 'mongoose';

export interface Technician {
	name: string;
	email: string;
	password: string;
	role?: string;
	address?: string;
	phone?: string;
	brandsExpertise?: string[];
	subpartExpertise?: ObjectId[];
	workingDays?: string[];
	workingSlots?: string[];
	cases?: ObjectId[];
	wishlist?: string[];
	imageUrl?: string;
}

export const initialState: Technician = {
	name: '',
	email: '',
	password: '',
	role: 'technician',
	address: '',
	phone: '',
	brandsExpertise: [],
	subpartExpertise: [],
	workingDays: [],
	workingSlots: [],
	cases: [],
	wishlist: [],
	imageUrl: '',
};

const technicianSlice = createSlice({
	name: 'technician',
	initialState,
	reducers: {
		createTechnician: (state, action) => {
			return { ...state, ...action.payload };
		},
	},
});

export const { createTechnician } = technicianSlice.actions;
export default technicianSlice.reducer;
