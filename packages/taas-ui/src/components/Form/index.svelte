<form>
  <slot />
</form>

<style>
  form {
    padding: var(--gutter-size--l);
    display: flex;
    flex-direction: column;
    gap: var(--gutter-size--l);
  }

  :global(form label) {
    display: flex;
    flex-direction: column;
    gap: var(--gutter-size);
  }

  :global(form input, button) {
    border: 1px solid var(--border-color--primary);
    border-radius: var(--border-radius);
    padding: var(--gutter-size);
  }

  :global(form input:active, form input:focus, button:active, button:focus) {
    outline: 2px solid var(--color-highlight);
  }
</style>
