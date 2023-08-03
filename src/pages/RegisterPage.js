import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Spinner,
  Stack,
  useToast
} from '@chakra-ui/react'
import React, { useState } from 'react'
import { IoLogoReddit, IoLogoUsd } from 'react-icons/io'
import { PiGitlabLogoLight, PiRedditLogoDuotone } from 'react-icons/pi'

function RegisterPage() {

  const toast = useToast()
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const changeUsername = (e) => setUsername(e.target.value)
  const changeEmail = (e) => setEmail(e.target.value)
  const changePassword = (e) => setPassword(e.target.value)
  const changePassword2 = (e) => setPassword2(e.target.value)


  const registerUser = async () => {

    if (!username || !email || !password || !password2) {
      console.log('Something is wrong !!!!!!!!!!')
      setError(true)
      return
    }

    if (password !== password2) {
      toast({
        title: 'Hasla nie są idenczyczne',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
      return
    }



    // złożenie zapytania
    try {
      console.log(password)
      const response = await fetch("http://localhost:5000//register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        // zamieniam na json obiekt user (wysyłam go do bazy)
        // body: JSON(user)

        body: JSON.stringify({
          username,
          email,
          password
        })
      })
      //console.log(response)
      // zamieniam response na odpowiedź, którą mogę odczytać w JS
      const data = await response.json()
      //console.log(data)
      toast({
        title: data.message,
        status: data.ok ? 'success' : 'error',
        duration: 3000,
        isClosable: true,
      })
    }
    catch (error) {
      console.log(error)
      toast({
        title: "Błąd servera",
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    }
    finally {
    }

  }
  return (
    <div>
      <h1>Rejestracja</h1>
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
          <IoLogoUsd color="#38A169" />
          Register
        </Heading>

        <Stack spacing={3} w="100%">
          <FormControl isInvalid={error && !username}>
            <FormLabel>
              <IoLogoReddit />
              Nazwa użytkownika
            </FormLabel>
            <Input onChange={changeUsername} placeholder='Podaj nazwę użytkownika' />
            {<FormErrorMessage>To pole jest wymagane</FormErrorMessage>}
          </FormControl>

          <FormControl isInvalid={error && !email}>
            <FormLabel>
              <PiRedditLogoDuotone />
              Email
            </FormLabel>
            <Input onChange={changeEmail} placeholder='Podaj adres email' />
            {<FormErrorMessage>To pole jest wymagane</FormErrorMessage>}
          </FormControl>

          <FormControl isInvalid={error && !password}>
            <FormLabel>
              <PiGitlabLogoLight />
              Hasło
            </FormLabel>
            <Input onChange={changePassword} placeholder='Podaj swoje hasło' value={password} />
            {<FormErrorMessage>To pole jest wymagane</FormErrorMessage>}
          </FormControl>

          <FormControl isInvalid={error && !password2}>
            {/* <FormLabel>
              <PiGitlabLogoLight />
              Powtórz hasło
            </FormLabel> */}
            <Input onChange={changePassword2} placeholder='Powtórz swoje hasło' value={password2} />
            {<FormErrorMessage>To pole jest wymagane</FormErrorMessage>}
          </FormControl>

          <Button
            onClick={registerUser}
            size="lg"
            colorScheme='green'>
            {loading ? <Spinner color='white.500' /> : 'Zarejestruj się'}
          </Button>

        </Stack>

      </Box>
    </div>
  )
}
export default RegisterPage