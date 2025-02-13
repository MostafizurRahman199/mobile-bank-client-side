import React from 'react'
import { Link } from 'react-router-dom'

const SharedButton = ({title="Button", path="Salad"}) => {
  return (
    <div className="text-center my-8">
      <Link to={`/order/${path}`}>
      <button className="px-6 py-2 text-black rounded-lg hover:bg-black hover:text-white transition-all duration-300 border-b-4 border-black">
        {title}
      </button>
    </Link>
  </div>
  )
}

export default SharedButton