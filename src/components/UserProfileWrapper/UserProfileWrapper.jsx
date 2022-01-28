import React from "react"
import "../../components/userprofile.scss"
import UserProfileCard from "../UserProfileCard/UserProfileCard"

const UserProfileWrapper = ({
  setDisabled,
  profileData,
  _handleChange,
  _sendUserProfile,
  isDisabled,
}) => {
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

export default UserProfileWrapper
