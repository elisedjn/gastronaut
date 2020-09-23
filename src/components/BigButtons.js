import React from 'react'

export default function BigButtons({restaurant, languageInfos, restaurantID}) {
  const {reservationButton, menuButton, voucherButton} = languageInfos

  return (
    <div id="big-buttons">
      <a className="one-big-button" href={`https://r.gastronaut.ai/${restaurantID}`}>{reservationButton.toUpperCase()}</a>
      <a className="one-big-button" href={`https://menu.gastronaut.ai/${restaurantID}`}>{menuButton.toUpperCase()}</a>
      <a className="one-big-button" href={`https://v.gastronaut.ai/${restaurantID}`}>{voucherButton.toUpperCase()}</a>
    </div>
  )
}
