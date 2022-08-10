import React from 'react'
import styled from 'styled-components';

const Container = styled.div`
    display: inline-flex;
    flex-direction: column;
    padding: 16px 0px;
`

const Label = styled.label`
 margin-bottom: 8px;
`

const Input = styled.input`
 width: 100%;
 height: 30px;
 border: 1px solid  #c0c0c0;
`

const TextField = ({label, value, onChange, id, name, defaultValue, type, style, onKeyDown}) => {
    const inputProps = {
        id,
        name,
        onChange,
        value,
        defaultValue,
        type,
        onKeyDown
    };

    return (
        <Container style={style}>
            {label && <Label>{label}</Label>}
            <Input
             {...inputProps}
            />
        </Container>
    )
}

export default TextField;