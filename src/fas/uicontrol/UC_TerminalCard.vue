<template>
    <div v-show="visible" class="uc-terminal-card" :class="terminalCardClass">
        <fasr_faultyPile_code v-if="stateType === 'faulty'" class="uc-terminal-card__pile fasr_faultyPile" :tabIndex="1"
            :localVars="localVars" />
        <fasr_offGridPile_code v-else-if="stateType === 'offGrid'" class="uc-terminal-card__pile fasr_offGridPile"
            :tabIndex="1" :localVars="localVars" />
        <template v-else-if="stateType === 'gunsInserted'">
            <fasr_gunsInsertedPile_code class="uc-terminal-card__pile fasr_gunsInsertedPile" :tabIndex="1"
                :localVars="localVars" @OnFireEvent="handleGunsInsertedFireEvent" />
            <span class="uc-terminal-card__float-link" @click="handleMsgClick">报文</span>
        </template>
        <fasr_chargingPile_code v-else-if="stateType === 'charging'" class="uc-terminal-card__pile fasr_chargingPile"
            :tabIndex="1" :localVars="localVars" @OnFireEvent="handleChargingFireEvent" />
        <fasr_chargeFullPile_code v-else-if="stateType === 'chargeFull'"
            class="uc-terminal-card__pile fasr_chargeFullPile" :tabIndex="1" :localVars="localVars" />
        <fasr_freePile_code v-else-if="stateType === 'free'" class="uc-terminal-card__pile fasr_freePile"
            :tabIndex="1" :localVars="localVars" variant="free" />
        <fasr_freePile_code v-else class="uc-terminal-card__pile fasr_otherPile" :tabIndex="1"
            :localVars="localVars" variant="other" />
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, watch } from 'vue';
import fasr_faultyPile_code from '../component/fasr_faultyPile.vue';
import fasr_offGridPile_code from '../component/fasr_offGridPile.vue';
import fasr_gunsInsertedPile_code from '../component/fasr_gunsInsertedPile.vue';
import fasr_chargingPile_code from '../component/fasr_chargingPile.vue';
import fasr_chargeFullPile_code from '../component/fasr_chargeFullPile.vue';
import fasr_freePile_code from '../component/fasr_freePile.vue';

const Funcs = window.Funcs;

type TerminalStateType =
    | 'faulty'
    | 'offGrid'
    | 'gunsInserted'
    | 'charging'
    | 'chargeFull'
    | 'free'
    | 'other';

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

const createDefaultInfoSet = () => ({
    one: false,
    two: false,
    three: false,
    oneOld: false,
    twoOld: false,
    threeOld: false
});

const props = defineProps({
    stateType: {
        type: String as () => TerminalStateType,
        required: true
    },
    infoSet: {
        type: Object,
        default: () => createDefaultInfoSet()
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
        default: () => createDefaultPile()
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

const getChargingName = (pileData: any) => {
    if (pileData.IsSuperCharging == '1') return '超充';
    return pileData.IfFastCharging == '1' ? '快充' : '慢充';
};

const getFastChargingName = (pileData: any) => {
    return pileData.IfFastCharging == '1' ? '快充' : '慢充';
};

const getCustomerTypeLabel = (customerType: any) => {
    if (customerType == '1') return '个人客户';
    if (customerType == 2) return '企业客户';
    return customerType;
};

const appendUnit = (value: any, unit: string, fallback = '--') => {
    return [undefined, null, ''].includes(value) ? fallback : `${value}${unit}`;
};

const appendMoneyUnit = (value: any, fallback = '--') => {
    return [undefined, null, ''].includes(value) ? fallback : `¥${value}`;
};

const assignBasePileFields = (pileData: any) => {
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

const applyFaultyPile = (pileData: any) => {
    assignBasePileFields(pileData);
    Object.assign(localVars.pile, {
        ChargingName: getFastChargingName(pileData),
        FaultRate: pileData.FaultRate || '无',
        FaultReason: pileData.FaultReason || '无',
        FaultRemoveAdvice: pileData.FaultRemoveAdvice || '无'
    });
};

const applyOffGridPile = (pileData: any) => {
    assignBasePileFields(pileData);
    Object.assign(localVars.pile, {
        ChargingName: getFastChargingName(pileData),
        OffRate: pileData.OffRate || '无',
        FaultReason: pileData.OffTime,
        OffLength: pileData.OffLength || '无',
        OffTime: pileData.OffTime || '无'
    });
};

const applyChargeVehicleFields = (pileData: any) => {
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

const applyGunsInsertedPile = (pileData: any) => {
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

const applyChargingPile = (pileData: any) => {
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

const applyChargeFullPile = (pileData: any) => {
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

const applyFreePile = (pileData: any) => {
    assignBasePileFields(pileData);
    Object.assign(localVars.pile, {
        ChargingName: getFastChargingName(pileData),
        LastChargeTime: pileData.LastChargeTime
    });
};

const applyOtherPile = (pileData: any) => {
    assignBasePileFields(pileData);
    Object.assign(localVars.pile, {
        ChargingName: getFastChargingName(pileData),
        LastChargeTime: pileData.LastChargeTime
    });
};

const pileStateMappers: Record<TerminalStateType, (pileData: any) => void> = {
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
    const pileData: any = props.pileData || {};
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

const handleGunsInsertedFireEvent = (eventData: any) => {
    emit('openCharge', eventData);
};

const handleChargingFireEvent = (eventData: any) => {
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
