import { Stack, Text, Box, Avatar, Link } from "@chakra-ui/react";
import React from "react";
import Config from "../resources/site-config.json";
import Image from 'next/image'

export default function Author() {
  return (
    <Stack ml='auto' mr='auto' mt='2em' mb='2em' width={['100%', '90%', '70%']}>
      <Box height='1px' backgroundColor='gray.500' />
      <Stack direction='row' pl='0.5em' pr='0.5em' align='center'>
        <Image src='/profile.png' width='60pt' height='60pt' />
        <Box pl='1em' fontSize={['0.9em', '0.9em', '1em']}>
          {'Written by '}
          <Link href={'https://twitter.com/' + Config.authorTwitter} style={{ color: 'darkorange' }}>
            <Text as='p' fontWeight={700} display='inline'>{Config.author}</Text>
          </Link>
          <Text as='p' display={['none', 'inline', 'inline']}>
            {', '}
            {Config.authorDescription}
          </Text>
        </Box>
      </Stack>
    </Stack>
  )
}