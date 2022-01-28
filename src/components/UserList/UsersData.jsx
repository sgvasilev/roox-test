import React, { useContext, useEffect } from "react"
import Card from "../Card/Card"
import UsersContext from "../../context/users/UsersContext"
import "../userlist.scss"

const UserData = () => {
  const { fetchUsers, loading, usersData } = useContext(UsersContext)
  useEffect(() => {
    fetchUsers()
  }, [])

  return (
    <div>
      <h5 className="userlist-logo">Список пользователей</h5>
      {loading ? (
        <div className="userlist-logo">Загрузка пользоватаелей</div>
      ) : (
        usersData && usersData.map((el) => <Card key={el.id} el={el}></Card>)
      )}
      {usersData ? (
        <h5 className="userlist-logo-bottom">{`Найдено ${usersData.length} пользователей`}</h5>
      ) : (
        <h5 className="userlist-logo-bottom">Что то пошло не так...</h5>
      )}
    </div>
  )
}

export default UserData
