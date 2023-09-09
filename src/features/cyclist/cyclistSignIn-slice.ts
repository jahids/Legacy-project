import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface SigninInputState {
	email: string;
	password: string;
}
// type getKeys<T> = keyof T;
// type ObjectKeys = getKeys<SigninInputState>;

const initialState: SigninInputState = {
	email: '',
	password: '',
};
const signinInputSlice = createSlice({
	name: 'signInInput',
	initialState,
	reducers: {
		signin: (state, action) => {
			return { ...state, ...action.payload };
		},
	},
});

export const { signin } = signinInputSlice.actions;
export default signinInputSlice.reducer;
