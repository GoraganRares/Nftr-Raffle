import { Box, Text, useBreakpointValue, Image } from '@chakra-ui/react';
import { useCallback } from 'react';
import { Address } from '@elrondnetwork/erdjs';
import { useScQuery, SCQueryType } from '../hooks/interaction/useScQuery';
import { MintForm } from './MintForm';
import { Authenticated } from './Authenticated';
import { MintDisconnect } from '../components/MintDisconnect'
import { useAccount } from '../hooks/auth/useAccount';
import { LoginModalButton } from './LoginModalButton';
import {
  isDropActive,
  smartContractAddress,
  tokensLimitPerAddressTotal,
  tokensLimitPerAddressPerDrop,
  isAllowlistEnabled,
  isMintingStarted,
} from '../config/nftSmartContract';
import { networkConfig, chainType } from '../config/network';
import { NFTLeftToMint } from './NFTLeftToMint';
import { NFTAllowlistEnabled } from './NFTAllowlistEnabled';
import { AllowWinner } from './allowWinner';
// import { NFTMintedAlready } from './NFTMintedAlready';
import { NFTLeftToMintPerAddress } from './NFTLeftToMintPerAddress';

// TODO: Prepare sc query hooks for all cases
// TODO: Prepare separate components for the segments here
// TODO: refactor it a bit

export const MintHero = () => {
  let { address } = useAccount();
  // let adress: string = {address};
  // if(address == 'erd1ugfsm4wsk70aspz4agych4408599ehkmznkml9rugup766knw7fq02da8r'){
  //     console.log('da');
  //   }
  // console.log(address);
  const {
    data,
    mutate: refreshData,
    isLoading: totalIsLoading,
  } = useScQuery({
    type: SCQueryType.INT,
    payload: {
      scAddress: smartContractAddress,
      funcName: 'totalEntries',
      args: [],
    },
  });
  
  // let da = 'erd1ugfsm4wsk70aspz4agych4408599ehkmznkml9rugup766knw7fq02da8r';
  // function Json() {
  //   if ( adress = 'erd1ugfsm4wsk70aspz4agych4408599ehkmznkml9rugup766knw7fq02da8r'){

  //   }
  // }
  const {
    data: dropData,
    mutate: refreshDropData,
    isLoading: dropIsLoading,
  } = useScQuery({
    type: SCQueryType.INT,
    payload: {
      scAddress: smartContractAddress,
      funcName: 'totalEntries',
      args: [],
    },
    autoInit: isDropActive,
  });

  // if ( {adress} )

  const {
    data: mintedData,
    mutate: refreshMintedData,
    isLoading: mintedDataLoading,
  } = useScQuery({
    type: SCQueryType.INT,
    payload: {
      scAddress: smartContractAddress,
      funcName: 'getEntriesPerAddress',
      args: address ? [Address.fromBech32(address)?.hex()] : [],
    },
    autoInit: Boolean(address),
  });

  const { data: mintedPerDropData, mutate: refreshMintedPerDropData } =
    useScQuery({
      type: SCQueryType.INT,
      payload: {
        scAddress: smartContractAddress,
        funcName: 'getMintedPerAddressPerDrop',
        args: address ? [Address.fromBech32(address)?.hex()] : [],
      },
      autoInit: Boolean(address && isDropActive),
    });

  const { data: allowlistCheckData, isLoading: allowlistCheckLoading } =
    useScQuery({
      type: SCQueryType.INT,
      payload: {
        scAddress: smartContractAddress,
        funcName: 'getAllowlistAddressCheck',
        args: address ? [Address.fromBech32(address)?.hex()] : [],
      },
      autoInit: Boolean(address && isAllowlistEnabled),
    });

    const { data: allowWinner, isLoading: allowWinnerLoading } =
      useScQuery({
        type: SCQueryType.HFF,
        payload: {
          scAddress: smartContractAddress,
          funcName: 'getWinner',
        },
      });
  const handleRefreshData = useCallback(() => {
    refreshData();
    refreshMintedData();
    refreshMintedPerDropData();
    refreshDropData();
  }, [
    refreshData,
    refreshMintedData,
    refreshMintedPerDropData,
    refreshDropData,
  ]);

  const getLeftToMintForUser = useCallback(() => {
    let leftPerDrop = 0;
    let leftInTotal = 0;

    if (isAllowlistEnabled && Number(allowlistCheckData?.data?.data) === 0) {
      return 0;
    }

    if (mintedPerDropData?.data?.data) {
      leftPerDrop =
        tokensLimitPerAddressPerDrop - Number(mintedPerDropData.data.data);
    }
    if (mintedData?.data?.data) {
      leftInTotal = tokensLimitPerAddressTotal - Number(mintedData.data.data);
    }
    if (!isDropActive || leftPerDrop > leftInTotal) {
      return leftInTotal;
    }
    return leftPerDrop;
  }, [
    allowlistCheckData?.data?.data,
    mintedData?.data.data,
    mintedPerDropData?.data.data,
  ]);

  const isContentCentered = useBreakpointValue({ base: true, md: false });

  return (
    <Box 
      width="100%"
      display='flex'
      justifyContent='center'
      alignItems='center'
      flexDirection='column'
      backgroundColor='#000'
      border='1px solid #17E800'
      borderRadius='15px'
      padding='20px 50px'
      paddingBottom='0px'
      maxWidth='max-content'
      sx={{
        '@media screen and (max-width: 750px)': {
          padding: '20px 20px',
          paddingBottom:'0px'
        },
      }}
    >
      <Text
        as="h2"
        color='#17E800'
        fontSize="20"
        textAlign={{ base: 'center', md: 'left' }}
        sx={{
          '@media screen and (max-width: 750px)': {
            fontSize: '15px',
          },
        }}
      >
        &quot;Chance favors the prepared mind&quot;
      </Text>
      <Text
        as="h3"
        fontSize="13"
        color='#17E800'
        fontStyle='italic'
        textAlign={{ base: 'center', md: 'left' }}
      >
        Louis Pasteur
      </Text>
      
        <Box mt={6} display='flex' flexDirection='column' justifyContent='center' alignItems='center'>
          
          <Box width='100%'>
            <Authenticated
              fallback={
                <Box
                  mt={6}
                  display="flex"
                  justifyContent={isContentCentered ? 'center' : 'center'}
                >
                  {/* <LoginModalButton /> */}
                </Box>
              }
              spinnerCentered={isContentCentered}
            >
              <Box position='relative'>
                <Image
                  margin='0 auto'
                  width='250px'
                  border='2px solid #17E800'
                  borderRadius='25px'
                  src="../nft.webp"
                  alt='Hyped Kicks Club'
                  zIndex='2'
                  position='relative'                  
                  sx={{
                    '@media screen and (max-width: 750px)': {
                      width:'100%',
                    },
                  }}
                >
                </Image>
                <Text
                  position='absolute'
                  bgColor='#17E800'
                  transform='rotate(270deg) translate(15%, -50%)'
                  zIndex='1'
                  left='-80px'
                  color='#000'
                  top='50%'
                  borderRadius='25px'
                  padding='35px'
                  paddingTop='7px'
                  sx={{
                    '@media screen and (max-width: 750px)': {
                      left: '0px',
                    },
                  }}
                >
                  Hyped Kicks Club
                </Text>
                <Text
                  position='absolute'
                  transform='rotate(90deg) translate(-15%, -50%)'
                  zIndex='1'
                  bgColor='#17E800'
                  right='-80px'
                  color='#000'
                  top='50%'
                  borderRadius='25px'
                  padding='35px'
                  paddingTop='7px'
                  sx={{
                    '@media screen and (max-width: 750px)': {
                      right: '0px',
                    },
                  }}
                >
                  Hyped Kicks Club
                </Text>
              </Box>
              {/* <NFTAllowlistEnabled
                data={allowlistCheckData}
                dataLoading={allowlistCheckLoading}
              /> */}
              <AllowWinner
                data={allowWinner}
                dataLoading={allowWinnerLoading}
              />
              {/* <NFTMintedAlready
                data={mintedData}
                dataLoading={mintedDataLoading}
              /> */}
              <NFTLeftToMint
                data={data}
                dropData={dropData}
                dataLoading={isDropActive ? dropIsLoading : totalIsLoading}
              />
              <MintForm
                cb={handleRefreshData}
                leftToMintForUser={getLeftToMintForUser()}
                NFTLeftToMint={0}
              />
            </Authenticated>
          </Box>
          {/* <Text
            as="p"
            color='#17E800'
            fontSize="17"
            textAlign='center'
            width='100%'
            mb='20px'
          >
            * Thank you!
          </Text> */}
          <MintDisconnect enabled={['auth', 'about']} />
        </Box>
    </Box>
  );
};
