<script>
  export let legend;
</script>

<fieldset>
  <legend>{legend}</legend>
  <slot />
</fieldset>

<style>
  fieldset {
    border: 0 none;
    margin: 0;
    padding-block: 0;
    padding-inline: 0;
    margin-inline: 0;
    padding: var(--gutter-size--l);
  }

  fieldset > legend {
    padding-inline: 0;
  }
</style>
