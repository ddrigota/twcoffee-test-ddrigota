import { defineStore } from 'pinia';
import { navigateTo, useCookie } from '#imports';

interface UserSession {
	name: string;
	surname: string;
	username: string;
}

export const useAuthStore = defineStore('auth', {
	state: () => ({
		user: null as UserSession | null,
		isLoading: false,
		initialized: false,
	}),

	getters: {
		isAuthenticated: (state) => !!state.user,
		fullName: (state) => (state.user ? `${state.user.name} ${state.user.surname}` : ''),
	},

	actions: {
		init() {
			const session = useCookie<string | null>('session');
			if (session.value) {
				try {
					this.user = JSON.parse(session.value);
				} catch {
					this.user = null;
				}
			}
			this.initialized = true;
		},

		async logout() {
			this.isLoading = true;
			try {
				await $fetch('/api/logout', { method: 'POST' });
			} catch (error) {
				console.error('Ошибка при выходе из системы', error);
			} finally {
				this.user = null;
				this.isLoading = false;
				navigateTo('/login');
			}
		},
	},
});
