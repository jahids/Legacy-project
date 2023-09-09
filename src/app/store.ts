import { configureStore } from '@reduxjs/toolkit';
import inputSliceReducer from '../features/cyclist/cyclistSignup-slice';
import signinInputSliceReducer from '../features/cyclist/cyclistSignIn-slice';
import commuteSliceReducer from '../features/cyclist/commuteDetails-slice';
import recreationalSliceReducer from '../features/cyclist/recreationalCommute-slice';
import bikeInputSliceReducer from '../features/cyclist/bikeDetails-slice';
import rootSetBikeReducer from '../features/cyclist/setUpBike-slice';
import technicianSlice from '../features/technician/slices/technicianSlice';
import orderSliceReducer from '../features/cyclist/order-slice';
import technicianCasesSlice from '../features/technician/slices/technicianCasesSlice';
import casesPresentationSlice from '../features/technician/slices/casesPresentationSlice';
import caseDetailsSlice from '../features/technician/slices/caseDetailsSlice';

export const store = configureStore({
	reducer: {
		input: inputSliceReducer,
		signInInput: signinInputSliceReducer,
		commute: commuteSliceReducer,
		recreation: recreationalSliceReducer,
		bikeDetails: bikeInputSliceReducer,
		rootSetBikeReducer: rootSetBikeReducer,
		order: orderSliceReducer,
		technician: technicianSlice,
		technicianCases: technicianCasesSlice,
		presentableCases: casesPresentationSlice,
		caseDetails: caseDetailsSlice,
	},
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
