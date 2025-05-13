<template>
    <div :class="bem.b()" :style="{
        '--preview-container-width': `${width * scale}px`,
        '--preview-container-height': `${height * scale}px`,
        '--preview-iframe-width': `${width}px`,
        '--preview-iframe-height': `${height}px`,
        '--preview-scale': scale
    }">
        <div :class="bem.e('container')">
            <iframe :srcdoc="htmlCode" frameborder="0"></iframe>
        </div>
    </div>
</template>

<script setup lang="ts">
import { createNamespace } from '@kfl-vue/utils/create'
import { ref, computed } from 'vue'

defineOptions({ name: 'kfl-html-preview' })

const bem = createNamespace('html-preview')
const width = ref<number>(1920)
const height = ref<number>(1080)
const props = defineProps({
    htmlCode: {
        type: String,
        required: true,
        default: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body { margin: 0; padding: 16px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; }
          </style>
        </head>
        <body>hello world</body>
      </html>
    `
    },
    scale: {
        type: Number,
        default: 0.41,
        validator: (value: number) => value >= 0.1 && value <= 0.88
    }
})

const scale = computed(() => {
    const value = props.scale;
    if (value < 0.1) return 0.1;
    if (value > 0.88) return 0.88;
    return value;
});
</script>