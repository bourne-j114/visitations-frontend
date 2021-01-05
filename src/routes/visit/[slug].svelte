<script context="module">
	import * as api from 'api.js';

	export async function preload({ params }) {
		const { slug } = params;
		const { visit } = await api.get(`visits/${slug}`, null);
		return { visit, slug };
	}
</script>

<script>
	import Visitor from './_Visitor.svelte';

	export let slug;
	export let visit;
</script>

<Visitor {visit} {slug}/>