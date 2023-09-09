import { combineReducers } from 'redux';
import bikeDetailsSlice from './bikeDetails-slice';
import commuteDetailsSlice from './commuteDetails-slice';
import recreationalCommuteSlice from './recreationalCommute-slice';

const rootSetBikeReducer = combineReducers({
  bikeDetails: bikeDetailsSlice,
  dailyCommute: commuteDetailsSlice,
  recreationalCommute: recreationalCommuteSlice,
});

export default rootSetBikeReducer;
