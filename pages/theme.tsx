
import { extendTheme } from "@chakra-ui/react"
import { mode } from "@chakra-ui/theme-tools"

export const theme = extendTheme({
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: true,
  },
  styles: {
    global: (props) => ({
      body: {
        bg: mode('gray.200', 'gray.900')(props),
      }
    })
  },
})
