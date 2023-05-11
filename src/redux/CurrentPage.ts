import { createSlice } from "@reduxjs/toolkit";

export const currentPage = createSlice({
    name:'currentPage',
    initialState:{page:'home'},
    reducers: {
        setCurrentPage(state,action){
            state.page = action.payload.page
        }
    }
})


export const currentpageActions = currentPage.actions