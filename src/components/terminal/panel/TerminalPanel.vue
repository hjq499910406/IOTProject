<template>
    <div class='UC_TerminalList terminal-panel' v-show='props.visible'>
        <div class="terminal-panel__content">
            <div v-if="ISPC" class="terminal-panel__filters terminal-panel__filters--pc">
                <div class="terminal-panel__filter-column">
                    <div class="terminal-panel__filter-row">
                        <span class="terminal-panel__section-title">{{ tt('terminal.status') }}</span>
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
                            <span class="terminal-panel__section-title">{{ tt('terminal.abnormal') }}</span>
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
                    :label="tt('terminal.controller')" :useInput='true'
                    helpPlacement='bottom' labelPosition='left' optionsPosition='' valueField="value"
                    displayField="label" :listDataSource='CtrlList' v-model="SelectedCtrlId">
                </t-select>
            </div>
            <div v-if="!ISPC" class="terminal-panel__filters terminal-panel__filters--mobile">
                <div class="terminal-panel__mobile-section">
                    <div class="terminal-panel__mobile-section-title">{{ tt('terminal.status') }}</div>
                    <div class="terminal-panel__mobile-row">
                        <div v-for="item in primaryStateOptions" :key="`mobile-${item.key}`"
                            class="terminal-panel__state-chip terminal-panel__state-chip--mobile"
                            :class="{ 'is-selected': isStateSelected(item.key) }" @click="handleStateClick(item.key)">
                            {{ item.label }} {{ getStateCount(item.countKey) }}
                        </div>
                    </div>
                </div>
                <div class="terminal-panel__mobile-section">
                    <div class="terminal-panel__mobile-section-title">{{ tt('terminal.abnormal') }}</div>
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
                    <span class="terminal-panel__device-title">{{ tt('device.list') }}</span>
                    <div class="terminal-panel__action-bar">
                        <template v-if="ISPC">
                            <t-button v-show="isDetail" class="tr-button-default" :label="tt('terminal.fieldSettings')" :showHint="true"
                                :tabIndex="1" @click="openFieldSettings">
                            </t-button>
                            <div class="terminal-panel__detail-toggle-wrap">
                                <span class="terminal-panel__detail-label">{{ tt('common.details') }}</span>
                                <t-toggle class="terminal-panel__toggle"
                                    :label="tt('common.details')"
                                    helpPlacement='bottom' labelPosition='left' :tabIndex='1' :hideLabel='true'
                                    @change='handleDetailToggleChange' v-model='isDetail'>
                                </t-toggle>
                            </div>
                            <t-button class="tr-button-primary" :label="tt('terminal.startChargingAll')" :showHint="true" :tabIndex="1"
                                :loading="LoadingStartOneKeyCharge" @click="startCharging">
                            </t-button>
                            <t-button class="tr-button-default" :label="tt('terminal.stopChargingAll')" :showHint="true" :tabIndex="1"
                                :loading="LoadingStopOneKeyCharge" @click="stopCharging">
                            </t-button>
                            <t-button class="tr-button-default" :label="tt('terminal.scheduledCharging')" :showHint="true" :tabIndex="1"
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
                                    {{ tt('terminal.startChargingAll') }}
                                </span>
                                <span class="terminal-panel__mobile-menu-item" @click="handleMobileStopCharging">
                                    {{ tt('terminal.stopChargingAll') }}
                                </span>
                                <span class="terminal-panel__mobile-menu-item" @click="handleMobileSetTimedCharging">
                                    {{ tt('terminal.scheduledCharging') }}
                                </span>
                                <span class="terminal-panel__mobile-menu-item terminal-panel__mobile-menu-item--toggle">
                                    <span>{{ tt('common.details') }}</span>
                                    <t-toggle class="terminal-panel__toggle terminal-panel__toggle--mobile"
                                        :label="tt('common.details')"
                                        helpPlacement='bottom' labelPosition='left' :tabIndex='1' :hideLabel='true'
                                        @change='handleDetailToggleChange' v-model='isDetail'>
                                    </t-toggle>
                                </span>
                                <span v-if="isDetail" class="terminal-panel__mobile-menu-item"
                                    @click="handleMobileFieldSetting">
                                    {{ tt('terminal.fieldSettings') }}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="terminal-panel__list-scroll">
                    <div v-if="LoadingPiles" class="terminal-panel__loading">
                        <CommonLoading />
                    </div>
                    <TerminalList class="terminal-panel__list" :tabIndex='1' :localVars='terminalListState'
                        @OnFireEvent='handleTerminalListFireEvent'>
                    </TerminalList>
                </div>
            </div>

        </div>
        <TerminalSettingsDrawer ref="terminalSettingsDrawerRef" @updateskillsmp="handleFieldSettingsUpdate" />
        <t-dialog v-model:show="IfShowTimingOneKeyCharge" :position="positionDialog">
            <div class="terminal-panel__dialog">
                <div class="terminal-panel__dialog-title-row">
                    <span class="terminal-panel__dialog-title">{{ tt('terminal.scheduledCharging') }}</span>
                    <t-button class=' tr-button-icon-text2' label='' icon='fas dx-icon icon-t-delete-01'
                        :showHint='true' @click="IfShowTimingOneKeyCharge = false" :tabIndex='1' v-close-popup>
                    </t-button>
                </div>
                <div class="terminal-panel__dialog-body">
                    <div v-if="TimingOneKeyCharge.length > 0">
                        <div class="card">
                            <div class="terminal-panel__dialog-item-row">
                                <div class="terminal-panel__dialog-field">{{ tt('station.name') }}</div>
                                <div class="value">{{ currentStation.Name }}</div>
                            </div>
                            <div class="terminal-panel__dialog-item-row">
                                <div class="terminal-panel__dialog-field">{{ tt('charge.chargeTime') }}</div>
                                <div class="value">
                                    <div class="time-item" :key="item.ChargeTime" v-for="item in TimingOneKeyCharge">
                                        {{ item.ChargeTime }}</div>

                                </div>
                            </div>
                            <div class="terminal-panel__dialog-item-row terminal-panel__dialog-item-row--last">
                                <div class="terminal-panel__dialog-field">{{ tt('terminal.scheduleType') }}</div>
                                <div class="value">
                                    <span>{{ TimingOneKeyCharge[0].TimeType == 1 ? tt('terminal.scheduledOnce') : tt('terminal.scheduledLongTerm') }}</span>
                                    <span v-if="TimingOneKeyCharge[0].IsCompensate == 0">{{ tt('terminal.retryAfterChargeFail') }}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div v-else>
                        <div class="card">
                            <div class="terminal-panel__dialog-item-row">
                                <div class="terminal-panel__dialog-field">{{ tt('station.name') }}</div>
                                <div class="value">{{ currentStation.Name }}</div>
                            </div>
                            <div class="terminal-panel__dialog-item-row">
                                <div class="terminal-panel__dialog-field">{{ tt('charge.chargeTime') }}</div>
                                <div class="value" id="OneCharge">
                                    <div class="time-input terminal-panel__time-input-row" :key="index"
                                        v-for="(item, index) in timingOneKeyChargeForm.ChargeTimeList">

                                        <t-date-time class="terminal-panel__time-picker tr-datetime-div"
                                            v-model="item.time" :hideLabel='true' displayFormatWithTime='HH:mm'
                                            helpPlacement='bottom' dateType='time' :placeholder="tt('terminal.anyTimePoint')">
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
                                        <t-button :label="tt('common.add')" class="tr-button-default" :show-hint="true" icon="add"
                                            @click="addChargeTimeList" />
                                        <span>{{ getAddTimeLimitHint() }}</span>
                                    </div>
                                </div>
                            </div>
                            <div class="terminal-panel__dialog-item-row terminal-panel__dialog-item-row--last">
                                <div class="terminal-panel__dialog-field">{{ tt('terminal.scheduleType') }}</div>
                                <div class="value">
                                    <div>

                                        <t-checkbox-group label="" v-model="timingOneKeyChargeForm.IsCompensate"
                                            displayFiled="label" valueFiled="value"
                                            :readonly="TimingOneKeyCharge.length == 0" :options="[
                                                { label: tt('terminal.retryAfterChargeFailOnce'), value: '0' },
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
                            <t-button flat :label="tt('common.back')" class="tr-button-default"
                                @click="IfShowTimingOneKeyCharge = false" />
                            <t-button flat :label="tt('common.undo')" class="tr-button-primary"
                                :loading="loadingRemoveTimingOneKeyCharge" @click="removeTimingOneKeyCharge" />
                        </div>
                        <div v-else>
                            <t-button flat :label="tt('common.back')" class="tr-button-default"
                                @click="IfShowTimingOneKeyCharge = false" />
                            <t-button flat :label="tt('common.save')" class="tr-button-primary" @click="saveTimingOneKeyCharge" />
                        </div>
                    </span>
                </div>
            </div>
        </t-dialog>
    </div>
</template>

<script setup>

import { pageText } from '../../../pages/i18n';
const tt = pageText;

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
import { ActionClass } from '../../../fas/models/ActionClass';
import { ActionClassAsync } from '../../../fas/models/ActionClassAsync';

const Funcs = window.Funcs;
import '../../../fas/action/Action_GetStaPiles';
import '../../../fas/action/Action_GetStaAndPileCount';
import '../../../fas/action/Action_GetPowerCharingAbnormalData';
import TerminalSettingsDrawer from './TerminalSettingsDrawer.vue';
import CommonLoading from '../../CommonLoading.vue';
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
const mobileActionMenuRef = ref(null);
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
const handleMobileFieldSetting = () => {
    closeMobileActionMenu();
    openFieldSettings();
};
const handleDocumentClick = (event) => {
    if (!mobileActionMenuVisible.value) return;
    const target = event.target;
    if (mobileActionMenuRef.value && target && !mobileActionMenuRef.value.contains(target)) {
        closeMobileActionMenu();
    }
};
import TerminalList from '../list/TerminalList.vue';
const fireUCEvent = defineEmits(['OnLoaded', 'FiledSetting']);
const Action = new ActionClass();
Action.Promise = new ActionClassAsync();
window.addPCStyle();
const IfShowTimingOneKeyCharge = ref(false);
const TimingOneKeyCharge = ref([]);
const currentStation = reactive({
    ID: '',
    Name: ''
});
const timingOneKeyChargeForm = reactive({
    ChargeTimeList: [],
    TimeType: 1,
    IsCompensate: 0,
    ChargeType: '1'
});
const loadingRemoveTimingOneKeyCharge = ref(false);
const oneKeyChargeTimeType = [
    { label: tt('terminal.scheduledOnce'), value: 1 },
    { label: tt('terminal.scheduledLongTerm'), value: 2 }
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
                tt('runtime.message'),
                tt('terminal.chargeTimeIntervalMin').replace('{minutes}', MIN_CHARGE_TIME_INTERVAL_MINUTES),
                'warning'
            );
            return false;
        }
    }

    return true;
};

const saveTimingOneKeyCharge = () => {
    const StaId = currentStation.ID || unref(stationId);
    if (!StaId) return Funcs.Notify(tt('runtime.message'), tt('runtime.selectStationFirst'), 'warning');

    const ChargeTimeList = timingOneKeyChargeForm.ChargeTimeList.map((v) => v.time);
    if (!validateChargeTimeList(ChargeTimeList)) return;

    saveTimingOneKeyChargeApi(StaId, timingOneKeyChargeForm, ChargeTimeList).then((result) => {
        if (result.success) {
            Funcs.Notify(tt('runtime.message'), tt('terminal.timingSuccess'), 'success');
            resetTimingOneKeyChargeForm();
            IfShowTimingOneKeyCharge.value = false;
        }
        else {
            Funcs.Notify(tt('runtime.message'), result.errorMessage || tt('terminal.timingFail'), 'error');
        }
    });
};
const removeTimingOneKeyCharge = () => {
    loadingRemoveTimingOneKeyCharge.value = true;
    const staId = currentStation.ID || unref(stationId);
    removeTimingOneKeyChargeApi(staId, TimingOneKeyCharge.value).then((result) => {
        loadingRemoveTimingOneKeyCharge.value = false;
        if (result.success) {
            Funcs.Notify(tt('runtime.message'), tt('terminal.removeSuccess'), 'success');
            IfShowTimingOneKeyCharge.value = false;
        }
        else {
            Funcs.Notify(tt('runtime.message'), result.errorMessage || tt('terminal.removeFail'), 'error');
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
const getAddTimeLimitHint = () => tt('terminal.addTimeLimitHint')
    .replace('{max}', 6)
    .replace('{remain}', 6 - timingOneKeyChargeForm.ChargeTimeList.length);
const startCharging = () => {
    if (LoadingStartOneKeyCharge.value) return;
    const List = terminalPiles.value.filter((pile) =>
        hasPileStateCode(pile, [PILE_STATE.PutGun, PILE_STATE.Charged, PILE_STATE.Free])
    );
    const unList = terminalPiles.value.filter(
        (pile) => !hasPileStateCode(pile, [PILE_STATE.PutGun, PILE_STATE.Charged, PILE_STATE.Free])
    );
    if (List.length == 0) {
        Funcs.Notify(tt('runtime.message'), tt('terminal.noStartableTerminal'), 'warning');
        return;
    }
    Funcs.Confirm(
        tt('runtime.prompt'),
        tt('terminal.startChargingAllConfirm').replace('{count}', List.length),
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
                        Funcs.Notify(tt('runtime.message'), tt('runtime.issueSuccess'), 'success');
                    }
                    else {
                        Funcs.Notify(tt('runtime.message'), result.errorMessage || tt('terminal.oneKeyStartChargingFail'), 'warning');
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
        Funcs.Notify(tt('runtime.message'), tt('runtime.selectStationFirst'), 'warning');
        return;
    }
    currentStation.ID = staId;
    currentStation.Name = unref(stationName) || currentStation.Name;
    getTimingOneKeyCharge();
    IfShowTimingOneKeyCharge.value = true;
};

const stopCharging = () => {
    if (LoadingStopOneKeyCharge.value) return;
    if (terminalPiles.value.length == 0) return Funcs.Notify(tt('runtime.message'), tt('terminal.noControllerInStation'), 'warning');

    LoadingStopOneKeyCharge.value = true;
    fetchStopChargeCountApi(unref(stationId), CtrlList.value)
        .then((result) => {
            if (result.success) {
                if (result.count == 0) {
                    Funcs.Notify(tt('runtime.message'), tt('terminal.noTerminalNeedStopCharging'), 'warning');
                }
                else if (result.count > 0) {
                    Funcs.Confirm(
                        tt('runtime.prompt'),
                        tt('terminal.stopChargingAllConfirm').replace('{count}', result.count),
                        function () {
                            stopOneKeyCharge();
                        }
                    );
                }
            }
            else {
                Funcs.Notify(tt('runtime.message'), result.errorMessage || tt('terminal.oneKeyStopChargingFail'), 'error');
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
                Funcs.Notify(tt('runtime.message'), tt('runtime.issueSuccess'), 'success');
            }
            else {
                Funcs.Notify(tt('runtime.message'), result.errorMessage || tt('runtime.issueFail'), 'error');
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
    { key: 'free', label: tt('terminal.free'), countKey: 'FreeStatePileCount' },
    { key: 'charging', label: tt('runtime.chargingState'), countKey: 'ChargingStatePileCount' },
    { key: 'gunInserted', label: tt('terminal.inserted'), countKey: 'ConnectedChargingCount' },
    { key: 'chargeFull', label: tt('terminal.full'), countKey: 'FullChargingCount' },
    { key: 'offGrid', label: tt('status.offGrid'), countKey: 'OffLineStatePileCount' },
    { key: 'faulty', label: tt('status.fault'), countKey: 'FaultStatePileCount' },
    { key: 'other', label: tt('terminal.other'), countKey: 'OtherStatePileCount' }
];
const abnormalStateOptions = [
    { key: 'high', label: tt('terminal.highAbnormal'), countKey: 'HighAbnormalCount' },
    { key: 'slow', label: tt('terminal.chargeSlow'), countKey: 'ChargeSlowCount' }
] ;
const PILE_STATE = Object.freeze({
    // 离线
    Offline: 1,
    // 空闲
    Free: 2,
    // 已插枪
    PutGun: 3,
    // 已充满
    ChargingFull: 4,
    // 暂停
    Pause: 5,
    // 充电中
    Charging: 6,
    // 涓流充
    Purling: 7,
    // 终端故障
    PileFault: 8,
    // 切换中
    Changing: 9,
    // 启动中
    Statring: 10,
    // 放电中
    Discharging: 11,
    // 充电机故障
    ChargerFault: 12,
    // BMS故障
    BMSFault: 13,
    // 连接故障
    ConnectFault: 14,
    // 负荷调度中
    Dispatching: 15,
    // 副枪
    SecondGun: 16,
    // 未知
    Unknown: 17,
    // 恢复中
    Recover: 18,
    // 限制中
    Limiting: 19,
    // 等待中
    Waiting: 20,
    // 排队中
    Queuing: 21,
    // 已充电
    Charged: 22,
    // 上线中
    Onlining: 23
});
const PRIMARY_STATE_CODES = {
    free: [PILE_STATE.Free],
    charging: [PILE_STATE.Charging, PILE_STATE.Purling],
    gunInserted: [PILE_STATE.PutGun],
    chargeFull: [PILE_STATE.ChargingFull],
    offGrid: [PILE_STATE.Offline],
    faulty: [
        PILE_STATE.PileFault,
        PILE_STATE.ChargerFault,
        PILE_STATE.BMSFault,
        PILE_STATE.ConnectFault
    ]
};
const PRIMARY_STATE_CODE_SET = new Set(Object.values(PRIMARY_STATE_CODES).flat());
const getPileStateCode = (pile) => {
    const stateCode = Number(pile?.PileState);
    return Number.isNaN(stateCode) ? null : stateCode;
};
const hasPileStateCode = (pile, stateCodes = []) => {
    const stateCode = getPileStateCode(pile);
    return stateCode !== null && stateCodes.includes(stateCode);
};
const isFaultyPile = (pile) => hasPileStateCode(pile, PRIMARY_STATE_CODES.faulty);
const isPrimaryStateOther = (pile) => {
    const stateCode = getPileStateCode(pile);
    return stateCode !== null && !PRIMARY_STATE_CODE_SET.has(stateCode);
};
const MAIN_STATE_FILTERS = {
    free: (pile) => hasPileStateCode(pile, PRIMARY_STATE_CODES.free),
    charging: (pile) => hasPileStateCode(pile, PRIMARY_STATE_CODES.charging),
    gunInserted: (pile) => hasPileStateCode(pile, PRIMARY_STATE_CODES.gunInserted),
    chargeFull: (pile) => hasPileStateCode(pile, PRIMARY_STATE_CODES.chargeFull),
    offGrid: (pile) => hasPileStateCode(pile, PRIMARY_STATE_CODES.offGrid),
    faulty: isFaultyPile,
    other: isPrimaryStateOther,
    high: (pile) => pile.IsHighAbnormal,
    slow: (pile) => pile.IsChargeSlow
};
const SUB_STATE_FILTERS = {
    noCharge: (pile) => !pile.IsCharged,
    isCharge: (pile) => pile.IsCharged
};
const isStateSelected = (state) => !!selectedStates[state];
const getStateCount = (countKey) => pileStates[countKey] ?? 0;
const handleStateClick = (state) => {
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
        FreeStatePileCount: list.filter(MAIN_STATE_FILTERS.free).length,
        ChargingStatePileCount: list.filter(MAIN_STATE_FILTERS.charging).length,
        ConnectedChargingCount: list.filter(MAIN_STATE_FILTERS.gunInserted).length,
        FullChargingCount: list.filter(MAIN_STATE_FILTERS.chargeFull).length,
        OffLineStatePileCount: list.filter(MAIN_STATE_FILTERS.offGrid).length,
        FaultStatePileCount: list.filter(MAIN_STATE_FILTERS.faulty).length,
        OtherStatePileCount: list.filter(MAIN_STATE_FILTERS.other).length,
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
const cachedPiles = ref([]);
const terminalPiles = ref([]);
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
    Piles: [],
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
] ;
const subStateKeys = ['noCharge', 'isCharge', 'unNotice', 'over'];
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
        .filter((state) => !subStateKeys.includes(state))
        .some((state) => selectedStates[state]);

    if (!hasMainStateSelected) {
        newPiles = [...pilesToFilter];
    }
    else {
        for (let i = 0; i < stateKeys.length; i++) {
            if (
                !subStateKeys.includes(stateKeys[i])
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
            subStateKeys.includes(stateKeys[i])
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

const selectState = (state, { loading = false, onCount } = {}) => {
    LoadingPiles.value = loading;
    toggleSelectedState(state);
    syncSelectedStateDependencies();
    filterTerminalPiles(null, onCount);
};

const panelController = {
    refresh: refreshTerminalList,
    filterPiles: filterTerminalPiles,
    selectState
};
function handlePageError(e) {
    Funcs.HandleError(e);
}
const handleFieldSettingsUpdate = (e) => {
    Object.assign(terminalInfoSet, e);
};
const terminalSettingsDrawerRef = ref(null);
function openFieldSettings() {
    terminalSettingsDrawerRef.value.openDrawer(terminalInfoSet);
}

function handleDetailToggleChange() {
    terminalInfoSet.isDetail = !!isDetail.value;
    setPileFieldSetProfile(JSON.stringify({
        one: terminalInfoSet.one,
        two: terminalInfoSet.two,
        three: terminalInfoSet.three,
        isDetail: isDetail.value
    }));
}
function handleTerminalListFireEvent() {
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
    TFF.core.monitor.error.onError(handlePageError);
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
