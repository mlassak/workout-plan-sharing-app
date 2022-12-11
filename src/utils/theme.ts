import { createTheme } from '@mui/material';

export const SESSION_COLOR_A = '#1a237e';
export const SESSION_COLOR_B = '#311b92';

const theme = createTheme({
	palette: {
		mode: 'dark',
		primary: {
			main: '#09a0d6',
			dark: '#8e1e48'
		},
		secondary: {
			main: '#ec407a'
		}
	},
	components: {
		MuiCssBaseline: {
			styleOverrides: {
				'body, #root': {
					display: 'flex',
					flexDirection: 'column',
					minHeight: '100vh'
				}
			}
		}
	}
});

export default theme;
