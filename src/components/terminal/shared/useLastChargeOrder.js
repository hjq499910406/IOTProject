import { computed, reactive, ref } from 'vue';

const orderCardColumns = [
    { name: 'sd', label: '时段', field: 'sd', align: 'left' },
    { name: 'dfdj', label: '电费单价（元/度）', field: 'dfdj' },
    { name: 'fwfdj', label: '服务费单价（元/度）', field: 'fwfdj' },
    { name: 'dl', label: '电量（元/度）', field: 'dl' }
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
        return `${ECTaxInFee_Str}(电费)+${SCTaxInFee_Str}(服务费)=${(ecTotal + scTotal).toFixed(2)}`;
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

        orderCardTitle.value = `上次充电订单（${pile.PileName || ''}）`;
        const filter = {
            PillID: pile.PileID,
            CustomerID: pile.CustomerID
        };

        sgApiPost('TPS-ViewChargeList', { filter }).then((result) => {
            const { msg, data: { state, data } } = result;
            if (msg === 'success' && state === '1' && data) {
                if (data.IsNull === '1') {
                    Funcs.Notify('消息', '无上次充电订单记录', 'warning');
                    return;
                }

                Object.keys(orderCardInfo).forEach((key) => delete orderCardInfo[key]);
                Object.assign(orderCardInfo, data);
                isShowOrderCard.value = true;
                return;
            }

            Funcs.Notify('消息', msg || '查看上次充电订单异常', 'warning');
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
