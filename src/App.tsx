import { CssBaseline, ThemeProvider } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';

import theme from './utils/theme';
import Layout from './components/Layout';
import AppRoutes from './components/Routes';
import { UserProvider } from './hooks/useLoggedInUser';

const App = () => (
	<UserProvider>
		<ThemeProvider theme={theme}>
			<BrowserRouter>
				<CssBaseline />
				<Layout>
					<AppRoutes />
				</Layout>
			</BrowserRouter>
		</ThemeProvider>
	</UserProvider>
);

export default App;
