<script>
// @ts-nocheck

    import Input from "./Input.svelte";
    import Errors from "./Errors.svelte";

    export let value = "";
    export let placeholder = "";
    export let label = "";
    export let name = "";
    export let forName = "";
    export let autocomplete = "";
    export let required = false;
    export let errors = {};
    export let constraints = {}
    export let type = "text";
    export let css = "";
    export let baseClass = undefined;
    let requiredClass = required ? "required" : ""; 

    $: hasErrors = errors && errors[name];
    $: classes = hasErrors ? "with-error" : "";

</script>


<label class="label" for="{name || forName}">
    {#if label}
        <span class="label-text {requiredClass}">{label}</span>
    {/if}
    
    <slot name="input">
        {#if name}<Input bind:value={value} placeholder={placeholder} name={name} autocomplete={autocomplete} type={type} classes={classes} required={required} baseClass={baseClass} {...constraints} css={css}/>{/if}
    </slot>
    <slot name="error">
        {#if errors?.[name]}<Errors error="{errors?.[name]}" />{/if}
    </slot>
</label>