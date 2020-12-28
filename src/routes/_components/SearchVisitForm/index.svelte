<script>
	import {stores} from '@sapper/app';
	import Prison from './Prison.svelte';
	import VisitorPreview from './VisitorPreview.svelte';
	import * as api from 'api.js';

	export const  username = false;

	const { session } = stores();

	let query;
	let prison;
	let visitors;
	let prison_id = '';
	let location = '';
	async function submit(event) {
		query = `prisons/get/${prison_id}`;
		({prison, visitors} = await api.get(query, $session.user && $session.user.token));
		selected = prison.location;
	}
</script>
<div class="auth-page">
	<div class="container page">
		<div class="row">
			<div class="col-md-6 offset-md-3 col-xs-12">
				<form on:submit|preventDefault={submit}>
					<fieldset class="form-group">
						<input class="form-control form-control-lg" type="text" required placeholder="รหัสผู้ต้องขัง" bind:value={prison_id}>
					</fieldset>
					<button class="btn btn-lg btn-primary pull-xs-right" type="submit">
						ตกลง
					</button>
				</form>
			</div>
		</div>
	</div>
</div>
{#if prison}

	{#if prison.first_name !== null}
		<Prison {prison} user={$session.user} bind:location/>
		<VisitorPreview {visitors} user={$session.user}/>
	{:else}
		<div>
			<div >ไม่พบข้อมูลผู้ต้องขัง..</div>
		</div>
	{/if}
{:else}
	<div class="article-preview">Loading...</div>
{/if}