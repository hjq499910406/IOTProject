<template>
    <div>
        <div class="terminal-pile-card" :class="cardClass">
            <button v-if="pile.PileID" type="button" class="terminal-pile-card__order-trigger"
                @click="showOrderCard">
                <span class="terminal-pile-card__order-text">{{ tt('order.short') }}</span>
            </button>
            <div class="terminal-pile-card__content">
                <div class="terminal-pile-card__title-row">
                    <span :class="statusBadgeClass">{{ statusLabel }}</span>
                    <span class="terminal-pile-card__title">{{ pile.PileName }}</span>
                </div>

                <div class="terminal-pile-card__top-row">
                    <div class="terminal-pile-card__icon">
                        <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="42" height="42" rx="21" fill="#EBF4FC" />
                            <path
                                d="M17.325 29.0324L18.8265 25.4414H15.624L20.9055 20.3594L19.4355 23.8874H22.386L17.325 29.0324ZM15.771 13.5134C15.771 13.0514 16.17 12.6734 16.6635 12.6734H21.672C22.1655 12.6734 22.5645 13.0514 22.5645 13.5134V18.2069C22.5645 18.6689 22.1655 19.0469 21.672 19.0469H16.653C16.1595 19.0469 15.7605 18.6689 15.7605 18.2069C15.771 18.2069 15.771 13.5134 15.771 13.5134ZM29.316 14.7944C28.644 14.2274 27.51 13.2929 27.174 12.9674C26.985 12.7889 26.5335 12.6734 26.2395 12.9674C25.9455 13.2509 26.082 13.6184 26.292 13.8074C26.5965 14.0804 27.258 14.6054 27.6465 14.9939C27.3315 15.3614 26.796 15.7499 26.4705 16.0964C26.4285 16.1384 26.4285 16.1909 26.4285 16.2119C26.4285 16.4114 26.439 16.5374 26.439 16.6214C26.439 16.6949 26.5335 16.7264 26.565 16.7264H28.2345C28.3395 16.7264 28.371 16.8314 28.371 16.8314V26.9219C28.371 27.4889 28.0455 27.6569 27.7095 27.6569C27.3735 27.6569 27.0165 27.4784 27.0165 26.9219V18.6794C27.0165 17.9339 26.922 17.5874 26.0295 17.5559C25.809 17.5454 24.927 17.5559 24.444 17.5559V12.2849C24.444 11.5919 23.8455 11.0249 23.1105 11.0249H15.0045C14.2695 11.0249 13.671 11.5814 13.671 12.2849V29.1584H12.9045C12.6 29.1584 12.3585 29.3894 12.3585 29.6729V30.4289C12.3585 30.7229 12.6105 30.9644 12.9045 30.9644H25.179C25.473 30.9644 25.725 30.7019 25.725 30.4289V29.6729C25.725 29.3789 25.473 29.1584 25.179 29.1584H24.444V18.7529H25.3575C25.683 18.7529 25.7145 19.0574 25.7145 19.0574V27.0059C25.7145 29.0324 27.4995 29.0534 27.699 29.0534C27.972 29.0534 29.6415 29.0534 29.6415 27.0269V15.3614C29.652 15.3614 29.6625 15.0884 29.316 14.7944Z"
                                fill="#00ACE5" />
                        </svg>
                    </div>
                    <div class="terminal-pile-card__main">
                        <div class="terminal-pile-card__status-row">
                            <div v-if="LocalVars.PileData.OccupyTime" class="terminal-pile-card__occupy">
                                <div class="terminal-pile-card__occupy-inner">
                                    <div class="terminal-pile-card__occupy-icon-wrap">
                                        <t-icon class="terminal-pile-card__occupy-icon" size="12px" color="#FFFFFF"
                                            name="fas dx-icon icon-t-charging-pile01-fill">
                                        </t-icon>
                                    </div>
                                    <span class="terminal-pile-card__occupy-text">{{ tt('terminal.occupy') }} {{ LocalVars.PileData.OccupyTime }}</span>
                                </div>
                            </div>
                        </div>

                        <div class="terminal-pile-card__meta-row">
                            <div class="terminal-pile-card__tag-wrap">
                                <div class="terminal-pile-card__tag">
                                    <span class="terminal-pile-card__tag-text">{{ pile.ChargingName }}</span>
                                </div>
                                <div :class="stateTagClass">
                                    <span :class="stateTagTextClass">{{ stateTagLabel }}</span>
                                </div>
                                <div v-if="showChargingPowerTag" class="terminal-pile-card__tag">
                                    <span class="terminal-pile-card__tag-text">{{ pile.ChargingPower }}</span>
                                </div>
                            </div>
                        </div>

                        <div class="terminal-pile-card__summary-row">
                            <span class="terminal-pile-card__summary-label">{{ tt(summaryField.key) }}</span>
                            <span class="terminal-pile-card__summary-value">{{ summaryValue }}</span>
                        </div>
                    </div>
                </div>
            </div>

            <template v-if="LocalVars.isDetail">
                <t-separator class="terminal-pile-card__separator" size="1px" spaced="8px"
                    color="rgba(150, 150, 150, 0.15)">
                </t-separator>
                <div class="terminal-pile-card__detail">
                    <div class="terminal-pile-card__detail-content">
                        <div class="terminal-pile-card__detail-header">
                            <div class="terminal-pile-card__detail-item terminal-pile-card__detail-item--header">
                                <span class="terminal-pile-card__field-label">{{ tt(primaryDetailRow.key) }}</span>
                                <span class="terminal-pile-card__field-value">{{ getFieldValue(primaryDetailRow) }}</span>
                            </div>
                            <div v-if="primaryDetailTags.length" class="terminal-pile-card__detail-tags">
                                <span v-for="tag in primaryDetailTags" :key="tag.valueKey" class="terminal-pile-card__detail-tag">
                                    {{ getFieldValue(tag) }}
                                </span>
                            </div>
                        </div>
                        <div class="terminal-pile-card__detail-grid">
                            <div v-for="(column, columnIndex) in primaryDetailColumns" :key="`primary-column-${columnIndex}`"
                                class="terminal-pile-card__detail-column">
                                <div v-for="field in column" :key="field.valueKey" class="terminal-pile-card__detail-item">
                                    <span :class="[
                                        'terminal-pile-card__field-label',
                                        field.nowrap ? 'terminal-pile-card__field-label--nowrap' : ''
                                    ]">
                                        {{ tt(field.key) }}
                                    </span>
                                    <span class="terminal-pile-card__field-value">{{ getFieldValue(field) }}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div v-for="section in detailSections" :key="section.visibleKey" v-show="LocalVars.infoSet?.[section.visibleKey]"
                        :class="[
                            'terminal-pile-card__detail-section',
                            `terminal-pile-card__detail-section--${section.size}`
                        ]">
                        <div v-for="(row, rowIndex) in section.rows" :key="`${section.visibleKey}-${rowIndex}`"
                            class="terminal-pile-card__detail-section-row">
                            <div v-for="field in row" :key="field.valueKey" :class="[
                                'terminal-pile-card__detail-section-cell',
                                field.full ? 'terminal-pile-card__detail-section-cell--full' : '',
                                field.offset ? 'terminal-pile-card__detail-section-cell--offset' : ''
                            ]">
                                <span :class="[
                                    'terminal-pile-card__field-label',
                                    field.nowrap ? 'terminal-pile-card__field-label--nowrap' : ''
                                ]">
                                    {{ tt(field.key) }}
                                </span>
                                <span class="terminal-pile-card__field-value">{{ getFieldValue(field) }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </template>

            <div class="terminal-pile-card__footer terminal-pile-card__footer--actions">
                <t-button class="tr-button-default terminal-pile-card__start-button"
                    :label="tt('charge.startCharging')" :showHint="true" @click="showStartChargePop">
                </t-button>
            </div>
        </div>

        <t-dialog v-model:show="IfShowStartCharge" :position="LocalVars.position" :maximized="LocalVars.maximized">
            <div class="startcharge-dialog terminal-pile-card__dialog">
                <div class="terminal-pile-card__dialog-header">
                    <span class="terminal-pile-card__dialog-title">{{ tt('charge.startCharging') }}</span>
                    <t-button class="tr-button-icon-text2" label="" icon="fas dx-icon icon-t-delete-01"
                        :showHint="true" @click="IfShowStartCharge = false" v-close-popup>
                    </t-button>
                </div>
                <div class="terminal-pile-card__dialog-body">
                    <div class="m-startcharge">
                        <div class="hint"><i class="el-icon-warning"></i> {{ tt('terminal.confirmStartCharge').replace('{name}', pile.PileName || '') }}</div>
                        <div v-show="pile.IsSetPileLimitSOC">
                            <div class="content">
                                {{ tt('terminal.chargeToSoc') }}
                                <div class="u-input-per">
                                    <input class="input" v-model="SingleChargeSOC"
                                        @blur="SingleChargeSOC = toSocNumber(SingleChargeSOC)" type="text">
                                    <i class="icon">%</i>
                                </div>
                                {{ tt('terminal.endCharging') }}
                            </div>
                        </div>
                    </div>
                    <span slot="footer" class="terminal-pile-card__dialog-footer">
                        <t-button flat :label="tt('common.cancel')" class="tr-button-default" :disable="loadingStartCharge"
                            @click="IfShowStartCharge = false" />
                        <t-button flat :label="tt('common.confirm')" class="tr-button-primary" :loading="loadingStartCharge"
                            @click="confirmStartCharge" />
                    </span>
                </div>
            </div>
        </t-dialog>

        <LastChargeOrderDialog
            v-model:show="isShowOrderCard"
            :title="orderCardTitle"
            :order-card-info="orderCardInfo"
            :columns="orderCardColumn"
            :table-data="orderCardTableData"
            :total-price-text="TotalPriceStr"
            :enable-order-link="TeldProductVersionType !== 'Standard'"
            :position="LocalVars.position"
            dialog-class="startcharge-dialog"
            close-button-class="tr-button-primary"
            @order-click="toOrderPage"
        />
    </div>
</template>

<script setup>

import { pageText } from '../../../../pages/i18n';
const tt = pageText;

import { computed, ref } from 'vue';
import LastChargeOrderDialog from '../../shared/LastChargeOrderDialog.vue';
import { useLastChargeOrder } from '../../shared/useLastChargeOrder.js';


const props = defineProps({
    localVars: Object
});

const { TeldProductVersionType } = window;
const LocalVars = props.localVars;
const fireUCEvent = defineEmits(['OnFireEvent']);
const detailPlaceholder = '--';
const statusLabel = tt('terminal.inserted');
const SingleChargeSOC = ref(100);
const IfShowStartCharge = ref(false);
const loadingStartCharge = ref(false);
const pile = computed(() => LocalVars?.pile || {});

const statusBadgeClass = computed(() => [
    'terminal-pile-card__badge',
    'terminal-pile-card__badge--inserted'
]);
const cardClass = computed(() => ({
    'terminal-pile-card--compact': !LocalVars?.isDetail
}));
const isCharged = computed(() => Boolean(pile.value.IsCharged));
const stateTagClass = computed(() => [
    'terminal-pile-card__state-tag',
    isCharged.value ? 'terminal-pile-card__state-tag--charged' : 'terminal-pile-card__state-tag--uncharged'
]);
const stateTagTextClass = computed(() => [
    'terminal-pile-card__state-tag-text',
    isCharged.value ? 'terminal-pile-card__state-tag-text--charged' : 'terminal-pile-card__state-tag-text--uncharged'
]);
const stateTagLabel = computed(() => (isCharged.value ? tt('terminal.charged') : tt('terminal.uncharged')));
const showChargingPowerTag = computed(() => pile.value.ChargingPower && pile.value.ChargingPower !== '--');

function getDetailValue(value) {
    if (value == null || value === '') {
        return detailPlaceholder;
    }
    return value;
}

function getFieldValue(field) {
    return getDetailValue(pile.value[field.valueKey]);
}

const summaryField = computed(() =>
    isCharged.value
        ? {
            key: 'terminal.detail.chargingEndTime'
        }
        : {
            key: 'terminal.detail.gunInsertionTime'
        }
);
const summaryValue = computed(() =>
    getDetailValue(isCharged.value ? pile.value.ChargingEndTimeDt : pile.value.GunInsertionTimeDt)
);

const primaryDetailRow = {
    key: 'terminal.detail.customerName',
    valueKey: 'CustomerPhone'
};
const primaryDetailTags = computed(() =>
    ['CustomerType', 'CustomerClassification']
        .filter((valueKey) => pile.value[valueKey])
        .map((valueKey) => ({ valueKey }))
);
const primaryDetailColumns = [
    [
        {
            key: 'terminal.detail.chargingStartTime',
            valueKey: 'ChargingBeginTime',
            nowrap: true
        },
        {
            key: 'terminal.detail.chargedDuration',
            valueKey: 'ChargingTime'
        }
    ],
    [
        {
            key: 'terminal.detail.chargingFee',
            valueKey: 'ChargingMoney'
        },
        {
            key: 'terminal.chargeAmount',
            valueKey: 'ChargingPower'
        }
    ]
];
const detailSections = [
    {
        visibleKey: 'oneOld',
        size: 'tall',
        rows: [
            [
                {
                    key: 'terminal.detail.carSeries',
                    valueKey: 'CarSeriesName'
                },
                {
                    key: 'terminal.detail.licensePlate',
                    valueKey: 'CarNumber',
                    offset: true
                }
            ],
            [
                {
                    key: 'terminal.detail.vin',
                    valueKey: 'VIN',
                    full: true
                }
            ],
            [
                {
                    key: 'terminal.detail.vehicleCode',
                    valueKey: 'VehicleCode'
                },
                {
                    key: 'terminal.detail.route',
                    valueKey: 'Route',
                    offset: true
                }
            ],
            [
                {
                    key: 'terminal.detail.maxBatteryTemperature',
                    valueKey: 'MaxTemperature'
                },
                {
                    key: 'terminal.detail.minBatteryTemperature',
                    valueKey: 'MinTemperature',
                    offset: true
                }
            ]
        ]
    },
    {
        visibleKey: 'twoOld',
        size: 'short',
        rows: [
            [
                {
                    key: 'terminal.detail.gunInsertionTime',
                    valueKey: 'GunInsertionTime'
                },
                {
                    key: 'terminal.detail.chargeStartMethod',
                    valueKey: 'ChargeNames',
                    offset: true
                }
            ],
            [
                {
                    key: 'terminal.detail.chargeEntry',
                    valueKey: 'ChargeEnter'
                },
                {
                    key: 'terminal.detail.initialSoc',
                    valueKey: 'InitSOC',
                    offset: true
                }
            ],
            [
                {
                    key: 'terminal.detail.estimatedRemainingTime',
                    valueKey: 'ChargingLastTime'
                },
                {
                    key: 'terminal.detail.chargingEndTime',
                    valueKey: 'ChargingEndTime',
                    offset: true
                }
            ]
        ]
    },
    {
        visibleKey: 'threeOld',
        size: 'tall',
        rows: [
            [
                {
                    key: 'terminal.detail.actualCurrent',
                    valueKey: 'AP'
                },
                {
                    key: 'terminal.detail.actualPower',
                    valueKey: 'DP',
                    offset: true
                }
            ],
            [
                {
                    key: 'terminal.detail.averageDemandCurrent',
                    valueKey: 'AvgAP'
                },
                {
                    key: 'terminal.detail.averageDemandPower',
                    valueKey: 'AvgDP',
                    offset: true
                }
            ],
            [
                {
                    key: 'terminal.detail.maxDemandCurrent',
                    valueKey: 'MaxAP'
                },
                {
                    key: 'terminal.detail.maxDemandPower',
                    valueKey: 'MaxDP',
                    offset: true
                }
            ],
            [
                {
                    key: 'terminal.detail.currentSatisfactionRate',
                    valueKey: 'ElectricRate'
                },
                {
                    key: 'terminal.detail.powerSatisfactionRate',
                    valueKey: 'PowerRate',
                    offset: true
                }
            ]
        ]
    }
];

function showStartChargePop() {
    IfShowStartCharge.value = true;
    SingleChargeSOC.value = pile.value.PileLimitSOC || 95;
}

function toSocNumber(str) {
    if (str === null || typeof str === 'undefined') {
        return null;
    }
    if (str === '') {
        return '';
    }
    const num = Number((String(str).match(/[\-.\d]/g) || []).join('') || 0);
    return Number.parseFloat(Math.min(Math.max(num, 0), 100).toFixed(2));
}

function confirmStartCharge() {
    loadingStartCharge.value = true;
    if (pile.value.IsSetPileLimitSOC) {
        if (!SingleChargeSOC.value) {
            Funcs.Notify(tt('runtime.message'), tt('terminal.setSocPrompt'), 'warning');
            loadingStartCharge.value = false;
            return;
        }
        setChargeSOC().then((res) => {
            if (!res) {
                Funcs.Confirm(tt('runtime.prompt'), tt('terminal.socSetFailedConfirm'), () => {
                    startCharge();
                }, () => {
                    loadingStartCharge.value = false;
                });
                return;
            }
            startCharge();
        });
        return;
    }
    startCharge();
}

function setChargeSOC() {
    return new Promise((resolve) => {
        if (!pile.value.PileCode) {
            resolve(false);
            return;
        }
        const param = {
            LimitSOC: SingleChargeSOC.value,
            PileCode: pile.value.PileCode
        };
        sgApiPost('TPS-AdjustLimitSOC', { param }).then((result) => {
            const { msg, data: { state, data, errmsg } } = result;
            if (msg == 'success' && state == '1' && data) {
                resolve(true);
                return;
            }
            if (errmsg) {
                Funcs.Notify(tt('runtime.message'), errmsg, 'warning');
            }
            resolve(false);
        });
    });
}

function startCharge() {
    if (!pile.value.PileID || !pile.value.PileCode) {
        loadingStartCharge.value = false;
        return;
    }
    const filter = {
        CustomerID: pile.value.CustomerID,
        SecondSource: 'PowerDispatchingShow',
        StaID: pile.value.StaID,
        StaName: pile.value.StaName,
        ctrlAddr: pile.value.CtrlAddress,
        canAddress: pile.value.CanSN,
        PileCode: pile.value.PileCode
    };

    sgApiPost('TPS-startCharging', { filter }).then((result) => {
        const { msg, data: { state, errmsg } } = result;
        if (msg == 'success' && state == '1') {
            Funcs.Notify(tt('runtime.message'), tt('terminal.startChargingSuccess'), 'success');
            IfShowStartCharge.value = false;
            LocalVars.isDetail = false;
            fireUCEvent('OnFireEvent', 'refresh');
        }
        else {
            Funcs.Notify(tt('runtime.message'), errmsg || tt('terminal.startChargingFail'), 'warning');
            IfShowStartCharge.value = false;
        }
        loadingStartCharge.value = false;
    });
}

const {
    isShowOrderCard,
    orderCardInfo,
    orderCardTitle,
    showOrderCard,
    toOrderPage,
    orderCardColumns,
    totalPriceText,
    orderCardTableData
} = useLastChargeOrder(() => pile.value);

const orderCardColumn = orderCardColumns;
const TotalPriceStr = totalPriceText;
</script>

<style>
.startcharge-dialog {
    border-radius: 4px !important;
}

.terminal-pile-card__dialog-footer {
    padding-top: 0;
}

.terminal-pile-card__dialog-footer button {
    height: auto;
}

@media screen and (max-width: 768px) {
    .startcharge-dialog {
        border-radius: 12px 12px 0 0 !important;
    }

    .terminal-pile-card__dialog-footer {
        padding-top: 16px;
    }

    .terminal-pile-card__dialog-footer button {
        height: 44px;
    }
}
</style>

<style scoped>
.terminal-pile-card {
    display: flex;
    flex-direction: column;
    position: relative;
    width: 100%;
    padding-top: 16px;
    padding-bottom: 16px;
    row-gap: 12px;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    outline: 0 !important;
}

.terminal-pile-card--compact {
    min-height: 160px;
}

.terminal-pile-card__content {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.terminal-pile-card__title-row {
    display: flex;
    align-items: center;
}

.terminal-pile-card__badge {
    display: inline-flex;
    align-items: center;
    margin-left: 10px;
    margin-right: 8px;
    padding: 2px 4px;
    border-radius: 4px;
    font-size: 12px;
    line-height: 1;
}

.terminal-pile-card__badge--inserted {
    background: #ebf4fc;
    color: #00ace5;
}

.terminal-pile-card__title {
    font-family: AlibabaPuHuiTi, sans-serif;
    font-weight: 500;
    font-size: 14px;
    line-height: 1;
    color: rgba(0, 0, 0, 0.8);
    vertical-align: middle;
}

.terminal-pile-card__top-row {
    display: flex;
    align-items: center;
    column-gap: 10px;
    min-height: 42px;
}

.terminal-pile-card__icon {
    padding-left: 10px;
}

.terminal-pile-card__main {
    display: flex;
    flex: 1;
    flex-direction: column;
    row-gap: 4px;
    max-width: calc(100% - 77px);
}

.terminal-pile-card__status-row {
    display: flex;
    align-items: center;
    gap: 4px;
}

.terminal-pile-card__occupy {
    display: flex;
    align-items: center;
    padding-top: 1px;
    padding-bottom: 1px;
    border-top-left-radius: 6px;
    border-bottom-left-radius: 6px;
    background: linear-gradient(90deg, rgba(255, 140, 0, 0.4) 0%, rgba(255, 140, 0, 0) 100%);
}

.terminal-pile-card__occupy-inner {
    display: flex;
    align-items: center;
    gap: 4px;
    height: 17px;
    padding-right: 4px;
    border-top-left-radius: 6px;
    border-bottom-left-radius: 6px;
    background: #fff7ec;
}

.terminal-pile-card__occupy-icon-wrap {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 17px;
    height: 17px;
    border-radius: 6px;
    background: linear-gradient(180deg, #ff8c00 0%, #ffaf62 100%);
}

.terminal-pile-card__occupy-text {
    font-family: AlibabaPuHuiTi, sans-serif;
    font-weight: 400;
    font-size: 12px;
    line-height: 1;
    color: rgba(0, 0, 0, 0.8);
}

.terminal-pile-card__meta-row {
    display: flex;
    align-items: center;
}

.terminal-pile-card__tag-wrap {
    display: flex;
    flex: 1;
    flex-wrap: wrap;
    align-items: center;
    gap: 4px;
}

.terminal-pile-card__tag,
.terminal-pile-card__state-tag {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    padding: 2px 6px;
    border-radius: 8px;
    border: 1px solid #e4e5e7;
}

.terminal-pile-card__state-tag--charged {
    background: rgba(54, 86, 255, 0.05);
    border-color: rgba(54, 86, 255, 0.1);
}

.terminal-pile-card__state-tag--uncharged {
    background: #fff7ec;
    border-color: #fff7ec;
}

.terminal-pile-card__tag-text,
.terminal-pile-card__state-tag-text,
.terminal-pile-card__detail-tag {
    font-family: AlibabaPuHuiTi, sans-serif;
    font-weight: 500;
    font-size: 11px;
    line-height: 1;
    vertical-align: middle;
}

.terminal-pile-card__tag-text {
    color: #6f7173;
}

.terminal-pile-card__state-tag-text--charged {
    color: rgba(54, 86, 255, 0.8);
}

.terminal-pile-card__state-tag-text--uncharged {
    color: #ff8c00;
}

.terminal-pile-card__summary-row {
    display: flex;
    align-items: center;
    gap: 4px;
    max-width: 220px;
}

.terminal-pile-card__summary-label,
.terminal-pile-card__field-label {
    font-family: AlibabaPuHuiTi, sans-serif;
    font-size: 12px;
    color: rgba(0, 0, 0, 0.32);
}

.terminal-pile-card__summary-value,
.terminal-pile-card__field-value {
    font-family: AlibabaPuHuiTi, sans-serif;
    font-size: 12px;
    color: rgba(0, 0, 0, 0.8);
}

.terminal-pile-card__field-label--nowrap {
    white-space: nowrap;
}

.terminal-pile-card__separator {
    margin: 0 12px;
    opacity: 1;
}

.terminal-pile-card__detail {
    padding: 0 10px;
    outline: 0 !important;
}

.terminal-pile-card__detail-content {
    display: flex;
    flex-direction: column;
    row-gap: 8px;
    outline: 0 !important;
}

.terminal-pile-card__detail-header,
.terminal-pile-card__detail-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
}

.terminal-pile-card__detail-grid {
    display: flex;
    width: 100%;
}

.terminal-pile-card__detail-column {
    display: flex;
    flex-direction: column;
    width: 50%;
    row-gap: 8px;
}

.terminal-pile-card__detail-column + .terminal-pile-card__detail-column,
.terminal-pile-card__detail-section-cell--offset {
    padding-left: 8px;
}

.terminal-pile-card__detail-item,
.terminal-pile-card__detail-section-cell {
    display: flex;
    align-items: center;
    column-gap: 4px;
}

.terminal-pile-card__detail-item--header {
    min-height: 22px;
}

.terminal-pile-card__detail-tag {
    display: inline-flex;
    align-items: center;
    min-height: 22px;
    padding: 2px 6px;
    border: 1px solid #f0f2f5;
    border-radius: 4px;
    color: rgba(0, 0, 0, 0.56);
}

.terminal-pile-card__detail-section {
    display: flex;
    flex-direction: column;
    row-gap: 6px;
    padding-top: 16px;
    outline: 0 !important;
}

.terminal-pile-card__detail-section--tall {
    min-height: 104px;
}

.terminal-pile-card__detail-section--short {
    min-height: 84px;
}

.terminal-pile-card__detail-section-row {
    display: flex;
    align-items: center;
}

.terminal-pile-card__detail-section-cell {
    width: 50%;
}

.terminal-pile-card__detail-section-cell--full {
    width: 100%;
}

.terminal-pile-card__footer {
    display: flex;
    padding-left: 10px;
    padding-right: 10px;
}

.terminal-pile-card__footer--actions {
    height: 31px;
    align-items: center;
}

.terminal-pile-card__start-button {
    margin-left: auto;
    border-width: 1px;
    border-style: solid;
    border-color: #17b26a;
    border-radius: 2px;
    background-color: #17b26a;
    color: #ffffff;
}

.terminal-pile-card__order-trigger {
    position: absolute;
    top: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 28px;
    height: 28px;
    padding: 0;
    border: 0;
    border-top-right-radius: 14px;
    border-bottom-left-radius: 50px;
    background-color: #e1ffe6;
    color: #4dc238;
    cursor: pointer;
    user-select: none;
    overflow: hidden;
    transition: all 0.3s;
}

.terminal-pile-card__order-trigger:hover {
    background-color: #c1eec6;
    color: #1db248;
}

.terminal-pile-card__order-text {
    font-style: normal;
}

.terminal-pile-card__dialog {
    width: 520px;
    background: #ffffff;
}

.terminal-pile-card__dialog-body {
    height: auto;
    overflow-y: auto;
    max-height: calc(100vh - 60px);
}

.terminal-pile-card__dialog-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 16px;
    padding-left: 24px;
    padding-right: 24px;
}

.terminal-pile-card__dialog-title {
    font-size: 16px;
}

.terminal-pile-card__order-dialog,
.terminal-pile-card__order-list {
    display: flex;
    flex-direction: column;
}

.terminal-pile-card__order-item {
    display: flex;
    align-items: center;
    padding: 10px;
}

.terminal-pile-card__order-label {
    width: 120px;
}

.terminal-pile-card__order-value {
    font-weight: bold;
}

.terminal-pile-card__order-value--link {
    cursor: pointer;
    color: #409eff;
}

@media screen and (max-width: 767px) {
    .terminal-pile-card__dialog-footer .tr-button-primary {
        width: 50%;
    }

    .terminal-pile-card__dialog-footer .tr-button-default {
        margin-left: -8px;
        width: 50%;
    }
}
</style>
