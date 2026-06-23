<template>
    <div class="strategy-page">
        <div class="detail-drawer-header strategy-page-header">
            <div class="detail-drawer-title">
                <t-icon v-if="isPC"
                        style='cursor: pointer;    color: var(--t-color);'
                        class=' tr-icon-default'
                        size='14px'
                        name='fas dx-icon icon-t-arrow-left-outlined'
                        @click='goBack'>
                </t-icon>
                <t-icon v-else
                        style='cursor: pointer;'
                        class=' tr-icon-default'
                        size='14px'
                        name='fas dx-icon icon-t-left-outlined'
                        @click='goBack'>
                </t-icon>
                <t-label class="detail-drawer-title-text"
                         :tabIndex="1"
                         valueType="static"
                         :showHint="true"
                         :constValue="pageTitle">
                </t-label>

            </div>
            <t-button v-if="isPC"
                      class="tr-button-primary"
                      label="保存"
                      :showHint="true"
                      :tabIndex="1"
                      @click="saveSettings">
            </t-button>
        </div>
        <div class="tr-div-drawer detail-drawer-content ">
            <div class="chart-section">
                <div class="strategy-section-title">运行曲线</div>
                <div ref="strategyChartRef" class="strategy-chart"></div>
            </div>
            <div class="strategy-section">
                <div class="strategy-section-title">充电时段</div>
                <transition-group name="range-list"
                                  tag="div"
                                  class="strategy-time-list">
                    <div v-for="(range, index) in chargeRanges"
                         :key="range.id"
                         class="time-row">
                        <div class="time-input-container">
                            <t-select style='opacity:100%'
                                      class='tr-datetime-div time-input'
                                      itemsDataSourceType='static'
                                      :clearable='true'
                                      :useInput='true'
                                      helpPlacement='bottom'
                                      :readonly='false'
                                      optionsPosition=''
                                      :disable='false'
                                      :visible='true'
                                      :staticItems='timeSelectItems'
                                      v-model="range.start"
                                      @change="() => onRangeChange(range, 'start', 'charge')">
                            </t-select>
                            <span class="time-separator">至</span>
                            <t-select style='opacity:100%'
                                      class='tr-datetime-div time-input'
                                      itemsDataSourceType='static'
                                      :clearable='true'
                                      :useInput='true'
                                      helpPlacement='bottom'
                                      :readonly='false'
                                      optionsPosition=''
                                      :disable='false'
                                      :visible='true'
                                      :staticItems='timeSelectItems'
                                      v-model="range.end"
                                      @change="() => onRangeChange(range, 'end', 'charge')">
                            </t-select>
                        </div>
                        <div class="power-input-container">
                            <input class="power-input"
                                   :value="range.power"
                                   @input="(e) => onPowerInput(e, range, 'charge')"
                                   placeholder="请输入限制功率"
                                   type="text"
                                   inputmode="numeric" />
                            <span class="power-unit">kW</span>
                        </div>
                        <span v-html="removeSvg"
                              class="remove-btn"
                              @click="removeChargeRange(index)"></span>
                    </div>
                </transition-group>
                <div class="add-row"
                     @click="addChargeRange">添加时间段</div>
            </div>
            <div class="strategy-section">
                <div class="strategy-section-title">放电时段</div>
                <transition-group name="range-list"
                                  tag="div"
                                  class="strategy-time-list">
                    <div v-for="(range, index) in dischargeRanges"
                         :key="range.id"
                         class="time-row">
                        <div class="time-input-container">
                            <t-select style='opacity:100%'
                                      class='tr-datetime-div time-input'
                                      itemsDataSourceType='static'
                                      :clearable='true'
                                      :useInput='true'
                                      helpPlacement='bottom'
                                      :readonly='false'
                                      optionsPosition=''
                                      :disable='false'
                                      :visible='true'
                                      :staticItems='timeSelectItems'
                                      v-model="range.start"
                                      @change="() => onRangeChange(range, 'start', 'discharge')">
                            </t-select>
                            <span class="time-separator">至</span>
                            <t-select style='opacity:100%'
                                      class='tr-datetime-div time-input'
                                      itemsDataSourceType='static'
                                      :clearable='true'
                                      :useInput='true'
                                      helpPlacement='bottom'
                                      :readonly='false'
                                      optionsPosition=''
                                      :disable='false'
                                      :visible='true'
                                      :staticItems='timeSelectItems'
                                      v-model="range.end"
                                      @change="() => onRangeChange(range, 'end', 'discharge')">
                            </t-select>
                        </div>
                        <div class="power-input-container">
                            <input class="power-input"
                                   :value="range.power"
                                   @input="(e) => onPowerInput(e, range, 'discharge')"
                                   placeholder="请输入限制功率"
                                   type="text"
                                   inputmode="numeric" />
                            <span class="power-unit">kW</span>
                        </div>
                        <span v-html="removeSvg"
                              class="remove-btn"
                              @click="removeDischargeRange(index)"></span>
                    </div>
                </transition-group>
                <div class="add-row"
                     @click="addDischargeRange">添加时间段</div>
            </div>

        </div>
        <div class="detail-drawer-footer">
            <t-button class="tr-button-primary detail-drawer-close-btn"
                      label="保存"
                      :showHint="true"
                      :tabIndex="1"
                      @click="saveSettings">
            </t-button>
            <t-button class="tr-button-default detail-drawer-close-btn"
                      label="取消"
                      :showHint="true"
                      :tabIndex="1"
                      @click="goBack">
            </t-button>

        </div>
    </div>
</template>

<script setup>
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue';


const Funcs = window.Funcs;
const getSessionParams = () => {
    try {
        return JSON.parse(sessionStorage.getItem('strategy_settings_params') || '{}') || {};
    }
    catch (error) {
        return {};
    }
};
const queryParams = TFF.common.api.Url.getParams() || {};
const sessionParams = getSessionParams();
const mergedParams = { ...sessionParams, ...queryParams };
const pageTitle = ref(mergedParams.Title || '储能调度');
const stationId = ref(mergedParams.StaId || '');
const isPC = ref(window.innerWidth >= 768);
const updateIsPC = () => {
    isPC.value = window.innerWidth >= 768;
};
const deviceInfo = {
    DeviceId: mergedParams.DeviceId || '',
    ProductKey: mergedParams.ProductKey || '',
    DeviceKey: mergedParams.DeviceKey || ''
};
const chargeMaxPower = ref(Number(mergedParams.opt_max_p_in));
const dischargeMaxPower = ref(Number(mergedParams.opt_max_p_out));

const removeSvg = '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7.00008 1.16667C5.84636 1.16667 4.71854 1.50879 3.75926 2.14977C2.79997 2.79074 2.0523 3.70178 1.61079 4.76768C1.16928 5.83359 1.05376 7.00648 1.27884 8.13803C1.50392 9.26959 2.05949 10.309 2.87529 11.1248C3.6911 11.9406 4.7305 12.4962 5.86206 12.7213C6.99361 12.9463 8.1665 12.8308 9.2324 12.3893C10.2983 11.9478 11.2093 11.2001 11.8503 10.2408C12.4913 9.28154 12.8334 8.15373 12.8334 7C12.8334 6.23396 12.6825 5.47542 12.3894 4.76768C12.0962 4.05995 11.6665 3.41689 11.1249 2.87522C10.5832 2.33354 9.94014 1.90386 9.2324 1.61071C8.52467 1.31756 7.76613 1.16667 7.00008 1.16667ZM7.00008 11.6667C6.0771 11.6667 5.17485 11.393 4.40742 10.8802C3.63999 10.3674 3.04186 9.63858 2.68865 8.78586C2.33544 7.93314 2.24302 6.99483 2.42309 6.08958C2.60315 5.18434 3.04761 4.35282 3.70025 3.70017C4.3529 3.04753 5.18442 2.60307 6.08966 2.42301C6.99491 2.24294 7.93322 2.33536 8.78594 2.68857C9.63866 3.04178 10.3675 3.63991 10.8803 4.40734C11.3931 5.17477 11.6667 6.07703 11.6667 7C11.6667 8.23768 11.1751 9.42467 10.2999 10.2998C9.42475 11.175 8.23776 11.6667 7.00008 11.6667ZM9.33342 6.41667H4.66675C4.51204 6.41667 4.36367 6.47813 4.25427 6.58753C4.14488 6.69692 4.08342 6.8453 4.08342 7C4.08342 7.15471 4.14488 7.30309 4.25427 7.41248C4.36367 7.52188 4.51204 7.58334 4.66675 7.58334H9.33342C9.48813 7.58334 9.6365 7.52188 9.7459 7.41248C9.85529 7.30309 9.91675 7.15471 9.91675 7C9.91675 6.8453 9.85529 6.69692 9.7459 6.58753C9.6365 6.47813 9.48813 6.41667 9.33342 6.41667Z" fill="#FD2020"/></svg>';

const timeSelectItems = Array.from({ length: 49 }, (_, index) => {
    const totalMinutes = index * 30;
    const hours = String(Math.floor(totalMinutes / 60)).padStart(2, '0');
    const minutes = String(totalMinutes % 60).padStart(2, '0');
    const label = `${hours}:${minutes}`;
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
    const sortedOrder = [...ranges]
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
const createRangeId = () => `${Date.now()}_${rangeIdSeed++}`;


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

const saveSettings = () => {
    /*  */
    ensureSortedRanges(chargeRanges.value);
    ensureSortedRanges(dischargeRanges.value);
    const getIncompleteRangeReason = (ranges) => {
        let missingStart = false;
        let missingEnd = false;
        let missingPower = false;
        ranges.some(item => {
            const start = normalizeTimeValue(item?.start);
            const end = normalizeTimeValue(item?.end);
            const power = item?.power;
            const hasPower = power !== null && power !== '' && power !== undefined;
            const hasAny = !!start || !!end || hasPower;
            if (!hasAny) return false;
            if (!start) missingStart = true;
            if (!end) missingEnd = true;
            if (!hasPower) missingPower = true;
            return missingStart || missingEnd || missingPower;
        });
        if (!missingStart && !missingEnd && !missingPower) return '';
        const parts = [];
        if (missingStart) parts.push('开始时间');
        if (missingEnd) parts.push('结束时间');
        if (missingPower) parts.push('功率');
        return `请补全${parts.join('、')}。`;
    };
    const chargeReason = getIncompleteRangeReason(chargeRanges.value);
    if (chargeReason) {
        Funcs.Notify('提示', `充电时段${chargeReason}`, 'warning');
        return;
    }
    const dischargeReason = getIncompleteRangeReason(dischargeRanges.value);
    if (dischargeReason) {
        Funcs.Notify('提示', `放电时段${dischargeReason}`, 'warning');
        return;
    }
    if (!deviceInfo.DeviceId || !deviceInfo.DeviceKey) return;
    const policy = {
        StaId: stationId.value,
        DeviceId: deviceInfo.DeviceId,
        ProductKey: deviceInfo.ProductKey,
        DeviceKey: deviceInfo.DeviceKey,
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
        setTimeout(() => {
            goBack();
        }, 800);

    }).catch((e) => {
        console.error(e);
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

const normalizeInputRanges = (ranges) => {
    if (!Array.isArray(ranges)) return [];
    return ranges.map(range => ({
        id: range?.id || createRangeId(),
        start: normalizeTimeValue(range?.start),
        end: normalizeTimeValue(range?.end),
        power: range?.power ?? null
    }));
};
const policyToRanges = (periods) => {
    if (!Array.isArray(periods)) return [];
    return periods.map(item => ({
        start: normalizeTimeText(item?.Start),
        end: normalizeTimeText(item?.Stop),
        power: item?.Power || 0
    }));
};
const applyPolicyToRanges = (policy) => {
    chargeRanges.value = normalizeInputRanges(policyToRanges(policy?.ChargePeriod));
    dischargeRanges.value = normalizeInputRanges(policyToRanges(policy?.DischargePeriod));
    ensureSortedRanges(chargeRanges.value);
    ensureSortedRanges(dischargeRanges.value);
};
const fetchPolicy = () => {
    if (!deviceInfo.DeviceId || !deviceInfo.DeviceKey) return;
    TFF.common.ajax.getDataAsync({
        url: TFF.common.ajax.getServiceUrl('saas-pvm-getpowerpolicy'),
        type: 'post',
        data: { param: JSON.stringify({ StaID: stationId.value, DeviceId: deviceInfo.DeviceId, ProductKey: deviceInfo.ProductKey, DeviceKey: deviceInfo.DeviceKey }) }
    }).then((result) => {
        const policy = result?.data ?? result;
        applyPolicyToRanges(policy);
    }).catch((e) => {
        console.error(e);
        Funcs.Notify('提示', '获取策略配置失败', 'error');
    });
};

const realtimeRaw = ref([]);
const realtimeEndTime = ref(null); // 记录实际数据的结束时间
const fetchData = () => {
    if (!deviceInfo.DeviceId) return;
    TFF.common.ajax.getDataAsync({
        url: TFF.common.ajax.getServiceUrl('IRT-QueryTimeSeriesAggregate_External'),
        type: 'post',
        data: {
            request: JSON.stringify({
                'deviceId': deviceInfo.DeviceId,
                'metricCode': 'p',//p就是功率
                'startTime': new Date().setHours(0, 0, 0, 0),//开始时间的毫秒时间戳 当天0点
                'endTime': Date.now(),//结束时间的毫秒时间戳   目前时间
                'aggregationInterval': 2,//2代表分钟聚合
                'aggregations': [0],//传一个0 取平均 
                'aggregationMultiplier': 30 //分钟数 你就传15
            })
        }
    }).then((result) => {
        const data = result?.data?.Items ?? result;
        realtimeRaw.value = Array.isArray(data) ? data : [];
        // 记录实际数据的结束时间
        if (Array.isArray(data) && data.length > 0) {
            const lastItem = data[data.length - 1];
            if (lastItem?.time) {
                realtimeEndTime.value = new Date(lastItem.time).getTime();
            }
        }
    }).catch((e) => {
        console.error(e);
        Funcs.Notify('提示', '获取策略配置失败', 'error');
    });
};

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
    renderChart();
}, { deep: true });

watch(dischargeRanges, (value) => {
    ensureSortedRanges(value);
    renderChart();
}, { deep: true });

const getPowerLimit = (type) => {
    const limit = type === 'charge' ? chargeMaxPower.value : dischargeMaxPower.value;
    return Number(limit) || 0;
};

const onPowerInput = (event, range, type) => {
    const value = event.target.value.replace(/[^\d]/g, '');
    if (value) {
        let numValue = parseInt(value, 10);
        const limitPower = getPowerLimit(type);
        if (numValue > limitPower) {
            numValue = limitPower;
            Funcs.Notify('提示', `输入值已超过${type === 'charge' ? '充电' : '放电'}上限${limitPower}kW，已自动调整。`, 'warning');
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
    const currentRanges = type === 'charge' ? chargeRanges.value : dischargeRanges.value;
    const clearField = () => {
        const index = currentRanges.findIndex(item => item.id === range.id);
        if (index >= 0) {
            const target = currentRanges[index];
            currentRanges.splice(index, 1, { ...target, [field]: '' });
        }
        else {
            range[field] = '';
        }
    };
    range.start = normalizeTimeValue(range.start);
    range.end = normalizeTimeValue(range.end);
    const start = toMinutes(range.start);
    const end = toMinutes(range.end);
    if (start == null || end == null) return;
    if (end < start) {
        nextTick(() => {
            clearField();
        });
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
        nextTick(() => {
            clearField();
        });
        Funcs.Notify('提示', '充电与放电时段不允许交集。', 'warning');
    }
};

const toMinutes = (time) => {
    if (!time) return null;
    const text = String(time);
    const timeText = text.includes(' ') ? text.split(' ').pop() : text.includes('T') ? text.split('T').pop() : text;
    const [hours, minutes] = timeText.split(':').slice(0, 2).map(Number);
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

const timeLabels = computed(() => {
    // 始终展示整天的时间标签
    return timeSelectItems.map(item => item.value);
});
const timePoints = computed(() => {
    // 始终展示整天的时间点（49个点，从00:00到24:00）
    return timeSelectItems.map(item => toMinutes(item.value)).filter(item => item != null);
});

const buildScheduleSeries = (chargeSegs, dischargeSegs, points) => {
    return points.map((minute) => {
        const chargeSeg = chargeSegs.find(item => minute >= item.start && minute < item.end);
        if (chargeSeg) return chargeSeg.power;
        const dischargeSeg = dischargeSegs.find(item => minute >= item.start && minute < item.end);
        if (dischargeSeg) return dischargeSeg.power;
        return 0;
    });
};

const strategyChartRef = ref(null);
let chartInstance = null;

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
    const indexMap = new Map(points.map((value, index) => [value, index]));
    const realtime = points.map(() => null); // 初始化为null而不是0
    let max = 0;
    items.forEach(item => {
        const minute = alignMinute(toMinuteFromTimestamp(item?.time));
        const index = indexMap.get(minute);
        if (index == null) return;
        const value = Number(item?.mean);
        if (Number.isNaN(value)) return;
        max = Math.max(max, Math.abs(value));
        realtime[index] = value;
    });
    return { realtime, max };
};

const chartData = computed(() => {
    const points = timePoints.value;
    const chargeSegs = normalizeRangesWithPower(chargeRanges.value, 'charge');
    const dischargeSegs = normalizeRangesWithPower(dischargeRanges.value.map(item => ({
        ...item,
        power: -Math.abs(item.power)
    })), 'discharge');
    const schedule = buildScheduleSeries(chargeSegs, dischargeSegs, points);
    const { realtime } = buildRealtimeSeries(realtimeRaw.value, points);
    const positivePowers = [
        ...chargeSegs.map(item => Number(item.power) || 0),
        ...schedule.filter(item => item > 0),
        ...realtime.filter(item => item > 0)
    ];
    const negativePowersAbs = [
        ...dischargeSegs.map(item => Math.abs(Number(item.power) || 0)),
        ...schedule.filter(item => item < 0).map(item => Math.abs(item)),
        ...realtime.filter(item => item < 0).map(item => Math.abs(item))
    ];
    const chargeLimit = Math.max(Number(chargeMaxPower.value) || 0, ...positivePowers, 1);
    const dischargeLimit = Math.max(Number(dischargeMaxPower.value) || 0, ...negativePowersAbs, 1);
    return {
        schedule,
        realtime,
        chargeLimit,
        dischargeLimit
    };
});

const createGrid = ({ top }) => ({ left: isPC.value ? 32 : 12, right: 28, top, bottom: 28, containLabel: true });
// 创建一个通用的 X 轴配置（时间轴）
const createAxis = () => ({
    type: 'category', // 类目轴（用于时间/离散数据）
    boundaryGap: false, // 两边不留白（折线图常用，让线贴边）

    name: '', // 轴名称（这里没用，留空）
    nameLocation: 'end', // 名称显示在轴末尾
    nameGap: 8, // 名称与轴的间距
    nameTextStyle: {
        color: 'rgba(0,0,0,0.55)' // 名称字体颜色
    },

    data: timeLabels.value, // X轴数据（时间数组）

    axisLine: {
        lineStyle: {
            color: 'rgba(0,0,0,0.25)' // 轴线颜色（淡一点）
        }
    },

    axisTick: {
        show: false // 不显示刻度线（更简洁）
    },

    axisLabel: {
        color: 'rgba(0,0,0,0.65)', // 标签颜色
        interval: 0,

        // 格式化显示内容
        formatter: (value, index) => {
            if (isPC.value) {
                if (index === timeLabels.value.length - 1) return '';
                return index % 4 === 0 ? value : '';
            }
            const maxIndex = Math.max(0, timeLabels.value.length - 1);
            const step = Math.max(1, Math.floor(maxIndex / 3));
            return index % step === 0 ? value : '';
        }
    }
});
// 创建一个通用的 Y 轴配置（数值轴，单位：kW）
const createValueAxis = (min, max) => ({
    type: 'value', // 数值轴（连续值）

    name: 'kW', // 轴名称（单位）/* 充电/放电  */
    nameLocation: 'end', // 名称显示在轴末尾（顶部）
    nameGap: 6, // 名称与轴的间距
    nameRotate: 0, // 名称不旋转（保持水平）

    nameTextStyle: {
        color: 'rgba(0,0,0,0.55)', // 名称颜色
        align: 'left', // 对齐方式
        padding: [0, 0, 0, 0] // 内边距（这里其实可以省略）
    },

    min, // 最小值（外部传入，比如 -7）
    max, // 最大值（外部传入，比如 7）
    // interval: 1,
    axisLine: {
        show: true, // 显示轴线
        lineStyle: {
            color: 'rgba(0,0,0,0.25)' // 轴线颜色
        }
    },

    axisTick: {
        show: false // 不显示刻度（简洁风）
    },

    axisLabel: {
        color: 'rgba(0,0,0,0.65)' // 刻度文字颜色
    },

    splitLine: {
        show: false
    }
});

const getStrategyChartOption = () => {
    const { schedule, realtime, chargeLimit, dischargeLimit } = chartData.value;
    const yAxisMax = Math.max(1, Number(chargeLimit) || 0);
    const yAxisMin = -Math.max(1, Number(dischargeLimit) || 0);
    const grid = createGrid({ top: 36 });
    return {
        grid,
        legend: {
            top: 0,
            right: 8,
            itemWidth: 10,
            itemHeight: 2,
            textStyle: { color: 'rgba(0,0,0,0.65)' },
            data: ['实时曲线', '调度曲线']
        },
        tooltip: {
            trigger: 'axis',
            formatter: (params) => {
                const items = Array.isArray(params) ? params : [params];
                const title = items[0]?.axisValueLabel ?? items[0]?.axisValue ?? '';
                const getValue = (name) => {
                    const item = items.find(entry => entry?.seriesName === name);
                    const value = Number(item?.data ?? 0);
                    return Number.isNaN(value) ? 0 : value;
                };
                const formatPower = (value) => {
                    if (value === 0) return { label: '休眠', valueText: '0 kW' };
                    if (value > 0) return { label: '充电', valueText: `${value.toFixed(0)} kW` };
                    return { label: '放电', valueText: `${Math.abs(value).toFixed(0)} kW` };
                };
                const realtimeValue = getValue('实时曲线');
                const scheduleValue = getValue('调度曲线');
                const realtimeInfo = formatPower(realtimeValue);
                const scheduleInfo = formatPower(scheduleValue);
                return [
                    title,
                    `实时${realtimeInfo.label} ${realtimeInfo.valueText}`,
                    `调度${scheduleInfo.label} ${scheduleInfo.valueText}`
                ].join('<br/>');
            }
        },
        xAxis: createAxis(),
        yAxis: createValueAxis(yAxisMin, yAxisMax),
        graphic: [
            {
                type: 'text',
                left: grid.left - (isPC.value ? 24 : 0),
                top: grid.top - (isPC.value ? 24 : 22),
                style: {
                    text: '充电',
                    fill: 'rgba(0,0,0,0.65)',
                    fontSize: 12
                }
            },
            {
                type: 'text',
                left: grid.left - (isPC.value ? 24 : 0),
                bottom: grid.bottom + (isPC.value ? 0 : -12),
                style: {
                    text: '放电',
                    fill: 'rgba(0,0,0,0.65)',
                    fontSize: 12
                }
            }
        ],
        series: [
            {
                name: '实时曲线',
                type: 'line',
                data: realtime,
                step: 'middle',
                connectNulls: false, // 不连接空值，让曲线在无数据处断开
                symbol: 'none',
                lineStyle: { width: 2, color: '#2CBF6E' }
            },
            {
                name: '调度曲线',
                type: 'line',
                data: schedule,
                step: 'middle',
                connectNulls: true,
                symbol: 'none',
                lineStyle: { width: 2, color: '#FF9B2F' }
            }
        ]
    };
};
const normalizeTimeText = (value) => {
    if (!value) return '';
    const text = String(value);
    if (text.includes(' ')) return text.split(' ').pop();
    if (text.includes('T')) return text.split('T').pop();
    return text;
};
const renderChart = () => {
    if (!strategyChartRef.value) return;
    if (!window.echarts) return;
    if (!chartInstance) {
        chartInstance = window.echarts.init(strategyChartRef.value, null, { renderer: 'canvas' });
    }
    chartInstance.setOption(getStrategyChartOption(), true);
    chartInstance.resize();
};

watch(chartData, () => {
    renderChart();
}, { deep: true });
watch(isPC, () => {
    renderChart();
});

onMounted(() => {
    window.addEventListener('resize', updateIsPC);
    fetchPolicy();
    fetchData();
    renderChart();
});
const goBack = () => {
    Funcs.Goback();
};
onUnmounted(() => {
    window.removeEventListener('resize', updateIsPC);
    if (chartInstance) {
        chartInstance.dispose();
        chartInstance = null;
    }
});

</script>
<style>
.power-input-container input::placeholder {
  font-size: 12px;
}

.time-row .el-select__wrapper {
  border: none;
  box-shadow: unset;
}

.strategy-page {
  border-top: 8px solid var(--t-color-background);
  box-sizing: border-box;
  border-right: 8px solid var(--t-color-background);
  @media screen and (max-width: 768px) {
    border-top: none;
    border-right: none;
  }
}

.time-input .q-field__control {
  border: none !important;
  box-shadow: unset !important;
}

.time-input .q-field--focused {
  border: none !important;
  box-shadow: unset !important;
}

div [role='listbox'] {
  max-height: 250px !important;
}
@media screen and (max-width: 768px) {
  .time-input .q-field__control {
    height: 32px !important;
  }
  .time-input .q-field__marginal {
    height: 32px !important;
  }
  .tr-select-small .q-icon {
    font-size: 10px !important;
  }
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
  display: flex;
  align-items: center;
  gap: 12px;
  line-height: 22px;
}

.detail-drawer-title-text {
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 22px;
  color: #000000cc;
  @media screen and (max-width: 768px) {
    font-size: 16px;
    color: rgba(0, 0, 0, 0.8);
    font-weight: 600;
  }
}

.strategy-page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: #f0f2f5;
}

.strategy-page-header {
  padding: 16px 20px;
  border-bottom: 1px solid #f0f0f0;
  background: #ffffff;
  border-radius: 12px 12px 0 0;
  @media screen and (max-width: 768px) {
    border-radius: 0px;
    height: 48px;
    background-color: rgb(244, 244, 244);
  }
}

@media screen and (max-width: 768px) {
  .detail-drawer-title {
    width: 100%;
    justify-content: center;
    position: relative;
  }

  .detail-drawer-title .tr-icon-default {
    position: absolute;
    left: 0;
  }
}

.detail-drawer-content {
  padding: 20px;
  min-height: 0;
  max-height: calc(100vh - 45px - 12px - 56px);
  opacity: 100%;
  background: #ffffff;
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  padding-top: calc(12px);
  @media screen and (max-width: 768px) {
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 12px;
    background-color: rgb(244, 244, 244);
  }
}

.strategy-section {
  max-width: 450px;
  margin-bottom: 24px;
  @media screen and (max-width: 768px) {
    background: #fff;
    padding: 12px;
    margin-bottom: 0;
  }
}

.chart-section {
  max-width: 1200px;
  margin-bottom: 24px;

  @media screen and (max-width: 1500px) {
    max-width: 800px;
  }
  @media screen and (max-width: 768px) {
    background: #fff;
    padding: 12px;
    margin-bottom: 0;
  }
}

.strategy-section-title {
  line-height: 22px;
  color: #000000cc;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  margin-bottom: 12px;
}

.strategy-time-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

@media screen and (min-width: 768px) {
  .strategy-time-list {
    margin-left: 16px;
  }

  .add-row {
    margin-left: 16px;
  }
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
  border: 1px solid #dcdcdc;

  @media screen and (max-width: 768px) {
    padding: 0 8px;
    height: 34px;
  }
}

.power-input-container {
  width: 172px;
  display: flex;
  height: 34px;
  align-items: center;
  align-self: stretch;
  border-radius: 2px;
  border: 1px solid #dcdcdc;
  padding: 0 8px;

  @media screen and (max-width: 768px) {
    width: 132px;
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

  @media screen and (max-width: 768px) {
    height: 42px;
  }
}

.strategy-chart {
  height: 180px;
  width: 100%;
}

.detail-drawer-footer {
  display: flex;
  padding-left: 40px;
  padding-bottom: 16px;
  opacity: 100%;
  background-color: #fff;
  outline: 0 !important;
  gap: 12px;
  @media screen and (max-width: 768px) {
    padding-left: 12px;
    padding-right: 12px;
    padding-top: 12px;
  }
}
.detail-drawer-footer button {
  @media screen and (max-width: 768px) {
    width: 100%;
    height: 44px;
  }
}

.detail-drawer-close-btn {
  opacity: 100%;
}
</style>
