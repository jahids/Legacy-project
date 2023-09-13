/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
	Table,
	TableContainer,
	Tbody,
	Td,
	Th,
	Thead,
	Tr,
} from "@chakra-ui/table";
import { Box, Button, Center, CircularProgress, Flex, Select, Text } from "@chakra-ui/react";
import { statusColor } from "../../data/statusColorDictionary";
import FullHealthBar from "../Bicycle Full Health Bar";
import { formatText } from "./../../utils/formatText";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useNavigate } from "react-router-dom";
import { createPresentableCases } from "../../features/technician/slices/casesPresentationSlice";
import { ChangeEvent, useEffect, useState } from "react";
import CustomInstance from "../../lib/axios";

const TableComponent = ({
	handleActionChange,
}: {
	handleActionChange: (input: string, index: number) => void;
}) => {
	const cases = useAppSelector((state: any) => state.presentableCases);
	console.log("casses data", cases);

	const navigate = useNavigate();

	const handleChange = (
		event: ChangeEvent<HTMLSelectElement>,
		index: number
	) => {

		console.log("target event", index );
		
		event.preventDefault();
		const input = event.target.value;

		// -----** ----
		const changeStatus = async ()=>{
            
                const result = await CustomInstance.get(`/technician/case/${index['Case Id']}/close`);
                console.log(`result `,result);

        
          
            window.location.reload();
            
        };
        changeStatus();
		// ---- * ----

		if (input) handleActionChange(input, index);
	};

	if (cases.length === 0) {
		return (
			<Center h="70vh">
				<CircularProgress
					isIndeterminate
					color="blue"
					size="16"
					thickness="4"
				/>
			</Center>
		);
	}

	
	// const [filtertype, setfiltertype] = useState('')
	

	// // useEffect(() => {
	// // 	const filtervalue = window.localStorage.getItem("filtertype")
	// // 	console.log("filter valye", filtervalue);
	// // 	setfiltertype(filtervalue)
	// // }, [filtertype])
	
	const filtervalue = window.localStorage.getItem("filtertype")

	return (
		<>
			<TableContainer
				bg="primary"
				borderRadius={".5rem"}
				boxShadow={"0 .5rem .5rem 0 rgba(0, 0, 0, 0.25);"}
				overflow={"hidden"}
			>
				<Table variant="simple" size="md">
					<Thead bg={"#e2e8f0"} height={"8.5vh"}>
						<Tr>
							{Object?.keys(cases[0])?.map((header, index) => {
								if (header !== "Case Id") {
									return (
										<>
											<Th
												maxWidth={"1vw"}
												p={"1vh 1vw 1vh 1vw"}
												key={index}
												borderBottom={"0"}
												textTransform="capitalize"
												letterSpacing={0}
												color="secondary"
												textAlign="center"
												fontFamily="Inter"
												fontSize="1.25rem"
												fontWeight="600"
												lineHeight="0.5rem"
											>
												{header}
											</Th>
										</>
									);
								} else {
									return (
										<>
											<Th
												maxWidth={"1vw"}
												p={"1vh 1vw 1vh 1vw"}
												key={index}
												borderBottom={"0"}
												textTransform="capitalize"
												letterSpacing={0}
												color="secondary"
												textAlign="center"
												fontFamily="Inter"
												fontSize="1.25rem"
												fontWeight="600"
												lineHeight="0.5rem"
											>
												Action
											</Th>
										</>
									);
								}
							})}
						</Tr>
					</Thead>
					<Tbody>
						{cases?.filter((item : any)=>item?.Status !== filtervalue).map((Case: any, index1: number) => (
							<Tr key={index1}>
								{Object?.values(Case)?.map(
									(value, index2: number) => {
										if (
											typeof value === "string" &&
											index2 < 6
										) {
											return (
												<Td
													key={index2}
													p={"1rem 1rem 1rem 1rem"}
													w={"11.65vw"}
													borderBottom={"0"}
												>
													<Box
														bg={
															(
																statusColor as {
																	[
																		key: string
																	]: string;
																}
															)[value] ||
															"transparent"
														}
														fontFamily="Inter"
														fontSize="1.20rem"
														fontStyle={"normal"}
														fontWeight={"400"}
														lineHeight={"2rem"}
														borderRadius={"1rem"}
													>
														<Center>
															{index2 === 2 ? (
																<Text as="b">
																	{formatText(
																		value
																	)}
																</Text>
															) : (
																<Text>
																	{formatText(
																		value
																	)}
																</Text>
															)}
														</Center>
													</Box>
												</Td>
											);
										} else if (typeof value === "number") {
											return (
												<Td
													p={"1rem 1rem 1rem 1rem"}
													w={"11.65vw"}
													borderBottom={0}
												>
													<FullHealthBar
														health={value}
													/>
												</Td>
											);
										} else {
											return (
												<Td
													w={"10vw"}
													p={"2.5vh 1vw 2.5vh 1vw"}
													key={index2}
													borderBottom={"0"}
												>
													<Flex
  justify={"center"}
  alignItems={"center"}
>
  <Button
    variant="unstyled"
    _hover={{
      background: "#d1fbbd",
      color: "secondary",
      outlineColor: "secondary",
    }}
    w={"20"}
    h={"10"}
    _placeholder={{
      backgroundColor: "white",
    }}
    size="md"
    fontFamily={"Inter"}
    fontSize={"1rem"}
    fontWeight={"600"}
    focusBorderColor="secondary"
    iconSize="25"
    textAlign={"end"}
    mr={3}
    borderRadius={15}
    bg={"secondary"}
    color={"accent"}
    onClick={(event : any) =>
		handleChange(
			event,
			Case
		)
	}
  >
    <span style={{margin : "15px"}} >Close</span>
  </Button>
  <Button
    onClick={() =>
      navigate(`/individual-case/${value}`)
    }
    _hover={{
      background: "primary",
      color: "secondary",
      outlineColor: "third",
    }}
    w={"20"}
    h={"10"}
    size={"10"}
    bg={"third"}
    borderRadius={15}
    color={"secondary"}
  >
    View
  </Button>
</Flex>
												</Td>
											);
										}
									}
								)}
							</Tr>
						))}
					</Tbody>
				</Table>
			</TableContainer>
		</>
	);
};

export default TableComponent;

// batch 5 code added
// import React, { ChangeEvent } from 'react';
// import { Table, TableContainer, Tbody, Td, Th, Thead, Tr, Skeleton } from '@chakra-ui/react';
// import { Box, Button, Center, Flex, Select, Text } from '@chakra-ui/react';
// import { useAppDispatch, useAppSelector } from '../../app/hooks';
// import { useNavigate } from 'react-router-dom';
// import { createPresentableCases } from '../../features/technician/slices/casesPresentationSlice';
// import { formatText } from './../../utils/formatText';
// import { statusColor } from '../../data/statusColorDictionary';
// import FullHealthBar from '../Bicycle Full Health Bar';

// const TableComponent = ({ handleActionChange }: { handleActionChange: (input: string, index: number) => void }) => {
//   const cases = useAppSelector((state: any) => state.presentableCases);
//   const isLoading = cases.length === 0; // Check if data is loading
//   const navigate = useNavigate();

//   const handleChange = (event: ChangeEvent<HTMLSelectElement>, index: number) => {
//     event.preventDefault();
//     const input = event.target.value;

//     if (input) handleActionChange(input, index);
//   };

//   return (
//     <>
//       <TableContainer
//         bg="primary"
//         borderRadius={'.5rem'}
//         boxShadow={'0 .5rem .5rem 0 rgba(0, 0, 0, 0.25);'}
//         overflow={'hidden'}>
//         <Table variant="simple" size="md">
//           <Thead bg={'#e2e8f0'} height={'8.5vh'}>
//             <Tr>
//               {Object?.keys(cases[0])?.map((header, index) => (
//                 <Th
//                   maxWidth={'1vw'}
//                   p={'1vh 1vw 1vh 1vw'}
//                   key={index}
//                   borderBottom={'0'}
//                   textTransform="capitalize"
//                   letterSpacing={0}
//                   color="secondary"
//                   textAlign="center"
//                   fontFamily="Inter"
//                   fontSize="1.25rem"
//                   fontWeight="600"
//                   lineHeight="0.5rem">
//                   {header !== 'Case Id' ? header : 'Action'}
//                 </Th>
//               ))}
//             </Tr>
//           </Thead>
//           <Tbody>
//             {isLoading ? (
//               <Tr>
//                 <Td colSpan={Object.keys(cases[0]).length}>
//                   {[1, 2, 3].map((_, index) => (
//                     <Skeleton key={index} height="20px" mt="1" mb="1" />
//                   ))}
//                 </Td>
//               </Tr>
//             ) : (
//               cases?.map((Case: any, index1: number) => (
//                 <Tr key={index1}>
//                   {Object?.values(Case)?.map((value, index2: number) => (
//                     <Td
//                       key={index2}
//                       p={'1rem 1rem 1rem 1rem'}
//                       w={'11.65vw'}
//                       borderBottom={'0'}>
//                       {typeof value === 'string' && index2 < 6 ? (
//                         <Box
//                           bg={(statusColor as { [key: string]: string })[value] || 'transparent'}
//                           fontFamily="Inter"
//                           fontSize="1.20rem"
//                           fontStyle={'normal'}
//                           fontWeight={'400'}
//                           lineHeight={'2rem'}
//                           borderRadius={'1rem'}>
//                           <Center>{index2 === 2 ? <Text as="b">{formatText(value)}</Text> : <Text>{formatText(value)}</Text>}</Center>
//                         </Box>
//                       ) : typeof value === 'number' ? (
//                         <FullHealthBar health={value} />
//                       ) : (
//                         <Flex justify={'center'} alignItems={'center'}>
//                           <Select
//                             variant="unstyled"
//                             _hover={{ background: '#d1fbbd', color: 'secondary', outlineColor: 'secondary' }}
//                             w={'20'}
//                             h={'10'}
//                             _placeholder={{ backgroundColor: 'white' }}
//                             size="md"
//                             fontFamily={'Inter'}
//                             fontSize={'1rem'}
//                             fontWeight={'600'}
//                             focusBorderColor="secondary"
//                             iconSize="25"
//                             textAlign={'end'}
//                             mr={2}
//                             borderRadius={15}
//                             bg={'secondary'}
//                             color={'accent'}
//                             onChange={(event) => handleChange(event, index1)}>
//                             <option value="Raised" style={{ backgroundColor: 'white' }}>
//                               Raise
//                             </option>
//                             <option value="Closed" style={{ backgroundColor: 'white' }}>
//                               Close
//                             </option>
//                           </Select>
//                           <Button
//                             onClick={() => navigate(`/individual-case/${value}`)}
//                             _hover={{ background: 'primary', color: 'secondary', outlineColor: 'third' }}
//                             w={'20'}
//                             h={'10'}
//                             size={'10'}
//                             bg={'third'}
//                             borderRadius={15}
//                             color={'secondary'}>
//                             View
//                           </Button>
//                         </Flex>
//                       )}
//                     </Td>
//                   ))}
//                 </Tr>
//               ))
//             )}
//           </Tbody>
//         </Table>
//       </TableContainer>
//     </>
//   );
// };

// export default TableComponent;
