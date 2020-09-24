import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Footer from './components/Footer';
import Header from './components/Header';
import Reservation from './components/Reservation';
import BigButtons from './components/BigButtons';

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { Button, CircularProgress } from '@material-ui/core';
import {Alert, AlertTitle} from '@material-ui/lab';
import './App.css';



function App(props) {
  // Define the user's language
  const navLanguage = navigator.language || navigator.browserLanguage;
  let userLanguage;           
  navLanguage.indexOf('de') > -1 ? userLanguage = 'de' : userLanguage = 'en';
  const [language, setLanguage] = useState(userLanguage)
  const [languageInfos, setLanguageInfos] = useState({})

  // Define the restaurant ID
  const [restaurant, setRestaurant] = useState({})
  const restaurantID = window.location.pathname.slice(1)

  // Define the restaurant theme
  const [restaurantTheme, setRestaurantTheme] = useState({
    primaryColor: '#d0d0d0',
    contrastText: '#000000'
  });
  const theme = createMuiTheme({
    palette: {
      primary: {
        main: restaurantTheme.primaryColor,
        contrastText: restaurantTheme.contrastText
      },
      secondary: {
        main: '#FFF',
        contrastText: '#63d8c5'
      }
    }
  });

  //Define the boolean to show the alert
  const [showAlert, setShowAlert] = useState(false)

  
  useEffect(() => {
    axios.get(`https://api.gastronaut.ai/codeTest/${restaurantID}`)
      .then(response => {
        setRestaurant(response.data)
        setRestaurantTheme(response.data.colorPalette)
      })
      .catch(err => setShowAlert(true))
  }, [restaurantID])

  useEffect(() => {
    axios.get(`https://api.gastronaut.ai/v02/language/codeTest/${language}`)  
      .then(result => {
        setLanguageInfos(result.data)
      })
      .catch(err => setShowAlert(true))
  }, [language])


  return (
    <ThemeProvider theme={theme}>
      <div id="app">
      {
        showAlert ? 
        <div id="alert-page">
          <Alert severity="info" id="alert" variant="filled" > 
            <AlertTitle >Oops... {languageInfos.restaurantNotFound}...</AlertTitle>
            <div className="alert-infos">
              <p>Restaurants</p>
              <a href="/neo-heidelberg"><Button variant="contained" color="secondary" >Neo-heidelberg</Button></a>
              <a href="/schillingroofbar"><Button variant="contained" color="secondary" >Schilling</Button></a>
            </div>
          </Alert> 
        </div>
          : ""
      }
      {
        Object.keys(languageInfos).length === 0 || Object.keys(restaurant).length === 0 ?
        <div id="loading"><CircularProgress /></div> : 
      <>
      <Header restaurant = {restaurant} language= {language} setlanguage={setLanguage} />
      <Reservation restaurantID = {restaurantID} restaurant = {restaurant} languageInfos = {languageInfos} />
      <BigButtons restaurantID = {restaurantID} restaurant = {restaurant} languageInfos = {languageInfos} />
      </>
      }
      <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
