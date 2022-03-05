<script>
  import Header from "../components/Header/index.svelte";
  import Authentication from "../components/Authentication/index.svelte";
  import Scripts from "../components/Scripts/index.svelte";

  export let scripts = [];
</script>

<svelte:head>
  <title>Taas | Test script</title>
</svelte:head>

<Header activePage="scripts" />
<main>
  <Authentication>
    <Scripts {scripts} />
  </Authentication>
</main>
