<script lang="ts">
    
    export let value = "";
    export let placeholder = "";
    export let name = "";
    export let autocomplete = "";
    export let required = false;
    export let errors = {};
    export let type = "text";
    export let choices = [];
    const inputProperties = { type };
    let requiredClass = required ? "required" : ""; 

    $: hasErrors = errors && errors[name];
    $: classes = hasErrors ? "with-error" : "";

    const handleInput = e => {
        value = e.target.value;
    };

    export let baseClass : string = undefined;
    let baseClassLookup = {
        textarea: "textarea",
        file: "",
        select: "select",
        input: "input"
    }

    if (baseClass === undefined){
        baseClass = baseClassLookup[type] || "input"; 
    }

</script>
{#if type === "textarea"}
    <textarea
    {...inputProperties}
    placeholder={placeholder}
    autocomplete={autocomplete}
    required={required}
    {name}
    class="{baseClass} {classes}"
    bind:value
    on:input={handleInput} />
{:else if type === "file"}
    <input
    {...inputProperties}
    placeholder={placeholder}
    autocomplete={autocomplete}
    required={required}
    {name}
    class="{baseClass} {classes}"
    bind:value
    on:input={handleInput} />
{:else if type === "select"}
    <select
    {...inputProperties}
    placeholder={placeholder}
    autocomplete={autocomplete}
    required={required}
    {name}
    class="{baseClass} {classes}"
    bind:value
    on:input={handleInput}>
        {#each choices as choice}
        <option value="{choice}">{choice}</option>
        {/each}
    </select>
{:else}
    <input
    {...inputProperties}
    placeholder={placeholder}
    autocomplete={autocomplete}
    required={required}
    step=0.1
    {name}
    class="{baseClass} {classes}"
    bind:value
    on:input={handleInput} />
{/if}
<!-- <label class="label" for="{name}"> -->
    <!-- <span class="label-text-alt">Bottom Left label</span> -->
    <!-- <span class="label-text-alt">Bottom Right label</span> -->
<!-- </label> -->