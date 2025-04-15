import { z } from 'zod';

export const credentialsSchema = z.object({
	username: z.string().email('Неверный формат email').min(1, 'Email обязателен'),
	password: z.string().min(1, 'Пароль обязателен'),
});

export const userSchema = z.object({
	name: z.string().min(1, 'Имя обязательно'),
	surname: z.string().min(1, 'Фамилия обязательна'),
	credentials: z.object({
		username: z.string().email('Неверный формат email'),
		passphrase: z.string().min(1, 'Пароль обязателен'),
	}),
	active: z.boolean(),
	created: z.string(),
});

export const dateRangeSchema = z
	.object({
		startDate: z.string().optional(),
		endDate: z.string().optional(),
	})
	.refine(
		(data) => {
			if (!data.startDate || !data.endDate) return true;
			return new Date(data.startDate) <= new Date(data.endDate);
		},
		{
			message: 'Дата начала не может быть позже даты окончания',
			path: ['startDate'],
		},
	);

export const productSchema = z.object({
	id: z.number(),
	status: z.enum(['inStock', 'outOfStock']),
	date_created: z.string(),
	name: z.string().min(1, 'Название обязательно'),
	category: z.string(),
	price: z.number().positive('Цена должна быть больше нуля'),
	description: z.string(),
});

export const tableFiltersSchema = z.object({
	dateRange: dateRangeSchema,
	selectedNames: z.array(z.string()),
	status: z.array(z.enum(['inStock', 'outOfStock'])),
});

export type Credentials = z.infer<typeof credentialsSchema>;
export type User = z.infer<typeof userSchema>;
export type Product = z.infer<typeof productSchema>;
export type TableFilters = z.infer<typeof tableFiltersSchema>;
export type DateRange = z.infer<typeof dateRangeSchema>;
