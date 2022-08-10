import React from 'react'
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { fetchData, selectAjaibState, setSortedCol } from '../../Reducer/ajaibReducer';
import TableHeadCell from '../Base/TableHeadCell';
import { useDispatch } from 'react-redux';
import { filterArrayOfObj, formatDateDDMMYYYYHHmm, sortArrayOfObj } from '../../Helpers';
import ContentPagination from './ContentPagination';

const TableContainer = styled.div`
    width: 100%;
    overflow-x: auto;
    min-height: 350;
`
const Table = styled.table`
    width: 100%;
`

const TableHead = styled.thead`
    display: table-header-group;
`

const TableHeadRow = styled.tr`
    color: inherit;
    display: table-row;
    vertical-align: middle;
    outline: 0px;
`

const TableBody = styled.tbody`
    display: table-row-group;
`

const TableRow = styled.tr`
    color: inherit;
    display: table-row;
    vertical-align: middle;
    outline: 0px;
`

const TableCell = styled.td`
    font-weight: 400;
    font-size: 0.875rem;
    line-height: 1.43;
    letter-spacing: 0.01071em;
    display: table-cell;
    vertical-align: inherit;
    border-bottom: 1px solid rgb(224, 224, 224);
    text-align: ${props => props.align ? props.align : 'left'};
    padding: 16px;
    color: rgba(0, 0, 0, 0.87);
`

const ContentComponent = () => {
    const dispatch = useDispatch();

    const { rows, searchValue, loading, sortedColumn, gender, page } = useSelector(selectAjaibState);

    const getRow = (sortedColumn) => {
        dispatch(fetchData({
            gender,
            searchValue,
            sortedColumn: sortedColumn,
            page
        }))
    }

    const filteredAndSortedRows = React.useMemo(() => {
        // redux is muttable
        let result = [...rows.map(row => ({
            ...row
        }))];

        if (searchValue) {
            result = filterArrayOfObj(result, searchValue);
        }
        if (sortedColumn.order && sortedColumn.sortBy) {
            result = sortArrayOfObj(result, sortedColumn.sortBy, sortedColumn.order);
        }
        return result;
    }, [rows, searchValue, sortedColumn]);

    const onSortClick = (field) => ({order}) => {
        const res = {
            sortBy: field
        }
        if (!order) {
            res.order = "ascend";
        } else if (order === "ascend") {
            res.order = "descend";
        } else if (order === "descend") {
            res.order = "";
        }
        dispatch(setSortedCol(res));
        getRow(res);
    }

    return (
        <div style={{marginBottom: 24}}>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableHeadRow>
                            <TableHeadCell
                             align='left'
                             order={sortedColumn.sortBy === "username" ? sortedColumn.order : ""}
                             onSortClick={onSortClick("username")}
                            >
                                Username
                            </TableHeadCell>

                            <TableHeadCell
                             align='left'
                             order={sortedColumn.sortBy === "name" ? sortedColumn.order : ""}
                             onSortClick={onSortClick("name")}
                            >
                                Name
                            </TableHeadCell>

                            <TableHeadCell
                             align='left'
                             order={sortedColumn.sortBy === "email" ?  sortedColumn.order : ""}
                             onSortClick={onSortClick("email")}
                            >
                                Email
                            </TableHeadCell>

                            <TableHeadCell
                             align='left'
                             order={sortedColumn.sortBy === "gender" ? sortedColumn.order : ""}
                             onSortClick={onSortClick("gender")}
                            >
                                Gender
                            </TableHeadCell>

                            <TableHeadCell
                             align='left'
                             order={sortedColumn.sortBy === "registered_date" ? sortedColumn.order : ""}
                             onSortClick={onSortClick("registered_date")}
                            >
                                Registered Date
                            </TableHeadCell>
                        </TableHeadRow>
                    </TableHead>
                    <TableBody>
                        {loading && <TableRow style={{height: 200}}>
                            <TableCell colSpan={5} align='center'>
                                <h2>Loading...</h2>
                            </TableCell>
                        </TableRow>}
                        {React.Children.toArray(filteredAndSortedRows.map(row => (
                            <TableRow>
                                <TableCell>{row.username}</TableCell>
                                <TableCell>{row.name}</TableCell>
                                <TableCell>{row.email}</TableCell>
                                <TableCell>{row.gender}</TableCell>
                                <TableCell>{formatDateDDMMYYYYHHmm(row.registered_date)}</TableCell>
                            </TableRow>
                        )))}
                    </TableBody>
                </Table>
            </TableContainer>
            <ContentPagination/>
        </div>
    )
}

export default ContentComponent;