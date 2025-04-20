<script setup lang="ts" generic="TData, TValue">
import type { DateRange } from 'reka-ui';
import type { Table } from '@tanstack/vue-table';

import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { RangeCalendar } from '@/components/ui/range-calendar';
import { DateFormatter, getLocalTimeZone } from '@internationalized/date';
import { CalendarIcon } from 'lucide-vue-next';
import { type Ref, ref, watch } from 'vue';
import { cn } from '@/lib/utils';

const props = defineProps<{
	table: Table<TData>;
}>();

const df = new DateFormatter('ru-RU', {
	dateStyle: 'medium',
});

const value = ref(null) as Ref<DateRange | null>;

watch(
	value,
	(newValue) => {
		if (newValue?.start && newValue?.end) {
			const startDate = newValue.start.toDate(getLocalTimeZone()).toISOString();
			const endDate = newValue.end.toDate(getLocalTimeZone()).toISOString();

			props.table.getColumn('date_created')?.setFilterValue({
				start: startDate,
				end: endDate,
			});
		} else {
			props.table.getColumn('date_created')?.setFilterValue(undefined);
		}
	},
	{ deep: true },
);

const clearDateFilter = () => {
	value.value = null;
	props.table.getColumn('date_created')?.setFilterValue(undefined);
};
</script>

<template>
	<div class="date-range-filter">
		<Popover>
			<PopoverTrigger as-child class>
				<Button
					variant="outline"
					:class="cn('w-fit justify-start text-left font-normal border-input', !value && 'text-muted-foreground')"
				>
					<CalendarIcon class="mr-2 h-4 w-4" />
					<template v-if="value?.start">
						<template v-if="value.end">
							<span class="text-xs"
								>{{ df.format(value.start.toDate(getLocalTimeZone())) }} -
								{{ df.format(value.end.toDate(getLocalTimeZone())) }}</span
							>
						</template>
						<template v-else>
							{{ df.format(value.start.toDate(getLocalTimeZone())) }}
						</template>
					</template>
					<template v-else>
						<span class="text-sm">Дата поступления</span>
					</template>
				</Button>
			</PopoverTrigger>
			<PopoverContent class="w-auto p-0 bg-background">
				<div class="p-2">
					<RangeCalendar v-model="value" initial-focus :number-of-months="1" />
					<div class="mt-2 flex justify-end">
						<Button variant="outline" size="sm" @click="clearDateFilter">Очистить</Button>
					</div>
				</div>
			</PopoverContent>
		</Popover>
	</div>
</template>
