import { computed, reactive, ref } from 'vue';
import { pageText } from '../../../pages/i18n';
const tt = pageText;

const orderCardColumns = [
    { name: 'sd', label: tt('order.timePeriod'), field: 'sd', align: 'left' },
    { name: 'dfdj', label: tt('order.electricityUnitPrice'), field: 'dfdj' },
    { name: 'fwfdj', label: tt('order.serviceUnitPrice'), field: 'fwfdj' },
    { name: 'dl', label: tt('order.chargeAmount'), field: 'dl' }
];

function sgApiPost(sid, param) {
    return new Promise((resolve) => {
        const postData = {};
        Object.entries(param).forEach(([key, value]) => {
            postData[key] = JSON.stringify(value);
        });

        TFF.common.ajax.getDataAsync({
            url: TFF.common.ajax.getServiceUrl(`SaaS-CM-${sid}`),
            type: 'post',
            data: postData
        }).then((result) => {
            resolve({ msg: 'success', data: result });
        });
    });
}

export function useLastChargeOrder(getPile) {
    const isShowOrderCard = ref(false);
    const orderCardInfo = reactive({});
    const orderCardTitle = ref('');
    const totalPriceText = computed(() => {
        const { ECTaxInFee_Str = 0, SCTaxInFee_Str = 0 } = orderCardInfo;
        const ecTotal = Number.parseFloat(ECTaxInFee_Str) || 0;
        const scTotal = Number.parseFloat(SCTaxInFee_Str) || 0;
        return tt('order.totalPriceSummary')
            .replace('{electricity}', ECTaxInFee_Str)
            .replace('{service}', SCTaxInFee_Str)
            .replace('{total}', (ecTotal + scTotal).toFixed(2));
    });
    const orderCardTableData = computed(() => {
        const { ChargeBillDetailList = [] } = orderCardInfo;
        return ChargeBillDetailList.map((item) => ({
            sd: item.TimeRange,
            dfdj: item.EcTaxInPrice_Str,
            fwfdj: item.ScTaxInPrice_Str,
            dl: item.Power_Str
        }));
    });

    function showOrderCard() {
        const pile = getPile() || {};
        if (!pile.PileID) {
            return;
        }

        orderCardTitle.value = tt('order.lastChargeTitle')
            .replace('{name}', pile.PileName || '');
        const filter = {
            PillID: pile.PileID,
            CustomerID: pile.CustomerID
        };

        sgApiPost('TPS-ViewChargeList', { filter }).then((result) => {
            const { msg, data: { state, data } } = result;
            if (msg === 'success' && state === '1' && data) {
                if (data.IsNull === '1') {
                    Funcs.Notify(
                        tt('runtime.message'),
                        tt('order.noLastChargeOrderRecord'),
                        'warning'
                    );
                    return;
                }

                Object.keys(orderCardInfo).forEach((key) => delete orderCardInfo[key]);
                Object.assign(orderCardInfo, data);
                isShowOrderCard.value = true;
                return;
            }

            Funcs.Notify(
                tt('runtime.message'),
                msg || tt('order.lastChargeOrderError'),
                'warning'
            );
        });
    }

    function toOrderPage() {
        Funcs.OpenFasPage({
            fasAppKey: 'hhrs',
            pageMetaId: 'Page_OrderDetails',
            param: {
                OrderID: orderCardInfo.Id,
                TransactionNumber: orderCardInfo.Code
            },
            target: 'inline',
            callback() {},
            passThroughData: ['platformtype']
        });
    }

    return {
        isShowOrderCard,
        orderCardInfo,
        orderCardTitle,
        orderCardColumns,
        totalPriceText,
        orderCardTableData,
        showOrderCard,
        toOrderPage
    };
}
