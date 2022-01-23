import { extendTheme } from "@chakra-ui/react"
import { flashless } from "no-flash-chakra"

const config = {
    initialColorMode: 'dark',
    useSystemColorMode: false
}

const theme = extendTheme({config, flashless})

export default theme