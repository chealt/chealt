<script>
  export let type = "button";
  export let style;
  export let onClick;
</script>

<button {type} class={style} on:click={onClick}>
  <slot />
</button>

<style>
  button {
    background-color: transparent;
    box-shadow: var(--drop-shadow);
    font-size: var(--font-size);
    cursor: pointer;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    position: relative;
  }

  button.ghost {
    border: 0 none;
    box-shadow: none;
  }

  :global(button svg) {
    min-width: 32px;
    min-height: 32px;
  }
</style>
