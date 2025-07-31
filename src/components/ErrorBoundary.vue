<template>
  <div v-if="hasError" class="error-boundary">
    <div class="error-content">
      <div class="i-ri-error-warning-line text-6 text-red mb-4"></div>
      <h3>出现了一些问题</h3>
      <p class="error-message">{{ errorMessage }}</p>
      <button @click="retry" class="retry-btn">
        重试
      </button>
    </div>
  </div>
  <slot v-else />
</template>

<script setup lang="ts">
const hasError = ref(false)
const errorMessage = ref('')

const retry = () => {
  hasError.value = false
  errorMessage.value = ''
  // 刷新页面
  window.location.reload()
}

// 捕获全局错误
onMounted(() => {
  window.addEventListener('error', (event) => {
    hasError.value = true
    errorMessage.value = event.message || '未知错误'
  })
  
  window.addEventListener('unhandledrejection', (event) => {
    hasError.value = true
    errorMessage.value = event.reason?.message || '网络请求失败'
  })
})
</script>

<style scoped>
.error-boundary {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  padding: 2rem;
}

.error-content {
  text-align: center;
  max-width: 400px;
}

.error-message {
  color: #666;
  margin: 1rem 0;
}

.retry-btn {
  background: #f59e0b;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  cursor: pointer;
}

.retry-btn:hover {
  background: #d97706;
}
</style>