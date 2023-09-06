import { FormControl, FormErrorMessage, FormLabel } from '@chakra-ui/react'
import { Input } from '@chakra-ui/react'
import React from 'react'
import { IoLogoReddit } from 'react-icons/io'

const FormField = ({isInvalid, label, onChange, value, name, placeholder, type="text"}) => {

  return (
<FormControl isInvalid={isInvalid}>
<FormLabel>
  <IoLogoReddit/>
  {label}
</FormLabel>
<Input 
    type={type}
    name={name} 
    onChange={onChange} 
    placeholder={placeholder}
    value={value} 
/>
{<FormErrorMessage>To pole jest wymagane</FormErrorMessage>}
</FormControl>
  )
}

export default FormField


