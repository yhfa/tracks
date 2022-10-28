import { FC } from 'react';
import { useStoreState } from 'easy-peasy';
import { Box, Flex, Text } from '@chakra-ui/layout';
import Player from './player';

const PlayerBar: FC = () => {
  const songs = useStoreState((state: any) => state.activeSongs);
  const activeSong = useStoreState((state: any) => state.activeSong);

  return (
    <Box h="100px" w="100vw" bg="gray.900" p="10px">
      <Flex align="center">
        {activeSong && (
          <>
            <Box p="20px" color="white" flexBasis="30%">
              <Text fontSize="lg">{activeSong.name}</Text>
              <Text fontSize="sm">{activeSong.artist.name}</Text>
            </Box>
            <Box flexBasis="40%">
              <Player songs={songs} activeSong={activeSong} />
            </Box>
          </>
        )}
        <Box flexBasis="30%">TEMP</Box>
      </Flex>
    </Box>
  );
};

export default PlayerBar;
