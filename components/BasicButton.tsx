import { Box } from '@chakra-ui/react';
import { FC, useCallback } from 'react';

interface BasicButtonProps {
  onClick: () => void;
  isFullWidth?: boolean;
  disabled?: boolean;
}

export const BasicButton: FC<BasicButtonProps> = ({
  children,
  onClick,
  isFullWidth = false,
  disabled = false,
  ...props
}) => {
  const handleClick = useCallback(() => {
    if (!disabled) {
      onClick?.();
    }
  }, [disabled, onClick]);

  return (
    <Box
      as="button"
      borderColor="#000"
      borderWidth={2}
      bgColor="#17E800"
      width='100%'
      maxWidth='185px'
      py={2}
      px={6}
      rounded="xl"
      bgRepeat='no-repeat'
      bgSize='cover'
      fontWeight="normal"
      padding='10px 20px'
      _hover={!disabled ? { bg: '#17E800', color:'#000', padding: '15px', width:'190px', maxWidth: 'none' } : {}}
      cursor={disabled ? 'not-allowed' : 'pointer'}
      color="#000"
      userSelect="none"
      transition="background-color .3s"
      onClick={handleClick}    
      opacity={!disabled ? 1 : 0.5}
      sx={{
        '@media screen and (max-width: 750px)': {
          fontSize: '10px',
          maxWidth:  '120px',
          padding: '10px 8px'
        },
      }}
      {...props}
    >
      {children}
    </Box>
  );
};
