import { ObjectId } from 'mongoose';

export interface Bicycle {
	bicycleParts: any[];
	brand: string;
	dailyCommute: {
		days: string[];
		unpavedRoad: number;
		totalDistance: number;
		_id: string | ObjectId;
	};
	isRevised: boolean;
	model: string;
	purchaseMonth: number;
	purchaseYear: number;
	recreationalCommute: {
		days: string[];
		activityType: string[];
		lengthOfRide: number;
		_id: string | ObjectId;
	};
	revisionMonth: number | null;
	revisionYear: number | null;
	serialNumber: string;
	totalHealth: number;
	__v: number;
	_id: string | ObjectId;
}
