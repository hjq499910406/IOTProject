<template>
    <div>
        <div class="terminal-pile-card" :class="cardClass">
            <button v-if="pile.PileID" type="button" class="terminal-pile-card__order-trigger"
                @click="showOrderCard">
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
                                {{ $t(summaryField.key, summaryField.fallback) }}
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
                                    {{ $t(primaryDetailRow.key, primaryDetailRow.fallback) }}
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
                                        {{ $t(field.key, field.fallback) }}
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
                                    {{ $t(field.key, field.fallback) }}
                                </span>
                                <span class="terminal-pile-card__field-value">{{ getFieldValue(field) }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </template>

            <div class="terminal-pile-card__footer">
                <t-button v-loading="isClosingCharge" class="tr-button-default terminal-pile-card__end-button"
                    :label="$t('Schema.Page.UCChargeFullTerminal.Controls.fasr_button_592685_Copya592685_Copycf.Label', '结束充电')"
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
import { computed, ref } from 'vue';
import LastChargeOrderDialog from '../../shared/LastChargeOrderDialog.vue';
import { useLastChargeOrder } from '../../shared/useLastChargeOrder.js';

const { Funcs, TFF, TeldProductVersionType } = window;
const detailPlaceholder = '--';
const statusLabel = '充电中';

const primaryDetailRow = {
    key: 'Schema.Page.UCChargingTerminal.Controls.fasr_label_e314381_Copy.ConstValue',
    fallback: '客户名称',
    valueKey: 'CustomerPhone'
};

const primaryDetailColumns = [
    [
        {
            key: 'Schema.Page.UCChargingTerminal.Controls.fasr_label_e719153_Copy.ConstValue',
            fallback: '充电开始时间',
            valueKey: 'ChargingBeginTime',
            nowrap: true
        },
        {
            key: 'Schema.Page.UCChargingTerminal.Controls.fasr_label_e351115_Copy.ConstValue',
            fallback: '已充时长',
            valueKey: 'ChargingTime'
        }
    ],
    [
        {
            key: 'Schema.Page.UCChargingTerminal.Controls.fasr_label_e966623_Copy.ConstValue',
            fallback: '充电费用',
            valueKey: 'ChargingMoney'
        },
        {
            key: 'Schema.Page.UCChargingTerminal.Controls.fasr_label_e848877_Copy.ConstValue',
            fallback: '充电量',
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
                    key: 'Schema.Page.UCOtherTerminal.Controls.fasr_label_7dd81f.ConstValue',
                    fallback: '判定车系',
                    valueKey: 'CarSeriesName'
                },
                {
                    key: 'Schema.Page.UCOtherTerminal.Controls.fasr_label_247335_Copydd247335_Copyf.ConstValue',
                    fallback: '车牌号',
                    valueKey: 'CarNumber',
                    offset: true
                }
            ],
            [
                {
                    key: 'Schema.Page.UCOtherTerminal.Controls.fasr_label_386241_Copydd386241_Copyf.ConstValue',
                    fallback: '车架号',
                    valueKey: 'VIN',
                    full: true
                }
            ],
            [
                {
                    key: 'Schema.Page.UCOtherTerminal.Controls.fasr_label_695984_Copydd695984_Copyf.ConstValue',
                    fallback: '车辆自编号',
                    valueKey: 'VehicleCode'
                },
                {
                    key: 'Schema.Page.UCOtherTerminal.Controls.fasr_label_384687_Copydd384687_Copyf.ConstValue',
                    fallback: '路线',
                    valueKey: 'Route',
                    offset: true
                }
            ],
            [
                {
                    key: 'Schema.Page.UCOtherTerminal.Controls.fasr_label_779803_Copydd779803_Copyf.ConstValue',
                    fallback: '电池最高温度',
                    valueKey: 'MaxTemperature'
                },
                {
                    key: 'Schema.Page.UCOtherTerminal.Controls.fasr_label_955825_Copydd955825_Copyf.ConstValue',
                    fallback: '电池最低温度',
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
                    key: 'Schema.Page.UCOtherTerminal.Controls.fasr_label_796168_Copydd796168_Copyf.ConstValue',
                    fallback: '插枪时间',
                    valueKey: 'GunInsertionTime'
                },
                {
                    key: 'Schema.Page.UCOtherTerminal.Controls.fasr_label_775321_Copydd775321_Copyf.ConstValue',
                    fallback: '启动方式',
                    valueKey: 'ChargeNames',
                    offset: true
                }
            ],
            [
                {
                    key: 'Schema.Page.UCOtherTerminal.Controls.fasr_label_424176_Copydd424176_Copyf.ConstValue',
                    fallback: '充电入口',
                    valueKey: 'ChargeEnter'
                },
                {
                    key: 'Schema.Page.UCOtherTerminal.Controls.fasr_label_360184_Copydd360184_Copyf.ConstValue',
                    fallback: '初始SOC',
                    valueKey: 'InitSOC',
                    offset: true
                }
            ],
            [
                {
                    key: 'Schema.Page.UCOtherTerminal.Controls.fasr_label_125853_Copydd125853_Copyf.ConstValue',
                    fallback: '预计剩余时间',
                    valueKey: 'ChargingLastTime'
                },
                {
                    key: 'Schema.Page.UCOtherTerminal.Controls.fasr_label_780108_Copydd780108_Copyf.ConstValue',
                    fallback: '充电结束时间',
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
                    key: 'Schema.Page.UCOtherTerminal.Controls.fasr_label_123557_Copydd123557_Copyf.ConstValue',
                    fallback: '实际电流',
                    valueKey: 'AP'
                },
                {
                    key: 'Schema.Page.UCOtherTerminal.Controls.fasr_label_632675_Copydd632675_Copyf.ConstValue',
                    fallback: '实际功率',
                    valueKey: 'DP',
                    offset: true
                }
            ],
            [
                {
                    key: 'Schema.Page.UCOtherTerminal.Controls.fasr_label_258866_Copydd258866_Copyf.ConstValue',
                    fallback: '平均需求电流',
                    valueKey: 'AvgAP'
                },
                {
                    key: 'Schema.Page.UCOtherTerminal.Controls.fasr_label_113155_Copydd113155_Copyf.ConstValue',
                    fallback: '平均需求功率',
                    valueKey: 'AvgDP',
                    offset: true
                }
            ],
            [
                {
                    key: 'Schema.Page.UCOtherTerminal.Controls.fasr_label_128287_Copydd128287_Copyf.ConstValue',
                    fallback: '最大需求电流',
                    valueKey: 'MaxAP'
                },
                {
                    key: 'Schema.Page.UCOtherTerminal.Controls.fasr_label_989798_Copydd989798_Copyf.ConstValue',
                    fallback: '最大需求功率',
                    valueKey: 'MaxDP',
                    offset: true
                }
            ],
            [
                {
                    key: 'Schema.Page.UCOtherTerminal.Controls.fasr_label_159984_Copydd159984_Copyf.ConstValue',
                    fallback: '电流满足率',
                    valueKey: 'ElectricRate'
                },
                {
                    key: 'Schema.Page.UCOtherTerminal.Controls.fasr_label_873150_Copydd873150_Copyf.ConstValue',
                    fallback: '功率满足率',
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
    key: 'Schema.Page.UCOtherTerminal.Controls.fasr_label_322033_Copydd322033_Copyf.ConstValue',
    fallback: '预计充满时间:',
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
    Funcs.Confirm('提示', `确认要给终端[${pile.value.PileName}]结束充电吗?`, () => {
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
                Funcs.Notify('消息', '结束充电成功', 'success');
                LocalVars.isDetail = false;
                emit('OnFireEvent', 'refresh');
                return;
            }
            Funcs.Notify('警告', errmsg || '结束充电失败', 'error');
        })
        .catch(() => {
            Funcs.Notify('警告', '结束充电失败', 'error');
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
