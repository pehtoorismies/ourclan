import React from "react"
import { Router } from "@reach/router"
import Albums from "../components/Albums"
import Layout from "../components/Layout"
import Login from "../components/Login"
import PrivateRoute from "../components/PrivateRoute"

const App = () => (
  <Layout>
    <Router>
      <PrivateRoute path="/jasenet/albums" component={Albums} />
      <Login path="/jasenet/login" />
    </Router>
  </Layout>
)

export default App
