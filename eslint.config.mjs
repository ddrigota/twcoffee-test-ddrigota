// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs';

export default withNuxt({
	files: ['src/layouts/*.vue', 'src/pages/**/*.vue'],
	rules: {
		'vue/multi-word-component-names': 'off',
	},
});
