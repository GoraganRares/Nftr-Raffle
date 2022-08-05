import { Box, Text, Image,useBreakpointValue, AbsoluteCenter } from '@chakra-ui/react';
import { CollectionInfoBox } from './CollectionInfoBox';
import { chainType, networkConfig } from '../config/network';
import { useScQuery, SCQueryType } from '../hooks/interaction/useScQuery';
import { HeaderMenu } from '../components/HeaderMenu';
import { HeaderMenuButtons } from '../components/HeaderMenuButtons';
import { MintForm } from './MintForm';
import { Authenticated } from './Authenticated';
import { LoginModalButton } from './LoginModalButton';
import { MintDisconnect } from '../components/MintDisconnect'
import { useAccount } from '../hooks/auth/useAccount';
import {
  isDropActive,
  tokensLimitPerAddressTotal,
  tokensLimitPerAddressPerDrop,
  isAllowlistEnabled,
  isMintingStarted,
  // collectionTicker,
  smartContractAddress,
  collectionSize,
} from '../config/nftSmartContract';
import { motion } from 'framer-motion';
import { NFTLeftToMint } from './NFTLeftToMint';
import { NFTAllowlistEnabled } from './NFTAllowlistEnabled';
import { NFTMintedAlready } from './NFTMintedAlready';
import { NFTLeftToMintPerAddress } from './NFTLeftToMintPerAddress';
import { shortenHash } from '../utils/shortenHash';
import { useCallback } from 'react';
import { Address } from '@elrondnetwork/erdjs';
export const Hero = () => {
  let { address } = useAccount();

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
      funcName: 'getMintedPerAddressTotal',
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
    <Box width="100%" display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>
      <Box
        display='flex'
        justifyContent='center'
        alignContent='center'
        flexDirection='column'
        position='relative'
        zIndex='5'
        backgroundColor='#000'
        border='1px solid #17E800'
        borderRadius='10px'
        padding='40px 70px'
      >
        <Text
          fontSize='17px'
          textAlign='center'
          mb='20px'
          color='#17E800'
        >
          No other emotion is more powerful than FOMO.
          {/* <br /><br /> */}
        </Text>
        <Text
          fontSize='17px'
          textAlign='center'
          display='flex'
          justifyContent='center'
          color='#17E800'
        >
          <NFTLeftToMint
              data={data}
              dropData={dropData}
              dataLoading={isDropActive ? dropIsLoading : totalIsLoading}
            />
        </Text>
        <Text
          as='span'
          fontSize='13px'
          textAlign='center'
          mb='20px'
          color='#17E800'
          display='flex'
          flexDirection='row'
          justifyContent='center'
          alignItems='center'
        >
          Status: 
          <Image
            width='10px'
            marginLeft='5px'
            src="../dot.svg"
            alt='dot'
          >
          </Image>
        </Text>
        <Text
          as='span'
          fontWeight={800}
          fontSize='13px'
          textAlign='center'
          mb='20px'
          color='#17E800'
        >
          Trust your intuition
          {/* <br /><br /> */}
        </Text>
        <HeaderMenuButtons enabled={['auth', 'mint', 'about']} />
      </Box>
    </Box>
  );
};
