import axios from "axios";
import { baseURL } from "./domain";

const accessToken = window.localStorage.getItem("accessToken");

const CustomInstance = axios.create({
	baseURL: baseURL,
	// headers: { Authorization: "Bearer " + localStorage.tid },
	withCredentials: true,
	headers: {
		"Content-Type": "application/json",
		Authorization: `Bearer ${accessToken}`,
	},
});

export default CustomInstance;
