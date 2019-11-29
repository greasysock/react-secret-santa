import React from 'react';
import {Link} from 'react-router-dom'
import './SecretSantaList.sass';
import {useEncryptor} from '../hooks'

const people = {
  0: {
    id: 0,
    name: 'Chris',
    blacklist: [1]
  },
  1: {
    id: 1,
    name: 'Jessica',
    blacklist: [0]
  },
  2: {
    id: 2,
    name: 'Lindsey',
    blacklist: [3]
  },
  3: {
    id: 3,
    name: 'Nick',
    blacklist: [2]
  },
  4: {
    id: 4,
    name: 'Joey',
    blacklist: [5]
  },
  5: {
    id: 5,
    name: 'Jordan',
    blacklist: [4]
  },
  6: {
    id: 6,
    name: 'Jesse',
    blacklist: []
  }
}

// secretSanta = sender to resolve. Available is an array of all people with people to send to to potentially swap
const resolveSecretSanta = (secretSanta, available = [], unchosenAvailable = [], skipStandard = false) => {
  if(secretSanta.giftTo === 0 || secretSanta.giftTo){
    //Conflict resolved
    return true
  }

  if(!skipStandard){// Standard random finder
    let availId = []
    let index = 0
    unchosenAvailable.forEach((u)=>{
      if(!secretSanta.blacklist.includes(u.id) && u.id !== secretSanta.id){availId.push(index)}
      index++
    })
    if(availId.length>0){
      const randomK = Math.floor((availId.length-1)*Math.random())
      const randomAvailIndex = availId[randomK]
      const randomAvail = unchosenAvailable[randomAvailIndex]
      secretSanta.giftTo = randomAvail.id
      //resolve index for chosen random
      unchosenAvailable.splice(randomAvailIndex, 1)
      return resolveSecretSanta(secretSanta, available, unchosenAvailable, skipStandard=true)
    }else{
      return resolveSecretSanta(secretSanta, available, unchosenAvailable, skipStandard=true)
    }
  }

  const randomJ = Math.floor((unchosenAvailable.length -1) * Math.random())
  const unchosen = unchosenAvailable[randomJ]
  const randomI = Math.floor((available.length - 1) * Math.random())
  const chosen = available[randomI]
  const chosenGiftTo = people[chosen.giftTo]

  if(secretSanta.blacklist.includes(chosen.giftTo)){
    available.splice(randomI, 1)
    return resolveSecretSanta(secretSanta, available, unchosenAvailable)
  }
  if(chosen.blacklist.includes(unchosen.id)){
    available.splice(randomI, 1)
    return resolveSecretSanta(secretSanta, available, unchosenAvailable)
  }
  if(chosenGiftTo.blacklist.includes(secretSanta.id)){
    available.splice(randomI, 1)
    return resolveSecretSanta(secretSanta, available, unchosenAvailable)
  }

  // chosenGiftTo can now be swapped with unchosen
  chosen.giftTo = unchosen.id
  secretSanta.giftTo = chosenGiftTo.id
  unchosenAvailable.splice(randomJ,1)

  return resolveSecretSanta(secretSanta, available, unchosenAvailable)

}

const chooseSecretSanta = () => {
  let unchosen = Object.values(people)
  const chosen = {}

  Object.values(people).forEach((person)=>{
    // Array for possible index options
    const resolved = resolveSecretSanta(person, Object.values(chosen), unchosen)
    if(resolved){
      chosen[person.id] = person
    }
  })

  return chosen
}

const SecretSanta = ({secretSantaId, blacklist = true, secretSantaList}) => {
  const person = secretSantaList[secretSantaId]
  const giftTo = secretSantaList[person.giftTo]
  const giftToEncrypted = useEncryptor(giftTo)
  return (
    <div className="person">
      <div className="name">{person.name}</div>
      <Link className="secret-santa" to={`/my_recipient?d=${giftToEncrypted}`} >Recipient</Link>
    </div>
  )
}

const SecretSantaList = ({incomingData}) => {
  const secretSantas = incomingData ? incomingData : chooseSecretSanta()
  const permaSecretSantas = useEncryptor(secretSantas)
  const renderSecretSantas = () => {
    return Object.values(secretSantas).map( person => <SecretSanta secretSantaList={secretSantas} key={person.id} secretSantaId={person.id}/>)
  }
  return (
    <>
    <Link to={`/?d=${permaSecretSantas}`}>Permalink to this list</Link>
    <div className="person-array">
      {renderSecretSantas()}
    </div>
    </>
   )
}
 
export default SecretSantaList