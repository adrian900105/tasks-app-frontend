import React, {useState} from 'react'
import { Button} from '@chakra-ui/react'


// diffing algorithm
const TestPage = () => {

    const [counter, setCounter] = useState(0);
    const [isVisible, setIsVisible] = useState(true);

    const increase = () =>{
        setCounter(counter + 1)
    }
    return(
        <div>
            <h3>{counter}</h3>
            <Button onClick={increase}>Zwiększ</Button>
            <h3>{isVisible ? 'Wyświetlam dane' : 'Odmowa dostępu'}</h3>
            <Button onClick={()=>setIsVisible(!isVisible)}>
                {isVisible ? 'Ukryj' : 'Pokaż'}
            </Button>
        </div>
    )
}

export default TestPage
