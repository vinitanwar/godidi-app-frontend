import React from 'react'
import ChatBot from './ChatCompo'

const page = ({ params: { id }}) => {
  return (
    <ChatBot id={id} />
  )
}

export default page