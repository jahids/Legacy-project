import { BASE_URL } from "../../config";

const token = localStorage.getItem("accessToken");

export const getWeatherData = async (weatherData: any) => {
	try {
		const response = await fetch(`${BASE_URL}/cyclist/weather-data`, {
			method: "POST",
			credentials: "include",
			mode: "cors",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(weatherData),
		});
		const weather = await response.json();

		return weather;
	} catch (error) {
		console.log(error);
	}
};
