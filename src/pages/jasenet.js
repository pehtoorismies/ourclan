import React from "react"
import { Router } from "@reach/router"
import Albums from "../components/Albums"
import Layout from "../components/Layout"
import LoginContainer from "../containers/LoginContainer"
import PrivateRoute from "../components/PrivateRoute"

const App = () => (
  <Layout>
    People 
    <Router>
      <PrivateRoute path="/jasenet/albums" component={Albums} />
      <LoginContainer path="/jasenet" />
    </Router>
  </Layout>
)

export default App
