import {useEffect, useState, useContext}from 'react'
import "./DetailsPage.css"
import {useParams} from 'react-router-dom'
import axios from 'axios';
import { HeartedContext } from '../../contexts/HeartedContext';
import { ThemeContext } from '../../contexts/DarkModeContext';

function DetailsPage() {
 
  const {productId} = useParams();


  const [itemDetails, setItemDetails] = useState([]);
 

  const {darkMode} = useContext(ThemeContext);


  const [isAdded, setIsAdded] = useState(false);

  
  const {hearted, addProduct, removeProduct} = useContext(HeartedContext);
  
 

  useEffect(
    ()=>{
      
     axios.get(`https://fakestoreapi.com/products/${productId}`)
     .then((result)=>
     {
      
      setItemDetails(result?.data)
      console.log(result.data)
      
     }
     )
     .catch((error)=>console.log(error))
    }, [productId]
     
  )

 
  useEffect(() => {
    const foundProduct = hearted.find((product) => product.id === itemDetails?.id);
    setIsAdded(foundProduct);
  }, [hearted, itemDetails]);


  return (
    <div className={
      darkMode?
      'details-main-container'
      :
      'details-main-container dark-details-main-container'
    }>
        <div className={
          darkMode?
          'details-container'
          :
          'details-container dark-details-container'
        }>
            <div className='details-img'>
                <img src={itemDetails?.image}/>
            </div>
            <div className={
              darkMode?
              'details-info'
              :
              'details-info dark-details-info'
            }>
                <h3>{itemDetails?.title}</h3>
                <p>${itemDetails?.price}</p>
                <p>Description</p>
                <p>{itemDetails?.description}</p>
                {
                  isAdded?
                  <button className='details-button red-button' onClick={()=> removeProduct(itemDetails.id)} >Remove From Cart</button> 
                  :
                  <button className='details-button' onClick={()=> addProduct(itemDetails)} >Add to Cart</button> 
                }
            </div>
        </div>
    </div>
  )
}

export default DetailsPage
