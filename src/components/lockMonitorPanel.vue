<template>
  <div
    class="tr-div-default monitorDiv"
    style="min-height: calc(100vh - 206px);">
    <t-label
        style='opacity:100%'
        class='lockTitle tr-lable-keyindicatorsname'
        instanceCode='lockTitle'
        valueType='static'
        :showHint='true'
        :tabIndex='1'
        :constValue="tt('device.list', '设备列表')"
    >
    </t-label>
    <div
        style='    outline:0!important;'
        class='lockTable  fasr_div_lock'
        :tabIndex='-1'
        instanceCode='lockTable'
    >
        <div v-for="(item,index) in lockList" style="display: inline-block;">
            <div class="deviceViewCont">
                <div class="deviceCardNew">
                    <!-- 标题行：设备名称 + 状态 -->
                    <div class="deviceCardTitleRow">
                        <span class="deviceCardTitleTextLock titleBold">{{ item.DeviceName }}</span>
                        <span
                            @click.stop="openDetail(item)"
                            class="detail-icon"
                            :title="tt('common.viewDetails', '查看详情')"
                            >
                            {{ tt('common.details', '详情') }}
                            <t-icon
                                style='opacity:100%'
                                class='lockIcon tr-icon-default'
                                instanceCode='lockIcon'
                                size='12px'
                                :tabIndex='1'
                                name='fas dx-icon icon-t-arrow-right-thin'
                            >
                            </t-icon>
                        </span>
                    </div>
                    <!-- 上侧内容区域 -->
                    <div class="deviceCardContentNew">
                        <!-- 左侧圆形状态指示 -->
                        <div class="deviceCardStatusCircle circleState" :class="item.NetState == 1 ? 'greenColor' : item.NetState == 2 ?'redColor' : 'grayColor'">{{ NetState[item.NetState] }}</div>
                        <div style="width: 100%;">
                            <div class="deviceCardStateStamp">
                                <span v-if="item.FaultState == 1" style="color:#f5222d;">{{ FaultCode[item.FaultCode] }}</span>
                                <span v-if="item.WarningState == 1" style="color: #ffa233;">{{ WarningCode[item.WarningCode] }}</span>
                                <lock-Img :ParkingState="item.ParkingState" :LockState="item.LockState"></lock-Img>
                            </div>
                            <div class="deviceCardTimeStamp">{{ tt('runtime.updateTime', '更新时间') }}: {{item.LastUpdateDateTime || '--'}}</div>
                            
                        </div>
                    </div>
                    <div class="deviceBtn">
                        <t-button
                            :ref='el=>Widget["fasr_button_upLock"]=el'
                            style='flex: 3;'
                            class='fasr_button_upLock tr-button-default'
                            :label="tt('lock.raise', '升锁')"
                            instanceCode='fasr_button_upLock'
                            icon='fas dx-icon icon-t-arrow-up-outlined'
                            :showHint='true'
                            :tabIndex='1'
                            @click="changeLockState(item,1)"
                            :disabled="item.NetState != 1"
                            v-if="item.LockState == 2"
                        >
                        </t-button>
                        <t-button
                            :ref='el=>Widget["fasr_button_downLock"]=el'
                            style='flex:3;'
                            class='fasr_button_viceColor tr-button-default'
                            :label="tt('lock.lower', '降锁')"
                            instanceCode='fasr_button_downLock'
                            icon='fas dx-icon icon-t-arrow-down-outlined'
                            :showHint='true'
                            :tabIndex='1'
                            @click="changeLockState(item,2)"
                            :disabled="item.NetState != 1"
                            v-if="item.LockState != 2"
                        >
                        </t-button>
                        <t-btn-group
                            :ref='el=>Widget["btnGroup_lock"]=el'
                            style=''
                            class='btnGroup_lock'
                            instanceCode='btnGroup_lock'
                            :staticItems='getLockActionItems(item)'
                            btnSpace='8px'
                            :moreConf='true'
                            :moreMaxCount='0'
                            moreBtnIcon='fas dx-icon icon-t-more'
                            :btnDropPop='true'
                            :hideBorder='false'
                            :tabIndex='1'
                            @Click_重启='btnGroup_lock_Click_重启'
                            @Click_休眠='btnGroup_lock_Click_休眠'
                            @Click_唤醒='btnGroup_lock_Click_唤醒'
                            @Click_设备日志='btnGroup_lock_Click_设备日志'
                            @btnGroupItemClick='(action)=>btnGroup_lock_btnGroupItemClick(action, row,item)'
                            >
                        </t-btn-group>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="lockList.length == 0" style="text-align: center;margin: 20px 0px;width: 100%;">{{ tt('common.noRecords', '无记录') }}</div>
    </div>
    <div v-if="lockDataVisible" class="detail-modal">
        <!-- 背景遮罩 -->
        <div class="detail-overlay" @click="closeDetail"></div>
        <!-- 详情面板 -->
        <div class="detail-panel">
            <div class="detail-header">
                <h3 class="detail-title">{{ tt('device.detail', '设备详情') }}</h3>
                <button class="close-btn" @click="closeDetail">×</button>
            </div>
            <div class="detail-body">
                <div class="device-info">
                    <span
                        class="status-indicator"
                        :class="{ online: isOnline, offline: isOffline, unknown: !isOnline && !isOffline }"
                    ></span>
                    <span class="statetext" :class="{ online: isOnline, offline: isOffline, unknown: !isOnline && !isOffline }">
                        {{ NetState[currentDetail.NetState] }}
                    </span>
                    <span class="device-name">{{ currentDetail.DeviceName || tt('runtime.unknownDevice', '未知设备') }}</span>
                </div>
                <div class="detail-row">
                    <strong>{{ tt('runtime.deviceCode', '设备编号') }}：</strong>
                    <span :title="currentDetail.DeviceKey">{{ currentDetail.DeviceKey }}</span>
                </div>
                <div class="detail-row">
                    <strong>{{ tt('runtime.parkingNumber', '车位号') }}：</strong>
                    <span :title="currentDetail.ParkingNum">{{ currentDetail.ParkingNum || '--'}}</span>
                </div>
                <div class="detail-row">
                    <strong>{{ tt('lock.status', '地锁状态') }}：</strong>
                    <span :title="getLockStateLabel(currentDetail.LockState)">{{ getLockStateLabel(currentDetail.LockState) }}</span>
                </div>
                <div class="detail-row">
                    <strong>{{ tt('runtime.dormancyStatus', '休眠状态') }}：</strong>
                    <span :title="getDormancyLabel(currentDetail.DormancyState)">{{ getDormancyLabel(currentDetail.DormancyState) }}</span>
                </div>
                <div class="detail-row">
                    <strong>{{ tt('runtime.parkingStatus', '车位状态') }}：</strong>
                    <span :title="getParkingStateLabel(currentDetail.ParkingState)">{{ getParkingStateLabel(currentDetail.ParkingState) }}</span>
                </div>
                <div class="detail-row">
                    <strong>{{ tt('runtime.faultStatus', '故障状态') }}：</strong>
                    <span :title="getFaultStateLabel(currentDetail.FaultState)">{{ getFaultStateLabel(currentDetail.FaultState) }}</span>
                </div>
                <div class="detail-row">
                    <strong>{{ tt('runtime.faultDescription', '故障描述') }}：</strong>
                    <span :title="FaultCode[currentDetail.FaultCode]">{{ FaultCode[currentDetail.FaultCode] || '--' }}</span>
                </div>
                <div class="detail-row">
                    <strong>{{ tt('runtime.warningStatus', '预警状态') }}：</strong>
                    <span :title="getWarningStateLabel(currentDetail.WarningState)">{{ getWarningStateLabel(currentDetail.WarningState) }}</span>
                </div>
                <div class="detail-row">
                    <strong>{{ tt('runtime.warningDescription', '预警描述') }}：</strong>
                    <span :title="WarningCode[currentDetail.WarningCode]">{{ WarningCode[currentDetail.WarningCode] || '--' }}</span>
                </div>
                <div class="detail-row">
                    <strong>{{ tt('runtime.buzzerStatus', '蜂鸣器状态') }}：</strong>
                    <span :title="getBuzzerStateLabel(currentDetail.BuzzerState)">{{ getBuzzerStateLabel(currentDetail.BuzzerState) }}</span>
                </div>
                <div class="detail-row">
                    <strong>{{ tt('runtime.offlineReason', '设备离线原因') }}：</strong>
                    <span :title="OfflineReason[currentDetail.OfflineReason]">{{ OfflineReason[currentDetail.OfflineReason] || '--' }}</span>
                </div>
                <div class="detail-row">
                    <strong>{{ tt('runtime.remainingBattery', '电池剩余电量') }}：</strong>
                    <span :title="currentDetail.SOC + '%'">{{ currentDetail.SOC }}%</span>
                </div>
                <div class="detail-row">
                    <strong>{{ tt('runtime.softwareVersion', '软件版本号') }}：</strong>
                    <span :title="currentDetail.ModuleSoftVersion">{{ currentDetail.ModuleSoftVersion || '--'}}</span>
                </div>
                <div class="detail-row">
                    <strong>{{ tt('runtime.hardwareVersion', '硬件版本号') }}：</strong>
                    <span :title="currentDetail.ModuleHardVersion">{{ currentDetail.ModuleHardVersion || '--'}}</span>
                </div>
                <!-- <div class="detail-row">
                    <strong>{{ tt('runtime.macAddress', 'Mac地址') }}：</strong>
                    <span :title="currentDetail.Mac">{{ currentDetail.Mac || '--'}}</span>
                </div> -->
                <div class="detail-row detail-row-split">
                    <strong>{{ tt('runtime.lastUpdateTime', '最后更新时间') }}：</strong>
                    <span :title="currentDetail.LastUpdateDateTime">{{ currentDetail.LastUpdateDateTime || '--'}}</span>
                </div>
                <div class="detail-row">
                    <strong>{{ tt('runtime.deviceOnlineTime', '设备上线时间') }}：</strong>
                    <span :title="currentDetail.OnlineTime">{{ currentDetail.OnlineTime || '--' }}</span>
                </div>
                <div class="detail-row">
                    <strong>{{ tt('runtime.deviceOfflineTime', '设备下线时间') }}：</strong>
                    <span :title="currentDetail.OfflineTime">{{ currentDetail.OfflineTime || '--' }}</span>
                </div>
                <div class="detail-row">
                    <strong>{{ tt('runtime.lastLockUpTime', '最近升锁时间') }}：</strong>
                    <span :title="currentDetail.LastLockUpDateTime">{{ currentDetail.LastLockUpDateTime || '--'}}</span>
                </div>
                <div class="detail-row">
                    <strong>{{ tt('runtime.lastLockDownTime', '最近降锁时间') }}：</strong>
                    <span :title="currentDetail.LastLockDownDateTime">{{ currentDetail.LastLockDownDateTime || '--'}}</span>
                </div>
                
            </div>
        </div>
    </div>
</div>
</template>

<script setup>


import { pageText } from '../pages/i18n';
const tt = pageText;
import { ref, onBeforeMount, onMounted, computed, onUnmounted, reactive, nextTick, watch, provide, toRef,defineEmits } from 'vue';
import LockImg from './lockIMG.vue';

const props = defineProps({
  lockDataValue: {
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
const lockList = ref([]);
watch(
  () => props.lockDataValue,
  (newVal) => {
    lockList.value = newVal?.DeviceList || [];
  },
  { immediate: true } // 如果希望组件挂载时也执行一次
);

const Funcs = window.Funcs;
const NetState = {
  0: tt('runtime.initial', '初始'),
  1: tt('runtime.online', '在线'),
  2: tt('runtime.offline', '离线'), 
};
const lockDataVisible = ref(false);
const currentDetail = ref(null);
const isOnline = ref(false);
const isOffline = ref(false);
const FaultCode = {
  0: tt('runtime.noFault', '无故障'),
  1: tt('lock.swingArmFault', '摇臂故障'),
  2: tt('lock.batteryLow', '电池电量不足'),
  3: tt('lock.geomagneticFault', '地磁故障'),
  4: tt('lock.ultrasonicFault', '超声波故障'),
  5: tt('lock.motorFault', '电机故障'),
  255: tt('runtime.otherFault', '其他故障'),
};
const WarningCode = {
  0: tt('runtime.noWarning', '无预警'),
  1: tt('lock.lowBatteryWarning', '低电量预警'),
  2: tt('lock.externalPressureWarning', '地锁受外力压迫'),
  255: tt('runtime.otherWarning', '其他预警'),
};
const OfflineReason = {
  0: tt('runtime.unknown', '未知'),
  1: tt('runtime.networkDisconnected', '断网'),
  2: tt('runtime.reboot', '重启'),
  3: tt('runtime.powerOutage', '断电'),
  4: tt('runtime.upgrade', '升级'),
  255: tt('runtime.other', '其他'),
};
const Widget =  {
  lockTitle:null,
  lockTable:null,
  lockIcon:null,
  lockBtn:null,
};

const getLockStateLabel = (value) => {
  if (value == 1) return tt('lock.raise', '升锁');
  if (value == 2) return tt('lock.lower', '降锁');
  return tt('runtime.unknown', '未知');
};

const getDormancyLabel = (value) => {
  if (value == 1) return tt('runtime.sleep', '休眠');
  if (value == 2) return tt('runtime.notSleeping', '未休眠');
  return tt('runtime.unknown', '未知');
};

const getParkingStateLabel = (value) => {
  if (value == 1) return tt('runtime.hasCar', '有车');
  if (value == 2) return tt('runtime.noCar', '无车');
  return tt('runtime.unknown', '未知');
};

const getFaultStateLabel = (value) => {
  if (value == 1) return tt('runtime.withFault', '有故障');
  if (value == 2) return tt('runtime.noFault', '无故障');
  return tt('runtime.unknown', '未知');
};

const getWarningStateLabel = (value) => {
  if (value == 1) return tt('runtime.withWarning', '有预警');
  if (value == 2) return tt('runtime.noWarning', '无预警');
  return tt('runtime.unknown', '未知');
};

const getBuzzerStateLabel = (value) => {
  if (value == 1) return tt('runtime.buzzing', '鸣叫中');
  if (value == 2) return tt('runtime.silent', '未鸣');
  return tt('runtime.unknown', '未知');
};

const getLockActionItems = (item) => ([
  {
    label: tt('runtime.reboot', '重启'),
    value: '1',
    icon: 'fas dx-icon icon-t-redo',
    type: 'default',
    hint: tt('runtime.reboot', '重启'),
    visible: true,
    disabled: item.NetState == 1,
    code: 'btnredo',
  },
  {
    label: tt('runtime.sleep', '休眠'),
    value: '2',
    icon: 'fas dx-icon icon-t-unlink',
    type: 'default',
    hint: tt('runtime.sleep', '休眠'),
    visible: item.DormancyState != 1,
    disabled: item.DormancyState != 2 || item.NetState != 1,
    code: 'btnsleep',
  },
  {
    label: tt('runtime.wake', '唤醒'),
    value: '3',
    icon: 'fas dx-icon icon-t-link',
    type: 'default',
    hint: tt('runtime.wake', '唤醒'),
    visible: item.DormancyState == 1,
    disabled: item.NetState != 1,
    code: 'btnwake',
  },
  {
    label: tt('runtime.deviceLog', '设备日志'),
    value: '4',
    icon: 'fas dx-icon icon-t-file-text',
    type: 'default',
    hint: tt('runtime.deviceLog', '设备日志'),
    visible: true,
    disabled: false,
    code: 'btntext',
  }
]);

window.addPCStyle();
async function Page_OnError(e) {
  Funcs.HandleError(e);
}

onBeforeMount(()=>{
});
onMounted(async ()=>{
    
});
onUnmounted(async ()=>{

});


const openDetail = (item) => {
  currentDetail.value = item;
  lockDataVisible.value = true;
  isOnline.value =  item.NetState === 1;
  isOffline.value =  item.NetState === 2;
};
const closeDetail = () => {
  lockDataVisible.value = false;
  currentDetail.value = null;
};

async function btnGroup_lock_Click_重启(item) {
  operationLock(item,1);
}
async function btnGroup_lock_Click_休眠(item) {
  operationLock(item,2);
}
async function btnGroup_lock_Click_唤醒(item) {
  operationLock(item,3);
}
async function btnGroup_lock_Click_设备日志(item) {
  jumpLogPage(item);
}
async function btnGroup_lock_btnGroupItemClick(action,row,item) {
  if(!action)return;
  const actions = {
    'Click_重启':btnGroup_lock_Click_重启,
    'Click_休眠':btnGroup_lock_Click_休眠,
    'Click_唤醒':btnGroup_lock_Click_唤醒,
    'Click_设备日志':btnGroup_lock_Click_设备日志,
  };
  actions[ 'Click_'+action.code ] && actions[ 'Click_'+action.code ](item);
}
const changeLockState = async (device,actionType) => {
  if(device.NetState != 1){
    Funcs.Notify(tt('runtime.prompt', '提示'), tt('runtime.onlineOnlyLockOperation', '当地锁状态为在线时才允许进行操作！'), 'error');
    return;
  }
  const actionText = actionType == 1 ? tt('lock.raise', '升锁') : tt('lock.lower', '降锁');
  Funcs.Confirm(tt('runtime.prompt', '提示'), tt('runtime.confirmAction', '您确认要执行{action}操作吗？').replace('{action}', actionText), () => {
    const postData = {
      TenantId: props.TenantId,
      DeviceKey: device.DeviceKey,
      ProductKey: device.ProductKey,
      ActionId: 'ControlGroundLock',
      'WaitForResponse': false,
      'Params':[ { 'Name':'LockState','Value':actionType },{ 'Name':'ParkingNumber','Value':'' } ],
    };
    TFF.common.ajax.getDataAsync({
      url: TFF.common.ajax.getServiceUrl('IRouter-InvokeDeviceAction_External'),
      type: 'post',
      data: { request: JSON.stringify(postData) }
    }).then(async (result) => {
      if(result.state == 0){
        Funcs.Notify(tt('runtime.prompt', '提示'), `${ result.errmsg }`, 'error');
        return;
      }
      if(result.data && result.data.Code && result.data.Code != 200){
        Funcs.Notify(tt('runtime.prompt', '提示'), result.data.OutputParams[ 0 ].Value, 'error');
        return;
      }
      if(result.data && result.data.Code && result.data.Code == 200){
        Funcs.Notify(tt('runtime.prompt', '提示'), tt('runtime.issueSuccess', '下发成功'), 'success');
        sendToParentRefresh();
      }
    }).catch((error) => {
      Funcs.Notify(tt('runtime.prompt', '提示'), tt('runtime.lockOperationError', '地锁操作有误'), 'error');
    });
  });
};
const operationLock = async (device,actionType) => {
  if(device.NetState != 1){
    Funcs.Notify(tt('runtime.prompt', '提示'), tt('runtime.onlineOnlyLockOperation', '当地锁状态为在线时才允许进行操作！'), 'error');
    return;
  }
  const actionText = actionType == 1 ? tt('runtime.reboot', '重启') : actionType == 2 ? tt('runtime.sleep', '休眠') : actionType == 3 ? tt('runtime.wake', '唤醒') : '';
  Funcs.Confirm(tt('runtime.prompt', '提示'), tt('runtime.confirmAction', '您确认要执行{action}操作吗？').replace('{action}', actionText), () => {
    const postData = {
      TenantId: props.TenantId,
      DeviceKey: device.DeviceKey,
      ProductKey: device.ProductKey,
      ActionId: 'OperationAndMaintenanceControl',
      'WaitForResponse': false,
      'Params':[ { 'Name':'ControlType','Value':actionType },{ 'Name':'ParkingNumber','Value':'' } ],
    };
    TFF.common.ajax.getDataAsync({
      url: TFF.common.ajax.getServiceUrl('IRouter-InvokeDeviceAction_External'),
      type: 'post',
      data: { request: JSON.stringify(postData) }
    }).then(async (result) => {
      if(result.state == 0){
        Funcs.Notify(tt('runtime.prompt', '提示'), `${ result.errmsg }`, 'error');
        return;
      }
      if(result.data && result.data.Code && result.data.Code != 200){
        Funcs.Notify(tt('runtime.prompt', '提示'), result.data.OutputParams[ 0 ].Value, 'error');
        return;
      }
      if(result.data && result.data.Code && result.data.Code == 200){
        Funcs.Notify(tt('runtime.prompt', '提示'), tt('runtime.issueSuccess', '下发成功'), 'success');
        sendToParentRefresh();
      }
    }).catch((error) => {
      Funcs.Notify(tt('runtime.prompt', '提示'), tt('runtime.lockOperationError', '地锁操作有误'), 'error');
    });
  });
};
const jumpLogPage = (device) => {
  const flag = window.TeldWebConfig.ResourceURL.indexOf('teld2.xyz') > -1 || window.TeldWebConfig.ResourceURL.indexOf('teld9.xyz') > -1 || window.TeldWebConfig.ResourceURL.indexOf('teld.cn') > -1;
  if(flag){
    window.open(`${ window.TeldWebConfig.ResourceURL.replace('resource','fas') }/gencode/dms/Page_LogListStandard?InParam_Tab=${ 0 }&InParam_DeviceInfo=${ device.DeviceKey }&InParam_StaID=${ props.stationID }&InParam_StaName=${ props.stationName }&opertype=1`);
  }
  else{
    Funcs.OpenFasPage({
      fasAppKey: 'dms',
      pageMetaId: 'Page_LogListStandard',
      param: {
        InParam_Tab: 0,
        InParam_DeviceInfo: device.DeviceKey,
        InParam_StaID: props.stationID,
        InParam_StaName: props.stationName,
        ShowHeader :true
      },
      target: 'inline',
      callback: function (res) {

      },
      passThroughData: [ 'platformtype' ],
    });
    // window.open(`${ window.TeldWebConfig.ResourceURL.replace('resource','fas') }/gencode/dms/Page_LogListStandard?InParam_Tab=${ 0 }&InParam_DeviceInfo=${ device.DeviceKey }&InParam_StaID=${ props.stationID }&InParam_StaName=${ props.stationName }`);
  }
};

const emit = defineEmits([ 'lockListEvent' ]);
const sendToParentRefresh = () => {
  emit('lockListEvent');
};

</script>
