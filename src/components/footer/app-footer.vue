<script setup lang="ts">
import { Coffee } from 'lucide-vue-next';
</script>

<template>
	<footer class="app-footer">
		<p class="app-footer__text">
			Made with
			<span class="app-footer__coffee"><Coffee /></span>
			by
			<a href="https://github.com/ddrigota" target="_blank" rel="noopener noreferrer">ddrigota</a>
			{{ new Date().getFullYear() }}
		</p>
	</footer>
</template>

<style scoped lang="scss">
.app-footer {
	background-color: var(--background);
	color: var(--muted-foreground);
	padding: 1rem;

	&__text {
		text-align: center;
		font-size: 0.8rem;
	}

	&__coffee {
		display: inline-block;
		width: 1rem;
		height: 1rem;
		margin: 0 0.25rem;
	}
}
</style>
