/* eslint-disable  */

import axios from "axios";
import CustomInstance from "../lib/axios";
import { BASE_URL } from "../../config";
// const BASE_URL = BASE_URL;
const token = localStorage.getItem("accessToken");

// export const setUpBikeInfo = async (bikeinfo: any) => {
// 	try {
// 		// const response = await fetch(`${BASE_URL}/cyclist/set-up-bicycle`, {
// 		// 	method: "POST",
// 		// 	credentials: "include",
// 		// 	mode: "cors",
// 		// 	headers: {
// 		// 		"Content-Type": "application/json",
// 		// 		authorization: `Bearer ${token}`,
// 		// 	},
// 		// 	body: JSON.stringify(bikeinfo),
// 		// });
// 		// const bike = await response.json();
// 		// console.log("bike from service", bike);
// 		// return bike;
// 		const data = {
// 			"brand": "BMC",
// 			"model": "Domane",
// 			"serialNumber": 2324234,
// 			"purchaseMonth": 5,
// 			"purchaseYear": 2023,
// 			"isRevised": false,
// 			"revisionMonth": 0,
// 			"revisionYear": 0,
// 			"dailyCommute":[],
// 			"recreationalCommute":[],
// 			"bicycleParts" : '',
// 			'totalHealth': ''
// 		};
// 		const res = await CustomInstance.post(`/cyclist/set-up-bicycle`,data);

// 		console.log(`🎈🎈🎈🎆🎈🎈🎈🎈🎈`,'new  bike created')

// 		return res.data;

// 	} catch (error) {
// 		console.log(error);
// 	}
// };

export const bicycleDamagedPart = async (id: any) => {
	try {
		const response = await axios.get(
			`${BASE_URL}/cyclist/bicycle-damaged-part/${id}`,
			{
				withCredentials: true,
				headers: {
					"Content-Type": "application/json",
					authorization: `Bearer ${token}`,
				},
			}
		);

		const damagedParts = response?.data;
		console.log("damagedParts from service", damagedParts);
		return damagedParts;
	} catch (error) {
		console.log(error);
	}
};

export const bicycle = async (id: any) => {
	try {
		const response = await CustomInstance.get(`/cyclist/bicycle/${id}`);

		const bicycle = response.data;
		console.log("bicycle from service", bicycle);
		return bicycle;
	} catch (error) {
		console.error(error);
		throw error; // Rethrow the error to handle it elsewhere if needed.
	}
};

// export const bicycle = async (id: any) => {
// 	try {
// 		const response = await axios.get(`${BASE_URL}/cyclist/bicycle/${id}`, {
// 			withCredentials: true,
// 			headers: {
// 				"Content-Type": "application/json",
// 				authorization: `Bearer ${token}`,
// 			},
// 		});

// 		const bicycle = response.data;
// 		console.log("bicycle from service", bicycle);
// 		return bicycle;
// 	} catch (error) {
// 		console.log(error);
// 	}
// };

// export const bicycleHealth = async (id: any) => {
// 	try {
// 		const response = await axios.get(
// 			`${BASE_URL}/cyclist/bicycle-health/${id}`,
// 			{
// 				withCredentials: true,
// 				headers: {
// 					"Content-Type": "application/json",
// 					authorization: `Bearer ${token}`,
// 				},
// 			}
// 		);

// 		const bicycle = response.data;
// 		console.log("bicycle from service", bicycle);
// 		return bicycle;
// 	} catch (error) {
// 		console.log(error);
// 	}
// };
// add batch 5
export const bicycleHealth = async (id: any) => {
	try {
		const response = await CustomInstance.get(
			`/cyclist/bicycle-health/${id}`
		);

		const bicycle = response.data;
		console.log("bicycle from service", bicycle);
		return bicycle;
	} catch (error) {
		console.error(error);
		throw error; // Rethrow the error to handle it elsewhere if needed.
	}
};

export const getAllSubpart = async () => {
	try {
		const response = await axios.get(`${BASE_URL}/cyclist/all-subpart`, {
			withCredentials: true,
			headers: {
				"Content-Type": "application/json",
				authorization: `Bearer ${token}`,
			},
		});

		const subparts = response.data;
		console.log("subparts from service", subparts);
		return subparts;
	} catch (error) {
		console.log(error);
	}
};
