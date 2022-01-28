import "../components/userlist.scss"
import UserData from "../components/UserList/UsersData"
import UserProfile from "./UserProfile"
import UsersContext from "../context/users/UsersContext"
import { useContext } from "react"
import { Route, Switch } from "react-router-dom"

const UserList = () => {
  const { sortBy } = useContext(UsersContext)

  return (
    <>
      <Route>
        <section className="wrapper">
          <aside className="aside">
            <div className="aside-filter">
              <p className="aside-filter__logo">Сортировка</p>
              <button
                onClick={() => {
                  sortBy("city")
                }}
                className="aside-filter__button button button_primary"
              >
                по городу
              </button>
              <button
                onClick={() => {
                  sortBy("company")
                }}
                className="aside-filter__button button button_primary"
              >
                по компании
              </button>
            </div>
          </aside>
          <Switch>
            <Route path="/user_profile/:id" component={UserProfile}></Route>
            <Route exact path="/" component={UserData}></Route>
          </Switch>
        </section>
      </Route>
    </>
  )
}

export default UserList
