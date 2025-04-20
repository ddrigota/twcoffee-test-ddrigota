<script setup lang="ts" generic="TData, TValue">
import type { ColumnDef, ColumnFiltersState } from '@tanstack/vue-table';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { FlexRender, getCoreRowModel, getFilteredRowModel, useVueTable } from '@tanstack/vue-table';
import { valueUpdater } from '../ui/table/utils';
import ProductsFilters from './products-filters.vue';

const props = defineProps<{
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
}>();

const columnFilters = ref<ColumnFiltersState>([]);

const table = useVueTable({
	get data() {
		return props.data;
	},
	get columns() {
		return props.columns;
	},
	getCoreRowModel: getCoreRowModel(),
	getFilteredRowModel: getFilteredRowModel(),
	onColumnFiltersChange: (updaterOrValue) => valueUpdater(updaterOrValue, columnFilters),
	state: {
		get columnFilters() {
			return columnFilters.value;
		},
	},
	enableFilters: true,
	enableColumnFilters: true,
});
</script>

<template>
	<div class="products">
		<ProductsFilters :table="table" />
		<div class="products__table">
			<Table>
				<TableHeader>
					<TableRow v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
						<TableHead v-for="header in headerGroup.headers" :key="header.id">
							<FlexRender
								v-if="!header.isPlaceholder"
								:render="header.column.columnDef.header"
								:props="header.getContext()"
							/>
						</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					<template v-if="table.getRowModel().rows?.length">
						<TableRow
							v-for="row in table.getRowModel().rows"
							:key="row.id"
							:data-state="row.getIsSelected() ? 'selected' : undefined"
						>
							<TableCell v-for="cell in row.getVisibleCells()" :key="cell.id">
								<FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()" />
							</TableCell>
						</TableRow>
					</template>
					<template v-else>
						<TableRow>
							<TableCell :colspan="props.columns.length" class="h-24 text-center"> Нет результатов. </TableCell>
						</TableRow>
					</template>
				</TableBody>
			</Table>
		</div>
	</div>
</template>

<style scoped lang="scss">
.products {
	display: flex;
	flex-direction: column;
	gap: 1rem;

	&__table {
		width: 80vw;
		height: 80vh;
	}
}
</style>
