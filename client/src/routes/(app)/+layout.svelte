<script>
    export let data;
</script>
<div class="flex h-screen">
    <!-- Sidebar -->
    <div class="bg-gray-800 text-white w-64">
        <div class="flex justify-between flex-col h-full p-4">
            <div class="">
                <ul>
                    <li>
                        <a href="/">
                            Home
                        </a>
                    </li>
                    <li>
                        <a href="/">
                            Explore
                        </a>
                    </li>
                    <li>
                        <a href="/">
                            Recipies
                        </a>
                    </li>
                </ul>
            </div>

            <div class="">
                {#if data.user}                
                <ul>
                    <li>
                    Hi {data.user.username}
                    </li>
                    <li>
                        <a href="/auth/logout">
                        Logout
                        </a>
                    </li>
                </ul>
                {:else}
                <ul>
                    <li>
                        <a href="/auth/login">
                            <i class="ri-user-line"></i>
                            Login 
                        </a>
                    </li>
                    <li>
                        <a href="/auth/signup">
                            Signup
                        </a>
                    </li>
                </ul>
                {/if}

            </div>
        </div>
    </div>
  
    <!-- Main content -->
    <div class="flex-grow">
        <slot />
    </div>
</div>