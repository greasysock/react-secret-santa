import React from 'react'
import {useDecryptor} from '../hooks'

const ShowRecipient = ({location}) => {
  const decryptedPerson = useDecryptor(location.search.substr(3))
  return (
  <div>You are the secret santa for: {decryptedPerson.name}</div>
    
  )
}

export default ShowRecipient