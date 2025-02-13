import React from 'react'
import BannerNew from '../../components/Home/BannerNew'
import HighestParticipantsCamps from '../../components/Home/HighestParticipantsCamps/HighestParticipantsCamps'
import TestimonialSlider from '../../components/Home/TestimonialSlider/TestimonialSlider'
import HowItWorks from '../../components/Home/HowItWorks/HowItWorks'
import Features from '../../components/Home/Features/Features'
import BestDoctors from '../../components/Home/BestDoctor/BestDoctor'
import Contact from '../Contact/Contact'
import TopParticipants from '../../components/Home/TopParticipants/TopParticipants'



const Home = () => {




  return (
    <div  className='min-h-screen'>
       <BannerNew></BannerNew>
       <div className='h-[200px]'> 
       </div>
       <HighestParticipantsCamps></HighestParticipantsCamps>
       <TopParticipants></TopParticipants>
       <HowItWorks></HowItWorks>
       <BestDoctors></BestDoctors>
       <Features></Features>
       <TestimonialSlider></TestimonialSlider>
       <Contact></Contact>

  
       
    </div>
  )
}

export default Home