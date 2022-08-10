import {
    createAsyncThunk,
    createSlice
} from '@reduxjs/toolkit';
import { getData } from './ajaibApi';

const initialState = {
    searchValue: "",
    gender: "",
    sortedColumn: {
        order: "",
        sortBy: ""
    },
    rows: [],
    page: 1,
    pageSize: 10,
    loading: false,
    errorMessage: ""
};

export const fetchData = createAsyncThunk("ajaibReducer/fetchData", (data) => getData(data));

export const onClickResetFilter = createAsyncThunk("ajaibReducer/onClickResetFilter", (data) => getData());

export const ajaibSlice = createSlice({
    name: "ajaibReducer",
    initialState,
    reducers: {
        setSearchValue: (state, action) => {
            state.searchValue = action.payload;
        },
        setGender: (state, action) => {
            state.gender = action.payload
        },
        setPage: (state, action) => {
            state.page = action.payload;
        },
        setSortedCol: (state, action) => {
            state.sortedColumn.order = action.payload.order;
            state.sortedColumn.sortBy = action.payload.sortBy;
        }
    },
    extraReducers: (build) => {
        build
            .addCase(fetchData.pending, (state, action) => {
                state.loading = true;
                state.rows = initialState.rows;
                state.errorMessage = initialState.errorMessage;
            })
            .addCase(fetchData.rejected, (state, action) => {
                state.errorMessage = action.error.message;
                state.loading = false;
            })
            .addCase(fetchData.fulfilled, (state, action) => {
                state.rows = action.payload;
                state.loading = false;
            })
            .addCase(onClickResetFilter.pending, (state) => {
                state.loading = true;
                state.rows = initialState.rows;
                state.errorMessage = initialState.errorMessage;
                state.searchValue = initialState.searchValue;
                state.gender = initialState.gender;
                state.page = initialState.page;
            })
            .addCase(onClickResetFilter.rejected, (state, action) => {
                state.errorMessage = action.error.message;
                state.loading = false;
            })
            .addCase(onClickResetFilter.fulfilled, (state, action) => {
                state.rows = action.payload;
                state.loading = false;
            })
    }
});

export const {
    setGender,
    setSearchValue,
    setPage,
    setSortedCol
} = ajaibSlice.actions;

/**
 * 
 * @param {*} state 
 * @returns {initialState}
 */
export const selectAjaibState = state => state.ajaibReducer;

export default ajaibSlice.reducer;