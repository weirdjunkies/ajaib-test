import React from 'react'
import styled from 'styled-components'

const Btn = styled.button`
 background-color: dodgerblue;
 border: none;
 color: white;
 padding: 7px 12px;
 font-size: 16px;
 cursor: pointer;
 :hover {
    background-color: royalblue;
 }
`

const IconButton = ({children, onClick}) => {
  return (
    <Btn onClick={onClick}><i style={{alignItems: 'center', display: 'flex'}}>{children}</i></Btn>
  )
}

export default IconButton