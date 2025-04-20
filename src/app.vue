<script setup lang="ts">
import { Toaster } from '@/components/ui/sonner';
import { onMounted } from 'vue';
import { useAuthStore } from '~/stores/auth';

const authStore = useAuthStore();

onMounted(() => {
	authStore.init();
});
</script>

<template>
	<div class="main">
		<NuxtLayout>
			<NuxtPage />
		</NuxtLayout>
		<ClientOnly>
			<Toaster />
		</ClientOnly>
	</div>
</template>

<style>
.main {
	min-height: 100dvh;
}
</style>
