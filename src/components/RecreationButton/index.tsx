import { Button, HStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { activityType } from '../../features/cyclist/recreationalCommute-slice';
interface RecreationButton {
    id: any;
    text: string,
    chosen: boolean
}

const RecreationButton = () => {

    const buttonsInfo = [
        {
            id: 1,
            text: 'Urban',
            chosen: false
        },
        {
            id: 2,
            text: 'Sports',
            chosen: false
        },
        {
            id: 3,
            text: 'Off-road',
            chosen: false
        },

    ];
    const [buttonsData, setButtonsData] = useState<RecreationButton[]>(buttonsInfo)



    const dispatch = useAppDispatch();
    const handleClick = (button: RecreationButton) => {

        const updatedButtonData = buttonsData.map((b) => b.id === button.id ? { ...b, chosen: true } : b)

        setButtonsData(updatedButtonData);


    }
    useEffect(() => {
        // console.log(buttonsData);
        const chosenTexts = buttonsData.filter(item => item.chosen).map(item => item.text);
        const dataObj = { activityType: chosenTexts };

        dispatch(activityType(dataObj));
    }, [buttonsData])





    return (
        <HStack>
            {
                buttonsData.map((button, index) => (
                    <Button
                        key={index}
                        variant={'unstyled'}

                        onClick={() => handleClick(button)}
                        w={28}
                        h={12}
                        borderRadius="30px"
                        bg={button.chosen ? 'fourth' : 'transparent'}
                        color={button.chosen ? 'secondary' : 'fourth'}
                        border={button.chosen ? 'none' : `2px solid`}
                        borderColor={button.chosen ? 'none' : 'fourth'}

                    >{button.text}</Button>
                ))
            }
        </HStack>
    );
};

export default RecreationButton;
;