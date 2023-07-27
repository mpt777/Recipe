<script>
    import { onMount } from "svelte";
    import iapi from "$utils/iapi";
    import api from "$utils/api";

    export let form;
    import Field from "$components/utils/form/Field.svelte";

    import Message from '$components/utils/Message.svelte';
</script>


<div class="main-container">

    <div class="text-center">
        <form class="form" method="POST" action="?/update">
            <Message message={ form?.message } level={form?.level}/>
            <Field name="title" placeholder="Title" label="Title" required=true />
            <Field name="description" placeholder="Description" label="Description" required=true type="textarea"/>

            <button class="btn btn-primary" type="submit" >Save Recipe</button>
            
        </form>
    </div>
</div>

