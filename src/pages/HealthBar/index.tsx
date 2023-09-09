import HealthRadialChart from '../../components/HealthRadialChart';
import HealthBarAccordion from '../../components/HealthBarAccordion';
import SubmitButton from '../../components/Button';
import { Flex } from '@chakra-ui/react';
import { radialHealthData } from '../../data/radialHealthData';
import { useEffect, useState } from 'react';
import { bicycle } from '../../services/bikeDetails';
import { Link } from 'react-router-dom';

function HealthBar() {
  const [healthData, setHealthData] = useState(radialHealthData);
  const [bicycleH, setBicycleH] = useState();

  useEffect(() => {
    const categoryHealth: any[] = [];

    const fetchData = async () => {
      
      const bicycleId = localStorage.getItem('bikeID');
      const data = await bicycle(bicycleId);

      const category = ['Wheel', 'Frame', 'Brake', 'DriveMechanics'];
      const categoryH = ['Wheel', 'Bike Frame', 'Brake', 'Drive Mechanics'];

      category.forEach((categoryName, index) => {
        const Health = {
          categoryName: data.bicycleParts.reduce((accumulator: number, part: any) => {
            if (part.subpart.category === categoryName) {
              accumulator += part.health;
            }
            return accumulator;
          }, 0),
          healthLength: data.bicycleParts.filter(
            (part: any) => part.subpart.category === categoryName
          ).length,
        };

        categoryHealth.push({
          name: categoryH[index],
          health: Math.round(Health.categoryName / Health.healthLength),
        });
      });

      if (categoryHealth) {
        setHealthData((prevHealthData) => {
          const updatedHealthData = prevHealthData.map((item, index) => ({
            ...item,
            health: categoryHealth[index].health,
          }));
          return updatedHealthData;
        });
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <HealthRadialChart healthData={healthData} />
      <HealthBarAccordion />
      <Flex mt={'2rem'} pb={'2rem'} justifyContent={'center'} fontWeight={'20px'}>
        <Link to='/cart'>
          <SubmitButton
            loadingText='Replace'
            size='lg'
            bg='accent'
            w='12.5rem'
            color='secondary'
            text='Replace now'
            fontWeight={''}
          />
        </Link>
      </Flex>
    </>
  );
}

export default HealthBar;
