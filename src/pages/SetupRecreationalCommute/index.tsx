/* eslint-disable  */
import { Box, Center, Container, Stack, Text, Select } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import Days from "../../components/Days";
import SubmitButton from "../../components/Button";
import ProgressBar from "../../components/ProgressBar";
import RecreationButton from "../../components/RecreationButton";
import { useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import { lengthOfRideDetails } from "../../features/cyclist/recreationalCommute-slice";
import { days } from "../../features/cyclist/recreationalCommute-slice";
import CustomInstance from "../../lib/axios";

const Recreation = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const [selectedValue, setSelectedValue] = useState("");
	const handleSelectChange = (event: any) => {
		setSelectedValue(event.target.value);
	};

	const BikeData: any = JSON.parse(localStorage.getItem("bikeData"));
	const dailycomute: any = JSON.parse(localStorage.getItem("dailyCommute"));
	const TotalDistance: any = JSON.parse(
		localStorage.getItem("totalDistance")
	);

	const handleClick = async (bikeinfo: any) => {
		const [lower, upper] = selectedValue.split("-");
		const lowerNum = parseInt(lower);
		const upperNum = parseInt(upper);
		const average = (lowerNum + upperNum) / 2;
		const dataObj = { lengthOfRide: average };

		dispatch(lengthOfRideDetails(dataObj));
		console.log("length of ride dtls", dataObj);

    const localstorageProfile = JSON.parse(localStorage.getItem("_profile"))

		try {
			const data = {
        email : localstorageProfile?.email,
				brand: BikeData?.brand,
				model: BikeData?.model,
				serialNumber: BikeData?.serialNumber,
				purchaseMonth: BikeData?.purchaseMonth,
				purchaseYear: BikeData?.purchaseYear,
				isRevised: BikeData?.isRevised,
				revisionMonth: BikeData?.revisionMonth,
				revisionYear: BikeData?.revisionYear,
				// "dailyCommute": [{
				//   days: ['M', "T", "W"],
				//   unpavedRoad : 69,
				//   totalDistance : 5
				// }],
				dailyCommute: [dailycomute],
				recreationalCommute: [{
						days: ["M", "T", "W"],
						activityType: ["M", "T", "W"],
						lengthOfRide: 32,
					}],
				bicycleParts: "",
				totalHealth: BikeData?.TotalDistance,
			};
			console.log("payload data,", data);
			const res = await CustomInstance.post(
				`/cyclist/set-up-bicycle`,
				data
			);

			console.log(`🎈🎈🎈🎆🎈🎈🎈🎈🎈`, "new bike created");

			// return res.data;

			if (res) {
				const bikeId: any = res?.data?._id;
				localStorage.setItem("bikeID", bikeId);
				localStorage.setItem("bikeInfo", JSON.stringify(res.data));

         navigate('/home');
			}
		} catch (error) {
			console.error(error);
			throw error; // Rethrow the error to handle it elsewhere if needed.
		}

		
	};

	return (
		<Container p={6}>
			<Center mt={"2rem"} mb={"3rem"}>
				<ProgressBar color={"fourth"} pagenumber={4}></ProgressBar>
			</Center>
			<Box mb={10}>
				<Text
					color={"fourth"}
					textAlign={"left"}
					fontSize={"xl"}
					fontWeight={"semibold"}
				>
					Frequency of recreational commute
				</Text>
				<Text color={"fourth"} opacity={"60%"}>
					Select which days you ride your bike to work
				</Text>
			</Box>
			<Center my={10}>
				<Days colorScheme="fourth" reducer={days}></Days>
			</Center>
			<Stack spacing={4}>
				<Text
					color={"fourth"}
					textAlign={"left"}
					fontSize={"xl"}
					fontWeight={"semibold"}
				>
					Recreational activities bike used for
				</Text>
				<Center>
					<RecreationButton></RecreationButton>
				</Center>
			</Stack>
			<Stack spacing={4}>
				<Text
					color={"fourth"}
					textAlign={"left"}
					fontSize={"xl"}
					fontWeight={"semibold"}
					mt={10}
				>
					Typical Length of Rides
				</Text>
				<Select
					onChange={handleSelectChange}
					placeholder="Select option"
					value={selectedValue}
					style={{ backgroundColor: "#001F3F" }}
					color={"fourth"}
				>
					<option
						value="0-5km"
						style={{ backgroundColor: "#001F3F" }}
					>
						Short (0 - 5 km)
					</option>
					<option
						value="5-25km"
						style={{ backgroundColor: "#001F3F" }}
					>
						Regular (5 - 25 km)
					</option>
					<option
						value="25-40km"
						style={{ backgroundColor: "#001F3F" }}
					>
						Long (25 - 50 km)
					</option>
				</Select>
			</Stack>
			<Center mt={16}>
				{/* <ChakraLink as={ReactRouterLink} to='/home' w='content-box'> */}
				<SubmitButton
					onClick={handleClick}
					loadingText="Submitting"
					size="lg"
					bg="fourth"
					w="12.5rem"
					color="secondary"
					text="Submit"
					fontWeight={""}
				/>
				{/* </ChakraLink> */}
			</Center>
		</Container>
	);
};
export default Recreation;
