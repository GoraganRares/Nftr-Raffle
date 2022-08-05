import { Box, Spinner, Text } from '@chakra-ui/react';
import { FC } from 'react';
import { VMOutput } from '../hooks/interaction/useScQuery';
import { isDropActive } from '../config/nftSmartContract';

interface NFTLeftToMintProps {
  data?: VMOutput;
  dropData?: VMOutput;
  dataLoading?: boolean;
}

export const NFTLeftToMint: FC<NFTLeftToMintProps> = ({
  data,
  dropData,
  dataLoading,
}) => {
  return (
    <Box
      display="flex"
      justifyContent='center'
      flexDirection='row'
      alignItems='center'
      mb='20px'
    >
      <Text fontSize={{ base: 'md', sm: 'xl' }} fontWeight="bold">
        {isDropActive ? 'Current drop' : ''}{' '}
      </Text>
      {dataLoading ? (
        <Spinner ml={3} color="elvenTools.color2.base" />
      ) : (
        <Text
          display='flex' alignItems='center'
          fontSize={{ base: 'md', sm: 'xl' }} fontWeight="bold"
        >
          Total Entries:  
          <Text
            color="elvenTools.color2.base"
            fontSize="3xl"
            fontWeight="800"
            ml={3}
            mr={1}
          >
            {isDropActive ? dropData?.data.data : data?.data?.data}
          </Text>
          {/* <Text
              display='flex' alignItems='center'
              fontSize={{ base: 'md', sm: 'xl' }} fontWeight="bold"
            >
              / 450
          </Text> */}
        </Text>
      )}
    </Box>
  );
};
