<template>
    <div>
        <div class='terminal-pile-card' :class="cardClass">
            <div class="item-title terminal-pile-card__order-trigger" v-if='LocalVars.pile.PileID'
                @click="showOrderCard">
                <i class="i-link terminal-pile-card__order-text">{{ tt('order.short') }}</i>
            </div>
            <div class='terminal-pile-card__content'>
                <div>
                    <span :class="statusBadgeClass">{{ statusLabel }}</span>
                    <span class="terminal-pile-card__title">{{ LocalVars.pile.PileName }}</span>
                </div>
                <div class="terminal-pile-card__top-row">
                    <div class='terminal-pile-card__icon'>
                        <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="42" height="42" rx="21" :fill="statusIconBackground" />
                            <path
                                d="M17.325 29.0324L18.8265 25.4414H15.624L20.9055 20.3594L19.4355 23.8874H22.386L17.325 29.0324ZM15.771 13.5134C15.771 13.0514 16.17 12.6734 16.6635 12.6734H21.672C22.1655 12.6734 22.5645 13.0514 22.5645 13.5134V18.2069C22.5645 18.6689 22.1655 19.0469 21.672 19.0469H16.653C16.1595 19.0469 15.7605 18.6689 15.7605 18.2069C15.771 18.2069 15.771 13.5134 15.771 13.5134ZM29.316 14.7944C28.644 14.2274 27.51 13.2929 27.174 12.9674C26.985 12.7889 26.5335 12.6734 26.2395 12.9674C25.9455 13.2509 26.082 13.6184 26.292 13.8074C26.5965 14.0804 27.258 14.6054 27.6465 14.9939C27.3315 15.3614 26.796 15.7499 26.4705 16.0964C26.4285 16.1384 26.4285 16.1909 26.4285 16.2119C26.4285 16.4114 26.439 16.5374 26.439 16.6214C26.439 16.6949 26.5335 16.7264 26.565 16.7264H28.2345C28.3395 16.7264 28.371 16.8314 28.371 16.8314V26.9219C28.371 27.4889 28.0455 27.6569 27.7095 27.6569C27.3735 27.6569 27.0165 27.4784 27.0165 26.9219V18.6794C27.0165 17.9339 26.922 17.5874 26.0295 17.5559C25.809 17.5454 24.927 17.5559 24.444 17.5559V12.2849C24.444 11.5919 23.8455 11.0249 23.1105 11.0249H15.0045C14.2695 11.0249 13.671 11.5814 13.671 12.2849V29.1584H12.9045C12.6 29.1584 12.3585 29.3894 12.3585 29.6729V30.4289C12.3585 30.7229 12.6105 30.9644 12.9045 30.9644H25.179C25.473 30.9644 25.725 30.7019 25.725 30.4289V29.6729C25.725 29.3789 25.473 29.1584 25.179 29.1584H24.444V18.7529H25.3575C25.683 18.7529 25.7145 19.0574 25.7145 19.0574V27.0059C25.7145 29.0324 27.4995 29.0534 27.699 29.0534C27.972 29.0534 29.6415 29.0534 29.6415 27.0269V15.3614C29.652 15.3614 29.6625 15.0884 29.316 14.7944Z"
                                :fill="statusIconColor" />
                        </svg>
                    </div>
                    <div class='terminal-pile-card__main'>
                        <div class='terminal-pile-card__status-row' v-if='LocalVars.PileData.OccupyTime'>
                            <div  class='terminal-pile-card__occupy'>
                                <div class='terminal-pile-card__occupy-inner'>
                                    <div class='terminal-pile-card__occupy-icon-wrap'>
                                        <t-icon class='terminal-pile-card__occupy-icon' size='12px' color='#FFFFFF'
                                            name='fas dx-icon icon-t-charging-pile01-fill'>
                                        </t-icon>
                                    </div>
                                    <span class="terminal-pile-card__occupy-text">{{ tt('terminal.occupy') }} {{ LocalVars.PileData.OccupyTime }}</span>
                                </div>
                            </div>
                        </div>
                        <div class='terminal-pile-card__meta-row'>
                            <div class='terminal-pile-card__tag-wrap'>
                                <div class='terminal-pile-card__tag'>
                                    <span class="terminal-pile-card__tag-text">
                                        {{ LocalVars.pile.ChargingName }}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div class='terminal-pile-card__summary-row'>
                            <span class="terminal-pile-card__summary-label">{{ tt('terminal.recentChargeTime') }}</span>
                            <span class="terminal-pile-card__summary-value">
                                {{ LocalVars.pile.LastChargeTime }}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <template v-if="LocalVars.isDetail">
                <t-separator class='terminal-pile-card__separator' size='1px' spaced='8px'
                    color='rgba(150, 150, 150, 0.15)'>
                </t-separator>
                <div class='terminal-pile-card__detail'>
                    <div class='terminal-pile-card__detail-content'>
                        <div class='terminal-pile-card__detail-row'>
                            <span class='terminal-pile-card__field-label'>
                                {{ tt(primaryDetailRow.key) }}
                            </span>
                            <span class='terminal-pile-card__field-value'>
                                {{ detailPlaceholder }}
                            </span>
                        </div>
                        <div class='terminal-pile-card__detail-grid'>
                            <div v-for="(column, columnIndex) in primaryDetailColumns"
                                :key="`primary-column-${columnIndex}`" class='terminal-pile-card__detail-column'>
                                <div v-for="field in column" :key="field.key" class='terminal-pile-card__detail-item'>
                                    <span :class="[
                                        'terminal-pile-card__field-label',
                                        field.nowrap ? 'terminal-pile-card__field-label--nowrap' : ''
                                    ]">
                                        {{ tt(field.key) }}
                                    </span>
                                    <span class='terminal-pile-card__field-value'>
                                        {{ detailPlaceholder }}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-for="section in detailSections" :key="section.visibleKey"
                        v-show="LocalVars.infoSet[section.visibleKey]" :class="[
                            'terminal-pile-card__detail-section',
                            `terminal-pile-card__detail-section--${section.size}`
                        ]">
                        <div v-for="(row, rowIndex) in section.rows" :key="`${section.visibleKey}-${rowIndex}`"
                            class='terminal-pile-card__detail-section-row'>
                            <div v-for="field in row" :key="field.key" :class="[
                                'terminal-pile-card__detail-section-cell',
                                field.full ? 'terminal-pile-card__detail-section-cell--full' : '',
                                field.offset ? 'terminal-pile-card__detail-section-cell--offset' : ''
                            ]">
                                <span class='terminal-pile-card__field-label'>
                                    {{ tt(field.key) }}
                                </span>
                                <span class='terminal-pile-card__field-value'>
                                    {{ detailPlaceholder }}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </template>
            <div class='terminal-pile-card__footer'></div>
        </div>

        <LastChargeOrderDialog
            v-model:show="isShowOrderCard"
            :title="orderCardTitle"
            :order-card-info="orderCardInfo"
            :columns="orderCardColumn"
            :table-data="orderCardTableData"
            :total-price-text="TotalPriceStr"
            :enable-order-link="TeldProductVersionType !== 'Standard'"
            @order-click="toOrderPage"
        />
    </div>
</template>
<script setup>

import { pageText } from '../../../../pages/i18n';
const tt = pageText;

import { computed } from 'vue';
import LastChargeOrderDialog from '../../shared/LastChargeOrderDialog.vue';
import { useLastChargeOrder } from '../../shared/useLastChargeOrder.js';


const { TeldProductVersionType } = window;
const detailPlaceholder = '--';
const primaryDetailRow = {
    key: 'terminal.detail.customerName'
};
const primaryDetailColumns = [
    [
        {
            key: 'terminal.detail.chargingStartTime',
            nowrap: true
        },
        {
            key: 'terminal.detail.chargedDuration'
        }
    ],
    [
        {
            key: 'terminal.detail.chargingFee'
        },
        {
            key: 'terminal.chargeAmount'
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
                    key: 'terminal.detail.carSeries'
                },
                {
                    key: 'terminal.detail.licensePlate',
                    offset: true
                }
            ],
            [
                {
                    key: 'terminal.detail.vin',
                    full: true
                }
            ],
            [
                {
                    key: 'terminal.detail.vehicleCode'
                },
                {
                    key: 'terminal.detail.route',
                    offset: true
                }
            ],
            [
                {
                    key: 'terminal.detail.maxBatteryTemperature'
                },
                {
                    key: 'terminal.detail.minBatteryTemperature',
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
                    key: 'terminal.detail.gunInsertionTime'
                },
                {
                    key: 'terminal.detail.chargeStartMethod',
                    offset: true
                }
            ],
            [
                {
                    key: 'terminal.detail.chargeEntry'
                },
                {
                    key: 'terminal.detail.initialSoc',
                    offset: true
                }
            ],
            [
                {
                    key: 'terminal.detail.estimatedRemainingTime'
                },
                {
                    key: 'terminal.detail.chargingEndTime',
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
                    key: 'terminal.detail.actualCurrent'
                },
                {
                    key: 'terminal.detail.actualPower',
                    offset: true
                }
            ],
            [
                {
                    key: 'terminal.detail.averageDemandCurrent'
                },
                {
                    key: 'terminal.detail.averageDemandPower',
                    offset: true
                }
            ],
            [
                {
                    key: 'terminal.detail.maxDemandCurrent'
                },
                {
                    key: 'terminal.detail.maxDemandPower',
                    offset: true
                }
            ],
            [
                {
                    key: 'terminal.detail.currentSatisfactionRate'
                },
                {
                    key: 'terminal.detail.powerSatisfactionRate',
                    offset: true
                }
            ]
        ]
    }
];

const props = defineProps({
    localVars: Object,
    variant: {
        type: String,
        default: 'free'
    },
});
const LocalVars = props.localVars;
function getDetailValue(value) {
    if (value == null || value === '') {
        return detailPlaceholder;
    }
    return value;
}
const isOtherVariant = computed(() => props.variant === 'other');
const statusLabel = computed(() => (isOtherVariant.value ? tt('terminal.other') : tt('terminal.free')));
const statusBadgeClass = computed(() => [
    'terminal-pile-card__badge',
    isOtherVariant.value ? 'terminal-pile-card__badge--other' : 'terminal-pile-card__badge--free'
]);
const statusIconBackground = computed(() => (isOtherVariant.value ? '#F0F2F5' : '#F6ECFF'));
const statusIconColor = computed(() => (isOtherVariant.value ? '#898989' : '#AF36FF'));
const cardClass = computed(() => ({
    'terminal-pile-card--other': isOtherVariant.value
}));
const {
    isShowOrderCard,
    orderCardInfo,
    orderCardTitle,
    showOrderCard,
    toOrderPage,
    orderCardColumns,
    totalPriceText,
    orderCardTableData
} = useLastChargeOrder(() => LocalVars.pile);

const orderCardColumn = orderCardColumns;
const TotalPriceStr = totalPriceText;
</script>
<style scoped>
.terminal-pile-card__dialog-body {
    height: auto;
    overflow-y: auto;
    max-height: calc(100vh - 60px);
}

.terminal-pile-card__dialog-header {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    display: flex;
    padding-top: 16px;
    padding-left: 24px;
    padding-right: 24px;
}

.terminal-pile-card__dialog-title {
    font-size: 16px;
}

.terminal-pile-card__order-dialog {
    display: flex;
    flex-direction: column;
}

.terminal-pile-card__order-list {
    display: flex;
    flex-direction: column;
}

.terminal-pile-card__order-item {
    display: flex;
    padding: 10px;
    align-items: center;
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

.terminal-pile-card__dialog-footer {
    display: block;
}

.terminal-pile-card__dialog {
    width: 520px;
    background: #ffffff;
}

.terminal-pile-card {
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
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

.terminal-pile-card--other {
    border-color: #dfe0e2;
    box-shadow: none;
}

.terminal-pile-card__content {
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: flex-start;
    gap: 12px;
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

.terminal-pile-card__badge--free {
    color: #af36ff;
    background: #f6ecff;
}

.terminal-pile-card__badge--other {
    color: rgba(0, 0, 0, 0.8);
    background: #f0f2f5;
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
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: center;
    column-gap: 10px;
    height: 42px;
    outline: 0 !important;
}

.terminal-pile-card__icon {
    padding-left: 10px;
    outline: 0 !important;
}

.terminal-pile-card__main {
    display: flex;
    flex: 1;
    flex-direction: column;
    row-gap: 8px;
}

.terminal-pile-card__status-row {
    display: flex;
    align-items: center;
    min-height: 20px;
}

.terminal-pile-card__occupy {
    display: flex;
    align-items: center;
}

.terminal-pile-card__occupy-inner {
    display: inline-flex;
    align-items: center;
    column-gap: 6px;
    padding: 2px 8px 2px 4px;
    border-radius: 12px;
    background: #f7f8fa;
}

.terminal-pile-card__occupy-icon-wrap {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: #fa4126;
}

.terminal-pile-card__occupy-icon {
    opacity: 1;
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
    justify-content: space-between;
    align-items: flex-start;
}

.terminal-pile-card__tag-wrap {
    display: flex;
    align-items: center;
}

.terminal-pile-card__tag {
    display: inline-flex;
    align-items: center;
    min-height: 24px;
    padding: 0 8px;
    border-radius: 12px;
    background: #f7f8fa;
}

.terminal-pile-card__tag-text {
    font-family: AlibabaPuHuiTi, sans-serif;
    font-weight: 500;
    font-size: 11px;
    line-height: 1;
    color: #6f7173;
    vertical-align: middle;
}

.terminal-pile-card__summary-row {
    display: flex;
    align-items: center;
    column-gap: 4px;
}

.terminal-pile-card__summary-label {
    font-family: AlibabaPuHuiTi, sans-serif;
    font-size: 12px;
    color: rgba(0, 0, 0, 0.32);
}

.terminal-pile-card__summary-value {
    font-family: AlibabaPuHuiTi, sans-serif;
    font-size: 12px;
    color: rgba(0, 0, 0, 0.8);
}

.terminal-pile-card__separator {
    margin: 0 12px;
    opacity: 1;
}

.terminal-pile-card__detail {
    padding-left: 10px;
    padding-right: 10px;
    outline: 0 !important;
}

.terminal-pile-card__detail-content {
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: flex-start;
    row-gap: 8px;
    outline: 0 !important;
}

.terminal-pile-card__detail-row {
    display: flex;
    align-items: flex-start;
    column-gap: 8px;
    outline: 0 !important;
}

.terminal-pile-card__detail-grid {
    display: flex;
    column-gap: 16px;
    outline: 0 !important;
}

.terminal-pile-card__detail-column {
    display: flex;
    flex-direction: column;
    row-gap: 8px;
    outline: 0 !important;
}

.terminal-pile-card__detail-item {
    display: flex;
    align-items: center;
    column-gap: 4px;
    outline: 0 !important;
}

.terminal-pile-card__field-label {
    font-family: AlibabaPuHuiTi, sans-serif;
    font-size: 12px;
    color: rgba(0, 0, 0, 0.32);
}

.terminal-pile-card__field-label--nowrap {
    white-space: nowrap;
}

.terminal-pile-card__field-value {
    font-family: AlibabaPuHuiTi, sans-serif;
    font-size: 12px;
    color: rgba(0, 0, 0, 0.8);
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
    outline: 0 !important;
}

.terminal-pile-card__detail-section-cell {
    display: flex;
    align-items: center;
    width: 50%;
    column-gap: 4px;
    outline: 0 !important;
}

.terminal-pile-card__detail-section-cell--offset {
    padding-left: 8px;
}

.terminal-pile-card__detail-section-cell--full {
    width: 100%;
}

.terminal-pile-card__footer {
    display: flex;
    flex-direction: row;
    column-gap: 10px;
    height: 31px;
    padding-left: 10px;
    padding-right: 10px;
    outline: 0 !important;
}

.terminal-pile-card__order-trigger {
    position: absolute;
    top: 0;
    right: 0;
    display: flex;
    justify-content: center;
    width: 28px;
    height: 28px;
    border-top-right-radius: 14px;
    border-bottom-left-radius: 50px;
}

.terminal-pile-card__order-text {
    padding-left: 4px;
    font-style: normal;
}


.item-title {
    background-color: #e1ffe6;
    color: #4dc238;
    transition: all .3s;
    cursor: pointer;
    user-select: none;
    overflow: hidden
}

.item-title:hover {
    background-color: #c1eec6;
    color: #1db248
}
</style>
