<script>
	import { post } from 'utils.js';
	export let prison;
	export let gender;
	export let status;
	export let selected;
	export let visitors;
	export let start_receive_date;
	export let end_receive_date;
	export let start_release_date;
	export let end_release_date;
	let allow = 1;
	let prison_id = "";

	async function submit(){
		prison_id = prison.prison_id;
		let visitor_name = selected;
		if (visitor_name === "") {
			alert("กรุณาเลือกผู้ขอเยี่ยมค่ะ!");
			return;
		}
		const response = await post(`visit/save`, { prison_id, visitor_name ,allow});
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
			สถานะ:
			<label>
				<input name="status" value="1" type=radio bind:group={status} >
				อยู่
			</label>
			<label>
				<input name="allow" value="0" type=radio bind:group={status}  >
				ไม่อยู่
			</label>
			เพศ:
			<label>
				<input name="status" value="m" type=radio bind:group={gender} >
				ชาย
			</label>
			<label>
				<input name="allow" value="f" type=radio bind:group={gender}  >
				หญิง
			</label>
			<fieldset class="form-group">
			รับตัว วันที่:	<input type="date" value={start_receive_date}> - <input type="date" value={end_receive_date}>
			</fieldset>

			<fieldset class="form-group">
				ปล่อยตัว วันที่: <input type="date" value={start_release_date}> - <input type="date" value={end_release_date}>
			</fieldset>


			<button class="btn btn-lg pull-xs-right btn-primary" type="button" on:click={submit}>
				ตกลง
			</button>
		</div>
	</div>
</div>