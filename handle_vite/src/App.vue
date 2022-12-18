<template>
  <div class="container">
    <h1>大家好 依然范特西</h1>
    <h2>
      <span> count is {{ count }}</span>
        <button @click="count++">+1</button>
    </h2>
  </div>
</template>
<script>
import { ref } from 'vue'

export default{
    setup() {
        const count = ref(6);
        function add() {
            count.value++;
        }
        return { count };
    }
}
</script>
