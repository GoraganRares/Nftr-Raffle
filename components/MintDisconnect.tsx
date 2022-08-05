import { useRouter } from 'next/router';
import { Box, Button, Image } from '@chakra-ui/react';
import { useCallback, FC } from 'react';
import { ActionButton } from '../components/ActionButton';
import { BasicButton } from './BasicButton';
import { SocialMediaIcons } from '../components/SocialMediaIcons';
import { LoginModalButton } from '../components/LoginModalButton';

interface ActionButtonProps {
  onClick: () => void;
  isFullWidth?: boolean;
  disabled?: boolean;
}

interface MintDisconnectProps {
  enabled: string[];
}

export const MintDisconnect: FC<MintDisconnectProps> = ({ enabled }) => {
  const router = useRouter();

  const handleMintClick = useCallback(() => {
    router.push('/mint');
  }, [router]);

  return (
    <Box
    cursor='pointer'
    display='flex'
    width='100%'
    justifyContent='center'
    >
      {/* {enabled.includes('about') && (
        <Button
          variant="link"
          color="elvenTools.white"
          _focus={{ outline: 'none' }}
          mr={2}
          onClick={handleAboutClick}
        >
          About
        </Button>
      )} */}
      {/* <SocialMediaIcons /> */}
      
      {/* {enabled.includes('auth') && (
        <BasicButton onClick={handleMintClick}>
          {enabled.includes('auth') 
        </BasicButton>
      )} */}
      {enabled.includes('auth') && <LoginModalButton />}
    </Box>
  );
};
