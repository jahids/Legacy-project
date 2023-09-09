import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface InputState {
	first: string;
	last: string;
	email: string;
	password: string;
	role: string;
	homeAddress: string;
	workAddress: string;
	phone: string;
	plan: string;
	orders: [];
	cases: [];
}

// type getKeys<T> = keyof T;
// type ObjectKeys = getKeys<InputState>;

const initialState: InputState = {
	first: '',
	last: '',
	email: '',
	password: '',
	role: '',
	homeAddress: '',
	workAddress: '',
	phone: '',
	plan: '',
	orders: [],
	cases: [],
};

const inputSlice = createSlice({
	name: 'input',
	initialState,
	reducers: {
		signup: (state, action) => {
			return { ...state, ...action.payload };
		},
	},
});

export const { signup } = inputSlice.actions;
export default inputSlice.reducer;
