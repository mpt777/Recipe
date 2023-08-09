<script lang="ts">
    export let form;
    
    import { enhance } from '$app/forms';
    import CenterPanel from '$components/auth/CenterPanel.svelte';
    import Field from '$components/utils/form/Field.svelte';
    import Message from '$components/utils/Message.svelte';

</script>

  
<CenterPanel>
    <form method="POST" use:enhance>
        <Message message={ form?.message } level={form?.level}/>
        <h2 class="text-xl font-semibold mb-4 text-center">Login</h2>

        <div class="space-y-4">
            <Field name="username" placeholder="Username" label="Username" autocomplete="username" required=true/>
            <Field name="password" placeholder="Password" label="Password" autocomplete="new-password" required=true type="password"/>
        </div>

        <br>
        
        <div class="submit-container text-center">
            <button class="btn variant-filled-primary" type="submit" >Login</button>
        </div>

        {#if form?.success }
        <p class="error">Success Loging In!.</p>
        {/if }
    </form>
</CenterPanel>