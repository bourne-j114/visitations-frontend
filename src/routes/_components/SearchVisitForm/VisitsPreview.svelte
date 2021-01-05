<script>
	export let visits;
</script>

{#if visits}
	<div>
		ประวัติการเข้าเยี่ยม
		<table width="700" cellpadding="1" border="1">
			<tr bgcolor="#e5e5e"><td>ชื่อ - นามสกุล</td><td>ประวัติการเยี่ยม</td></tr>
			{#each visits as visit}
				<tr>
					<td class='list-item'> {visit.visitor_name}</td>
					<td class='list-item'>{new Date(visit.visit_date).toUTCString()}</td>
				</tr>
			{/each}
		</table>
	</div>
{/if}