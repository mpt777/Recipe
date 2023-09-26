<script lang="ts">
	import type { ModalComponent, ModalSettings } from "@skeletonlabs/skeleton";
    import { getModalStore } from '@skeletonlabs/skeleton';
    import ImageModal from "./ImageModal.svelte";
	const modalStore = getModalStore();

    const modalComponent: ModalComponent = {
        ref: ImageModal,
        props: { background: 'bg-red-500' },
        slot: '<p>Skeleton</p>'
    };
    
    const d: ModalSettings = {
        type: 'component',
        component: modalComponent,
        title: 'HI',
        body: `message`,
        response: async (r: boolean) => {
            console.log('ModalSettings', r);
        }
    };

    function openModal() {
        modalStore.trigger(d);
    }
    
</script>

<div>
    <button class="btn variant-filled" on:click={openModal} type="button">Edit Image</button>
</div>