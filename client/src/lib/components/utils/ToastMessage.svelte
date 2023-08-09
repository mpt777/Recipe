<script lang="ts">
	import { page } from '$app/stores';
	import { toastStore } from '@skeletonlabs/skeleton';
	import type { Message } from '$scripts/message';

	$page.data.toastMessages.forEach((element : Message) => {
		toastStore.trigger({
			message: element.message,
			background: element.background,
			timeout: element.timeout,
			hoverable: element.hoverable,
			hideDismiss: element.hideDismiss,
			classes: element.classes
		});
	});

</script>