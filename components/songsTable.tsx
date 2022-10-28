import { FC } from 'react';
import { Song } from '@prisma/client';
import { useStoreActions } from 'easy-peasy';
import { Box } from '@chakra-ui/layout';
import { Table, Thead, Td, Tr, Th, Tbody, IconButton } from '@chakra-ui/react';
import { BsFillPlayFill } from 'react-icons/bs';
import { AiOutlineClockCircle } from 'react-icons/ai';

import { formatTime, formatData } from '../lib/formatter';

const SongTable: FC<{ songs: Song[] }> = ({ songs }) => {
  const playSongs = useStoreActions((stroe: any) => stroe.changeActiveSongs);
  const setActiveSong = useStoreActions((stroe: any) => stroe.changeActiveSong);

  const handlePlay = (activeSong?: Song) => {
    setActiveSong(activeSong || songs[0]);
    playSongs(songs);
  };

  return (
    <Box bg="transparent" color="white">
      <Box p="10px" mb="20px">
        <Box mb="20px">
          <IconButton
            icon={<BsFillPlayFill fontSize="30px" />}
            colorScheme="green"
            size="lg"
            isRound
            aria-label="Play button"
            onClick={() => handlePlay()}
          />
        </Box>
        <Table variant="unstyled">
          <Thead borderBottom="1px solid" borderColor="rgba(255,255,255,.2)">
            <Tr>
              <Th>#</Th>
              <Th>Title</Th>
              <Th>Date Added</Th>
              <Th>
                <AiOutlineClockCircle />
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {songs.map((song, index) => (
              <Tr
                key={song.id}
                transition="all .3s"
                _hover={{ bg: 'rgba(255, 255, 255, 0.1)' }}
                cursor="pointer"
                onClick={() => handlePlay(song)}
              >
                <Td>{index + 1}</Td>
                <Td>{song.name}</Td>
                <Td>{formatData(song.createdAt)}</Td>
                <Td>{formatTime(song.duration)}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
};

export default SongTable;
