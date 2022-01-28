import React, { useState, useContext, useEffect } from "react"
import UserProfileCard from "../components/UserProfileCard/UserProfileCard"

import { layout } from "../context/users/userLayout"
import UsersContext from "../context/users/UsersContext"

import "../components/userprofile.scss"

const UserProfile = (props) => {
  const { usersData } = useContext(UsersContext)
  const userSlug = props.match.params.id
  const [profileData, setProfileData] = useState()
  const [isDisabled, setDisabled] = useState(true)
  const [disabledInput, setDisabledInput] = useState([])
  const _sendUserProfile = () => {
    const UserProfileData = document.getElementsByClassName("profile-data")
    for (let data of Object.values(disabledInput)) {
      if (data == "warn") return
    }
    const JSONobject = {}
    profileData.map((field, index) => {
      JSONobject[field.key] = UserProfileData[index]["value"]
    })
    const commentInput = document.getElementById("comment-data")
    JSONobject["comment"] = commentInput.value
    console.log(JSON.stringify(JSONobject, null, 2))
  }
  const _validateEmail = (email) => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      return true
    }
    return false
  }
  const setDisabledField = (id) => {
    const field = document.getElementById(`profile-data-${id}`)
    field.classList.add("profile-card__profile-input-warn")
    setDisabledInput((prev) => {
      return {
        ...prev,
        [id]: "warn",
      }
    })
  }
  const setEnabledField = (id) => {
    const field = document.getElementById(`profile-data-${id}`)
    field.classList.remove("profile-card__profile-input-warn")
    setDisabledInput((prev) => {
      return {
        ...prev,
        [id]: "",
      }
    })
  }

  const _handleChange = (e, id, type) => {
    const text = e.target.value
    switch (type) {
      case "email": {
        const res = _validateEmail(text)
        if (res === true) {
          setEnabledField(id)
        } else {
          setDisabledField(id)
        }
        return
      }
      default:
        if (text.trim() == "" || text.trim() == undefined) {
          setDisabledField(id)
        } else {
          setEnabledField(id)
        }
    }
  }
  const prepearData = () => {
    const concreteUser = []
    const user = usersData.filter((el) => el.name === userSlug)
    layout.forEach((field) => {
      const dataParts = field.placeholder.split(".")
      const val = field.value
      const temp = {}
      if (dataParts.length === 1) {
        temp.key = val
        temp.value = user[0][dataParts[0]]
        temp.id = field.id
        if (field.placeholder === "email") {
          temp.type = "email"
        }
        concreteUser.push(temp)
      }
      if (dataParts.length === 2) {
        temp.key = val
        temp.value = user[0][dataParts[0]][dataParts[1]]
        temp.id = field.id
        concreteUser.push(temp)
      }
    })
    setProfileData(concreteUser)
  }
  useEffect(() => {
    prepearData()
  }, [])
  return (
    <div>
      <div className="user-profile-wrapper">
        <h5 className="userlist-logo_default">Профиль пользователя</h5>
        <button
          onClick={() => {
            setDisabled((prev) => !prev)
          }}
          className="profile__button button button_primary"
        >
          Редактировать
        </button>
      </div>
      <div id="user-profile-data" className="profile">
        {profileData ? (
          profileData.map((item) => (
            <UserProfileCard
              onChange={(e) => _handleChange(e, item.id, item.type)}
              key={item.id}
              item={item}
              isDisabled={isDisabled}
            />
          ))
        ) : (
          <>
            <h1>Загрузка</h1>
          </>
        )}
        <div className="profile-card__profile-value profile-card__profile-value-addon">
          Comment
        </div>
        <textarea
          id="comment-data"
          className="profile-card__profile-text-area"
        ></textarea>
      </div>
      <div className="profile-card__button-end">
        <button
          onClick={_sendUserProfile}
          disabled={isDisabled}
          className={
            isDisabled
              ? "profile-card__button button button_disabled"
              : "profile-card__button button button_success"
          }
        >
          Отправить
        </button>
      </div>
    </div>
  )
}

export default UserProfile
