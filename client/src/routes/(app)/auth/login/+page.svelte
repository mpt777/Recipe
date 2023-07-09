<script>
    export let form;
    import { enhance } from '$app/forms';
    import CenterPanel from '$components/auth/CenterPanel.svelte';
    import Message from '$components/utils/message.svelte';
</script>
  
<CenterPanel>
    <form action="/auth/login" method="POST">
        <Message message={ form?.message } level={form?.level}/>
        <h2 class="text-xl font-semibold mb-4 text-center">Login</h2>

        <div class="group">
            <label for="username" classs="required">Username</label>
            <input type="username" name="username" id="username" placeholder="Username" autocomplete="username" class="input input-bordered w-full"/>
        </div>
        
        
        <div class="group">
            <label for="password">Password</label>
            <input type="password" name="password" id="password" placeholder="Password" autocomplete="new-password" required class="input input-bordered w-full"/>
        </div>

        <br>
        
        <div class="submit-container text-center">
            <button class="btn btn-primary" type="submit" >Login</button>
        </div>

        {#if form?.success }
        <p class="error">Success Loging In!.</p>
        {/if }
    </form>
</CenterPanel>