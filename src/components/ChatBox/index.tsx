import { Box, Text } from '@chakra-ui/react';

const ChatBox = ({ id, text }: { id: string; text: string }) => {
  return (
    <Box>
      <Text>{text}</Text>
    </Box>
  );
};
export default ChatBox;
