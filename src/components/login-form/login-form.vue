<template>
	<div class="login-form">
		<h1 class="login-form__title">Вход в систему</h1>
		<form class="login-form__form" @submit.prevent="onSubmit">
			<FormField v-slot="{ componentField }" name="username">
				<FormItem>
					<FormLabel>Email</FormLabel>
					<FormControl>
						<Input type="text" placeholder="username@example.com" v-bind="componentField" :aria-required="true" />
					</FormControl>
					<FormMessage />
				</FormItem>
			</FormField>
			<FormField v-slot="{ componentField }" name="password">
				<FormItem>
					<FormLabel>Пароль</FormLabel>
					<FormControl>
						<Input
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
import { Input } from '~/components/ui/input';
import { Button } from '~/components/ui/button';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '~/components/ui/form';
import { credentialsSchema } from '~/types';
import { toTypedSchema } from '@vee-validate/zod';
const formSchema = toTypedSchema(credentialsSchema);

const form = useForm({
	validationSchema: formSchema,
	validateOnMount: false,
	initialValues: {
		username: '',
		password: '',
	},
});

const isSubmitting = useIsSubmitting();
const isFormValid = useIsFormValid();

configure({
	validateOnBlur: true,
	validateOnChange: true,
});

const onSubmit = form.handleSubmit((values) => {
	console.log(values);
});
</script>

<style scoped lang="scss">
.login-form {
	&__title {
		text-align: center;
		margin-bottom: 1.5rem;
		font-size: 1.5rem;
	}

	&__form {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	&__submit {
		cursor: pointer;
	}
}
</style>
