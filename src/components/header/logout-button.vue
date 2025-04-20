<script setup lang="ts">
import { Button } from '~/components/ui/button';
import { LogOut } from 'lucide-vue-next';
import { useAuthStore } from '~/stores/auth';

const authStore = useAuthStore();

const handleLogout = () => {
	authStore.logout();
};
</script>

<template>
	<div class="logout-button">
		<Button
			variant="outline"
			size="icon"
			tabindex="0"
			aria-label="Выйти из системы"
			:disabled="authStore.isLoading"
			class="logout-button__button"
			@click="handleLogout"
			@keydown.enter="handleLogout"
		>
			<LogOut class="logout-button__icon" :class="{ 'logout-button__icon--loading': authStore.isLoading }" />
			<span class="sr-only">Выйти</span>
		</Button>
	</div>
</template>

<style scoped lang="scss">
.logout-button {
	&__button {
		height: 2rem;
		width: 2rem;
		padding: 0.5rem;
		position: relative;

		&:hover {
			.logout-button__icon {
				scale: 1.1;
			}
		}
	}

	&__icon {
		height: 1rem;
		width: 1rem;
		transition: all 0.3s ease-in-out;

		&--loading {
			opacity: 0.5;
		}
	}
}
</style>
