import { ObjectId } from 'mongoose';
import { Case } from './case.interface';

export interface Cyclist {
	bicycle: string | ObjectId;
	cases: Case[];
	email: string;
	homeAddress: string;
	name: string;
	orders: string[] | ObjectId[];
	password: string;
	phone: string;
	plan: string;
	role: string;
	workAddress: string;
	__v: number;
	_id: ObjectId | string;
}
