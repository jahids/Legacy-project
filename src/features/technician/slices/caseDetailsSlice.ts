import { createSlice } from '@reduxjs/toolkit';
import { Case } from '../../../interfaces/case.interface';

const initialState: Case = {
	_id: '',
	caseNumber: 0,
	createdTime: '',
	status: '',
	cyclist: undefined,
	technician: undefined,
	bicycle: undefined,
	type: '',
	tags: [],
	order: undefined,
	note: [],
	supportTime: {
		slotName: '',
		slotTime: '',
		timeStamp: '',
	},
	interventionDetails: {
		firstCall: '',
		followUpCall: '',
		supportQuality: 0,
	},
	videoURL: '',
};

const caseDetailsSlice = createSlice({
	name: 'caseDetails',
	initialState,
	reducers: {
		createDetailedCase: (state, action) => {
			return { ...state, ...action.payload };
		},
	},
});

export const { createDetailedCase } = caseDetailsSlice.actions;
export default caseDetailsSlice.reducer;
