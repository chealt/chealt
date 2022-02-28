<script>
  import Form from "../Form/index.svelte";
  import File from "../Form/Input/file.svelte";
  import Hidden from "../Form/Input/hidden.svelte";
  import Button from "../Form/Button/index.svelte";
  import service from "../Authentication/service";

  const accessToken = service.getAccessToken();
</script>

<Form hasFiles accept=".js">
  {#await accessToken then value}
    <Hidden name="accessToken" {value} />
  {/await}
  <File name="testScript" label="Test Script" />
  <Button type="submit">Upload</Button>
</Form>
