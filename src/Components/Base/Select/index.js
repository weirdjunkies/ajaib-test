import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    display: inline-flex;
    flex-direction: column;
    padding: 16px 0px;
`

const Label = styled.label`
 display: block;
 margin-bottom: 8px;
`

const Input = styled.select`
 display: block;
 width: 100%;
 height: 30px;
 border: 1px solid  #c0c0c0;
 cursor: pointer;
`

const Select = ({label, id, name, onChange, value, style, children}) => {
    const inputProps = {
        id,
        name,
        onChange: onChange ? onChange : () => {},
        value,
    };
    return (
        <Container style={style}>
            {label && <Label>{label}</Label>}
            <Input
             {...inputProps}
             typ
            >
                {children}
            </Input>
        </Container>
    )
}

export default Select;