import { FormControl, FormErrorMessage, FormLabel } from '@chakra-ui/react'
import { Input } from '@chakra-ui/react'
import React, { useState } from 'react'
import { IoLogoReddit } from 'react-icons/io'

const FormField = ({isInvalid, label, onChange, value, name, placeholder}) => {

  return (
<FormControl isInvalid={isInvalid}>
<FormLabel>
  <IoLogoReddit/>
  {label}
</FormLabel>
<Input 
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


