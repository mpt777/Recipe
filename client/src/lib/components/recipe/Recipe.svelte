<script lang="ts">
	import QuillDisplay from "$components/utils/form/QuillDisplay.svelte";

    import { page } from '$app/stores';
	import IngredientCheck from "./IngredientCheck.svelte";
	import { RadioGroup, RadioItem } from "@skeletonlabs/skeleton";
	import { Ingredient, System, getSystemFromString } from "./Ingredient";
	import Input from "$components/utils/form/Input.svelte";
	import Label from "$components/utils/form/Label.svelte";
	import Card from "$components/utils/Card.svelte";
    
    export let recipe: RecipeInterface
    
    let value: string = "DEFAULT";
    let scalar: string = "1";

    $: system = getSystemFromString(value)
    $: ingredients = (recipe.ingredients || []).map(e => Ingredient.asSystem(e, system, parseFloat(scalar) || 1))

    $: {
        scalar = (Math.max(0, parseFloat(scalar))).toString()
    }

</script>



    <div class="relative">
        {#if $page.data.user && $page.data.user._id === recipe.createdBy._id}
        <div class="right-0 absolute">
            <a href="/recipe/{recipe._id}/edit" class="btn btn-sm variant-filled-tertiary">
                <i class="ri-pencil-line"></i> Edit
            </a>
        </div>
        {/if}
        
        <div class="space-y-4">
            <h1 class="text-4xl md:text-5xl lg:text-6xl font-extrabold text-center">{recipe.title}</h1>

            <div class="flex gap-3 flex-wrap text-center justify-center">
                <div>
                    <!-- <Label label="System"/> -->
                    <RadioGroup active="variant-filled-primary" hover="hover:variant-soft-primary">
                        <RadioItem bind:group={value} name="justify" value={"DEFAULT"}>Written</RadioItem>
                        <RadioItem bind:group={value} name="justify" value={"US"}>US</RadioItem>
                        <RadioItem bind:group={value} name="justify" value={"Metric"}>Metric</RadioItem>
                    </RadioGroup>
                </div>
    
                <div>
                    <!-- <Label label="Scale"/> -->
                        
                        <RadioGroup active="variant-filled-primary" hover="hover:variant-soft-primary" class="input-group-divider">
                            
                            <RadioItem bind:group={scalar} name="justify" value={"1"}>1</RadioItem>
                            <RadioItem bind:group={scalar} name="justify" value={"2"}>2</RadioItem>
                            <RadioItem bind:group={scalar} name="justify" value={"3"}>3</RadioItem>
                            <div class="input-group-divider"></div>
                            <Input bind:value={scalar} type="number" css="p-0 m-0 bg-transparent border-none text-center w-10 !m-0" style="{'min-width: 0 !important;'}"/>
                        </RadioGroup>

                </div>

            </div>

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

