import { ObjectId } from 'mongoose';
import { Bicycle } from './bicycle.interface';
import { Cyclist } from './cyclist.interface';

export interface Case {
	_id?: string;
	caseNumber?: number;
	createdTime: Date | string;
	status: string;
	cyclist: Cyclist | ObjectId | undefined;
	technician: ObjectId | undefined;
	bicycle: ObjectId | Bicycle | undefined;
	type: string;
	tags: string[];
	order?: ObjectId;
	note?: Note[];
	supportTime: SupportTime;
	interventionDetails: InterventionDetails;
	videoURL?: string;
}

export interface SupportTime {
	slotName: string;
	slotTime: string;
	timeStamp: Date | string;
}
export interface InterventionDetails {
	firstCall: string | Date;
	followUpCall: string | Date;
	supportQuality: Number;
}
export interface Note {
	text: string;
	timeStamp: Date;
}
