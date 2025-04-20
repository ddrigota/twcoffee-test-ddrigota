import { defineStore } from 'pinia';
import { navigateTo, useFetch } from '#imports';
import type { MeResponse, UserSession } from '~/types/server/api.types';
import type { Credentials } from '~/types/schemas';

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
		async init() {
			if (this.initialized) return;
			this.isLoading = true;

			try {
				const { data } = await useFetch<MeResponse>('/api/me', {
					ignoreResponseError: true,
				});

				if (data.value?.user) {
					this.user = data.value.user;
				}
				// eslint-disable-next-line @typescript-eslint/no-unused-vars
			} catch (_error) {
				this.user = null;
			} finally {
				this.initialized = true;
				this.isLoading = false;
			}
		},

		async login(credentials: Credentials) {
			this.isLoading = true;
			try {
				const { user } = (await $fetch('/api/login', {
					method: 'POST',
					body: credentials,
				})) as { user: UserSession };

				this.user = user;
				navigateTo('/');
			} catch (error) {
				console.error('Login error', error);
				throw error;
			} finally {
				this.isLoading = false;
			}
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
