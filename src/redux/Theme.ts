import { createSlice  } from '@reduxjs/toolkit';

export const Theme = createSlice({
    name:'theme',
    initialState:{mode:'light'},
    reducers:{
        toggleTheme(state,action){
            if(state.mode === 'dark' ){
                state.mode = 'light'
            } else {
                state.mode = 'dark'
            }
        },
        changeTheme(state,action){
            state.mode = action.payload.newTheme
        }
    }
});

export const themeActions = Theme.actions