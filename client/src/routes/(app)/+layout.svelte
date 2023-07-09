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
            </div>
        </div>
    </div>
  
    <!-- Main content -->
    <div class="flex-grow">
        <slot />
    </div>
</div>