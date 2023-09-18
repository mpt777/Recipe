<script>
    import { SlideToggle } from '@skeletonlabs/skeleton';
    let wakeLock = null;

    $: value = false;
  
    $: {
        console.log(value)
        value ? requestWakeLock() : releaseWakeLock();
    }
    const requestWakeLock = async () => {
      try {
        wakeLock = await navigator.wakeLock.request('screen');
        console.log('Wake lock acquired');
      } catch (error) {
        console.error('Failed to acquire wake lock:', error);
      }
    };
  
    const releaseWakeLock = () => {
      if (wakeLock) {
        wakeLock.release();
        console.log('Wake lock released');
        wakeLock = null;
      }
    };
  </script>

<SlideToggle size="sm" name="wakelock" bind:checked={value} label="Wake Lock">Prevent Sleep</SlideToggle>