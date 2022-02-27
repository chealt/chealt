<script>
  import Button from "../Form/Button/index.svelte";
  import Nav from "./nav.svelte";
  import UserAvatar from "../Icons/UserAvatar.svelte";
  import { isAuthenticated } from "../Authentication/store";
  import service from "../Authentication/service";
  import Popover from "../Popover/index.svelte";

  export let activePage;
  let userMenuOpen = false;
</script>

<header>
  <div class="home-link">TaaS</div>
  <Nav {activePage} />
  {#if $isAuthenticated}
    <Button style="ghost" onClick={() => (userMenuOpen = !userMenuOpen)}>
      <UserAvatar />
      <Popover isOpen={userMenuOpen}>
        <ul>
          <li>
            <Button onClick={service.logout}>Log out</Button>
          </li>
        </ul>
      </Popover>
    </Button>
  {/if}
</header>

<style>
  header {
    display: flex;
    flex-direction: row;
    align-items: stretch;
    font-size: var(--font-size--l);
    margin-right: var(--gutter-size--l);
  }

  header > * {
    color: var(--color-primary);
  }

  .home-link {
    padding: var(--gutter-size--l);
  }
</style>
