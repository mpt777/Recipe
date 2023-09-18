<script>
    import { onMount } from "svelte";
    import iapi from "$utils/iapi";

    export let form;
    import Field from "$components/form/Field.svelte";
    import FileUpload from "$components/form/FileUpload.svelte";

    import Message from '$components/messages/Message.svelte';
</script>


<div class="main-container">
    Sup
    <div class="text-center">
        <form class="form" method="POST" action="?/update" enctype="multipart/form-data">
            <Message message={ form?.message } level={form?.level}/>
            <Field name="title" placeholder="Title" label="Title" required={true} />
            <Field name="description" placeholder="Description" label="Description" required={true} type="textarea"/>

            <button class="btn btn-primary" type="submit" >Save Recipe</button>
        </form>

        <Field name="image" placeholder="Image" label="Upload Image" required={true} type="file"/>
        <FileUpload />

    </div>
</div>

