<template>
    <t-dialog v-model:show="isShowDrawer"
              class="power-limitation-dialog"
              :position="positionDialog"
              :tabIndex="1"
              :no-backdrop-dismiss="false">
        <div class="power-limitation-body">
            <div class="power-limitation-header">
                <t-label class="power-limitation-title"
                         :tabIndex="1"
                         valueType="static"
                         :showHint="true"
                         :constValue="title">
                </t-label>
                <t-button class="tr-button-icon-text2"
                          label=""
                          icon="fas dx-icon icon-t-delete-01"
                          :showHint="true"
                          :tabIndex="1"
                          @click="closeDrawer">
                </t-button>
            </div>
            <div class="power-limitation-content">
                <div class="power-slider-row"
                     :style="{ '--fill': `${percent}%` }">
                    <input class="power-slider"
                           type="range"
                           :min="minValue"
                           :max="maxValue"
                           :step="step"
                           :value="currentValue"
                           @input="onInput"
                           ref="sliderRef" />
                    <span class="power-current"
                          :style="{ left: `${thumbLeft}px` }">{{ currentValue }}kW</span>
                    <div class="power-slider-labels">
                        <span class="power-boundary">{{ minValue }}kW</span>
                        <span class="power-boundary power-boundary-end">{{ maxValue }}kW</span>
                    </div>
                </div>
            </div>
            <div class="power-limitation-footer">
                <t-button class="tr-button-default power-action-btn"
                          :label="tt('common.cancel', '取消')"
                          :showHint="true"
                          :tabIndex="1"
                          @click="handleCancel">
                </t-button>
                <t-button class="tr-button-primary power-action-btn"
                          :label="tt('common.confirm', '确定')"
                          :showHint="true"
                          :tabIndex="1"
                          @click="handleConfirm">
                </t-button>
            </div>
        </div>
    </t-dialog>
</template>

<script setup>

import { pageText } from '../pages/i18n';
const tt = pageText;

import { computed, inject, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue';


const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: '功率限制'
  },
  minValue: {
    type: Number,
    required: false,
    default: 1
  },
  maxValue: {
    type: Number,
    required: true
  },
  value: {
    type: Number,
    default: null
  },
  step: {
    type: Number,
    default: 1
  }
});
const IsPC = inject('IsPC', ref(window.innerWidth >= 768));
const positionDialog = ref('bottom');
watch(
  IsPC,
  (isPC) => {
    positionDialog.value = isPC ? 'standard' : 'bottom';
  },
  { immediate: true }
);
const emit = defineEmits([ 'update:modelValue', 'cancel', 'confirm' ]);

const isShowDrawer = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
});

const clampValue = (value) => {
  const min = Number(props.minValue);
  const max = Number(props.maxValue);
  if (Number.isNaN(value)) return min;
  return Math.min(max, Math.max(min, value));
};

const currentValue = ref(clampValue(props.value ?? props.minValue));

watch(() => props.value, (value) => {
  if (value == null) return;
  currentValue.value = clampValue(Number(value));
});

watch([ () => props.minValue, () => props.maxValue ], () => {
  currentValue.value = clampValue(currentValue.value);
});

const percent = computed(() => {
  const min = Number(props.minValue);
  const max = Number(props.maxValue);
  if (max <= min) return 0;
  return ((currentValue.value - min) / (max - min)) * 100;
});

const sliderRef = ref(null);
const thumbLeft = ref(0);
const thumbSize = 16;

const updateThumbLeft = () => {
  if (!sliderRef.value) return;
  const rect = sliderRef.value.getBoundingClientRect();
  const availableWidth = rect.width - thumbSize;
  thumbLeft.value = sliderRef.value.offsetLeft + (availableWidth * percent.value) / 100 + thumbSize / 2;
};

const onInput = (event) => {
  currentValue.value = clampValue(Number(event.target.value));
  updateThumbLeft();
};

const closeDrawer = () => {
  emit('update:modelValue', false);
};

const handleCancel = () => {
  emit('cancel');
  closeDrawer();
};

const handleConfirm = () => {
  emit('confirm', currentValue.value);
  closeDrawer();
};

watch(percent, async () => {
  await nextTick();
  updateThumbLeft();
});

watch(isShowDrawer, async (value) => {
  if (!value) return;
  await nextTick();
  setTimeout(() => {
    updateThumbLeft();
  }, 300);
});

onMounted(() => {
  window.addEventListener('resize', updateThumbLeft);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateThumbLeft);
});
</script>

<style scoped>
.power-limitation-body {
  background: #ffffff;
  width: 420px;
  border-radius: 8px !important;
  overflow: hidden;
  @media screen and (max-width: 768px) {
    border-radius: 12px 12px 0 0 !important;
  }
}

.power-limitation-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  border-bottom: 1px solid #eeeeee;
  @media screen and (max-width: 768px) {
    border-bottom: none;
  }
}

.power-limitation-title {
  font-size: 14px;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.8);
}

.power-limitation-content {
  padding: 40px 24px 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.power-slider-row {
  display: flex;
  flex-direction: column;
  gap: 12px;
  position: relative;
  padding-top: 24px;
}

.power-boundary {
  font-size: 12px;
  color: rgba(0, 0, 0, 0.56);
  text-align: center;
}

.power-boundary-end {
  margin-left: auto;
}

.power-slider {
  width: 100%;
  -webkit-appearance: none;
  appearance: none;
  height: 8px;
  border-radius: 999px;
  background: linear-gradient(
    to right,
    var(--t-color) 0%,
    var(--t-color) var(--fill),
    #e5e7eb var(--fill),
    #e5e7eb 100%
  );
  outline: none;
}

.power-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #ffffff;
  border: 2px solid var(--t-color);
  cursor: pointer;
}

.power-slider::-moz-range-thumb {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #ffffff;
  border: 2px solid var(--t-color);
  cursor: pointer;
}

.power-slider-labels {
  position: relative;
  display: flex;
  align-items: center;
  height: 18px;
}

.power-current {
  position: absolute;
  top: 0;
  transform: translateX(-50%);
  font-size: 12px;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.8);
  white-space: nowrap;
  pointer-events: none;
}

.power-limitation-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding: 12px 24px 16px;
  border-top: 1px solid #e5e7eb;
  @media screen and (max-width: 768px) {
    border-top: none;
  }
}

.power-action-btn {
  min-width: 72px;
  @media screen and (max-width: 768px) {
    width: 100%;
    height: 44px;
  }
}
</style>
