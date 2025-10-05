import {useContext} from 'react'
import "./Contact.css"
import { ThemeContext } from '../../contexts/DarkModeContext'

function ContactUs() {

  const {darkMode} = useContext(ThemeContext);
  return (
    <div className={
      darkMode?
      'contact-container'
      :
      'contact-container dark-contact-container'
    }>
        <div className={
          darkMode?
          'form-container'
          :
          'form-container dark-form-container'
        }>
            <h1>Contact Us</h1>
            <input type="text" placeholder='Caio'/>
            <input type="text" placeholder='Corgozinho'/>
            <input type="text" placeholder='lol'/>
            <button>Submit</button>
        </div>
    </div>
  )
}

export default ContactUs
