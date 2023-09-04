import { Badge, Button, Card, CardBody, CardFooter, CardHeader, Heading, Text } from '@chakra-ui/react'
import React from 'react'

const TaskCard = ({task,onDelete}) => {
    console.log(task)

    const urgencyTheme = () => {
        switch(task.category){
            case "testy":
                return "pink"
            case "frontend":
                return "blue"
            case "backend":
                return "yellow"
            default:
                return "green"
        }
    }

    return (
        <Card>
            <CardHeader>
                <Badge variant="solid" colorScheme={urgencyTheme()}>
                    {task.category}
                </Badge>
                <Heading size='md'>{task.task}</Heading>
                <Text>{task.urgency}</Text>
            </CardHeader>
            <CardBody>
                <Text>{task.description}</Text>
                <Text>{task.email_author}</Text>
            </CardBody>
            <CardFooter>
                <Button onClick={onDelete} colorScheme='red'>Usuń</Button>
            </CardFooter>
        </Card>
    )
}

export default TaskCard
