import { Heading, Link, Stack } from "@chakra-ui/react";
import Config from "../resources/site-config.json";

export default function Header() {
  return (
    <Stack direction='row' mt='0.5em' mb='0.5em'>
      <Link href='/'>
        <Heading as='h2' fontWeight={300} fontSize='1.8em'>
          {Config.title}
        </Heading>
      </Link>
    </Stack>
  )
}
