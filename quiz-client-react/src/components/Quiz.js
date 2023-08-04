import React, { useContext } from 'react'
import {useStateContext} from '../hooks/useStateContext'

export default function Quiz() {
    const {context, setContext} = useStateContext()
    console.log(context);

    // setContext({
    //  //   ...context, 
    //     timeTaken: 1
    // })
  return (
    <div>Question</div>
  )
}
