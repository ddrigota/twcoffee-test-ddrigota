import type { ColumnDef } from '@tanstack/vue-table';
import { h } from 'vue';
import type { Product } from '~/types/schemas';

export const columns: ColumnDef<Product>[] = [
	{
		accessorKey: 'id',
		header: () => h('div', { class: 'text-center' }, 'ID'),
		cell: ({ row }) => {
			const id = row.getValue('id') as number;
			return h('div', { class: 'text-center font-medium' }, id);
		},
	},
	{
		accessorKey: 'name',
		header: () => h('div', 'Название'),
		cell: ({ row }) => {
			const name = row.getValue('name') as string;
			return h('div', name);
		},
	},
	{
		accessorKey: 'category',
		header: () => h('div', { class: 'text-center' }, 'Категория'),
		cell: ({ row }) => {
			const category = row.getValue('category') as string;
			return h('div', { class: 'text-center font-medium' }, category);
		},
	},

	{
		accessorKey: 'status',
		header: () => h('div', { class: 'text-center' }, 'Статус'),
		cell: ({ row }) => {
			const status = row.getValue('status') as 'inStock' | 'outOfStock';

			return h(
				'div',
				{ class: 'text-center font-medium' },
				h(
					'span',
					{
						class: `px-2 py-1 rounded-full text-xs font-medium ${
							status === 'inStock'
								? 'bg-green-100 text-green-800 dark:bg-green-800/20 dark:text-green-400'
								: 'bg-destructive text-destructive-foreground '
						}`,
					},
					status === 'inStock' ? 'В наличии' : 'Нет в наличии',
				),
			);
		},
		filterFn: 'equals',
	},
	{
		accessorKey: 'date_created',
		header: () => h('div', { class: 'text-center' }, 'Дата поступления'),
		cell: ({ row }) => {
			const dateCreated = row.getValue('date_created') as string;
			const formattedDate = new Date(dateCreated).toLocaleDateString('ru-RU', {
				year: 'numeric',
				month: 'long',
				day: 'numeric',
			});

			return h('div', { class: 'text-center font-medium' }, formattedDate);
		},
	},
	{
		accessorKey: 'price',
		header: () => h('div', { class: 'text-right' }, 'Цена'),
		cell: ({ row }) => {
			const price = row.getValue('price') as number;
			const formattedPrice = new Intl.NumberFormat('ru-RU', {
				style: 'currency',
				currency: 'RUB',
			}).format(price);

			return h('div', { class: 'text-right font-medium' }, formattedPrice);
		},
	},
];
