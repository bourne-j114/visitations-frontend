<script>
	import {stores} from '@sapper/app';
	import Form from "./Form.svelte";
	import * as api from 'api.js';

</script>
<div class="auth-page">
	<div class="container page">
		<div class="row">
			<div class="col-md-6 offset-md-3 col-xs-12">
				<Form />
			</div>
		</div>
	</div>
</div>
{#if prison}

	{#if prison.first_name !== null}
		<hr>
	{:else}
		<div>
			<div >ไม่พบข้อมูลผู้ต้องขัง..</div>
		</div>
	{/if}
{:else}
	<div class="article-preview">Loading...</div>
{/if}