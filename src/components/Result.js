import React from 'react'

function Result({...props}){
return <p className='result'>The earliest you can retire with 70% of your current income is {props.year}.</p>
}
export default Result