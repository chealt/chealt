<slot />
<footer />

<style>
  :root {
    /* SPACING */
    --gutter-size: 8px;
    --gutter-size--l: 1.2rem;

    /* FONTS */
    --font-size--xl: 1.4rem;
    --font-size--l: 1.2rem;
    --font-size: 16px;
    --font-size--s: 0.9rem;
    --font-size--xs: 0.8rem;

    /* COLORS */
    --color-background: #f6f6f7;
    --color-background--primary: white;
    --color-primary: #1d3156;
    --color-primary--light: #bdc6d6;
    --color-primary-text: #090e1a;
    --color-accent-text: white;
    --color-highlight: #ffc410;

    /* SHADOWS */
    --drop-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);

    /* BORDERS */
    --border-color--primary: var(--color-primary);
    --border-color--light: var(--color-primary--light);
    --border-radius: 0.4rem;
    --border-radius--l: 0.8rem;
  }

  :global(body, html) {
    margin: 0;
    padding: 0;
  }

  :global(body) {
    font-size: var(--font-size);
    background-color: var(--color-background);
  }

  :global(*) {
    font-family: system-ui;
    color: var(--color-primary-text);
  }

  :global(ul) {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  :global(main) {
    margin: var(--gutter-size--l);
    padding: var(--gutter-size--l);
    border-radius: var(--border-radius--l);
    background-color: var(--color-background--primary);
    box-shadow: rgba(23, 24, 24, 0.05) 0 0 5px 0,
      rgba(0, 0, 0, 0.15) 0 1px 2px 0;
  }
</style>
