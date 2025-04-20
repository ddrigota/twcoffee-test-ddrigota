<template>
	<products-table :columns="columns" :data="products" />
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

<style scoped lang="scss"></style>
