<script>
    import { page } from '$app/stores';
    export let data;
</script>
<div class="flex h-screen">
    <!-- Sidebar -->
    <div class="flex justify-between flex-col h-full menu bg-base-200 w-56 rounded-box">
        <div>
            <ul class="">
                <li><a href="/">Home</a></li>
                <li><a href="/">Expore</a></li>
                <li><a href="/">Recipes</a></li>
                <!-- <li>
                <details open>
                    <summary>Parent</summary>
                    <ul>
                    <li><a>level 2 item 1</a></li>
                    <li><a>level 2 item 2</a></li>
                    <li>
                        <details open>
                        <summary>Parent</summary>
                        <ul>
                            <li><a>level 3 item 1</a></li>
                            <li><a>level 3 item 2</a></li>
                        </ul>
                        </details>
                    </li>
                    </ul>
                </details>
                </li>
                <li><a>Item 3</a></li> -->
            </ul>
        </div>
        <div>
            <ul>
            {#if data.user}                
                <li><a href="/profile">Hi {data.user.username}</a></li>
                <form method="POST" action="/auth/logout">
                <li>
                    <button>Logout</button>
                </li>
                </form>
            {:else}
                <li><a href="/auth/login?redirectTo={$page.url.pathname}"><i class="ri-user-line"></i>Login </a></li>
                <li><a href="/auth/signup?redirectTo={$page.url.pathname}">Signup</a></li>
            {/if}
            </ul>
        </div>
    </div>
  
    <!-- Main content -->
    <div class="flex-grow">
        <slot />
    </div>
</div>