<script setup lang="ts" generic="TData, TValue">
import type { ColumnDef, ColumnFiltersState, VisibilityState } from '@tanstack/vue-table';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { FlexRender, getCoreRowModel, getFilteredRowModel, useVueTable } from '@tanstack/vue-table';
import { valueUpdater } from '../ui/table/utils';
import ProductsFilters from './products-filters.vue';
import { useMediaQuery } from '@vueuse/core';

const props = defineProps<{
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
}>();

const columnFilters = ref<ColumnFiltersState>([]);
const columnVisibility = ref<VisibilityState>({});
const isMobile = useMediaQuery('(max-width: 768px)');

const mobileVisibleColumns = ['name', 'status', 'price'];

watch(
	isMobile,
	(mobile) => {
		if (mobile) {
			const newVisibility: VisibilityState = {};

			props.columns.forEach((column) => {
				// @ts-expect-error - баг типизации, accessorKey существует в рантайме
				const columnId = String(column.id || column.accessorKey);
				newVisibility[columnId] = mobileVisibleColumns.includes(columnId);
			});

			columnVisibility.value = newVisibility;
		} else {
			columnVisibility.value = {};
		}
	},
	{ immediate: true },
);

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
	onColumnVisibilityChange: (updaterOrValue) => valueUpdater(updaterOrValue, columnVisibility),
	state: {
		get columnFilters() {
			return columnFilters.value;
		},
		get columnVisibility() {
			return columnVisibility.value;
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
							<TableCell v-for="cell in row.getVisibleCells()" :key="cell.id" :class="isMobile ? 'text-xs' : ''">
								<FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()" />
							</TableCell>
						</TableRow>
					</template>
					<template v-else>
						<TableRow>
							<TableCell :colspan="table.getVisibleFlatColumns().length" class="h-24 text-center">
								Нет результатов.
							</TableCell>
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
	flex: 1;

	&__table {
		width: 100%;
		height: 100%;
		overflow-x: auto;
	}
}
</style>
