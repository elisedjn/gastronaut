import React from 'react';
import Button from '@material-ui/core/Button';

export default function BigButtons({restaurant, languageInfos, restaurantID}) {
  const {reservationButton, menuButton, voucherButton} = languageInfos

  return (
    <div id="big-buttons">
      <a className="one-big-button" href={`https://r.gastronaut.ai/${restaurantID}`}>
        <Button variant="contained" color="primary" >{reservationButton.toUpperCase()}</Button>
      </a>
      <a className="one-big-button" href={`https://menu.gastronaut.ai/${restaurantID}`}>
        <Button variant="contained" color="primary" >{menuButton.toUpperCase()}</Button>
      </a>
      <a className="one-big-button" href={`https://v.gastronaut.ai/${restaurantID}`}>
        <Button variant="contained" color="primary" >{voucherButton.toUpperCase()}</Button>
      </a>
    </div>
  )
}
