<script>
	export let visitors;
</script>

{#if visitors}
	<div>
		รายชื่อผู้มีสิทธิ์เข้าเยี่ยม
		<table width="700" cellpadding="1" border="1">

			{#each visitors as visitor}
				<tr><td class='list-item'> {visitor.first_name}</td>
					<td class='list-item'>{visitor.last_name}</td>
					<td class='list-item'></td>
				</tr>
			{/each}
		</table>
	</div>
{/if}