<template>
	<div class="app-login">
		<Card class="app-login__card">
			<LoginForm />
		</Card>
	</div>
</template>

<script setup lang="ts">
import LoginForm from '~/components/login-form/login-form.vue';
import { Card } from '~/components/ui/card';

useHead({
	title: 'Вход в систему',
});

definePageMeta({
	layout: 'default',
});
</script>

<style scoped lang="scss">
.app-login {
	&__card {
		width: 40rem;
		padding: 2rem;
	}
}
</style>
