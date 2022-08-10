import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import ContentComponent from './Components/ContentComponent';
import HeaderComponent from './Components/HeaderComponent';
import { fetchData } from './Reducer/ajaibReducer';

function App() {
  const dispatch = useDispatch();
  const getRow = React.useCallback(() => {
    dispatch(fetchData())
  }, [dispatch]);

  useEffect(() => {
    getRow();
  }, [getRow]);

  return (
    <div style={{padding: "0px 16px"}}>
      <HeaderComponent/>
      <ContentComponent/>
    </div>
  )
};

export default App;