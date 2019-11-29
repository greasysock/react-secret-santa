import React from 'react'
import {useDecryptor} from '../hooks'

const ShowRecipient = ({location}) => {
  const decryptedPerson = useDecryptor(location.search.substr(3))
  return (
    <>
  <h1>
    {decryptedPerson.name}!
  </h1>
  <div>You are the secret santa for: {decryptedPerson.giftTo}</div>
  </>
    
  )
}

export default ShowRecipient