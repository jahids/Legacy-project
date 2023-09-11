import axios from "axios";
import { config } from "../../../config";
const baseUrl = config.SERVER_URL;

const technicianToken = localStorage.getItem("technisianToken");
export const TechnicianSignUpService = async (signUpData: Object) => {
	try {
		return await axios({
			url: `${baseUrl}/technician/sign-up`,
			method: "POST",
			withCredentials: true,
			headers: { "Content-Type": "application/json" },
			data: signUpData,
		})
			.then((res) => res.data)
			.catch((error) =>
				console.error("Error from Server!", error.message)
			);
	} catch (error) {
		console.error("Error in Sign up service!");
	}
};

export const TechnicianSignInService = async (signInData: Object) => {
	try {
		return await axios({
			url: `${baseUrl}/technician/sign-in`,
			method: "POST",
			withCredentials: true,
			headers: { "Content-Type": "application/json" },
			data: signInData,
		})
			.then((res) => res.data)
			.catch((error) =>
				console.error("Error from Server!", error.message)
			);
	} catch (error) {
		console.error("Error in Sign In Service!");
	}
};

export const TechnicianSetUpService = async (setUpData: any) => {
	try {
		return await axios({
			url: `${baseUrl}/technician/set-up-technician`,
			method: "POST",
			withCredentials: true,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${technicianToken ||
					setUpData?.accessToken}`,
			},
			data: setUpData,
		})
			.then((res) => res.data)
			.catch((error) =>
				console.error("Error from Server!", error.message)
			);
	} catch (error) {
		console.error("Error in Set Up Service!");
	}
};

export const TechnicianGetProfileService = async () => {
	try {
		return await axios({
			url: `${baseUrl}/technician/profile`,
			method: "GET",
			withCredentials: true,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${technicianToken}`,
			},
		})
			.then((res) => res.data)
			.catch((error) =>
				console.error("Error from Server!", error.message)
			);
	} catch (error) {
		console.error("Error in Profile Service!");
	}
};
export const TechnicianLogOutService = async () => {
	try {
		return await axios({
			url: `${baseUrl}/technician/sign-out`,
			method: "GET",
			withCredentials: true,
			headers: { "Content-Type": "application/json" },
		})
			.then((res) => res)
			.catch((error) =>
				console.error("Error from Server!", error.message)
			);
	} catch (error) {
		console.error("Error in Sign Out Service!");
	}
};
