import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    loading: false,
    list: null,
    editing: false,
  };

  const formSlice = createSlice({
      name:"form",
      initialState: initialState,
      reducers: {
          setLoading(state, value) {
              state.loading = value.payload;
          },
          setList(state, value){ 
              state.list = value.payload;
          },
          setEditing: (state, action) => {
            state.editCourse = action.payload
          }
      },
  });
  
  export const {setList, setLoading, setEditing} = formSlice.actions;
  
  export default formSlice.reducer