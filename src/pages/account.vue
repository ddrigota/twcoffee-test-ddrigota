<template>
	<div class="account">
		<products-table :columns="columns" :data="products" />
	</div>
</template>

<script setup lang="ts">
import ProductsTable from '~/components/products/products-table.vue';
import { columns } from '~/components/products/columns';
import useProductsStore from '~/stores/products';

const productsStore = useProductsStore();

onMounted(async () => {
	await productsStore.fetchProducts();
});

const products = computed(() => productsStore.products);
</script>

<style scoped lang="scss">
.account {
	display: flex;
	flex-direction: column;
	gap: 1rem;
	width: 100%;
	height: 100%;
	max-width: 1200px;
	margin: 0 auto;
}
</style>
