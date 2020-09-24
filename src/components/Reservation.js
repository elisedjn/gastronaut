import React from 'react';
import Button from '@material-ui/core/Button'

export default function Reservation({restaurantID, restaurant, languageInfos}) {
  const {regularHours, events} = restaurant
  const {date, closed, reservationButtonSmall, ticketButton } = languageInfos

  const now = new Date()
  const today = now.getUTCDay()

  //Creating an array with the name of the days and the opening hours ordered from today
  const openInfos = []
  for (let i = 0; i < 7; i++){
    let index ;
    i - today >=0 ? index = i - today : index = 7 + (i-today)
    openInfos[index] = {daysDate: date.weekdays[i], hours: regularHours[i] || closed}
    if(index === 0) openInfos[index].daysDate = date.today;
    if(index === 1) openInfos[index].daysDate = date.tomorrow;
    openInfos[index].hours === closed ? openInfos[index].bookable = false : openInfos[index].bookable = true
  }

  // Adding to this info the dates in format DD.MM and YYYY.MM.DD and checking for event in this 7 days
  openInfos.forEach((day, i) => {
    let thisDayDate = new Date(Date.now() + i * 24 * 60 * 60 * 1000)
    // Adding format YYYY.MM.DD
    day.formatedDate = toFormatedDate(thisDayDate)
    // Checking for event
    events.forEach (oneEvent => {
      if(oneEvent.date === day.formatedDate) {
        day.event = JSON.parse(JSON.stringify(oneEvent))
        day.bookable = false
      }
    })
    // Adding format DD.MM to the day name
    if(i > 1) day.daysDate += toPrintedDate(thisDayDate)
  })

  console.log(openInfos)

  let upcomingEvents = []
  events.forEach(oneEvent => {
    if(oneEvent.date > openInfos[6].formatedDate) upcomingEvents.push(JSON.parse(JSON.stringify(oneEvent)))
  })
  // Changing the date format
  upcomingEvents.forEach((oneEvent) => {
    let newDate = new Date(oneEvent.date)
    let day = newDate.getUTCDay()
    oneEvent.date = date.weekdays[day] + toPrintedDate(newDate) + "." + newDate.getUTCFullYear().toString().slice(-2)
  })

  return (
      <table id="reservation">
        <tbody>
        {openInfos.map((day, index) => {
          return (
            <tr key={'reservation' + index}>
              <td className="date">{day.daysDate}</td> 
              {
                day.bookable ? (
                  <>
                    <td className="hours">{day.hours}</td>
                    <td className="button"><a href={`https://r.gastronaut.ai/${restaurantID}?date=${day.formatedDate}`}><Button variant="outlined" color="primary" className="smallLetter" >{reservationButtonSmall}</Button></a></td>
                  </>
                  ) : day.event ? 
                        day.event.available ? (
                        <>
                        <td className="hours">{day.event.title}</td>
                        <td className="button"><a href={`https://t.gastronaut.ai/${restaurantID}/${day.event.id}`}><Button variant="contained" color="primary" className="smallLetter" >{ticketButton}</Button></a></td>
                      </>
                      ) 
                      : <td colSpan="2">{day.event.title}</td> 
                  : <td className="hours">{day.hours}</td>
              }
            </tr>
          )
        })}
        {
          upcomingEvents.length > 0 ? <td colSpan="3" className="divider"></td> : ""
        }
        {
          upcomingEvents.map((oneEvent, index) => {
            return (
            <tr className="one-event">
              <td className="date">{oneEvent.date}</td>
              {oneEvent.available ? (
                <>
                <td className="hours">{oneEvent.title}</td>
                <td className="button"><a href={`https://t.gastronaut.ai/${restaurantID}/${oneEvent.id}`}><Button variant="contained" color="primary" className="smallLetter" >{ticketButton}</Button></a></td>
                </>
                ) : <td colSpan="2">{oneEvent.title}</td>
                } 
              
            </tr>
            )
          })
        }
        </tbody>
      </table>
  )
}

const toPrintedDate = (oneDate) => {
  const day = oneDate.getUTCDate()
  const month = oneDate.getUTCMonth() + 1
  const fullDate =  " " + ("0" + day).slice(-2) + "." + ("0" + month).slice(-2)
  return fullDate
}

const toFormatedDate = (oneDate) => {
  const day = ("0" + oneDate.getUTCDate()).slice(-2)
  const month = ("0" + (oneDate.getUTCMonth() + 1)).slice(-2)
  const year = oneDate.getUTCFullYear()
  const fullDate = year + "-" + ("0" + month).slice(-2) + "-" + day 
  return fullDate
}
