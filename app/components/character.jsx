import React from 'react'

const Character = ({ name }) => {
  return (<option key={name} value={name}>{name}</option>)
}

export default Character