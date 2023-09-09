import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
	styles: {
		global: {
			body: {
				bg: '#001F3F',
				maxHeight: '100vh',
				fontFamily: 'Inter',
				// borderRadius: 'md',
			},
			heading: {
				fontFamily: 'Inter',
			},
		},
	},
	colors: {
		transparent: 'transparent',
		black: '#000000',
		white: '#ffffff',
		gray: {
			50: '#f7fafc',
			900: '#171923',
		},
		accent: '#C1FAA6', //neon green
		secondary: '#001F3F', //midnight blue
		primary: '#FFFFFF', //white
		third: '#EDCBEF', //lilac
		fourth: '#E3DD39', //yellow
		green: '#52D4A5',
	},
	borderRadius: {
		none: '0',
		sm: '0.125rem',
		base: '0.25rem',
		md: '0.375rem',
		lg: '0.5rem',
		xl: '0.75rem',
		'2xl': '1rem',
	},
	boxShadow: {
		none: 'none',
		xs: '0 0 0 1px rgba(0, 0, 0, 0.05)',
		sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
		base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
		md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
		lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
		xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
		'2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
		'3xl': '0 35px 60px -15px rgba(0, 0, 0, 0.3)',
		inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
		outline: '0 0 0 3px rgba(66, 153, 225, 0.5)',
		noneFocus: '0 0 0 3px transparent',
		focus: '0 0 0 3px rgba(66, 153, 225, 0.5)',
		'shadow-md': '0px 4px 4px rgba(0, 0, 0, 0.25)',
		'shadow-lg': '0px 4px 4px rgba(0, 0, 0, 0.25)',
	},
	colorScheme: {
		accent: '#C1FAA6', //neon green
		third: '#EDCBEF', // lilac
		secondary: '#001F3F',
	},
	textStyles: {
		h1: {
			// you can also use responsive styles
			fontSize: ['48px', '72px'],
			fontWeight: 'bold',
		},
		h2: {
			fontSize: ['32px', '48px'],
			fontWeight: 'bold',
		},
		h3: {
			fontSize: ['20px', '36px'],
			fontWeight: 'bold',
		},
		h6: {
			fontSize: ['8px', '10px'],
			fontWeight: 'bold',
		},
	},
	config: {
		initialColorMode: 'dark',
		useSystemColorMode: true,
	},
});
export default theme;
