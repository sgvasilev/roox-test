import React from "react"
import { Routes, Route, Link } from "react-router-dom"

import UserProfile from "../../pages/UserProfile"

import "./_card.scss"

const Card = ({ el }) => {
  return (
    <>
      <div className="user-list-wrapper">
        <div className="user-info">
          <div className="user-info__item">
            <div className="user-info__item-ph">ФИО:</div>
            <div className="user-info__item-data">{el.name}</div>
          </div>
          <div className="user-info__item">
            <div className="user-info__item-ph">город:</div>
            <div className="user-info__item-data">{el.address?.city}</div>
          </div>
          <div className="user-info__item">
            <div className="user-info__item-ph">компания</div>
            <div className="user-info__item-data">{el.company?.name}</div>
          </div>

          <Link to={`/user_profile/${el.name}`}>
            <button className="user-info__button button button_unstyled">
              Подробнее
            </button>
          </Link>
        </div>
      </div>
    </>
  )
}

export default Card
