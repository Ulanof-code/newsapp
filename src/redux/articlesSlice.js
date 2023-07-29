import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchNews = createAsyncThunk('news/fetchNews', async page => {
	const response = await axios.get(
		`https://newsapi.org/v2/everything?q=bitcoin&apiKey=7c7c3707ebbb4b239ebf98d89e4fc94d&page=${page}&pageSize=10`
	);
	return response.data.articles;
});

const articlesSlice = createSlice({
	name: 'articles',
	initialState: { news: [], status: 'idle', error: null },
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(fetchNews.pending, state => {
				state.status = 'loading';
			})
			.addCase(fetchNews.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.news = state.news.concat(action.payload);
			})
			.addCase(fetchNews.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message;
			});
	},
});

export default articlesSlice.reducer;
