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
        <h2 class="text-xl font-semibold mb-4 text-center">Password Reset</h2>


        <div class="space-y-4">
            <Field name="password" placeholder="New Password" label="Password" autocomplete="new-password" type="password" required={true}/>
            <Field name="passwordConfirm" placeholder="Confirm Password" label="Confirm Password" autocomplete="new-password" type="password" required={true}/>
        </div>

        <br>
        
        <div class="submit-container text-center">
            <button class="btn variant-filled-primary" type="submit" >Reset Password</button>
        </div>
    </form>
</CenterPanel>