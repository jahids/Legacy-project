import React, { useEffect, useState } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { lengthOfRideDetails } from '../../features/cyclist/recreationalCommute-slice';
import { Select } from '@chakra-ui/react';

const RecreationalSelectOption = () => {
    const dispatch = useAppDispatch();
    const [selectedValue, setSelectedValue] = useState('');
    const handleSelectChange = (event: any) => {
        setSelectedValue(event.target.value);
    };

    // const handleClick = () => {



    //   const [lower, upper] = selectedValue.split('-');
    //   const lowerNum = parseInt(lower);

    //   const upperNum = parseInt(upper);
    //   const average = (lowerNum + upperNum) / 2;
    //   const dataObj = { lengthOfRide: average };

    //   dispatch(lengthOfRideDetails(dataObj));
    // };
    useEffect(() => {

        const [lower, upper] = selectedValue.split('-');
        const lowerNum = parseInt(lower);

        const upperNum = parseInt(upper);
        const average = (lowerNum + upperNum) / 2;
        const dataObj = { lengthOfRide: average };

        dispatch(lengthOfRideDetails(dataObj));

    }, [])
    return (
        <div>
            <Select
                onChange={handleSelectChange}
                placeholder='Select option'
                value={selectedValue}
                style={{ backgroundColor: '#001F3F' }}
                color={'fourth'}
            >
                <option value='0-5km' style={{ backgroundColor: '#001F3F' }}>
                    Short (0 - 5 km)
                </option>
                <option value='5-25km' style={{ backgroundColor: '#001F3F' }}>
                    Regular (5 - 25 km)
                </option>
                <option value='25-40km' style={{ backgroundColor: '#001F3F' }}>
                    Long (25 - 50 km)
                </option>
            </Select>
        </div>
    );
};

export default RecreationalSelectOption;