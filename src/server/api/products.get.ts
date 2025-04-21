import { defineEventHandler, createError } from 'h3';
import { productSchema } from '~/types/schemas';
import productsData from '~/server/data/products.json';

export default defineEventHandler(async () => {
	try {
		const parseResult = productSchema.array().safeParse(productsData);

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
