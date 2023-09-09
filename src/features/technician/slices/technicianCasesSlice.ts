import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Case } from '../../../interfaces/case.interface';

const initialState: Case[] = [
	{
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
		clientName: '',
	},
];

const technicianCasesSlice = createSlice({
	name: 'technicianCases',
	initialState,
	reducers: {
		createCases: (state, action) => {
			return [...action.payload];
		},
		updateCaseStatus: (state, action: PayloadAction<{ index: number; status: string }>) => {
			const { index, status } = action.payload;
			state[index].status = status;
		},
	},
});

export const { createCases } = technicianCasesSlice.actions;
export const { updateCaseStatus } = technicianCasesSlice.actions;
export default technicianCasesSlice.reducer;
