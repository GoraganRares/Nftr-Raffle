import type { NextPage } from 'next';
import { Box, Image } from '@chakra-ui/react';
import { MainLayout } from '../components/MainLayout';
import { HeaderMenu } from '../components/HeaderMenu';
import { Hero } from '../components/Hero';
import { HeaderMenuButtons } from '../components/HeaderMenuButtons';
// import { HeroImage } from '../components/HeroImage';
import { Faq } from '../components/Faq';
import { Roadmap } from '../components/Roadmap';
import { Team } from '../components/Team';

const Home: NextPage = () => {
  return (
    <MainLayout>
      <Box
        backgroundColor='#000'
        border='1px solid #17E800'
        borderRadius='15px'
        borderTopRadius='0px'
        padding='20px 50px'
        display="flex"
        // justifyContent="space-between"
        justifyContent="center"
        align-items="center"
        position='absolute'
        top='-1px'
        left='50%'
        transform="translate(-50%, 0px)"
        mb='20px'
        // mt={{ base: 8, xl: 12, '2xl': 24 }}
      >
        <Image
          margin='0 auto'
          width='200px'
          src="../logo.svg"
          alt='nft'
          
        >
        </Image>
      </Box>
      <Box
        display="flex"
        // justifyContent="space-between"
        justifyContent="center"
        align-items="center"
        // mt={{ base: 8, xl: 12, '2xl': 24 }}
      >
        <Hero />
        {/* <HeroImage /> */}
      </Box>
      {/* <HeaderMenu>
        <Box margin={'auto'}>
          <HeaderMenuButtons enabled={['auth', 'mint', 'about']} />
        </Box>
      </HeaderMenu> */}
    </MainLayout>
  );
};

export default Home;
