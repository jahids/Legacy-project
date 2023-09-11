/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { BASE_URL } from "../../config";
// const BASE_URL = 'http://localhost:4000';
const token = window.localStorage.getItem("accessToken");

export const passiveCase = async (passiveCase: any) => {
	// console.log('passiveCase from service', passiveCase);
	try {
		const response = await fetch(`${BASE_URL}/cyclist/create-case`, {
			method: "POST",
			credentials: "include",
			mode: "cors",
			headers: {
				"Content-Type": "application/json",
				authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(passiveCase),
		});
		const passiveCaseDetails = await response.json();
		// console.log('passiveCaseDetails from service', passiveCaseDetails);

		return passiveCaseDetails;
	} catch (error) {
		console.log(error);
	}
};

export const activeCase = async (passiveCase: any) => {
	try {
		const response = await fetch(`${BASE_URL}/cyclist/create-chat-case`, {
			method: "POST",
			credentials: "include",
			mode: "cors",
			headers: {
				"Content-Type": "application/json",
				authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(passiveCase),
		});
		const passiveCaseDetails = await response.json();

		return passiveCaseDetails;
	} catch (error) {
		console.log(error);
	}
};

export const getAallCases = async () => {
	const token = localStorage.getItem("accessToken");
	try {
		const response = await axios.get(`${BASE_URL}/cyclist/get-all-cases`, {
			withCredentials: true,
			headers: {
				"Content-Type": "application/json",
				authorization: `Bearer ${token}`,
			},
		});

		const allCases = response.data;
		// console.log('allcases from service', allCases);
		return allCases;
	} catch (error) {
		console.log(error);
	}
};

export const getCaseById = async (id: any) => {
	// console.log('from service', id);
	try {
		const response = await axios.get(
			`${BASE_URL}/cyclist/get-case-by-id/${id}`,
			{
				withCredentials: true,
				headers: {
					"Content-Type": "application/json",
					authorization: `Bearer ${token}`,
				},
			}
		);

		const caseById = response.data;

		return caseById;
	} catch (error) {
		console.log(error);
	}
};

export const getCaseNumber = async () => {
	try {
		const response = await axios.get(`${BASE_URL}/cyclist/case-number`, {
			withCredentials: true,
			headers: {
				"Content-Type": "application/json",
				authorization: `Bearer ${token}`,
			},
		});

		const CaseNumber = response.data;

		return CaseNumber;
	} catch (error) {
		console.log(error);
	}
};
