import React , { useEffect, useState } from 'react'
import './CategorySlider.css'
import axios from 'axios';
import Slider from "react-slick";
import { useTheme } from '@mui/material'
function CategorySlider() {

  const theme = useTheme()
    const [categories, setcategories] = useState([])
    async function getCategories() {
      let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
      setcategories(data.data)
    }
    useEffect(() => {
      getCategories();
    }, [])
  
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 7,
        slidesToScroll: 3,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 5,
              slidesToScroll: 3,
              dots: true,
            }
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 2,
              dots: true,
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              dots: false,
            
            }
          }
        ]
      };

  return <>
  <div className='my-5'>
     <h2 className={`h4 fw-bold  headText head ${theme.palette.mode === 'light' ? 'LightMode': 'DarkMode'}`}>Shop Popular Categories </h2>
     <Slider {...settings}>
         {categories.map((category) => 
          <div key={category._id}>
            <img src={category.image}  className='w-100 imageSliderCate'/>
            <h6 className='text-center mt-1'>{category.name}</h6>
          </div>
        )}
     </Slider>
  </div>
  </>
}

export default CategorySlider
