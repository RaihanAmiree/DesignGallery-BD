import React from 'react'
import Comment from './Comment'
import HeroSection from '../Components/HeroSection'
import FeatureSection from '../Components/FeatureSection'
import Identity from '../Components/Identity'
import Branding from '../Components/Branding'
import CarouselPage from './CarouselPage'

const Home = () => {
  return (
    <div>
            <div className="w-full ">
              <HeroSection></HeroSection>
              <FeatureSection></FeatureSection>
              <CarouselPage></CarouselPage>
              <Branding></Branding>
              <Identity></Identity>
              <Comment></Comment>
            </div>
    </div>
  )
}

export default Home
