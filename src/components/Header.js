import React from 'react';
import LanguageToggle from './LanguageToggle';

export default function Header(props) {
  const {link, image, logo, name} = props.restaurant
  return (
    <div id="header">
      <div className="first-line">
      <a href={link} target='_blank' ><img className="restaurant-logo" src={logo} alt={name} /></a>
      <LanguageToggle language = {props.language} setlanguage = {props.setlanguage} />
      </div>
      <div className="restaurant-image" style={{backgroundImage: `url('${image}')`}}></div>
    </div>
  )
}
