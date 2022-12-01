import { FC, PropsWithChildren } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Container, Toolbar, Button, Box } from '@mui/material';

import useLoggedInUser from '../hooks/useLoggedInUser';
import { signOut } from '../utils/firebase';

const Layout: FC<PropsWithChildren> = ({ children }) => {
	const user = useLoggedInUser();

	return (
		<>
			<AppBar sx={{ position: 'sticky', top: 0 }}>
				<Container maxWidth="sm">
					<Toolbar disableGutters sx={{ gap: 2 }}>
						<Button component={Link} to="/">
							Home
						</Button>
						<Button component={Link} to="/plans">
							Browse
						</Button>
						{!!user && (
							<Button component={Link} to="/create">
								Create
							</Button>
						)}
						<Box sx={{ flexGrow: 1 }} />
						{!user ? (
							<Button component={Link} to="/login">
								Login
							</Button>
						) : (
							<Button onClick={signOut}>Logout</Button>
						)}
					</Toolbar>
				</Container>
			</AppBar>

			<Container
				maxWidth="sm"
				component="main"
				sx={{
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					alignItems: 'center',
					flexGrow: 1,
					gap: 2,
					py: 2
				}}
			>
				{children}
			</Container>
		</>
	);
};
export default Layout;
