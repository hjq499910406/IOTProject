<template>
    <div class="tr-div-default monitorDiv" style="min-height: calc(100vh - 206px);">
        <div class="pv-list-header">
            <t-label style='opacity:100%' class='lockTitle tr-lable-keyindicatorsname' instanceCode='lockTitle'
                valueType='static' :showHint='true' constValue='设备列表'>
            </t-label>
            <i class="fas icon-t-refresh pv-refresh-icon"
               @click="sendToParentRefresh">
            </i>
        </div>
        <div class='lockTable  fasr_div_lock' :tabIndex='-1'
            instanceCode='lockTable'>
            <div class="deviceCardNew" v-for="(item, index) in energyList">
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
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path
                                d="M20 18.5334C19.9998 18.7263 19.9676 18.9173 19.9051 19.0954C19.8426 19.2736 19.7511 19.4354 19.6359 19.5716C19.5206 19.7078 19.3838 19.8157 19.2333 19.8892C19.0828 19.9627 18.9216 20.0003 18.7589 19.9999H1.25008C0.92155 20.0035 0.605291 19.8522 0.370862 19.5794C0.136432 19.3065 0.00303174 18.9345 0 18.5451L0 4.3928C0.0001256 4.19998 0.0322978 4.00908 0.0946791 3.831C0.15706 3.65293 0.248429 3.49116 0.363566 3.35493C0.478703 3.21871 0.615353 3.11071 0.765711 3.0371C0.91607 2.96348 1.07719 2.92569 1.23987 2.92589H2.49984V0.740641C2.50126 0.54447 2.56773 0.356834 2.68488 0.218257C2.80204 0.0796795 2.96048 0.00128341 3.126 0L6.87464 0C7.03996 0.00158104 7.19812 0.0801202 7.31502 0.218676C7.43192 0.357232 7.49819 0.544699 7.49952 0.740641V2.94063H12.4992V0.740641C12.5006 0.54473 12.5669 0.357319 12.6838 0.218784C12.8007 0.0802488 12.9588 0.00167834 13.1241 0L16.874 0C17.0393 0.00148358 17.1976 0.0799915 17.3145 0.218568C17.4314 0.357145 17.4976 0.544669 17.4989 0.740641V2.94063H18.749C18.9117 2.93874 19.0732 2.97487 19.2242 3.04697C19.3751 3.11906 19.5126 3.22571 19.6288 3.36081C19.745 3.49592 19.8376 3.65683 19.9013 3.83436C19.9649 4.01188 19.9985 4.20255 20 4.39545V18.5353V18.5334ZM16.8839 9.71112H15.749V8.37767C15.7531 8.17068 15.6877 7.9702 15.5673 7.82023C15.4469 7.67025 15.2812 7.58302 15.1065 7.57767C14.9337 7.58056 14.7688 7.66471 14.6483 7.81161C14.5278 7.95851 14.4614 8.15614 14.4638 8.36103V9.71112H13.3241C13.1494 9.7047 12.9797 9.78073 12.8522 9.9225C12.7248 10.0643 12.65 10.2602 12.6443 10.4673C12.6494 10.6718 12.7229 10.8656 12.8485 11.006C12.9741 11.1464 13.1416 11.2218 13.3142 11.2158H14.4625V12.5482C14.4585 12.7551 14.5238 12.9555 14.6443 13.1055C14.7647 13.2555 14.9303 13.3427 15.1049 13.3482C15.2778 13.3453 15.4427 13.2611 15.5633 13.1143C15.6839 12.9674 15.7503 12.7697 15.748 12.5648V11.2147H16.8845C17.0582 11.2216 17.2272 11.1468 17.3546 11.0066C17.482 10.8665 17.5575 10.6723 17.5646 10.4665C17.5566 10.2603 17.481 10.0658 17.3539 9.92473C17.2267 9.78361 17.0581 9.70696 16.8839 9.71112ZM6.73652 9.71112H3.17416C3.00041 9.70653 2.83214 9.78336 2.70588 9.92493C2.57963 10.0665 2.50559 10.2614 2.49984 10.4673C2.50493 10.6718 2.57835 10.8656 2.70397 11.006C2.8296 11.1464 2.99712 11.2218 3.1697 11.2158H6.74226C6.91592 11.2226 7.08479 11.1478 7.21211 11.0076C7.33942 10.8675 7.41487 10.6734 7.42201 10.4676C7.41381 10.2604 7.33748 10.0652 7.20937 9.92378C7.08125 9.78239 6.91153 9.70605 6.73652 9.71112Z"
                                fill="currentColor" />
                        </svg>

                    </div>
                    <div style="width: calc(100% - 56px);">
                        <div class="deviceCardStateStamp" style="min-height: 19px;">
                            <lock-Img :pvOrEnergyMonitorState="item.StateName"></lock-Img>
                            <span @click.stop="openDetail(item)" class="detail-icon" title="查看详情">
                                详情
                                <t-icon style='opacity:100%' class='lockIcon tr-icon-default' instanceCode='lockIcon'
                                    size='12px' name='fas dx-icon icon-t-arrow-right-thin'>
                                </t-icon>
                            </span>
                        </div>

                        <div class="deviceCardTimeStamp">实时{{ powerModeLabel(item) }}功率: {{ formatNumber(item?.CurModule?.DevicePropertys?.p, { digits: 1 }) }}kW
                        </div>
                            <div class="deviceCardTimeStamp">
                                今日充电量: {{ formatNumber(item?.CurModule?.DevicePropertys?.TodayChargeEnergy, { digits: 3 }) }}kWh
                            </div>
                            <div  class="deviceCardTimeStamp">
                                今日放电量: {{ formatNumber(item?.CurModule?.DevicePropertys?.TodayDischargeEnergy, { digits: 3 }) }}kWh
                            </div>
                       
                        <div class="deviceCardTimeStamp">更新时间
                            : {{ item.LastUpdateDateTime || '--' }}</div>
                    </div>
                </div>
                <div class="deviceBtn" style="justify-content: end;">
                    <span @click.stop="jumpLogPage(item)" style="cursor: pointer;color: var(--t-color);margin-right: auto;align-self: center;margin-left: 4px;" title="查看报文">报文</span>
                    <t-button class='tr-button-default' label='策略设置' :showHint='true'
                        @click="openStrategySettings(item)" v-show="(item.NetState == 1 && item.NetStateName != '故障')">
                    </t-button>
                    <t-button class='fasr_button_viceColor tr-button-default' label='启动' :showHint='true'
                        @click="changEnergyState(item, 1)" :loading="isEnergyActionLoading(item, 1)"
                        v-show="!IsWorkIng(item) && (item.NetState == 1 && item.NetStateName != '故障')">
                    </t-button>
                    <t-button class='fasr_button_upLock tr-button-default' label="停止"
                        :showHint='true' @click="changEnergyState(item, 2)" :loading="isEnergyActionLoading(item, 2)"
                        v-show="IsWorkIng(item) && (item.NetState == 1 && item.NetStateName != '故障')">
                    </t-button>
                </div>
            </div>

            <div v-if="energyList.length == 0" style="text-align: center;margin: 20px 0px;width: 100%;">无记录</div>
        </div>
        <detail-drawer v-model="energyDataVisible" :items="detailItems" @close="closeDetail">
            <template #title>
                <span class="statetext"
                    :class="{ online: isOnline, offline: isOffline, unknown: !isOnline && !isOffline }">
                    {{ currentDetail?.NetStateName || '未知' }}
                </span>
                <span class="device-name">{{ currentDetail?.DeviceName || '未知设备' }}</span>
            </template>
        </detail-drawer>
    </div>
</template>

<script setup>
import { ref, onBeforeMount, onMounted, computed, onUnmounted, watch, defineEmits, reactive } from 'vue';
import LockImg from './lockIMG.vue';
import DetailDrawer from './DetailDrawer.vue';
const props = defineProps({
  energyDataValue: {
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
const energyList = ref([]);
watch(
  () => props.energyDataValue,
  (newVal) => {
    energyList.value = newVal || [];
  },
  { immediate: true } // 如果希望组件挂载时也执行一次
);

const Funcs = window.Funcs;

const energyDataVisible = ref(false);
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


const openDetail = (item) => {
  currentDetail.value = item;
  energyDataVisible.value = true;
  isOnline.value = item.NetStateName === '在线';
  isOffline.value = item.NetStateName === '离线';
};
const closeDetail = () => {
  energyDataVisible.value = false;
  currentDetail.value = null;
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
  if (!allowZero && num === 0) {
    return digits !== null ? (0).toFixed(digits) : 0;
  }

  return digits !== null ? num.toFixed(digits) : num;
};

const detailItems = computed(() => {
  const detail = currentDetail.value || { CurModule: { DevicePropertys: {}, PlatformPropertys: {} } };
  const Device = detail?.CurModule?.DevicePropertys || {};
  const Platform = detail?.CurModule?.PlatformPropertys || {};
  const i = Math.abs(Number(Device.i));
  const p = Math.abs(Number(Device.p));
  const u = Math.abs(Number(Device.u));
  const capacity = Number(Platform.capacity);
  const TodayChargeEnergy = Number(Device.TodayChargeEnergy);
  const CumulativeChargeEnergy = Number(Device.CumulativeChargeEnergy);
  const TodayDischargeEnergy = Number(Device.TodayDischargeEnergy);
  const CumulativeDischargeEnergy = Number(Device.CumulativeDischargeEnergy);
  const format = (val, unit, precision = 2) =>
    (Number.isFinite(val) ? `${ val.toFixed(precision) }${ unit }` : '--');

  const formatCombinedEnergy = (todayVal, cumulativeVal, unit) => {
    const formattedToday = Number.isFinite(todayVal) ? todayVal.toFixed(3) : '';
    const formattedCumulative = Number.isFinite(cumulativeVal) ? cumulativeVal.toFixed(3) : '';

    if (formattedToday && formattedCumulative) {
      return `${ formattedToday }/${ formattedCumulative }${ unit }`;
    }
    else if (formattedToday) {
      return `${ formattedToday }${ unit }`;
    }
    else if (formattedCumulative) {
      return `--/${ formattedCumulative }${ unit }`;
    }
    else {
      return '--';
    }
  };

  return [
    { label: '实时' + powerModeLabel(detail) + '功率', value: format(p, 'kW', 1) },
    { label: '实时' + powerModeLabel(detail) + '电流', value: format(i, 'A', 1) },
    { label: '实时' + powerModeLabel(detail) + '电压', value: format(u, 'V', 1) },
    { label: '电池容量', value: format(capacity, 'kWh', 3) },
    { label: '今日/累计充电量', value: formatCombinedEnergy(TodayChargeEnergy, CumulativeChargeEnergy, 'kWh') },
    { label: '今日/累计放电量', value: formatCombinedEnergy(TodayDischargeEnergy, CumulativeDischargeEnergy, 'kWh') },
    { label: '更新时间', value: detail.LastUpdateDateTime || '--' }
  ];
});

const openStrategySettings = (device) => {
  if (!device) return;
  const appCode = import.meta.env.VITE_APP_CODE;
  const platform = device?.CurModule?.PlatformPropertys || {};
  const strategyPayload = {
    StaId: props.stationID || '',
    DeviceId: device.DeviceId || '',
    ProductKey: device.ProductKey || '',
    DeviceKey: device.DeviceKey || '',
    opt_max_p_out: Number(platform.opt_max_p_out) || 0,
    opt_max_p_in: Number(platform.opt_max_p_in) || 0
  };
  sessionStorage.setItem('strategy_settings_params', JSON.stringify(strategyPayload));
  Funcs.OpenFasPage({
    fasAppKey: appCode,
    pageMetaId: 'StrategySettings',
    param: {

    },
    target: 'inline',
    callback: function (res) {

    },
    passThroughData: [ 'platformtype' ],
  });


};

const IsWorkIng = (item) => {
  const Device = item?.CurModule?.DevicePropertys || {};
  return Device.work_status == 1;
};

const showPowerInfo = (item) => {
  if (!item) return false;
  if (item.NetState !== 1) return false;
  return item.StateName === '充电中' || item.StateName === '放电中';
};

const powerModeLabel = (item) => {
  if (!item) return '';
  if (item.StateName === '充电中') {
    return '充电';
  }
  if (item.StateName === '放电中') {
    return '放电';
  }
  return '';
  return item.StateName === '充电中' ? '充电' : '放电';
};



const energyActionLoading = reactive({});
const getEnergyActionKey = (device, actionType) => `${ device?.DeviceKey ?? '' }_${ actionType }`;
const isEnergyActionLoading = (device, actionType) => !!energyActionLoading[ getEnergyActionKey(device, actionType) ];
const setEnergyActionLoading = (device, actionType, value) => {
  energyActionLoading[ getEnergyActionKey(device, actionType) ] = value;
};

const changEnergyState = async (device, actionType) => {
  if (device.NetState != 1) {
    Funcs.Notify('提示', '当储能状态为在线时才允许进行操作！', 'error');
    return;
  }

  const actionText = actionType == 1 ? '启动' : '停止';
  Funcs.Confirm('提示', `您确认要执行${ actionText }操作吗？`, () => {
    setEnergyActionLoading(device, actionType, true);
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
        Funcs.Notify('提示', result.data.OutputParams[ 0 ].Message, 'error');
        return;
      }
      if (result.data && result.data.Code && result.data.Code == 200) {
        Funcs.Notify('提示', '下发成功', 'success');
        sendToParentRefresh();
      }
    }).catch((error) => {
      Funcs.Notify('提示', `储能设备${ actionText }失败`, 'error');
    }).finally(() => {
      setEnergyActionLoading(device, actionType, false);
    });
  });
};

const jumpLogPage = (device) => {
  const flag = !window.isSaaSEnvironment;
  if(flag){
    window.open(`${ window.TeldWebConfig.ResourceURL.replace('resource','fas') }/gencode/dms/Page_LogListStandard?InParam_Tab=${ 0 }&InParam_DeviceInfo=${ device.DeviceKey }&InParam_StaID=${ props.stationID }&InParam_StaName=${ props.stationName }&opertype=1`);
  }
  else{
    Funcs.OpenFasPage({
      fasAppKey: 'dms',
      pageMetaId: 'Page_LogListStandard',
      param: {
        InParam_Tab: 1,
        InParam_DeviceInfo: device.DeviceKey,
        InParam_DeviceKey: device.DeviceKey,
        InParam_StaID: props.stationID,
        InParam_StaName: props.stationName,
        ShowHeader :true
      },
      target: 'inline',
      callback: function (res) {

      },
      passThroughData: [ 'platformtype' ],
    });
  }
};


const emit = defineEmits([ 'energyListEvent' ]);
const sendToParentRefresh = () => {
  emit('energyListEvent');
};

</script>
<style scoped>
.deviceCardNew {
    width: 329px;
    padding: 16px;
    border-radius: 8px;
    border: 1px solid #DFE0E2;
    display: flex;
    flex-direction: column;
        height: auto;
}

.deviceCardTitleRow {
    display: flex;
    align-items: center;
    gap: 4px;
    min-height: 20px;
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
    min-height: 20px;
}

.deviceBtn {
    margin-top: 12px;
}

.pv-list-header {
    display: flex;
    align-items: center;
}

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

.pv-refresh-icon {
    display: none;
}

@media screen and (max-width: 767px) {
    .pv-list-header {
        width: 100%;
        justify-content: space-between;
        margin-bottom: 12px;
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
