
<script>
    export let hover = false;
    let hoverClass = hover ? "card-hover" : ""
	export let hhr = false;
</script>
<div class="card {hoverClass}">
	<header><slot name="header"/></header>
	<slot name="pre-content"/>
	{#if hhr}<hr>{/if}
	<section><slot name="content"/></section>
	<slot name="post-content"/>
	<footer><slot name="footer"/></footer>
</div>
				