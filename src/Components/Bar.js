import React from 'react'
import Button from '../Assets/Button'
import {useHistory} from 'react-router-dom'

export default function Bar(){

const history = useHistory()

const onClickDashboard = () => {
//alert('dashboard')
history.push('/')

}

const onClickRanking = () => {
alert('Ranking')

}


return (
  <>

  <div style={{display:'flex', justifyContent:'space-around'}}>
  <Button color="primary" text="Dashboard" onClick={()=>onClickDashboard()}/>
  <Button color="primary" text="Ranking" onClick={()=>onClickRanking()}/>
  </div>


  </>
)


}
