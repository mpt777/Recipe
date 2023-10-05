<script>
	import { AppShell, AppBar, Drawer, Toast, Avatar, Modal} from '@skeletonlabs/skeleton';
	import { page } from '$app/stores';
	import Navigation from '$components/nav/Navigation.svelte';
	import ToastMessage from '$components/messages/ToastMessage.svelte';
	import { browser } from '$app/environment';
	import { LightSwitch } from '@skeletonlabs/skeleton';
	import { loginUser } from '$scripts/auth';
	import { onMount } from 'svelte';
	import Input from '$components/form/Input.svelte';

	import { getDrawerStore } from "@skeletonlabs/skeleton";
	import Breadcrumb from '$components/utils/Breadcrumb.svelte';

	const drawerStore = getDrawerStore();

	function drawerOpen() {
		drawerStore.open();
	}

	$: breadcrumbs = $page.data.breadcrumbs || [];

</script>

<svelte:head>
	<title>Calyps.io</title>
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
				Calyps.io Recipes
			</svelte:fragment>
			
			
			<svelte:fragment slot="trail">
				<form method="GET" action="/explore">
					<div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
						<button><i class="ri-search-line"></i></button>
						<Input placeholder="Search..." name="search" baseClass=""/>
					</div>
				</form>
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

	<div>
		{#if breadcrumbs.length}
		<div class="bg-glass-300-600-token p-2 m-2 token rounded-token">
			<Breadcrumb breadcrumbs={breadcrumbs}/>
		</div>
		{/if}
		<slot>

		</slot>
	</div>

    <svelte:fragment slot="pageFooter">
		<p>Page Footer!</p>
	</svelte:fragment>
</AppShell>