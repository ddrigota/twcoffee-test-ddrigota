<script setup lang="ts">
import { Toaster } from '@/components/ui/sonner';
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
