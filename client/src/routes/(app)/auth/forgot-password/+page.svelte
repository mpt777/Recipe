<script lang="ts">
    export let form;
    
    import { enhance } from '$app/forms';
    import CenterPanel from '$components/auth/CenterPanel.svelte';
    import Field from '$components/form/Field.svelte';
    import Message from '$components/messages/Message.svelte';

</script>

  
<CenterPanel>
    <form method="POST" use:enhance>
        <Message message={ form?.message } level={form?.level}/>
        <h2 class="text-xl font-semibold mb-4 text-center">Forgot Password?</h2>


        <div class="space-y-4">
            <Field name="email" placeholder="Email Address" label="Email Address" autocomplete="email" required={true} type="email"/>
        </div>

        <br>
        
        <div class="submit-container flex justify-between">
            <button class="btn variant-filled-primary" type="submit" >Reset Password</button>
            <div>
                <a href="/auth/login" class="btn btn-sm variant-ghost">
                    Back to Login
                </a>
                <a href="/auth/signup" class="btn variant-ghost btn-sm">
                    Sign Up
                </a>
            </div>
        </div>

        {#if form?.success }
            <p>If there is account with this email address, an email will be sent with further instructions!</p>
        {/if }
    </form>
</CenterPanel>