<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import Field from '$components/utils/form/Field.svelte';
	import iapi from '$utils/iapi.js';
	import { modalStore, type ModalSettings, toastStore } from '@skeletonlabs/skeleton';

    export let form;
    export let data;
    $: recipe = data.recipe;

    function showDeleteModal() : void {
        const modal: ModalSettings = {
            type: 'confirm',
            // Data
            title: 'Delete Recipe?',
            body: 'Would you like to delete this Recipe? There is no recovery!',
            // TRUE if confirm pressed, FALSE if cancel pressed
            response: (r: boolean) => {
                if (r){
                    document.getElementById("deleteRecipe")?.click()
                }
            },
        };
        modalStore.trigger(modal);
    }
</script>

<div class="main-container">

    <form method="POST" action="?/update" use:enhance={() => {
            return async ({ update }) => {
            update({ reset: false });
            };
        }}>
        {recipe.title}
        <Field name="title" placeholder="Title" label="Title" required=true bind:value={recipe.title}/>
        <Field name="description" placeholder="Description" label="Description" required=true type="textarea" bind:value={recipe.description}/>

        <button class="btn variant-filled-error" on:click={showDeleteModal} type="button">Delete Recipe</button>
        <button class="btn variant-filled-error hidden" formaction="?/delete" id="deleteRecipe">Delete Recipe</button>

        <button class="btn variant-filled-primary">Save Recipe</button>

    </form>

    <div class="flex justify-between">

    </div>
</div>