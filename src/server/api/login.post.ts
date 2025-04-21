import { defineEventHandler, readBody, createError, setCookie, H3Error } from 'h3';
import { createHash } from 'crypto';
import { credentialsSchema, userSchema } from '~/types/schemas';
import usersData from '~/server/data/users.json';

export default defineEventHandler(async (event) => {
	try {
		const body = await readBody(event);

		const parseResult = credentialsSchema.safeParse(body);
		if (!parseResult.success) {
			throw createError({
				statusCode: 400,
				message: 'Некорректные данные для входа',
			});
		}

		const { username, password } = parseResult.data;

		const usersResult = userSchema.array().safeParse(usersData);
		if (!usersResult.success) {
			console.error('Ошибка валидации данных пользователей:', usersResult.error);
			throw createError({
				statusCode: 500,
				message: 'Ошибка в структуре данных пользователей',
			});
		}

		const users = usersResult.data;
		const user = users.find((u) => u.credentials.username === username);

		if (!user) {
			throw createError({
				statusCode: 401,
				message: 'Неверное имя пользователя',
			});
		}

		if (!user.active) {
			throw createError({
				statusCode: 403,
				message: 'Пользователь не активен',
			});
		}

		const hash = createHash('md5').update(password).digest('hex');
		if (hash !== user.credentials.passphrase) {
			throw createError({
				statusCode: 401,
				message: 'Неверный пароль',
			});
		}

		setCookie(
			event,
			'session',
			JSON.stringify({
				name: user.name,
				surname: user.surname,
				username,
			}),
			{
				httpOnly: true,
				sameSite: 'lax',
				path: '/',
				maxAge: 60 * 60 * 24,
			},
		);

		return {
			user: {
				name: user.name,
				surname: user.surname,
				username,
			},
		};
	} catch (error) {
		if (error instanceof H3Error && error.statusCode) throw error;
		console.error('Ошибка при аутентификации:', error);
		throw createError({
			statusCode: 500,
			message: 'Внутренняя ошибка сервера',
		});
	}
});
