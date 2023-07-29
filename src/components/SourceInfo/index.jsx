import React from 'react';
import styles from './SourceInfo.module.scss';

export const SourceInfo = ({ logoUrl, sourceTitle, author }) => {
	return (
		<div className={styles.root}>
			<img
				className={styles.logo}
				src={logoUrl || '/noavatar.png'}
				alt={sourceTitle}
			/>
			<div className={styles.sourceDetails}>
				<span className={styles.title}>{author}</span>
				<span className={styles.sourceTitle}>{sourceTitle}</span>
			</div>
		</div>
	);
};
