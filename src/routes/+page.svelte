<!-- <h1 class="text-3xl font-bold bg-slate-500">Hello world!</h1> -->
<script>
	import ArtBoard from '../components/ArtBoard.svelte';
import Header from '../components/Header.svelte';
	import LeftSideBar from '../components/LeftSideBar.svelte';
	import RightSideBar from '../components/RightSideBar.svelte';
	import StatusBar from '../components/StatusBar.svelte';
</script>

<main class=" flex flex-col h-screen justify-between font-sans">
	<Header />

	<!-- Main UI -->
	<div class="bg-black/80 h-full flex items-center justify-between overflow-hidden">
		<!-- Left Side Bar -->
		<LeftSideBar />

		<!-- Main Artboard -->
		<ArtBoard />

		<!-- Right Side Bar -->
		<RightSideBar />
	</div>

	<!-- Bottom Status Bar -->
	<StatusBar />
</main>

<style lang="postcss">
	:global(html) {
		background-color: theme(colors.gray.100);
	}

	
</style>