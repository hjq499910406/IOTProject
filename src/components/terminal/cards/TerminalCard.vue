<template>
    <div v-show="visible" class="uc-terminal-card" :class="terminalCardClass">
        <!-- 故障 -->
        <TerminalFaultyPile v-if="stateType === 'faulty'" class="uc-terminal-card__pile fasr_faultyPile"
            :localVars="localVars" />
        <!-- 已插入枪 -->
        <template v-else-if="stateType === 'gunsInserted'">
            <TerminalGunsInsertedPile class="uc-terminal-card__pile fasr_gunsInsertedPile" :localVars="localVars"
                @OnFireEvent="handleGunsInsertedFireEvent" />
            <span class="uc-terminal-card__float-link" @click="handleMsgClick">报文</span>
        </template>
        <!-- 充电中 -->
        <TerminalChargingPile v-else-if="stateType === 'charging'" class="uc-terminal-card__pile fasr_chargingPile"
            :localVars="localVars" @OnFireEvent="handleChargingFireEvent" />
        <!-- 已充满 -->
        <TerminalChargeFullPile v-else-if="stateType === 'chargeFull'"
            class="uc-terminal-card__pile fasr_chargeFullPile" :localVars="localVars" />
        <!-- 空闲 -->
        <TerminalFreePile v-else-if="stateType === 'free'" class="uc-terminal-card__pile fasr_freePile"
            :localVars="localVars" variant="free" />
        <!-- 离网 -->
        <TerminalOffGridPile v-else-if="stateType === 'offGrid'" class="uc-terminal-card__pile fasr_offGridPile"
            :localVars="localVars" />
        <!-- 其他 -->
        <TerminalFreePile v-else class="uc-terminal-card__pile fasr_otherPile" :localVars="localVars"
            variant="other" />
    </div>
</template>

<script setup>
import { computed, onMounted, reactive, watch } from 'vue';
import TerminalFaultyPile from './piles/TerminalFaultyPile.vue';
import TerminalOffGridPile from './piles/TerminalOffGridPile.vue';
import TerminalGunsInsertedPile from './piles/TerminalGunsInsertedPile.vue';
import TerminalChargingPile from './piles/TerminalChargingPile.vue';
import TerminalChargeFullPile from './piles/TerminalChargeFullPile.vue';
import TerminalFreePile from './piles/TerminalFreePile.vue';

const Funcs = window.Funcs;

const createDefaultPile = () => ({
    PileID: '',
    PileCode: '',
    PileName: '',
    StaID: '',
    StaName: '',
    BillCode: '',
    PileRealTimeState: '',
    PileSOC: null,
    PileFullOfTime: '',
    LastRemindTime: '',
    IfFastCharging: '',
    ChargingMoney: null,
    ChargingPower: null,
    ChargingBeginTime: '',
    ChargingEndTime: '',
    OccupyTime: '',
    CustomerID: '',
    CustomerType: '',
    CustomerTypeDetail: '',
    CustomerName: '',
    CustomerClassification: '',
    CustomerPhone: '',
    CustomerLabel: '',
    PileUsageTime: null,
    DataCenter: '',
    EstimatedFillingTime: '',
    ChargingTime: '',
    GunInsertionTime: '',
    ChargingStopReason: '',
    OffTime: '',
    OffLength: '',
    OffRate: '',
    FaultRate: '',
    ChargingBeginTimeDt: null,
    GunInsertionTimeDt: null,
    OffTimeDt: null,
    FaultRateDc: null,
    ChargingEndTimeDt: null,
    OccupyStartTime: '',
    OrderByNum: null,
    IsNoGunOccupancy: null,
    CarNumber: '',
    FaultRemoveAdvice: '',
    IsCharged: null,
    FaultTime: '',
    FaultReason: '',
    LastChargeTime: null
});

const props = defineProps({
    stateType: {
        type: String,
        required: true
    },
    infoSet: {
        type: Object,
        default: () => ({
            one: false,
            two: false,
            three: false,
            oneOld: false,
            twoOld: false,
            threeOld: false
        })
    },
    isDetail: {
        type: Boolean,
        default: false
    },
    isShow: {
        type: Boolean,
        default: false
    },
    pileData: {
        type: Object,
        default: () => ({
            PileID: '',
            PileCode: '',
            PileName: '',
            StaID: '',
            StaName: '',
            BillCode: '',
            PileRealTimeState: '',
            PileSOC: null,
            PileFullOfTime: '',
            LastRemindTime: '',
            IfFastCharging: '',
            ChargingMoney: null,
            ChargingPower: null,
            ChargingBeginTime: '',
            ChargingEndTime: '',
            OccupyTime: '',
            CustomerID: '',
            CustomerType: '',
            CustomerTypeDetail: '',
            CustomerName: '',
            CustomerClassification: '',
            CustomerPhone: '',
            CustomerLabel: '',
            PileUsageTime: null,
            DataCenter: '',
            EstimatedFillingTime: '',
            ChargingTime: '',
            GunInsertionTime: '',
            ChargingStopReason: '',
            OffTime: '',
            OffLength: '',
            OffRate: '',
            FaultRate: '',
            ChargingBeginTimeDt: null,
            GunInsertionTimeDt: null,
            OffTimeDt: null,
            FaultRateDc: null,
            ChargingEndTimeDt: null,
            OccupyStartTime: '',
            OrderByNum: null,
            IsNoGunOccupancy: null,
            CarNumber: '',
            FaultRemoveAdvice: '',
            IsCharged: null,
            FaultTime: '',
            FaultReason: '',
            LastChargeTime: null
        })
    },
    visible: {
        type: Boolean,
        default: true
    }
});

const emit = defineEmits(['openCharge', 'closeCharge']);

const localVars = reactive({
    pile: createDefaultPile(),
    infoSet: props.infoSet,
    isDetail: props.isDetail,
    isShow: props.isShow,
    PileData: props.pileData,
    position: window.isPC() ? 'standard' : 'bottom',
    maximized: !window.isPC()
});

const terminalCardClass = computed(() => ({
    'uc-terminal-card--guns-inserted': props.stateType === 'gunsInserted'
}));

const getChargingName = (pileData) => {
    if (pileData.IsSuperCharging == '1') return '超充';
    return pileData.IfFastCharging == '1' ? '快充' : '慢充';
};

const getFastChargingName = (pileData) => {
    return pileData.IfFastCharging == '1' ? '快充' : '慢充';
};

const getCustomerTypeLabel = (customerType) => {
    if (customerType == '1') return '个人客户';
    if (customerType == 2) return '企业客户';
    return customerType;
};

const appendUnit = (value, unit, fallback = '--') => {
    return [undefined, null, ''].includes(value) ? fallback : `${value}${unit}`;
};

const appendMoneyUnit = (value, fallback = '--') => {
    return [undefined, null, ''].includes(value) ? fallback : `¥${value}`;
};

const assignBasePileFields = (pileData) => {
    Object.assign(localVars.pile, createDefaultPile(), {
        StaID: pileData.StaID,
        StaName: pileData.StaName,
        CtrlAddress: pileData.CtrlAddress,
        CanSN: pileData.CanSN,
        CustomerID: pileData.CustomerID,
        PileID: pileData.PileID,
        PileName: pileData.PileName,
        BillCode: pileData.BillCode,
        PileCode: pileData.PileCode
    });
};

const applyFaultyPile = (pileData) => {
    assignBasePileFields(pileData);
    Object.assign(localVars.pile, {
        ChargingName: getFastChargingName(pileData),
        FaultRate: pileData.FaultRate || '无',
        FaultReason: pileData.FaultReason || '无',
        FaultRemoveAdvice: pileData.FaultRemoveAdvice || '无'
    });
};

const applyOffGridPile = (pileData) => {
    assignBasePileFields(pileData);
    Object.assign(localVars.pile, {
        ChargingName: getFastChargingName(pileData),
        OffRate: pileData.OffRate || '无',
        FaultReason: pileData.OffTime,
        OffLength: pileData.OffLength || '无',
        OffTime: pileData.OffTime || '无'
    });
};

const applyChargeVehicleFields = (pileData) => {
    Object.assign(localVars.pile, {
        CarSeriesName: pileData.CarSeriesName || '--',
        CarNumber: pileData.CarNumber || '--',
        VIN: pileData.VIN || '--',
        VehicleCode: pileData.VehicleCode || '--',
        Route: pileData.Route || '--',
        MaxTemperature: appendUnit(pileData.MaxTemperature, '℃'),
        MinTemperature: appendUnit(pileData.MinTemperature, '℃'),
        GunInsertionTime: pileData.GunInsertionTime || '--',
        ChargeNames: pileData.ChargeNames || '--',
        ChargeEnter: pileData.ChargeEnter || '--',
        InitSOC: appendUnit(pileData.InitSOC, '%'),
        EstimatedFillingTime: pileData.EstimatedFillingTime || '--',
        ChargingLastTime: pileData.ChargingLastTime || '--',
        ChargingEndTime: pileData.ChargingEndTime || '--',
        ChargeMode: pileData.ChargeMode || '--',
        ChargeStrategy: pileData.ChargeStrategy || '--',
        AP: appendUnit(pileData.AP, 'A'),
        DP: appendUnit(pileData.DP, 'kWh'),
        AvgAP: appendUnit(pileData.AvgAP, 'A'),
        AvgDP: appendUnit(pileData.AvgDP, 'kWh'),
        MaxAP: appendUnit(pileData.MaxAP, 'A'),
        MaxDP: appendUnit(pileData.MaxDP, 'kWh'),
        ElectricRate: pileData.ElectricRate || '--',
        PowerRate: pileData.PowerRate || '--'
    });
};

const applyGunsInsertedPile = (pileData) => {
    assignBasePileFields(pileData);
    Object.assign(localVars.pile, {
        IsSetPileLimitSOC: pileData.IsSetPileLimitSOC,
        PileLimitSOC: pileData.PileLimitSOC,
        GunInsertionTimeDt: pileData.GunInsertionTimeDt || '--',
        ChargingName: getChargingName(pileData),
        OccupyTime: pileData.OccupyTime || '',
        CustomerPhone: pileData.CustomerName || '--',
        CustomerClassification: pileData.BillCode ? pileData.CustomerClassification : '',
        CustomerType: getCustomerTypeLabel(pileData.CustomerType),
        ChargingEndTimeDt: pileData.ChargingEndTimeDt,
        ChargingPower: pileData.BillCode ? appendUnit(pileData.ChargingPower, 'kWh') : '--',
        ChargingMoney: pileData.BillCode ? appendMoneyUnit(pileData.ChargingMoney) : '--',
        ChargingBeginTime: pileData.ChargingBeginTime || '--',
        IsCharged: pileData.IsCharged,
        ChargingTime: pileData.ChargingTime || '--'
    });
    applyChargeVehicleFields(pileData);
};

const applyChargingPile = (pileData) => {
    assignBasePileFields(pileData);
    Object.assign(localVars.pile, {
        ChargingName: getChargingName(pileData),
        ChargingTime: pileData.ChargingTime || '--',
        CustomerPhone: pileData.CustomerName || '--',
        CustomerClassification: pileData.CustomerClassification,
        CustomerType: getCustomerTypeLabel(pileData.CustomerType),
        ChargingPower: appendUnit(pileData.ChargingPower, 'kWh'),
        ChargingMoney: appendMoneyUnit(pileData.ChargingMoney),
        ChargingBeginTime: pileData.ChargingBeginTime || '无',
        PileSOC: pileData.PileSOC ? `${pileData.PileSOC}%` : '0%'
    });
    applyChargeVehicleFields(pileData);
};

const applyChargeFullPile = (pileData) => {
    assignBasePileFields(pileData);
    Object.assign(localVars.pile, {
        ChargingName: getChargingName(pileData),
        OccupyTime: pileData.OccupyTime || '',
        CustomerPhone: pileData.CustomerName || '--',
        CustomerClassification: pileData.CustomerClassification,
        CustomerType: getCustomerTypeLabel(pileData.CustomerType),
        PileFullOfTime: `充满时间 ${pileData.PileFullOfTime}`,
        ChargingPower: appendUnit(pileData.ChargingPower, 'kWh'),
        ChargingMoney: appendMoneyUnit(pileData.ChargingMoney),
        ChargingBeginTime: pileData.ChargingBeginTime || '无',
        PileSOC: pileData.PileSOC ? `${pileData.PileSOC * 100}%` : '--',
        ChargingTime: pileData.ChargingTime || '--'
    });
    applyChargeVehicleFields(pileData);
};

const applyFreePile = (pileData) => {
    assignBasePileFields(pileData);
    Object.assign(localVars.pile, {
        ChargingName: getFastChargingName(pileData),
        LastChargeTime: pileData.LastChargeTime
    });
};

const applyOtherPile = (pileData) => {
    assignBasePileFields(pileData);
    Object.assign(localVars.pile, {
        ChargingName: getFastChargingName(pileData),
        LastChargeTime: pileData.LastChargeTime
    });
};

const pileStateMappers = {
    faulty: applyFaultyPile,
    offGrid: applyOffGridPile,
    gunsInserted: applyGunsInsertedPile,
    charging: applyChargingPile,
    chargeFull: applyChargeFullPile,
    free: applyFreePile,
    other: applyOtherPile
};

const refreshPile = () => {
    localVars.infoSet = props.infoSet;
    localVars.isDetail = props.isDetail;
    localVars.isShow = props.isShow;
    localVars.PileData = props.pileData;
    localVars.position = window.isPC() ? 'standard' : 'bottom';
    localVars.maximized = !window.isPC();
    pileStateMappers[props.stateType]?.(props.pileData || createDefaultPile());
};

const handleMsgClick = () => {
    const pileData = props.pileData || {};
    const param = {
        StaID: pileData.StaID || '',
        StaName: pileData.StaName || '',
        CtrlID: '',
        CtrlName: '',
        PileName: pileData.PileName || '',
        PileID: pileData.PileID || ''
    };
    Funcs.OpenFasPage({
        pageMetaId: 'Page_ViewMessageList',
        param: {
            InParam_Filter: JSON.stringify(param)
        },
        fasAppKey: 'hhrs',
        target: 'inline',
        callback() { },
        passThroughData: ['platformtype']
    });
};

const handleGunsInsertedFireEvent = (eventData) => {
    emit('openCharge', eventData);
};

const handleChargingFireEvent = (eventData) => {
    emit('closeCharge', eventData);
};

watch(
    () => [props.stateType, props.pileData, props.infoSet, props.isDetail, props.isShow],
    refreshPile,
    { deep: true, immediate: true }
);

onMounted(() => {
    window.addPCStyle();
});
</script>

<style scoped>
.uc-terminal-card {
    width: 100%;
}

.uc-terminal-card--guns-inserted {
    position: relative;
}

.uc-terminal-card__float-link {
    cursor: pointer;
    position: absolute;
    right: 14px;
    top: 36px;
    font-size: 12px;
    color: var(--t-color);
}

@media screen and (max-width: 767px) {
    .uc-terminal-card__pile {
        width: 100%;
    }
}

@media screen and (min-width: 768px) {
    .uc-terminal-card__pile {
        width: 309px;
    }
}
</style>
