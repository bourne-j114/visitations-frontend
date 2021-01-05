<script>
	import MainView from './MainView/index.svelte';

</script>

<svelte:head>
	<title>Visitors service</title>
</svelte:head>

<div class="home-page">
	<div class="banner">
		<div class="container">
			<h1 class="logo-font">Visitors service</h1>
			<p>ระบบการค้นหาผู้ต้องขัง</p>

		</div>
	</div>

	<div class="container page">
		<div class="row">
			<MainView  />

		</div>
	</div>
</div>