import React from 'react'
import PaymentForm from './PaymentForm'
import SectionHeading from '../../../components/SectionHeading/SectionHeading'

const Payment = () => {
  return (
    <div className='min-h-screen bg-[#fafafa]'>
        <SectionHeading title1={"---Safe Payment---"} title2={"Feel free to Pay"}></SectionHeading>
        <PaymentForm></PaymentForm>
    </div>
  )
}

export default Payment