<header />
<main>
  <slot />
</main>
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
    --color-primary: #1d3156;
    --color-primary-text: #090e1a;
    --color-highlight: #ffc410;

    /* SHADOWS */
    --drop-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);

    /* BORDERS */
    --border-color--primary: var(--color-primary);
    --border-radius: 0.4rem;
  }

  :global(body, html) {
    margin: 0;
    padding: 0;
  }

  :global(body) {
    font-size: var(--font-size);
    padding: var(--gutter-size--l);
  }

  :global(*) {
    font-family: system-ui;
    color: var(--color-primary-text);
  }
</style>
