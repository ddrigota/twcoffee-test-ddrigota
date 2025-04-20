import tailwindcss from '@tailwindcss/vite';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
				ssr: false,
				compatibilityDate: '2024-11-01',
				devtools: { enabled: false },
				modules: ['@nuxt/eslint', '@pinia/nuxt', '@nuxtjs/color-mode', 'shadcn-nuxt', '@vueuse/nuxt'],
				css: ['~/assets/css/main.scss', '~/assets/css/tailwind.css'],
				vite: {
								plugins: [tailwindcss()],
				},
				shadcn: {
								prefix: 'ui-',
								componentDir: './src/components/ui',
				},
				colorMode: {
								preference: 'system',
								storage: 'localStorage',
								storageKey: 'theme',
								fallback: 'light',
								classSuffix: '',
				},
				srcDir: 'src/',
				app: {
								head: {
												title: 'TW Coffee',
												meta: [{ name: 'Тестовое задание на фронтенд разработчика', content: 'TW Coffee' }],
								},
				},
});