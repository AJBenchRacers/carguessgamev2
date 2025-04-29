
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// Custom automotive-themed colors
				'car-blue': '#2C3E50',
				'car-silver': '#BDC3C7',
				'car-red': '#E74C3C',
				'car-green': '#27AE60',
				'car-yellow': '#F39C12',
				'car-gray': '#95A5A6',
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'fade-in': {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' }
				},
				'slide-up': {
					'0%': { transform: 'translateY(10px)', opacity: '0' },
					'100%': { transform: 'translateY(0)', opacity: '1' }
				},
				'bounce-in': {
					'0%': { transform: 'scale(0.8)', opacity: '0' },
					'70%': { transform: 'scale(1.05)', opacity: '0.7' },
					'100%': { transform: 'scale(1)', opacity: '1' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.5s ease-out',
				'slide-up': 'slide-up 0.5s ease-out',
				'bounce-in': 'bounce-in 0.5s ease-out'
			},
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'car-pattern': "url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMtMS4zNiAwLTIuNTYuMjItMy42MS42LS44NC4zMi0xLjUxLjc0LTIuMDkgMS4yNi0uNTguNTEtMS4wMSAxLjA3LTEuMzMgMS42Ny0uMzIuNTktLjUgMS4xOC0uNSAxLjc2IDAgLjU4LjE4IDEuMTcuNSAxLjc2LjMyLjU5Ljc1IDEuMTUgMS4zMyAxLjY3LjU4LjUxIDEuMjUuOTQgMi4wOSAxLjI1IDEuMDUuNCAyLjI1LjYgMy42MS42czIuNTYtLjIyIDMuNjEtLjZjLjg0LS4zMiAxLjUxLS43NCAyLjA5LTEuMjYuNTgtLjUxIDEuMDEtMS4wNyAxLjMzLTEuNjcuMzItLjU5LjUtMS4xOC41LTEuNzYgMC0uNTgtLjE4LTEuMTctLjUtMS43Ni0uMzItLjU5LS43NS0xLjE1LTEuMzMtMS42Ny0uNTgtLjUxLTEuMjUtLjk0LTIuMDktMS4yNS0xLjA1LS4zOC0yLjI1LS42LTMuNjEtLjZ6IiBzdHJva2U9InJnYmEoMCwwLDAsMC4wMikiIGZpbGw9InJnYmEoMCwwLDAsMC4wNCkiLz48cGF0aCBkPSJNMjQgMzBjLS42OCAwLTEuMjguMTEtMS44LjMtLjQyLjE2LS43Ni4zNy0xLjA0LjYzLS4zLjI2LS41LjUzLS42Ny44My0uMTYuMy0uMjUuNTktLjI1Ljg4IDAgLjI5LjEuNTkuMjUuODguMTYuMy4zOC41OC42Ny44My4yOC4yNi42Mi40NyAxLjA0LjYzLjUyLjIgMS4xMi4zIDEuOC4zLjY4IDAgMS4yOC0uMSAxLjgtLjMuNDItLjE2Ljc2LS4zNyAxLjA0LS42My4yOC0uMjYuNS0uNTMuNjctLjgzLjE2LS4zLjI1LS41OS4yNS0uODggMC0uMjktLjEtLjU5LS4yNS0uODgtLjE2LS4zLS4zOC0uNTgtLjY3LS44My0uMjgtLjI2LS42Mi0uNDctMS4wNS0uNjMtLjUxLS4xOS0xLjExLS4zLTEuNzktLjN6TTE4IDE4Yy0uNjggMC0xLjI4LjExLTEuOC4zLS40Mi4xNi0uNzYuMzctMS4wNC42My0uMy4yNi0uNS41My0uNjcuODMtLjE2LjMtLjI1LjU5LS4yNS44OCAwIC4yOS4xLjU5LjI1Ljg4LjE2LjMuMzguNTguNjcuODMuMjguMjYuNjIuNDcgMS4wNC42My41Mi4yIDEuMTIuMyAxLjguMy42OCAwIDEuMjgtLjEgMS44LS4zLjQyLS4xNi43Ni0uMzcgMS4wNC0uNjMuMjgtLjI2LjUtLjUzLjY3LS44My4xNi0uMy4yNS0uNTkuMjUtLjg4IDAtLjI5LS4xLS41OS0uMjUtLjg4LS4xNi0uMy0uMzgtLjU4LS42Ny0uODMtLjI4LS4yNi0uNjItLjQ3LTEuMDUtLjYzLS41MS0uMTktMS4xMS0uMy0xLjc5LS4zeiIgc3Ryb2tlPSJyZ2JhKDAsMCwwLDAuMDIpIiBmaWxsPSJyZ2JhKDAsMCwwLDAuMDQpIi8+PC9nPjwvc3ZnPg==')"
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
