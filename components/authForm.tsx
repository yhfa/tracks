import { FC, FormEvent, useRef, useState } from 'react';
import Image from 'next/image';
import { Box, Flex, Input, Button } from '@chakra-ui/react';
import { useRouter } from 'next/router';
// import { useSWRConfig } from 'swr';
import { auth } from '../lib/mutations';

const AuthForm: FC<{ mode: 'signup' | 'signin' }> = ({ mode }) => {
  const formRef = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(formRef.current);
    const fromDataObj = Object.fromEntries(formData) as {
      email: string;
      password: string;
    };

    try {
      await auth(mode, fromDataObj);
      router.push('/');
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };

  return (
    <Box h="100vh" w="100vw" bg="black" color="white">
      <Flex
        justify="center"
        align="center"
        h="100px"
        borderBottom="white 1px solid"
      >
        <Image src="/logo.svg" height={60} width={120} />
      </Flex>
      <Flex justify="center" align="center" h="calc(100vh - 100px)">
        <Box p="50px" bg="gray.900" borderRadius="6px">
          <form ref={formRef} onSubmit={submitHandler}>
            <Input placeholder="email" type="email" name="email" />
            <Input placeholder="password" type="password" name="password" />
            <Button
              type="submit"
              bg="green.500"
              isLoading={isLoading}
              _hover={{ bg: 'green.300' }}
            >
              {mode}
            </Button>
          </form>
        </Box>
      </Flex>
    </Box>
  );
};

export default AuthForm;
