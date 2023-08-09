<script>
    import { drawerStore } from '@skeletonlabs/skeleton';
    import { page } from '$app/stores';
    
    function drawerClose() {
        drawerStore.close();
    }

    export let title = "";
    export let href ="";
  </script>
  
  <a href="{href}" class:bg-primary-active-token={$page.url.pathname == href} on:click={drawerClose}>
    {title}
    <slot/>
  </a>