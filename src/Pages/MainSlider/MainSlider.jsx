import React from 'react'
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import slide1 from '../../image/mainSlider/grocery-banner-2.jpeg'
import slide2 from '../../image/mainSlider/grocery-banner.png'
import slide3 from '../../image/mainSlider/slider-2.jpeg'
import './MainSlider.css'
function MainSlider() {
  return (
    <div className='row g-0 justify-center rowSlider'>
      <div className='col-12'>
        <OwlCarousel className='owl-theme' loop items={1}>
          <img  src={slide1} className='w-100 imageSlider'/>
          <img src={slide2} className='w-100 imageSlider'  />
          <img src={slide3} className='w-100 imageSlider'  />
        </OwlCarousel>
      </div>
     
    </div>
  )
}

export default MainSlider