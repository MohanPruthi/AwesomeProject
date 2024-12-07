import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    bgColor: 'white',
    fontSize: 20,
    fontColor: 'black',
    // Todo - object to set theme
  };

  const themeSlice = createSlice({
      name: 'theme',
      initialState: initialState,
      reducers: {
          setBgColor(state, value) {
              state.bgColor = value.payload;
          },
          setFontSize(state, value){ 
              state.fontSize = value.payload;
          },
          setFontColor: (state, action) => {
            state.fontColor = action.payload;
          }
      },
  });
  
  export const {setFontColor, setFontSize, setBgColor} = themeSlice.actions;
  
  export default themeSlice.reducer