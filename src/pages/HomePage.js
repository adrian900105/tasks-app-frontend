import React, { useEffect, useState } from 'react'
import httpClient from '../utils/httpClient'
import { Box, Button, Container, SimpleGrid, useToast } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import TaskCard from '../components/TaskCard';
import { deleteTask } from '../utils/deleteTask';
import { DrawerComponent } from '../components/Drawer';

function HomePage() {

  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();
  const toast = useToast();

  console.log(user)

  // [] - wnętrze useEffect wywoła się raz przy montowaniu komponentu
  useEffect(() => {
    getData();
  }, [])

  const getData = async () => {
    try {
      const { data } = await httpClient.get("/dashboard");
      setUser(data);
      setTasks(data.data.tasks)
      // console.log(data);

    } catch (error) {
      console.log(error);
    }
  }
  console.log(tasks);
  const logout = async () => {
    try {
      const { data } = await httpClient.get("/logout");
      toast({
        title: data.message,
        status: "success",
        duration: 3000,
        isClosable: true,
      })
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  }

  const backToLogin = () => navigate("/login")

  const handleDelete = async (taskName) => {
    const {data} = await deleteTask(taskName); // {data} - destrukturyzacja
    console.log(data);
    getData();
    try {
      toast({
        title: data.message,
        status: "success",
        duration: 3000,
        isClosable: true,
      })
    } catch (error) {
      toast({
        title: 'Trwa usuwanie',
        status: "warning",
        duration: 3000,
        isClosable: true,
      })
    }
  };

  if(!user){
    return(
      <Container maxW="6x1">
          <h2> Odmowa dostępu</h2>
          <Button onClick={backToLogin} colorScheme="green" size="lg">
          Zaloguj
          </Button>
      </Container>
    )
  }

  return (
    <Container maxW='6xl'>
      <Box
        bg="green.500" // Set the background color to green
        color="white" // Set the text color to white
        p={4} // Set padding
        fontWeight="bold" // Set font weight to bold
        boxShadow="md" // Add a shadow
        mb={10}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        {" "}
        <h2>{user.message}</h2>
        <Button onClick={logout} colorScheme="gray" size="lg">
          Wyloguj
        </Button>
      </Box>
      <h2>{user.message}</h2>
      <Button onClick={logout} colorScheme="gray" size="lg">
        Wyloguj
      </Button>

      <SimpleGrid columns={{base: 1, sm: 2, lg: 4}} spacing={4}>
        {tasks.map((item) => (
          <TaskCard 
            onDelete={()=>handleDelete(item.task)} 
            key={item.task} 
            task={item}
          />
        ))}
      </SimpleGrid>
      <DrawerComponent callbackData={getData}/>
    </Container>
  )
}
export default HomePage