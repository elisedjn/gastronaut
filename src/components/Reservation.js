import React from 'react'

export default function Reservation({restaurantID, restaurant, languageInfos}) {
  const {regularHours, events} = restaurant
  const {date, closed, reservationButtonSmall, ticketButton } = languageInfos

  const now = new Date()
  const today = now.getUTCDay()

  const daysArr = [date.today, date.tomorrow]
  date.weekdays.forEach((day, index) => {
    if(index - today > 1) {
      daysArr[index-today] = day
    } else if (index - today < 0) {
      if(7 + (index-today) > 1) daysArr[7 + (index-today)] = day
    }
  })

  for (let i=2; i < daysArr.length; i++){
    let fullMili = Date.now() + i * 24 * 60 * 60 * 1000
    let fullDay = new Date(fullMili).getUTCDate()
    let fullMonth = new Date(fullMili).getUTCMonth() + 1
    let fullYear = new Date(fullMili).getUTCFullYear()
    let fullDate =  " " + fullDay + "." + fullMonth  + "." + fullYear
    daysArr[i] += fullDate
  }
  
  const hoursArr = []
  regularHours.forEach((dailyHours, index) => {
    (index - today >=0) ? hoursArr[index - today] = dailyHours || closed : hoursArr[7 + (index-today)] = dailyHours || closed
  })

  return (
    <div id="reservation">
      <div>
        {daysArr.map((day, index) => {
          return (
            <div key={'reservation' + index} className="one-day">
              <div>{day}</div> 
              <div>{hoursArr[index]}</div> 
              {
                hoursArr[index].includes(":")? <a href={`https://r.gastronaut.ai/${restaurantID}?date=`}>{reservationButtonSmall}</a> : ""
              }
            </div>
          )
        })}
      </div>
    </div>
  )
}
