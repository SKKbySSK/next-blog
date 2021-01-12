import { Heading, Link } from "@chakra-ui/react";
import Config from "../resources/site-config.json";

export default function Header() {
  return (
    <Link href='/'>
      <Heading as='h2' fontWeight={300} fontSize='1.8em' mt='0.5em' mb='0.5em'>
        {Config.title}
      </Heading>
    </Link>
  )
}
