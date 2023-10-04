<script lang="ts">
	import type { ModalComponent, ModalSettings } from "@skeletonlabs/skeleton";
    import { getModalStore } from '@skeletonlabs/skeleton';
    import Image from "./Image.svelte";
	import ImageSelectModal from "./ImageSelectModal.svelte";
    import ImageEditModal from "./ImageEditModal.svelte";
	import { imageStore } from "$stores/imageStore";
	const modalStore = getModalStore();

    export let image : ImageInterface | undefined;

    let modalComponent: ModalComponent = {
        ref: ImageSelectModal,
        props: { background: 'bg-red-500', image: image },
        slot: ''
    };
    
    const d: ModalSettings = {
        type: 'component',
        component: modalComponent,
        title: 'HI',
        body: `message`,
        response: async (data : ImageInterface) => {
            setImage(data)
        }
    };

    let modalComponentEdit: ModalComponent = {
        ref: ImageEditModal,
        props: { background: 'bg-red-500', image: image },
        slot: ''
    };
    
    const dEdit: ModalSettings = {
        type: 'component',
        component: modalComponentEdit,
        title: 'HI',
        body: `message`,
        response: async (data : ImageInterface) => {
            setImage(data)
        }
    };

    //---------------------------------

    let modalComponentAdd: ModalComponent = {
        ref: ImageEditModal,
        props: { background: 'bg-red-500' },
        slot: ''
    };
    
    const dAdd: ModalSettings = {
        type: 'component',
        component: modalComponentAdd,
        title: 'HI',
        body: `message`,
        response: async (data : ImageInterface) => {
            setImage(data)
        }
    };

    function openModal(modalSettings : ModalSettings) {
        modalStore.trigger(modalSettings);
    }

    //-------------------------------------------

    function setImage(data : ImageInterface) {
        if (!data){ return };
        image = data;
        modalComponent.props.image = image;
        modalComponentEdit.props.image = image;
        imageStore.set(image)
    }


</script>

<div class="space-y-4">
    <Image image={image} css="rounded-container-token"/>
    <div class="text-center">
        <div class="btn-group variant-filled">
            <button class="variant-filled" on:click={() => openModal(d)} type="button">Change</button>
            <button class="variant-filled" on:click={() => openModal(dEdit)} type="button">Edit</button>
            <button class="variant-filled" on:click={() => openModal(dAdd)} type="button">New</button>
        </div>
    </div>
</div>