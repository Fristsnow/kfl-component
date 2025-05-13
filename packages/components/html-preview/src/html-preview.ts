import type { ExtractPropTypes } from 'vue'

export const htmlPreviewProps = {
  htmlCode: {
    type: String,
    required: true
  },
  width: {
    type: [Number, String],
    default: 1920
  },
  height: {
    type: [Number, String],
    default: 1080
  },
  scale: {
    type: Number,
    default: 0.41
  }
} as const

export type HtmlPreviewProps = ExtractPropTypes<typeof htmlPreviewProps>