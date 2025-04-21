import { defineEventHandler, createError } from 'h3';
import { promises as fs } from 'fs';
import { resolve } from 'path';
import { productSchema } from '~/types/schemas';

export default defineEventHandler(async () => {
	try {
		const filePath = resolve(process.cwd(), 'src/server/data/products.json');
		const data = await fs.readFile(filePath, 'utf-8');
		const rawProducts = JSON.parse(data);

		const parseResult = productSchema.array().safeParse(rawProducts);

		if (!parseResult.success) {
			console.error('Ошибка валидации продуктов:', parseResult.error);
			throw createError({
				statusCode: 500,
				message: 'Ошибка в структуре данных продуктов',
			});
		}

		const products = parseResult.data;

		return {
			products,
			total: products.length,
		};
	} catch (error) {
		console.error('Ошибка при чтении продуктов:', error);
		throw createError({
			statusCode: 500,
			message: 'Не удалось загрузить продукты',
		});
	}
});
