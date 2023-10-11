<script>
    import { iapi } from "$utils/api";
    let file = null;
    let uploading = false;
    let uploadProgress = 0;
  
    const uploadFile = async () => {
      if (!file) return;
  
      uploading = true;
  
      const formData = new FormData();
      formData.append('file', file);
  
      try {
        const response = await iapi('common/image/upload', {
          method: 'POST',
          body: formData,
          // You may need to set appropriate headers based on your server requirements
          // headers: { 'Authorization': 'Bearer YOUR_ACCESS_TOKEN' }
        });
  
        if (response.ok) {
          // File upload success
          console.log('File uploaded successfully');
        } else {
          // Handle errors if the server responded with an error status
          console.error('File upload failed:', response.statusText);
        }
      } catch (error) {
        // Handle network errors or any other exceptions
        console.error('File upload failed:', error.message);
      }
  
      uploading = false;
    };
  </script>
  
  <main>
    <input type="file" on:change={(event) => (file = event.target.files[0])} disabled={uploading} />
    <button on:click={uploadFile} disabled={uploading || !file}>
      {uploading ? 'Uploading...' : 'Upload'}
    </button>
  </main>