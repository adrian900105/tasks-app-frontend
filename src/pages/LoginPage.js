import { Box, Button, FormControl, FormLabel, Stack, Input, Heading } from '@chakra-ui/react'
import React from 'react'
import {IoLogoUsd} from "react-icons/io"
import {PiRedditLogoDuotone} from 'react-icons/pi'
import {PiGitlabLogoLight} from 'react-icons/pi'

function LoginPage() {
  return (
    <div>
        <Box
            p={4}
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100vh"
            maxWidth="400px"
            mx="auto"
            flexDirection="column"
        >
            <Heading 
                display="flex" 
                alignItems="center" 
                fontsize="50px"
                mb="30px"
            >
                <IoLogoUsd color="#38A169"/>
                    Tasker
                </Heading>

            <Stack spacing={3} w="100%">

                <FormControl>
                    <FormLabel>
                        <PiRedditLogoDuotone/>
                        Email
                    </FormLabel>
                    <Input placeholder='Podaj adres email'/>
                </FormControl>

                <FormControl>
                    <FormLabel>
                        <PiGitlabLogoLight/>
                        Hasło
                        </FormLabel>
                    <Input placeholder='Podaj swoje hasło'/>
                </FormControl>

                <Button size="lg" colorScheme='green'>Zaloguj</Button>
            </Stack>
        </Box>
    </div>
  )
}
export default LoginPage

