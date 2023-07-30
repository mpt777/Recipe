<script>
    export let value = "";
    export let placeholder = "";
    export let label = "";
    export let name = "";
    export let autocomplete = "";
    export let required = false;
    export let errors = {};
    export let type = "text";
    const inputProperties = { type };
    let requiredClass = required ? "required" : ""; 

    $: hasErrors = errors && errors[name];
    $: classes = hasErrors ? "input with-error" : "input";

    const handleInput = e => {
        value = e.target.value;
    };

</script>

<div class="form-control w-full max-w-xs">
    <label class="label" for="{name}">
        <span class="label-text {requiredClass}">{label}</span>
        <!-- <span class="label-text-alt">Top Right label</span> -->
    </label>
    {#if type === "textarea"}
        <textarea
        {...inputProperties}
        placeholder={placeholder}
        autocomplete={autocomplete}
        required={required}
        {name}
        class="input input-bordered w-full max-w-xs {classes}"
        bind:value
        on:input={handleInput} />
    {:else if type === "file"}
        <input
        {...inputProperties}
        placeholder={placeholder}
        autocomplete={autocomplete}
        required={required}
        {name}
        class=" {classes}"
        bind:value
        on:input={handleInput} />
    {:else}
        <input
        {...inputProperties}
        placeholder={placeholder}
        autocomplete={autocomplete}
        required={required}
        {name}
        class="input input-bordered w-full max-w-xs {classes}"
        bind:value
        on:input={handleInput} />
    {/if}
    <label class="label" for="{name}">
        <!-- <span class="label-text-alt">Bottom Left label</span> -->
        <!-- <span class="label-text-alt">Bottom Right label</span> -->
    </label>
    {#if hasErrors}
    <p class="text-red-500 text-xs italic mt-3">{errors[name].message}</p>
    {/if}
</div>