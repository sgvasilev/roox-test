import React from "react"
import "./userprofilecard.scss"

const UserProfileCard = ({ item, props, isDisabled, onChange }) => {
  return (
    <div key={item.id} className="profile-card">
      <div className="profile-card__profile-value">{item.key}</div>
      <input
        id={`profile-data-${item.id}`}
        onChange={onChange}
        disabled={isDisabled}
        defaultValue={item.value}
        className={
          props
            ? `profile-data profile-card__profile-input profile-card__profile-input${props}`
            : `profile-card__profile-input profile-data`
        }
      ></input>
    </div>
  )
}

export default UserProfileCard
