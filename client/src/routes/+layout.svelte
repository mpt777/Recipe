<script>
    import "../app.css"

    // Finally, your application's global stylesheet (sometimes labeled 'app.css')
    import '../app.postcss';
    // import "$static/fonts/remix/remixicon.css"

	import { initializeStores } from '@skeletonlabs/skeleton';

	initializeStores();
</script>

<slot/>