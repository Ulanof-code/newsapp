import { configureStore } from '@reduxjs/toolkit';
import articlesReducer from './articlesSlice';

const store = configureStore({
	reducer: {
		news: articlesReducer,
	},
});

export default store;
