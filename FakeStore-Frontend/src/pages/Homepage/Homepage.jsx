import axios from 'axios'
import "./Homepage.css"
import { useState, useEffect, useContext} from 'react'
import ProductCard from '../../components/ProductCard/ProductCard';
import { ThemeContext } from '../../contexts/DarkModeContext';



function Homepage() {
  const [categories, setCategories] = useState([]);
  const [product, setProducts] = useState([]);


  const {darkMode} = useContext(ThemeContext);


  useEffect(
    ()=>{
      
   axios.get(`https://fakestoreapi.com/products/categories`)
  .then((res)=>{
    
    setCategories(res.data);
  })
  .catch((error) => console.log(error))

 
  axios.get(`https://fakestoreapi.com/products`)
  .then((result) => {
    setProducts(result.data);
  })
  .catch((err) => console.log(err));
    }, []);



  const handleFilter = (category) => {
    let url = "https://fakestoreapi.com/products"
    category != "All" ? url =`https://fakestoreapi.com/products/category/${category}` :  url
    
    axios.get(url)
    .then(productResult => {
      
      setProducts(productResult.data)
    })
    .catch((productError) => console.log(productError));
  }
  return (
    <div className={
       darkMode?
      "homepage-container"
      :
      "homepage-container homepage-dark"
    }>
      <div className={
        darkMode?
        'category-container'
        :
        'category-container dark-category-container'
      }>
        <p className='category' type='all' onClick={()=> handleFilter("All")}>All</p>
        {  
        categories.map((element) => <p onClick={()=> handleFilter(element)} key={element}>{element.charAt(0).toUpperCase() + element.slice(1)}</p>)
        }
      </div>
      <div className='product-container'>
        { 
         product.map((item) => <ProductCard products={item} key={item.id} />)
        }
      </div>
        


      </div>
  )
}

export default Homepage
