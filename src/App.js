import React from 'react'
import { HashRouter, Route } from "react-router-dom";
import SecretSanta from './pages/SecretSanta'
import ShowRecipient from './pages/ShowRecipient'

function App() {
  return (
    <HashRouter>
      <Route exact path="/" component={SecretSanta}/>
      <Route exact path="/my_recipient" component={ShowRecipient}/>
    </HashRouter>
  );
}

export default App