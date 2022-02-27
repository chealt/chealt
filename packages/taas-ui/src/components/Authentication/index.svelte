<script>
  import { onMount } from "svelte";

  import service from "./service";
  import { isAuthenticated, isLoading, user } from "./store";
  import Form from "../Form/index.svelte";
  import Button from "../Form/Button/index.svelte";

  onMount(async () => {
    const client = await service.createClient();

    isAuthenticated.set(await client.isAuthenticated());
    user.set(await client.getUser());
    isLoading.set(false);
  });
</script>

{#if $isLoading}
  Signing in...
{:else if !$isAuthenticated}
  <Form>
    <Button onClick={service.loginWithPopup}>Log in</Button>
  </Form>
{:else}
  <slot />
{/if}
