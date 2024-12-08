import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    loading: false,
    list: [],
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
        addToList: (state, value) => {          //not in use -> giving index/id as undefined
        state.list.push(value.payload);
        },
        removeFromList: (state, value) => {
        const {id} = value.payload;
        if (id >= 0 && id < state.list.length) {
            state.list.splice(id, 1);
        }
        },
        setEditing: (state, value) => {
        state.editCourse = value.payload;
        },
    },
});

export const {setList, setLoading, setEditing, addToList, removeFromList} = formSlice.actions;

export default formSlice.reducer