
<script>
    export let hover = false;
    let hoverClass = hover ? "card-hover" : ""
</script>
<div class="card {hoverClass}">
	<header><slot name="header"/></header>
	<slot name="pre-content"/>
	<section><slot name="content"/></section>
	<slot name="post-content"/>
	<footer><slot name="footer"/></footer>
</div>
				