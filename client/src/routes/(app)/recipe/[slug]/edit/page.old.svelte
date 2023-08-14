<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import SortableList from '$components/utils/SortableList.svelte';
	import Field from '$components/utils/form/Field.svelte';
    import Input from '$components/utils/form/Input.svelte';
	import Quill from '$components/utils/form/Quill.svelte';
    import QuillDisplay from '$components/utils/form/QuillDisplay.svelte';

	import iapi from '$utils/iapi.js';
	import { modalStore, type ModalSettings, toastStore } from '@skeletonlabs/skeleton';

    export let form;
    export let data;
    $: recipe = data.recipe;
    $: ingredients = [];

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

    function addIngredient() {
        ingredients.push({
            title: "",
            amount: "",
            unit: ""
        })
        ingredients = ingredients;
    }

    async function removeIngredient(item, i) {
        //await api.delete("recipe/" + item._id);
        // await iapi("recipe/" + item._id, {
        //     method:"DELETE"
        // })
        ingredients.splice(i, 1);
        ingredients = ingredients;
    }

</script>

<div class="main-container">

    <form method="POST" action="?/update" use:enhance={() => {
            return async ({ update }) => {
            update({ reset: false });
            };
        }}>

        <div class="flex justify-between">
            <div></div>
            <div>
                <button class="btn variant-filled-error" on:click={showDeleteModal} type="button"><i class="ri-delete-bin-line"></i> Delete</button>
                <button class="btn variant-filled-error hidden" formaction="?/delete" id="deleteRecipe">Delete</button>
        
                <button class="btn variant-filled-primary"><i class="ri-save-line"></i> Save</button>
            </div>
        </div>

        <Field name="title" placeholder="Title" label="Title" required=true bind:value={recipe.title}/>
        <Quill name="description" placeholder="Description" label="Description" required=true bind:value={recipe.description} />

    </form>

    <form method="POST" action="?/updateIngredient" use:enhance={() => {
        return async ({ update }) => {
        update({ reset: false });
        };
    }}>

        
        {#each ingredients as ingredient, i}
        <section class="flex gap-4">
            <div class="w-full">
                <div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
                    <div><Field label="Title" required=true bind:value={ingredient.title}><div></div></Field></div>
                    <Input name="title[]" placeholder="Title" required=true type="text" baseClass="" bind:value={ingredient.title}/>
                </div>
            </div>
            <div class="w-full">  
                <div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
                    <div><Field label="Amount" required=true><div></div></Field></div>
                    <Input name="amount[]" placeholder="Amount" required=true type="number" baseClass="" bind:value={ingredient.amount}/>
                </div> 
            </div>
            <div class="w-full">
                <div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
                    <div><Field label="Unit" required=true bind:value={ingredient.unit}><div></div></Field></div>
                    <Input name="unit[]" placeholder="Unit" required=true type="select" baseClass="" bind:value={ingredient.unit}/>
                </div>
            </div>
            <div>
                <button type="button" class="btn variant-filled-error" on:click={() => removeIngredient(recipe, i)}>
                    <i class="ri-delete-bin-2-line"></i>
                </button>
            </div>
        </section>
        {/each}

        <button class="btn variant-outline-primary" type="button" on:click={addIngredient}>Add Ingredient</button>
        <button class="btn variant-outline-primary">Save Ingredient</button>


    </form>
</div>