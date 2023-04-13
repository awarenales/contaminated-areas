'use client'

import { CacheProvider } from '@chakra-ui/next-js'
import {
  Box,
  ChakraProvider,
  Container,
  Flex,
  Heading,
  extendTheme,
} from '@chakra-ui/react'
import { usePathname } from 'next/navigation'

import { Navbar } from './components'
import { getRouteTitle } from './utils/routes'

const colors = {
  brand: { orange: '#e4610f' },
}

const theme = extendTheme({ colors })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  return (
    <html lang="pt">
      <head />
      <body>
        <CacheProvider>
          <ChakraProvider theme={theme}>
            <Flex direction="column">
              <Box as="header" bg="brand.orange">
                <Heading as="h1" color="white" textAlign="center" p={3}>
                  {getRouteTitle(pathname) || 'Home'}
                </Heading>
              </Box>
              <Flex>
                <Flex as="nav" direction="column">
                  <Navbar />
                </Flex>
                <Container as="section" p={4} maxW={'120ch'}>
                  {children}
                </Container>
              </Flex>
            </Flex>
          </ChakraProvider>
        </CacheProvider>
      </body>
    </html>
  )
}
