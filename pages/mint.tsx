import type { NextPage } from 'next';
import { Box, Show, Image } from '@chakra-ui/react';
import { MainLayout } from '../components/MainLayout';
import { HeaderMenu } from '../components/HeaderMenu';
import { HeaderMenuButtons } from '../components/HeaderMenuButtons';
import { MintDisconnect } from '../components/MintDisconnect'
import { MintHero } from '../components/MintHero';
import { HeroImage } from '../components/HeroImage';

const Mint: NextPage = () => {
  return (
    <MainLayout>
      <Box
        backgroundColor='#000'
        border='1px solid #17E800'
        borderRadius='15px'
        borderTopRadius='0px'
        padding='10px 30px'
        display="flex"
        // justifyContent="space-between"
        justifyContent="center"
        align-items="center"
        position='absolute'
        top='-1px'
        left='50%'
        transform="translate(-50%, 0px)"
        mb='20px'
        sx={{
          '@media screen and (max-width: 750px)': {
            padding: '5px 22px',
          },
        }}
        // mt={{ base: 8, xl: 12, '2xl': 24 }}
      >
        <Image
          margin='0 auto'
          width='100px'
          src="../logo.svg"
          alt='nft'
          sx={{
            '@media screen and (max-width: 750px)': {
              width:'60px'
            },
          }}
        >
        </Image>
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        mt={{ base: 8, xl: 12, '2xl': 24 }}
      >
        <MintHero />
        {/* <HeroImage /> */}
      </Box>
      {/* <HeaderMenu> */}
      {/* </HeaderMenu> */}
    </MainLayout>
  );
};

export default Mint;
