import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Footer from './components/Footer';
import Header from './components/Header';
import Reservation from './components/Reservation';

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import './App.css';



function App(props) {
  // Define the user's language
  const navLanguage = navigator.language || navigator.browserLanguage;
  let language;           
  navLanguage.indexOf('de') > -1 ? language = 'de' : language = 'en';
  const [languageInfos, setLanguageInfos] = useState({})

  // Define the restaurant ID
  const [restaurant, setRestaurant] = useState({})
  const restaurantID = window.location.pathname

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
      }
    }
  });

  
  useEffect(() => {
    axios.get(`https://api.gastronaut.ai/codeTest${restaurantID}`)
      .then(response => {
        setRestaurant(response.data)
        setRestaurantTheme(response.data.colorPalette)
      })
      .catch(err => console.log(err))
  }, [restaurantID])

  useEffect(() => {
    axios.get(`https://api.gastronaut.ai/v02/language/codeTest/${language}`)  
      .then(result => setLanguageInfos(result.data))
  }, [language])


  return (
    <ThemeProvider theme={theme}>
      <Header restaurant = {restaurant} language= {language} setlanguage={"tobedefined"} />
      <Reservation restaurant = {restaurant} languageInfos = {languageInfos} />
      <Footer />
    </ThemeProvider>
  );
}

export default App;
