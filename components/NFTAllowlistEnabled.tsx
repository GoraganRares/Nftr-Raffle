import { Box, Spinner, Text } from '@chakra-ui/react';
import { FC } from 'react';
import { VMOutput } from '../hooks/interaction/useScQuery';
import { isAllowlistEnabled } from '../config/nftSmartContract';

interface NFTAllowlistEnabledProps {
  data?: VMOutput;
  dataLoading?: boolean;
}

export const NFTAllowlistEnabled: FC<NFTAllowlistEnabledProps> = ({
  data,
  dataLoading,
}) => {
  return (
    <>
      {isAllowlistEnabled && (
        <Box
          display="flex"
          alignItems="flex-start"
          flexDirection='column'
          sx={{
            '@media screen and (max-width: 750px)': {
              alignItems: 'center',
            },
          }}
          mt={2}
          mb={2}
          justifyContent={{ base: 'center', md: 'flex-start' }}
        >
          <Box>
            <Text
              as="span"
              fontSize={{ base: 'md', sm: 'xl' }}
              fontWeight="bold"
            >
              You can mint {' '}
            </Text>
            {dataLoading ? (
              <Spinner ml={3} color="elvenTools.color2.base" />
            ) : Number(data?.data?.data) !== 0 ? (
                <Text
                  color="elvenTools.color2.base"
                  as="span"
                  fontWeight="bold"
                  fontSize={{ base: 'md', sm: 'xl' }}
                >
                  10
                </Text>
            ) : (
              <Text
                color="elvenTools.color2.base"
                as="span"
                fontWeight="bold"
                fontSize='30px'
              >
                2
              </Text>
            )}{' '}
            <Text
              as="span"
              fontSize={{ base: 'md', sm: 'xl' }}
              fontWeight="bold"
            >
              max per wallet
            </Text>
          </Box>
          {dataLoading ? (
              <Spinner ml={3} color="elvenTools.color2.base" />
            ) : Number(data?.data?.data) !== 0 ? (
            <Text
              // color="elvenTools.color2.base"
              display='inline-block'
              as="span"
              fontWeight="bold"
              fontSize={{ base: 'md', sm: 'xl' }}
              
            >
              You can mint {' '}
              <Text
              color="elvenTools.color2.base"
              display='inline-block'
              as="span"
              fontWeight="bold"
              mb="10px"
              fontSize={{ base: 'md', sm: 'xl' }}
              >
                5
              </Text>
              {' '} max per tx
            </Text>
            ) : (
              <Text
                color="elvenTools.color2.base"
                as="span"
                fontWeight="bold"
                fontSize='30px'
                mb="10px"
              >
                
              </Text>
            )}{' '}
        </Box>
      )}
    </>
  );
};
