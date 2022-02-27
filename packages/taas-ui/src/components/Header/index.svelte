<script>
  import Nav from "./nav.svelte";

  export let activePage;
</script>

<header>
  <div class="home-link">TaaS</div>
  <Nav {activePage} />
</header>

<style>
  header {
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: var(--font-size--l);
  }

  header > * {
    color: var(--color-primary);
  }

  .home-link {
    padding: var(--gutter-size--l);
  }
</style>
