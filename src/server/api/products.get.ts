import { defineEventHandler } from 'h3';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import type { Product } from '~/types/schemas';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataPath = path.resolve(__dirname, '../data/products.json');

export default defineEventHandler(async () => {
	try {
		const rawData = fs.readFileSync(dataPath, 'utf8');
		const products: Product[] = JSON.parse(rawData);

		return {
			products,
			total: products.length,
		};
	} catch (error) {
		console.error('Ошибка при чтении продуктов:', error);
		return {
			products: [],
			total: 0,
			error: 'Не удалось загрузить продукты',
		};
	}
});
