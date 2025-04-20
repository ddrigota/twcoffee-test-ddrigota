import { defineEventHandler, readBody, createError } from 'h3';
import { promises as fs } from 'fs';
import { resolve } from 'path';
import { createHash } from 'crypto';
import type { User } from '~/types';

export default defineEventHandler(async (event) => {
	const { username, password } = await readBody(event);
	if (!username || !password) {
		throw createError({
			statusCode: 400,
			message: 'Имя пользователя и пароль обязательны',
		});
	}

	const filePath = resolve(process.cwd(), 'src/server/data/users.json');
	const data = await fs.readFile(filePath, 'utf-8');
	const users = JSON.parse(data) as User[];

	const user = users.find((u) => u.credentials.username === username);
	if (!user || !user.active) {
		throw createError({
			statusCode: 401,
			message: 'Неверное имя пользователя или пользователь не активен',
		});
	}
	const hash = createHash('md5').update(password).digest('hex');
	if (hash !== user.credentials.passphrase) {
		throw createError({
			statusCode: 401,
			message: 'Неверный пароль',
		});
	}

	return { success: true, name: user.name, surname: user.surname };
});
