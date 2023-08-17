<script lang="ts">
	import Field from '$components/utils/form/Field.svelte';
    import Input from '$components/utils/form/Input.svelte';
	import Quill from '$components/utils/form/Quill.svelte';
    import QuillDisplay from '$components/utils/form/QuillDisplay.svelte';
    import SuperDebug from "sveltekit-superforms/client/SuperDebug.svelte"

    import { superForm } from "sveltekit-superforms/client"

	import { modalStore, type ModalSettings, toastStore } from '@skeletonlabs/skeleton';
	import { z } from 'zod';
	import { recipeSchema } from '$lib/forms/recipe.form.js';

    // export let form;
    export let data;

    const { form, errors, enhance, constraints } = superForm(data.form, {
        // taintedMessage: "Are you sure you want to leave?",
        validators: recipeSchema,
        dataType: 'json'
    })

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
        $form.ingredients.push({
            _id:"",
            title: "",
            amount: 0,
            unit: "",
            recipe: "",
            delete:false
        })
        $form.ingredients = $form.ingredients;
    }

    async function removeIngredient(item, i) {
        if (item._id){
            $form.ingredients[i].delete=true;
        }
        else {
            $form.ingredients.splice(i, 1);
        }
        
        $form.ingredients = $form.ingredients;
    }

</script>

<!-- <SuperDebug data={$form}/> -->
<div class="main-container">

    {JSON.stringify($errors)}

    <form method="POST" action="?/update" use:enhance>

        <div class="flex justify-between">
            <div></div>
            <div>
                <button class="btn variant-filled-error" on:click={showDeleteModal} type="button"><i class="ri-delete-bin-line"></i> Delete</button>
                <button class="btn variant-filled-error hidden" formaction="?/delete" id="deleteRecipe">Delete</button>
        
                <button class="btn variant-filled-primary"><i class="ri-save-line"></i> Save</button>
            </div>
        </div>

        <Field name="title" placeholder="Title" label="Title" required=true errors={$errors} constraints={$constraints} bind:value={$form.title}/>
        <Quill name="description" placeholder="Description" label="Description" required=true errors={$errors} bind:value={$form.description} />


        {#each $form.ingredients as ingredient, i}
        {#if !ingredient.delete}
        <section class="flex gap-4">
            <div class="w-full">
                <div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
                    <div><Field label="Title" required=true><div></div></Field></div>
                    <Input name="title" placeholder="Title" required=true type="text" baseClass="" bind:value={ingredient.title}/>
                </div>
            </div>
            <div class="w-full">  
                <div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
                    <div><Field label="Amount" required=true><div></div></Field></div>
                    <Input name="amount" placeholder="Amount" required=true type="number" baseClass="" bind:value={ingredient.amount}/>
                </div> 
            </div>
            <div class="w-full">
                <div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
                    <div><Field label="Unit" required=true><div></div></Field></div>
                    <Input name="unit" placeholder="Unit" required=true type="select" baseClass="" choices={["cup", "teaspoon","tablespoon","pint","quart","gallon","ounce","fluid ounce","pound","milliliter","liter","gram","kilogram"]} bind:value={$form.ingredients[i].unit}/>
                </div>
            </div>
            <div>
                <button type="button" class="btn variant-filled-error" on:click={() => removeIngredient(ingredient, i)}>
                    <i class="ri-delete-bin-2-line"></i>
                </button>
            </div>
        </section>
        {/if}
        {/each}

        <button class="btn variant-outline-primary" type="button" on:click={addIngredient}>Add Ingredient</button>

    </form>
</div>