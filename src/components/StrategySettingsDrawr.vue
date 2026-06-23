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
                <div class="strategy-section">
                    <div class="strategy-section-title">充电时段</div>
                    <transition-group name="range-list" tag="div" class="strategy-time-list">
                        <div v-for="(range, index) in chargeRanges" :key="range.id" class="time-row">
                            <div class="time-input-container">
                                <t-select style='opacity:100%' class='tr-datetime-div time-input'
                                    itemsDataSourceType='static' :clearable='true' :useInput='true'
                                    helpPlacement='bottom' :readonly='false' optionsPosition='' :disable='false'
                                    :visible='true' :staticItems='timeSelectItems' v-model="range.start"
                                    @change="() => onRangeChange(range, 'start', 'charge')">
                                </t-select>
                                <span class="time-separator">至</span>
                                <t-select style='opacity:100%' class='tr-datetime-div time-input'
                                    itemsDataSourceType='static' :clearable='true' :useInput='true'
                                    helpPlacement='bottom' :readonly='false' optionsPosition='' :disable='false'
                                    :visible='true' :staticItems='timeSelectItems' v-model="range.end"
                                    @change="() => onRangeChange(range, 'end', 'charge')">
                                </t-select>
                            </div>
                            <!-- 增加一个功率的输入框 右侧有单位kW -->
                            <div class="power-input-container">
                                <input class="power-input" :value="range.power" @input="(e) => onPowerInput(e, range)"
                                    placeholder="输入功率" type="text" inputmode="numeric" />
                                <span class="power-unit">kW</span>
                            </div>
                            <span v-html="removeSvg" class="remove-btn" @click="removeChargeRange(index)"></span>

                        </div>
                    </transition-group>
                    <div class="add-row" @click="addChargeRange">添加时间段</div>
                </div>
                <div class="strategy-section">
                    <div class="strategy-section-title">放电时段</div>
                    <transition-group name="range-list" tag="div" class="strategy-time-list">
                        <div v-for="(range, index) in dischargeRanges" :key="range.id" class="time-row">
                            <div class="time-input-container">
                                <t-select style='opacity:100%' class='tr-datetime-div time-input'
                                    itemsDataSourceType='static' :clearable='true' :useInput='true'
                                    helpPlacement='bottom' :readonly='false' optionsPosition='' :disable='false'
                                    :visible='true' :staticItems='timeSelectItems' v-model="range.start"
                                    @change="() => onRangeChange(range, 'start', 'discharge')">
                                </t-select>
                                <span class="time-separator">至</span>
                                <t-select style='opacity:100%' class='tr-datetime-div time-input'
                                    itemsDataSourceType='static' :clearable='true' :useInput='true'
                                    helpPlacement='bottom' :readonly='false' optionsPosition='' :disable='false'
                                    :visible='true' :staticItems='timeSelectItems' v-model="range.end"
                                    @change="() => onRangeChange(range, 'end', 'discharge')">
                                </t-select>
                            </div>
                            <div class="power-input-container ">
                                <input class="power-input" :value="range.power" @input="(e) => onPowerInput(e, range)"
                                    placeholder="输入功率" type="text" inputmode="numeric" />
                                <span class="power-unit">kW</span>
                            </div>
                            <span v-html="removeSvg" class="remove-btn" @click="removeDischargeRange(index)"></span>

                        </div>
                    </transition-group>
                    <div class="add-row" @click="addDischargeRange">添加时间段</div>
                </div>
                <div class="strategy-section">
                    <div class="strategy-section-title">运行曲线</div>
                    <div ref="chartRef" class="strategy-chart"></div>
                </div>
            </div>
            <div class="detail-drawer-footer">
                <t-button class="tr-button-default detail-drawer-close-btn" label="取消" :showHint="true" :tabIndex="1"
                    @click="closeDrawer">
                </t-button>
                <t-button class="tr-button-primary detail-drawer-close-btn" label="调度" :showHint="true" :tabIndex="1"
                    @click="saveSettings">
                </t-button>
            </div>
        </div>
    </t-dialog>
</template>

<script setup>
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue';


const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: '储能调度'
  },
  stationId: {
    type: String,
    default: ''
  },
  maxPower: {
    type: Number,
    default: 7
  }
});

const removeSvg = '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7.00008 1.16667C5.84636 1.16667 4.71854 1.50879 3.75926 2.14977C2.79997 2.79074 2.0523 3.70178 1.61079 4.76768C1.16928 5.83359 1.05376 7.00648 1.27884 8.13803C1.50392 9.26959 2.05949 10.309 2.87529 11.1248C3.6911 11.9406 4.7305 12.4962 5.86206 12.7213C6.99361 12.9463 8.1665 12.8308 9.2324 12.3893C10.2983 11.9478 11.2093 11.2001 11.8503 10.2408C12.4913 9.28154 12.8334 8.15373 12.8334 7C12.8334 6.23396 12.6825 5.47542 12.3894 4.76768C12.0962 4.05995 11.6665 3.41689 11.1249 2.87522C10.5832 2.33354 9.94014 1.90386 9.2324 1.61071C8.52467 1.31756 7.76613 1.16667 7.00008 1.16667ZM7.00008 11.6667C6.0771 11.6667 5.17485 11.393 4.40742 10.8802C3.63999 10.3674 3.04186 9.63858 2.68865 8.78586C2.33544 7.93314 2.24302 6.99483 2.42309 6.08958C2.60315 5.18434 3.04761 4.35282 3.70025 3.70017C4.3529 3.04753 5.18442 2.60307 6.08966 2.42301C6.99491 2.24294 7.93322 2.33536 8.78594 2.68857C9.63866 3.04178 10.3675 3.63991 10.8803 4.40734C11.3931 5.17477 11.6667 6.07703 11.6667 7C11.6667 8.23768 11.1751 9.42467 10.2999 10.2998C9.42475 11.175 8.23776 11.6667 7.00008 11.6667ZM9.33342 6.41667H4.66675C4.51204 6.41667 4.36367 6.47813 4.25427 6.58753C4.14488 6.69692 4.08342 6.8453 4.08342 7C4.08342 7.15471 4.14488 7.30309 4.25427 7.41248C4.36367 7.52188 4.51204 7.58334 4.66675 7.58334H9.33342C9.48813 7.58334 9.6365 7.52188 9.7459 7.41248C9.85529 7.30309 9.91675 7.15471 9.91675 7C9.91675 6.8453 9.85529 6.69692 9.7459 6.58753C9.6365 6.47813 9.48813 6.41667 9.33342 6.41667Z" fill="#FD2020"/></svg>';

const timeSelectItems = Array.from({ length: 49 }, (_, index) => {
  const totalMinutes = index * 30;
  const hours = String(Math.floor(totalMinutes / 60)).padStart(2, '0');
  const minutes = String(totalMinutes % 60).padStart(2, '0');
  const label = `${ hours }:${ minutes }`;
  return { label, value: label };
});

const getRangeSortKey = (range) => {
  const start = toMinutes(range?.start);
  const end = toMinutes(range?.end);
  return {
    start: start == null ? Number.POSITIVE_INFINITY : start,
    end: end == null ? Number.POSITIVE_INFINITY : end
  };
};

const ensureSortedRanges = (ranges) => {
  if (!Array.isArray(ranges) || ranges.length <= 1) return;
  const currentOrder = ranges.map(item => item.id).join('|');
  const sortedOrder = [ ...ranges ]
    .sort((a, b) => {
      const ka = getRangeSortKey(a);
      const kb = getRangeSortKey(b);
      if (ka.start !== kb.start) return ka.start - kb.start;
      if (ka.end !== kb.end) return ka.end - kb.end;
      return 0;
    })
    .map(item => item.id)
    .join('|');
  if (currentOrder === sortedOrder) return;
  ranges.sort((a, b) => {
    const ka = getRangeSortKey(a);
    const kb = getRangeSortKey(b);
    if (ka.start !== kb.start) return ka.start - kb.start;
    if (ka.end !== kb.end) return ka.end - kb.end;
    return 0;
  });
};


let rangeIdSeed = 0;
const createRangeId = () => `${ Date.now() }_${ rangeIdSeed++ }`;

const emit = defineEmits([ 'update:modelValue', 'close', 'refresh' ]);
const Funcs = window.Funcs;
const currentDevice = ref(null);

const isShowDrawer = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
});

const closeDrawer = () => {
  emit('update:modelValue', false);
  emit('close');
};

const saveSettings = () => {
  ensureSortedRanges(chargeRanges.value);
  ensureSortedRanges(dischargeRanges.value);
  const device = currentDevice.value;
  if (!device) return;
  const policy = {
    StaId: props.stationId,
    DeviceId: device?.DeviceId,
    ProductKey: device?.ProductKey,
    DeviceKey: device?.DeviceKey,
    ChargePeriod: rangesToPolicy(chargeRanges.value),
    DischargePeriod: rangesToPolicy(dischargeRanges.value)
  };
  TFF.common.ajax.getDataAsync({
    url: TFF.common.ajax.getServiceUrl('saas-pvm-savepowerpolicy'),
    type: 'post',
    data: { param: JSON.stringify(policy) }
  }).then((res) => {
    if (res.state == '0') {
      Funcs.Notify('提示', '下发失败' + res.errmsg, 'error');
      return;
    }
    Funcs.Notify('提示', '下发成功', 'success');
    emit('refresh');
    emit('update:modelValue', false);
    emit('close');
  }).catch(() => {
    Funcs.Notify('提示', '下发失败', 'error');
  });
};

const chargeRanges = ref([]);
const dischargeRanges = ref([]);

const normalizeTimeValue = (value) => {
  if (!value) return '';
  const text = String(value).trim();
  return text;
};
const normalizeTimeText = (value) => {
  if (!value) return '';
  const text = String(value);
  if (text.includes(' ')) return text.split(' ').pop();
  if (text.includes('T')) return text.split('T').pop();
  return text;
};
const policyToRanges = (periods) => {
  if (!Array.isArray(periods)) return [];
  return periods.map(item => ({
    start: normalizeTimeText(item?.Start),
    end: normalizeTimeText(item?.Stop),
    power: item?.Power || 0
  }));
};
const rangesToPolicy = (ranges) => {
  if (!Array.isArray(ranges)) return [];
  return ranges
    .filter(item => item?.start && item?.end)
    .map(item => ({
      Start: normalizeTimeText(item.start),
      Stop: normalizeTimeText(item.end),
      Power: item.power || 0
    }));
};

const normalizeInputRanges = (ranges) => {
  if (!Array.isArray(ranges)) return [];
  return ranges.map(range => ({
    id: range?.id || createRangeId(),
    start: normalizeTimeValue(range?.start),
    end: normalizeTimeValue(range?.end),
    power: range?.power ?? null
  }));
};
const applyPolicyToRanges = (policy) => {
  chargeRanges.value = normalizeInputRanges(policyToRanges(policy?.ChargePeriod));
  dischargeRanges.value = normalizeInputRanges(policyToRanges(policy?.DischargePeriod));
  ensureSortedRanges(chargeRanges.value);
  ensureSortedRanges(dischargeRanges.value);
};
const open = (device) => {
  if (!device) return;
  if (device.NetState != 1) {
    Funcs.Notify('提示', '当储能状态为在线时才允许进行操作！', 'error');
    return;
  }
  currentDevice.value = device;
  emit('update:modelValue', true);
  TFF.common.ajax.getDataAsync({
    url: TFF.common.ajax.getServiceUrl('saas-pvm-getpowerpolicy'),
    type: 'post',
    data: { param: JSON.stringify({ StaID: props.stationId, DeviceId: device.DeviceId, ProductKey: device.ProductKey, DeviceKey: device.DeviceKey }) }
  }).then((result) => {
    const policy = result?.data ?? result;
    applyPolicyToRanges(policy);
  }).catch(() => {
    Funcs.Notify('提示', '获取策略配置失败', 'error');
  });
};
defineExpose({ open });

const addChargeRange = () => {
  chargeRanges.value.push({ id: createRangeId(), start: '', end: '', power: null });
};
const removeChargeRange = (index) => {
  chargeRanges.value.splice(index, 1);
};
const addDischargeRange = () => {
  dischargeRanges.value.push({ id: createRangeId(), start: '', end: '', power: null });
};
const removeDischargeRange = (index) => {
  dischargeRanges.value.splice(index, 1);
};


watch(chargeRanges, (value) => {
  ensureSortedRanges(value);
}, { deep: true });

watch(dischargeRanges, (value) => {
  ensureSortedRanges(value);
}, { deep: true });

const onPowerInput = (event, range) => {
  const value = event.target.value.replace(/[^\d]/g, '');
  if (value) {
    let numValue = parseInt(value, 10);
    if (numValue > props.maxPower) {
      numValue = props.maxPower;
      Funcs.Notify('提示', `输入值已超过设备最大功率${ props.maxPower }kW，已自动调整。`, 'warning');
    }
    range.power = numValue;
  }
  else {
    range.power = null;
  }
  event.target.value = range.power;
};

const onRangeChange = (range, field, type) => {
  if (!range) return;
  range.start = normalizeTimeValue(range.start);
  range.end = normalizeTimeValue(range.end);
  const start = toMinutes(range.start);
  const end = toMinutes(range.end);
  if (start == null || end == null) return;
  if (end < start) {
    if (field === 'start') {
      range.start = '';
    }
    else {
      range.end = '';
    }
    Funcs.Notify('提示', '请重新选择，时间端不允许跨天。', 'warning');
    return;
  }
  const otherRanges = type === 'charge' ? dischargeRanges.value : chargeRanges.value;
  const hasOverlap = otherRanges.some(item => {
    const otherStart = toMinutes(item.start);
    const otherEnd = toMinutes(item.end);
    if (otherStart == null || otherEnd == null) return false;
    if (otherEnd <= otherStart) return false;
    return start < otherEnd && end > otherStart;
  });
  if (hasOverlap) {
    if (field === 'start') {
      range.start = '';
    }
    else {
      range.end = '';
    }
    Funcs.Notify('提示', '充电与放电时段不允许交集。', 'warning');
  }
};

const toMinutes = (time) => {
  if (!time) return null;
  const text = String(time);
  const timeText = text.includes(' ') ? text.split(' ').pop() : text.includes('T') ? text.split('T').pop() : text;
  const [ hours, minutes ] = timeText.split(':').slice(0, 2).map(Number);
  if (Number.isNaN(hours) || Number.isNaN(minutes)) return null;
  return hours * 60 + minutes;
};


const normalizeRangesWithPower = (ranges, type) => {
  return ranges
    .map(range => {
      const start = toMinutes(range.start);
      const end = toMinutes(range.end);
      if (start == null || end == null) return null;
      if (start === end) return null;
      if (end > start) {
        return { start, end, type, power: Number(range.power) || 0 };
      }
      return null;
    })
    .filter(Boolean)
    .sort((a, b) => a.start - b.start);
};

const timeLabels = computed(() => timeSelectItems.map(item => item.value));
const timePoints = computed(() => timeSelectItems.map(item => toMinutes(item.value)).filter(item => item != null));

const buildSeriesValues = (ranges, points) => {
  return points.map((minute) => {
    const seg = ranges.find(item => minute >= item.start && minute < item.end);
    return seg ? seg.power : 0;
  });
};

const buildSleepSeries = (chargeSegs, dischargeSegs, points, sleepValue) => {
  return points.map((minute) => {
    const isCharge = chargeSegs.some(item => minute >= item.start && minute < item.end);
    const isDischarge = dischargeSegs.some(item => minute >= item.start && minute < item.end);
    return isCharge || isDischarge ? 0 : sleepValue;
  });
};

const chartData = computed(() => {
  const chargeSegs = normalizeRangesWithPower(chargeRanges.value, 'charge');
  const dischargeSegs = normalizeRangesWithPower(dischargeRanges.value.map(item => ({
    ...item,
    power: -Math.abs(item.power)
  })), 'discharge');
  const points = timePoints.value;
  const maxFromRanges = Math.max(
    0,
    ...chargeSegs.map(item => Math.abs(item.power)),
    ...dischargeSegs.map(item => Math.abs(item.power))
  );
  const maxPower = Math.max(props.maxPower || 0, maxFromRanges, 1);
  const sleepValue = Math.max(0.1, maxPower * 0.1);
  return {
    charge: buildSeriesValues(chargeSegs, points),
    discharge: buildSeriesValues(dischargeSegs, points),
    sleep: buildSleepSeries(chargeSegs, dischargeSegs, points, sleepValue),
    maxPower
  };
});

const chartRef = ref(null);
let chartInstance = null;

const createGrid = ({ top }) => ({ left: 40, right: 16, top, bottom: 28 });
const createAxis = () => ({
  type: 'category',
  boundaryGap: false,
  name: '时间',
  nameLocation: 'end',
  nameGap: 8,
  nameTextStyle: { color: 'rgba(255,255,255,0.55)' },
  data: timeLabels.value,
  axisLine: { lineStyle: { color: 'rgba(255,255,255,0.25)' } },
  axisTick: { show: false },
  axisLabel: { color: 'rgba(255,255,255,0.75)', interval: 0 }
});
const createValueAxis = (min, max) => ({
  type: 'value',
  name: 'kW',
  nameLocation: 'end',
  nameGap: 6,
  nameRotate: 0,
  nameTextStyle: { color: 'rgba(255,255,255,0.55)', align: 'left', padding: [ 0, 0, 0, 0 ] },
  min,
  max,
  axisLine: { show: true, lineStyle: { color: 'rgba(255,255,255,0.25)' } },
  axisTick: { show: false },
  axisLabel: { color: 'rgba(255,255,255,0.75)' },
  splitLine: { lineStyle: { color: 'rgba(255,255,255,0.12)' } }
});

const getCenterChartOption = () => {
  const { charge, discharge, sleep, maxPower } = chartData.value;
  const limit = Math.max(1, maxPower);

  return {
    grid: createGrid({ top: 50 }),
    legend: {
      top: 0,
      right: 8,
      itemWidth: 10,
      itemHeight: 2,
      textStyle: { color: 'rgba(255,255,255,0.75)' }
    },
    tooltip: { trigger: 'axis' },
    xAxis: createAxis(),
    yAxis: createValueAxis(-limit, limit),
    series: [
      {
        name: '充电运行功率(kW)',
        type: 'line',
        data: charge,
        step: 'middle',
        symbol: 'none',
        lineStyle: { width: 2, color: '#00FFF0' }
      },
      {
        name: '放电计划功率(kW)',
        type: 'line',
        data: discharge,
        step: 'middle',
        symbol: 'none',
        lineStyle: { width: 2, type: 'dashed', color: '#FF9B2F' }
      },
      {
        name: '休眠',
        type: 'line',
        data: sleep,
        step: 'middle',
        symbol: 'none',
        lineStyle: { width: 2, color: '#8C8C8C' }
      }
    ]
  };
};

const renderChart = () => {
  if (!chartRef.value) return;
  if (!window.echarts) return;
  if (!chartInstance) {
    chartInstance = window.echarts.init(chartRef.value, null, { renderer: 'canvas' });
  }
  chartInstance.setOption(getCenterChartOption(), true);
  chartInstance.resize();
};

watch(chartData, () => {
  renderChart();
}, { deep: true });

watch(isShowDrawer, (value) => {
  if (!value) {
    if (chartInstance) {
      chartInstance.dispose();
      chartInstance = null;
    }
    return;
  }
  nextTick(() => {
    if (chartInstance) {
      chartInstance.dispose();
      chartInstance = null;
    }
    renderChart();
  });
});

onMounted(() => {
  renderChart();
});

onUnmounted(() => {
  if (chartInstance) {
    chartInstance.dispose();
    chartInstance = null;
  }
});

</script>
<style>
.time-row .el-select__wrapper {
    border: none;
    box-shadow: unset;
}
</style>
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
    box-sizing: border-box;
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

.strategy-section {
    margin-bottom: 24px;
}

.strategy-section-title {
    font-size: 14px;
    font-weight: 600;
    color: #333;
    margin-bottom: 12px;
}

.strategy-time-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.range-list-move {
    transition: transform 0.2s ease;
}

.time-row {
    display: flex;
    align-items: center;
    gap: 6px;
}

.time-input-container {
    width: 100%;
    display: flex;
    height: 34px;
    align-items: center;
    gap: 8px;
    align-self: stretch;
    border-radius: 2px;
    border: 1px solid #DCDCDC;

    @media screen and (max-width : 768px) {
        padding: 0 8px;
        height: 50px;
    }
}

.power-input-container {
    width: 112px;
    display: flex;
    height: 34px;
    align-items: center;
    align-self: stretch;
    border-radius: 2px;
    border: 1px solid #DCDCDC;
    padding: 0 8px;

    @media screen and (max-width : 768px) {
        height: 50px;
    }
}

.power-input {
    border: none;
    outline: none;
    font-size: 14px;
    color: #333;
    flex: 1;
    width: 100%;
    background: transparent;
}

.power-unit {
    color: #666;
    font-size: 12px;
}

.time-input {
    border: none;
    outline: none;
    font-size: 14px;
    color: #333;
    flex: 1;
}


.time-separator {
    color: #666;
    font-size: 12px;
}

.remove-btn {
    width: 14px;
    height: 14px;
    aspect-ratio: 1/1;
    position: relative;
    bottom: 3px;
    cursor: pointer;
}

.remove-icon {
    font-size: 16px;
    line-height: 1;
}

.add-row {
    margin-top: 12px;
    border: 1px dashed var(--t-color);
    color: var(--t-color);
    border-radius: 2px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-size: 14px;
    width: calc(100% - 20px);

    @media screen and (max-width : 768px) {
        height: 42px;
    }
}

.strategy-chart {
    height: 180px;
    width: 100%;
}




.detail-drawer-footer {
    display: flex;
    padding-right: 16px;
    padding-top: 13px;
    opacity: 100%;
    border-top: 1px solid #e5e7eb;
    outline: 0 !important;
    justify-content: end;
    gap: 12px;
    

}


.detail-drawer-close-btn {

    opacity: 100%;
}
</style>
