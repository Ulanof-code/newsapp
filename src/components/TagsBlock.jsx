import React from 'react';

import TagIcon from '@mui/icons-material/Tag';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Skeleton from '@mui/material/Skeleton';

import { SideBlock } from './SideBlock';

export const TagsBlock = React.memo(
	({ items, isLoading = true }) => {
		return (
			<SideBlock title='Тэги'>
				<List>
					{(isLoading ? [...Array(5)] : items).map((name, i) => (
						<a
							key={i}
							style={{ textDecoration: 'none', color: 'black' }}
							href={`/tags/${name}`}
						>
							<ListItem key={i} disablePadding>
								<ListItemButton>
									<ListItemIcon>
										<TagIcon />
									</ListItemIcon>
									{isLoading ? (
										<Skeleton width={100} />
									) : (
										<ListItemText primary={name} />
									)}
								</ListItemButton>
							</ListItem>
						</a>
					))}
				</List>
			</SideBlock>
		);
	},
	(prevProps, nextProps) => {
		prevProps.items.forEach((tag, index) => {
			if (tag !== nextProps.items[index]) return false;
			return true;
		});
	}
);
