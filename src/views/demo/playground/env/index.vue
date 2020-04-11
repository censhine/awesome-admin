<template>
  <aw-container type="card">
    <template slot="header">process.env</template>
    <aw-highlight :code="env"/>
  </aw-container>
</template>

<script>
export default {
  data () {
    return {
      env: JSON.stringify(process.env, null, 2)
    }
  }
}
</script>
