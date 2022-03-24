import React from 'react'

function Die(props) {

    const styles = props.isHeld ?  {
        backgroundColor: 'green',
        color: 'white'
      } : {}

  return (
    <div 
        style={styles} 
        onClick = {()=>props.holdDice(props.id)}
        className ="dice"
        >
            {props.value}
    </div>
  )
}

export default Die