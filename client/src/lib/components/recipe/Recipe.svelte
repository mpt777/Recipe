<script lang="ts">
	import QuillDisplay from "$components/utils/form/QuillDisplay.svelte";

    import { page } from '$app/stores';
	import IngredientCheck from "./IngredientCheck.svelte";
	import { RadioGroup, RadioItem } from "@skeletonlabs/skeleton";
	import { Ingredient, System, getSystemFromString } from "./Ingredient";

    export let recipe: RecipeInterface
    
    let value: string = "DEFAULT";
    let scalar: number = 1;

    $: system = getSystemFromString(value)
    $: ingredients = (recipe.ingredients || []).map(e => Ingredient.asSystem(e, system, scalar))

</script>


<div class="relative">
    {#if $page.data.user && $page.data.user._id === recipe.createdBy._id}
    <div class="right-0 absolute">
        <a href="/recipe/{recipe._id}/edit" class="btn btn-sm variant-filled-tertiary">
            <i class="ri-pencil-line"></i> Edit
        </a>
    </div>
    {/if}

    <RadioGroup active="variant-filled-primary" hover="hover:variant-soft-primary">
        <RadioItem bind:group={value} name="justify" value={"DEFAULT"}>Default</RadioItem>
        <RadioItem bind:group={value} name="justify" value={"US"}>US</RadioItem>
        <RadioItem bind:group={value} name="justify" value={"Metric"}>Metric</RadioItem>
    </RadioGroup>

    <RadioGroup active="variant-filled-primary" hover="hover:variant-soft-primary">
        <RadioItem bind:group={scalar} name="justify" value={1}>1</RadioItem>
        <RadioItem bind:group={scalar} name="justify" value={2}>2</RadioItem>
        <RadioItem bind:group={scalar} name="justify" value={3}>3</RadioItem>
    </RadioGroup>
    
    <div class="space-y-4">
        <h1 class="text-4xl md:text-5xl lg:text-6xl font-extrabold">{recipe.title}</h1>
        <QuillDisplay value={recipe.description}/>

        <h2 class="text-2xl md:text-3xl lg:text-4xl font-extrabold">Ingredients</h2>
        <ul class="list">
        {#each ingredients as ingredient }
            <li>
                <IngredientCheck title="{ingredient.getAmount(scalar)} {ingredient.pluralizeUnit()} {ingredient.title}" />
            </li>
        {/each}
        </ul>

        
        <h2 class="text-2xl md:text-3xl lg:text-4xl font-extrabold">Instructions</h2>
        <QuillDisplay value={recipe.instructions}/>
    </div>
</div>
