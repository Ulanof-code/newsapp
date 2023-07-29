import CommentIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import EyeIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import React from 'react';
import { Link } from 'react-router-dom';

import { SourceInfo } from '../SourceInfo';
import styles from './Article.module.scss';
import { ArticleSkeleton } from './ArticleSkeleton';

export const Article = React.memo(
	({
		title,
		publishedAt,
		urlToImage,
		source,
		viewsCount,
		commentsCount,
		description,
		tags,
		url,
		children,
		isLoading,
	}) => {
		if (isLoading) {
			return <ArticleSkeleton />;
		}

		return (
			<div className={styles.root}>
				{urlToImage ? (
					<img className={styles.image} src={urlToImage} alt={title} />
				) : (
					<img
						className={styles.image}
						src={
							'https://avatars.mds.yandex.net/i?id=a5b28b915f3fe9e59c192d5b7387312e_l-4081108-images-thumbs&n=13'
						}
						alt={title}
					/>
				)}
				<div className={styles.wrapper}>
					<SourceInfo {...source} />
					<div className={styles.indention}>
						<h2 className={styles.title}>
							<a target='_blank' rel='noreferrer' href={`${url}`}>
								{title}
							</a>
						</h2>
						<p>{description}</p>
						<ul className={styles.tags}>
							{tags.map(name => (
								<li key={name}>
									<Link to={`/tag/${name}`}>#{name}</Link>
								</li>
							))}
						</ul>
						{children && <div className={styles.content}>{children}</div>}
						<ul className={styles.articleDetails}>
							<li>
								<span>{new Date(publishedAt).toLocaleString()}</span>
							</li>
							<li>
								<EyeIcon />
								<span>{viewsCount}</span>
							</li>
							<li>
								<CommentIcon />
								<span>{commentsCount}</span>
							</li>
						</ul>
					</div>
				</div>
			</div>
		);
	}
);
