<script>
  import Form from "../Form/index.svelte";
  import Fieldset from "../Form/Fieldset/index.svelte";
  import File from "../Form/Input/file.svelte";
  import Button from "../Form/Button/index.svelte";
</script>

<Form>
  <File name="test-script" label="Test Script" />
  <Button type="submit">Upload</Button>
</Form>
