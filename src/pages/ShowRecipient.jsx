import React from 'react'
import {useDecryptor} from '../hooks'

const ShowRecipient = ({location}) => {
  const decryptedPerson = useDecryptor(location.search.substr(3))
  console.log(decryptedPerson)
  return (
    <div>Hello World</div>
  )
}

export default ShowRecipient