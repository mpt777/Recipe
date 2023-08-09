
<script>
    export let hover = false;
    let hoverClass = hover ? "card-hover" : ""
</script>
<div class="card {hoverClass}">
	<header class="card-header"><slot name="header"/></header>
	<section class="p-4"><slot name="content"/></section>
	<footer class="card-footer"><slot name="footer"/></footer>
</div>
				