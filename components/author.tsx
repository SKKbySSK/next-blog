import { Stack, Text, Box, Avatar, Link } from "@chakra-ui/react";
import React from "react";
import Config from "../resources/site-config.json";

export default function Author() {
  return (
    <Stack ml='auto' mr='auto' mt='2em' mb='2em' width='80%'>
      <Box height='1px' backgroundColor='gray.500' />
      <Stack direction='row' pl='0.5em' pr='0.5em' align='center'>
        <Avatar name={Config.author} src='/profile.png' />
        <Box pl='1em'>
          {'Written by '}
          <Link href={'https://twitter.com/' + Config.authorTwitter} style={{ color: 'darkorange' }}>
            <Text as='p' fontWeight={700} display='inline'>{Config.author}</Text>
          </Link>
          {', '}
          {Config.authorDescription}
        </Box>
      </Stack>
    </Stack>
  )
}