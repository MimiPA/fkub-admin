module.exports = {
    mode: 'jit',
    content: [
        './pages/**/*.{js,jsx,ts,html}',
        './src/components/**/*.{js,jsx,ts,html}',
        './src/views/**/*.{js,jsx,ts,html}',
        './styles/*.css',
    ],
    darkMode: 'media', // or false or 'class'
    theme: {
        fontFamily: {
            sans: ['Poppins', 'sans-serif'],
        },
        extend: {
            dropShadow: {
                card: '0 0 10px rgba(0, 0, 0, 0.17)',
                cardSubtitle: 'rgba(17, 17, 26, 0.1) 0px 0px 16px',
                profilePopover: '0 0 24px rgba(0, 0, 0, 0.13)',
                '2xl': '0px 4px 20px rgb(0 0 0 / 8%)',
            },
            colors: {
                danger: '#F03738',
                grey: '#f9f9fa',
                lightgrey: '#4F4F4F',
                darkgrey: '#797979',
                primary: {
                    light: '#FA8561',
                    DEFAULT: '#FF7900',
                },
                secondary: {
                    light: '#2F4389',
                    DEFAULT: '#182E7C',
                },
                error: {
                    DEFAULT: '#F03738',
                },
                success: {
                    DEFAULT: '#4FE34E',
                },

                "primary-yellow": "#F59E0B",
                "primary-green": "#20DF7F",
                "light-green": "#CFDCE5",
                "dark-green": "#296763",
            },
            padding: {
                15: '3.75rem',
            },
            margin: {
                100: '100px',
            },
            width: {
                '1/10': '10%',
                '2/10': '20%',
                '3/10': '30%',
                '4/10': '40%',
                '5/10': '50%',
                '6/10': '60%',
                '7/10': '70%',
                '8/10': '80%',
                '9/10': '90%',
                '5/12': '47.5%',
                '85': '85%',
                '170': '170px',
                '130': '130px',
                '250': '250px',
            },
            lineHeight: {
                1: '0.1em',
            },
            boxShadow: {
                'btn-google': '0px 4px 20px rgba(0, 0, 0, 0.12)',
                1: '0 4px 20px 0 rgba(0, 0, 0, 0.12)',
            },
            zIndex: {
                '-1': '-1',
            },
            borderWidth: {
                1: '1px',
            },
            borderRadius: {
                lg: '20px',
            },
            spacing: {
                18: '72px',
            },
            minHeight: {
                536: '536px',
            },
            textColor: {
                orange: '#F9533A',
                defaultGray: '#C2C9D1',
                darkGray: '#797979',
                defaultBlue: '#182E7C',
            },
            backgroundColor: {
                orange: '#F9533A',
                lightGray: 'rgba(255, 255, 255, 0.9)',
                'grey': 'rgba(0, 0, 0, 0.5)',
            },
            fontSize: {
                '2xs': '.625rem',
                '3xs': '.5rem',
            },
        },
    },
    variants: {
        extend: {
            opacity: ['disabled'],
        },
    },
    plugins: [],
};
