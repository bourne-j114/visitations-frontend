<script>
	import { stores } from '@sapper/app';
	import VisitForm from '../VisitForm/index.svelte';

	const { session } = stores();

</script>

<div class="col-md-9">
	<div class="feed-toggle">
		<ul class="nav nav-pills outline-active">
			<li class="nav-item">
				ค้นหาผู้ต้องขัง
			</li>

		</ul>
	</div>

	<VisitForm/>
</div>