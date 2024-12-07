import {combineReducers} from "@reduxjs/toolkit";

import formReducer from '../slices/FormSlice';
import themeReducer from '../slices/ThemeSlice';


const rootReducer  = combineReducers({
    form: formReducer,
    theme:themeReducer,
})

export default rootReducer