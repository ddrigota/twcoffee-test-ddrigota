<script setup lang="ts">
import AppLogo from './app-logo.vue';
import ThemePicker from './theme-picker.vue';
import LogoutButton from './logout-button.vue';
import { useAuthStore } from '~/stores/auth';

const authStore = useAuthStore();
</script>

<template>
	<header class="app-header">
		<div class="app-header__container">
			<app-logo />
			<div class="app-header__actions">
				<theme-picker />
				<logout-button v-if="authStore.isAuthenticated" />
			</div>
		</div>
	</header>
</template>

<style scoped lang="scss">
.app-header {
	padding: 1rem;
	border-bottom: 1px solid var(--foreground);

	&__container {
		display: flex;
		justify-content: space-between;
		align-items: center;
		max-width: 1200px;
		margin: 0 auto;
	}

	&__actions {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}
}
</style>
