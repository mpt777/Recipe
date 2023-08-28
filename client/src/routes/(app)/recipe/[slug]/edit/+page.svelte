<script lang="ts">
	import Field from '$components/utils/form/Field.svelte';
    import Input from '$components/utils/form/Input.svelte';
    import Label from '$components/utils/form/Label.svelte';
    import Errors from '$components/utils/form/Errors.svelte';
	import Quill from '$components/utils/form/Quill.svelte';
    import QuillDisplay from '$components/utils/form/QuillDisplay.svelte';
    import SuperDebug from "sveltekit-superforms/client/SuperDebug.svelte"
    import { InputChip } from '@skeletonlabs/skeleton';

    import { superForm } from "sveltekit-superforms/client"

	import { modalStore, type ModalSettings, toastStore } from '@skeletonlabs/skeleton';
	import { string, z } from 'zod';
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

    async function removeIngredient(item, i:number) {
        if (item._id){
            $form.ingredients[i].delete=true;
        }
        else {
            $form.ingredients.splice(i, 1);
        }
        
        $form.ingredients = $form.ingredients;
    }

</script>

<SuperDebug data={$form}/>
<div class="main-container">
    {JSON.stringify($form)}

    <form method="POST" action="?/update" use:enhance>

        <div class="flex justify-between">
            <div></div>
            <div>
                <button class="btn variant-filled-error" on:click={showDeleteModal} type="button"><i class="ri-delete-bin-line"></i> Delete</button>
                
        
                <button class="btn variant-filled-primary"><i class="ri-save-line"></i> Save</button>
                <button class="btn variant-filled-error hidden" formaction="?/delete" id="deleteRecipe">Delete</button>
            </div>
        </div>
        
        <div class="space-y-4">
            <Field name="title" placeholder="Title" label="Title" required=true errors={$errors} constraints={$constraints} bind:value={$form.title}/>
            <Quill name="description" placeholder="Description" label="Description" errors={$errors} bind:value={$form.description} />
            <Quill name="instructions" placeholder="Instructions" label="Instructions" required=true errors={$errors} bind:value={$form.instructions} />
        

            <div class="space-y-4">
                {#each $form.ingredients as ingredient, i}
                {#if !ingredient.delete}
                <section class="flex gap-x-4 gap-y-2 flex-wrap-reverse lg:flex-nowrap">
                    <div class="flex gap-x-4 w-full">
                        <div class="w-full">
                            <Input name="amount" placeholder="Amount" required=true type="number" step=0.05 bind:value={ingredient.amount}/>
                            <Errors error="{$errors.ingredients?.[i]?.["amount"]}" />
                        </div>
                        <div class="w-full">
                            <Input name="unit" placeholder="Unit" required=true type="select" errors={$errors.ingredients?.[i]} choices={["cup", "teaspoon","tablespoon","pint","quart","gallon","ounce","fluid ounce","pound","milliliter","liter","gram","kilogram"]} bind:value={$form.ingredients[i].unit}/>          
                            <Errors error="{$errors.ingredients?.[i]?.["unit"]}" /> 
                        </div>
                    </div>
                    <div class="flex gap-x-4 w-full">
                        <div class="w-full">
                            <Input name="title" placeholder="Title" required=true type="text" bind:value={ingredient.title}/>
                            <Errors error="{$errors.ingredients?.[i]?.["title"]}" />
                        </div>
                        <div class="grow-0">
                            <button type="button" class="btn variant-filled-error" on:click={() => removeIngredient(ingredient, i)}>
                                <i class="ri-delete-bin-2-line"></i>
                            </button>
                        </div>
                    </div>
                </section>
                <hr>
                {/if}
                {/each}
            </div>

            <InputChip bind:value={$form.tags} name="Tags" placeholder="Enter any value..." />
            {JSON.stringify($errors.tags)}

            <button class="btn variant-outline-primary w-full" type="button" on:click={addIngredient}>Add Ingredient</button>
        </div>

    </form>
</div>

<!-- <div class="w-full">
    <div class="grid-cols-[auto_1fr_auto]">
        <div><Label label="Unit" required=true name="unit"/></div>
        <Input name="unit" placeholder="Unit" required=true type="select" errors={$errors.ingredients?.[i]} choices={["cup", "teaspoon","tablespoon","pint","quart","gallon","ounce","fluid ounce","pound","milliliter","liter","gram","kilogram"]} bind:value={$form.ingredients[i].unit}/>          
    </div>
    <Errors error="{$errors.ingredients?.[i]?.["unit"]}" /> 
</div> -->