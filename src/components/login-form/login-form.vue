<template>
	<div class="login-form">
		<h1 class="login-form__title">Вход в систему</h1>
		<form class="login-form__form" @submit.prevent="handleSubmit">
			<FormField v-slot="{ componentField }" name="username">
				<FormItem>
					<FormLabel>Email</FormLabel>
					<FormControl>
						<Input
							ref="usernameFieldRef"
							type="email"
							placeholder="username@example.com"
							v-bind="componentField"
							:aria-required="true"
						/>
					</FormControl>
					<FormMessage />
				</FormItem>
			</FormField>
			<FormField v-slot="{ componentField }" name="password">
				<FormItem>
					<FormLabel>Пароль</FormLabel>
					<FormControl>
						<Input
							ref="passwordFieldRef"
							type="password"
							autocomplete="current-password"
							placeholder="Введите пароль"
							v-bind="componentField"
							:aria-required="true"
						/>
					</FormControl>
					<FormMessage />
				</FormItem>
			</FormField>
			<Button type="submit" :disabled="isSubmitting || !isFormValid" class="login-form__submit">
				{{ isSubmitting ? 'Вход...' : 'Войти' }}
			</Button>
		</form>
	</div>
</template>

<script setup lang="ts">
import { useForm, configure, useIsSubmitting, useIsFormValid } from 'vee-validate';
import { ref } from 'vue';
import { Input } from '~/components/ui/input';
import { Button } from '~/components/ui/button';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '~/components/ui/form';
import { credentialsSchema, type Credentials } from '~/types';
import { toTypedSchema } from '@vee-validate/zod';
import { toast } from 'vue-sonner';
import type { LoginResult } from '~/types/server/api.types';

const formSchema = toTypedSchema(credentialsSchema);

const form = useForm({
	validationSchema: formSchema,
	validateOnMount: false,
	initialValues: {
		username: '',
		password: '',
	},
});

configure({
	validateOnBlur: true,
	validateOnChange: true,
});

const usernameFieldRef = ref<HTMLInputElement | null>(null);
const passwordFieldRef = ref<HTMLInputElement | null>(null);

const isSubmitting = useIsSubmitting();
const isFormValid = useIsFormValid();

const handleSubmit = form.handleSubmit(async (values: Credentials) => {
	const { data, error } = await useFetch<LoginResult>('/api/login', {
		method: 'POST',
		body: values,
	});

	if (error.value) {
		const errorMessage = error.value.data?.message || 'Ошибка при входе';
		toast.error(errorMessage);

		if (error.value.statusCode === 401 && errorMessage === 'Неверный пароль') {
			form.setFieldError('password', 'Неверный пароль');
			passwordFieldRef.value?.focus?.();
			return;
		}

		usernameFieldRef.value?.focus?.();
		return;
	}

	if (!data.value) {
		toast.error('Не удалось получить данные пользователя');
		return;
	}

	toast.success(`Добро пожаловать, ${data.value.name} ${data.value.surname}`);
});
</script>

<style scoped lang="scss">
.login-form {
	&__title {
		text-align: center;
		margin-bottom: 1rem;
		font-size: 1.5rem;
	}

	&__form {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	&__submit {
		margin-top: 1rem;
		cursor: pointer;
	}
}
</style>
