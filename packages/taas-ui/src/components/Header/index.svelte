<header>
  <div class="home-link">TaaS</div>
  <nav>
    <ul>
      <li>
        <a href="/">Upload</a>
      </li>
    </ul>
  </nav>
</header>

<style>
  header {
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: var(--font-size--xl);
  }

  header > * {
    color: var(--color-primary);
  }

  .home-link,
  nav li {
    padding: var(--gutter-size--l);
  }

  nav {
    display: flex;
    flex-grow: 1;
    justify-content: flex-end;
  }

  a {
    text-decoration: none;
  }
</style>
