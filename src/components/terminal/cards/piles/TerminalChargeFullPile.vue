<template>
    <div>
        <div class="terminal-pile-card" :class="cardClass">
            <button v-if="pile.PileID" type="button" class="terminal-pile-card__order-trigger" @click="showOrderCard">
                <span class="terminal-pile-card__order-text">订</span>
            </button>
            <div class="terminal-pile-card__content">
                <div class="terminal-pile-card__title-row">
                    <span :class="statusBadgeClass">{{ statusLabel }}</span>
                    <span class="terminal-pile-card__title">{{ pile.PileName }}</span>
                </div>
                <div class="terminal-pile-card__top-row">
                    <div class="terminal-pile-card__icon">
                        <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="42" height="42" rx="21" :fill="statusIconBackground" />
                            <path
                                d="M17.325 29.0324L18.8265 25.4414H15.624L20.9055 20.3594L19.4355 23.8874H22.386L17.325 29.0324ZM15.771 13.5134C15.771 13.0514 16.17 12.6734 16.6635 12.6734H21.672C22.1655 12.6734 22.5645 13.0514 22.5645 13.5134V18.2069C22.5645 18.6689 22.1655 19.0469 21.672 19.0469H16.653C16.1595 19.0469 15.7605 18.6689 15.7605 18.2069C15.771 18.2069 15.771 13.5134 15.771 13.5134ZM29.316 14.7944C28.644 14.2274 27.51 13.2929 27.174 12.9674C26.985 12.7889 26.5335 12.6734 26.2395 12.9674C25.9455 13.2509 26.082 13.6184 26.292 13.8074C26.5965 14.0804 27.258 14.6054 27.6465 14.9939C27.3315 15.3614 26.796 15.7499 26.4705 16.0964C26.4285 16.1384 26.4285 16.1909 26.4285 16.2119C26.4285 16.4114 26.439 16.5374 26.439 16.6214C26.439 16.6949 26.5335 16.7264 26.565 16.7264H28.2345C28.3395 16.7264 28.371 16.8314 28.371 16.8314V26.9219C28.371 27.4889 28.0455 27.6569 27.7095 27.6569C27.3735 27.6569 27.0165 27.4784 27.0165 26.9219V18.6794C27.0165 17.9339 26.922 17.5874 26.0295 17.5559C25.809 17.5454 24.927 17.5559 24.444 17.5559V12.2849C24.444 11.5919 23.8455 11.0249 23.1105 11.0249H15.0045C14.2695 11.5814 13.671 12.2849 13.671 12.2849V29.1584H12.9045C12.6 29.1584 12.3585 29.3894 12.3585 29.6729V30.4289C12.3585 30.7229 12.6105 30.9644 12.9045 30.9644H25.179C25.473 30.9644 25.725 30.7019 25.725 30.4289V29.6729C25.725 29.3789 25.473 29.1584 25.179 29.1584H24.444V18.7529H25.3575C25.683 18.7529 25.7145 19.0574 25.7145 19.0574V27.0059C25.7145 29.0324 27.4995 29.0534 27.699 29.0534C27.972 29.0534 29.6415 29.0534 29.6415 27.0269V15.3614C29.652 15.3614 29.6625 15.0884 29.316 14.7944Z"
                                :fill="statusIconColor" />
                        </svg>
                    </div>
                    <div class="terminal-pile-card__main">
                        <div class="terminal-pile-card__status-row">
                            <div v-if="pile.OccupyTime" class="terminal-pile-card__occupy">
                                <div class="terminal-pile-card__occupy-inner">
                                    <div class="terminal-pile-card__occupy-icon-wrap">
                                        <span class="terminal-pile-card__occupy-icon">P</span>
                                    </div>
                                    <span class="terminal-pile-card__occupy-text">占用 {{ pile.OccupyTime }}</span>
                                </div>
                            </div>
                        </div>
                        <div class="terminal-pile-card__meta-row">
                            <div class="terminal-pile-card__tag-wrap">
                                <div v-for="tag in metaTags" :key="tag" class="terminal-pile-card__tag">
                                    <span class="terminal-pile-card__tag-text">{{ tag }}</span>
                                </div>
                            </div>
                        </div>
                        <div class="terminal-pile-card__summary-row">
                            <span class="terminal-pile-card__summary-label">
                                {{ $t('Schema.Page.UCOtherTerminal.Controls.fasr_label_322033_Copydd322033_Copyf.ConstValue', '充电结束时间:') }}
                            </span>
                            <span class="terminal-pile-card__summary-value">{{ getDetailValue(pile.ChargingEndTimeDt) }}</span>
                        </div>
                    </div>
                </div>
            </div>

            <template v-if="LocalVars.isDetail">
                <t-separator class="terminal-pile-card__separator" size="1px" spaced="8px" color="rgba(150, 150, 150, 0.15)" />
                <div class="terminal-pile-card__detail">
                    <div class="terminal-pile-card__detail-content">
                        <div class="terminal-pile-card__detail-header">
                            <div class="terminal-pile-card__detail-item terminal-pile-card__detail-item--header">
                                <span class="terminal-pile-card__field-label">{{ $t(primaryDetailRow.key, primaryDetailRow.fallback) }}</span>
                                <span class="terminal-pile-card__field-value">{{ customerDisplay }}</span>
                            </div>
                            <div v-if="customerTags.length" class="terminal-pile-card__detail-tags">
                                <span v-for="tag in customerTags" :key="tag" class="terminal-pile-card__detail-tag">{{ tag }}</span>
                            </div>
                        </div>
                        <div class="terminal-pile-card__detail-grid">
                            <div v-for="(column, columnIndex) in primaryDetailColumns" :key="`primary-${columnIndex}`" class="terminal-pile-card__detail-column">
                                <div v-for="field in column" :key="field.valueKey" class="terminal-pile-card__detail-item">
                                    <span :class="['terminal-pile-card__field-label', field.nowrap ? 'terminal-pile-card__field-label--nowrap' : '']">
                                        {{ $t(field.key, field.fallback) }}
                                    </span>
                                    <span class="terminal-pile-card__field-value">{{ getFieldValue(field) }}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div
                        v-for="section in detailSections"
                        :key="section.visibleKey"
                        v-show="LocalVars.infoSet?.[section.visibleKey]"
                        :class="['terminal-pile-card__detail-section', `terminal-pile-card__detail-section--${section.size}`]"
                    >
                        <div v-for="(row, rowIndex) in section.rows" :key="`${section.visibleKey}-${rowIndex}`" class="terminal-pile-card__detail-section-row">
                            <div
                                v-for="field in row"
                                :key="field.valueKey"
                                :class="[
                                    'terminal-pile-card__detail-section-cell',
                                    field.full ? 'terminal-pile-card__detail-section-cell--full' : '',
                                    field.offset ? 'terminal-pile-card__detail-section-cell--offset' : ''
                                ]"
                            >
                                <span :class="['terminal-pile-card__field-label', field.nowrap ? 'terminal-pile-card__field-label--nowrap' : '']">
                                    {{ $t(field.key, field.fallback) }}
                                </span>
                                <span class="terminal-pile-card__field-value">{{ getFieldValue(field) }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </template>

            <div class="terminal-pile-card__footer" v-if="!LocalVars.isDetail"></div>
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
import { computed } from 'vue';
import LastChargeOrderDialog from '../../shared/LastChargeOrderDialog.vue';
import { useLastChargeOrder } from '../../shared/useLastChargeOrder.js';

const { Funcs, TFF, TeldProductVersionType } = window;
const detailPlaceholder = '--';
const statusLabel = '已充满';
const statusIconBackground = '#EDFFF7';
const statusIconColor = '#17B26A';

const primaryDetailRow = { key: 'Schema.Page.UCChargingTerminal.Controls.fasr_label_e314381_Copy.ConstValue', fallback: '客户名称' };
const primaryDetailColumns = [
    [
        { key: 'Schema.Page.UCChargingTerminal.Controls.fasr_label_e719153_Copy.ConstValue', fallback: '充电开始时间', valueKey: 'ChargingBeginTime', nowrap: true },
        { key: 'Schema.Page.UCChargingTerminal.Controls.fasr_label_e351115_Copy.ConstValue', fallback: '已充时长', valueKey: 'ChargingTime' }
    ],
    [
        { key: 'Schema.Page.UCChargingTerminal.Controls.fasr_label_e966623_Copy.ConstValue', fallback: '充电费用', valueKey: 'ChargingMoney' },
        { key: 'Schema.Page.UCChargingTerminal.Controls.fasr_label_e848877_Copy.ConstValue', fallback: '充电量', valueKey: 'ChargingPower' }
    ]
];
const detailSections = [
    {
        visibleKey: 'oneOld',
        size: 'tall',
        rows: [
            [
                { key: 'Schema.Page.UCOtherTerminal.Controls.fasr_label_7dd81f.ConstValue', fallback: '判定车系', valueKey: 'CarSeriesName' },
                { key: 'Schema.Page.UCOtherTerminal.Controls.fasr_label_247335_Copydd247335_Copyf.ConstValue', fallback: '车牌号', valueKey: 'CarNumber', offset: true }
            ],
            [{ key: 'Schema.Page.UCOtherTerminal.Controls.fasr_label_386241_Copydd386241_Copyf.ConstValue', fallback: '车架号', valueKey: 'VIN', full: true }],
            [
                { key: 'Schema.Page.UCOtherTerminal.Controls.fasr_label_695984_Copydd695984_Copyf.ConstValue', fallback: '车辆自编号', valueKey: 'VehicleCode' },
                { key: 'Schema.Page.UCOtherTerminal.Controls.fasr_label_384687_Copydd384687_Copyf.ConstValue', fallback: '路线', valueKey: 'Route', offset: true }
            ],
            [
                { key: 'Schema.Page.UCOtherTerminal.Controls.fasr_label_779803_Copydd779803_Copyf.ConstValue', fallback: '电池最高温度', valueKey: 'MaxTemperature' },
                { key: 'Schema.Page.UCOtherTerminal.Controls.fasr_label_955825_Copydd955825_Copyf.ConstValue', fallback: '电池最低温度', valueKey: 'MinTemperature', offset: true }
            ]
        ]
    },
    {
        visibleKey: 'twoOld',
        size: 'short',
        rows: [
            [
                { key: 'Schema.Page.UCOtherTerminal.Controls.fasr_label_796168_Copydd796168_Copyf.ConstValue', fallback: '插枪时间', valueKey: 'GunInsertionTime' },
                { key: 'Schema.Page.UCOtherTerminal.Controls.fasr_label_775321_Copydd775321_Copyf.ConstValue', fallback: '启动方式', valueKey: 'ChargeNames', offset: true }
            ],
            [
                { key: 'Schema.Page.UCOtherTerminal.Controls.fasr_label_424176_Copydd424176_Copyf.ConstValue', fallback: '充电入口', valueKey: 'ChargeEnter' },
                { key: 'Schema.Page.UCOtherTerminal.Controls.fasr_label_360184_Copydd360184_Copyf.ConstValue', fallback: '初始SOC', valueKey: 'InitSOC', offset: true }
            ],
            [
                { key: 'Schema.Page.UCOtherTerminal.Controls.fasr_label_125853_Copydd125853_Copyf.ConstValue', fallback: '预计剩余时间', valueKey: 'ChargingLastTime' },
                { key: 'Schema.Page.UCOtherTerminal.Controls.fasr_label_780108_Copydd780108_Copyf.ConstValue', fallback: '充电结束时间', valueKey: 'ChargingEndTime', offset: true }
            ]
        ]
    },
    {
        visibleKey: 'threeOld',
        size: 'tall',
        rows: [
            [
                { key: 'Schema.Page.UCOtherTerminal.Controls.fasr_label_123557_Copydd123557_Copyf.ConstValue', fallback: '实际电流', valueKey: 'AP' },
                { key: 'Schema.Page.UCOtherTerminal.Controls.fasr_label_632675_Copydd632675_Copyf.ConstValue', fallback: '实际功率', valueKey: 'DP', offset: true }
            ],
            [
                { key: 'Schema.Page.UCOtherTerminal.Controls.fasr_label_258866_Copydd258866_Copyf.ConstValue', fallback: '平均需求电流', valueKey: 'AvgAP' },
                { key: 'Schema.Page.UCOtherTerminal.Controls.fasr_label_113155_Copydd113155_Copyf.ConstValue', fallback: '平均需求功率', valueKey: 'AvgDP', offset: true }
            ],
            [
                { key: 'Schema.Page.UCOtherTerminal.Controls.fasr_label_128287_Copydd128287_Copyf.ConstValue', fallback: '最大需求电流', valueKey: 'MaxAP' },
                { key: 'Schema.Page.UCOtherTerminal.Controls.fasr_label_989798_Copydd989798_Copyf.ConstValue', fallback: '最大需求功率', valueKey: 'MaxDP', offset: true }
            ],
            [
                { key: 'Schema.Page.UCOtherTerminal.Controls.fasr_label_159984_Copydd159984_Copyf.ConstValue', fallback: '电流满足率', valueKey: 'ElectricRate' },
                { key: 'Schema.Page.UCOtherTerminal.Controls.fasr_label_873150_Copydd873150_Copyf.ConstValue', fallback: '功率满足率', valueKey: 'PowerRate', offset: true }
            ]
        ]
    }
];

const props = defineProps({
    localVars: { type: Object, required: true }
});

const LocalVars = props.localVars;
const pile = computed(() => LocalVars?.pile || {});
const statusBadgeClass = computed(() => ['terminal-pile-card__badge', 'terminal-pile-card__badge--full']);
const cardClass = computed(() => ({ 'terminal-pile-card--compact': !LocalVars?.isDetail }));
const customerDisplay = computed(() => getDetailValue(pile.value.CustomerName || pile.value.CustomerPhone));
const customerTags = computed(() => [pile.value.CustomerType, pile.value.CustomerClassification].filter(Boolean));
const metaTags = computed(() => {
    const tags = [pile.value.ChargingName];
    if (pile.value.ChargingPower && pile.value.ChargingPower !== detailPlaceholder) {
        tags.push(`充电量${pile.value.ChargingPower}`);
    }
    return tags.filter(Boolean);
});

function getDetailValue(value) {
    return value == null || value === '' ? detailPlaceholder : value;
}

function getFieldValue(field) {
    return getDetailValue(pile.value[field.valueKey]);
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
    padding: 16px 0;
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

.terminal-pile-card__title-row,
.terminal-pile-card__top-row,
.terminal-pile-card__status-row,
.terminal-pile-card__occupy,
.terminal-pile-card__meta-row,
.terminal-pile-card__detail-section-row,
.terminal-pile-card__footer,
.terminal-pile-card__dialog-header,
.terminal-pile-card__order-item {
    display: flex;
    align-items: center;
}

.terminal-pile-card__top-row {
    column-gap: 10px;
    min-height: 42px;
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

.terminal-pile-card__badge--full {
    color: #17b26a;
    background: #edfff7;
}

.terminal-pile-card__title {
    font-family: AlibabaPuHuiTi, sans-serif;
    font-weight: 500;
    font-size: 14px;
    line-height: 1;
    color: rgba(0, 0, 0, 0.8);
    vertical-align: middle;
}

.terminal-pile-card__icon {
    padding-left: 10px;
}

.terminal-pile-card__main {
    display: flex;
    flex: 1;
    flex-direction: column;
    row-gap: 8px;
    max-width: calc(100% - 77px);
}

.terminal-pile-card__status-row {
    min-height: 20px;
}

.terminal-pile-card__occupy-inner {
    display: inline-flex;
    align-items: center;
    column-gap: 6px;
    padding: 1px 8px 1px 0;
    border-top-left-radius: 6px;
    border-bottom-left-radius: 6px;
    background: linear-gradient(90deg, rgba(255, 140, 0, 0.4) 0%, rgba(255, 140, 0, 0) 100%);
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

.terminal-pile-card__occupy-icon {
    color: #fff;
    font-size: 12px;
    line-height: 1;
}

.terminal-pile-card__occupy-text {
    font-family: AlibabaPuHuiTi, sans-serif;
    font-size: 12px;
    line-height: 1;
    white-space: nowrap;
    color: rgba(0, 0, 0, 0.8);
}

.terminal-pile-card__tag-wrap {
    display: flex;
    flex: 1;
    flex-wrap: wrap;
    align-items: center;
    gap: 4px;
}

.terminal-pile-card__tag {
    display: inline-flex;
    align-items: center;
    min-height: 24px;
    padding: 0 8px;
    border: 1px solid #e4e5e7;
    border-radius: 12px;
    background: #fff;
}

.terminal-pile-card__tag-text,
.terminal-pile-card__detail-tag {
    font-family: AlibabaPuHuiTi, sans-serif;
    font-weight: 500;
    line-height: 1;
}

.terminal-pile-card__tag-text {
    font-size: 11px;
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

.terminal-pile-card__detail-content,
.terminal-pile-card__detail-column,
.terminal-pile-card__detail-section,
.terminal-pile-card__order-dialog,
.terminal-pile-card__order-list {
    display: flex;
    flex-direction: column;
}

.terminal-pile-card__detail-content,
.terminal-pile-card__detail-column {
    row-gap: 8px;
}

.terminal-pile-card__detail-header,
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
    font-size: 11px;
    color: rgba(0, 0, 0, 0.56);
}

.terminal-pile-card__detail-grid {
    display: flex;
    width: 100%;
}

.terminal-pile-card__detail-column {
    width: 50%;
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

.terminal-pile-card__detail-section {
    row-gap: 6px;
    padding-top: 16px;
}

.terminal-pile-card__detail-section--tall {
    min-height: 104px;
}

.terminal-pile-card__detail-section--short {
    min-height: 84px;
}

.terminal-pile-card__detail-section-cell {
    width: 50%;
}

.terminal-pile-card__detail-section-cell--full {
    width: 100%;
}

.terminal-pile-card__footer {
    height: 31px;
    padding: 0 10px;
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
    background: #fff;
}

.terminal-pile-card__dialog-header {
    justify-content: space-between;
    padding: 16px 24px 0;
}

.terminal-pile-card__dialog-title {
    font-size: 16px;
}

.terminal-pile-card__dialog-body {
    max-height: calc(100vh - 60px);
    overflow-y: auto;
}

.terminal-pile-card__order-item {
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
