<script setup lang="ts">
import AppHeader from '~/components/header/app-header.vue';
import AppFooter from '~/components/footer/app-footer.vue';
</script>

<template>
	<div class="app-layout">
		<app-header />
		<main class="app-layout__content">
			<slot />
		</main>
		<app-footer />
	</div>
</template>

<style scoped lang="scss">
.app-layout {
	display: flex;
	flex-direction: column;
	min-height: 100dvh;

	&__content {
		flex: 1;
		height: 100%;
		display: grid;
		place-items: center;
		padding: 1rem;
	}
}
</style>
