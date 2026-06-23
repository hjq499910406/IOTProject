<template>
<div class='UC_FreeTerminal' v-show='mappingProps.visible' >
  <fasr_freePile_code
    :ref='el=>Widget["fasr_freePile"]=el'
    style='opacity:100%'
    class='fasr_freePile'
  instanceCode='fasr_freePile'
  :tabIndex='1'
  :localVars='LocalVars'  >
  </fasr_freePile_code>
</div>
</template>

<script setup lang="ts">
import { ref, onBeforeMount, onMounted, computed, onUnmounted, reactive, nextTick, watch, provide, toRef, toRefs } from 'vue';
import { DataQueryClass } from '../../models/DataQueryClass';
import { DataQueryClassAsync } from '../../models/DataQueryClassAsync';
import { ActionClass } from '../../models/ActionClass';
import { ActionClassAsync } from '../../models/ActionClassAsync';
const Funcs = window.Funcs;

import fasr_freePile_code from '../../component/fasr_freePile.vue';
const fireUCEvent =  defineEmits([ 'OnLoaded' ]);
const Widget =  {
  fasr_freePile : null,
  FireUCEvent : fireUCEvent,
};
const PageCode = ref('UC_FreeTerminal');
const PageID = ref('b1bb3214-623e-428e-823e-4f4f79c38d18');
const PageName = ref('空闲终端');
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
    LastChargeTime:null
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
      LocalVars.pile.ChargingName = LocalVars.PileData.IfFastCharging == '1' ? '快充' : '慢充';
      LocalVars.pile.BillCode = LocalVars.PileData.BillCode;
      LocalVars.pile.PileCode = LocalVars.PileData.PileCode;
      LocalVars.pile.LastChargeTime = LocalVars.PileData.LastChargeTime;
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
const { fasr_freePile } = toRefs(reactive(Widget));
defineExpose({
  fasr_freePile,
  refresh : CtrlMethod[ 'refresh' ],
  LocalVars,
  visible: mappingExpose.visible,
});
</script>

<style>
@media screen and (max-width: 767px) {
  .fasr_freePile {
    width: 100%;
   }
}
@media screen and (min-width: 768px) {
  .fasr_freePile {
    width: 309px;
   }
}
</style>

