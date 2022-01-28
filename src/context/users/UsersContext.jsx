import { createContext, useState, useReducer } from "react"
import userReducer from "./UsersReducer"

import axios from "axios"

const UsersContext = createContext()
export const UserContextProvider = ({ children }) => {
  const initialState = {
    usersData: [],
    loading: true,
  }
  const [state, dispatch] = useReducer(userReducer, initialState)

  const [loading, setLoading] = useState(true)
  const [citySorted, setCitySorted] = useState(false)
  const [nameSorted, setNameSorted] = useState(false)

  const remoteUrl = "https://jsonplaceholder.typicode.com/users"

  function sortBy(filter) {
    let isSorted, filterParamsStart, filterParamsEnd
    if (filter == "city")
      (filterParamsStart = "address"),
        ((filterParamsEnd = ["city"]), (isSorted = citySorted))

    if (filter == "company")
      (filterParamsStart = "company"),
        ((filterParamsEnd = ["name"]), (isSorted = nameSorted))

    const data = state.usersData.sort(function (a, b) {
      const cityA = a[filterParamsStart][filterParamsEnd]
      const cityB = b[filterParamsStart][filterParamsEnd]
      if (cityA === cityB) return 0
      return isSorted ? (cityA > cityB ? 1 : -1) : cityA < cityB ? 1 : -1
    })
    if (filter === "city") setCitySorted((prev) => !prev)
    if (filter === "company") setNameSorted((prev) => !prev)

    dispatch({
      type: "SET_USERS",
      payload: data,
    })
  }

  async function fetchUsers() {
    try {
      setLoading(true)
      const data = await axios.get(remoteUrl)
      dispatch({
        type: "GET_USERS",
        payload: data.data,
      })

      setLoading(false)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <UsersContext.Provider
      value={{
        fetchUsers,
        usersData: state.usersData,
        loading: state.loading,
        sortBy,
      }}
    >
      {children}
    </UsersContext.Provider>
  )
}

export default UsersContext
