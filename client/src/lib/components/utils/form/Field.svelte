<script>
// @ts-nocheck

    import Input from "./Input.svelte";

    export let value = "";
    export let placeholder = "";
    export let label = "";
    export let name = "";
    export let autocomplete = "";
    export let required = false;
    export let errors = {};
    export let constraints = {}
    export let type = "text";
    let requiredClass = required ? "required" : ""; 

    $: hasErrors = errors && errors[name];
    $: classes = hasErrors ? "with-error" : "";


</script>


<label class="label" for="{name}">
    <span class="label-text {requiredClass}">{label}</span>
    <!-- <span class="label-text-alt">Top Right label</span> -->
    <slot>
        <Input bind:value={value} placeholder={placeholder} name={name} autocomplete={autocomplete} type={type} classes={classes} required={required} {...constraints}/>
    </slot>
    {#if errors[name]}
    <p class="text-red-500 text-xs italic mt-3">{errors[name]}</p>
    {/if}
</label>