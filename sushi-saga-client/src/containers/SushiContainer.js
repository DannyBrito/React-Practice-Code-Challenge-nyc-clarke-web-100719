import React, { Fragment } from 'react'
import MoreButton from '../components/MoreButton'
import Sushi from '../components/Sushi'
const SushiContainer = (props) => {
  return (
    <Fragment>
      <div className="belt">
        {props.sushis.map(s => <Sushi key={s.id} eatSushi={props.eatSushi}{...s} />)}
        <MoreButton nextFour={props.nextFour}/>
      </div>
    </Fragment>
  )
}

export default SushiContainer