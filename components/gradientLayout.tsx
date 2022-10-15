import { FC } from 'react';
import { Box, Flex, Text } from '@chakra-ui/layout';
import { Image } from '@chakra-ui/react';

interface Props {
  color: string;
  image: string;
  title: string;
  subtitle: string;
  description: string;
  roundImage: boolean;
}

const GradientLayout: FC<Props> = ({
  color,
  image,
  title,
  subtitle,
  description,
  roundImage,
  children,
}) => {
  return (
    <Box
      h="100%"
      overflowY="auto"
      bgGradient={`linear(${color}.500 0%, ${color}.600 15%, ${color}.700 40%, rgba(0,0,0,.95)) 75%`}
    >
      <Flex bg={`${color}.600`} p="40px" align="end">
        <Box p="20px">
          <Image
            boxSize="100px"
            boxShadow="2xl"
            src={image}
            borderRadius={roundImage ? '100%' : '3px'}
          />
        </Box>
        <Box p="20px" lineHeight="40px" color="white">
          <Text fontSize="x-small" fontWeight="bold" casing="uppercase">
            {subtitle}
          </Text>
          <Text fontSize="6xl">{title}</Text>
          <Text fontSize="x-small">{description}</Text>
        </Box>
      </Flex>
      {children}
    </Box>
  );
};

export default GradientLayout;
