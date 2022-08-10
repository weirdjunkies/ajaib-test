import React from 'react'
import styled from 'styled-components';
import TextField from '../Base/TextField';
import { useSelector, useDispatch } from 'react-redux';
import { fetchData, onClickResetFilter, selectAjaibState, setGender, setPage, setSearchValue } from '../../Reducer/ajaibReducer';
import Select from '../Base/Select';
import IconButton from '../Base/IconButton';
import {AiOutlineSearch} from 'react-icons/ai'
import Button from '../Base/Button';

const Root = styled.div`
    margin-bottom: 16px;
    display: inline-flex;
`

const SearchFieldWrapper = styled.div`
 display: flex;
 flex-direction: row;
 margin-right: 8px;
 align-items: flex-end;
`

const ResetButtonWrapper = styled.div`
display: flex;
align-items: flex-end;
margin-bottom: 16px;
margin-left: 8px;
`

const HeaderComponent = () => {
    const dispatch = useDispatch();

    const {
        gender,
        page,
        searchValue,
        sortedColumn
    } = useSelector(selectAjaibState);

    const getRow = React.useCallback((data) => {
        dispatch(fetchData({
            gender,
            page,
            searchValue,
            sortedColumn,
            ...data
        }))
    }, [dispatch, gender, page, searchValue, sortedColumn]);


    const onChangeSearchField = (e) => {
        dispatch(setSearchValue(e.target.value));
    };

    const onKeyDown = (e) => {
        const key = e.key;
        const value = e.target.value;
        if (key === "Enter") {
            getRow({
                searchValue: value
            })
        }
    }

    const onChangeGender = (e) => {
        const value = e.target.value;
        dispatch(setGender(value));
        getRow({
            gender: value
        });
    }

    const onClickResetBtn = () => {
        // dispatch(onResetFilter());
        dispatch(onClickResetFilter());
    }

    const onClickSearchBtn = () => {
        dispatch(setPage(1));
        getRow({
            page: 1
        });
    };

    return (
        <Root>
            <SearchFieldWrapper>
                <TextField
                 label="Search"
                 type="search"
                 value={searchValue}
                 onChange={onChangeSearchField}
                 onKeyDown={onKeyDown}
                />
                <div style={{paddingBottom: 16}}><IconButton onClick={onClickSearchBtn}>
                    <AiOutlineSearch/>
                </IconButton></div>
            </SearchFieldWrapper>
            
            <Select
             label="Gender"
             value={gender}
             onChange={onChangeGender}
             style={{
                width: 100
             }}
            >
                <option value="">All</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
            </Select>

            <ResetButtonWrapper>
                <Button onClick={onClickResetBtn}>Reset Filter</Button>
            </ResetButtonWrapper>
        </Root>
    )
}

export default HeaderComponent;