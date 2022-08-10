import React from 'react'
import styled from 'styled-components';
import {FaSortUp, FaSortDown, FaSort} from 'react-icons/fa';

const TableCell = styled.th`
    font-size: 0.875rem;
    line-height: 1.5rem;
    letter-spacing: 0.01071em;
    display: table-cell;
    vertical-align: inherit;
    border-bottom: 1px solid #e0e0e0;
    /* text-align: center; */
    padding: 16px;
`

const Wrapper = styled.span`
    position: relative;
    box-sizing: border-box;
    -webkit-tap-highlight-color: transparent;
    background-color: transparent;
    outline: 0px;
    border: 0px;
    margin: 0px;
    border-radius: 0px;
    padding: 0px;
    user-select: none;
    vertical-align: middle;
    appearance: none;
    text-decoration: none;
    color: ${props => props.isOrdered ? 'dodgerblue' : 'inherit'};
    cursor: pointer;
    display: inline-flex;
    -webkit-box-pack: start;
    justify-content: flex-start;
    flex-direction: inherit;
    -webkit-box-align: center;
    align-items: center;
`

const Spanicon = styled.span`
  color: ${props => props.isOrdered ? 'dodgerblue' : '#b3b3b3'};
`

const TableHeadCell = ({children, align, onSortClick, order}) => {

  const onClick = () => {
    if (typeof onSortClick !== "function") return;
    onSortClick({order})
  };

  return (
    <TableCell style={{textAlign: align}}>
        <Wrapper onClick={onClick} isOrdered={Boolean(order)}>
          {children}
          <Spanicon isOrdered={Boolean(order)}>
            {order === 'ascend' && <FaSortUp/>}
            {order === 'descend' && <FaSortDown/>}
            {!order && <FaSort/>}
          </Spanicon>
        </Wrapper>
    </TableCell>
  )
}

export default TableHeadCell