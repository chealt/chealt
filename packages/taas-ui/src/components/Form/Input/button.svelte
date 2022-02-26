<script>
  export let type;
</script>

<button {type}>
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
  }
</style>
