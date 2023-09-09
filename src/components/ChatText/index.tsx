import { Box, Text } from '@chakra-ui/react';

const ChatText = ({ id, text }: { id: string; text: string }) => {
  const sentencesArray = [
    'Hi [Insert Name], Select which issues you are facing so that we can help.',
    'We are opening an Active case number 2986.',
    'Which part or parts need to be replaced or repaired?',
    'Which drive mechanics part do you need to replace or repair?',
    'Let’s book a time with support. Which day works for you?',
    'These slots are available on Wednesday. Select one.',
    'Great. You have a call booked for Wed, 08 Aug at 15:00.',
    'Download the meeting link to have it in your calendar.',
    'Anything else you want to add to help your case?',
    'Thank you for all the extra info you shared. Anything else?',
    'Speak on Wednesday then.',
    'Quick reminder that your call today is at 15:00.',
    'Please download the XM Reality app before the call.',
    'How would you rate today’s call with Slipstream?',
  ];

  console.log(sentencesArray);

  return (
    <Box>
      <Text>{text}</Text>
    </Box>
  );
};
export default ChatText;
