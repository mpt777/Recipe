<script lang="ts">
	import QuillDisplay from "$components/form/QuillDisplay.svelte";

    import { page } from '$app/stores';
	import IngredientCheck from "./IngredientCheck.svelte";
	import { RadioGroup, RadioItem } from "@skeletonlabs/skeleton";
	import { Ingredient, System, getSystemFromString } from "./Ingredient";
	import Input from "$components/form/Input.svelte";
	import RecipeTags from "./RecipeTags.svelte";
	import { pluralize } from "$scripts/humanize";
	import WakeLock from "./WakeLock.svelte";
    import Image from "$components/image/Image.svelte"
    
    export let recipe: RecipeInterface;
    
    let value: string = "DEFAULT";
    let scalar: string = "1";

    $: system = getSystemFromString(value)
    $: ingredients = (recipe.ingredients || []).map(e => Ingredient.asSystem(e, system, parseFloat(scalar) || 1))

    $: {
        scalar = (Math.max(0, parseFloat(scalar))).toString()
    }

</script>

<div class="relative">
    
    <div class="mx-auto max-w-3xl card">
        <div class="p-4 space-y-4">
            <div class="flex items-center justify-center gap-4 flex-wrap">
                <h1 class="text-4xl md:text-5xl lg:text-6xl font-extrabold text-center">
                    {recipe.title}
                </h1>
                {#if $page.data.user?._id === recipe.createdBy._id}
                <div>
                    <a href="/recipe/{recipe._id}/edit" class="btn btn-sm variant-filled-tertiary">
                        <i class="ri-pencil-line"></i> Edit
                    </a>
                </div>
                {/if}
            </div>

            <RecipeTags tags={recipe.tags} css="justify-center"/>

            <Image image={recipe.image} />

            <div class="flex gap-3 flex-wrap text-center justify-center items-center">
                <div>
                    <!-- <Label label="System"/> -->
                    <RadioGroup active="variant-filled-primary" hover="hover:variant-soft-primary" display="flex">
                        <RadioItem bind:group={value} name="justify" value={"DEFAULT"}>Written</RadioItem>
                        <RadioItem bind:group={value} name="justify" value={"US"}>US</RadioItem>
                        <RadioItem bind:group={value} name="justify" value={"Metric"}>Metric</RadioItem>
                    </RadioGroup>
                </div>

                <div>
                    <RadioGroup active="variant-filled-primary" hover="hover:variant-soft-primary" class="input-group-divider" display="flex">
                        
                        <RadioItem bind:group={scalar} name="justify" value={"1"}>1</RadioItem>
                        <RadioItem bind:group={scalar} name="justify" value={"2"}>2</RadioItem>
                        <RadioItem bind:group={scalar} name="justify" value={"3"}>3</RadioItem>
                        <div class="input-group-divider"></div>
                        <Input bind:value={scalar} type="number" css="p-0 bg-transparent border-none text-center w-10" style="{'min-width: 0 !important;'}"/>
                    </RadioGroup>
                </div>

                <WakeLock />
                    
            </div>
            
            <div class="flex justify-around">
                <div>Cook Time: {recipe.cookTime.amount} {pluralize(recipe.cookTime.unit, recipe.cookTime.amount)}</div>
                <div>Prep Time: {recipe.prepTime.amount} {pluralize(recipe.prepTime.unit, recipe.prepTime.amount)}</div>
                <div>Servings: {recipe.servings * parseFloat(scalar)}</div>
            </div>

        </div>

        <hr>
        <div class="p-4 space-y-4">


            <h2 class="text-2xl md:text-3xl lg:text-4xl font-extrabold">Description</h2>
            <QuillDisplay value={recipe.description}/>

            <h2 class="text-2xl md:text-3xl lg:text-4xl font-extrabold">Ingredients</h2>
            <ul class="list">
            {#each ingredients as ingredient }
                <li>
                    <IngredientCheck title="{ingredient.getAmount()} {ingredient.pluralizeUnit()} {ingredient.title}" />
                </li>
            {/each}
            </ul>

            
            <h2 class="text-2xl md:text-3xl lg:text-4xl font-extrabold">Instructions</h2>
            <QuillDisplay value={recipe.instructions}/>
        </div>
        
    </div>
</div>

