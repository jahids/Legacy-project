import {
  Center,
  Stack,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react';
import InputField from '../InputField';
import SubmitButton from '../Button';
import { useEffect, useState } from 'react';
import axios from 'axios';
import mapboxgl from 'mapbox-gl';
import { totalDistance } from '../../features/cyclist/commuteDetails-slice';
import { useAppDispatch } from '../../app/hooks';
import { useNavigate } from 'react-router-dom';
import { updateAddress } from '../../services/authentication';
interface Markar {
  lat: number;
  lng: number;
}
function HomeOfficeAddressLayover({
  onToggle,
  markars,
  onClear,
}: {
  onToggle: Function;
  markars: Markar[];
  onClear: Function;
}) {
  const [homelocationName, setHomeLocationName] = useState('');
  const [worklocationName, setWorkLocationName] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();

  const navigate = useNavigate();

  useEffect(() => {
    const rGeocodingWork = async () => {
      try {
        if (markars.length) {
          const startCoordslat = markars[0].lat;

          const startCoordslng = markars[0].lng;

          const endCoordslat = markars[markars.length - 1].lat;
          const endCoordslng = markars[markars.length - 1].lng;
          const response = await axios.get(
            `https://api.mapbox.com/geocoding/v5/mapbox.places/${startCoordslng},${startCoordslat}.json?access_token=${mapboxgl.accessToken}`
          );
          const response2 = await axios.get(
            `https://api.mapbox.com/geocoding/v5/mapbox.places/${endCoordslng},${endCoordslat}.json?access_token=${mapboxgl.accessToken}`
          );

          setHomeLocationName(response.data.features[0].place_name);
          setWorkLocationName(response2.data.features[0].place_name);
        }
      } catch (error) {
        console.log(error);
      }
    };

    rGeocodingWork();
  }, [markars]);

  const dispatch = useAppDispatch();
  const handleChange = () => {};

  const handleClick = async () => {
    const Distance = localStorage.getItem('totalDistance');
    const numberTotalDistance = Number(Distance);

    dispatch(totalDistance(numberTotalDistance));

    const setupAddress = await updateAddress({
      homeAddress: homelocationName,
      workAddress: worklocationName,
    });

    if (setupAddress) {
      navigate('/setup-bike-details');
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size='sm'>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Clear map?</ModalHeader>
          <ModalCloseButton />
          <ModalBody>Are you sure you want to clear the map?</ModalBody>

          <ModalFooter>
            <Button variant='ghost' mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button
              variant='solid'
              color='primary'
              background='red.600'
              onClick={(event) => {
                onClear(event);
                onClose();
              }}
            >
              Clear
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Stack spacing={9}>
        <InputField
          location={markars.length > 0 ? homelocationName : ''}
          id='home'
          isRequired={true}
          type='text'
          placeholder='Home Address'
          onChange={handleChange}
          name='home'
          borderColor='accent'
          color='accent'
          onToggle={onToggle}
          borderRadius={''}
        />

        <InputField
          location={markars.length > 1 ? worklocationName : ''}
          borderRadius='10px'
          id='work'
          isRequired={true}
          type='text'
          placeholder='Work Address'
          onChange={handleChange}
          name='work'
          borderColor='accent'
          color='accent'
          onToggle={onToggle}
        />

        <Center mt={-3}>
          <Button borderRadius={'10px'} w='200px' size='lg' fontWeight={'700'} onClick={onOpen}>
            Clear Map
          </Button>

          <SubmitButton
            onClick={handleClick}
            loadingText='Submitting'
            size='lg'
            bg='accent'
            w='200px'
            color='secondary'
            text='Next'
            borderRadius={'10px'}
            fontWeight={'bold'}
          />
        </Center>
      </Stack>
    </>
  );
}

export default HomeOfficeAddressLayover;
