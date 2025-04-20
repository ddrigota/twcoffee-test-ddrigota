import { defineNuxtRouteMiddleware, navigateTo } from '#imports';
import { useAuthStore } from '~/stores/auth';

export default defineNuxtRouteMiddleware(async (to) => {
	const authStore = useAuthStore();

	if (!authStore.initialized) {
		await authStore.init();
	}

	if (!authStore.isAuthenticated && to.path !== '/login') {
		return navigateTo('/login');
	}

	if (authStore.isAuthenticated && to.path === '/login') {
		return navigateTo('/account');
	}
});
