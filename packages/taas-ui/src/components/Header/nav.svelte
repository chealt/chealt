<script>
  export let activePage;
  const pages = [
    {
      name: "home",
      isActive: activePage === "home",
      href: "/",
      displayName: "Home",
    },
    {
      name: "upload",
      isActive: activePage === "upload",
      href: "/upload",
      displayName: "Upload",
    },
  ];
</script>

<nav>
  <ul>
    {#each pages as page}
      <li>
        <a
          href={page.href}
          aria-current={page.isActive ? "page" : undefined}
          class={page.isActive ? "active" : ""}>{page.displayName}</a
        >
      </li>
    {/each}
  </ul>
</nav>

<style>
  nav {
    display: flex;
    flex-grow: 1;
    flex-direction: row;
    justify-content: flex-end;
  }

  li {
    position: relative;
  }

  ul {
    display: flex;
  }

  :global(header button) {
    border-radius: 0 0 var(--border-radius) var(--border-radius);
  }

  a {
    padding: var(--gutter-size--l);
    position: relative;
    display: flex;
    flex-direction: column;
    border-radius: 0 0 var(--border-radius) var(--border-radius);
  }

  :global(header button:active, header button:focus),
  a:active,
  a:focus {
    background-color: var(--color-highlight);
    outline: 0 none;
  }

  a.active::before {
    content: "";
    border: 4px solid var(--color-primary);
    position: absolute;
    top: 0;
    left: var(--gutter-size);
    right: var(--gutter-size);
  }
</style>
