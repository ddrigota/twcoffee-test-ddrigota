import { defineNuxtRouteMiddleware, navigateTo } from '#imports';
import { useAuthStore } from '~/stores/auth';

export default defineNuxtRouteMiddleware((to) => {
	const authStore = useAuthStore();

	if (!authStore.initialized) {
		authStore.init();
	}

	if (!authStore.isAuthenticated && to.path !== '/login') {
		return navigateTo('/login');
	}

	if (authStore.isAuthenticated && to.path === '/login') {
		return navigateTo('/');
	}
});
