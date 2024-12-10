import { createSlice } from '@reduxjs/toolkit';
import formStyle1 from '../Styles/formStyles/formStyle1';
import formStyle2 from '../Styles/formStyles/formStyle2';
import formStyle3 from '../Styles/formStyles/formStyle3'; 
import listCardStyle1 from '../Styles/listCardStyles/listCardStyle1';
import listCardStyle2 from '../Styles/listCardStyles/listCardStyle2';
import listCardStyle3 from '../Styles/listCardStyles/listCardStyle3'; 
import listStyle1 from '../Styles/listStyles/listStyle1';
import listStyle2 from '../Styles/listStyles/listStyle2';
import listStyle3 from '../Styles/listStyles/listStyle3'; 

const initialState = {
  formStyles: formStyle1, 
  listCardStyles: listCardStyle1, 
  listStyles: listStyle1,
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme1: (state) => {
      state.formStyles = formStyle1;
      state.listCardStyles = listCardStyle1;
      state.listStyles = listStyle1;
    },
    setTheme2: (state) => {
      state.formStyles = formStyle2;
      state.listCardStyles = listCardStyle2;
      state.listStyles = listStyle2;
    },
    setTheme3: (state) => {
      state.formStyles = formStyle3;
      state.listCardStyles = listCardStyle3;
      state.listStyles = listStyle3;
    },
  },
});

export const { setTheme1, setTheme2, setTheme3 } = themeSlice.actions;

export default themeSlice.reducer;
