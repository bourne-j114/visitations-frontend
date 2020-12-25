<script>
	export let prison;
</script>

<div class="article-preview">
	<div class="article-meta">
		<div class="info">
			ชื่อผู้ต้องขัง
			<hr>
			<div class="tag-list">
			{prison.first_name} {prison.last_name}  โทษ {prison.case_detail} จำคุก {prison.punish} แดน {prison.location}
			</div>
			<span class="date">
				วันที่เข้า {new Date(prison.jail_date).toDateString()}
			</span>
		</div>
	</div>
</div>