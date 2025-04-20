<script setup lang="ts" generic="TData, TValue">
import type { Table } from '@tanstack/vue-table';
import { Input } from '@/components/ui/input';
import { Checkbox } from '../ui/checkbox';

defineProps<{
	table: Table<TData>;
}>();
</script>

<template>
	<div class="products-filters">
		<Input
			class="products-filters__search"
			placeholder="Поиск по названию"
			:model-value="table.getColumn('name')?.getFilterValue() as string"
			@update:model-value="table.getColumn('name')?.setFilterValue($event)"
		/>
		<div class="products-filters__checkboxes">
			<Checkbox
				id="inStock"
				aria-label="Только в наличии"
				@update:model-value="table.getColumn('status')?.setFilterValue($event ? 'inStock' : undefined)"
			/>
			<label for="inStock">В наличии</label>
		</div>
	</div>
</template>

<style scoped lang="scss">
.products-filters {
	display: flex;
	flex-direction: column;
	gap: 1rem;
	margin-bottom: 1rem;

	&__search {
		max-width: 300px;
	}

	&__checkboxes {
		display: flex;
		flex-direction: row;
		gap: 0.5rem;
	}
}
</style>
