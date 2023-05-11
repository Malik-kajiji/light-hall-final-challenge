import { configureStore } from '@reduxjs/toolkit';
import { Theme } from '../redux/Theme';
import { alertController } from '../redux/AlertController';
import { currentPage } from '../redux/CurrentPage';

export const store = configureStore({
    reducer:{
        [Theme.name] : Theme.reducer,
        [alertController.name]:alertController.reducer,
        [currentPage.name]:currentPage.reducer
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
    // .concat(CryptoApi.middleware)
});

export type RootState = ReturnType<typeof store.getState>
