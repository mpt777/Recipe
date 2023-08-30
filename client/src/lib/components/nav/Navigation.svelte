
<script>
    import { page } from '$app/stores';
	import { getDrawerStore } from "@skeletonlabs/skeleton";

	const drawerStore = getDrawerStore();

    import NavLink from '$components/nav/NavLink.svelte';

    function drawerClose() {
        drawerStore.close();
    }
</script>
<div class="flex flex-col justify-between h-full p-4">
    <nav class="list-nav">
        <ul class="">
            <li><NavLink title="Home" href="/"/></li>
            <li><NavLink title="Explore" href="/explore"/></li>
            <li><NavLink title="Recipes" href="/recipes"/></li>
        </ul>
    </nav>
    <nav class="list-nav">
        <ul>
        {#if $page.data.user}                
            <li><NavLink href="/profile">My Profile</NavLink></li>
            <form method="POST" action="/auth/logout">
            <li>
                <button class="w-full" on:click={drawerClose}>Logout</button>
            </li>
            </form>
        {:else}
            <li><NavLink title="Login" href="/auth/login?redirectTo={$page.url.pathname}"/></li>
            <li><NavLink title="Signup" href="/auth/signup?redirectTo={$page.url.pathname}"/></li>
        {/if}
        </ul>
    </nav>
</div>