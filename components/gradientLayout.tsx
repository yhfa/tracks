import { FC } from 'react';
import { Box, Flex, Text } from '@chakra-ui/layout';
import { Image, SkeletonCircle, SkeletonText } from '@chakra-ui/react';

interface Props {
  color: string;
  image: string;
  title: string;
  subtitle: string;
  description: string;
  roundImage: boolean;
  // eslint-disable-next-line react/require-default-props
  isLoading?: boolean;
}

const GradientLayout: FC<Props> = ({
  color,
  image,
  title,
  subtitle,
  description,
  roundImage,
  children,
  isLoading,
}) => {
  return (
    <Box
      h="100%"
      overflowY="auto"
      bgGradient={`linear(${color}.500 0%, ${color}.600 15%, ${color}.700 40%, rgba(0,0,0,.95)) 75%`}
    >
      <Flex bg={`${color}.600`} p="4rem" align="end">
        {isLoading ? (
          <>
            <SkeletonCircle size="100px" p="20px" />
            <SkeletonText
              h="40px"
              w="400px"
              alignSelf="center"
              marginInline="1rem"
            />
          </>
        ) : (
          <>
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
          </>
        )}
      </Flex>

      <Box py="50px">{children}</Box>
    </Box>
  );
};

export default GradientLayout;
