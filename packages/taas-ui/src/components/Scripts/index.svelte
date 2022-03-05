<script>
  import Table from "../Table/index.svelte";
  import Head from "../Table/head.svelte";
  import HeadColumn from "../Table/headColumn.svelte";
  import Body from "../Table/body.svelte";
  import Row from "../Table/row.svelte";
  import Column from "../Table/column.svelte";

  export let scripts = [];
</script>

<Table>
  <Head>
    <HeadColumn>name</HeadColumn>
    <HeadColumn>last modified</HeadColumn>
  </Head>
  <Body>
    {#each scripts as script}
      <Row>
        <Column>{script.path}</Column>
        <Column
          >{Intl.DateTimeFormat(undefined, {
            dateStyle: "full",
            timeStyle: "medium",
          }).format(new Date(script.lastModified))}</Column
        >
      </Row>
    {/each}
  </Body>
</Table>
