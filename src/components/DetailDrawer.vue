<template>
    <t-dialog v-model:show="isShowDrawer" class="tr-drawer detail-drawer" position="right" :tabIndex="1"
        :no-backdrop-dismiss="false" :maximized="true">
        <div class="detail-drawer-body">
            <div class="detail-drawer-header">
                <div class="detail-drawer-title">
                    <slot name="title">
                        <t-label class="detail-drawer-title-text" :tabIndex="1" valueType="static" :showHint="true"
                            :constValue="title">
                        </t-label>
                    </slot>
                </div>
                <t-button class="tr-button-icon-text2" label="" icon="fas dx-icon icon-t-delete-01" :showHint="true"
                    :tabIndex="1" @click="closeDrawer">
                </t-button>
            </div>
            <div class="tr-div-drawer detail-drawer-content">
                <slot name="content">
                    <div class="detail-drawer-grid row" rowGap="" columnGap="" responsive="pc-mobile-gear">
                        <div v-for="(item, index) in items" :key="item.key || item.label || index"
                            class="detail-drawer-grid-item row col col-sm-12 col-xs-12" rowGap="" columnGap=""
                            responsive="pc-mobile-gear">
                            <t-label class="detail-drawer-label" valueType="static" :showHint="true" :tabIndex="1"
                                :constValue="item.label || ''">
                            </t-label>
                            <t-label class="detail-drawer-value" valueType="expression" :showHint="true" :tabIndex="1"
                                :labelValue="formatValue(item.value)">
                            </t-label>
                        </div>
                    </div>
                    <div v-if="showRealtimeChart" class="chart-section">
                        <div class="strategy-section-title">发电实时曲线</div>
                        <div ref="realtimeChartRef" class="strategy-chart"></div>
                    </div>
                </slot>
            </div>
            <div class="detail-drawer-footer">
                <t-button class="tr-button-primary detail-drawer-close-btn" label="关闭" :showHint="true" :tabIndex="1"
                    @click="closeDrawer">
                </t-button>
            </div>
        </div>
    </t-dialog>
</template>

<script setup>
import { computed, inject, nextTick, onUnmounted, ref, watch } from 'vue';

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: '查看明细'
  },
  items: {
    type: Array,
    default: () => []
  },
  showRealtimeChart: {
    type: Boolean,
    default: false
  },
  realtimeDeviceId: {
    type: String,
    default: ''
  },
  realtimeMaxPower: {
    type: Number,
    default: 0
  }
});

const emit = defineEmits([ 'update:modelValue', 'close' ]);

const isShowDrawer = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
});

const closeDrawer = () => {
  emit('update:modelValue', false);
  emit('close');
};

const formatValue = (value) => {
  if (typeof value === 'function') {
    return value() ?? '--';
  }
  return value ?? '--';
};

const realtimeRaw = ref([]);
const realtimeChartRef = ref(null);
let realtimeChartInstance = null;
const IsPC = inject('IsPC', ref(window.innerWidth >= 768));

const timeSelectItems = Array.from({ length: 49 }, (_, index) => {
  const totalMinutes = index * 30;
  const hours = String(Math.floor(totalMinutes / 60)).padStart(2, '0');
  const minutes = String(totalMinutes % 60).padStart(2, '0');
  const label = `${ hours }:${ minutes }`;
  return { label, value: label };
});

const toMinutes = (time) => {
  if (!time) return null;
  const text = String(time);
  const timeText = text.includes(' ') ? text.split(' ').pop() : text.includes('T') ? text.split('T').pop() : text;
  const [ hours, minutes ] = timeText.split(':').slice(0, 2).map(Number);
  if (Number.isNaN(hours) || Number.isNaN(minutes)) return null;
  return hours * 60 + minutes;
};

const timeLabels = computed(() => timeSelectItems.map(item => item.value));
const timePoints = computed(() => timeSelectItems.map(item => toMinutes(item.value)).filter(item => item != null));

const toMinuteFromTimestamp = (timestamp) => {
  if (timestamp == null) return null;
  const date = new Date(timestamp);
  if (Number.isNaN(date.getTime())) return null;
  return date.getHours() * 60 + date.getMinutes();
};

const alignMinute = (minute) => {
  if (minute == null) return null;
  const aligned = Math.round(minute / 30) * 30;
  return Math.max(0, Math.min(1440, aligned));
};

const buildRealtimeSeries = (items, points) => {
  const indexMap = new Map(points.map((value, index) => [ value, index ]));
  const charge = points.map(() => null);
  let max = 0;
  items.forEach(item => {
    const minute = alignMinute(toMinuteFromTimestamp(item?.time));
    const index = indexMap.get(minute);
    if (index == null) return;
    const value = Number(item?.mean);
    if (Number.isNaN(value) || value <= 0) return;
    max = Math.max(max, value);
    charge[ index ] = value;
  });
  return { charge, max };
};

const realtimeChartData = computed(() => {
  const points = timePoints.value;
  const { charge, max } = buildRealtimeSeries(realtimeRaw.value, points);
  const limitPower = Math.max(props.realtimeMaxPower || 0, max, 1);
  return {
    charge,
    maxPower: limitPower
  };
});

const createGrid = ({ top }) => ({
  left: 0,
  right: IsPC.value ? 12 : 28,
  top,
  bottom: 28,
  containLabel: true
});

const createAxis = () => ({
  type: 'category',
  boundaryGap: false,
  name: '',
  nameLocation: 'end',
  nameGap: 8,
  nameTextStyle: {
    color: 'rgba(0,0,0,0.55)'
  },
  data: timeLabels.value,
  axisLine: {
    lineStyle: {
      color: 'rgba(0,0,0,0.25)'
    }
  },
  axisTick: {
    show: false
  },
  axisLabel: {
    color: 'rgba(0,0,0,0.65)',
    interval: 0,
    formatter: (value, index) => {
        
      if (IsPC.value) {
        if (index === timeLabels.value.length - 1) return '';
        return index % 8 === 0 ? value : '';
      }
      const maxIndex = Math.max(0, timeLabels.value.length - 1);
      const step = Math.max(1, Math.floor(maxIndex / 3));
      return index % step === 0 ? value : '';
    }
  }
});
const createValueAxis = (min, max) => ({
  type: 'value',
  name: 'kW',
  nameLocation: 'end',
  nameGap: 6,
  nameRotate: 0,
  nameTextStyle: {
    color: 'rgba(0,0,0,0.55)',
    align: 'left',
    padding: [ 0, 0, 0, 0 ]
  },
  min,
  max,
  axisLine: {
    show: true,
    lineStyle: {
      color: 'rgba(0,0,0,0.25)'
    }
  },
  axisTick: {
    show: false
  },
  axisLabel: {
    color: 'rgba(0,0,0,0.65)'
  },
  splitLine: {
    show: false
  }
});

const getRealtimeChartOption = () => {
  const { charge, maxPower } = realtimeChartData.value;
  
  const limit = Math.max(1, Math.ceil(maxPower));
  return {
    grid: createGrid({ top: 36 }),
    legend: {
      top: 0,
      right: 8,
      itemWidth: 10,
      itemHeight: 2,
      textStyle: { color: 'rgba(0,0,0,0.65)' },
      data: [ '发电' ]
    },
    tooltip: { trigger: 'axis' },
    xAxis: createAxis(),
    yAxis: createValueAxis(0, limit),
    series: [
      {
        name: '发电',
        type: 'line',
        data: charge,
        step: 'middle',
        connectNulls: true,
        symbol: 'none',
        lineStyle: { width: 2, color: '#2CBF6E' }
      }
    ]
  };
};

const renderRealtimeChart = () => {
  if (!realtimeChartRef.value) return;
  if (!window.echarts) return;
  if (!realtimeChartInstance) {
    realtimeChartInstance = window.echarts.init(realtimeChartRef.value, null, { renderer: 'canvas' });
  }
  realtimeChartInstance.setOption(getRealtimeChartOption(), true);
  realtimeChartInstance.resize();
};

const fetchRealtimeData = () => {
  if (!props.showRealtimeChart || !props.realtimeDeviceId) {
    realtimeRaw.value = [];
    return;
  }
  TFF.common.ajax.getDataAsync({
    url: TFF.common.ajax.getServiceUrl('IRT-QueryTimeSeriesAggregate_External'),
    type: 'post',
    data: {
      request: JSON.stringify({
        deviceId: props.realtimeDeviceId,
        metricCode: 'p',
        startTime: new Date().setHours(0, 0, 0, 0),
        endTime: Date.now(),
        aggregationInterval: 2,
        aggregations: [ 0 ],
        aggregationMultiplier: 30
      })
    }
  }).then((result) => {
    const data = result?.data?.Items ?? result;
    realtimeRaw.value = Array.isArray(data) ? data : [];
  }).catch((e) => {
    console.error(e);
    Funcs.Notify('提示', '获取实时曲线失败', 'error');
  });
};

watch(realtimeChartData, () => {
  renderRealtimeChart();
}, { deep: true });

watch(isShowDrawer, (value) => {
  if (!value) {
    if (realtimeChartInstance) {
      realtimeChartInstance.dispose();
      realtimeChartInstance = null;
    }
    return;
  }
  if (props.showRealtimeChart) {
    fetchRealtimeData();
    nextTick(() => {
      if (realtimeChartInstance) {
        realtimeChartInstance.dispose();
        realtimeChartInstance = null;
      }
      renderRealtimeChart();
    });
  }
});

watch(() => props.realtimeDeviceId, () => {
  if (isShowDrawer.value && props.showRealtimeChart) {
    fetchRealtimeData();
  }
});

watch(IsPC, () => {
  if (isShowDrawer.value && props.showRealtimeChart) {
    renderRealtimeChart();
  }
});

onUnmounted(() => {
  if (realtimeChartInstance) {
    realtimeChartInstance.dispose();
    realtimeChartInstance = null;
  }
});
</script>
<style scoped>
.detail-drawer {
    opacity: 100%;
}

.detail-drawer-body {
    width: 400px;
    height: 100%;
    opacity: 100%;
    background: #ffffff;
    border-radius: 0px;
    overflow: hidden;
}

.detail-drawer-header {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    display: flex;
    padding: 16px;
    height: 56px;
    opacity: 100%;
    border-bottom: 1px solid #e5e7eb;
}

.detail-drawer-title {
    margin: 0;
    font-size: 14px;
    font-weight: 600;
    color: #1f2937;
    display: flex;
    align-items: center;
    gap: 8px;
    line-height: 22px;
}

.detail-drawer-title-text {
    margin: 0;
}

.detail-drawer-content {
    padding: 20px;
    min-height: 0;
    max-height: calc(100vh - 66px - 56px);
    opacity: 100%;
    background: #ffffff;
    flex: 1;
    overflow-y: auto;
    overflow-x: hidden;
}

.detail-drawer-grid {
    width: 100%;
    margin: 0 auto;
    margin-bottom: 20px;
    padding-bottom: 10px;
    display: flex;
    opacity: 100%;
    grid-template-columns: 1fr;
    gap: 16px;
}

.detail-drawer-grid-item {
    display: flex;
    flex-direction: column;
    opacity: 100%;
}

.detail-drawer-label {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    color: rgba(0, 0, 0, 0.56);
}

.detail-drawer-value {
    color: rgba(0, 0, 0, 0.8);
    opacity: 100%;
}

.detail-drawer-footer {
    display: flex;
    padding-right: 24px;
    padding-top: 13px;
    opacity: 100%;
    border-top: 1px solid #e5e7eb;
    outline: 0 !important;
    @media screen and (max-width: 768px) {
        padding-right: 12px;
        padding-left: 12px;
        padding-top: 8px;
    }
}

.detail-drawer-close-btn {
    margin-left: auto;
    opacity: 100%;
}
.detail-drawer-footer .detail-drawer-close-btn {
    @media screen and (max-width: 768px) {
       width: 100%;
       height: 44px;
    }
}
.chart-section {
    margin-bottom: 16px;
}

.strategy-section-title {
    line-height: 22px;
    color: #000000CC;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    margin-bottom: 12px;
}

.strategy-chart {
    height: 180px;
    width: 100%;
}
</style>
