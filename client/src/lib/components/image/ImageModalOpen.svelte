<script lang="ts">
	import type { ModalComponent, ModalSettings } from "@skeletonlabs/skeleton";
    import { getModalStore } from '@skeletonlabs/skeleton';
    import Image from "./Image.svelte";
	import ImageSelectModal from "./ImageSelectModal.svelte";
	import { imageStore } from "$stores/imageStore";
	const modalStore = getModalStore();

    export let image : ImageInterface | undefined;

    let modalComponent: ModalComponent = {
        ref: ImageSelectModal,
        props: { background: 'bg-red-500', image: image },
        slot: ''
    };

    function setImage(data : ImageInterface) {
        if (!data){ return };
        image = data;
        modalComponent.props.image = image;
        imageStore.set(image)
    }
    
    const d: ModalSettings = {
        type: 'component',
        component: modalComponent,
        title: 'HI',
        body: `message`,
        response: async (data : ImageInterface) => {
            setImage(data)
        }
    };
    function openModal() {
        modalStore.trigger(d);
    }

</script>

<div>
    <Image image={image}/>
    <button class="btn variant-filled" on:click={openModal} type="button">Change Image</button>
</div>