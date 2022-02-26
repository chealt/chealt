<script>
  export let label;
  export let name;
</script>

<label>
  <span class="input-label">{label}</span>
  <input type="file" {name} />
</label>
