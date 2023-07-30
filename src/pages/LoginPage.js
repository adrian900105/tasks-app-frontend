import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Stack,
    Input,
    Heading,
    useToast,
    Spinner,
    Text,
    FormErrorMessage,
} from '@chakra-ui/react'
import React, { useState } from 'react'
import { IoLogoUsd } from "react-icons/io"
import { PiRedditLogoDuotone } from 'react-icons/pi'
import { PiGitlabLogoLight } from 'react-icons/pi'
import { Link } from 'react-router-dom'

function LoginPage() {
    const toast = useToast()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    const changeEmail = (e) => setEmail(e.target.value)
    const changePassword = (e) => setPassword(e.target.value)

    //console.log(email,password)

    // download data from server
    const loginUser = async () => {

        // do testu
        // const user = {
        //     email: "adrianszeliga90@gmail.com",
        //     password: "Adrian123#"
        // }


        if (!email || !password) {
            setError(true)
            return
        }
        setLoading(true)

        // złożenie zapytania
        try {
            const response = await fetch("http://localhost:5000/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                // zamieniam na json obiekt user (wysyłam go do bazy)
                // body: JSON(user)
                body: JSON.stringify({
                    email,
                    password
                })
            })
            //console.log(response)
            // zamieniam response na odpowiedź, którą mogę odczytać w JS
            const data = await response.json()

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
            setError(false)
        }

        setLoading(false)
    }
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
                    <IoLogoUsd color="#38A169" />
                    Tasker
                </Heading>

                <Stack spacing={3} w="100%">

                    <FormControl isInvalid={error}>
                        <FormLabel>
                            <PiRedditLogoDuotone />
                            Email
                        </FormLabel>
                        <Input onChange={changeEmail} placeholder='Podaj adres email' />
                        {error && <FormErrorMessage>To pole jest wymagane</FormErrorMessage>}
                    </FormControl>

                    <FormControl isInvalid={error}>
                        <FormLabel>
                            <PiGitlabLogoLight />
                            Hasło
                        </FormLabel>
                        <Input onChange={changePassword} placeholder='Podaj swoje hasło' />
                        {error && <FormErrorMessage>To pole jest wymagane</FormErrorMessage>}
                    </FormControl>

                    <Button
                        onClick={loginUser}
                        size="lg"
                        colorScheme='green'>
                        {loading ? <Spinner color='white.500' /> : 'Zaloguj'}
                    </Button>

                    <Text textAlign="center" mt="10px">
                        Nie masz konta? <Link style={{ color: '#38A169' }} to="/register">Zarejestruj się</Link>
                    </Text>

                </Stack>
            </Box>
        </div>
    )
}
export default LoginPage

