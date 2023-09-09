import axios from "axios";
import { config } from "../../../config";
import { ObjectId } from "mongoose";
const baseUrl = config.SERVER_URL;

const technicianToken = localStorage.getItem("technisianToken");

export const TechnicianGetAllCasesService = async () => {
	try {
		return await axios({
			url: `${baseUrl}/technician/get-all-cases`,
			method: "GET",
			withCredentials: true,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${technicianToken}`,
			},
		})
			.then((res) => res.data)
			.catch((error) => console.error(error.message));
	} catch (error) {
		console.error("Error in service !");
	}
};

export const TechnicianGetCaseByIdService = async (id: string) => {
	try {
		return await axios({
			url: `${baseUrl}/technician/get-case-by-id/${id}`,
			method: "GET",
			withCredentials: true,
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((res) => res.data)
			.catch((error) => console.error(error.message));
	} catch (error) {
		console.error("Error in service !");
	}
};
