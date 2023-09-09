import { Stack, Switch } from '@chakra-ui/react';
import { useState } from 'react';

const SetSwitch = ({ setFullrevision, color }: { setFullrevision: Function; color: string }) => {
  const [isChecked, setIsChecked] = useState(false);
  const handleSwitchChange = () => {
    setFullrevision(!isChecked);
    setIsChecked(!isChecked);
  };

  return (
    <Stack align='center' direction='row'>
      <Switch
        size='md'
        onChange={handleSwitchChange}
        colorScheme={color}
        // isChecked={isChecked}
      />
    </Stack>
  );
};

export default SetSwitch;
