<template>
  <div
    class="tr-div-default monitorDiv"
    style="min-height: calc(100vh - 210px);">
    <t-label
        style='opacity:100%'
        class='lockTitle tr-lable-keyindicatorsname'
        instanceCode='lockTitle'
        valueType='static'
        :showHint='true'
        :tabIndex='1'
        :constValue="tt('device.edgeController', '边缘控制器')"
        v-if="fireListValue.filter((item) => item.ModuleCode == 'ECS').length > 0"
    >
    </t-label>
    <div
        style='opacity:100%;    outline:0!important;'
        class='lockTable  fasr_div_lock'
        :tabIndex='-1'
        instanceCode='lockTable'
        v-if="fireListValue.filter((item) => item.ModuleCode == 'ECS').length > 0"
    >
        <div v-for="(item,index) in fireListValue.filter((item) => item.ModuleCode == 'ECS')" style="display: inline-block;">
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
                                <!-- <span class="lock-tag" :class="{
                                    'lock-unknown': item.ParkingState != 1 && item.ParkingState != 2,
                                    'lock-up': item.ParkingState == 1 || item.ParkingState == 2
                                }">{{ getParkingStateText(item.ParkingState) }}</span>
                                 <span class="lock-tag" :class="{
                                    'lock-unknown': item.LockState != 1 && item.LockState != 2,
                                    'lock-up': item.LockState == 1 || item.LockState == 2
                                }">锁{{ item.LockState == 1 ? '升起' : item.LockState == 2 ? '降下' : '状态未知' }}</span> -->
                            </div>
                            <div class="deviceCardTimeStamp">{{ tt('runtime.updateTime', '更新时间') }}: {{item.LastUpdateDateTime || '--'}}</div>
                            
                        </div>
                    </div>
                    <div class="deviceBtn">
                        <t-button
                            :ref='el=>Widget["fasr_button_upLock"]=el'
                            style='opacity:100%;flex: 3;'
                            class='fasr_button_upLock tr-button-default'
                            :label="tt('common.close', '关闭')"
                            instanceCode='fasr_button_upLock'
                            icon='fas dx-icon icon-t-close'
                            :showHint='true'
                            :tabIndex='1'
                            @click="changeLockState(item,1)"
                            :disabled="item.NetState != 1"
                            v-if="item.LockState == 2"
                        >
                        </t-button>
                        <t-button
                            :ref='el=>Widget["fasr_button_downLock"]=el'
                            style='opacity:100%;flex:3;'
                            class='fasr_button_viceColor tr-button-default'
                            :label="tt('common.open', '打开')"
                            instanceCode='fasr_button_downLock'
                            icon='fas dx-icon icon-t-check'
                            :showHint='true'
                            :tabIndex='1'
                            @click="changeLockState(item,2)"
                            :disabled="item.NetState != 1"
                            v-if="item.LockState != 2"
                        >
                        </t-button>
                        <t-btn-group
                            :ref='el=>Widget["btnGroup_lock"]=el'
                            style='opacity:100%;'
                            class='btnGroup_lock'
                            instanceCode='btnGroup_lock'
                            :staticItems='getFireActionItems()'
                            btnSpace='8px'
                            :moreConf='true'
                            :moreMaxCount='0'
                            moreBtnIcon='fas dx-icon icon-t-more'
                            :btnDropPop='true'
                            :hideBorder='false'
                            :tabIndex='1'
                            @Click_设备日志='btnGroup_lock_Click_设备日志'
                            @btnGroupItemClick='(action)=>btnGroup_lock_btnGroupItemClick(action, row,item)'
                            >
                        </t-btn-group>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <t-label
        style='opacity:100%'
        class='lockTitle tr-lable-keyindicatorsname'
        instanceCode='lockTitle'
        valueType='static'
        :showHint='true'
        :tabIndex='1'
        :constValue="tt('device.parkingFireBox', '车位消防盒子')"
        v-if="fireListValue.filter((item) => item.ModuleCode == 'FMU').length > 0"
    >
    </t-label>
    <div
        style='opacity:100%;    outline:0!important;'
        class='lockTable  fasr_div_lock'
        :tabIndex='-1'
        instanceCode='lockTable'
        v-if="fireListValue.filter((item) => item.ModuleCode == 'FMU').length > 0"
    >
        <div v-for="(item,index) in fireListValue.filter((item) => item.ModuleCode == 'FMU')" style="display: inline-block;">
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
                                <!-- <span class="lock-tag" :class="{
                                    'lock-unknown': item.ParkingState != 1 && item.ParkingState != 2,
                                    'lock-up': item.ParkingState == 1 || item.ParkingState == 2
                                }">{{ getParkingStateText(item.ParkingState) }}</span>
                                 <span class="lock-tag" :class="{
                                    'lock-unknown': item.LockState != 1 && item.LockState != 2,
                                    'lock-up': item.LockState == 1 || item.LockState == 2
                                }">锁{{ item.LockState == 1 ? '升起' : item.LockState == 2 ? '降下' : '状态未知' }}</span> -->
                            </div>
                            <div class="deviceCardTimeStamp">{{ tt('runtime.updateTime', '更新时间') }}: {{item.LastUpdateDateTime || '--'}}</div>
                            
                        </div>
                    </div>
                    <div class="deviceBtn">
                        <t-button
                            :ref='el=>Widget["fasr_button_upLock"]=el'
                            style='opacity:100%;flex: 3;'
                            class='fasr_button_upLock tr-button-default'
                            :label="tt('common.close', '关闭')"
                            instanceCode='fasr_button_upLock'
                            icon='fas dx-icon icon-t-close'
                            :showHint='true'
                            :tabIndex='1'
                            @click="changeLockState(item,1)"
                            :disabled="item.NetState != 1"
                            v-if="item.LockState == 2"
                        >
                        </t-button>
                        <t-button
                            :ref='el=>Widget["fasr_button_downLock"]=el'
                            style='opacity:100%;flex:3;'
                            class='fasr_button_viceColor tr-button-default'
                            :label="tt('common.open', '打开')"
                            instanceCode='fasr_button_downLock'
                            icon='fas dx-icon icon-t-check'
                            :showHint='true'
                            :tabIndex='1'
                            @click="changeLockState(item,2)"
                            :disabled="item.NetState != 1"
                            v-if="item.LockState != 2"
                        >
                        </t-button>
                        <t-btn-group
                            :ref='el=>Widget["btnGroup_lock"]=el'
                            style='opacity:100%;'
                            class='btnGroup_lock'
                            instanceCode='btnGroup_lock'
                            :staticItems='getFireActionItems()'
                            btnSpace='8px'
                            :moreConf='true'
                            :moreMaxCount='0'
                            moreBtnIcon='fas dx-icon icon-t-more'
                            :btnDropPop='true'
                            :hideBorder='false'
                            :tabIndex='1'
                            @Click_设备日志='btnGroup_lock_Click_设备日志'
                            @btnGroupItemClick='(action)=>btnGroup_lock_btnGroupItemClick(action, row,item)'
                            >
                        </t-btn-group>
                    </div>
                </div>
            </div>
        </div>
    </div>
        <t-label
        style='opacity:100%'
        class='lockTitle tr-lable-keyindicatorsname'
        instanceCode='lockTitle'
        valueType='static'
        :showHint='true'
        :tabIndex='1'
        :constValue="tt('device.vehicleMovingRobot', '移车机器人')"
        v-if="fireListValue.filter((item) => item.ModuleCode == 'AGV').length > 0"
    >
    </t-label>
    <div
        style='opacity:100%;    outline:0!important;'
        class='lockTable  fasr_div_lock'
        :tabIndex='-1'
        instanceCode='lockTable'
        v-if="fireListValue.filter((item) => item.ModuleCode == 'AGV').length > 0"
    >
        <div v-for="(item,index) in fireListValue.filter((item) => item.ModuleCode == 'AGV')" style="display: inline-block;">
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
                                <!-- <span class="lock-tag" :class="{
                                    'lock-unknown': item.ParkingState != 1 && item.ParkingState != 2,
                                    'lock-up': item.ParkingState == 1 || item.ParkingState == 2
                                }">{{ getParkingStateText(item.ParkingState) }}</span>
                                 <span class="lock-tag" :class="{
                                    'lock-unknown': item.LockState != 1 && item.LockState != 2,
                                    'lock-up': item.LockState == 1 || item.LockState == 2
                                }">锁{{ item.LockState == 1 ? '升起' : item.LockState == 2 ? '降下' : '状态未知' }}</span> -->
                            </div>
                            <div class="deviceCardTimeStamp">{{ tt('runtime.updateTime', '更新时间') }}: {{item.LastUpdateDateTime || '--'}}</div>
                            
                        </div>
                    </div>
                    <div class="deviceBtn">
                        <t-button
                            :ref='el=>Widget["fasr_button_upLock"]=el'
                            style='opacity:100%;flex: 3;'
                            class='fasr_button_upLock tr-button-default'
                            :label="tt('common.close', '关闭')"
                            instanceCode='fasr_button_upLock'
                            icon='fas dx-icon icon-t-close'
                            :showHint='true'
                            :tabIndex='1'
                            @click="changeLockState(item,1)"
                            :disabled="item.NetState != 1"
                            v-if="item.LockState == 2"
                        >
                        </t-button>
                        <t-button
                            :ref='el=>Widget["fasr_button_downLock"]=el'
                            style='opacity:100%;flex:3;'
                            class='fasr_button_viceColor tr-button-default'
                            :label="tt('common.open', '打开')"
                            instanceCode='fasr_button_downLock'
                            icon='fas dx-icon icon-t-check'
                            :showHint='true'
                            :tabIndex='1'
                            @click="changeLockState(item,2)"
                            :disabled="item.NetState != 1"
                            v-if="item.LockState != 2"
                        >
                        </t-button>
                        <t-btn-group
                            :ref='el=>Widget["btnGroup_lock"]=el'
                            style='opacity:100%;'
                            class='btnGroup_lock'
                            instanceCode='btnGroup_lock'
                            :staticItems='getFireActionItems()'
                            btnSpace='8px'
                            :moreConf='true'
                            :moreMaxCount='0'
                            moreBtnIcon='fas dx-icon icon-t-more'
                            :btnDropPop='true'
                            :hideBorder='false'
                            :tabIndex='1'
                            @Click_设备日志='btnGroup_lock_Click_设备日志'
                            @btnGroupItemClick='(action)=>btnGroup_lock_btnGroupItemClick(action, row,item)'
                            >
                        </t-btn-group>
                    </div>
                </div>
            </div>
        </div>
    </div>
        <t-label
        style='opacity:100%'
        class='lockTitle tr-lable-keyindicatorsname'
        instanceCode='lockTitle'
        valueType='static'
        :showHint='true'
        :tabIndex='1'
        :constValue="tt('device.fireIsolationRoom', '消防隔离室')"
        v-if="fireListValue.filter((item) => item.ModuleCode == 'FCS').length > 0"
    >
    </t-label>
    <div
        style='opacity:100%;    outline:0!important;'
        class='lockTable  fasr_div_lock'
        :tabIndex='-1'
        instanceCode='lockTable'
        v-if="fireListValue.filter((item) => item.ModuleCode == 'FCS').length > 0"
    >
        <div v-for="(item,index) in fireListValue.filter((item) => item.ModuleCode == 'FCS')" style="display: inline-block;">
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
                                <!-- <span class="lock-tag" :class="{
                                    'lock-unknown': item.ParkingState != 1 && item.ParkingState != 2,
                                    'lock-up': item.ParkingState == 1 || item.ParkingState == 2
                                }">{{ getParkingStateText(item.ParkingState) }}</span>
                                 <span class="lock-tag" :class="{
                                    'lock-unknown': item.LockState != 1 && item.LockState != 2,
                                    'lock-up': item.LockState == 1 || item.LockState == 2
                                }">锁{{ item.LockState == 1 ? '升起' : item.LockState == 2 ? '降下' : '状态未知' }}</span> -->
                            </div>
                            <div class="deviceCardTimeStamp">{{ tt('runtime.updateTime', '更新时间') }}: {{item.LastUpdateDateTime || '--'}}</div>
                            
                        </div>
                    </div>
                    <div class="deviceBtn">
                        <t-button
                            :ref='el=>Widget["fasr_button_upLock"]=el'
                            style='opacity:100%;flex: 3;'
                            class='fasr_button_upLock tr-button-default'
                            :label="tt('common.close', '关闭')"
                            instanceCode='fasr_button_upLock'
                            icon='fas dx-icon icon-t-close'
                            :showHint='true'
                            :tabIndex='1'
                            @click="changeLockState(item,1)"
                            :disabled="item.NetState != 1"
                            v-if="item.LockState == 2"
                        >
                        </t-button>
                        <t-button
                            :ref='el=>Widget["fasr_button_downLock"]=el'
                            style='opacity:100%;flex:3;'
                            class='fasr_button_viceColor tr-button-default'
                            :label="tt('common.open', '打开')"
                            instanceCode='fasr_button_downLock'
                            icon='fas dx-icon icon-t-check'
                            :showHint='true'
                            :tabIndex='1'
                            @click="changeLockState(item,2)"
                            :disabled="item.NetState != 1"
                            v-if="item.LockState != 2"
                        >
                        </t-button>
                        <t-btn-group
                            :ref='el=>Widget["btnGroup_lock"]=el'
                            style='opacity:100%;'
                            class='btnGroup_lock'
                            instanceCode='btnGroup_lock'
                            :staticItems='getFireActionItems()'
                            btnSpace='8px'
                            :moreConf='true'
                            :moreMaxCount='0'
                            moreBtnIcon='fas dx-icon icon-t-more'
                            :btnDropPop='true'
                            :hideBorder='false'
                            :tabIndex='1'
                            @Click_设备日志='btnGroup_lock_Click_设备日志'
                            @btnGroupItemClick='(action)=>btnGroup_lock_btnGroupItemClick(action, row,item)'
                            >
                        </t-btn-group>
                    </div>
                </div>
            </div>
        </div>
    </div>
        <t-label
        style='opacity:100%'
        class='lockTitle tr-lable-keyindicatorsname'
        instanceCode='lockTitle'
        valueType='static'
        :showHint='true'
        :tabIndex='1'
        :constValue="tt('device.fireCamera', '消防摄像头')"
        v-if="fireListValue.filter((item) => item.ModuleCode == 'Camera').length > 0"
    >
    </t-label>
    <div
        style='opacity:100%;    outline:0!important;'
        class='lockTable  fasr_div_lock'
        :tabIndex='-1'
        instanceCode='lockTable'
        v-if="fireListValue.filter((item) => item.ModuleCode == 'Camera').length > 0"
    >
        <div v-for="(item,index) in fireListValue.filter((item) => item.ModuleCode == 'Camera')" style="display: inline-block;">
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
                                <!-- <span class="lock-tag" :class="{
                                    'lock-unknown': item.ParkingState != 1 && item.ParkingState != 2,
                                    'lock-up': item.ParkingState == 1 || item.ParkingState == 2
                                }">{{ getParkingStateText(item.ParkingState) }}</span>
                                 <span class="lock-tag" :class="{
                                    'lock-unknown': item.LockState != 1 && item.LockState != 2,
                                    'lock-up': item.LockState == 1 || item.LockState == 2
                                }">锁{{ item.LockState == 1 ? '升起' : item.LockState == 2 ? '降下' : '状态未知' }}</span> -->
                            </div>
                            <div class="deviceCardTimeStamp">{{ tt('runtime.updateTime', '更新时间') }}: {{item.LastUpdateDateTime || '--'}}</div>
                            
                        </div>
                    </div>
                    <div class="deviceBtn">
                        <t-button
                            :ref='el=>Widget["fasr_button_upLock"]=el'
                            style='opacity:100%;flex: 3;'
                            class='fasr_button_upLock tr-button-default'
                            :label="tt('common.close', '关闭')"
                            instanceCode='fasr_button_upLock'
                            icon='fas dx-icon icon-t-close'
                            :showHint='true'
                            :tabIndex='1'
                            @click="changeLockState(item,1)"
                            :disabled="item.NetState != 1"
                            v-if="item.LockState == 2"
                        >
                        </t-button>
                        <t-button
                            :ref='el=>Widget["fasr_button_downLock"]=el'
                            style='opacity:100%;flex:3;'
                            class='fasr_button_viceColor tr-button-default'
                            :label="tt('common.open', '打开')"
                            instanceCode='fasr_button_downLock'
                            icon='fas dx-icon icon-t-check'
                            :showHint='true'
                            :tabIndex='1'
                            @click="changeLockState(item,2)"
                            :disabled="item.NetState != 1"
                            v-if="item.LockState != 2"
                        >
                        </t-button>
                        <t-btn-group
                            :ref='el=>Widget["btnGroup_lock"]=el'
                            style='opacity:100%;'
                            class='btnGroup_lock'
                            instanceCode='btnGroup_lock'
                            :staticItems='getFireActionItems()'
                            btnSpace='8px'
                            :moreConf='true'
                            :moreMaxCount='0'
                            moreBtnIcon='fas dx-icon icon-t-more'
                            :btnDropPop='true'
                            :hideBorder='false'
                            :tabIndex='1'
                            @Click_设备日志='btnGroup_lock_Click_设备日志'
                            @btnGroupItemClick='(action)=>btnGroup_lock_btnGroupItemClick(action, row,item)'
                            >
                        </t-btn-group>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div v-if="fireListValue.length == 0" style="text-align: center;margin: 20px 0px;width: 100%;">{{ tt('common.noRecords', '无记录') }}</div>
    <div v-if="fireDataVisible" class="detail-modal">
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
                    <strong>{{ tt('fire.moduleName', '模组名称') }}：</strong>
                    <span :title="currentDetail.ModuleName">{{ currentDetail.ModuleName || '--'}}</span>
                </div>
                <div class="detail-row">
                    <strong>{{ tt('fire.deviceModuleName', '设备模组名称') }}：</strong>
                    <span :title="currentDetail.DeviceModuleName">{{ currentDetail.DeviceModuleName || '--'}}</span>
                </div>
                <div class="detail-row">
                    <strong>{{ tt('fire.systemStatus', '系统状态') }}：</strong>
                    <span :title="getOpenCloseStateText(currentDetail.SystemState)">{{ getOpenCloseStateText(currentDetail.SystemState) }}</span>
                </div>
                <div class="detail-row">
                    <strong>{{ tt('runtime.faultStatus', '故障状态') }}：</strong>
                    <span :title="getFaultPresenceText(currentDetail.FaultState)">{{ getFaultPresenceText(currentDetail.FaultState) }}</span>
                </div>
                <div class="detail-row">
                    <strong>{{ tt('runtime.faultDescription', '故障描述') }}：</strong>
                    <span :title="currentDetail.FaultCode">{{ FaultCode[currentDetail.FaultCode] || '--' }}</span>
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
                    <strong>{{ 'Mac地址' }}：</strong>
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

                <div v-if="currentDetail.ModuleCode == 'ECS'">
                    <div class="detail-row detail-row-split">
                        <strong>{{ tt('fire.sn', 'SN号') }}：</strong>
                        <span :title="currentDetail.SN">{{ currentDetail.SN || '--'}}</span>
                    </div>
                    <div class="detail-row">
                        <strong>{{ tt('fire.taskNumber', '任务编号') }}：</strong>
                        <span :title="currentDetail.TaskNumber">{{ currentDetail.TaskNumber || '--' }}</span>
                    </div>
                    <div class="detail-row">
                        <strong>{{ tt('runtime.parkingNumber', '车位号') }}：</strong>
                        <span :title="currentDetail.ParkingNumber">{{ currentDetail.ParkingNumber || '--' }}</span>
                    </div>
                    <div class="detail-row">
                        <strong>{{ tt('fire.taskStatus', '任务状态') }}：</strong>
                        <span :title="getTaskStateText(currentDetail.TaskState)">{{ getTaskStateText(currentDetail.TaskState) }}</span>
                    </div>
                    <div class="detail-row">
                        <strong>{{ tt('fire.fireSystemSwitchStatus', '消防系统启停状态') }}：</strong>
                        <span :title="getStartCloseText(currentDetail.IsSystemOn)">{{ getStartCloseText(currentDetail.IsSystemOn) }}</span>
                    </div>
                </div>

                <div v-if="currentDetail.ModuleCode == 'FMU'">
                    <div class="detail-row detail-row-split">
                        <strong>{{ tt('runtime.parkingNumber', '车位号') }}：</strong>
                        <span :title="currentDetail.ParkingNumber">{{ currentDetail.ParkingNumber || '--' }}</span>
                    </div>
                    <div class="detail-row">
                        <strong>{{ tt('fire.fireDetectorOnlineStatus', '火灾探测装置在线状态') }}：</strong>
                        <span :title="getOnlineStateText(currentDetail.FMCNetState, 1, 0)">{{ getOnlineStateText(currentDetail.FMCNetState, 1, 0) }}</span>
                    </div>
                    <div class="detail-row">
                        <strong>{{ tt('fire.temperatureSensor1Status', '温度传感器1状态') }}：</strong>
                        <span :title="getNoFaultWithFaultText(currentDetail.TempSensor1State)">{{ getNoFaultWithFaultText(currentDetail.TempSensor1State) }}</span>
                    </div>
                    <div class="detail-row">
                        <strong>{{ tt('fire.ambientTemperature1', '环境温度1(℃)') }}：</strong>
                        <span :title="currentDetail.Temperature1">{{ currentDetail.Temperature1 || '--'}}</span>
                    </div>
                    <div class="detail-row">
                        <strong>{{ tt('fire.temperatureSensor2Status', '温度传感器2状态') }}：</strong>
                        <span :title="getNoFaultWithFaultText(currentDetail.TempSensor2State)">{{ getNoFaultWithFaultText(currentDetail.TempSensor2State) }}</span>
                    </div>
                    <div class="detail-row">
                        <strong>{{ tt('fire.ambientTemperature2', '环境温度2(℃)') }}：</strong>
                        <span :title="currentDetail.Temperature2">{{ currentDetail.Temperature2 || '--'}}</span>
                    </div>
                    <div class="detail-row">
                        <strong>{{ tt('fire.coSensorStatus', 'CO传感器状态') }}：</strong>
                        <span :title="getNoFaultWithFaultText(currentDetail.COSensorState)">{{ getNoFaultWithFaultText(currentDetail.COSensorState) }}</span>
                    </div>
                    <div class="detail-row">
                        <strong>{{ tt('fire.carbonMonoxideConcentration', '一氧化碳浓度(ppm)') }}：</strong>
                        <span :title="currentDetail.CO">{{ currentDetail.CO || '--'}}</span>
                    </div>
                    <div class="detail-row">
                        <strong>{{ tt('fire.vocSensorStatus', 'VOC传感器状态') }}：</strong>
                        <span :title="getNoFaultWithFaultText(currentDetail.VOCSensorState)">{{ getNoFaultWithFaultText(currentDetail.VOCSensorState) }}</span>
                    </div>
                    <div class="detail-row">
                        <strong>{{ tt('fire.vocConcentration', 'VOC浓度(mV)') }}：</strong>
                        <span :title="currentDetail.VOC">{{ currentDetail.VOC || '--'}}</span>
                    </div>
                    <div class="detail-row">
                        <strong>{{ tt('fire.smokeSensorStatus', '烟雾传感器状态') }}：</strong>
                        <span :title="getNoFaultWithFaultText(currentDetail.SmokeSensorState)">{{ getNoFaultWithFaultText(currentDetail.SmokeSensorState) }}</span>
                    </div>
                    <div class="detail-row">
                        <strong>{{ tt('fire.smokeAlarm', '烟雾预警') }}：</strong>
                        <span :title="getWarningStateText(currentDetail.SmokeAlarm)">{{ getWarningStateText(currentDetail.SmokeAlarm) }}</span>
                    </div>
                    <div class="detail-row">
                        <strong>{{ tt('fire.alarmLevel', '报警等级') }}：</strong>
                        <span :title="getAlarmLevelText(currentDetail.AlarmLevel)">{{ getAlarmLevelText(currentDetail.AlarmLevel) }}</span>
                    </div>
                    <div class="detail-row">
                        <strong>{{ tt('fire.faultLevel', '故障等级') }}：</strong>
                        <span :title="getFaultLevelText(currentDetail.FaultLevel)">{{ getFaultLevelText(currentDetail.FaultLevel) }}</span>
                    </div>
                    <div class="detail-row">
                        <strong>{{ tt('fire.thermalImagerOnlineStatus', '热成像仪在线状态') }}：</strong>
                        <span :title="getOnlineStateText(currentDetail.FMTNetState)">{{ getOnlineStateText(currentDetail.FMTNetState) }}</span>
                    </div>
                    <div class="detail-row">
                        <strong>{{ tt('fire.regionTemperature', '区域温度(℃)') }}：</strong>
                        <span :title="currentDetail.RegionTemperature">{{ currentDetail.RegionTemperature || '--'}}</span>
                    </div>
                    <div class="detail-row">
                        <strong>{{ tt('fire.regionMaxTempDiff', '区域最大温差(℃)') }}：</strong>
                        <span :title="currentDetail.RegionTempDiff">{{ currentDetail.RegionTempDiff || '--'}}</span>
                    </div>
                    <div class="detail-row">
                        <strong>{{ tt('fire.regionMaxTempRise', '区域最大温升(℃)') }}：</strong>
                        <span :title="currentDetail.RegionTempRise">{{ currentDetail.RegionTempRise || '--'}}</span>
                    </div>
                    <div class="detail-row">
                        <strong>{{ tt('fire.regionMaxTemperature', '区域最大温度(℃)') }}：</strong>
                        <span :title="currentDetail.RegionTempMax">{{ currentDetail.RegionTempMax || '--'}}</span>
                    </div>
                </div>

                <div v-if="currentDetail.ModuleCode == 'AGV'">
                    <div class="detail-row detail-row-split">
                        <strong>{{ tt('fire.currentActionStatus', '当前动作状态') }}：</strong>
                        <span :title="getActionStateText(currentDetail.ActionState)">{{ getActionStateText(currentDetail.ActionState) }}</span>
                    </div>
                    <div class="detail-row">
                        <strong>{{ tt('fire.xPosition', 'X位置(mm)') }}：</strong>
                        <span :title="currentDetail.XPosition">{{ currentDetail.XPosition || '--' }}</span>
                    </div>
                    <div class="detail-row">
                        <strong>{{ tt('fire.yPosition', 'Y位置(mm)') }}：</strong>
                        <span :title="currentDetail.YPosition">{{ currentDetail.YPosition || '--' }}</span>
                    </div>
                    <div class="detail-row">
                        <strong>{{ tt('fire.agvMoveSpeed', 'AGV移动速度(mm/s)') }}：</strong>
                        <span :title="currentDetail.MoveSpeed">{{ currentDetail.MoveSpeed || '--'}}</span>
                    </div>
                    <div class="detail-row">
                        <strong>{{ tt('fire.batteryLevel', '电池电量(%)') }}：</strong>
                        <span :title="currentDetail.Battery">{{ currentDetail.Battery }}</span>
                    </div>
                </div>

                <div v-if="currentDetail.ModuleCode == 'FCS'">
                    <div class="detail-row detail-row-split">
                        <strong>{{ tt('fire.fireIsolationSwitchStatus', '消防隔离室启停状态') }}：</strong>
                        <span :title="getStartCloseText(currentDetail.IsSystemOn)">{{ getStartCloseText(currentDetail.IsSystemOn) }}</span>
                    </div>
                    <div class="detail-row">
                        <strong>{{ tt('fire.personnelDetectionStatus', '人员检测状态') }}：</strong>
                        <span :title="getPersonStateText(currentDetail.Person)">{{ getPersonStateText(currentDetail.Person) }}</span>
                    </div>
                    <div class="detail-row">
                        <strong>{{ tt('fire.flameDetectionStatus', '火焰检测状态') }}：</strong>
                        <span :title="getFlameStateText(currentDetail.Flame)">{{ getFlameStateText(currentDetail.Flame) }}</span>
                    </div>
                    <div class="detail-row">
                        <strong>{{ tt('fire.workStatus', '工作状态') }}：</strong>
                        <span :title="getWorkStateText(currentDetail.WorkState)">{{ getWorkStateText(currentDetail.WorkState) }}</span>
                    </div>
                    <div class="detail-row">
                        <strong>{{ tt('fire.rollerDoorStatus', '卷帘门状态') }}：</strong>
                        <span :title="getOpenCloseStateText(currentDetail.RollerDoor, 2, 1)">{{ getOpenCloseStateText(currentDetail.RollerDoor, 2, 1) }}</span>
                    </div>
                    <div class="detail-row">
                        <strong>{{ tt('fire.barrierStatus', '围挡状态') }}：</strong>
                        <span :title="getBarrierStateText(currentDetail.Barrier)">{{ getBarrierStateText(currentDetail.Barrier) }}</span>
                    </div>
                    <div class="detail-row">
                        <strong>{{ tt('fire.agvChargerStatus', 'AGV充电器状态') }}：</strong>
                        <span :title="getOpenCloseStateText(currentDetail.AGVCharger)">{{ getOpenCloseStateText(currentDetail.AGVCharger) }}</span>
                    </div>
                    <div class="detail-row">
                        <strong>{{ tt('fire.poolLevelStatus', '水池水位状态') }}：</strong>
                        <span :title="getPoolLevelText(currentDetail.PoolLevel)">{{ getPoolLevelText(currentDetail.PoolLevel) }}</span>
                    </div>
                    <div class="detail-row">
                        <strong>{{ tt('fire.fireWaterValveStatus', '消防水阀状态') }}：</strong>
                        <span :title="getOpenCloseStateText(currentDetail.FireWaterValve, 2, 1)">{{ getOpenCloseStateText(currentDetail.FireWaterValve, 2, 1) }}</span>
                    </div>
                    <div class="detail-row">
                        <strong>{{ tt('fire.topSprayStatus', '顶部喷淋运行状态') }}：</strong>
                        <span :title="getTopSprayText(currentDetail.TopSpray)">{{ getTopSprayText(currentDetail.TopSpray) }}</span>
                    </div>
                    
                </div>

                <div v-if="currentDetail.ModuleCode == 'Camera'">
                    <div class="detail-row detail-row-split">
                        <strong>{{ tt('fire.deviceOnlineStatus', '设备在线状态') }}：</strong>
                        <span :title="getOnlineStateText(currentDetail.NetState)">{{ getOnlineStateText(currentDetail.NetState) }}</span>
                    </div>
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
  fireDataValue: {
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
const fireListValue = ref([]);
watch(
  () => props.fireDataValue,
  (newVal) => {
    console.log('props.fireDataValue', props.fireDataValue);
    fireListValue.value = newVal?.ModuleList || [];
    console.log('fireList.value', fireListValue.value);
  },
  { immediate: true } // 如果希望组件挂载时也执行一次
);

const Funcs = window.Funcs;
const NetState = {
  0: tt('runtime.initial', '初始'),
  1: tt('runtime.online', '在线'),
  2: tt('runtime.offline', '离线'),
};
const fireDataVisible = ref(false);
const currentDetail = ref(null);
const isOnline = ref(false);
const isOffline = ref(false);
const FaultCode = {
  0: tt('runtime.noFault', '无故障'),
  // 1:'摇臂故障',
  // 2:'电池电量不足',
  // 3:'地磁故障',
  // 4:'超声波故障',
  // 5:'电机故障',
  255: tt('runtime.otherFault', '其他故障'),
};
const WarningCode = {
  0: tt('runtime.noWarning', '无预警'),
  // 1:'低电量预警',
  // 2:'地锁受外力压迫',
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

const getFireActionItems = () => ([
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

const getParkingStateText = (value) => {
  if (value == 1) return tt('runtime.hasCar', '有车');
  if (value == 2) return tt('runtime.noCar', '无车');
  return tt('fire.vehicleStatusUnknown', '车辆状态未知');
};

const getOpenCloseStateText = (value, openValue = 1, closeValue = 2) => {
  if (value == openValue) return tt('common.open', '打开');
  if (value == closeValue) return tt('common.close', '关闭');
  return tt('runtime.unknown', '未知');
};

const getStartCloseText = (value) => (value ? tt('common.start', '启动') : tt('common.close', '关闭'));

const getFaultPresenceText = (value) => {
  if (value == 2) return tt('runtime.withFault', '有故障');
  if (value == 1) return tt('runtime.noFault', '无故障');
  return tt('runtime.unknown', '未知');
};

const getTaskStateText = (value) => {
  if (value == 1) return tt('fire.taskPresent', '有任务');
  if (value == 0) return tt('fire.noTask', '无任务');
  return tt('runtime.unknown', '未知');
};

const getOnlineStateText = (value, onlineValue = 1, offlineValue = 2) => {
  if (value == onlineValue) return tt('runtime.online', '在线');
  if (value == offlineValue) return tt('runtime.offline', '离线');
  return tt('runtime.unknown', '未知');
};

const getNoFaultWithFaultText = (value) => {
  if (value == 1) return tt('runtime.noFault', '无故障');
  if (value == 2) return tt('runtime.withFault', '有故障');
  return tt('runtime.unknown', '未知');
};

const getWarningStateText = (value) => {
  if (value == 1) return tt('runtime.noWarning', '无预警');
  if (value == 2) return tt('runtime.withWarning', '有预警');
  return tt('runtime.unknown', '未知');
};

const getAlarmLevelText = (value) => {
  if (value == 1) return tt('fire.level1', '一级');
  if (value == 2) return tt('fire.level2', '二级');
  if (value == 3) return tt('fire.level3', '三级');
  if (value == 4) return tt('fire.level4', '四级');
  return tt('runtime.unknown', '未知');
};

const getFaultLevelText = (value) => {
  if (value == 1) return tt('fire.valveStarted', '分阀已启动');
  if (value == 2) return tt('fire.sensorFault', '传感器故障');
  if (value == 3) return tt('fire.hardwareFault', '硬件故障');
  return tt('runtime.unknown', '未知');
};

const getActionStateText = (value) => {
  if (value == 1) return tt('fire.idle', '空闲');
  if (value == 2) return tt('runtime.chargingState', '充电中');
  if (value == 3) return tt('fire.waiting', '等待中');
  if (value == 4) return tt('fire.retrievingCar', '取车中');
  return tt('runtime.unknown', '未知');
};

const getPersonStateText = (value) => {
  if (value == 1) return tt('fire.noPerson', '无人');
  if (value == 2) return tt('fire.hasPerson', '有人');
  return tt('runtime.unknown', '未知');
};

const getFlameStateText = (value) => {
  if (value == 1) return tt('fire.normal', '正常');
  if (value == 2) return tt('fire.flameDetected', '有火焰');
  return tt('runtime.unknown', '未知');
};

const getWorkStateText = (value) => {
  if (value == 1) return tt('fire.idle', '空闲');
  if (value == 2) return tt('fire.waitingVehicleTransfer', '等待车辆搬运');
  if (value == 3) return tt('fire.vehicleFirefighting', '车辆消防中');
  if (value == 4) return tt('fire.fireComplete', '消防完成');
  return tt('runtime.unknown', '未知');
};

const getBarrierStateText = (value) => {
  if (value == 1) return tt('fire.folded', '收起');
  if (value == 2) return tt('fire.lowered', '放下');
  return tt('runtime.unknown', '未知');
};

const getPoolLevelText = (value) => {
  if (value == 1) return tt('fire.lowWater', '低水位');
  if (value == 2) return tt('fire.mediumWater', '中水位');
  if (value == 3) return tt('fire.highWater', '高水位');
  return tt('runtime.unknown', '未知');
};

const getTopSprayText = (value) => {
  if (value == 1) return tt('fire.notRunning', '未运行');
  if (value == 2) return tt('fire.running', '运行');
  return tt('runtime.unknown', '未知');
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
  fireDataVisible.value = true;
  isOnline.value =  item.NetState === 1;
  isOffline.value =  item.NetState === 2;
};
const closeDetail = () => {
  fireDataVisible.value = false;
  currentDetail.value = null;
};


async function btnGroup_lock_Click_设备日志(item) {
  jumpLogPage(item);
}
async function btnGroup_lock_btnGroupItemClick(action,row,item) {
  if(!action)return;
  const actions = {
    'Click_设备日志':btnGroup_lock_Click_设备日志,
  };
  actions[ 'Click_'+action.code ] && actions[ 'Click_'+action.code ](item);
}
const changeLockState = async (device,actionType) => {
  if(device.NetState != 1){
    Funcs.Notify(tt('runtime.prompt', '提示'), tt('fire.onlineOnlyDeviceOperation', '当设备状态为在线时才允许进行操作！'), 'error');
    return;
  }
  const actionText = actionType == 1 ? tt('common.close', '关闭') : tt('common.open', '打开');
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
      Funcs.Notify(tt('runtime.prompt', '提示'), tt('fire.deviceOperationError', '设备操作有误'), 'error');
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
    // window.open(`${window.TeldWebConfig.ResourceURL.replace('resource','fas')}/gencode/dms/Page_LogListStandard?InParam_Tab=${0}&InParam_DeviceInfo=${device.DeviceKey}&InParam_StaID=${props.stationID}&InParam_StaName=${props.stationName}`)
  }
};

const emit = defineEmits([ 'fireEvent' ]);
const sendToParentRefresh = () => {
  emit('fireEvent');
};

</script>
