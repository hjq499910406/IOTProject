<template>
<div class='UC_ChargeFullTerminal' v-show='mappingProps.visible' >
  <fasr_chargeFullPile_code
    :ref='el=>Widget["fasr_chargeFullPile"]=el'
    style='opacity:100%'
    class='fasr_chargeFullPile'
  instanceCode='fasr_chargeFullPile'
  :tabIndex='1'
  :localVars='LocalVars'  >
  </fasr_chargeFullPile_code>
</div>
</template>

<script setup lang="ts">
import { ref, onBeforeMount, onMounted, computed, onUnmounted, reactive, nextTick, watch, provide, toRef, toRefs } from 'vue';
import { DataQueryClass } from '../../models/DataQueryClass';
import { DataQueryClassAsync } from '../../models/DataQueryClassAsync';
import { ActionClass } from '../../models/ActionClass';
import { ActionClassAsync } from '../../models/ActionClassAsync';
const Funcs = window.Funcs;

import fasr_chargeFullPile_code from '../../component/fasr_chargeFullPile.vue';
const fireUCEvent =  defineEmits([ 'OnLoaded' ]);
const Widget =  {
  fasr_chargeFullPile : null,
  FireUCEvent : fireUCEvent,
};
const PageCode = ref('UC_ChargeFullTerminal');
const PageID = ref('233ed4fa-7cdd-4765-96c0-2e1655505a5a');
const PageName = ref('已充满终端');
const DataQuery = new DataQueryClass();
DataQuery.Promise = new DataQueryClassAsync();
const Action = new ActionClass();
Action.Promise = new ActionClassAsync();
window.addPCStyle();
interface LocalVariable {
   pile:Any,
   infoSet:String,
   isDetail:String,
   isShow:String,
   PileData:Any,
}
const props = defineProps({
  infoSet: { type: String, default: ({
    'one':false,
    'two':false,
    'three':false,
    'oneOld':false,
    'twoOld':false,
    'threeOld':false,
  }) },
  isDetail: { type: String, default: false },
  isShow: { type: String, default: false },
  PileData: { type: Object, default: ({
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
  }) },
  visible: { type: Boolean, default: true },
});
let routeParam = TFF.common.api.Url.getParams();
const skey = TFF.common.api.Url.getUrlQuery('skey');
if(skey) {
  routeParam  = JSON.parse(TFF.common.storage.LocalStorage.getItem(skey));
}
const LocalVars = reactive<LocalVariable>({
  pile:({
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
  }),
});
class CtrlMethods {
  refresh() {
    if (LocalVars.PileData) {
      LocalVars.pile.StaID = LocalVars.PileData.StaID;
      LocalVars.pile.StaName = LocalVars.PileData.StaName;
      LocalVars.pile.CtrlAddress = LocalVars.PileData.CtrlAddress;
      LocalVars.pile.CanSN = LocalVars.PileData.CanSN;
      LocalVars.pile.CustomerID = LocalVars.PileData.CustomerID;
      LocalVars.pile.PileID = LocalVars.PileData.PileID;

      LocalVars.pile.PileName = LocalVars.PileData.PileName;
      LocalVars.pile.ChargingName = LocalVars.PileData.IsSuperCharging == '1' ?'超充' : LocalVars.PileData.IfFastCharging == '1' ? '快充' : '慢充';
      LocalVars.pile.BillCode = LocalVars.PileData.BillCode;
      LocalVars.pile.OccupyTime = LocalVars.PileData.OccupyTime ? LocalVars.PileData.OccupyTime : '';//占位时长
      LocalVars.pile.CustomerPhone = LocalVars.PileData.CustomerName ? LocalVars.PileData.CustomerName : '--';//客户名称
      LocalVars.pile.CustomerClassification = LocalVars.PileData.CustomerClassification;//私家车
      LocalVars.pile.CustomerType = LocalVars.PileData.CustomerType == '1' ? '个人客户' : LocalVars.PileData.CustomerType == 2 ? '企业客户' : LocalVars.PileData.CustomerType;//个人客户
      LocalVars.pile.PileFullOfTime = '充满时间 ' + LocalVars.PileData.PileFullOfTime; //充满时间 
      LocalVars.pile.ChargingPower = [ undefined, null, '' ].includes(LocalVars.PileData.ChargingPower) ? '--' : LocalVars.PileData.ChargingPower + 'kWh';//充电度数
      LocalVars.pile.ChargingMoney = [ undefined, null, '' ].includes(LocalVars.PileData.ChargingMoney) ? '--' : '¥' + LocalVars.PileData.ChargingMoney;//充电费用
      LocalVars.pile.ChargingBeginTime = LocalVars.PileData.ChargingBeginTime ? LocalVars.PileData.ChargingBeginTime : '无';//充电开始时间
      LocalVars.pile.PileSOC = LocalVars.pile.PileSOC * 100 + '%';//充电进度
      LocalVars.pile.ChargingTime = LocalVars.PileData.ChargingTime ? LocalVars.PileData.ChargingTime : '--';//已充时长
      LocalVars.pile.PileCode = LocalVars.PileData.PileCode;

      LocalVars.pile.CarSeriesName = LocalVars.PileData.CarSeriesName ? LocalVars.PileData.CarSeriesName : '--';  //判定车系
      LocalVars.pile.CarNumber = LocalVars.PileData.CarNumber ? LocalVars.PileData.CarNumber : '--';  //车牌号
      LocalVars.pile.VIN = LocalVars.PileData.VIN ? LocalVars.PileData.VIN : '--'; //车架号
      LocalVars.pile.VehicleCode = LocalVars.PileData.VehicleCode ? LocalVars.PileData.VehicleCode : '--'; //车辆自编号
      LocalVars.pile.Route = LocalVars.PileData.Route ?LocalVars.PileData.Route : '--';  //路线
      LocalVars.pile.MaxTemperature = LocalVars.PileData.MaxTemperature ? LocalVars.PileData.MaxTemperature + '℃' : '--';  //电池最高温度
      LocalVars.pile.MinTemperature = LocalVars.PileData.MinTemperature ? LocalVars.PileData.MinTemperature + '℃' : '--'; //电池最低温度


      LocalVars.pile.GunInsertionTime = LocalVars.PileData.GunInsertionTime ? LocalVars.PileData.GunInsertionTime : '--'; //插枪时间
      LocalVars.pile.ChargeNames = LocalVars.PileData.ChargeNames ? LocalVars.PileData.ChargeNames : '--'; //启动方式
      LocalVars.pile.ChargeEnter = LocalVars.PileData.ChargeEnter ? LocalVars.PileData.ChargeEnter : '--';  //充电入口
      LocalVars.pile.InitSOC = LocalVars.PileData.InitSOC ? LocalVars.PileData.InitSOC + '%' : '--'; //初始SOC
      LocalVars.pile.EstimatedFillingTime = LocalVars.PileData.EstimatedFillingTime ? LocalVars.PileData.EstimatedFillingTime : '--'; //预计充满时间
      LocalVars.pile.ChargingLastTime  = LocalVars.PileData.ChargingLastTime  ? LocalVars.PileData.ChargingLastTime  : '--'; //预计剩余时间
      LocalVars.pile.ChargingEndTime = LocalVars.PileData.ChargingEndTime ? LocalVars.PileData.ChargingEndTime : '--';  //充电结束时间
      LocalVars.pile.ChargeMode = LocalVars.PileData.ChargeMode ? LocalVars.PileData.ChargeMode : '--'; //充电模式
      LocalVars.pile.ChargeStrategy = LocalVars.PileData.ChargeStrategy ? LocalVars.PileData.ChargeStrategy : '--'; //群充策略


      LocalVars.pile.AP = LocalVars.PileData.AP ? LocalVars.PileData.AP + 'A' : '--';  //实际电流
      LocalVars.pile.DP = LocalVars.PileData.DP ? LocalVars.PileData.DP + 'kWh' : '--'; //实际功率
      LocalVars.pile.AvgAP = LocalVars.PileData.AvgAP ? LocalVars.PileData.AvgAP + 'A' : '--'; //平均需求电流
      LocalVars.pile.AvgDP = LocalVars.PileData.AvgDP ? LocalVars.PileData.AvgDP + 'kWh' : '--';  //平均需求功率
      LocalVars.pile.MaxAP = LocalVars.PileData.MaxAP ? LocalVars.PileData.MaxAP + 'A' : '--'; //最大需求电流
      LocalVars.pile.MaxDP = LocalVars.PileData.MaxDP ? LocalVars.PileData.MaxDP + 'kWh' : '--'; //最大需求功率
      LocalVars.pile.ElectricRate = LocalVars.PileData.ElectricRate ? LocalVars.PileData.ElectricRate : '--';  //电流满足率
      LocalVars.pile.PowerRate = LocalVars.PileData.PowerRate ? LocalVars.PileData.PowerRate : '--';  //功率满足率
    }
  }
}
const CtrlMethod = new CtrlMethods();
async function Page_OnError(e) {
  Funcs.HandleError(e);
}
async function Portlet_PileData_OnChanged(e) {
  CtrlMethod.refresh();
}
async function Page_OnLoaded(e) {
  CtrlMethod.refresh();
}
LocalVars.infoSet = toRef(props, 'infoSet');
LocalVars.isDetail = toRef(props, 'isDetail');
LocalVars.isShow = toRef(props, 'isShow');
LocalVars.PileData = toRef(props, 'PileData');
watch(() => LocalVars.PileData, (newV,oldV) => {
  Portlet_PileData_OnChanged();
}, { deep: true });

onBeforeMount(()=>{
});
onMounted(async ()=>{
  Widget.Root = {
  };

  Widget.FireUCEvent('OnLoaded');
  await nextTick();
  Page_OnLoaded();
  TFF.core.monitor.error.onError(Page_OnError);
});
onUnmounted(async ()=>{
});
const mappingProps = reactive({ ...props });
const mappingExpose = toRefs(reactive({ ...props }));
watch(mappingExpose.visible, (newValue, oldValue) => mappingProps.visible = newValue);
watch(props.visible, (newValue, oldValue) => mappingProps.visible = newValue);
const { fasr_chargeFullPile } = toRefs(reactive(Widget));
defineExpose({
  fasr_chargeFullPile,
  refresh : CtrlMethod[ 'refresh' ],
  LocalVars,
  visible: mappingExpose.visible,
});
</script>

<style>
@media screen and (max-width: 767px) {
  .fasr_chargeFullPile {
    width: 100%;
   }
}
@media screen and (min-width: 768px) {
  .fasr_chargeFullPile {
    width: 309px;
   }
}
</style>

