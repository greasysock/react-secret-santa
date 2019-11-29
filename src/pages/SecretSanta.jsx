import React from 'react'
import {useDecryptor} from '../hooks'
import SecretSantaList from '../components/SecretSantaList'

const SecretSanta = ({location}) => {
  const incomingData = (location.search !== '') ? location.search.substr(3) : null
  const incomingObject = useDecryptor(incomingData)
  return (
    <SecretSantaList incomingData={incomingObject}/>
  )
}

export default SecretSanta