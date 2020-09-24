# Gastronaut Technical Test

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Get Started

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

## Code Structure
### Components
- App.js
  - Alert.js (rendered upon conditions)
  - Header.js
    - LanguageToggle.js
  - Reservation.js
  - BigButtons.js
  - Footer.js

### API 
All API requests are made from App.js and stored in hooks states.
Then the info is passed to the components via props.

### Info about Reservation.js
To deal with the dates and opening hours, I have created :
- 2 Functions:
  - toFormatedDate(date) => return a date in format YYYY-MM-DD
  - toPrintedDate(date) => return a date in format DD.MM (I've skipped the year for the upcoming days, I hope user will know which year we are...)

- 2 Arrays of Objects:
  ``` javascript 
  openInfos : [ //Every object represents one day of the upcoming week, it is stored ordered from today to +6 days.
    {
      daysDate: string, // in format "Fri. the 24.09" or "Today" or "Tomorrow"
      hours: string, //in format "17:00 - 00:00" or "Closed"
      formatedDate: string, //in format "2020-09-24"
      bookable: boolean, // true if the restaurant is open and without event, else false
      event: {object} // clone of the event which will occur that day
  }
  ]
  
  upcomingEvents : [
    {object} // clone of the event which will occur in more than 6 days (the date is modified to be in format "Fri. the 24.09.20")
  ] ```




