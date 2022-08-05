import { Box, Spinner, Text } from '@chakra-ui/react';
import { FC } from 'react';
import { VMOutput } from '../hooks/interaction/useScQuery';

interface AllowWinnerProps {
  data?: VMOutput;
  dataLoading?: boolean;
}
export const AllowWinner: FC<AllowWinnerProps> = ({
  data,
  dataLoading,
}) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent={{ base: 'center', md: 'center' }}
    >
      {dataLoading ? (
        <Spinner ml={3} color="elvenTools.color2.base" />
      ) : (
        <Text
          color="elvenTools.color2.base"
          fontSize="3xl"
          fontWeight="800"
          ml={3}
        >
          {data?.data?.data}
        </Text>
      )}
    </Box>
  );
};
