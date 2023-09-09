import React, { useEffect } from 'react';
import { RadialBarChart, RadialBar, Legend, ResponsiveContainer } from 'recharts';
import { Flex } from '@chakra-ui/react';
import { Payload } from 'recharts/types/component/DefaultLegendContent';

interface HealthData {
  name: string;
  health: number;
  fill: string;
}

const HealthRadialChart = ({ healthData }: { healthData: HealthData[] }) => {


  console.log(healthData);

  const style = {
    fontSize: 12,
    top: 21,
    right: 31,
    zIndex: -1,
    lineHeight: '23px',
  };

  const rHealthData = [...healthData];
  rHealthData.reverse();
  const payloadData: Payload[] = rHealthData.map((data) => {
    return { value: data.name };
  });

  return (
    <>
      <Flex alignItems={'center'} width={'100%'}>
        <RadialBarChart
          width={350}
          height={290}
          cx={210}
          cy={150}
          innerRadius={50}
          outerRadius={140}
          barSize={10}
          startAngle={90}
          endAngle={360}
          data={healthData}
        >
          <RadialBar
            // minAngle={15}
            label={{ position: 'end', fill: '#fff' }}
            dataKey='health'
          />
          <Legend
            iconSize={10}
            payload={payloadData}
            layout='vertical'
            verticalAlign='middle'
            wrapperStyle={style}
          />
        </RadialBarChart>
      </Flex>
    </>
  );
};

export default HealthRadialChart;
