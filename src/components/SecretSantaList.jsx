import React from 'react';

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

const chooseSecretSanta = () => {
  let unchosen = Object.keys(people)
  const chosen = {...people}

  Object.values(people).forEach((person)=>{
    // Array for possible index options
    const indexArray = []
    for(let i = 0; i < unchosen.length+1;i++){
      const filteredI = parseInt(unchosen[i])
      if(person.id !== filteredI && !person.blacklist.includes(filteredI) && unchosen.includes(filteredI.toString())){
        indexArray.push(filteredI)
      }
    }
    const chosenIndex = indexArray[Math.floor(Math.random() * (indexArray.length-1))]
    console.log(chosenIndex)
    const chosenPerson = people[chosenIndex]
    chosen[person.id].giftTo = chosenPerson.id
    chosen[chosenPerson.id].giftFrom = person.id
    unchosen = unchosen.filter((pId)=>parseInt(pId) !== chosenPerson.id)
  })

  return chosen
}

const SecretSanta = ({secretSantaId, blacklist = true}) => {
  const person = people[secretSantaId]
  const giftTo = people[person.giftTo]
  const renderBlacklist = () => {
    if(!blacklist){return null}
    return (
      <div>
        - Blacklist: {person.blacklist.map((id)=><SecretSanta key={`bl${person.id}.${id}`} secretSantaId={id} blacklist={false} />)}
      </div>
      )
  }
  const renderGiftTo = () => {
    if(!blacklist){return null}
    return (
      <>SecretSanta: {giftTo.name}</>
    )
  }
  return (
    <div>
      {person.name} {renderBlacklist()}
      {renderGiftTo()}
      <br/>
    </div>
  )
}

const SecretSantaList = () => {
  const secretSantas = chooseSecretSanta()
  const renderSecretSantas = () => {
    return Object.values(secretSantas).map( person => <SecretSanta key={person.id} secretSantaId={person.id}/>)
  }
  return ( 
    <>
      {renderSecretSantas()}
    </>
   )
}
 
export default SecretSantaList