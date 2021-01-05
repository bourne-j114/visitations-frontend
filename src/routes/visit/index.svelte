<script context="module">
	export function preload({ params }, { user }) {

	}
</script>

<script>
	import Visitor from './_Visitor.svelte';
	let visit = { prison_id: 0, visit_date: '', round: 0};
</script>

<Visitor {visit}/>