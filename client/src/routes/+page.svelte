<script>
    import PanelList from '$components/home/PanelList.svelte';
    import Sidebar from '$components/home/Sidebar.svelte';
</script>

<div class="flex h-screen">
    <!-- Sidebar -->
    <div class="bg-gray-800 text-white w-64 flex-none">

    </div>
  
    <!-- Main content -->
    <div class="flex-grow">
        <PanelList />
    </div>
  </div>
