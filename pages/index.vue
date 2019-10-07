<template class="template">
  <div class="app">
    <Header/>
    <Field/>
  </div>
</template>

<script>
import Field from '@/components/Field';
import Header from '@/components/Header';

export default {
  components: {
    Field,
    Header
  }
}
</script>

<style scoped type="scss">
  .app{
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 50px;
  }
</style>
