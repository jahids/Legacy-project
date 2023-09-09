import { HStack, Box, Flex } from '@chakra-ui/react';

function Progress({ color, pagenumber }: { color: string; pagenumber: number }) {
  return (
    <Box w={'95%'} m={'0 auto'} mt={'1rem'}>
      <HStack gap='.5rem'>
        <Flex
          justify={'center'}
          alignItems={'center'}
          bgColor={pagenumber >= 1 ? color : 'secondary'}
          h={'2.5rem'}
          w={'6rem'}
          border={'.0625rem solid'}
          borderColor={color}
          transform={'skew(30deg)'}
        >
          <Box
            h={'1.9rem'}
            w={'1.9rem'}
            transform={'skew(-30deg)'}
            bgColor={color}
            border={'.2rem solid'}
            borderColor={pagenumber >= 1 ? 'secondary' : color}
            borderRadius={'50%'}
            textAlign={'center'}
            fontSize={'1rem'}
            fontWeight={'700'}
            color={'secondary'}
          >
            1
          </Box>
        </Flex>
        <Flex
          justify={'center'}
          alignItems={'center'}
          bgColor={pagenumber >= 2 ? color : 'secondary'}
          h={'2.5rem'}
          w={'6rem'}
          border={'.0625rem solid'}
          borderColor={color}
          transform={'skew(30deg)'}
        >
          <Box
            h={'1.9rem'}
            w={'1.9rem'}
            transform={'skew(-30deg)'}
            bgColor={color}
            border={'.2rem solid'}
            borderColor={pagenumber >= 2 ? 'secondary' : color}
            borderRadius={'50%'}
            textAlign={'center'}
            fontSize={'1rem'}
            fontWeight={'700'}
            color={'secondary'}
          >
            2
          </Box>
        </Flex>
        <Flex
          justify={'center'}
          alignItems={'center'}
          bgColor={pagenumber >= 3 ? color : 'secondary'}
          h={'2.5rem'}
          w={'6rem'}
          border={'.0625rem solid'}
          borderColor={color}
          transform={'skew(30deg)'}
        >
          <Box
            h={'1.9rem'}
            w={'1.9rem'}
            transform={'skew(-30deg)'}
            bgColor={color}
            border={'.2rem solid'}
            borderColor={pagenumber >= 3 ? 'secondary' : color}
            borderRadius={'50%'}
            textAlign={'center'}
            fontSize={'1rem'}
            fontWeight={'700'}
            color={'secondary'}
          >
            3
          </Box>
        </Flex>
        <Flex
          justify={'center'}
          alignItems={'center'}
          bgColor={pagenumber >= 4 ? color : 'secondary'}
          h={'2.5rem'}
          w={'6rem'}
          border={'.0625rem solid'}
          borderColor={color}
          transform={'skew(30deg)'}
        >
          <Box
            h={'1.9rem'}
            w={'1.9rem'}
            transform={'skew(-30deg)'}
            bgColor={color}
            border={'.2rem solid'}
            borderColor={pagenumber >= 4 ? 'secondary' : color}
            borderRadius={'50%'}
            textAlign={'center'}
            fontSize={'1rem'}
            fontWeight={'700'}
            color={'secondary'}
          >
            4
          </Box>
        </Flex>
      </HStack>
    </Box>
  );
}

export default Progress;
