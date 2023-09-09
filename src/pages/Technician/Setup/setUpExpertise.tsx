import { Box, Flex, Heading, Text, Image, Input, Center, useUpdateEffect } from '@chakra-ui/react';
import backGroundVideo from './../../../assets/cyclingVideo.mp4';
import logo from './../../../assets/logo(Lilac).svg';
import { useEffect, useState } from 'react';
import LoopSlotOrPartsComponent from '../../../components/Time Slots & Bicycle Parts/indexForSetup';
import { parts } from '../../../data/partsData';
import TechnicianProgressBar from '../../../components/Technician Progress Bar';
import Button from '../../../components/Button';
import { useNavigate } from 'react-router-dom';
import { MouseEvent } from 'react';
import BicycleBrandList from '../../../components/Bicyle Brand List';
import axios from 'axios';
import CustomInstance from '../../../lib/axios';

const SetUpExpertise = () => {
	const navigate = useNavigate();
	const [inputBrand, setInputBrand] = useState<string>('');
	const [brandList, setBrandList] = useState<string[]>([]);
	const [componentList, setcomponentList] = useState<string[]>([]);
	const [showError, setShowError] = useState(false);
	const [parts, setparts] = useState([])

	useEffect(() => {
		
	const custominstnceCall  = async() => {
		const data = await CustomInstance.get("/cyclist/all-subpart");
		setparts(data?.data)
		console.log("data",data )
	}
	custominstnceCall()
	
	}, [parts?.length])
	


	const bicycleParts = parts;

	const handleClick = (item: string) => {
		setcomponentList((previousComponents) => [...previousComponents, item]);
	};

	const handleNextClick = (event: MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		const technician = localStorage.getItem('technician');
		if (technician) {
			const parsedTechnician = JSON.parse(technician);
			parsedTechnician.brandsExpertise = brandList;
			parsedTechnician.subpartExpertise = componentList;
			localStorage.setItem('technician', JSON.stringify(parsedTechnician));
			navigate('/technician-setup-3');
		} else setShowError(true);
	};

	return (
		<>
			<Flex
				w={'100vw'}
				h={'100vh'}
				position={'relative'}>
				<Box flex={0.6}></Box>

				<video
					autoPlay
					loop
					muted
					style={{
						position: 'absolute',
						top: 0,
						left: 0,
						width: '100%',
						height: '100%',
						objectFit: 'cover',
					}}>
					<source
						src={backGroundVideo}
						type="video/mp4"
					/>
					Your browser does not support the video tag.
				</video>
				<Box
					zIndex={1}
					bg={'secondary'}
					flex={0.4}>
					<Flex
						mt={'2rem'}
						mb={'1.5rem'}
						alignItems={'center'}
						justifyContent={'center'}
						gap={'1rem '}>
						<Heading
							fontSize={'2.5rem'}
							color={'third'}>
							Slipstream
						</Heading>
						<Image
							src={logo}
							alt="Slipstream logo"></Image>
					</Flex>

					<Flex
						direction={'column'}
						p={' 0 6rem'}>
						<Center>
							<TechnicianProgressBar pagenumber={2} />
						</Center>
						<Text
							mt={'2rem'}
							fontSize={'1.5rem'}
							color={'third'}>
							Bicycle Brands
						</Text>

						<Input
							color={'third'}
							value={inputBrand}
							variant="flushed"
							size={'md'}
							placeholder="Type names of brands you have worked with"
							_placeholder={{ color: 'third', borderColor: 'third' }}
							_focusVisible={{ borderColor: 'third' }}
							onChange={(event) => setInputBrand(event.currentTarget.value)}
							onKeyDown={(event) => {
								if (event.key === 'Enter') {
									event.preventDefault();
									setBrandList((brands) => [...brands, inputBrand]);
									setInputBrand('');
								}
							}}
						/>
						<Flex
							wrap={'wrap'}
							mt={2}>
							{brandList.map((brand, index) => {
								return (
									<BicycleBrandList
										key={index}
										item={brand}
									/>
								);
							})}
						</Flex>

						<Text
							color={'third'}
							mb={2}
							mt={'1.15rem'}
							fontSize={'1.5rem'}>
							Components Expertise
						</Text>
						<Text
							color={'third'}
							mb={2}
							fontFamily={'Inter'}
							fontWeight={'500'}
							fontSize={'1rem'}>
							Select the components you are comfortable working with
						</Text>
						<Flex
							w={'32vw'}
							wrap={'wrap'}
							mb={'2rem'}>
							{parts?.map((parts) => {
								return (
									<LoopSlotOrPartsComponent
										key={parts?._id}
										item={parts?.name}
										onClick={() => handleClick(parts?._id)}
										outline={true}
									/>
								);
							})}
						</Flex>

						<Button
							onClick={handleNextClick}
							loadingText={'Next'}
							w={'7rem'}
							bg={'third'}
							size={'md'}
							color={'secondary'}
							text={'Next'}
						/>
					</Flex>
				</Box>
			</Flex>
		</>
	);
};

export default SetUpExpertise;
