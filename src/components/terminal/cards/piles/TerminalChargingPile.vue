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
                            <rect width="42" height="42" rx="21" fill="#3656FF" fill-opacity="0.05" />
                            <path
                                d="M28 12H12C11.4477 12 11 12.4477 11 13V21C11 21.5523 11.4477 22 12 22H28C28.5523 22 29 21.5523 29 21V13C29 12.4477 28.5523 12 28 12Z"
                                stroke="black" stroke-opacity="0.32" stroke-width="1.33333" stroke-linecap="round"
                                stroke-linejoin="round" />
                            <path d="M30 15H31C31.5523 15 32 15.4477 32 16V18C32 18.5523 31.5523 19 31 19H30V15Z"
                                fill="black" fill-opacity="0.32" />
                            <rect x="12" y="13" :width="socBatteryFillWidth" height="8" rx="1" :fill="socBatteryFillColor" />
                            <text x="21" y="33" text-anchor="middle" font-size="10" font-family="AlibabaPuHuiTi"
                                fill="rgba(0,0,0,0.8)">{{ socDisplayText }}</text>
                        </svg>
                    </div>
                    <div class="terminal-pile-card__main">
                        <div class="terminal-pile-card__meta-row">
                            <div class="terminal-pile-card__tag-wrap">
                                <div v-for="tag in metaTags" :key="tag.valueKey" class="terminal-pile-card__tag">
                                    <span class="terminal-pile-card__tag-text">{{ getFieldValue(tag) }}</span>
                                </div>
                            </div>
                        </div>
                        <div class="terminal-pile-card__summary-row">
                            <span class="terminal-pile-card__summary-label">
                                {{ summaryField.label }}
                            </span>
                            <span class="terminal-pile-card__summary-value">
                                {{ getFieldValue(summaryField) }}
                            </span>
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
                                <span class="terminal-pile-card__field-label">
                                    {{ primaryDetailRow.label }}
                                </span>
                                <span class="terminal-pile-card__field-value">{{ getFieldValue(primaryDetailRow) }}</span>
                            </div>
                            <div v-if="customerTags.length" class="terminal-pile-card__detail-tags">
                                <span v-for="tag in customerTags" :key="tag.valueKey" class="terminal-pile-card__detail-tag">
                                    {{ getFieldValue(tag) }}
                                </span>
                            </div>
                        </div>
                        <div class="terminal-pile-card__detail-grid">
                            <div v-for="(column, columnIndex) in primaryDetailColumns" :key="`primary-${columnIndex}`"
                                class="terminal-pile-card__detail-column">
                                <div v-for="field in column" :key="field.valueKey" class="terminal-pile-card__detail-item">
                                    <span :class="[
                                        'terminal-pile-card__field-label',
                                        field.nowrap ? 'terminal-pile-card__field-label--nowrap' : ''
                                    ]">
                                        {{ field.label }}
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
                                    {{ field.label }}
                                </span>
                                <span class="terminal-pile-card__field-value">{{ getFieldValue(field) }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </template>

            <div class="terminal-pile-card__footer">
                <t-button v-loading="isClosingCharge" class="tr-button-default terminal-pile-card__end-button"
                    :label="tt('terminal.endCharging')"
                    :showHint="true" @click="confirmCloseCharge">
                </t-button>
            </div>
        </div>

        <LastChargeOrderDialog
            v-model:show="isShowOrderCard"
            :title="orderCardTitle"
            :order-card-info="orderCardInfo"
            :columns="orderCardColumns"
            :table-data="orderCardTableData"
            :total-price-text="totalPriceText"
            :enable-order-link="TeldProductVersionType !== 'Standard'"
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


const { Funcs, TFF, TeldProductVersionType } = window;
const detailPlaceholder = '--';
const statusLabel = tt('runtime.chargingState');

const primaryDetailRow = {
    label: tt('terminal.detail.customerName'),
    valueKey: 'CustomerPhone'
};

const primaryDetailColumns = [
    [
        {
            label: tt('terminal.detail.chargingStartTime'),
            valueKey: 'ChargingBeginTime',
            nowrap: true
        },
        {
            label: tt('terminal.detail.chargedDuration'),
            valueKey: 'ChargingTime'
        }
    ],
    [
        {
            label: tt('terminal.detail.chargingFee'),
            valueKey: 'ChargingMoney'
        },
        {
            label: tt('terminal.chargeAmount'),
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
                    label: tt('terminal.detail.carSeries'),
                    valueKey: 'CarSeriesName'
                },
                {
                    label: tt('terminal.detail.licensePlate'),
                    valueKey: 'CarNumber',
                    offset: true
                }
            ],
            [
                {
                    label: tt('terminal.detail.vin'),
                    valueKey: 'VIN',
                    full: true
                }
            ],
            [
                {
                    label: tt('terminal.detail.vehicleCode'),
                    valueKey: 'VehicleCode'
                },
                {
                    label: tt('terminal.detail.route'),
                    valueKey: 'Route',
                    offset: true
                }
            ],
            [
                {
                    label: tt('terminal.detail.maxBatteryTemperature'),
                    valueKey: 'MaxTemperature'
                },
                {
                    label: tt('terminal.detail.minBatteryTemperature'),
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
                    label: tt('terminal.detail.gunInsertionTime'),
                    valueKey: 'GunInsertionTime'
                },
                {
                    label: tt('terminal.detail.chargeStartMethod'),
                    valueKey: 'ChargeNames',
                    offset: true
                }
            ],
            [
                {
                    label: tt('terminal.detail.chargeEntry'),
                    valueKey: 'ChargeEnter'
                },
                {
                    label: tt('terminal.detail.initialSoc'),
                    valueKey: 'InitSOC',
                    offset: true
                }
            ],
            [
                {
                    label: tt('terminal.detail.estimatedRemainingTime'),
                    valueKey: 'ChargingLastTime'
                },
                {
                    label: tt('terminal.detail.chargingEndTime'),
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
                    label: tt('terminal.detail.actualCurrent'),
                    valueKey: 'AP'
                },
                {
                    label: tt('terminal.detail.actualPower'),
                    valueKey: 'DP',
                    offset: true
                }
            ],
            [
                {
                    label: tt('terminal.detail.averageDemandCurrent'),
                    valueKey: 'AvgAP'
                },
                {
                    label: tt('terminal.detail.averageDemandPower'),
                    valueKey: 'AvgDP',
                    offset: true
                }
            ],
            [
                {
                    label: tt('terminal.detail.maxDemandCurrent'),
                    valueKey: 'MaxAP'
                },
                {
                    label: tt('terminal.detail.maxDemandPower'),
                    valueKey: 'MaxDP',
                    offset: true
                }
            ],
            [
                {
                    label: tt('terminal.detail.currentSatisfactionRate'),
                    valueKey: 'ElectricRate'
                },
                {
                    label: tt('terminal.detail.powerSatisfactionRate'),
                    valueKey: 'PowerRate',
                    offset: true
                }
            ]
        ]
    }
];

const props = defineProps({
    localVars: {
        type: Object,
        required: true
    }
});

const LocalVars = props.localVars;
const emit = defineEmits(['OnFireEvent']);
const pile = computed(() => LocalVars?.pile || {});

const statusBadgeClass = computed(() => [
    'terminal-pile-card__badge',
    'terminal-pile-card__badge--charging'
]);
const cardClass = computed(() => ({
    'terminal-pile-card--compact': !LocalVars?.isDetail
}));

function getDetailValue(value) {
    if (value == null || value === '') {
        return detailPlaceholder;
    }
    return value;
}

function getFieldValue(field) {
    return getDetailValue(pile.value[field.valueKey]);
}

const metaTags = computed(() => [
    { valueKey: 'ChargingName' }
]);
const summaryField = {
    label: tt('terminal.detail.estimatedFullTime'),
    valueKey: 'EstimatedFillingTime'
};
const customerTags = computed(() =>
    ['CustomerType', 'CustomerClassification']
        .filter((valueKey) => pile.value[valueKey])
        .map((valueKey) => ({ valueKey }))
);

const pileSocValue = computed(() => {
    const rawSoc = pile.value.PileSOC;
    if (rawSoc === null || rawSoc === undefined || rawSoc === '') {
        return 0;
    }
    const soc = typeof rawSoc === 'number' ? rawSoc : parseFloat(String(rawSoc).replace('%', ''));
    return Number.isFinite(soc) ? Math.min(Math.max(soc, 0), 100) : 0;
});

const socLevel = computed(() => {
    if (pileSocValue.value <= 20) {
        return 'low';
    }
    if (pileSocValue.value >= 80) {
        return 'high';
    }
    return 'middle';
});

const socBatteryFillColor = computed(() => {
    if (socLevel.value === 'low') {
        return '#DC143C';
    }
    if (socLevel.value === 'high') {
        return '#17B26A';
    }
    return '#FF8C00';
});

const socBatteryFillWidth = computed(() => {
    if (pileSocValue.value <= 0) {
        return 0;
    }
    return Math.max(1, Math.round((pileSocValue.value / 100) * 16));
});

const socDisplayText = computed(() => `${Math.round(pileSocValue.value)}%`);
const isClosingCharge = ref(false);

function confirmCloseCharge() {
    Funcs.Confirm(tt('runtime.prompt'), tt('terminal.stopChargeConfirm').replace('{name}', pile.value.PileName || ''), () => {
        closeCharge();
    });
}

function closeCharge() {
    if (!pile.value.PileCode) {
        return;
    }

    isClosingCharge.value = true;
    const param = {
        CustomerID: pile.value.CustomerID,
        SecondSource: 'PowerDispatchingShow',
        StaID: pile.value.StaID,
        StaName: pile.value.StaName,
        CtrlAddress: pile.value.CtrlAddress,
        CanAddress: pile.value.CanSN,
        PileCode: pile.value.PileCode,
        AffordAccountId: pile.value.AffordAccountId,
        IsThirdStation: pile.value.IsThirdStation || false
    };

    sgApiPost('TPS-EndChargeV2', { param })
        .then((result) => {
            const { msg, data: { state, errmsg } } = result;
            if (msg === 'success' && state === '1') {
                Funcs.Notify(tt('runtime.message'), tt('terminal.stopChargingSuccess'), 'success');
                LocalVars.isDetail = false;
                emit('OnFireEvent', 'refresh');
                return;
            }
            Funcs.Notify(tt('runtime.prompt'), errmsg || tt('terminal.stopChargingFail'), 'error');
        })
        .catch(() => {
            Funcs.Notify(tt('runtime.prompt'), tt('terminal.stopChargingFail'), 'error');
        })
        .finally(() => {
            isClosingCharge.value = false;
        });
}

const {
    isShowOrderCard,
    orderCardInfo,
    orderCardTitle,
    orderCardColumns,
    totalPriceText,
    orderCardTableData,
    showOrderCard,
    toOrderPage
} = useLastChargeOrder(() => pile.value);
</script>

<style scoped>
.terminal-pile-card {
    display: flex;
    flex-direction: column;
    position: relative;
    width: 100%;
    padding-top: 16px;
    padding-bottom: 16px;
    row-gap: 16px;
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

.terminal-pile-card__badge--charging {
    color: #3656ff;
    background: #ebf4fc;
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

.terminal-pile-card__meta-row {
    display: flex;
    align-items: center;
}

.terminal-pile-card__tag-wrap {
    display: flex;
    flex: 1;
    align-items: center;
}

.terminal-pile-card__tag {
    display: inline-flex;
    align-items: center;
    min-height: 24px;
    padding: 0 8px;
    border: 1px solid #e4e5e7;
    border-radius: 12px;
    background: #ffffff;
}

.terminal-pile-card__tag-text {
    font-family: AlibabaPuHuiTi, sans-serif;
    font-weight: 500;
    font-size: 11px;
    line-height: 1;
    color: #6f7173;
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
}

.terminal-pile-card__detail-content {
    display: flex;
    flex-direction: column;
    row-gap: 8px;
}

.terminal-pile-card__detail-header {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    gap: 8px;
}

.terminal-pile-card__detail-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
}

.terminal-pile-card__detail-tag {
    display: inline-flex;
    align-items: center;
    min-height: 22px;
    padding: 2px 6px;
    border: 1px solid #f0f2f5;
    border-radius: 4px;
    font-family: AlibabaPuHuiTi, sans-serif;
    font-weight: 500;
    font-size: 11px;
    line-height: 1;
    color: rgba(0, 0, 0, 0.56);
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

.terminal-pile-card__detail-column + .terminal-pile-card__detail-column {
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

.terminal-pile-card__detail-section {
    display: flex;
    flex-direction: column;
    row-gap: 6px;
    padding-top: 16px;
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

.terminal-pile-card__detail-section-cell--offset {
    padding-left: 8px;
}

.terminal-pile-card__footer {
    display: flex;
    align-items: center;
    height: 31px;
    padding: 0 10px;
}

.terminal-pile-card__end-button {
    margin-left: auto;
    border-width: 1px;
    border-style: solid;
    border-color: #fd2020;
    border-radius: 2px;
    background-color: #fd2020;
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
    background: #e1ffe6;
    color: #4dc238;
    cursor: pointer;
    transition: all 0.3s;
}

.terminal-pile-card__order-trigger:hover {
    background: #c1eec6;
    color: #1db248;
}

.terminal-pile-card__order-text {
    font-style: normal;
}

.terminal-pile-card__dialog {
    width: 520px;
    background: #ffffff;
}

.terminal-pile-card__dialog-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 24px 0;
}

.terminal-pile-card__dialog-title {
    font-size: 16px;
}

.terminal-pile-card__dialog-body {
    max-height: calc(100vh - 60px);
    overflow-y: auto;
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
    color: #409eff;
    cursor: pointer;
}

.terminal-pile-card__dialog-footer {
    display: block;
}
</style>
