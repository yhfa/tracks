import { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Box,
  List,
  ListItem,
  ListIcon,
  Divider,
  LinkBox,
  LinkOverlay,
} from '@chakra-ui/layout';
import {
  MdHome,
  MdSearch,
  MdLibraryMusic,
  MdPlaylistAdd,
  MdFavorite,
} from 'react-icons/md';

import { usePlaylist } from '../hooks/playlist';

const navMenu = [
  {
    label: 'Home',
    icon: MdHome,
    route: '/',
  },
  {
    label: 'Search',
    icon: MdSearch,
    route: '/search',
  },
  {
    label: 'Your Library',
    icon: MdLibraryMusic,
    route: '/library',
  },
];

const musicMenu = [
  {
    label: 'Create Playlist',
    icon: MdPlaylistAdd,
    route: '/',
  },
  {
    label: 'Favorites',
    icon: MdFavorite,
    route: '/favorites',
  },
];

const Sidebar: FC = () => {
  const { playlists } = usePlaylist();
  return (
    <Box w="100%" h="calc(100vh - 100px)" bg="black" px="5px" color="gray">
      <Box h="100%" py="20px">
        <Box w="120px" mb="20px" px="20px">
          <Image src="/logo.svg" height={60} width={120} />
        </Box>
        {/* Nav menu list */}
        <Box mb="20px">
          <List spacing="2">
            {navMenu.map(item => (
              <ListItem key={item.label} px="20px" fontSize="16px">
                <LinkBox>
                  <Link href={item.route} passHref>
                    <LinkOverlay>
                      <ListIcon as={item.icon} color="white" mr="20px" />
                      {item.label}
                    </LinkOverlay>
                  </Link>
                </LinkBox>
              </ListItem>
            ))}
          </List>
        </Box>

        {/* Music menu list */}
        <Box>
          <List spacing="2">
            {musicMenu.map(item => (
              <ListItem key={item.label} px="20px" fontSize="16px">
                <LinkBox>
                  <Link href={item.route} passHref>
                    <LinkOverlay>
                      <ListIcon as={item.icon} color="white" mr="20px" />
                      {item.label}
                    </LinkOverlay>
                  </Link>
                </LinkBox>
              </ListItem>
            ))}
          </List>
        </Box>

        <Divider mt="20px" color="gray.800" />

        <Box h="44%" overflowY="auto" my="10px">
          <List spacing="2">
            {playlists.map(playlist => (
              <ListItem key={playlist.id} px="20px" fontSize="16px">
                <LinkBox>
                  <Link
                    href={{
                      pathname: '/playlist/[id]',
                      query: { id: playlist.id },
                    }}
                    passHref
                  >
                    <LinkOverlay>{playlist.name}</LinkOverlay>
                  </Link>
                </LinkBox>
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>
    </Box>
  );
};

export default Sidebar;
