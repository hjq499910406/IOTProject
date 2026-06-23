<template>
    <div class='UC_TerminalList terminal-panel' v-show='props.visible'>
        <div class="terminal-panel__content">
            <div v-if="ISPC" class="terminal-panel__filters terminal-panel__filters--pc">
                <div class="terminal-panel__filter-column">
                    <div class="terminal-panel__filter-row">
                        <span class="terminal-panel__section-title">
                            {{ $t('Schema.Page.UCTerminalList.Controls.fasr_label_7beac9.ConstValue', '终端状态') }}
                        </span>
                        <div class="terminal-panel__state-wrap">
                            <!-- 移除了"全部"选项 -->
                            <div v-for="item in primaryStateOptions" :key="item.key"
                                class="terminal-panel__state-chip terminal-panel__state-chip--pc"
                                :class="{ 'is-selected': isStateSelected(item.key) }"
                                @click="handleStateClick(item.key)">
                                <span class="terminal-panel__state-text">
                                    {{ `${item.label} ${getStateCount(item.countKey)}` }}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="terminal-panel__abnormal-section">
                    <div class="terminal-panel__filter-row">
                        <div class="terminal-panel__abnormal-title-wrap">
                            <span class="terminal-panel__section-title">
                                {{
                                    $t('Schema.Page.UCTerminalList.Controls.fasr_label_937101_Copybeac937101_Copy.ConstValue',
                                '异常终端') }}
                            </span>
                        </div>
                        <div class="terminal-panel__abnormal-chip-wrap">
                            <div v-for="item in abnormalStateOptions" :key="item.key"
                                class="terminal-panel__state-chip terminal-panel__state-chip--pc"
                                :class="{ 'is-selected': isStateSelected(item.key) }"
                                @click="handleStateClick(item.key)">
                                <span class="terminal-panel__state-text">
                                    {{ `${item.label} ${getStateCount(item.countKey)}` }}
                                </span>
                            </div>
                        </div>
                    </div>

                </div>
                <t-select itemsDataSourceType='dynamic'
                    :label="$t('Schema.Page.Page115124.Controls.fasr_select7d4893.label', '集控器')" :useInput='true'
                    helpPlacement='bottom' labelPosition='left' optionsPosition='' valueField="value"
                    displayField="label" :listDataSource='CtrlList' v-model="SelectedCtrlId">
                </t-select>
            </div>
            <div v-if="!ISPC" class="terminal-panel__filters terminal-panel__filters--mobile">
                <div class="terminal-panel__mobile-section">
                    <div class="terminal-panel__mobile-section-title">终端状态</div>
                    <div class="terminal-panel__mobile-row">
                        <div v-for="item in primaryStateOptions" :key="`mobile-${item.key}`"
                            class="terminal-panel__state-chip terminal-panel__state-chip--mobile"
                            :class="{ 'is-selected': isStateSelected(item.key) }" @click="handleStateClick(item.key)">
                            {{ item.label }} {{ getStateCount(item.countKey) }}
                        </div>
                    </div>
                </div>
                <div class="terminal-panel__mobile-section">
                    <div class="terminal-panel__mobile-section-title">异常终端</div>
                    <div class="terminal-panel__mobile-row">
                        <div v-for="item in abnormalStateOptions" :key="`mobile-${item.key}`"
                            class="terminal-panel__state-chip terminal-panel__state-chip--mobile"
                            :class="{ 'is-selected': isStateSelected(item.key) }" @click="handleStateClick(item.key)">
                            {{ item.label }} {{ getStateCount(item.countKey) }}
                        </div>
                    </div>
                </div>
            </div>
            <div class="terminal-panel__tab-container">
                <div class="terminal-panel__header">
                    <span class="terminal-panel__device-title">设备列表</span>
                    <div class="terminal-panel__action-bar">
                        <template v-if="ISPC">
                            <t-button v-show="isDetail" class="tr-button-default" label="字段设置" :showHint="true"
                                :tabIndex="1" @click="fasr_div_filed_OnClick">
                            </t-button>
                            <div class="terminal-panel__detail-toggle-wrap">
                                <span class="terminal-panel__detail-label">
                                    {{
                                        $t('Schema.Page.UCTerminalList.Controls.fasr_label_288174_Copye288174_Copyc288174_Copy.ConstValue',
                                    '详细信息') }}
                                </span>
                                <t-toggle class="terminal-panel__toggle"
                                    :label="$t('Schema.Page.UCTerminalList.Controls.fasr_toggle_1a3051.Label', '详细信息')"
                                    helpPlacement='bottom' labelPosition='left' :tabIndex='1' :hideLabel='true'
                                    @change='fasr_toggle_1a3051_OnChange' v-model='isDetail'>
                                </t-toggle>
                            </div>
                            <t-button class="tr-button-primary" label="一键开启充电" :showHint="true" :tabIndex="1"
                                :loading="LoadingStartOneKeyCharge" @click="startCharging">
                            </t-button>
                            <t-button class="tr-button-default" label="一键结束充电" :showHint="true" :tabIndex="1"
                                :loading="LoadingStopOneKeyCharge" @click="stopCharging">
                            </t-button>
                            <t-button class="tr-button-default" label="定时充电" :showHint="true" :tabIndex="1"
                                @click="setTimedCharging">
                            </t-button>
                        </template>
                        <i v-if="!ISPC" class="fas icon-t-refresh terminal-panel__mobile-refresh"
                            @click="handleMobileRefreshIconClick">
                        </i>

                        <div v-if="!ISPC" class="terminal-panel__mobile-menu-wrapper" ref="mobileActionMenuRef">
                            <button class="terminal-panel__mobile-menu-trigger" @click.stop="toggleMobileActionMenu">
                                ⋯
                            </button>
                            <div v-if="mobileActionMenuVisible" class="terminal-panel__mobile-menu" @click.stop>
                                <span class="terminal-panel__mobile-menu-item" @click="handleMobileStartCharging">
                                    一键开启充电
                                </span>
                                <span class="terminal-panel__mobile-menu-item" @click="handleMobileStopCharging">
                                    一键结束充电
                                </span>
                                <span class="terminal-panel__mobile-menu-item" @click="handleMobileSetTimedCharging">
                                    定时充电
                                </span>
                                <span class="terminal-panel__mobile-menu-item terminal-panel__mobile-menu-item--toggle">
                                    <span>详细信息</span>
                                    <t-toggle class="terminal-panel__toggle terminal-panel__toggle--mobile"
                                        :label="$t('Schema.Page.UCTerminalList.Controls.fasr_toggle_1a3051.Label', '详细信息')"
                                        helpPlacement='bottom' labelPosition='left' :tabIndex='1' :hideLabel='true'
                                        @change='fasr_toggle_1a3051_OnChange' v-model='isDetail'>
                                    </t-toggle>
                                </span>
                                <span v-if="isDetail" class="terminal-panel__mobile-menu-item"
                                    @click="handleMobileFiledSetting">
                                    字段设置
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="terminal-panel__list-scroll">
                    <div v-if="LoadingPiles" class="terminal-panel__loading">
                        <CommonLoading />
                    </div>
                    <FasrTerminals class="terminal-panel__list" :tabIndex='1' :localVars='terminalListState'
                        @OnFireEvent='fasr_terminals_OnFireEvent'>
                    </FasrTerminals>
                </div>
            </div>

        </div>
        <TerminalSettingsDrawr ref="terminalSettingsDrawrRef" @updateskillsmp="updateSkillsmp" />
        <t-dialog v-model:show="IfShowTimingOneKeyCharge" :position="positionDialog">
            <div class="terminal-panel__dialog">
                <div class="terminal-panel__dialog-title-row">
                    <span class="terminal-panel__dialog-title">定时充电</span>
                    <t-button class=' tr-button-icon-text2' label='' icon='fas dx-icon icon-t-delete-01'
                        :showHint='true' @click="IfShowTimingOneKeyCharge = false" :tabIndex='1' v-close-popup>
                    </t-button>
                </div>
                <div class="terminal-panel__dialog-body">
                    <div v-if="TimingOneKeyCharge.length > 0">
                        <div class="card">
                            <div class="terminal-panel__dialog-item-row">
                                <div class="terminal-panel__dialog-field">电站</div>
                                <div class="value">{{ currentStation.Name }}</div>
                            </div>
                            <div class="terminal-panel__dialog-item-row">
                                <div class="terminal-panel__dialog-field">充电时间</div>
                                <div class="value">
                                    <div class="time-item" :key="item.ChargeTime" v-for="item in TimingOneKeyCharge">
                                        {{ item.ChargeTime }}</div>

                                </div>
                            </div>
                            <div class="terminal-panel__dialog-item-row terminal-panel__dialog-item-row--last">
                                <div class="terminal-panel__dialog-field">定时类型</div>
                                <div class="value">
                                    <span>{{ TimingOneKeyCharge[0].TimeType == 1 ? '仅定时一次' : '长期定时' }}</span>
                                    <span v-if="TimingOneKeyCharge[0].IsCompensate == 0">（充电失败后3分钟自动重试）</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div v-else>
                        <div class="card">
                            <div class="terminal-panel__dialog-item-row">
                                <div class="terminal-panel__dialog-field">电站</div>
                                <div class="value">{{ currentStation.Name }}</div>
                            </div>
                            <div class="terminal-panel__dialog-item-row">
                                <div class="terminal-panel__dialog-field">充电时间</div>
                                <div class="value" id="OneCharge">
                                    <div class="time-input terminal-panel__time-input-row" :key="index"
                                        v-for="(item, index) in timingOneKeyChargeForm.ChargeTimeList">

                                        <t-date-time class="terminal-panel__time-picker tr-datetime-div"
                                            v-model="item.time" :hideLabel='true' displayFormatWithTime='HH:mm'
                                            helpPlacement='bottom' dateType='time' placeholder="任意时间点">
                                        </t-date-time>
                                        <!-- 减号按钮 -->
                                        <t-button icon="fas dx-icon icon-t-delete-01" label=""
                                            class="terminal-panel__remove-time-button tr-button-icon-default"
                                            :show-hint="true" v-show="timingOneKeyChargeForm.ChargeTimeList.length > 1"
                                            @click="removeChargeTimeList(index)" />
                                    </div>

                                    <div v-show="timingOneKeyChargeForm.ChargeTimeList.length < 6"
                                        class="terminal-panel__add-time-row">
                                        <!-- 添加按钮 -->
                                        <t-button label="添加" class="tr-button-default" :show-hint="true" icon="add"
                                            @click="addChargeTimeList" />
                                        <span>（最多添加6个，仍可添加 {{ 6 - timingOneKeyChargeForm.ChargeTimeList.length }}
                                            个）</span>
                                    </div>
                                </div>
                            </div>
                            <div class="terminal-panel__dialog-item-row terminal-panel__dialog-item-row--last">
                                <div class="terminal-panel__dialog-field">定时类型</div>
                                <div class="value">
                                    <div>

                                        <t-checkbox-group label="" v-model="timingOneKeyChargeForm.IsCompensate"
                                            displayFiled="label" valueFiled="value"
                                            :readonly="TimingOneKeyCharge.length == 0" :options="[
                                                { label: '充电失败后3分钟自动重试（仅重试一次）', value: '0' },
                                            ]" />
                                    </div>
                                    <div>
                                        <t-radio-group label="" labelPosition="left" :inline="true"
                                            v-model="timingOneKeyChargeForm.TimeType" :options="oneKeyChargeTimeType">
                                        </t-radio-group>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <span slot="footer" class="select_helper_popup_foot">
                        <div v-if="TimingOneKeyCharge.length > 0">
                            <t-button flat label="返回" class="tr-button-default"
                                @click="IfShowTimingOneKeyCharge = false" />
                            <t-button flat label="撤销" class="tr-button-primary"
                                :loading="loadingRemoveTimingOneKeyCharge" @click="removeTimingOneKeyCharge" />
                        </div>
                        <div v-else>
                            <t-button flat label="返回" class="tr-button-default"
                                @click="IfShowTimingOneKeyCharge = false" />
                            <t-button flat label="保存" class="tr-button-primary" @click="saveTimingOneKeyCharge" />
                        </div>
                    </span>
                </div>
            </div>
        </t-dialog>
    </div>
</template>

<script setup lang="ts">
import {
    ref,
    onMounted,
    computed,
    onUnmounted,
    reactive,
    nextTick,
    watch,
    toRef,
    unref
} from 'vue';
import { DataQueryClass } from '../fas/models/DataQueryClass';
import { DataQueryClassAsync } from '../fas/models/DataQueryClassAsync';
import { ActionClass } from '../fas/models/ActionClass';
import { ActionClassAsync } from '../fas/models/ActionClassAsync';
const Funcs = window.Funcs;
import '../fas/action/Action_GetStaPiles.ts';
import '../fas/action/Action_GetStaAndPileCount.ts';
import '../fas/action/Action_GetPowerCharingAbnormalData.ts';
import TerminalSettingsDrawr from './TerminalSettingsDrawr.vue';
import CommonLoading from './CommonLoading.vue';
import {
  createDefaultCtrlList,
  fetchCtrlListByStation,
  fetchTimingOneKeyCharge,
  saveTimingOneKeyChargeApi,
  removeTimingOneKeyChargeApi,
  startOneKeyChargeApi,
  fetchStopChargeCountApi,
  stopOneKeyChargeApi,
  getPileFieldSetProfile,
  setPileFieldSetProfile
} from './terminal-panel.api.js';

const screenWidth = ref(window.innerWidth);
const updateScreenWidth = () => {
    const newWidth = window.innerWidth;
    if ((newWidth < 768 && screenWidth.value >= 768) || (newWidth >= 768 && screenWidth.value < 768)) {
        screenWidth.value = newWidth;
    }
};
const positionDialog = ref('bottom');
if (window.innerWidth >= 768) {
    positionDialog.value = 'standard';
}
const ISPC = computed(() => screenWidth.value > 767);
const mobileActionMenuVisible = ref(false);
const mobileActionMenuRef = ref<HTMLElement | null>(null);
const toggleMobileActionMenu = () => {
    mobileActionMenuVisible.value = !mobileActionMenuVisible.value;
};
const closeMobileActionMenu = () => {
    mobileActionMenuVisible.value = false;
};
const handleMobileStartCharging = () => {
    closeMobileActionMenu();
    startCharging();
};
const handleMobileStopCharging = () => {
    closeMobileActionMenu();
    stopCharging();
};
const handleMobileSetTimedCharging = () => {
    closeMobileActionMenu();
    setTimedCharging();
};
const handleMobileRefreshIconClick = () => {
    panelController.refresh(unref(stationId), {
        onCount: props.onRefreshCount
    });
};
const handleMobileFiledSetting = () => {
    closeMobileActionMenu();
    fasr_div_filed_OnClick(null);
};
const handleDocumentClick = (event: MouseEvent) => {
    if (!mobileActionMenuVisible.value) return;
    const target = event.target as Node | null;
    if (mobileActionMenuRef.value && target && !mobileActionMenuRef.value.contains(target)) {
        closeMobileActionMenu();
    }
};
import FasrTerminals from '../fas/component/fasr_terminals.vue';
const fireUCEvent = defineEmits(['OnLoaded', 'FiledSetting']);
const DataQuery = new DataQueryClass();
DataQuery.Promise = new DataQueryClassAsync();
const Action = new ActionClass();
Action.Promise = new ActionClassAsync();
window.addPCStyle();
const IfShowTimingOneKeyCharge = ref(false);
const TimingOneKeyCharge = ref<any[]>([]);
const currentStation = reactive({
    ID: '',
    Name: ''
});
const timingOneKeyChargeForm = reactive({
    ChargeTimeList: [] as { time: string }[],
    TimeType: 1,
    IsCompensate: 0,
    ChargeType: '1'
});
const loadingRemoveTimingOneKeyCharge = ref(false);
const oneKeyChargeTimeType = [
    { label: '仅定时一次', value: 1 },
    { label: '长期定时', value: 2 }
];
const MIN_CHARGE_TIME_INTERVAL_MINUTES = 10;
const LoadingStartOneKeyCharge = ref(false);
const LoadingStopOneKeyCharge = ref(false);

const CtrlList = ref(createDefaultCtrlList());

async function getCtrlList() {
    const result = await fetchCtrlListByStation(props.StaId || unref(stationId));
    CtrlList.value = result.ctrlList;
}

const getTimingOneKeyCharge = () => {
    const StaId = currentStation.ID || unref(stationId);
    if (!StaId) return;
    fetchTimingOneKeyCharge(StaId).then((result) => {
        TimingOneKeyCharge.value = result.timingList;
        timingOneKeyChargeForm.ChargeTimeList = result.defaultChargeTimeList;
    });
};
const resetTimingOneKeyChargeForm = () => {
    timingOneKeyChargeForm.ChargeTimeList = [];
    timingOneKeyChargeForm.TimeType = 1;
    timingOneKeyChargeForm.IsCompensate = 0;
    timingOneKeyChargeForm.ChargeType = '1';
};
const toChargeTimeTimestamp = (time) => new Date(`2022-01-01 ${time}`).getTime();
const validateChargeTimeList = (chargeTimeList) => {
    const sortedTimeList = chargeTimeList
        .map(toChargeTimeTimestamp)
        .sort((prev, next) => prev - next);

    for (let i = 1; i < sortedTimeList.length; i++) {
        if (sortedTimeList[i] - sortedTimeList[i - 1] < 60000 * MIN_CHARGE_TIME_INTERVAL_MINUTES) {
            Funcs.Notify(
                '消息',
                `时间间隔必须大于等于${MIN_CHARGE_TIME_INTERVAL_MINUTES}分钟!`,
                'warning'
            );
            return false;
        }
    }

    return true;
};

const saveTimingOneKeyCharge = () => {
    const StaId = currentStation.ID || unref(stationId);
    if (!StaId) return Funcs.Notify('消息', '请先选择电站', 'warning');

    const ChargeTimeList = timingOneKeyChargeForm.ChargeTimeList.map((v) => v.time);
    if (!validateChargeTimeList(ChargeTimeList)) return;

    saveTimingOneKeyChargeApi(StaId, timingOneKeyChargeForm, ChargeTimeList).then((result) => {
        if (result.success) {
            Funcs.Notify('消息', '定时成功', 'success');
            resetTimingOneKeyChargeForm();
            IfShowTimingOneKeyCharge.value = false;
        }
        else {
            Funcs.Notify('消息', result.errorMessage || '定时失败', 'error');
        }
    });
};
const removeTimingOneKeyCharge = () => {
    loadingRemoveTimingOneKeyCharge.value = true;
    const staId = currentStation.ID || unref(stationId);
    removeTimingOneKeyChargeApi(staId, TimingOneKeyCharge.value).then((result) => {
        loadingRemoveTimingOneKeyCharge.value = false;
        if (result.success) {
            Funcs.Notify('消息', '移除成功', 'success');
            IfShowTimingOneKeyCharge.value = false;
        }
        else {
            Funcs.Notify('消息', result.errorMessage || '移除失败', 'error');
        }
    });
};
const addChargeTimeList = () => {
    const { ChargeTimeList } = timingOneKeyChargeForm;
    if (ChargeTimeList.length === 0) {
        ChargeTimeList.push({ time: '00:00' });
        return;
    }
    const lastTime = ChargeTimeList[ChargeTimeList.length - 1].time || '00:00';
    const newTime = new Date(new Date('2020-01-01 ' + lastTime).getTime() + 10 * 60 * 1000);
    const time = newTime.format('hh:mm');
    ChargeTimeList.push({ time });
};
const removeChargeTimeList = (index) => {
    timingOneKeyChargeForm.ChargeTimeList.splice(index, 1);
};
const startCharging = () => {
    if (LoadingStartOneKeyCharge.value) return;
  const List = terminalPiles.value.filter((f) =>
        ['已插枪', '已充电', '空闲'].includes(f.PileRealTimeState)
    );
  const unList = terminalPiles.value.filter(
        (f) => !['已插枪', '已充电', '空闲'].includes(f.PileRealTimeState)
    );
    if (List.length == 0) {
        Funcs.Notify('消息', '当前没有处于\'已插枪或已充电或空闲（可启动充电）\'的终端', 'warning');
        return;
    }
    Funcs.Confirm(
        '提示',
        `确定要给本次${List.length}个已插枪或已充电或空闲（可启动充电）的终端充电吗?`,
        () => {
            LoadingStartOneKeyCharge.value = true;
            startOneKeyChargeApi(
                unref(stationId),
                unref(stationName),
                List,
                unList
            )
                .then((result) => {
                    if (result.success) {
                        Funcs.Notify('消息', '指令下发成功', 'success');
                    }
                    else {
                        Funcs.Notify('消息', result.errorMessage || '一键充电失败', 'warning');
                    }
                })
                .finally(() => {
                    LoadingStartOneKeyCharge.value = false;
                });
        }
    );
};
const setTimedCharging = () => {
    const staId = unref(stationId);
    if (!staId) {
        Funcs.Notify('消息', '请先选择电站', 'warning');
        return;
    }
    currentStation.ID = staId;
    currentStation.Name = unref(stationName) || currentStation.Name;
    getTimingOneKeyCharge();
    IfShowTimingOneKeyCharge.value = true;
};

const stopCharging = () => {
    if (LoadingStopOneKeyCharge.value) return;
    if (terminalPiles.value.length == 0) return Funcs.Notify('消息', '当前电站没有集控', 'warning');

    LoadingStopOneKeyCharge.value = true;
    fetchStopChargeCountApi(unref(stationId), CtrlList.value)
        .then((result) => {
            if (result.success) {
                if (result.count == 0) {
                    Funcs.Notify('消息', '当前电站或所选集控没有需要停止充电的终端', 'warning');
                }
                else if (result.count > 0) {
                    Funcs.Confirm(
                        '提示',
                        `目前总共 ${result.count} 个正在充电的终端，确认全部停止充电吗？`,
                        function () {
                            stopOneKeyCharge();
                        }
                    );
                }
            }
            else {
                Funcs.Notify('消息', result.errorMessage || '结束一键充电失败', 'error');
            }
        })
        .finally(() => {
            LoadingStopOneKeyCharge.value = false;
        });
};
const stopOneKeyCharge = () => {
    LoadingStopOneKeyCharge.value = true;
    stopOneKeyChargeApi(unref(stationId), CtrlList.value)
        .then((result) => {
            if (result.success) {
                Funcs.Notify('消息', '指令下发成功', 'success');
            }
            else {
                Funcs.Notify('消息', result.errorMessage || '指令下发失败', 'error');
            }
        })
        .finally(() => {
            LoadingStopOneKeyCharge.value = false;
        });
};
const props = defineProps({
    infoSet: {
        type: Object,
        default: () => ({
            one: false,
            two: false,
            three: false,
            isDetail: false,
            oneOld: false,
            twoOld: false,
            threeOld: false
        })
    },
    isShow: { type: String, default: false },
    StaId: { type: String, default: '' },
    StationName: { type: String, default: '' },
    onRefreshCount: { type: Function, default: null },
    visible: { type: Boolean, default: true }
});
const stationId = toRef(props, 'StaId');
const stationName = toRef(props, 'StationName');
watch(
    () => props.StaId,
    (newStaId) => {
        if (newStaId) {
            getCtrlList();
            return;
        }
        CtrlList.value = createDefaultCtrlList();
    },
    { immediate: true }
);
const SelectedCtrlId = ref('');
const LoadingPiles = ref(false);
const primaryStateOptions = [
    { key: 'free', label: '空闲', countKey: 'FreeStatePileCount' },
    { key: 'charging', label: '充电中', countKey: 'ChargingStatePileCount' },
    { key: 'gunInserted', label: '已插枪', countKey: 'ConnectedChargingCount' },
    { key: 'chargeFull', label: '已充满', countKey: 'FullChargingCount' },
    { key: 'offGrid', label: '离网', countKey: 'OffLineStatePileCount' },
    { key: 'faulty', label: '故障', countKey: 'FaultStatePileCount' },
    { key: 'other', label: '其他', countKey: 'OtherStatePileCount' }
] as const;
const abnormalStateOptions = [
    { key: 'high', label: '高异常', countKey: 'HighAbnormalCount' },
    { key: 'slow', label: '充电慢', countKey: 'ChargeSlowCount' }
] as const;
const PRIMARY_STATE_LABELS = ['空闲', '充电中', '已插枪', '已充满', '离网', '故障'];
const MAIN_STATE_FILTERS = {
    free: (pile) => pile.PileRealTimeState == '空闲',
    charging: (pile) => pile.PileRealTimeState == '充电中',
    gunInserted: (pile) => pile.PileRealTimeState == '已插枪',
    chargeFull: (pile) => pile.PileRealTimeState == '已充满',
    offGrid: (pile) => pile.PileRealTimeState == '离网',
    faulty: (pile) => pile.PileRealTimeState.includes('故障'),
    other: (pile) =>
        !PRIMARY_STATE_LABELS.includes(pile.PileRealTimeState)
        && !String(pile.PileRealTimeState || '').includes('故障'),
    high: (pile) => pile.IsHighAbnormal,
    slow: (pile) => pile.IsChargeSlow
} as const;
const SUB_STATE_FILTERS = {
    noCharge: (pile) => !pile.IsCharged,
    isCharge: (pile) => pile.IsCharged
} as const;
const isStateSelected = (state: string) => !!selectedStates[state];
const getStateCount = (countKey: string) => pileStates[countKey] ?? 0;
const handleStateClick = (state: string) => {
    panelController.selectState(state);
};
const filterBySelectedCtrl = (list) => {
    const selectedId = unref(SelectedCtrlId);
    if (!selectedId) return list;
    return list.filter((item) => item.CtrlAddress === selectedId);
};
const parseOccupyMinutes = (value) => {
    if (!value && value !== 0) return 0;
    if (typeof value === 'number') return value;
    const text = String(value);
    if (text.includes(':')) {
        const parts = text
            .split(':')
            .map((item) => parseInt(item, 10))
            .filter((item) => !Number.isNaN(item));
        if (parts.length >= 2) return parts[0] * 60 + parts[1];
    }
    const match = text.match(/\d+/);
    return match ? parseInt(match[0], 10) : 0;
};
const updatePileStatesByList = (list) => {
    applyPileStateSummary({
        AllCount: list.length,
        FreeStatePileCount: list.filter((pile) => pile.PileRealTimeState == '空闲').length,
        ChargingStatePileCount: list.filter((pile) => pile.PileRealTimeState == '充电中').length,
        ConnectedChargingCount: list.filter((pile) => pile.PileRealTimeState == '已插枪').length,
        FullChargingCount: list.filter((pile) => pile.PileRealTimeState == '已充满').length,
        OffLineStatePileCount: list.filter((pile) => pile.PileRealTimeState == '离网').length,
        FaultStatePileCount: list.filter(
            (pile) => pile.PileRealTimeState && pile.PileRealTimeState.includes('故障')
        ).length,
        OtherStatePileCount: list.filter(
            (pile) =>
                !['空闲', '充电中', '已插枪', '已充满', '离网', '故障'].includes(pile.PileRealTimeState)
                && !String(pile.PileRealTimeState || '').includes('故障')
        ).length,
        HighAbnormalCount: list.filter((pile) => pile.IsHighAbnormal).length,
        ChargeSlowCount: list.filter((pile) => pile.IsChargeSlow).length,
        Occupy30mCount: list.filter((pile) => parseOccupyMinutes(pile.OccupyTime) >= 30).length,
        OccupyUnNoticeCount: list.filter((pile) => pile.IsNoGunOccupancy).length
    });
};
watch(SelectedCtrlId, () => {
    panelController.refresh();
});
const isDetail = ref(false);
const pileStates = reactive({
    AllCount: 0,
    StaCount: 0,
    DCCount: 0,
    ACCount: 0,
    SuspendStaCount: 0,
    ChargingStatePileCount: 0,
    FreeStatePileCount: 0,
    OtherStatePileCount: 0,
    OffLineStatePileCount: 0,
    FaultStatePileCount: 0,
    NoChargingStatePileCount: 0,
    ConnectedChargingCount: 0,
    FullChargingCount: 0,
    FastChargingCount: 0,
    FastChargingFreeCount: 0,
    SlowChargingCount: 0,
    SlowChargingFreeCount: 0,
    SuddenStopCount: 0,
    HighAbnormalCount: 0,
    ChargeSlowCount: 0
});
const selectedStates = reactive({
    all: false,
    free: false,
    charging: false,
    gunInserted: false,
    chargeFull: false,
    offGrid: false,
    faulty: false,
    other: false,
    high: false,
    slow: false,
    noCharge: false,
    isCharge: false,
    unNotice: false,
    over: false
});
const cachedPiles = ref<any[]>([]);
const terminalPiles = ref<any[]>([]);
const terminalInfoSet = reactive({
    one: false,
    two: false,
    three: false,
    isDetail: false,
    oneOld: false,
    twoOld: false,
    threeOld: false
});
const terminalListState = reactive({
    Piles: [] as any[],
    isMaskOpen: false,
    isDetail: false,
    infoSet: terminalInfoSet
});
watch(terminalPiles, (value) => {
    terminalListState.Piles = value;
}, { immediate: true });
watch(isDetail, (value) => {
    terminalListState.isDetail = value;
}, { immediate: true });
const stateKeys = [
    'free',
    'charging',
    'gunInserted',
    'chargeFull',
    'offGrid',
    'faulty',
    'other',
    'high',
    'slow',
    'noCharge',
    'isCharge',
    'unNotice',
    'over'
] as const;
const subStateKeys = ['noCharge', 'isCharge', 'unNotice', 'over'] as const;
const validStateKeys = new Set(stateKeys);
const dedupePilesById = (list) => {
    const uniqueIds = new Set(list.map((item) => item.PileID));
    return list.filter((item) => uniqueIds.has(item.PileID) && uniqueIds.delete(item.PileID));
};
const applyPileStateSummary = (summary) => {
    Object.assign(pileStates, summary);
};
const applyPileStateSummaryFromRequest = (data) => {
    applyPileStateSummary({
        FreeStatePileCount: data.FreeStatePileCount || 0,
        ChargingStatePileCount: data.ChargingStatePileCount || 0,
        ConnectedChargingCount: data.ConnectedChargingCount || 0,
        FullChargingCount: data.FullChargingCount || 0,
        OffLineStatePileCount: data.OffLineStatePileCount || 0,
        FaultStatePileCount: data.FaultStatePileCount || 0,
        OtherStatePileCount: data.OtherStatePileCount || 0,
        AllCount: data.PileSum || 0,
        HighAbnormalCount: data.HighAbnormalCount || 0,
        ChargeSlowCount: data.ChargeSlowCount || 0,
        Occupy30mCount: data.Occupy30mCount || 0,
        OccupyUnNoticeCount: data.OccupyUnNoticeCount || 0
    });
};
const getSelectedStateKeys = () => {
    return Object.entries(selectedStates)
        .filter(([, value]) => value === true)
        .map(([key]) => key);
};
const clearSelectedSubStates = () => {
    selectedStates.noCharge = false;
    selectedStates.isCharge = false;
    selectedStates.unNotice = false;
    selectedStates.over = false;
};
const clearChargeSelectedSubStates = () => {
    selectedStates.noCharge = false;
    selectedStates.isCharge = false;
};
const clearOccupySelectedSubStates = () => {
    selectedStates.unNotice = false;
    selectedStates.over = false;
};
const syncSelectedStateDependencies = () => {
    const selectedStateList = getSelectedStateKeys();

    if (!selectedStateList.includes('gunInserted') && !selectedStateList.includes('chargeFull')) {
        clearSelectedSubStates();
        return;
    }

    if (!selectedStateList.includes('gunInserted')) {
        clearChargeSelectedSubStates();
        return;
    }

    if (selectedStates.isCharge) {
        clearOccupySelectedSubStates();
    }
};
const toggleSelectedState = (state) => {
    if (state && validStateKeys.has(state)) {
        selectedStates[state] = !selectedStates[state];
    }
};

const refreshTerminalList = (stationID = unref(stationId), { loading = false, onCount } = {}) => {
    if (loading) {
        LoadingPiles.value = true;
    }

    Action.Action_GetStaPiles(stationID)
        .then((req) => {
            if (!req?.Record?.Data) {
                return;
            }

            const piles = _.cloneDeep(req.Record.Data.Piles);
            const basePiles = filterBySelectedCtrl(piles);

            // 缓存原始数据用于后续的前端过滤
            cachedPiles.value = basePiles;
            if (!!unref(SelectedCtrlId)) {
                updatePileStatesByList(basePiles);
            }
            else {
                applyPileStateSummaryFromRequest(req.Record.Data);
            }
            filterTerminalPiles(basePiles, onCount);
        })
        .finally(() => {
            if (loading) {
                LoadingPiles.value = false;
            }
        });
};

const filterTerminalPiles = (basePiles = null, onCount) => {
    const pilesToFilter = basePiles || cachedPiles.value || [];

    let filterPiles = [];
    let newPiles = [];

    const hasMainStateSelected = stateKeys
        .filter((state) => !subStateKeys.includes(state as typeof subStateKeys[number]))
        .some((state) => selectedStates[state]);

    if (!hasMainStateSelected) {
        newPiles = [...pilesToFilter];
    }
    else {
        for (let i = 0; i < stateKeys.length; i++) {
            if (
                !subStateKeys.includes(stateKeys[i] as typeof subStateKeys[number])
                && selectedStates[stateKeys[i]]
            ) {
                const filterFn = MAIN_STATE_FILTERS[stateKeys[i]];
                filterPiles = filterFn ? pilesToFilter.filter(filterFn) : [];
                newPiles = [...newPiles, ...filterPiles];
            }
        }

        newPiles = dedupePilesById(newPiles);
    }

    let filterPiles1 = [];
    let newPiles1 = [];
    let isFilter = false;

    for (let i = 0; i < stateKeys.length; i++) {
        if (
            subStateKeys.includes(stateKeys[i] as typeof subStateKeys[number])
            && selectedStates[stateKeys[i]]
        ) {
            isFilter = true;
            const filterFn = SUB_STATE_FILTERS[stateKeys[i]];
            filterPiles1 = filterFn ? newPiles.filter(filterFn) : [];
        }
        newPiles1 = [...newPiles1, ...filterPiles1];
    }

    if (isFilter) {
        terminalPiles.value = dedupePilesById(newPiles1);
    }
    else {
        terminalPiles.value = newPiles;
    }

    const count = Array.isArray(terminalPiles.value) ? terminalPiles.value.length : 0;
    if (onCount) {
        onCount(count);
    }
};

const refreshStatePiles = () => { };

const selectState = (state, { loading = false, onCount } = {}) => {
    LoadingPiles.value = loading;
    toggleSelectedState(state);
    syncSelectedStateDependencies();
    filterTerminalPiles(null, onCount);
};

const panelController = {
    refresh: refreshTerminalList,
    filterPiles: filterTerminalPiles,
    refreshStatePiles,
    selectState
};
async function Page_OnError(e) {
    Funcs.HandleError(e);
}
const updateSkillsmp = (e) => {
    Object.assign(terminalInfoSet, e);
};
const terminalSettingsDrawrRef = ref(null);
async function fasr_div_filed_OnClick(e) {
    terminalSettingsDrawrRef.value.openDrawer(terminalInfoSet);
}

async function fasr_toggle_1a3051_OnChange(e) {
    terminalInfoSet.isDetail = !!isDetail.value;
    setPileFieldSetProfile(JSON.stringify({
        one: terminalInfoSet.one,
        two: terminalInfoSet.two,
        three: terminalInfoSet.three,
        isDetail: isDetail.value
    }));
}
async function fasr_terminals_OnFireEvent(e) {
    panelController.refresh();
}
Object.assign(terminalInfoSet, props.infoSet || {});
isDetail.value = !!terminalInfoSet.isDetail;
watch(ISPC, (isPC) => {
    if (isPC) {
        closeMobileActionMenu();
    }
});

onMounted(async () => {
    fireUCEvent('OnLoaded');
    await nextTick();
    TFF.core.monitor.error.onError(Page_OnError);
    window.addEventListener('resize', updateScreenWidth);
    document.addEventListener('click', handleDocumentClick);
});
onUnmounted(async () => {
    window.removeEventListener('resize', updateScreenWidth);
    document.removeEventListener('click', handleDocumentClick);
});

getPileFieldSetProfile().then((config) => {
    if (config) {
        terminalInfoSet.one = config.one;
        terminalInfoSet.two = config.two;
        terminalInfoSet.three = config.three;
        terminalInfoSet.isDetail = !!config.isDetail;
        terminalInfoSet.oneOld = config.one;
        terminalInfoSet.twoOld = config.two;
        terminalInfoSet.threeOld = config.three;
        isDetail.value = !!config.isDetail;
    }
});
defineExpose({
    refresh: panelController['refresh'],
    refreshStatePiles: panelController['refreshStatePiles'],
    selectState: panelController['selectState']
});
</script>

<style>
.terminal-panel {
    width: 100%;
}

.terminal-panel__content {
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    row-gap: 12px;
    height: 100%;
}

.terminal-panel__filters--pc {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: flex-start;
    column-gap: 40px;
    row-gap: 16px;
    padding: 16px 24px;
    background: #fff;
    border-radius: 0 0 12px 12px;
}

.terminal-panel__filter-column {
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: space-between;
    row-gap: 10px;
    height: 100%;
    align-items: flex-start;
}

.terminal-panel__filter-row {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: center;
    gap: 16px;
}

.terminal-panel__abnormal-section {
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: flex-start;
    row-gap: 8px;
    align-items: flex-start;
    column-gap: 8px;
    flex-grow: 1;
}

.terminal-panel__abnormal-title-wrap {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: center;
    column-gap: 5px;
}

.terminal-panel__abnormal-chip-wrap,
.terminal-panel__state-wrap {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
}

.terminal-panel__state-wrap {
    flex-wrap: wrap;
    column-gap: 12px;
    row-gap: 12px;
}

.terminal-panel__abnormal-chip-wrap {
    flex-wrap: nowrap;
    column-gap: 12px;
}

.terminal-panel__section-title {
    font-size: 14px;
    color: rgba(0, 0, 0, 0.8);
    white-space: nowrap;
}

.terminal-panel__state-chip {
    box-sizing: border-box;
    cursor: pointer;
    color: rgba(0, 0, 0, 0.8);
}

.terminal-panel__state-chip--pc {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
    height: 32px;
    padding: 4px 10px;
    border-radius: 4px;
    background: #edeff3;
    border: 1px solid transparent;
}

.terminal-panel__state-chip--mobile {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    height: 25px;
    padding: 4px 8px;
    gap: 10px;
    border-radius: 100px;
    white-space: nowrap;
    font-size: 12px;
    line-height: 1;
    background: #edeff3;
    border: 1px solid transparent;
}

.terminal-panel__state-chip.is-selected {
    background: rgba(var(--t-color-rgb), 0.05);
    border-color: rgba(var(--t-color-rgb), 0.1);
    color: rgba(var(--t-color-rgb), 1);
}

.terminal-panel__state-text {
    font-family: AlibabaPuHuiTi, sans-serif;
    font-size: 14px;
    user-select: none;
    white-space: nowrap;
    color: inherit;
}

.terminal-panel__filters--mobile {
    display: flex;
    flex-direction: column;
    padding: 0 12px 8px;
    gap: 2px;
}

.terminal-panel__mobile-section {
    display: flex;
    height: 32px;
    gap: 6px;
}

.terminal-panel__mobile-section-title {
    display: flex;
    align-items: center;
    height: 100%;
    font-size: 12px;
    color: rgba(0, 0, 0, 0.56);
    white-space: nowrap;
}

.terminal-panel__mobile-row {
    display: flex;
    align-items: center;
    gap: 12px;
    overflow-x: auto;
    overflow-y: hidden;
    -ms-overflow-style: none;
    scrollbar-width: none;
}

.terminal-panel__mobile-row::-webkit-scrollbar {
    display: none;
}

.terminal-panel__tab-container {
    min-height: calc(100vh - 206px);
    padding: 12px;
    border-radius: 12px 12px 0 0;
    background: #fff;
    display: flex;
    flex-direction: column;
    flex: 1;
}

.terminal-panel__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
}

.terminal-panel__device-title {
    font-size: 14px;
    color: rgba(0, 0, 0, 0.8);
}

.terminal-panel__action-bar {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: flex-end;
    align-items: center;
    column-gap: 10px;
}

.terminal-panel__detail-toggle-wrap {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: flex-end;
    align-items: center;
    column-gap: 4px;
}

.terminal-panel__detail-label {
    font-family: AlibabaPuHuiTi, sans-serif;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.56);
}

.terminal-panel__toggle {
    opacity: 1;
}

.terminal-panel__toggle--mobile {
    min-height: 21px;
    height: 21px;
}

.terminal-panel__mobile-refresh {
    color: rgba(0, 0, 0, 0.56);
}

.terminal-panel__mobile-menu-wrapper {
    position: relative;
}

.terminal-panel__mobile-menu-trigger {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 21px;
    border: none;
    border-radius: 6px;
    background: transparent;
    color: rgba(0, 0, 0, 0.8);
    font-size: 18px;
    font-weight: bold;
    cursor: pointer;
}

.terminal-panel__mobile-menu {
    position: absolute;
    right: 0;
    top: calc(100% + 8px);
    min-width: 128px;
    padding: 4px 0;
    z-index: 10;
    border-radius: 12px;
    background: #fff;
    box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.12);
}

.terminal-panel__mobile-menu-item {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 8px 16px;
    color: rgba(0, 0, 0, 0.8);
    font-size: 14px;
}

.terminal-panel__mobile-menu-item--toggle {
    justify-content: space-between;
}

.terminal-panel__list-scroll {
    flex: 1;
    min-height: 0;
    position: relative;
    overflow-y: auto;
    overflow-x: hidden;
}

.terminal-panel__loading {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(255, 255, 255, 0.6);
    z-index: 1;
}

.terminal-panel__list {
    width: 100%;
    height: auto;
    gap: 10px;
    border-radius: 12px;
    flex: 1;
    min-height: 0;
}

.terminal-panel__dialog {
    width: 520px;
    background: #fff;
}

.terminal-panel__dialog-title-row {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 16px 24px 0;
}

.terminal-panel__dialog-title {
    font-size: 16px;
}

.terminal-panel__dialog-body {
    height: auto;
    overflow-y: auto;
    max-height: calc(100vh - 60px);
}

.terminal-panel__dialog-item-row {
    display: flex;
    line-height: 32px;
}

.terminal-panel__dialog-item-row--last {
    margin-top: 12px;
}

.terminal-panel__dialog-field {
    min-width: 120px;
}

.terminal-panel__time-input-row,
.terminal-panel__add-time-row {
    margin-top: 8px;
}

.terminal-panel__time-input-row {
    display: flex;
}

.terminal-panel__time-picker {
    max-width: 75%;
}

.terminal-panel__remove-time-button {
    margin-left: 10px;
}

@media screen and (max-width: 767px) {
    .terminal-panel__tab-container {
        padding: 0 12px 12px;
        background: transparent;
    }

    .terminal-panel__header {
        align-items: flex-start;
    }

    .terminal-panel__action-bar {
        align-self: flex-end;
    }

    .terminal-panel__list-scroll {
        max-height: calc(100vh - 250px);
        -webkit-overflow-scrolling: touch;
    }

    .pile {
        width: 100%;
        padding: 0 !important;
    }

    .piles {
        gap: 12px;
    }
}
</style>
