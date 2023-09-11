import axios from "axios";
import { BASE_URL } from "../../config";
// const BASE_URL = 'http://localhost:4000';
const token = localStorage.getItem("accessToken");

export const order = async (order: any) => {
	try {
		const response = await fetch(`${BASE_URL}/cyclist/create-order`, {
			method: "POST",
			credentials: "include",
			mode: "cors",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(order),
		});
		const orderDetails = await response.json();
		console.log(orderDetails);
		window.localStorage.setItem("chatid", JSON.stringify(orderDetails));
		return orderDetails;
	} catch (error) {
		console.log(error);
	}
};

export const getPlan = async () => {
	try {
		const response = await axios.get(`${BASE_URL}/cyclist/get-plan`, {
			withCredentials: true,
			headers: {
				"Content-Type": "application/json",
				authorization: `Bearer ${token}`,
			},
		});

		const plan = response.data;
		console.log("plan from service", plan);
		return plan;
	} catch (error) {
		console.log(error);
	}
};

export const selectPlan = async (plan: any) => {
	console.log("plan from service", plan);
	try {
		const response = await fetch(`${BASE_URL}/cyclist/select-plan`, {
			method: "PUT",
			credentials: "include",

			headers: {
				"Content-Type": "application/json",
				authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(plan),
		});

		if (!response.ok) {
			throw new Error("Request failed");
		}

		const updatedPlan = await response.json();
		// console.log('selectplan from service', updatedPlan);
		return updatedPlan;
	} catch (error) {
		console.log(error);
	}
};

export const getTimeSlots = async (subparts: any) => {
	try {
		const response = await fetch(
			`${BASE_URL}/cyclist/available-support-time`,
			{
				method: "POST",
				credentials: "include",
				mode: "cors",
				headers: {
					"Content-Type": "application/json",
					authorization: `Bearer ${token}`,
				},
				body: JSON.stringify(subparts),
			}
		);

		const results = await response.json();
		console.log("time results from service", results);
		return results;
	} catch (error) {
		console.log(error);
	}
};
