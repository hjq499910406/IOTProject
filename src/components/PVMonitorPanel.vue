<template>
    <div class="tr-div-default monitorDiv"
         style="min-height: calc(100vh - 210px);">
        <div class="pv-list-header">
            <t-label style='opacity:100%'
                     class='lockTitle tr-lable-keyindicatorsname'
                     instanceCode='lockTitle'
                     valueType='static'
                     :showHint='true'
                     :tabIndex='1'
                     constValue='设备列表'>
            </t-label>
            <i class="fas icon-t-refresh pv-refresh-icon"
               @click="sendToParentRefresh">
            </i>
        </div>
        <div style='    outline:0!important;'
             class='lockTable  fasr_div_lock'
             :tabIndex='-1'
             instanceCode='lockTable'>
            <div class="deviceCardNew"
                 v-for="(item, index) in pvList">
                <!-- 标题行：设备名称 + 状态 -->
                <div class="deviceCardTitleRow">
                    <div class="deviceCardStatusCircle"
                         :class="item.NetStateName == '在线' ? 'greenColorBg' : item.NetStateName == '故障' ? 'redColorBg' : 'grayColorBg'">
                        {{ item.NetStateName }}</div>
                    <span class="deviceCardTitleTextLock">{{ item.DeviceName }}</span>

                </div>
                <!-- 上侧内容区域 -->
                <div class="deviceCardContentNew">
                    <!-- 左侧圆形状态指示 -->
                    <div class="status"
                         :class="item.NetStateName == '在线' ? 'greenColorBg' : item.NetStateName == '故障' ? 'redColorBg' : 'grayColorBg'">
                        <svg xmlns="http://www.w3.org/2000/svg"
                             width="24"
                             height="24"
                             viewBox="0 0 24 24"
                             fill="none">
                            <path d="M12.192 5.45996L12.216 7.23596H15.456L15.12 5.45996H12.192ZM19.332 7.23596L18.624 5.45996H15.696L16.104 7.23596H19.332ZM20.412 9.93596L19.5 7.65596H16.188L16.704 9.93596H20.412ZM16.656 13.56L16.068 10.488H12.276L12.324 13.56H16.656ZM15.972 9.93596L15.528 7.65596H12.228L12.264 9.93596H15.972ZM7.69201 7.23596L8.08801 5.45996H5.52001L5.17201 5.47196L5.04001 5.77196L4.45201 7.23596H7.69201ZM11.604 5.45996H8.67601L8.34001 7.23596H11.568L11.604 5.45996ZM11.568 7.65596H8.25601L7.82401 9.93596H11.52L11.568 7.65596ZM11.52 10.488H7.71601L7.12801 13.56H11.46L11.52 10.488ZM7.59601 7.65596H4.28401L3.38401 9.93596H7.08001L7.59601 7.65596ZM1.93201 13.56H6.26401L6.96001 10.488H3.15601L1.93201 13.56ZM21.852 13.56L20.628 10.488H16.836L17.52 13.56H21.852ZM14.148 21.18H9.79201L10.572 13.56H13.368L14.148 21.18Z"
                                  fill="currentColor" />
                            <path d="M22.716 13.248L19.212 5.74797C19.08 5.45997 18.552 5.21997 18.036 5.21997H5.89199C5.37599 5.21997 4.85999 5.44797 4.71599 5.74797L1.21199 13.248C0.899992 13.92 1.29599 14.508 2.12399 14.508H21.78C22.632 14.496 23.028 13.92 22.716 13.248ZM17.676 13.212H2.30399L3.32399 10.776L3.31199 10.764L5.44799 5.72397L18.492 5.67597L20.484 10.416L20.472 10.428L21.648 13.212H17.676Z"
                                  fill="currentColor" />
                        </svg>
                    </div>
                    <div style="width: calc(100% - 56px);">
                        <div class="deviceCardStateStamp"
                             style="min-height: 19px;">
                            <lock-Img :pvOrEnergyMonitorState="item.StateName"></lock-Img>
                            <span @click.stop="openDetail(item)"
                                  class="detail-icon"
                                  title="查看详情">
                                详情
                                <t-icon style='opacity:100%'
                                        class='lockIcon tr-icon-default'
                                        instanceCode='lockIcon'
                                        size='12px'
                                        :tabIndex='1'
                                        name='fas dx-icon icon-t-arrow-right-thin'>
                                </t-icon>
                            </span>
                        </div>

                        <div class="deviceCardTimeStamp">限制功率
                            : {{ item.CurModule.DevicePropertys?.limit_p || '--' }}kW</div>
                        <div class="deviceCardTimeStamp">
                            实时发电功率: {{ formatNumber(item?.CurModule?.DevicePropertys?.p, { digits: 1 }) }}kW
                        </div>
                        <div class="deviceCardTimeStamp">
                            今日发电量: {{ formatNumber(item?.CurModule?.DevicePropertys?.TodayCharge, { digits: 3 }) }}kWh
                        </div>
                        <div class="deviceCardTimeStamp">更新时间
                            : {{ item.LastUpdateDateTime || '--' }}</div>
                    </div>
                </div>
                <div class="deviceBtn"
                     style="justify-content: end;">
                    <span @click.stop="jumpLogPage(item)"
                          style="cursor: pointer;color: var(--t-color);margin-right: auto;align-self: center;margin-left: 4px;"
                          title="查看报文">报文</span>
                    <t-button class='tr-button-default'
                              label='功率限制'
                              :showHint='true'
                              :tabIndex='1'
                              @click="changePVSet(item)"
                              :loading="isPVActionLoading(item, 'limit')"
                              v-show="(item.NetState == 1 && item.NetStateName != '故障')">
                    </t-button>
                    <t-button class='fasr_button_viceColor tr-button-default'
                              label='启动发电'
                              :showHint='true'
                              @click="changePVState(item, 1)"
                              :loading="isPVActionLoading(item, 1)"
                              v-show="!IsWorkIng(item) && (item.NetState == 1 && item.NetStateName != '故障')">
                    </t-button>
                    <t-button class='fasr_button_upLock tr-button-default'
                              label='停止发电'
                              :showHint='true'
                              :tabIndex='1'
                              @click="changePVState(item, 2)"
                              :loading="isPVActionLoading(item, 2)"
                              v-show="IsWorkIng(item) && (item.NetState == 1 && item.NetStateName != '故障')">
                    </t-button>
                </div>
            </div>
            <div v-if="pvList.length == 0"
                 style="text-align: center;margin: 20px 0px;width: 100%;">无记录</div>
        </div>
        <detail-drawer v-model="pvDataVisible"
                       :items="detailItems"
                       @close="closeDetail"
                       :showRealtimeChart="true"
                       :realtimeDeviceId="realtimeDeviceId"
                       :realtimeMaxPower="realtimeMaxPower">
            <template #title>
                <span class="statetext"
                      :class="{ online: isOnline, offline: isOffline, unknown: !isOnline && !isOffline }">
                    {{ currentDetail?.NetStateName || '未知' }}
                </span>
                <span class="device-name">{{ currentDetail?.DeviceName || '未知设备' }}</span>
            </template>
        </detail-drawer>
        <power-limitation v-model="pvSetVisible"
                          :maxValue="power"
                          :value="limit_p"
                          @confirm="setPVLimit"
                          @cancel="closePVSet"></power-limitation>
    </div>
</template>

<script setup>
import { ref, onBeforeMount, onMounted, computed, onUnmounted, watch, defineEmits, reactive } from 'vue';
import LockImg from './lockIMG.vue';
import DetailDrawer from './DetailDrawer.vue';
import PowerLimitation from './PowerLimitation.vue';
const props = defineProps({
  pvDataValue: {
    type: Array,
    required: true
  },
  TenantId: {
    type: String,
    required: true
  },
  stationName: {
    type: String,
    required: false
  },
  stationID: {
    type: String,
    required: false
  }
});
const pvList = ref([]);
watch(
  () => props.pvDataValue,
  (newVal) => {

    pvList.value = newVal || [];
  },
  { immediate: true } // 如果希望组件挂载时也执行一次
);
const Funcs = window.Funcs;

const pvDataVisible = ref(false);
const currentDetail = ref(null);
const isOnline = ref(false);
const isOffline = ref(false);



window.addPCStyle();


onBeforeMount(() => {
});
onMounted(async () => {

});
onUnmounted(async () => {

});
const IsWorkIng = (item) => {

  const Device = item?.CurModule?.DevicePropertys || {};
  return Device.work_status == 1;
};


const openDetail = (item) => {
  currentDetail.value = item;
  pvDataVisible.value = true;
  isOnline.value = item.NetStateName === '在线';
  isOffline.value = item.NetStateName === '离线';
};
const closeDetail = () => {
  pvDataVisible.value = false;
  currentDetail.value = null;
};
const format = (val, unit, precision = 2) =>
  (Number.isFinite(val) ? `${ val.toFixed(precision) }${ unit }` : '--');
const detailItems = computed(() => {
  const detail = currentDetail.value || {};
  const Device = detail?.CurModule?.DevicePropertys || {};
  const Platform = detail?.CurModule?.PlatformPropertys || {};
  const i = Number(Device.i);
  const p = Number(Device.p);
  const u = Number(Device.u);
  const powerLimit = Number(Device.limit_p);
  const TodayCharge = Number(Device.TodayCharge);
  const power = Number(Platform.power);
  const MaxDailyEnergy = Number(Device.MaxDailyEnergy);
  const CumulativeEnergy = Number(Device.CumulativeEnergy);



  return [
    { label: '实时发电功率', value: format(p, 'kW', 1) },
    { label: '实时发电电流', value: format(i, 'A', 1) },
    { label: '实时发电电压', value: format(u, 'V', 1) },
    { label: '额定功率', value: format(power, 'kW', 1) },
    { label: '限制功率', value: format(powerLimit, 'kW', 0) },
    { label: '历史日最大发电量', value: format(MaxDailyEnergy, 'kWh', 3) },
    { label: '今日发电量', value: format(TodayCharge, 'kWh', 3) },
    { label: '累计发电量', value: format(CumulativeEnergy, 'kWh', 3) },
    { label: '更新时间', value: detail?.LastUpdateDateTime || '--' }
  ];
});
const realtimeDeviceId = computed(() => {
  const detail = currentDetail.value || {};
  return detail?.DeviceId || detail?.DeviceID || detail?.Id || detail?.ID || '';
});
const realtimeMaxPower = computed(() => {
  const detail = currentDetail.value || {};
  const Platform = detail?.CurModule?.PlatformPropertys || {};
  const powerValue = Number(Platform.power);
  return Number.isFinite(powerValue) ? powerValue : 0;
});
const pvSetVisible = ref(false);
const closePVSet = () => {
  pvSetVisible.value = false;
  currentDetail.value = null;
};

const limit_p = ref(1);
const power = ref(0);
const changePVSet = async (device) => {
  if (device.NetState != 1) {
    Funcs.Notify('提示', '当光伏状态为在线时才允许进行操作！', 'error');
    return;
  }

  if (!device?.CurModule?.PlatformPropertys.hasOwnProperty('power')) {
    Funcs.Notify('提示', '未获取到当前光伏设备的额定功率属性！', 'error');
    return;
  }
  pvSetVisible.value = true;
  const Device = device?.CurModule?.DevicePropertys || {};
  const Platform = device?.CurModule?.PlatformPropertys || {};
  limit_p.value = Number(Device.limit_p);
  power.value = Number(Platform.power);
  currentDetail.value = device;
};

const setPVLimit = (value) => {
  const device = currentDetail.value;
  if (!device) return;
  setPVActionLoading(device, 'limit', true);
  const postData = {
    MsgId: Funcs.Guid(),
    TenantId: props.TenantId,
    DeviceKey: device.DeviceKey,
    ProductKey: device.ProductKey,
    Operator: Session?.UserId,
    OperatorName: Session?.UserName || Session?.Mobile,
    'WaitForResponse': false,
    Type: 2,
    'PropertyValues': [ { 'Name': 'limit_p', 'Value': value, 'DeviceModuleCode': device.CurModule.ModuleCode } ],
  };
  TFF.common.ajax.getDataAsync({
    url: TFF.common.ajax.getServiceUrl('IRouter-ThingSetProperty_External'),
    type: 'post',
    data: { request: JSON.stringify(postData) }
  }).then(async (result) => {
    if (result.state == 0) {
      Funcs.Notify('提示', `${ result.errmsg }`, 'error');
      return;
    }
    if (result.data && result.data.Code && result.data.Code != 200) {
      Funcs.Notify('提示', result.data.OutputParams[ 0 ].Value, 'error');
      return;
    }
    if (result.data && result.data.Code && result.data.Code == 200) {
      Funcs.Notify('提示', '下发成功', 'success');
      sendToParentRefresh();
    }
  }).catch((error) => {
    Funcs.Notify('提示', '功率限制设置失败', 'error');
  }).finally(() => {
    setPVActionLoading(device, 'limit', false);
  });
};
const formatNumber = (
  v,
  {
    digits = 3,      // 小数位
    allowZero = true // 是否允许 0（一般都 true）
  } = {}
) => {
  // 空值 → 0
  if (v === null || v === undefined || v === '') {
    return '--';
  }

  let num = Number(v);

  if (!isFinite(num)) {
    return digits !== null ? (0).toFixed(digits) : 0;
  }
  num = Math.abs(num);


  // 不允许 0（比如功率）
  if (!allowZero && num === 0) {
    return digits !== null ? (0).toFixed(digits) : 0;
  }

  return digits !== null ? num.toFixed(digits) : num;
};
const pvActionLoading = reactive({});
const getPVActionKey = (device, actionType) => `${ device?.DeviceKey ?? '' }_${ actionType }`;
const isPVActionLoading = (device, actionType) => !!pvActionLoading[ getPVActionKey(device, actionType) ];
const setPVActionLoading = (device, actionType, value) => {
  pvActionLoading[ getPVActionKey(device, actionType) ] = value;
};

const changePVState = async (device, actionType) => {
  if (device.NetState != 1) {
    Funcs.Notify('提示', '当光伏状态为在线时才允许进行操作！', 'error');
    return;
  }
  const actionText = actionType == 1 ? '启动' : '停止';
  Funcs.Confirm('提示', `您确认要执行${ actionText }操作吗？`, () => {
    setPVActionLoading(device, actionType, true);
    const postData = {
      MsgId: Funcs.Guid(),
      TenantId: props.TenantId,
      DeviceKey: device.DeviceKey,
      ProductKey: device.ProductKey,
      Operator: Session?.UserId,
      OperatorName: Session?.UserName || Session?.Mobile,
      'WaitForResponse': false,
      Type: 2,
      'PropertyValues': [ { 'Name': actionType == 1 ? 'on' : 'off', 'Value': 1, 'DeviceModuleCode': device.CurModule.ModuleCode } ],
    };
    TFF.common.ajax.getDataAsync({
      url: TFF.common.ajax.getServiceUrl('IRouter-ThingSetProperty_External'),
      type: 'post',
      data: { request: JSON.stringify(postData) }
    }).then(async (result) => {
      if (result.state == 0) {
        Funcs.Notify('提示', `${ result.errmsg }`, 'error');
        return;
      }
      if (result.data && result.data.Code && result.data.Code != 200) {
        Funcs.Notify('提示', result.data.Results[ 0 ].Message, 'error');
        return;
      }
      if (result.data && result.data.Code && result.data.Code == 200) {
        Funcs.Notify('提示', '下发成功', 'success');
        sendToParentRefresh();
      }
    }).catch((error) => {
      Funcs.Notify('提示', `光伏设备${ actionText }失败`, 'error');
    }).finally(() => {
      setPVActionLoading(device, actionType, false);
    });
  });
};


const emit = defineEmits([ 'pvListEvent' ]);
const sendToParentRefresh = () => {
  emit('pvListEvent');
};
const jumpLogPage = (device) => {
  const flag = !window.isSaaSEnvironment;
  if (flag) {
    window.open(`${ window.TeldWebConfig.ResourceURL.replace('resource', 'fas') }/gencode/dms/Page_LogListStandard?InParam_Tab=${ 0 }&InParam_DeviceInfo=${ device.DeviceKey }&InParam_StaID=${ props.stationID }&InParam_StaName=${ props.stationName }&opertype=1`);
  }
  else {
    Funcs.OpenFasPage({
      fasAppKey: 'dms',
      pageMetaId: 'Page_LogListStandard',
      param: {
        InParam_Tab: 1,
        InParam_DeviceInfo: device.DeviceKey,
        InParam_DeviceKey: device.DeviceKey,
        InParam_StaID: props.stationID,
        InParam_StaName: props.stationName,
        ShowHeader: true
      },
      target: 'inline',
      callback: function (res) {

      },
      passThroughData: [ 'platformtype' ],
    });
  }
};

</script>
<style scoped>
.monitorDiv {
    height: calc(100vh - 206px);
    max-height: calc(100vh - 206px);
    display: flex;
    flex-direction: column;
}

.lockTable {
    min-height: 0;
    max-height: calc(100vh - 260px);
    overflow-x: hidden;
}
.deviceCardNew {
  width: 329px;
  padding: 16px;
  border-radius: 8px;
  border: 1px solid #dfe0e2;
  display: flex;
  flex-direction: column;
  height: auto;
}

.fasr_div_lock {
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
  gap: 16px;
}

.deviceCardTitleRow {
  display: flex;
  align-items: center;
  gap: 4px;
}

.deviceCardTitleTextLock {
  margin-right: 0px;
  flex: 1;
  min-width: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 20px;
}

.deviceCardStatusCircle {
  border-radius: 4px;
  padding: 2px 4px;
  font-size: 12px;
}

.deviceCardContentNew .status {
  display: flex;
  width: 48px;
  height: 48px;
  padding: 9px;
  justify-content: center;
  align-items: center;
  border-radius: 21px;
}

.deviceCardContentNew {
  flex: 0 1 auto;
}

.deviceCardStateStamp {
  position: relative;
}

.deviceCardStateStamp .detail-icon {
  position: absolute;
  right: 2px;
  font-size: 12px;
  color: var(--t-color);
}

.deviceCardStateStamp .detail-icon .q-icon {
  position: relative;
  font-size: 10px !important;
  bottom: 1px;
}

.deviceCardTimeStamp {
  color: rgba(0, 0, 0, 0.56);
  line-height: 20px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.deviceBtn {
  margin-top: 12px;
}

.pv-list-header {
  display: flex;
  align-items: center;
  @media screen and (max-width: 767px) {
    margin-bottom: 12px;
  }
}

.pv-refresh-icon {
  display: none;
}

@media screen and (max-width: 767px) {
  .pv-list-header {
    width: 100%;
    justify-content: space-between;
  }

  .pv-refresh-icon {
    display: inline-flex;
    color: rgba(0, 0, 0, 0.56);
    font-size: 16px;
    cursor: pointer;
    line-height: 1;
  }
}
</style>
