import React from 'react'
import styled from 'styled-components'

const Btn = styled.button`
    background: transparent;
    background-color: transparent;
    padding: 6px 10px;
    font-size: 13px;
    border: 1px solid #c0c0c0;
    cursor: pointer;
`

const Button = ({children, onClick}) => {
  return (
    <Btn onClick={onClick}>{children}</Btn>
  )
}

export default Button