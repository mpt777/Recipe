<section>
  <div class="border border-gray-300 bg-white rounded-lg shadow-lg p-4">
    <h2 class="text-xl font-semibold mb-4">Signup</h2>
    <div class="group">
      <label for="email">Email</label>
      <input type="email" name="email" id="email" required bind:value={username} />
    </div>
  
    <div class="group">
      <label for="password">Password</label>
      <input type="password" name="password" id="password" required bind:value={password}/>
    </div>
  
    <div class="submit-container">
      <button type="button" on:click={createUser}>Sign Up</button>
    </div>
  </div>
  
</section>

<script>
  import api from "$utils/api";
  import setAuthToken from "$utils/auth";

  let username = "";
  let password = ""
  async function createUser(e) {
    e.preventDefault();
    const response = await api.post("auth/signup", {
      username: username,
      password: password
    });
    console.log(response);
    setAuthToken(response.data.token)

    username = "";
    username = "";
  }
</script>