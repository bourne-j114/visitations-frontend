<script>
	import {stores} from '@sapper/app';
	import Prison from './Prison.svelte';
	import VisitorPreview from './VisitorPreview.svelte';
	import QuickSearchBar from "svelte-quicksearch-bar";
	import * as api from 'api.js';

	export const  username = false;

	const { session } = stores();

	const onPick = e => {
		selectedOption = e.detail;
		prison_id = selectedOption['prison_id'];
		submit();
	}
	let options = [];

	let selectedOption;

	let query;
	let prison;
	let visitors;
	let prison_id = '';
	let location = '';
	async function submit(event) {
		query = `prisons/get/${prison_id}`;
		({prison, visitors} = await api.get(query, $session.user && $session.user.token));
		location = prison.location;
	}
	$: getData();
	async function getData() {
		options = [];
		query = `prisons/list`;
		(options  = await api.get(query, $session.user && $session.user.token));
	}
</script>
<div class="auth-page">
	<div class="container page">
		<div class="row">
			<div class="col-md-6 offset-md-3 col-xs-12">
				<QuickSearchBar {options} on:pick={onPick} keys={['prison_id', 'full_name']} />

				<p>กด CTRL + K เพื่อค้นหาผู้ตัองขัง)</p>
				<form on:submit|preventDefault={submit}>
					<input type="text" required placeholder="รหัสผู้ต้องขัง" bind:value={prison_id}>
					<button  type="submit">
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
		<hr>
		<VisitorPreview {visitors} user={$session.user}/>
	{:else}
		<div>
			<div >ไม่พบข้อมูลผู้ต้องขัง..</div>
		</div>
	{/if}
{:else}
	<div class="article-preview">Loading...</div>
{/if}