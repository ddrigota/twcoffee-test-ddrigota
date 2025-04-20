<script setup lang="ts" generic="TData, TValue">
import type { Table } from '@tanstack/vue-table';
import { Input } from '@/components/ui/input';
import { Checkbox } from '../ui/checkbox';
import ProductsProcuctsFiltersDatepicker from './procucts-filters-datepicker.vue';
import { Button } from '../ui/button';

const props = defineProps<{
	table: Table<TData>;
}>();

const resetFilters = () => {
	props.table.getColumn('name')?.setFilterValue(undefined);
	props.table.getColumn('category')?.setFilterValue(undefined);
	props.table.getColumn('status')?.setFilterValue(undefined);
	props.table.getColumn('date_created')?.setFilterValue(undefined);
};
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
			<div class="products-filters__checkboxes-item">
				<Checkbox
					id="inStock"
					aria-label="Только в наличии"
					@update:model-value="table.getColumn('status')?.setFilterValue($event ? 'inStock' : undefined)"
				/>
				<label for="inStock" class="products-filters__checkboxes-item-label">Только товары в наличии</label>
			</div>
			<div class="products-filters__checkboxes-item">
				<Checkbox
					id="coffee"
					aria-label="Кофе"
					@update:model-value="table.getColumn('category')?.setFilterValue($event ? 'кофе' : undefined)"
				/>
				<label for="coffee" class="products-filters__checkboxes-item-label">Кофе</label>
			</div>
			<div class="products-filters__checkboxes-item">
				<Checkbox
					id="tea"
					aria-label="Чай"
					@update:model-value="table.getColumn('category')?.setFilterValue($event ? 'чай' : undefined)"
				/>
				<label for="tea" class="products-filters__checkboxes-item-label">Чай</label>
			</div>
		</div>
		<ProductsProcuctsFiltersDatepicker :table="table" />
		<Button variant="destructive" @click="resetFilters">Сбросить</Button>
	</div>
</template>

<style scoped lang="scss">
.products-filters {
	display: flex;
	flex-wrap: wrap;
	gap: 1rem;
	margin-bottom: 1rem;

	&__search {
		flex: 1 1 200px;
		min-width: 150px;
	}

	&__checkboxes {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem 1rem;
		flex: 2 1 300px;

		&-item {
			display: flex;
			align-items: center;
			gap: 0.5rem;

			&:hover {
				.products-filters__checkboxes-item-label {
					color: var(--primary);
				}
			}
		}

		&-item-label {
			font-size: 0.875rem;
			font-weight: 500;
			color: var(--color-text-secondary);
			user-select: none;
			cursor: pointer;
			transition: color 0.2s ease-in-out;
		}
	}

	& > .datepicker,
	& > button {
		flex: 0 1 auto;
	}
}
</style>
