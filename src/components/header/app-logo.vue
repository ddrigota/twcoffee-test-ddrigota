<script setup lang="ts">
import logo from '~/assets/images/tw-logo.png';

const colorMode = useColorMode();
</script>

<template>
	<div class="app-logo">
		<img
			:src="logo"
			alt="tw coffee logo"
			class="app-logo__image"
			:class="{ 'app-logo__image--dark': colorMode.value === 'dark' }"
		>
	</div>
</template>

<style scoped lang="scss">
.app-logo {
	width: 8rem;
	height: 100%;

	&__image {
		width: 100%;
		height: 100%;
		object-fit: contain;

		&--dark {
			filter: invert(1) brightness(1.1);
		}
	}
}
</style>
