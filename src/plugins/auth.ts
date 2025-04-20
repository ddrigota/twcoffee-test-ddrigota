import { defineNuxtPlugin } from '#imports';
import { useAuthStore } from '~/stores/auth';

export default defineNuxtPlugin(async () => {
	const authStore = useAuthStore();
	authStore.init();
});
