import { FC, useEffect, useRef, useState } from 'react';
import { Song } from '@prisma/client';
import {
  ButtonGroup,
  Box,
  IconButton,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderTrack,
  RangeSliderThumb,
  Center,
  Flex,
  Text,
} from '@chakra-ui/react';
import {
  MdShuffle,
  MdSkipPrevious,
  MdSkipNext,
  MdOutlinePlayCircleFilled,
  MdOutlinePauseCircleFilled,
  MdOutlineRepeat,
} from 'react-icons/md';
import { useStoreActions } from 'easy-peasy';
import ReactHowler from 'react-howler';

const Player: FC<{ songs: Song[]; activeSong: Song }> = ({
  songs,
  activeSong,
}) => {
  const [playing, setPlaying] = useState(true);
  const [index, setIndex] = useState(0);
  const [seek, setSeek] = useState(0.0);
  const [repeat, setRepeat] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [duration, setDuration] = useState(0.0);

  const setPlayingState = (value: boolean) => setPlaying(value);
  const toggleShuffle = () => setShuffle(state => !state);
  const toggleRepeat = () => setRepeat(state => !state);

  return (
    <Box>
      <Box>
        <ReactHowler playing={playing} src={activeSong?.url} />
      </Box>
      <Center color="gray.600">
        <ButtonGroup>
          <IconButton
            icon={<MdShuffle />}
            outline="none"
            variant="link"
            aria-label="Shuffle"
            fontSize="24px"
            onClick={toggleShuffle}
            color={shuffle ? 'white' : 'inherit'}
          />
          <IconButton
            icon={<MdSkipPrevious />}
            outline="none"
            variant="link"
            aria-label="Previous"
            fontSize="24px"
          />
          {playing ? (
            <IconButton
              icon={<MdOutlinePauseCircleFilled />}
              outline="none"
              variant="link"
              aria-label="Pause"
              color="white"
              fontSize="40px"
              onClick={() => setPlayingState(false)}
            />
          ) : (
            <IconButton
              icon={<MdOutlinePlayCircleFilled />}
              outline="none"
              variant="link"
              aria-label="Play"
              fontSize="40px"
              color="white"
              onClick={() => setPlayingState(true)}
            />
          )}
          <IconButton
            icon={<MdSkipNext />}
            outline="none"
            variant="link"
            aria-label="Next"
            fontSize="24px"
          />
          <IconButton
            icon={<MdOutlineRepeat />}
            outline="none"
            variant="link"
            aria-label="Repeat"
            fontSize="24px"
            onClick={toggleRepeat}
            color={repeat ? 'white' : 'inherit'}
          />
        </ButtonGroup>
      </Center>

      <Box color="gray.600">
        <Flex justify="center" align="center">
          <Box flexBasis="10%">
            <Text fontSize="xs">1:21</Text>
          </Box>
          <Box flexBasis="80%">
            <RangeSlider
              aria-label={['min', 'max']}
              step={0.1}
              min={0}
              max={100}
              id="player-range"
            >
              <RangeSliderTrack bg="gray.600">
                <RangeSliderFilledTrack bg="gray.800" />
              </RangeSliderTrack>
              <RangeSliderThumb index={0} />
            </RangeSlider>
          </Box>
          <Box flexBasis="10%" textAlign="right">
            <Text fontSize="xs">3:11</Text>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};

export default Player;
