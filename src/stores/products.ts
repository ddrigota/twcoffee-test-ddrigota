import { toast } from 'vue-sonner';
import type { Product } from '~/types/schemas';
import type { ProductsResponse } from '~/types/server/api.types';

const useProductsStore = defineStore('products', {
	state: () => ({
		products: [] as Product[],
		error: null as string | null,
		loading: false,
	}),

	actions: {
		async fetchProducts() {
			this.error = null;

			try {
				const { data, error } = await useFetch<ProductsResponse>('/api/products');

				if (error.value) {
					const errorMessage = error.value.statusMessage || 'Ошибка при получении продуктов';
					toast.error(errorMessage);
					this.error = errorMessage;
					return;
				}

				this.products = data.value?.products || [];
				// eslint-disable-next-line @typescript-eslint/no-unused-vars
			} catch (e) {
				toast.error('Произошла ошибка при получении данных');
				this.error = 'Произошла ошибка при получении данных';
			} finally {
				this.loading = false;
			}
		},
	},
});

export default useProductsStore;
