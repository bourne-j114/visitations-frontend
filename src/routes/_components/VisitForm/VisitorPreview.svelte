<script>
	export let visitors;
</script>

{#if visitors}
	<div>
		รายชื่อผู้มีสิทธิ์เข้าเยี่ยม
		<table width="700">

			{#each visitors as visitor}
				<tr><td class='list-item'> {visitor.first_name}</td>
					<td class='list-item'>{visitor.last_name}</td>
					<td class='list-item'><button>บันทึกเยี่ยม</button></td>
				</tr>
			{/each}
		</table>
	</div>
{/if}