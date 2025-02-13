import React from 'react'

const Loading = ({height="[200px]"}) => {
  return (
    <div className={`flex justify-center items-center min-h-${height} w-full`}>
        <span className="loading loading-dots loading-lg"></span>
    </div>
  )
}

export default Loading