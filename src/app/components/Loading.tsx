import React from 'react'
import {AiOutlineLoading3Quarters} from "react-icons/ai"

export default function Loading() {
  return (
    <div className="h-screen text-white flex justify-center items-center text-2xl">
        <AiOutlineLoading3Quarters className="m-1 animate-spin"/>Loading Charts..
    </div>
  )
}
