<script>
  import Header from "../components/Header/index.svelte";
  import Authentication from "../components/Authentication/index.svelte";
  import Scripts from "../components/Scripts/index.svelte";
</script>

<svelte:head>
  <title>Taas | Test script</title>
</svelte:head>

<Header activePage="scripts" />
<main>
  <Authentication>
    <Scripts />
  </Authentication>
</main>
