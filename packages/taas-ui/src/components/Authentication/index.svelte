<script>
  import { onMount } from "svelte";

  import service from "./service";
  import { isAuthenticated, user } from "./store";
  import Form from "../Form/index.svelte";
  import Button from "../Form/Input/button.svelte";

  let auth0Client;

  onMount(async () => {
    auth0Client = await service.createClient();

    isAuthenticated.set(await auth0Client.isAuthenticated());
    user.set(await auth0Client.getUser());
  });

  const login = () => {
    service.loginWithPopup(auth0Client);
  };

  const logout = () => {
    service.logout(auth0Client);
  };
</script>

{#if !$isAuthenticated}
  <Form>
    <Button onClick={login}>Log in</Button>
  </Form>
{:else}
  <slot />
{/if}
