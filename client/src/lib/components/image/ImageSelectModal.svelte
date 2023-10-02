<script lang="ts">
	// Props
	/** Exposes parent props to this component. */
	export let parent: any;

	// Stores
	import { getModalStore } from '@skeletonlabs/skeleton';
    import Image from "$components/image/Image.svelte"
	import iapi from '$utils/iapi';
	import { onMount } from 'svelte';
	const modalStore = getModalStore();

    let images : [ImageInterface | null] = [];

    export let image : ImageInterface | null;
    let selectedImage = image;

    async function getImages() : Promise<void> {
        const response = await iapi(`common/image`, {
            method: "GET",
        })

        images = await response.json()
    }

    onMount(() => {
        getImages()
    })

    function setSelectedImage(im){
        selectedImage = im;
        image = im;
        return null;
    }

	// We've created a custom submit function to pass the response and close the modal.
	async function onFormSubmit(): Promise<void> {
        $modalStore[0].response(selectedImage);
		modalStore.close();
	}

    let selected = "border-token border-primary-900-50-token rounded-container-token"

	// Base Classes
	const cBase = 'card p-4 w-modal shadow-xl space-y-4';
	const cHeader = 'text-2xl font-bold';
	const cForm = 'border border-surface-500 p-4 space-y-4 rounded-container-token';
</script>

<!-- @component This example creates a simple form modal. -->

{#if $modalStore[0]}
	<div class="modal-example-form {cBase}">
		<header class={cHeader}>{$modalStore[0].title ?? '(title missing)'}</header>
		<article>{$modalStore[0].body ?? '(body missing)'}</article>

        <div class="grid sm:grid-cols-2 md:grid-cols-3 grid-flow-row gap-4">
        {#each images as im}
            <button class="{im?._id === selectedImage?._id ? selected : '' }" on:click={setSelectedImage(im)}>
                <Image image={im}/>
            </button>
        {/each}
        </div>
		<!-- Enable for debugging: -->
		<!-- <form class="modal-form {cForm}" method="POST" enctype="multipart/form-data">
		</form> -->
		<!-- prettier-ignore -->
		<footer class="modal-footer {parent.regionFooter}">
        <button class="btn {parent.buttonNeutral}" on:click={parent.onClose}>{parent.buttonTextCancel}</button>
        <button class="btn {parent.buttonPositive}" on:click={onFormSubmit}>Select Image</button>
    </footer>
	</div>
{/if}