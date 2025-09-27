// src/components/Footer/Footer.jsx
import {useContext} from 'react'
import "./Footer.css"
import { ThemeContext } from '../../contexts/DarkModeContext';
import { Link } from 'react-router-dom';
import { FaGithubSquare, FaLinkedin} from "react-icons/fa";

function Footer() {
   const {darkMode} = useContext(ThemeContext);
  return (
    <div className={
      darkMode?
      'footer-container'
      :
      'footer-container dark-footer-container'
    }>
      <div className='social-icon-container'>
        <Link to="https://github.com/csccorgozinho"> <FaGithubSquare className='social-icons'/></Link>
        <Link to="https://www.linkedin.com/in/caio-campos-a80b93236"> <FaLinkedin className='social-icons'/></Link>
      </div>
      <Link to='/contactUs'>Contact Us</Link>
      <Link to='/myorders'>Meus Pedidos</Link> {/* Novo link */}
    </div>
  )
}

export default Footer
