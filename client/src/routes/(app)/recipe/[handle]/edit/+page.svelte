<script lang="ts">
	import Field from '$components/form/Field.svelte';
    import Input from '$components/form/Input.svelte';
    import Label from '$components/form/Label.svelte';
    import Errors from '$components/form/Errors.svelte';
	import Quill from '$components/form/Quill.svelte';
    import Breadcrumb from '$components/utils/Breadcrumb.svelte';
    import QuillDisplay from '$components/form/QuillDisplay.svelte';
    import SuperDebug from "sveltekit-superforms/client/SuperDebug.svelte"
    import { InputChip } from '@skeletonlabs/skeleton';

    import { superForm } from "sveltekit-superforms/client"

    import { getModalStore, type ModalSettings } from '@skeletonlabs/skeleton';
			
    const modalStore = getModalStore();

	import { recipeSchema } from '$lib/forms/recipe.form.js';
	import Card from '$components/utils/Card.svelte';
	import { humanizeDate } from '$scripts/date.js';
	import ImageModalOpen from '$components/image/ImageModalOpen.svelte';
	import { imageStore } from '$stores/imageStore.js';

    // export let form;
    export let data;
    let recipe = data.recipe

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

    async function removeIngredient(item:IngredientInterface, i:number) {
        if (item._id){
            $form.ingredients[i].delete=true;
        }
        else {
            $form.ingredients.splice(i, 1);
        }
        
        $form.ingredients = $form.ingredients;
    }

    imageStore.set(recipe.image)

    imageStore.subscribe(value => {
        recipe.image = value;
        $form.image = recipe.image._id;
    })

</script>

<svelte:head>
	<title>Edit: {recipe.title}</title>
</svelte:head>

<div class="main-container">

    <form method="POST" action="?/update" use:enhance>
        
        <div class="flex flex-wrap justify-center gap-4">
            <div class="space-y-4 max-w-2xl">
                <Field name="title" placeholder="Title" label="Title" required={true} errors={$errors} constraints={$constraints} bind:value={$form.title} css="text-4xl font-bold"/>
                <Quill name="description" placeholder="Description" label="Description" errors={$errors} bind:value={$form.description} />
                <Quill name="instructions" placeholder="Instructions" label="Instructions" required={true} errors={$errors} bind:value={$form.instructions} />
            
                <Card >
                    <div slot="header" class="card-header">
                        Ingredients
                    </div>
                    <div class="space-y-4 p-4" slot="content">
                        {#each $form.ingredients as ingredient, i}
                        {#if !ingredient.delete}
                        <section class="flex gap-x-4 gap-y-2 flex-wrap-reverse lg:flex-nowrap">
                            <div class="flex gap-x-4 w-full">
                                <div class="w-full">
                                    <Input name="amount" placeholder="Amount" required={true} type="number" step={0.05} bind:value={ingredient.amount}/>
                                    <Errors error="{$errors.ingredients?.[i]?.["amount"]}" />
                                </div>
                                <div class="w-full">
                                    <Input name="unit" placeholder="Unit" required={true} type="select" errors={$errors.ingredients?.[i]} choices={["cup", "teaspoon","tablespoon","pint","quart","gallon","ounce","fluid ounce","pound","milliliter","liter","gram","kilogram"]} bind:value={$form.ingredients[i].unit}/>          
                                    <Errors error="{$errors.ingredients?.[i]?.["unit"]}" /> 
                                </div>
                            </div>
                            <div class="flex gap-x-4 w-full">
                                <div class="w-full">
                                    <Input name="title" placeholder="Title" required={true} type="text" bind:value={ingredient.title}/>
                                    <Errors error="{$errors.ingredients?.[i]?.["title"]}" />
                                </div>
                                <div class="grow-0">
                                    <button type="button" class="btn variant-filled-error" on:click={() => removeIngredient(ingredient, i)}>
                                        <i class="ri-delete-bin-2-line"></i>
                                    </button>
                                </div>
                            </div>
                        </section>
                        {#if i !== $form.ingredients.length-1}<hr>{/if}
                        {/if}
                        {/each}

                    </div>
                    <div slot="footer">
                        <hr>
                        <div class="p-4">
                            <button class="btn variant-outline-primary w-full" type="button" on:click={addIngredient}>Add Ingredient</button>
                        </div>
                    </div>
                </Card>

            </div>
            <div class="space-y-4">  
                <div class="text-right">
                    <button class="btn variant-filled-error" on:click={showDeleteModal} type="button"><i class="ri-delete-bin-line"></i> Delete</button>
                    <button class="btn variant-filled-primary"><i class="ri-save-line"></i> Save</button>
                    <button class="btn variant-filled-error hidden" formaction="?/delete" id="deleteRecipe">Delete</button>
                </div>

                <Card hhr={true}>
                    <div slot="content" class="p-4 space-y-4 max-w-sm">
                        <ImageModalOpen image={recipe.image} imageStore={imageStore}/>
                    </div>
                </Card>

                <Card hhr={true}>
                    <div slot="header" class="p-2 text-xl">Meta Data</div>
                    <div slot="content" class="p-4 space-y-4">
                        <div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
                            <div class="font-bold">Prep Time</div>
                            <Input name="amount" placeholder="Amount" baseClass="" size={4} required={true} errors={$errors} constraints={$constraints} bind:value={$form.prepTime.amount} />
                            <Input name="title" placeholder="Unit" baseClass="" required={true} type="select" errors={$errors} constraints={$constraints} choices={["hour","minute","second"]} bind:value={$form.prepTime.unit} />
                        
                        </div>
                        <div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
                            <div class="font-bold">Cook Time</div>
                            <Input name="amount" placeholder="Amount" baseClass="" size={4} required={true} errors={$errors} constraints={$constraints} bind:value={$form.cookTime.amount} />
                            <Input name="title" placeholder="Unit" baseClass="" type="select" required={true} errors={$errors} constraints={$constraints} choices={["hour","minute","second"]} bind:value={$form.cookTime.unit} />
                        </div>
                        <div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
                            <div class="font-bold">Servings</div>
                            <Input name="servings" placeholder="Servings" baseClass="" size={4} required={true} errors={$errors} constraints={$constraints} bind:value={$form.servings} />
                        </div>
                    </div>
                </Card>      
                <Card hhr={true}>
                    <div slot="header" class="p-2 text-xl">Dates</div>
                    <div slot="content" class="p-4">
                        
                        <div><b>Created</b>: {humanizeDate(new Date(recipe.createdAt))}</div>
                        <div><b>Updated</b>: {humanizeDate(new Date(recipe.updatedAt))}</div>
                    </div>
                </Card>
                <div class="max-w-sm">   
                    <Label name="Tags" label="Tags">
                    <InputChip bind:value={$form.tags} name="Tags" placeholder="Enter any value..." />
                    </Label>
                </div>
                <Card hhr={true}>
                    <div slot="header" class="p-2 text-xl">SEO</div>
                    <div slot="content" class="p-4 space-y-4">
                        <div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
                            <div class="font-bold">URL Handle</div>
                            <Input name="handle" placeholder="Handle" baseClass="" errors={$errors} constraints={$constraints} bind:value={$form.handle} />
                            
                        </div>
                        <Errors error={$errors["handle"]} />
                    </div>
                </Card>   
            </div>
        </div>
        
    </form>
</div>
<SuperDebug data={$form}/>