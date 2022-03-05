<script>
  export let isOpen = false;
</script>

<div class="popover {isOpen ? 'open' : ''}" role="menu">
  <slot />
</div>

<style>
  .popover {
    position: absolute;
    top: 100%;
    width: 200px;
    right: 0;
    background-color: var(--color-background--primary);
    box-shadow: rgba(23, 24, 24, 0.05) 0 0 5px 0,
      rgba(0, 0, 0, 0.15) 0 1px 2px 0;
    border-radius: var(--border-radius);
    overflow: hidden;
    opacity: 0;
    visibility: hidden;
    transition: opacity ease-in 100ms;
  }

  .popover.open {
    opacity: 1;
    visibility: visible;
  }

  :global(.popover li) {
    display: flex;
  }

  :global(.popover li > *) {
    display: flex;
    flex-grow: 1;
    border: 0 none;
    box-shadow: none;
  }
</style>
