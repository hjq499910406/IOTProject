<template>
  <Teleport to="body" v-if="visible">
    <div class="replay-overlay" @click="handleClose"></div>
    <div class="replay-modal">
      <div class="detail-header">
        <h3>{{ device?.name || '视频回放' }}</h3>
        <button class="close-btn" @click="handleClose">×</button>
      </div>

      <!-- 日期区域 -->
      <div class="datetime-section">
        <div class="section-title">{{ tt('common.date', '日期') }}</div>
        <div class="date-inputs">
          <input
            type="date"
            v-model="selectedDate"
            :min="minDate"
            :max="maxDate"
            class="date-input"
            @keydown.prevent 
            @paste.prevent 
            @drop.prevent 
            @change="selectQuickDate(selectedDate)"
          />
          <div class="quick-dates">
            <t-button
                v-for="item in quickDateOptions"
                :key="item.value"
                class="fasr_button_ed5180 tr-button-default"
                :class="{ active: selectedDate === item.value }"
                @click="selectQuickDate(item.value)"
                style='margin-right: 8px;'
                :label='item.label'
                instanceCode='fasr_button_ed5180'
                :showHint='true'
                :tabIndex='1'
            >
            </t-button>
          </div>
        </div>

        <!-- 时间区域 -->
        <div class="section-title" style="margin-top: 20px">{{ tt('common.timeRange', '时间（HH:mm:ss ~ HH:mm:ss）') }}</div>
        <div class="time-inputs">
          <input
            type="text"
            v-model="selectedTime"
            readonly
            :placeholder="tt('video.timeRangeExample', '如 00:00:00 ~ 23:59:59')"
            class="time-input"
            @blur="validateTime"
          />
          <t-button
            style='margin-right: 8px;'
            class='tr-button-default'
            :label="tt('video.loadVideo', '加载视频')"
            instanceCode='fasr_button_123'
            :showHint='true'
            :tabIndex='1'
            @click="callChildMethod"
            :disabled="isValidDateTime" 
        >
        </t-button>
          <div class="quick-times">
            <t-button
                v-for="time in props.timeRange"
                :key="time"
                class="fasr_button_ed5180 tr-button-default"
                :class="{ active: selectedTime == time }"
                @click="selectQuickTime(time)"
                style='margin-right: 8px;'
                :label='time'
                instanceCode='fasr_button_ed5180'
                :showHint='true'
                :tabIndex='1'
            >
            </t-button>
          </div>
        </div>
      </div>

      <!-- 视频区域 -->
      <div class="video-section">
        <div class="deviceImgContent"
            :style="{height:'100%',backgroundColor: '#000'}">
            <div style="height: 100%;">
                <HlsPlayer
                ref="childRef"
                :item="device"
                :play="false"
                :TenantId="props.TenantId"
                :timeValue="selectedDate + ' ' +selectedTime"
                />
            </div>
        </div>
        <div v-if="loading" class="placeholder">{{ tt('common.loading', '加载中...') }}</div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>

import { pageText } from '../pages/i18n';
const tt = pageText;

import { ref, computed, onMounted } from 'vue';
import HlsPlayer from './HlsPlayer.vue';


const props = defineProps({
  visible: { type: Boolean, default: false },
  device: { type: Object, default: () => null },
  TenantId: { type: String, required: false },
  timeRange: { type: Array, default: () => [] },
});

const emit = defineEmits([ 'update:visible', 'close' ],[ 'update:timeRange' ]);

// 状态
const selectedDate = ref('');
const selectedTime = ref('');
const isValidDateTime = ref(false);
const loading = ref(false);

// 日期范围：近30天
const today = new Date();
const formatDateISO = (d) => d.toISOString().split('T')[ 0 ];

const maxDate = computed(() => formatDateISO(today));
const minDate = computed(() => {
  const d = new Date(today);
  d.setDate(d.getDate() - 30);
  return formatDateISO(d);
});

// 快捷日期选项
const quickDateOptions = computed(() => {
  const d = new Date();
  return [
    { label: '今天', value: formatDateISO(new Date(d)) },
    { label: '昨天', value: formatDateISO(new Date(d.setDate(d.getDate() - 1))) },
    { label: '前天', value: formatDateISO(new Date(d.setDate(d.getDate() - 1))) }
  ];
});

// 初始化默认值
onMounted(() => {
  selectedDate.value = maxDate.value;
  selectedTime.value = '00:00:00 ~ 23:59:59';
});

// 快捷选择
const selectQuickDate = async (date) => {
  selectedDate.value = date;
  if(props.device.NetState != 1){
    Funcs.Notify('提示', '设备离线，无法回放视频', 'error');
    return;
  }
  const StartTime = date + ' 00:00:00';
  const EndTime = date + ' 23:59:59';
  const postData = {
    TenantId: props.TenantId,
    DeviceKey: props.device.DeviceKey,
    ProductKey: props.device.ProductKey,
    ActionId: 'GBRecordQuery',
    WaitForResponse: true,
    Params:[ { 'Name':'StartTime','Value':StartTime },{ 'Name':'EndTime','Value':EndTime } ],
  };
  const result = await TFF.common.ajax.getDataAsync({
    url: TFF.common.ajax.getServiceUrl('IRouter-InvokeDeviceAction_External'),
    type: 'post',
    data: { request: JSON.stringify(postData) }
  });
  if(result.state == 0){
    Funcs.Notify('提示', result.errmsg, 'error');
        
  }
  else{
    if(result?.data?.OutputParams.length > 0){
      const recordList = result?.data?.OutputParams.find(item => item.Name === 'RecordList')?.Value || [];
      if(recordList.length == 0){
        Funcs.Notify('提示', '暂无可回放视频', 'error');
        isValidDateTime.value = true;
        emit('update:timeRange', []); // 通知父组件更新
        return;
      }
      isValidDateTime.value = false;
      const newList = recordList.map(item => {
        return `${ item.startTime.split(' ')[ 1 ] } ～ ${ item.endTime.split(' ')[ 1 ] }`;
      });
      emit('update:timeRange', newList); // 通知父组件更新
    }
  }
};
const selectQuickTime = (time) => {
  selectedTime.value = time;
};

// 验证时间格式
const validateTime = () => {
  const str = selectedTime.value.trim();
  let result = false;
  // 支持 " ～ " 或 " ～ "，允许空格
  const regex = /^\s*(\d{2}):(\d{2}):(\d{2})\s*[~～]\s*(\d{2}):(\d{2}):(\d{2})\s*$/;
  const match = str.match(regex);
    
  if (!match || match == null){
    result = false;
  }
  else{
    const [ , h1, m1, s1, h2, m2, s2 ] = match.map(Number);
    const isValid = (h, m, s) => 
      h >= 0 && h <= 23
            && m >= 0 && m <= 59
            && s >= 0 && s <= 59;

    result = isValid(h1, m1, s1) && isValid(h2, m2, s2);
  }
  if(!result){
    selectedTime.value = '00:00:00 ~ 23:59:59';
    Funcs.Notify('提示', '时间格式不正确', 'error');
  }
    
};

// 关闭
const handleClose = () => {
//     if (childRef.value) {
//     childRef.value.handleCancel()
//   }
//   emit('update:visible', false)
  emit('close');
};

const childRef = ref(null);
const callChildMethod = () => {
  if (childRef.value) {
    childRef.value.handleClick();
  }
};
</script>