<script setup lang="ts">
import { Button } from '~/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';
import { computed } from 'vue';
import { Moon, Sun } from 'lucide-vue-next';

const colorMode = useColorMode();

const isDark = computed(() => colorMode.value === 'dark');
const isLight = computed(() => colorMode.value === 'light');
</script>

<template>
	<div class="theme-picker">
		<DropdownMenu c>
			<DropdownMenuTrigger as-child>
				<Button variant="outline" class="theme-picker__button" size="icon">
					<Moon
						icon="radix-icons:moon"
						class="theme-picker__icon theme-picker__icon--moon"
						:class="{ 'theme-picker__icon--hidden': !isDark }"
					/>
					<Sun class="theme-picker__icon theme-picker__icon--sun" :class="{ 'theme-picker__icon--hidden': !isLight }" />
					<span class="sr-only">Переключить тему</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuItem class="theme-picker__dropdown-item" @click="colorMode.preference = 'light'">
					Светлая
				</DropdownMenuItem>
				<DropdownMenuItem class="theme-picker__dropdown-item" @click="colorMode.preference = 'dark'">
					Темная
				</DropdownMenuItem>
				<DropdownMenuItem class="theme-picker__dropdown-item" @click="colorMode.preference = 'system'">
					Системная
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	</div>
</template>

<style scoped lang="scss">
.theme-picker {
	&__button {
		height: 2rem;
		width: 2rem;
		padding: 0.5rem;
		position: relative;

		&:hover {
			.theme-picker__icon {
				scale: 1.1;
			}
		}
	}

	&__icon {
		height: 1rem;
		width: 1rem;
		position: absolute;
		transition: all 0.3s ease-in-out;

		&--moon,
		&--sun {
			rotate: 0;
			scale: 1;
		}

		&--hidden {
			rotate: -90deg;
			scale: 0;
			opacity: 0;
		}
	}

	&__dropdown-item {
		padding: 0.5rem;
	}
}
</style>
