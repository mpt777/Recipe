<script>
	import { AppShell, AppBar, Drawer, drawerStore, Toast, Avatar, Modal} from '@skeletonlabs/skeleton';
	import { page } from '$app/stores';
	import Navigation from '$components/nav/Navigation.svelte';
	import ToastMessage from '$components/utils/ToastMessage.svelte';
	import { browser } from '$app/environment';
	import { LightSwitch } from '@skeletonlabs/skeleton';

	function drawerOpen() {
		drawerStore.open();
	}

</script>

<svelte:head>
	<title>EmptyTxt</title>
</svelte:head>

<Drawer>
	<Navigation />
</Drawer>

<Toast position="tr" />
<Modal />

{#if browser}
<ToastMessage />
{/if }


<AppShell slotSidebarLeft="w-0 md:w-52 bg-surface-500/10">
	<svelte:fragment slot="header">
		<AppBar>
			<svelte:fragment slot="lead">
				<button class="md:hidden btn btn-sm-mr-4" on:click={drawerOpen}>
					<i class="ri-menu-line"></i>
				</button>
			</svelte:fragment>
			Recipes
			<svelte:fragment slot="trail">
				<LightSwitch/>
				{#if $page.data.user}
				<Avatar
					initials={$page.data.user.username.charAt(0)}
					border="border-4 border-surface-300-600-token hover:!border-primary-500"
					cursor="cursor-pointer"
					width="w-12"
				/>
				{/if}
			</svelte:fragment>
			
		</AppBar>
	</svelte:fragment>
	<svelte:fragment slot="sidebarLeft">
	    <Navigation />
	</svelte:fragment>

    <slot/>

    <svelte:fragment slot="pageFooter">
		<p>Page Footer!</p>
	</svelte:fragment>
</AppShell>