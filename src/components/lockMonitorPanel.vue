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
        constValue='设备列表'
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
                            title="查看详情"
                            >
                            详情
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
                            <div class="deviceCardTimeStamp">更新时间: {{item.LastUpdateDateTime || '--'}}</div>
                            
                        </div>
                    </div>
                    <div class="deviceBtn">
                        <t-button
                            :ref='el=>Widget["fasr_button_upLock"]=el'
                            style='flex: 3;'
                            class='fasr_button_upLock tr-button-default'
                            label='升锁'
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
                            label='降锁'
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
                            :staticItems='[
                                {
                                    "label": "重启",
                                    "value": "1",
                                    "icon": "fas dx-icon icon-t-redo",
                                    "type": "default",
                                    "hint": "重启",
                                    "visible": true,
                                    "disabled": item.NetState == 1,
                                    "code": "btnredo",
                                },
                                {
                                    "label": "休眠",
                                    "value": "2",
                                    "icon": "fas dx-icon icon-t-unlink",
                                    "type": "default",
                                    "hint": "休眠",
                                    "visible": item.DormancyState != 1,
                                    "disabled": item.DormancyState != 2 || item.NetState != 1,
                                    "code": "btnsleep",
                                },
                                {
                                    "label": "唤醒",
                                    "value": "3",
                                    "icon": "fas dx-icon icon-t-link",
                                    "type": "default",
                                    "hint": "唤醒",
                                    "visible": item.DormancyState == 1,
                                    "disabled": item.NetState != 1,
                                    "code": "btnwake",
                                },
                                {
                                    "label": "设备日志",
                                    "value": "4",
                                    "icon": "fas dx-icon icon-t-file-text",
                                    "type": "default",
                                    "hint": "设备日志",
                                    "visible": true,
                                    "disabled": false,
                                    "code": "btntext",
                                }
                            ]'
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
        <div v-if="lockList.length == 0" style="text-align: center;margin: 20px 0px;width: 100%;">无记录</div>
    </div>
    <div v-if="lockDataVisible" class="detail-modal">
        <!-- 背景遮罩 -->
        <div class="detail-overlay" @click="closeDetail"></div>
        <!-- 详情面板 -->
        <div class="detail-panel">
            <div class="detail-header">
                <h3 class="detail-title">设备详情</h3>
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
                    <span class="device-name">{{ currentDetail.DeviceName || '未知设备' }}</span>
                </div>
                <div class="detail-row">
                    <strong>{{ '设备编号' }}：</strong>
                    <span :title="currentDetail.DeviceKey">{{ currentDetail.DeviceKey }}</span>
                </div>
                <div class="detail-row">
                    <strong>{{ '车位号' }}：</strong>
                    <span :title="currentDetail.ParkingNum">{{ currentDetail.ParkingNum || '--'}}</span>
                </div>
                <div class="detail-row">
                    <strong>{{ '地锁状态' }}：</strong>
                    <span :title="currentDetail.LockState == 1 ? '升锁' : currentDetail.LockState == 2 ? '降锁' : '未知'">{{ currentDetail.LockState == 1 ? '升锁' : currentDetail.LockState == 2 ? '降锁' : '未知' }}</span>
                </div>
                <div class="detail-row">
                    <strong>{{ '休眠状态' }}：</strong>
                    <span :title="currentDetail.DormancyState == 1 ? '休眠' : currentDetail.DormancyState == 2 ? '未休眠' : '未知'">{{ currentDetail.DormancyState == 1 ? '休眠' : currentDetail.DormancyState == 2 ? '未休眠' : '未知' }}</span>
                </div>
                <div class="detail-row">
                    <strong>{{ '车位状态' }}：</strong>
                    <span :title="currentDetail.ParkingState == 1 ? '有车' : currentDetail.ParkingState == 2 ? '无车' : '未知'">{{ currentDetail.ParkingState == 1 ? '有车' : currentDetail.ParkingState == 2 ? '无车' : '未知' }}</span>
                </div>
                <div class="detail-row">
                    <strong>{{ '故障状态' }}：</strong>
                    <span :title="currentDetail.FaultState == 1 ? '有故障' : currentDetail.FaultState == 2 ? '无故障' : '未知'">{{ currentDetail.FaultState == 1 ? '有故障' : currentDetail.FaultState == 2 ? '无故障' : '未知' }}</span>
                </div>
                <div class="detail-row">
                    <strong>{{ '故障描述' }}：</strong>
                    <span :title="FaultCode[currentDetail.FaultCode]">{{ FaultCode[currentDetail.FaultCode] || '--' }}</span>
                </div>
                <div class="detail-row">
                    <strong>{{ '预警状态' }}：</strong>
                    <span :title="currentDetail.WarningState == 1 ? '有预警' : currentDetail.WarningState == 2 ? '无预警' : '未知'">{{ currentDetail.WarningState == 1 ? '有预警' : currentDetail.WarningState == 2 ? '无预警' : '未知' }}</span>
                </div>
                <div class="detail-row">
                    <strong>{{ '预警描述' }}：</strong>
                    <span :title="WarningCode[currentDetail.WarningCode]">{{ WarningCode[currentDetail.WarningCode] || '--' }}</span>
                </div>
                <div class="detail-row">
                    <strong>{{ '蜂鸣器状态' }}：</strong>
                    <span :title="currentDetail.BuzzerState == 1 ? '鸣叫中' : currentDetail.BuzzerState == 2 ? '未鸣' : '未知'">{{ currentDetail.BuzzerState == 1 ? '鸣叫中' : currentDetail.BuzzerState == 2 ? '未鸣' : '未知' }}</span>
                </div>
                <div class="detail-row">
                    <strong>{{ '设备离线原因' }}：</strong>
                    <span :title="OfflineReason[currentDetail.OfflineReason]">{{ OfflineReason[currentDetail.OfflineReason] || '--' }}</span>
                </div>
                <div class="detail-row">
                    <strong>{{ '电池剩余电量' }}：</strong>
                    <span :title="currentDetail.SOC + '%'">{{ currentDetail.SOC }}%</span>
                </div>
                <div class="detail-row">
                    <strong>{{ '软件版本号' }}：</strong>
                    <span :title="currentDetail.ModuleSoftVersion">{{ currentDetail.ModuleSoftVersion || '--'}}</span>
                </div>
                <div class="detail-row">
                    <strong>{{ '硬件版本号' }}：</strong>
                    <span :title="currentDetail.ModuleHardVersion">{{ currentDetail.ModuleHardVersion || '--'}}</span>
                </div>
                <!-- <div class="detail-row">
                    <strong>{{ 'Mac地址' }}：</strong>
                    <span :title="currentDetail.Mac">{{ currentDetail.Mac || '--'}}</span>
                </div> -->
                <div class="detail-row detail-row-split">
                    <strong>{{ '最后更新时间' }}：</strong>
                    <span :title="currentDetail.LastUpdateDateTime">{{ currentDetail.LastUpdateDateTime || '--'}}</span>
                </div>
                <div class="detail-row">
                    <strong>{{ '设备上线时间' }}：</strong>
                    <span :title="currentDetail.OnlineTime">{{ currentDetail.OnlineTime || '--' }}</span>
                </div>
                <div class="detail-row">
                    <strong>{{ '设备下线时间' }}：</strong>
                    <span :title="currentDetail.OfflineTime">{{ currentDetail.OfflineTime || '--' }}</span>
                </div>
                <div class="detail-row">
                    <strong>{{ '最近升锁时间' }}：</strong>
                    <span :title="currentDetail.LastLockUpDateTime">{{ currentDetail.LastLockUpDateTime || '--'}}</span>
                </div>
                <div class="detail-row">
                    <strong>{{ '最近降锁时间' }}：</strong>
                    <span :title="currentDetail.LastLockDownDateTime">{{ currentDetail.LastLockDownDateTime || '--'}}</span>
                </div>
                
            </div>
        </div>
    </div>
</div>
</template>

<script setup>
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
  0:'初始',
  1:'在线',
  2:'离线', 
};
const lockDataVisible = ref(false);
const currentDetail = ref(null);
const isOnline = ref(false);
const isOffline = ref(false);
const FaultCode = {
  0:'无故障',
  1:'摇臂故障',
  2:'电池电量不足',
  3:'地磁故障',
  4:'超声波故障',
  5:'电机故障',
  255:'其他故障',
};
const WarningCode = {
  0:'无预警',
  1:'低电量预警',
  2:'地锁受外力压迫',
  255:'其他预警',
};
const OfflineReason = {
  0:'未知',
  1:'断网',
  2:'重启',
  3:'断电',
  4:'升级',
  255:'其他',
};
const Widget =  {
  lockTitle:null,
  lockTable:null,
  lockIcon:null,
  lockBtn:null,
};

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
    Funcs.Notify('提示', '当地锁状态为在线时才允许进行操作！', 'error');
    return;
  }
  const actionText = actionType == 1 ? '升锁' : '降锁';
  Funcs.Confirm('提示',`您确认要执行${ actionText }操作吗？`, () => {
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
        Funcs.Notify('提示', `${ result.errmsg }`, 'error');
        return;
      }
      if(result.data && result.data.Code && result.data.Code != 200){
        Funcs.Notify('提示', result.data.OutputParams[ 0 ].Value, 'error');
        return;
      }
      if(result.data && result.data.Code && result.data.Code == 200){
        Funcs.Notify('提示', '下发成功', 'success');
        sendToParentRefresh();
      }
    }).catch((error) => {
      Funcs.Notify('提示', '地锁操作有误', 'error');
    });
  });
};
const operationLock = async (device,actionType) => {
  if(device.NetState != 1){
    Funcs.Notify('提示', '当地锁状态为在线时才允许进行操作！', 'error');
    return;
  }
  const actionText = actionType == 1 ? '重启' : actionType == 2 ? '休眠' : actionType == 3 ? '唤醒' : '';
  Funcs.Confirm('提示',`您确认要执行${ actionText }操作吗？`, () => {
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
        Funcs.Notify('提示', `${ result.errmsg }`, 'error');
        return;
      }
      if(result.data && result.data.Code && result.data.Code != 200){
        Funcs.Notify('提示', result.data.OutputParams[ 0 ].Value, 'error');
        return;
      }
      if(result.data && result.data.Code && result.data.Code == 200){
        Funcs.Notify('提示', '下发成功', 'success');
        sendToParentRefresh();
      }
    }).catch((error) => {
      Funcs.Notify('提示', '地锁操作有误', 'error');
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