<script>
    export let title="";
    let checked = false;
</script>

<div class="flex items-center space-x-2"> 
    
    <input class="checkbox" type="checkbox" bind:checked={checked} name="{title}"/>
    <label class="{checked ? 'line-through' : ''}" for="{title}">{title}</label>
</div>
