import React from 'react'

export default function Reservation({restaurantID, restaurant, languageInfos}) {
  const {regularHours, events} = restaurant
  const {date, closed, reservationButtonSmall, ticketButton } = languageInfos

  const now = new Date()
  const today = now.getUTCDay()

  //Creating an array with the dates ordered from today
  const daysArr = [[date.today], [date.tomorrow]]
  date.weekdays.forEach((day, index) => {
    if(index - today > 1) {
      daysArr[index-today] = [day]
    } else if (index - today < 0) {
      if(7 + (index-today) > 1) daysArr[7 + (index-today)] = [day]
    }
  })
  //Adding the date in format DD.MM.YY to the first string and in format YYYY.MM.DD
  for (let i=0; i < daysArr.length; i++){
    let thisDayDate = new Date(Date.now() + i * 24 * 60 * 60 * 1000)
    daysArr[i].push(toFormatedDate(thisDayDate))
    if(i>1)daysArr[i][0] += toPrintedDate(thisDayDate)
  }
  
  //Creating an array with opening hours (or closed) ordered from today
  const hoursArr = []
  regularHours.forEach((dailyHours, index) => {
    (index - today >=0) ? hoursArr[index - today] = dailyHours || closed : hoursArr[7 + (index-today)] = dailyHours || closed
  })

  //checking if there is an event
  daysArr.forEach((day, i) => {
    events.forEach(oneEvent => {
      if(day.includes(oneEvent.date)){
        hoursArr[i] = oneEvent.title
      }
    })
  })
  

  
 

  return (
      <table id="reservation">
        <tbody>
        {daysArr.map((day, index) => {
          return (
            <tr key={'reservation' + index}>
              <td>{day[0]}</td> 
              {
                hoursArr[index].includes(":")? (
                  <>
                    <td>{hoursArr[index]}</td>
                    <td><a href={`https://r.gastronaut.ai/${restaurantID}?date=${day[1]}`}>{reservationButtonSmall}</a></td>
                  </>
                  ) : <td colSpan="2">{hoursArr[index]}</td>
              }
            </tr>
          )
        })}
        </tbody>
      </table>
  )
}

const toPrintedDate = (oneDate) => {
  const day = oneDate.getUTCDate()
  const month = oneDate.getUTCMonth() + 1
  const year = oneDate.getUTCFullYear()
  const fullDate =  " " + ("0" + day).slice(-2) + "." + ("0" + month).slice(-2) + "." + year.toString().slice(-2)
  return fullDate
}

const toFormatedDate = (oneDate) => {
  const day = ("0" + oneDate.getUTCDate()).slice(-2)
  const month = ("0" + (oneDate.getUTCMonth() + 1)).slice(-2)
  const year = oneDate.getUTCFullYear()
  const fullDate = year + "-" + ("0" + month).slice(-2) + "-" + day 
  return fullDate
}
