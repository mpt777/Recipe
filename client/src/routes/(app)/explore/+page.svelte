<script lang="ts">
	import { page } from "$app/stores";
	import RecipeList from "$components/home/RecipeList.svelte";
	import RecipePanel from "$components/home/RecipePanel.svelte";
	import { Paginator, type PaginationSettings } from "@skeletonlabs/skeleton";

	export let data;

	let recipies : [RecipeInterface] = data.recipes;
	let paginationSettings = data.pageSettings;

	function onPageChange(e: CustomEvent): void {
		console.log('Paginator - event:page', e.detail);
	}
	function onAmountChange(e: CustomEvent): void {
		console.log('Paginator - event:amount', e.detail);
	}
					
</script>


<div class="main-container">

	<Paginator
		bind:settings={paginationSettings}
		on:page={onPageChange}
		on:amount={onAmountChange}
		showFirstLastButtons="{false}"
		showPreviousNextButtons="{true}"
	/>

	<div class="p-4">
		<section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
			{#each recipies as recipe}
				<RecipePanel recipe={recipe} />
			{/each}
		</section>
	</div>



</div>

