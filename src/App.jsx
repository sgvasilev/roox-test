import React from "react"
import "./styles.scss"
import UserList from "./pages/UserList"
import UserProfile from "./pages/UserProfile"
import UserData from "./components/UserList/UsersData"
import { UserContextProvider } from "./context/users/UsersContext"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"

const App = () => {
  return (
    <UserContextProvider>
      <Router>
        <UserList />
      </Router>
    </UserContextProvider>
  )
}

export default App
