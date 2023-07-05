<script>
  export let form;

  import api from "$utils/api";
  import { enhance } from '$app/forms';

  async function test() {
    console.log(await api.get("auth"));
  }

</script>

<section>
  <form action="/auth/login" method="POST">
      <div class="border border-gray-300 bg-white rounded-lg shadow-lg p-4">
          <h2 class="text-xl font-semibold mb-4">Login</h2>
          <div class="group">
              <label for="username">Username</label>
              <input type="username" name="username" id="username" required />
          </div>
          
          <div class="group">
              <label for="password">Password</label>
              <input type="password" name="password" id="password" required />
          </div>
          
          <div class="submit-container">
              <button type="submit" >Login</button>
          </div>

          {#if form?.success }
          <p class="error">Success Loging In!.</p>
          {/if }
      </div>
      {form}
  </form>

  <div>
    <button on:click={test}>Test Login</button>
  </div>
</section>
<!---
<section>
  <div class="border border-gray-300 bg-white rounded-lg shadow-lg p-4">
    <h2 class="text-xl font-semibold mb-4">Login</h2>
    <div class="group">
      <label for="email">Email</label>
      <input type="email" name="email" id="email" required bind:value={username} />
    </div>
  
    <div class="group">
      <label for="password">Password</label>
      <input type="password" name="password" id="password" required bind:value={password}/>
    </div>
  
    <div class="submit-container">
      <button type="button" on:click={login}>Login Up</button>
    </div>
  </div>

  {#if error}
    <div class="notice error">
      {error}
    </div>
  {/if}
  
</section>


<script>
  import api from "$utils/api";
  import setAuthToken from "$utils/auth";

  let username = "";
  let password = "";
  let error = "";
  async function login(e) {
    e.preventDefault();
    const response = await api.post("auth/login", {
      username: username,
      password: password
    });
    console.log(response)
    if (response.ok){
      setAuthToken(response.token);
      username = "";
      password = "";
    }
    else {
      error = response.error;
    }
    
  }
</script>
-->