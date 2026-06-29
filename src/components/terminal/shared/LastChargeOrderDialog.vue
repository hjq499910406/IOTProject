<template>
    <t-dialog v-model:show="dialogVisible" :position="dialogPosition">
        <div :class="['last-charge-order-dialog', dialogClass]">
            <div class="last-charge-order-dialog__header">
                <span class="last-charge-order-dialog__title">{{ title }}</span>
                <t-button
                    class="tr-button-icon-text2"
                    label=""
                    icon="fas dx-icon icon-t-delete-01"
                    :showHint="true"
                    @click="dialogVisible = false"
                    v-close-popup
                />
            </div>
            <div class="last-charge-order-dialog__body">
                <div class="last-charge-order-dialog__content">
                    <div class="last-charge-order-dialog__list">
                        <div v-for="item in summaryItems" :key="item.label" class="last-charge-order-dialog__item">
                            <div class="last-charge-order-dialog__label">{{ item.label }}</div>
                            <div
                                :class="[
                                    'last-charge-order-dialog__value',
                                    item.clickable && enableOrderLink ? 'last-charge-order-dialog__value--link' : ''
                                ]"
                                @click="item.clickable && emit('order-click')"
                            >
                                {{ item.value }}
                            </div>
                        </div>
                    </div>
                    <t-table
                        flat
                        bordered
                        title=""
                        :rows="tableData"
                        :columns="columns"
                        :hide-pagination="true"
                        row-key="sd"
                        separator="cell"
                    />
                </div>
                <span slot="footer" class="last-charge-order-dialog__footer">
                    <t-button flat :label="tt('common.close')" :class="closeButtonClass" @click="dialogVisible = false" />
                </span>
            </div>
        </div>
    </t-dialog>
</template>

<script setup>

import { pageText } from '../../../pages/i18n';
const tt = pageText;

import { computed } from 'vue';


const DETAIL_PLACEHOLDER = '--';

const props = defineProps({
    show: { type: Boolean, default: false },
    title: { type: String, default: '' },
    orderCardInfo: { type: Object, default: () => ({}) },
    columns: { type: Array, default: () => [] },
    tableData: { type: Array, default: () => [] },
    totalPriceText: { type: String, default: '' },
    enableOrderLink: { type: Boolean, default: true },
    position: { type: String, default: '' },
    dialogClass: { type: String, default: '' },
    closeButtonClass: { type: String, default: 'tr-button-default' }
});

const emit = defineEmits(['update:show', 'order-click']);

const dialogVisible = computed({
    get: () => props.show,
    set: (value) => emit('update:show', value)
});

const dialogPosition = computed(() => props.position || (window.isPC() ? 'standard' : 'bottom'));

function getDetailValue(value) {
    return value == null || value === '' ? DETAIL_PLACEHOLDER : String(value);
}

const summaryItems = computed(() => [
    {
        label: tt('order.orderNumber'),
        value: getDetailValue(props.orderCardInfo.Code),
        clickable: true
    },
    {
        label: tt('order.startTime'),
        value: getDetailValue(props.orderCardInfo.BeginTime_Str)
    },
    {
        label: tt('order.endTime'),
        value: getDetailValue(props.orderCardInfo.EndTime_Str)
    },
    {
        label: tt('order.totalEnergy'),
        value: getDetailValue(props.orderCardInfo.Power_Str)
    },
    {
        label: tt('order.chargingFee'),
        value: props.totalPriceText
    },
    {
        label: tt('order.customerName'),
        value: getDetailValue(props.orderCardInfo.CustName)
    }
]);
</script>

<style scoped>
.last-charge-order-dialog {
    width: 520px;
    background: #ffffff;
}

.last-charge-order-dialog__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 24px 0;
}

.last-charge-order-dialog__title {
    font-size: 16px;
}

.last-charge-order-dialog__body {
    max-height: calc(100vh - 60px);
    overflow-y: auto;
}

.last-charge-order-dialog__content {
    padding-bottom: 16px;
}

.last-charge-order-dialog__item {
    display: flex;
    align-items: center;
    padding: 10px;
}

.last-charge-order-dialog__label {
    width: 120px;
}

.last-charge-order-dialog__value {
    font-weight: bold;
}

.last-charge-order-dialog__value--link {
    cursor: pointer;
    color: #409eff;
}
</style>
