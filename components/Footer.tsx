import { Container, Box, Image, Link, Text } from '@chakra-ui/react';

export const Footer = () => {
  return (
    <Box backgroundColor='rgba(0, 0, 0, 0.8)' padding='20px'>
      <Box>
        <Box width="100%" marginBottom={2} display={'flex'} flexDirection={'row'} justifyContent={'center'} alignItems={'center'}>
          <Link href="https://discord.gg/nftrmarket">
            <Image
              width={10}
              marginRight={5}
              src="../discord.svg"
              alt='discord'
            />
          </Link>
          <Link href="https://twitter.com/hypiumnft">
            <Image
              width={10}
              marginRight={5}
              src="../twitter.svg"
              alt='discord'
            />
          </Link>
          <Link href="https://t.me/nftrmarket">
            <Image
              width={10}
              src="../telegram.svg"
              alt='discord'
            />
          </Link>
        </Box>
        <Link href="https://app.nftr.market/" color='#17E800' width="100%" display={'flex'} flexDirection={'row'} justifyContent={'center'} alignItems={'center'} target={'_blank'}>
          Made with
          <Image
              margin='0px 5px'
              width={10}
              src="../brain.webp"
              alt='discord'
            />
          by nftr.market
        </Link>
      </Box>
    </Box>
  );
};
