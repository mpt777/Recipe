<script>

    export let form;
    export let data;
  
    import api from "$utils/api";
    import { enhance } from '$app/forms';
  
    async function test() {
      console.log(await api.get("auth"));
    }
  
</script>
  

<div class="flex h-screen justify-center items-center">
    <section>
        <form action="/auth/signup" method="POST">
            <div class="border border-gray-300 bg-white rounded-lg shadow-lg p-4">
                <h2 class="text-xl font-semibold mb-4 text-center">Signup</h2>
                <div class="group">
                    <label for="username">Username</label>
                    <input type="username" name="username" id="username" required />
                </div>
                
                <div class="group">
                    <label for="password">Password</label>
                    <input type="password" name="password" id="password" required />
                </div>
                
                <div class="submit-container">
                    <button type="submit" >Signup</button>
                </div>
    
                {#if form?.success }
                <p class="error">Success Loging In!.</p>
                {/if }
            </div>
        </form>
    </section>
</div>