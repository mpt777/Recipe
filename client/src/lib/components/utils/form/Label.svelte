<script>
    export let name = "";
    export let label= "";
    export let required = false;

    let requiredClass = required ? "required" : ""; 
</script>

<label class="label" for="{name}">
    {#if label}
        <span class="label-text {requiredClass}">{label}</span>
    {/if}
    <slot />
</label>