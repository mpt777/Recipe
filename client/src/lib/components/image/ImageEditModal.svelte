<script lang="ts">
	// Props
	/** Exposes parent props to this component. */
	export let parent: any;

	// Stores
	import { getModalStore } from '@skeletonlabs/skeleton';
    import Input from '$components/form/Input.svelte';
    import Field from '$components/form/Field.svelte';
	import { superForm } from 'sveltekit-superforms/client';
	import { imageSchema } from '$lib/forms/recipe.form';
    import { page } from '$app/stores';
	import iapi from '$utils/iapi';
	const modalStore = getModalStore();

    export let image

    const { form, errors, enhance, constraints } = superForm(image, {
        // taintedMessage: "Are you sure you want to leave?",
        validators: imageSchema,
        dataType: "form"
    })
    let files;

	// We've created a custom submit function to pass the response and close the modal.
	async function onFormSubmit(): Promise<void> {

        let formData = new FormData();
        for ( var key in $form ) {
            formData.append(key, $form[key]);
        }
        if (files){
            formData.append("file", files[0]);
        }

        let d = {}
        if (image){
            const response = await iapi(`common/image/${image._id}`, {
                method: "POST",
                body: formData,
            })
            d = await response.json()
        }
        else {
            formData.append("createdBy", $page.data.user._id)
            const response = await iapi(`common/image/upload`, {
                method: "POST",
                body: formData,
            })
            d = await response.json()
        }

        if ($modalStore[0]) {
            $modalStore[0].response(d);
        }
		modalStore.close();
        
	}

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
		<!-- Enable for debugging: -->
		<form class="modal-form {cForm}" method="POST" enctype="multipart/form-data">
            <Field name="title" placeholder="Title" label="Title" required={true} errors={$errors} constraints={$constraints} bind:value={$form.title} css=""/>
            <Field name="alt" placeholder="Text for screen readers" label="Alt Text" required={false} errors={$errors} constraints={$constraints} bind:value={$form.alt} css=""/>
            <input accept="image/png, image/jpeg, image/webp" bind:files name="file" type="file" required class="input"/>
		</form>
		<!-- prettier-ignore -->
		<footer class="modal-footer {parent.regionFooter}">
        <button class="btn {parent.buttonNeutral}" on:click={parent.onClose}>{parent.buttonTextCancel}</button>
        <button class="btn {parent.buttonPositive}" on:click={onFormSubmit}>Submit Form</button>
    </footer>
	</div>
{/if}