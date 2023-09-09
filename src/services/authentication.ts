/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-empty */
import axios from "axios";
import CustomInstance from "../lib/axios";
import { baseURL } from "../lib/domain";

// const BASE_URL = 'http://localhost:4000';
const BASE_URL = "http://192.168.68.50:4000";
const token = localStorage.getItem("accessToken");

export const createAccount = async (newUser: any) => {
	console.log("mydata", newUser);

	try {
		const response = await CustomInstance.post("/cyclist/sign-up", newUser);
		// The custom Axios instance will automatically include the bearer token
		// and set the Content-Type to application/json.

		return response.data; // Assuming your response contains JSON data.
	} catch (error) {
		console.error(error);
		throw error; // Rethrow the error to handle it elsewhere if needed.
	}
};

// export const createAccount = async (newUser: any) => {
// 	try {
// 		const response = await fetch(`${BASE_URL}/cyclist/sign-up`, {
// 			method: "POST",
// 			credentials: "include",
// 			mode: "cors",
// 			headers: {
// 				"Content-Type": "application/json",
// 			},
// 			body: JSON.stringify(newUser),
// 		});
// 		const user = await response.json();
// 		// console.log(user);
// 		return user;
// 	} catch (error) {
// 		console.log(error);
// 	}
// };

// my code added

export const userLogin = async (user: any) => {
	try {
		const response = await fetch(`${BASE_URL}/cyclist/sign-in`, {
			method: "POST",
			credentials: "include",
			mode: "cors",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(user),
		});
		const data = await response.json();
		return data;
	} catch (error) {}
};

export const userLogout = async () => {
	try {
		const response = await fetch(`${BASE_URL}/cyclist/sign-out`, {
			method: "GET",
			credentials: "include",
			mode: "cors",
			headers: {
				"Content-Type": "application/json",
				authorization: `Bearer ${token}`,
			},
		});

		return response;
	} catch (error) {
		console.log(error);
	}
};

// new added code batch 5

export const profile = async (token: any) => {
	const accessToken = localStorage.getItem("accessToken");
	try {
		const response = await CustomInstance.get(baseURL + "cyclist/profile", {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${accessToken ? accessToken : token}`,
			},
		});
		// The custom Axios instance will automatically include the bearer token
		// and set the Content-Type to application/json.

		return response.data; // Assuming your response contains JSON data.
	} catch (error) {
		console.error(error);
		throw error; // Rethrow the error to handle it elsewhere if needed.
	}
};

// export const profile = async () => {
// 	try {
// 		const response = await fetch(`${BASE_URL}/cyclist/profile`, {
// 			method: "GET",
// 			credentials: "include",
// 			mode: "cors",
// 			headers: {
// 				"Content-Type": "application/json",
// 				authorization: `Bearer ${token}`,
// 			},
// 		});
// 		const user = await response.json();

// 		return user;
// 	} catch (error) {
// 		console.log(error);
// 	}
// };

export const getCyclistName = async () => {
	try {
		const response = await fetch(`${BASE_URL}/cyclist/cyclist-name`, {
			method: "GET",
			credentials: "include",
			mode: "cors",
			headers: {
				"Content-Type": "application/json",
				authorization: `Bearer ${token}`,
			},
		});
		const user = await response.json();

		return user;
	} catch (error) {
		console.log(error);
	}
};

// export const updateAddress = async (address: any) => {
// 	try {
// 		const response = await axios.post(
// 			`${BASE_URL}/cyclist/set-up-address`,
// 			JSON.stringify(address),
// 			{
// 				withCredentials: true,
// 				headers: {
// 					"Content-Type": "application/json",
// 					authorization: `Bearer ${token}`,
// 				},
// 			}
// 		);

// 		const updatedAddress = response.data;
// 		console.log("Updated Address from service", updatedAddress);
// 		return updatedAddress;
// 	} catch (error) {
// 		console.log(error);
// 	}
// };

// batch 5 added code
export const updateAddress = async (address: any) => {
	const accessToken = localStorage.getItem("accessToken");
	console.log("api accessToken", accessToken);
	try {
		const response = await axios.post(
			BASE_URL + "/cyclist/set-up-address",
			address,
			{
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${accessToken}`,
				},
			}
		);
		// The custom Axios instance will automatically include the bearer token
		// and set the Content-Type to application/json.

		const updatedAddress = response.data;
		console.log("Updated Address from service", updatedAddress);
		return updatedAddress;
	} catch (error) {
		console.error(error);
		throw error; // Rethrow the error to handle it elsewhere if needed.
	}
};
