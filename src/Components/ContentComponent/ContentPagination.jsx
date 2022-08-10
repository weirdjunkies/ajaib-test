import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { fetchData, selectAjaibState, setPage } from '../../Reducer/ajaibReducer';
import {IoChevronBackOutline, IoChevronForwardOutline} from 'react-icons/io5';

const Nav = styled.nav`
    margin: 16px 0px 0px;
    ::before::after {
        box-sizing: inherit;
    }
`

const Ul = styled.ul`
    display: flex;
    flex-wrap: wrap;
    -webkit-box-align: center;
    align-items: center;
    padding: 0px;
    margin: 0px;
    list-style: none;
    justify-content: flex-end;
`

const Btn = styled.button `
    display: inline-flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    position: relative;
    -webkit-tap-highlight-color: transparent;
    outline: 0px;
    user-select: none;
    vertical-align: middle;
    appearance: none;
    text-decoration: none;
    font-family: Roboto, Helvetica, Arial, sans-serif;
    font-weight: 400;
    font-size: 0.875rem;
    line-height: 1.43;
    letter-spacing: 0.01071em;
    border-radius: 4px;
    text-align: center;
    box-sizing: border-box;
    min-width: 32px;
    height: 32px;
    padding: 0px 6px;
    margin: 0px 3px;
    color: rgba(0, 0, 0, 0.87);
    transition: color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    border: 1px solid rgba(0, 0, 0, 0.23);
    background-color: ${props => props.selected ? '#00000014' : 'transparent'};
    opacity: ${props => props.disabled ? 0.38 : 1};
    cursor: ${props => props.disabled ? 'default' : 'pointer'};
`

const Span = styled.span`
    overflow: hidden;
    pointer-events: none;
    position: absolute;
    z-index: 0;
    inset: 0px;
    border-radius: inherit;
`

const ContentPagination = () => {
    const dispatch = useDispatch();

    const {
        gender,
        searchValue,
        sortedColumn,
        page
    } = useSelector(selectAjaibState);

    const getRow = (page) => {
        dispatch(fetchData({
            gender,
            searchValue,
            sortedColumn,
            page: page
        }))
    }
    
    const onClickBack = () => {
        dispatch(setPage(page - 1));
        getRow(page -1);
    }

    const onClickNext = () => {
        dispatch(setPage(page + 1));
        getRow(page + 1);
    }

    const onClickPageBtn = (pageNum) => () => {
        dispatch(setPage(pageNum))
        getRow(pageNum);
    }

    return (
        <Nav>
            <Ul>
                <li>
                    <Btn onClick={onClickBack} disabled={page === 1}>
                        <IoChevronBackOutline/>
                        <Span></Span>
                    </Btn>
                </li>
                <li>
                    <Btn
                     selected={page === 1}
                     onClick={onClickPageBtn(1)}
                    >
                        1
                        <Span></Span>
                    </Btn>
                </li>
                <li>
                    <Btn
                     selected={page === 2}
                     onClick={onClickPageBtn(2)}
                    >
                        2
                        <Span></Span>
                    </Btn>
                </li>
                <li>
                    <Btn onClick={onClickNext} disabled={page === 2}>
                        <IoChevronForwardOutline/>
                        <Span></Span>
                    </Btn>
                </li>
            </Ul>
        </Nav>
    )
}

export default ContentPagination;