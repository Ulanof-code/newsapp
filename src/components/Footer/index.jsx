import { Box, Container, Typography } from '@mui/material';
import * as React from 'react';

import styles from './Footer.module.scss';

export const Footer = () => {
	return (
		<div className={styles.root}>
			<Box sx={{ py: 3, mt: 5 }}>
				<Container maxWidth='lg'>
					<Typography variant='body1' color='white' align='center'>
						News Today © 2023
					</Typography>
				</Container>
			</Box>
		</div>
	);
};
