import NextLink from 'next/link';
import { Box, Text, keyframes } from '@chakra-ui/react';

export const Logo = () => {
  return (
    <NextLink href="/">
      <Box
        display="flex"
        alignItems="center"
        gap={2}
        position="relative"
        userSelect="none"
      >
      </Box>
    </NextLink>
  );
};
