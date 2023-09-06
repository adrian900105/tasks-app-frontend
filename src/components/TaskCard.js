import { Badge, Button, Card, CardBody, CardFooter, CardHeader, Heading, Modal, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure } from '@chakra-ui/react'
import React from 'react'

const TaskCard = ({ task, onDelete }) => {
    console.log(task)

    const { isOpen, onOpen, onClose } = useDisclosure()

    const urgencyTheme = () => {
        switch (task.category) {
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
                <Button onClick={onOpen} colorScheme='green'>
                    Usuń
                </Button>

                <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Potwierdź</ModalHeader>
                        <Text pl={6}>Czy na pewno chcesz usunąć ten task?</Text>
                        <ModalCloseButton />

                        <ModalFooter>
                            <Button colorScheme='blue' variant='ghost' mr={3} onClick={onClose}>
                                Zamknij
                            </Button>
                            <Button colorScheme='red' onClick={onDelete}>
                                Usuń
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>




            </CardFooter>
        </Card>
    )
}

export default TaskCard
