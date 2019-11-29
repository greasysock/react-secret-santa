import React from 'react'
import { BrowserRouter, Route, Link } from "react-router-dom";
import SecretSanta from './pages/SecretSanta'
import ShowRecipient from './pages/ShowRecipient'

function App() {
  return (
    <BrowserRouter>
      <Route exact path="/" component={SecretSanta}/>
      <Route exact path="/my_recipient" component={ShowRecipient}/>
    </BrowserRouter>
  );
}

export default App