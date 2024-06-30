import React from 'react'
import { Box, Container,Tab,TabList,TabPanel,TabPanels,Tabs,Text } from '@chakra-ui/react'
import Login from './Login'
import Signup from './Signup'

const HomePage = () => {
  return (
    <Container maxW='xl' centerContent>
      <Box
          d="flex" justifyContent="center" 
          p={3} background="white"
          w="100%"
          m="40px 0 15px 0"
          borderRadius="lg"
          borderWidth="1px">

        <Text fontSize="4xl" fontFamily="Share Tech Mono" color={'black'}>
          Gamer's Vista
        </Text>
      </Box>

      <Box bg="white" w="100%" p={4} borderRadius="lg" borderWidth="1px">
      <Tabs isFitted variant="soft-rounded">
          <TabList mb="1em">
            <Tab width="50%">Dive In</Tab>
            <Tab width="50%">Join</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login/>
            </TabPanel>
            <TabPanel>
             <Signup/>
            </TabPanel>
          </TabPanels>
        </Tabs>


      </Box>

    </Container>
  )
}

export default HomePage
