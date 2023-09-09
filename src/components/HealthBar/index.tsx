import { Progress, Text, Grid, GridItem } from '@chakra-ui/react';
import { healthColorChoose } from '../../utils/healthColorChoose';

function HealthBar({ health, partname }: { health: number; partname: string }) {

  console.log("progress",health,  partname);
  return (
    <Grid templateColumns='repeat(10, 1fr)'>
      <GridItem colSpan={6}>
        <Text>{partname}</Text>
      </GridItem>
      <GridItem colSpan={4} alignItems={'center'} marginTop={'auto'} marginBottom={'auto'}>
        <Progress
          value={health}
          colorScheme={`${healthColorChoose(health)}`}
          borderRadius={'8px'}
        />
      </GridItem>
    </Grid>
  );
}

export default HealthBar;
