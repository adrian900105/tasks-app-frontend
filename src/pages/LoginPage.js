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
import { Link, useNavigate } from 'react-router-dom'

import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'

import httpClient from '../utils/httpClient'



function LoginPage() {
    const toast = useToast()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [hidePassword, setHidePassword] = useState(true);

    const changeEmail = (e) => setEmail(e.target.value)
    const changePassword = (e) => setPassword(e.target.value)

    const navigate = useNavigate();
    //console.log(email,password)

    // download data from server
    const loginUser = async () => {

        if (!email || !password) {
            setError(true);
            return;
        }

        setLoading(true);
        try {

            // AXIOS
            const { data } = await httpClient.post("/login", {
                email,
                password
            })
            console.log(data)

            toast({
                title: data.message,
                status: data.ok ? "success" : "error",
                duration: 3000,
                isClosable: true,
            });
            navigate('/')
        } catch (error) {
            console.log(error);
            toast({
                title: "Błędny login lub hasło",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        } finally {
            // setError(false)
        }
        setLoading(false);
    };

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
                        <Input 
                            type={hidePassword ? 'password' : 'text'} 
                            onChange={changePassword} 
                            placeholder='Podaj swoje hasło' 
                        />
                        <Box 
                            onClick={() => setHidePassword(!hidePassword)}
                            pos='absolute' 
                            bottom="6px" 
                            right="10px"
                            zIndex={10} // warstwa
                        > 
                        {hidePassword ? <AiFillEye size ={26}/> : <AiFillEyeInvisible size ={26}/>}
                        </Box>

                        {<FormErrorMessage>To pole jest wymagane</FormErrorMessage>}
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

