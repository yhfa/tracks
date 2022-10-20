import { NextPage } from 'next';
import { Artist } from '@prisma/client';
import { Box, Flex, Text } from '@chakra-ui/layout';
import { Image } from '@chakra-ui/react';

import GradientLayout from '../components/gradientLayout';
import prisma from '../lib/prisma';
import { useMe } from '../hooks/me';

const Home: NextPage<{ artists: Artist[] }> = ({ artists }) => {
  const { user, isLoading } = useMe();

  return (
    // TODO: add custom image per user
    <GradientLayout
      color="purple"
      isLoading={isLoading || !user}
      image={`https://avatars.dicebear.com/api/initials/
      ${user?.firstName} ${user?.lastName}.svg?background=purple`}
      title={`${user?.firstName} ${user?.lastName}`}
      subtitle="profile"
      description={`${user?.playlistCount} public playlist`}
      roundImage
    >
      <Box color="white" px="40px">
        <Box mb="40px">
          <Text fontSize="2xl" fontWeight="bold">
            Top Artist this month
          </Text>
          <Text fontSize="md">Only visible to you</Text>
        </Box>
        <Flex gap="20px">
          {artists.map(artist => (
            <Box
              key={artist.id}
              bg="gray.900"
              flex="20%"
              borderRadius="4px"
              p="15px"
            >
              <Image
                src={`https://avatars.dicebear.com/api/micah/${artist.name}.svg`}
                borderRadius="100%"
              />
              <Box mt="20px">
                <Text fontSize="large">{artist.name}</Text>
                <Text fontSize="x-small">Artist</Text>
              </Box>
            </Box>
          ))}
        </Flex>
      </Box>
    </GradientLayout>
  );
};

export async function getServerSideProps() {
  let artists: Artist[];
  try {
    artists = await prisma.artist.findMany({});
    return {
      props: { artists },
    };
  } catch (err) {
    console.error(err);
  }
  return {
    props: { artists: artists || [] },
  };
}

export default Home;
