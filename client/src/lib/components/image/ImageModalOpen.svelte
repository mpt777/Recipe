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
    function openModal() {
        modalStore.trigger(d);
    }

    //---------------------------------

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
    function openModalEdit() {
        modalStore.trigger(dEdit);
    }

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
    function openModalAdd() {
        modalStore.trigger(dAdd);
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

<div>
    <Image image={image}/>
    <button class="btn variant-filled" on:click={openModal} type="button">Change</button>
    <button class="btn variant-filled" on:click={openModalEdit} type="button">Edit</button>
    <button class="btn variant-filled" on:click={openModalAdd} type="button">Upload</button>
</div>