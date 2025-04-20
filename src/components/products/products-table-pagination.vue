<script setup lang="ts">
import type { Table } from '@tanstack/vue-table';
import type { Product } from '~/types/schemas';

import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ChevronLeftIcon, ChevronRightIcon, ArrowLeftToLineIcon, ArrowRightToLineIcon } from 'lucide-vue-next';

interface DataTablePaginationProps {
	table: Table<Product>;
}
const props = defineProps<DataTablePaginationProps>();

const pageSize = ref<string>(`${props.table.getState().pagination.pageSize}`);

watch(pageSize, (newSize) => {
	props.table.setPageSize(Number(newSize));
});
</script>

<template>
	<div class="pagination">
		<div class="pagination__select">
			<p class="text-sm font-medium">Строк на странице</p>
			<Select v-model="pageSize">
				<SelectTrigger class="h-8 w-[70px]">
					<SelectValue :placeholder="pageSize" />
				</SelectTrigger>
				<SelectContent side="top" class="bg-background">
					<SelectItem v-for="size in [10, 20, 30]" :key="size" :value="`${size}`">
						{{ size }}
					</SelectItem>
				</SelectContent>
			</Select>
		</div>
		<div class="flex w-[100px] items-center justify-center text-sm font-medium">
			Страница {{ props.table.getState().pagination.pageIndex + 1 }} из
			{{ props.table.getPageCount() }}
		</div>
		<div class="flex items-center space-x-2">
			<Button
				variant="outline"
				class="hidden w-8 h-8 p-0 lg:flex"
				:disabled="!props.table.getCanPreviousPage()"
				@click="props.table.setPageIndex(0)"
			>
				<span class="sr-only">Go to first page</span>
				<ArrowLeftToLineIcon class="w-4 h-4" />
			</Button>
			<Button
				variant="outline"
				class="w-8 h-8 p-0"
				:disabled="!props.table.getCanPreviousPage()"
				@click="props.table.previousPage()"
			>
				<span class="sr-only">Go to previous page</span>
				<ChevronLeftIcon class="w-4 h-4" />
			</Button>
			<Button
				variant="outline"
				class="w-8 h-8 p-0"
				:disabled="!props.table.getCanNextPage()"
				@click="props.table.nextPage()"
			>
				<span class="sr-only">Go to next page</span>
				<ChevronRightIcon class="w-4 h-4" />
			</Button>
			<Button
				variant="outline"
				class="hidden w-8 h-8 p-0 lg:flex"
				:disabled="!props.table.getCanNextPage()"
				@click="props.table.setPageIndex(props.table.getPageCount() - 1)"
			>
				<span class="sr-only">Go to last page</span>
				<ArrowRightToLineIcon class="w-4 h-4" />
			</Button>
		</div>
	</div>
</template>

<style scoped lang="scss">
.pagination {
	width: 100%;
	display: grid;
	place-items: center;
	grid-template-columns: 1fr 1fr 1fr;
	align-items: center;
	justify-content: space-between;
	gap: 1rem;

	@media (max-width: 768px) {
		grid-template-columns: 1fr;
	}

	&__select {
		display: flex;
		align-items: center;
		gap: 1rem;
	}
}
</style>
