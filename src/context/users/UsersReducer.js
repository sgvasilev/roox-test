const userReducer = (state, action) => {
  switch (action.type) {
    case "GET_USERS":
      return {
        ...state,
        usersData: action.payload,
        loading: false,
      }
    case "SET_USERS":
      return {
        ...state,
        usersData: action.payload,
      }

    default:
      return state
  }
}
export default userReducer
