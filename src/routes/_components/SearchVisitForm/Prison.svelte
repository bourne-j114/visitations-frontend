<script>
	import { post } from 'utils.js';
	export let prison;
	export let location;
	let prison_id = "";
	let locations = [
		'พบ.',
		'1',
		'2',
		'หญิง',
	]
	async function saveLocation(){
		prison_id = prison.prison_id;
		const response = await post(`prison/update`, { prison_id, location});
    }
</script>

<div class="article-preview">
	<div class="article-meta">
		<div class="info">
			ชื่อผู้ต้องขัง
			<hr>
			<div class="tag-list">
			{prison.first_name} {prison.last_name}
				<br/>จำคุก {prison.punish}
				<br/>แดน

				<select bind:value={location} on:change|preventDefault="{saveLocation}">
					{#each locations as location }
						<option>{location}</option>
					{/each}
				</select> <span>คลิ๊กเปลี่ยนแดน</span>
				<br/>
				โทษ {prison.case_detail}
			</div>

			<span class="date">
				วันที่เข้า {new Date(prison.jail_date).toDateString()}
			</span>
		</div>
	</div>
</div>