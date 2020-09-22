import React from 'react'

export default function Reservation({restaurant, languageInfos}) {
  const {regularHours, events} = restaurant
  const {date, closed, reservationButtonSmall, ticketButton } = languageInfos
  const now = new Date()
  console.log(now)

  return (
    <div>
      
    </div>
  )
}
