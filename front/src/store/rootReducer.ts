import { combineReducers } from '@reduxjs/toolkit';
import equipamentosReducer from './equipamentos/equipamentosSlice';

const rootReducer = combineReducers({
  equipamentos: equipamentosReducer,
});

export default rootReducer;
