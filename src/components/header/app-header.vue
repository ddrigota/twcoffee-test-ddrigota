<script setup lang="ts">
import AppLogo from './app-logo.vue';
import ThemePicker from './theme-picker.vue';
</script>

<template>
	<header class="app-header">
		<div class="app-header__container">
			<app-logo />
			<theme-picker />
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
}
</style>
