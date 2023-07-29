import Grid from '@mui/material/Grid';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import InfiniteScroll from 'react-infinite-scroll-component';

import { Article } from '../components/Article';
import { ArticleSkeleton } from '../components/Article/ArticleSkeleton';
import { CommentsBlock } from '../components/CommentsBlock';
import { TagsBlock } from '../components/TagsBlock';
import { fetchNews } from '../redux/articlesSlice';

import { Typography } from '@mui/material';

export const Home = () => {
	const dispatch = useDispatch();
	const news = useSelector(state => state.news.news);
	const newsStatus = useSelector(state => state.news.status);
	const isNewsLoading = useSelector(state => state.news.status === 'loading');
	const hasMore = useSelector(state => state.news.status !== 'failed');
	const error = useSelector(state => state.news.error);
	const page = Math.floor(news.length / 10) + 1;

	useEffect(() => {
		if (newsStatus === 'idle') {
			dispatch(fetchNews(page));
		}
	}, [newsStatus, dispatch, page]);

	const handleLoadMore = () => {
		if (newsStatus === 'succeeded') {
			dispatch(fetchNews(page));
		}
	};

	return (
		<>
			<Tabs
				style={{ marginBottom: 15 }}
				value={0}
				aria-label='basic tabs example'
			>
				<Tab label='Новые' />
				<Tab label='Популярные' />
			</Tabs>
			<Grid container spacing={4}>
				<Grid xs={8} item>
					<InfiniteScroll
						dataLength={news.length}
						next={handleLoadMore}
						hasMore={hasMore}
						loader={<ArticleSkeleton isLoading />}
						endMessage={
							<p style={{ textAlign: 'center' }}>
								{error ? (
									<Typography variant='span' color='error'>
										{error}
									</Typography>
								) : (
									<b>Конец списка новостей</b>
								)}
							</p>
						}
					>
						{(isNewsLoading ? [...Array(5)] : news).map((article, index) =>
							isNewsLoading ? (
								<Article key={index} isLoading={true} />
							) : (
								<Article
									key={index}
									url={article.url}
									title={article.title}
									urlToImage={article.urlToImage}
									description={article.description}
									source={{
										logoUrl:
											'https://res.cloudinary.com/practicaldev/image/fetch/s--uigxYVRB--/c_fill,f_auto,fl_progressive,h_50,q_auto,w_50/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/187971/a5359a24-b652-46be-8898-2c5df32aa6e0.png',
										sourceTitle: article.source.name,
										author: article.author,
									}}
									publishedAt={article.publishedAt}
									viewsCount={150}
									commentsCount={3}
									tags={['Mock1', 'Mock2', 'Mock3']}
									isLoading={false}
								/>
							)
						)}
					</InfiniteScroll>
				</Grid>
				<Grid xs={4} item>
					<TagsBlock
						items={['Mock1', 'Mock2', 'Mock3']}
						isLoading={isNewsLoading}
					/>
					<CommentsBlock
						items={[
							{
								user: {
									fullName: 'Николай Уланов',
									avatarUrl: 'https://mui.com/static/images/avatar/1.jpg',
								},
								text: 'Какой-то комментарий',
							},
							{
								user: {
									fullName: 'Павел Антарес',
									avatarUrl: 'https://mui.com/static/images/avatar/2.jpg',
								},
								text: 'Какой-то комментарий',
							},
						]}
						isLoading={isNewsLoading}
					/>
				</Grid>
			</Grid>
		</>
	);
};
