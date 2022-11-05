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
import { formatTime } from '../lib/formatter';

const Player: FC<{ songs: Song[]; activeSong: Song }> = ({
  songs,
  activeSong,
}) => {
  const [playing, setPlaying] = useState(true);
  const [index, setIndex] = useState(
    songs.findIndex(song => song.id === activeSong.id)
  );
  const [seek, setSeek] = useState(0.0);
  const [repeat, setRepeat] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [duration, setDuration] = useState(0.0);
  const [isSeeking, setIsSeeking] = useState(false);
  const soundRef = useRef<ReactHowler>(null);
  const repeatRef = useRef(repeat);
  const setActiveSong = useStoreActions((state: any) => state.changeActiveSong);

  useEffect(() => {
    let timerId: number;
    if (playing && !isSeeking) {
      const f = () => {
        setSeek(soundRef.current.seek());
        timerId = requestAnimationFrame(f);
      };
      timerId = requestAnimationFrame(f);

      return () => cancelAnimationFrame(timerId);
    }

    cancelAnimationFrame(timerId);
  }, [isSeeking, playing]);

  useEffect(() => {
    setActiveSong(songs[index]);
  }, [index, setActiveSong, songs]);

  useEffect(() => {
    repeatRef.current = repeat;
  }, [repeat]);

  const setPlayingState = (value: boolean) => setPlaying(value);
  const toggleShuffle = () => setShuffle(state => !state);
  const toggleRepeat = () => setRepeat(state => !state);

  const prevSongHandler = () => {
    setIndex(state => {
      // If the first song in playlist return to last song in playlist
      return state ? state - 1 : songs.length - 1;
    });
  };

  const nextSongHandler = () => {
    setIndex(state => {
      if (shuffle) {
        const next = Math.floor(Math.random() * songs.length);
        if (next === state) nextSongHandler();

        return next;
      }
      // If the last song in playlist return to first song in playlist
      return state === songs.length - 1 ? 0 : state + 1;
    });
  };

  const onEnd = () => {
    if (repeatRef.current) {
      setSeek(0);
      soundRef.current.seek(0);
    } else {
      nextSongHandler();
    }
  };

  const onLoad = () => {
    const songDuration = soundRef.current.duration();
    setDuration(songDuration);
  };

  const onSeek = e => {
    setSeek(parseFloat(e[0]));
    soundRef.current.seek(e[0]);
  };

  return (
    <Box>
      <Box>
        <ReactHowler
          playing={playing}
          src={activeSong?.url}
          ref={soundRef}
          onLoad={onLoad}
          onEnd={onEnd}
        />
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
            onClick={prevSongHandler}
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
            onClick={nextSongHandler}
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
            <Text fontSize="xs">{formatTime(seek)}</Text>
          </Box>
          <Box flexBasis="80%">
            <RangeSlider
              // eslint-disable-next-line jsx-a11y/aria-proptypes
              aria-label={['min', 'max']}
              step={0.1}
              min={0}
              max={duration ? +duration.toFixed(2) : 0}
              onChange={onSeek}
              value={[seek]}
              onChangeStart={() => setIsSeeking(true)}
              onChangeEnd={() => setIsSeeking(false)}
              id="player-range"
            >
              <RangeSliderTrack bg="gray.800">
                <RangeSliderFilledTrack bg="gray.600" />
              </RangeSliderTrack>
              <RangeSliderThumb index={0} />
            </RangeSlider>
          </Box>
          <Box flexBasis="10%" textAlign="right">
            <Text fontSize="xs">{formatTime(duration)}</Text>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};

export default Player;
