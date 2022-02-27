<script>
  import Header from "../components/Header/index.svelte";
  import Home from "../components/Home/index.svelte";
</script>

<svelte:head>
  <title>Taas</title>
</svelte:head>

<Header activePage="home" />
<main>
  <Home />
</main>
