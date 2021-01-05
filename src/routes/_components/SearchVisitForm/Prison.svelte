<script>
	import { post } from 'utils.js';
	export let prison;
	export let location;
	export let selected;
	export let visitors;
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
	async function submit(){
		prison_id = prison.prison_id;
		let visitor_name = selected;
		if (visitor_name === "") {
			alert("กรุณาเลือกผู้ขอเยี่ยมค่ะ!");
			return;
		}
		const response = await post(`visit/save`, { prison_id, visitor_name});
		//if (typeof response["error"] )
		if (typeof response["error"] !== undefined && response["error"] === 1 ) {
			alert("มีรายการขอเยี่ยมในสัปดาห์นี้แล้วค่ะ");
		}else{
			alert("บันทึกรายการขอเยี่ยมเรียบร้อยค่ะ");
		}
	}
</script>

<div class="article-preview">
	<div class="article-meta">
		<div class="info">
			ชื่อผู้ต้องขัง <strong>{prison.first_name} {prison.last_name}</strong>
			<hr>
			<div class="tag-list">
               จำคุก {prison.punish}
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

			<br/>
			ผู้ขอเยี่ยม
			<select bind:value={selected}>
				<option value="">เลือกผู้ขอเยี่ยม</option>
				{#each visitors as visitor }
					<option>{visitor.first_name} {visitor.last_name}</option>
				{/each}
			</select>
			<button class="btn btn-lg pull-xs-right btn-primary" type="button" on:click={submit}>
				บันทึก
			</button>
		</div>
	</div>
</div>