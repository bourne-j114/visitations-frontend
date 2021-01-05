<script>
	import { goto, stores } from '@sapper/app';
	import ListErrors from '../_components/ListErrors.svelte';
	import * as api from 'api.js';

	export let visit;
	export let slug;

	let errors;

	const { session } = stores();

	async function submit() {
		await api.post(`visits/save`, { visit }, $session.user && $session.user.token);
	}

	function enter(node, callback) {
		function onkeydown(event) {
			if (event.which === 13) callback(node);
		}

		node.addEventListener('keydown', onkeydown);

		return {
			destroy() {
				node.removeEventListener('keydown', onkeydown);
			}
		};
	}
</script>

<div class="editor-page">
	<div class="container page">
		<div class="row">
			<div class="col-md-10 offset-md-1 col-xs-12">
				<ListErrors {errors}/>

				<form>
					<fieldset>
						<fieldset class="form-group">
							<input class="form-control form-control-lg" type="text" placeholder="รหัสผู้ต้องขัง" bind:value={visit.prison_id}>
						</fieldset>

						<fieldset class="form-group">
							<input class="form-control" type="text" placeholder="วันที่เยี่ยม" bind:value={visit.visit_date}>
						</fieldset>
						<fieldset class="form-group">
							<input class="form-control" type="text" placeholder="รอบที่" bind:value={visit.round}>
						</fieldset>

						<button class="btn btn-lg pull-xs-right btn-primary" type="button" on:click={submit}>
							Publish Article
						</button>
					</fieldset>
				</form>
			</div>
		</div>
	</div>
</div>