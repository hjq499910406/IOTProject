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
        constValue='边缘控制器'
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
                                <!-- <span class="lock-tag" :class="{
                                    'lock-unknown': item.ParkingState != 1 && item.ParkingState != 2,
                                    'lock-up': item.ParkingState == 1 || item.ParkingState == 2
                                }">{{ item.ParkingState == 1 ? '有车' : item.ParkingState == 2 ? '无车' : '车辆状态未知' }}</span>
                                 <span class="lock-tag" :class="{
                                    'lock-unknown': item.LockState != 1 && item.LockState != 2,
                                    'lock-up': item.LockState == 1 || item.LockState == 2
                                }">锁{{ item.LockState == 1 ? '升起' : item.LockState == 2 ? '降下' : '状态未知' }}</span> -->
                            </div>
                            <div class="deviceCardTimeStamp">更新时间: {{item.LastUpdateDateTime || '--'}}</div>
                            
                        </div>
                    </div>
                    <div class="deviceBtn">
                        <t-button
                            :ref='el=>Widget["fasr_button_upLock"]=el'
                            style='opacity:100%;flex: 3;'
                            class='fasr_button_upLock tr-button-default'
                            label='关闭'
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
                            label='打开'
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
                            :staticItems='[
                                // {
                                //     "label": "重启",
                                //     "value": "1",
                                //     "icon": "fas dx-icon icon-t-redo",
                                //     "type": "default",
                                //     "hint": "重启",
                                //     "visible": true,
                                //     "disabled": item.NetState == 1,
                                //     "code": "btnredo",
                                // },
                                // {
                                //     "label": "休眠",
                                //     "value": "2",
                                //     "icon": "fas dx-icon icon-t-unlink",
                                //     "type": "default",
                                //     "hint": "休眠",
                                //     "visible": item.DormancyState != 1,
                                //     "disabled": item.DormancyState != 2 || item.NetState != 1,
                                //     "code": "btnsleep",
                                // },
                                // {
                                //     "label": "唤醒",
                                //     "value": "3",
                                //     "icon": "fas dx-icon icon-t-link",
                                //     "type": "default",
                                //     "hint": "唤醒",
                                //     "visible": item.DormancyState == 1,
                                //     "disabled": item.NetState != 1,
                                //     "code": "btnwake",
                                // },
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
        constValue='车位消防盒子'
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
                                <!-- <span class="lock-tag" :class="{
                                    'lock-unknown': item.ParkingState != 1 && item.ParkingState != 2,
                                    'lock-up': item.ParkingState == 1 || item.ParkingState == 2
                                }">{{ item.ParkingState == 1 ? '有车' : item.ParkingState == 2 ? '无车' : '车辆状态未知' }}</span>
                                 <span class="lock-tag" :class="{
                                    'lock-unknown': item.LockState != 1 && item.LockState != 2,
                                    'lock-up': item.LockState == 1 || item.LockState == 2
                                }">锁{{ item.LockState == 1 ? '升起' : item.LockState == 2 ? '降下' : '状态未知' }}</span> -->
                            </div>
                            <div class="deviceCardTimeStamp">更新时间: {{item.LastUpdateDateTime || '--'}}</div>
                            
                        </div>
                    </div>
                    <div class="deviceBtn">
                        <t-button
                            :ref='el=>Widget["fasr_button_upLock"]=el'
                            style='opacity:100%;flex: 3;'
                            class='fasr_button_upLock tr-button-default'
                            label='关闭'
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
                            label='打开'
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
                            :staticItems='[
                                // {
                                //     "label": "重启",
                                //     "value": "1",
                                //     "icon": "fas dx-icon icon-t-redo",
                                //     "type": "default",
                                //     "hint": "重启",
                                //     "visible": true,
                                //     "disabled": item.NetState == 1,
                                //     "code": "btnredo",
                                // },
                                // {
                                //     "label": "休眠",
                                //     "value": "2",
                                //     "icon": "fas dx-icon icon-t-unlink",
                                //     "type": "default",
                                //     "hint": "休眠",
                                //     "visible": item.DormancyState != 1,
                                //     "disabled": item.DormancyState != 2 || item.NetState != 1,
                                //     "code": "btnsleep",
                                // },
                                // {
                                //     "label": "唤醒",
                                //     "value": "3",
                                //     "icon": "fas dx-icon icon-t-link",
                                //     "type": "default",
                                //     "hint": "唤醒",
                                //     "visible": item.DormancyState == 1,
                                //     "disabled": item.NetState != 1,
                                //     "code": "btnwake",
                                // },
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
        constValue='移车机器人'
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
                                <!-- <span class="lock-tag" :class="{
                                    'lock-unknown': item.ParkingState != 1 && item.ParkingState != 2,
                                    'lock-up': item.ParkingState == 1 || item.ParkingState == 2
                                }">{{ item.ParkingState == 1 ? '有车' : item.ParkingState == 2 ? '无车' : '车辆状态未知' }}</span>
                                 <span class="lock-tag" :class="{
                                    'lock-unknown': item.LockState != 1 && item.LockState != 2,
                                    'lock-up': item.LockState == 1 || item.LockState == 2
                                }">锁{{ item.LockState == 1 ? '升起' : item.LockState == 2 ? '降下' : '状态未知' }}</span> -->
                            </div>
                            <div class="deviceCardTimeStamp">更新时间: {{item.LastUpdateDateTime || '--'}}</div>
                            
                        </div>
                    </div>
                    <div class="deviceBtn">
                        <t-button
                            :ref='el=>Widget["fasr_button_upLock"]=el'
                            style='opacity:100%;flex: 3;'
                            class='fasr_button_upLock tr-button-default'
                            label='关闭'
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
                            label='打开'
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
                            :staticItems='[
                                // {
                                //     "label": "重启",
                                //     "value": "1",
                                //     "icon": "fas dx-icon icon-t-redo",
                                //     "type": "default",
                                //     "hint": "重启",
                                //     "visible": true,
                                //     "disabled": item.NetState == 1,
                                //     "code": "btnredo",
                                // },
                                // {
                                //     "label": "休眠",
                                //     "value": "2",
                                //     "icon": "fas dx-icon icon-t-unlink",
                                //     "type": "default",
                                //     "hint": "休眠",
                                //     "visible": item.DormancyState != 1,
                                //     "disabled": item.DormancyState != 2 || item.NetState != 1,
                                //     "code": "btnsleep",
                                // },
                                // {
                                //     "label": "唤醒",
                                //     "value": "3",
                                //     "icon": "fas dx-icon icon-t-link",
                                //     "type": "default",
                                //     "hint": "唤醒",
                                //     "visible": item.DormancyState == 1,
                                //     "disabled": item.NetState != 1,
                                //     "code": "btnwake",
                                // },
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
        constValue='消防隔离室'
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
                                <!-- <span class="lock-tag" :class="{
                                    'lock-unknown': item.ParkingState != 1 && item.ParkingState != 2,
                                    'lock-up': item.ParkingState == 1 || item.ParkingState == 2
                                }">{{ item.ParkingState == 1 ? '有车' : item.ParkingState == 2 ? '无车' : '车辆状态未知' }}</span>
                                 <span class="lock-tag" :class="{
                                    'lock-unknown': item.LockState != 1 && item.LockState != 2,
                                    'lock-up': item.LockState == 1 || item.LockState == 2
                                }">锁{{ item.LockState == 1 ? '升起' : item.LockState == 2 ? '降下' : '状态未知' }}</span> -->
                            </div>
                            <div class="deviceCardTimeStamp">更新时间: {{item.LastUpdateDateTime || '--'}}</div>
                            
                        </div>
                    </div>
                    <div class="deviceBtn">
                        <t-button
                            :ref='el=>Widget["fasr_button_upLock"]=el'
                            style='opacity:100%;flex: 3;'
                            class='fasr_button_upLock tr-button-default'
                            label='关闭'
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
                            label='打开'
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
                            :staticItems='[
                                // {
                                //     "label": "重启",
                                //     "value": "1",
                                //     "icon": "fas dx-icon icon-t-redo",
                                //     "type": "default",
                                //     "hint": "重启",
                                //     "visible": true,
                                //     "disabled": item.NetState == 1,
                                //     "code": "btnredo",
                                // },
                                // {
                                //     "label": "休眠",
                                //     "value": "2",
                                //     "icon": "fas dx-icon icon-t-unlink",
                                //     "type": "default",
                                //     "hint": "休眠",
                                //     "visible": item.DormancyState != 1,
                                //     "disabled": item.DormancyState != 2 || item.NetState != 1,
                                //     "code": "btnsleep",
                                // },
                                // {
                                //     "label": "唤醒",
                                //     "value": "3",
                                //     "icon": "fas dx-icon icon-t-link",
                                //     "type": "default",
                                //     "hint": "唤醒",
                                //     "visible": item.DormancyState == 1,
                                //     "disabled": item.NetState != 1,
                                //     "code": "btnwake",
                                // },
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
        constValue='消防摄像头'
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
                                <!-- <span class="lock-tag" :class="{
                                    'lock-unknown': item.ParkingState != 1 && item.ParkingState != 2,
                                    'lock-up': item.ParkingState == 1 || item.ParkingState == 2
                                }">{{ item.ParkingState == 1 ? '有车' : item.ParkingState == 2 ? '无车' : '车辆状态未知' }}</span>
                                 <span class="lock-tag" :class="{
                                    'lock-unknown': item.LockState != 1 && item.LockState != 2,
                                    'lock-up': item.LockState == 1 || item.LockState == 2
                                }">锁{{ item.LockState == 1 ? '升起' : item.LockState == 2 ? '降下' : '状态未知' }}</span> -->
                            </div>
                            <div class="deviceCardTimeStamp">更新时间: {{item.LastUpdateDateTime || '--'}}</div>
                            
                        </div>
                    </div>
                    <div class="deviceBtn">
                        <t-button
                            :ref='el=>Widget["fasr_button_upLock"]=el'
                            style='opacity:100%;flex: 3;'
                            class='fasr_button_upLock tr-button-default'
                            label='关闭'
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
                            label='打开'
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
                            :staticItems='[
                                // {
                                //     "label": "重启",
                                //     "value": "1",
                                //     "icon": "fas dx-icon icon-t-redo",
                                //     "type": "default",
                                //     "hint": "重启",
                                //     "visible": true,
                                //     "disabled": item.NetState == 1,
                                //     "code": "btnredo",
                                // },
                                // {
                                //     "label": "休眠",
                                //     "value": "2",
                                //     "icon": "fas dx-icon icon-t-unlink",
                                //     "type": "default",
                                //     "hint": "休眠",
                                //     "visible": item.DormancyState != 1,
                                //     "disabled": item.DormancyState != 2 || item.NetState != 1,
                                //     "code": "btnsleep",
                                // },
                                // {
                                //     "label": "唤醒",
                                //     "value": "3",
                                //     "icon": "fas dx-icon icon-t-link",
                                //     "type": "default",
                                //     "hint": "唤醒",
                                //     "visible": item.DormancyState == 1,
                                //     "disabled": item.NetState != 1,
                                //     "code": "btnwake",
                                // },
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
                            @Click_设备日志='btnGroup_lock_Click_设备日志'
                            @btnGroupItemClick='(action)=>btnGroup_lock_btnGroupItemClick(action, row,item)'
                            >
                        </t-btn-group>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div v-if="fireListValue.length == 0" style="text-align: center;margin: 20px 0px;width: 100%;">无记录</div>
    <div v-if="fireDataVisible" class="detail-modal">
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
                    <strong>{{ '模组名称' }}：</strong>
                    <span :title="currentDetail.ModuleName">{{ currentDetail.ModuleName || '--'}}</span>
                </div>
                <div class="detail-row">
                    <strong>{{ '设备模组名称' }}：</strong>
                    <span :title="currentDetail.DeviceModuleName">{{ currentDetail.DeviceModuleName || '--'}}</span>
                </div>
                <div class="detail-row">
                    <strong>{{ '系统状态' }}：</strong>
                    <span :title="currentDetail.SystemState == 1 ? '开启' : currentDetail.SystemState == 2 ? '关闭' : '未知'">{{ currentDetail.SystemState == 1 ? '开启' : currentDetail.SystemState == 2 ? '关闭' : '未知' }}</span>
                </div>
                <div class="detail-row">
                    <strong>{{ '故障状态' }}：</strong>
                    <span :title="currentDetail.FaultState == 2 ? '有故障' : currentDetail.FaultState == 1 ? '无故障' : '未知'">{{ currentDetail.FaultState == 2 ? '有故障' : currentDetail.FaultState == 1 ? '无故障' : '未知' }}</span>
                </div>
                <div class="detail-row">
                    <strong>{{ '故障描述' }}：</strong>
                    <span :title="currentDetail.FaultCode">{{ FaultCode[currentDetail.FaultCode] || '--' }}</span>
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

                <div v-if="currentDetail.ModuleCode == 'ECS'">
                    <div class="detail-row detail-row-split">
                        <strong>{{ 'SN号' }}：</strong>
                        <span :title="currentDetail.SN">{{ currentDetail.SN || '--'}}</span>
                    </div>
                    <div class="detail-row">
                        <strong>{{ '任务编号' }}：</strong>
                        <span :title="currentDetail.TaskNumber">{{ currentDetail.TaskNumber || '--' }}</span>
                    </div>
                    <div class="detail-row">
                        <strong>{{ '车位编号' }}：</strong>
                        <span :title="currentDetail.ParkingNumber">{{ currentDetail.ParkingNumber || '--' }}</span>
                    </div>
                    <div class="detail-row">
                        <strong>{{ '任务状态' }}：</strong>
                        <span :title="currentDetail.TaskState == 1 ? '有任务' : currentDetail.TaskState == 0 ? '无任务' : '未知'">{{ currentDetail.TaskState == 1 ? '有任务' : currentDetail.TaskState == 0 ? '无任务' : '未知' }}</span>
                    </div>
                    <div class="detail-row">
                        <strong>{{ '消防系统启停状态' }}：</strong>
                        <span :title="currentDetail.IsSystemOn ? '启动' : '关闭'">{{ currentDetail.IsSystemOn ? '启动' : '关闭' }}</span>
                    </div>
                </div>

                <div v-if="currentDetail.ModuleCode == 'FMU'">
                    <div class="detail-row detail-row-split">
                        <strong>{{ '车位编号' }}：</strong>
                        <span :title="currentDetail.ParkingNumber">{{ currentDetail.ParkingNumber || '--' }}</span>
                    </div>
                    <div class="detail-row">
                        <strong>{{ '火灾探测装置在线状态' }}：</strong>
                        <span :title="currentDetail.FMCNetState == 1 ? '在线' : currentDetail.FMCNetState == 0 ? '离线' : '未知'">{{ currentDetail.FMCNetState == 1 ? '在线' : currentDetail.FMCNetState == 0 ? '离线' : '未知' }}</span>
                    </div>
                    <div class="detail-row">
                        <strong>{{ '温度传感器1状态' }}：</strong>
                        <span :title="currentDetail.TempSensor1State == 1 ? '无故障' : currentDetail.TempSensor1State == 2 ? '有故障' : '未知'">{{ currentDetail.TempSensor1State == 1 ? '无故障' : currentDetail.TempSensor1State == 2 ? '有故障' : '未知' }}</span>
                    </div>
                    <div class="detail-row">
                        <strong>{{ '环境温度1(℃)' }}：</strong>
                        <span :title="currentDetail.Temperature1">{{ currentDetail.Temperature1 || '--'}}</span>
                    </div>
                    <div class="detail-row">
                        <strong>{{ '温度传感器2状态' }}：</strong>
                        <span :title="currentDetail.TempSensor2State == 1 ? '无故障' : currentDetail.TempSensor2State == 2 ? '有故障' : '未知'">{{ currentDetail.TempSensor2State == 1 ? '无故障' : currentDetail.TempSensor2State == 2 ? '有故障' : '未知' }}</span>
                    </div>
                    <div class="detail-row">
                        <strong>{{ '环境温度2(℃)' }}：</strong>
                        <span :title="currentDetail.Temperature2">{{ currentDetail.Temperature2 || '--'}}</span>
                    </div>
                    <div class="detail-row">
                        <strong>{{ 'CO传感器状态' }}：</strong>
                        <span :title="currentDetail.COSensorState == 1 ? '无故障' : currentDetail.COSensorState == 2 ? '有故障' : '未知'">{{ currentDetail.COSensorState == 1 ? '无故障' : currentDetail.COSensorState == 2 ? '有故障' : '未知' }}</span>
                    </div>
                    <div class="detail-row">
                        <strong>{{ '一氧化碳浓度(ppm)' }}：</strong>
                        <span :title="currentDetail.CO">{{ currentDetail.CO || '--'}}</span>
                    </div>
                    <div class="detail-row">
                        <strong>{{ 'VOC传感器状态' }}：</strong>
                        <span :title="currentDetail.VOCSensorState == 1 ? '无故障' : currentDetail.VOCSensorState == 2 ? '有故障' : '未知'">{{ currentDetail.VOCSensorState == 1 ? '无故障' : currentDetail.VOCSensorState == 2 ? '有故障' : '未知' }}</span>
                    </div>
                    <div class="detail-row">
                        <strong>{{ 'VOC浓度(mV)' }}：</strong>
                        <span :title="currentDetail.VOC">{{ currentDetail.VOC || '--'}}</span>
                    </div>
                    <div class="detail-row">
                        <strong>{{ '烟雾传感器状态' }}：</strong>
                        <span :title="currentDetail.SmokeSensorState == 1 ? '无故障' : currentDetail.SmokeSensorState == 2 ? '有故障' : '未知'">{{ currentDetail.SmokeSensorState == 1 ? '无故障' : currentDetail.SmokeSensorState == 2 ? '有故障' : '未知' }}</span>
                    </div>
                    <div class="detail-row">
                        <strong>{{ '烟雾预警' }}：</strong>
                        <span :title="currentDetail.SmokeAlarm == 1 ? '无预警' : currentDetail.SmokeSensorState == 2 ? '有预警' : '未知'">{{ currentDetail.SmokeSensorState == 1 ? '无预警' : currentDetail.SmokeSensorState == 2 ? '有预警' : '未知' }}</span>
                    </div>
                    <div class="detail-row">
                        <strong>{{ '报警等级' }}：</strong>
                        <span :title="currentDetail.AlarmLevel == 1 ? '一级' : currentDetail.AlarmLevel == 2 ? '二级' : currentDetail.AlarmLevel == 3 ? '三级' : currentDetail.AlarmLevel == 4 ? '四级' : '未知'">{{ currentDetail.AlarmLevel == 1 ? '一级' : currentDetail.AlarmLevel == 2 ? '二级' : currentDetail.AlarmLevel == 3 ? '三级' : currentDetail.AlarmLevel == 4 ? '四级' : '未知' }}</span>
                    </div>
                    <div class="detail-row">
                        <strong>{{ '故障等级' }}：</strong>
                        <span :title="currentDetail.FaultLevel == 1 ? '分阀已启动' : currentDetail.FaultLevel == 2 ? '传感器故障' : currentDetail.FaultLevel == 3 ? '硬件故障' : '未知'">{{ currentDetail.FaultLevel == 1 ? '分阀已启动' : currentDetail.FaultLevel == 2 ? '传感器故障' : currentDetail.FaultLevel == 3 ? '硬件故障' : '未知' }}</span>
                    </div>
                    <div class="detail-row">
                        <strong>{{ '热成像仪在线状态' }}：</strong>
                        <span :title="currentDetail.FMTNetState == 1 ? '在线' : currentDetail.FMTNetState == 2 ? '离线' : '未知'">{{ currentDetail.FMTNetState == 1 ? '在线' : currentDetail.FMTNetState == 2 ? '离线' : '未知' }}</span>
                    </div>
                    <div class="detail-row">
                        <strong>{{ '区域温度(℃)' }}：</strong>
                        <span :title="currentDetail.RegionTemperature">{{ currentDetail.RegionTemperature || '--'}}</span>
                    </div>
                    <div class="detail-row">
                        <strong>{{ '区域最大温差(℃)' }}：</strong>
                        <span :title="currentDetail.RegionTempDiff">{{ currentDetail.RegionTempDiff || '--'}}</span>
                    </div>
                    <div class="detail-row">
                        <strong>{{ '区域最大温升(℃)' }}：</strong>
                        <span :title="currentDetail.RegionTempRise">{{ currentDetail.RegionTempRise || '--'}}</span>
                    </div>
                    <div class="detail-row">
                        <strong>{{ '区域最大温度(℃)' }}：</strong>
                        <span :title="currentDetail.RegionTempMax">{{ currentDetail.RegionTempMax || '--'}}</span>
                    </div>
                </div>

                <div v-if="currentDetail.ModuleCode == 'AGV'">
                    <div class="detail-row detail-row-split">
                        <strong>{{ '当前动作状态' }}：</strong>
                        <span :title="currentDetail.ActionState == 1 ? '空闲' : currentDetail.ActionState == 2 ? '充电中' : currentDetail.ActionState == 3 ? '等待中' : currentDetail.ActionState == 4 ? '取车中' : '未知'">{{ currentDetail.ActionState == 1 ? '空闲' : currentDetail.ActionState == 2 ? '充电中' : currentDetail.ActionState == 3 ? '等待中' : currentDetail.ActionState == 4 ? '取车中' : '未知' }}</span>
                    </div>
                    <div class="detail-row">
                        <strong>{{ 'X位置(mm)' }}：</strong>
                        <span :title="currentDetail.XPosition">{{ currentDetail.XPosition || '--' }}</span>
                    </div>
                    <div class="detail-row">
                        <strong>{{ 'Y位置(mm)' }}：</strong>
                        <span :title="currentDetail.YPosition">{{ currentDetail.YPosition || '--' }}</span>
                    </div>
                    <div class="detail-row">
                        <strong>{{ 'AGV移动速度(mm/s)' }}：</strong>
                        <span :title="currentDetail.MoveSpeed">{{ currentDetail.MoveSpeed || '--'}}</span>
                    </div>
                    <div class="detail-row">
                        <strong>{{ '电池电量(%)' }}：</strong>
                        <span :title="currentDetail.Battery">{{ currentDetail.Battery }}</span>
                    </div>
                </div>

                <div v-if="currentDetail.ModuleCode == 'FCS'">
                    <div class="detail-row detail-row-split">
                        <strong>{{ '消防隔离室启停状态' }}：</strong>
                        <span :title="currentDetail.IsSystemOn ? '启动' : '关闭'">{{ currentDetail.IsSystemOn ? '启动' : '关闭' }}</span>
                    </div>
                    <div class="detail-row">
                        <strong>{{ '人员检测状态' }}：</strong>
                        <span :title="currentDetail.Person == 1 ? '无人' : currentDetail.Person == 2 ? '有人' : '未知'">{{ currentDetail.Person == 1 ? '无人' : currentDetail.Person == 2 ? '有人' : '未知' }}</span>
                    </div>
                    <div class="detail-row">
                        <strong>{{ '火焰检测状态' }}：</strong>
                        <span :title="currentDetail.Flame == 1 ? '正常' : currentDetail.Flame == 2 ? '有火焰' : '未知'">{{ currentDetail.Flame == 1 ? '正常' : currentDetail.Flame == 2 ? '有火焰' : '未知' }}</span>
                    </div>
                    <div class="detail-row">
                        <strong>{{ '工作状态' }}：</strong>
                        <span :title="currentDetail.WorkState == 1 ? '空闲' : currentDetail.WorkState == 2 ? '等待车辆搬运' : currentDetail.WorkState == 3 ? '车辆消防中' : currentDetail.WorkState == 4 ? '消防完成' : '未知'">{{ currentDetail.WorkState == 1 ? '空闲' : currentDetail.WorkState == 2 ? '等待车辆搬运' : currentDetail.WorkState == 3 ? '车辆消防中' : currentDetail.WorkState == 4 ? '消防完成' : '未知' }}</span>
                    </div>
                    <div class="detail-row">
                        <strong>{{ '卷帘门状态' }}：</strong>
                        <span :title="currentDetail.RollerDoor == 1 ? '关闭' : currentDetail.RollerDoor == 2 ? '打开' : '未知'">{{ currentDetail.RollerDoor == 1 ? '关闭' : currentDetail.RollerDoor == 2 ? '打开' : '未知' }}</span>
                    </div>
                    <div class="detail-row">
                        <strong>{{ '围挡状态' }}：</strong>
                        <span :title="currentDetail.Barrier == 1 ? '收起' : currentDetail.Barrier == 2 ? '放下' : '未知'">{{ currentDetail.Barrier == 1 ? '收起' : currentDetail.Barrier == 2 ? '放下' : '未知' }}</span>
                    </div>
                    <div class="detail-row">
                        <strong>{{ 'AGV充电器状态' }}：</strong>
                        <span :title="currentDetail.AGVCharger == 1 ? '开启' : currentDetail.AGVCharger == 2 ? '关闭' : '未知'">{{ currentDetail.AGVCharger == 1 ? '开启' : currentDetail.AGVCharger == 2 ? '关闭' : '未知' }}</span>
                    </div>
                    <div class="detail-row">
                        <strong>{{ '水池水位状态' }}：</strong>
                        <span :title="currentDetail.PoolLevel == 1 ? '低水位' : currentDetail.PoolLevel == 2 ? '中水位' : currentDetail.PoolLevel == 3 ? '高水位' : '未知'">{{ currentDetail.PoolLevel == 1 ? '低水位' : currentDetail.PoolLevel == 2 ? '中水位' : currentDetail.PoolLevel == 3 ? '高水位' : '未知' }}</span>
                    </div>
                    <div class="detail-row">
                        <strong>{{ '消防水阀状态' }}：</strong>
                        <span :title="currentDetail.FireWaterValve == 1 ? '关闭' : currentDetail.FireWaterValve == 2 ? '打开' : '未知'">{{ currentDetail.FireWaterValve == 1 ? '关闭' : currentDetail.FireWaterValve == 2 ? '打开' : '未知' }}</span>
                    </div>
                    <div class="detail-row">
                        <strong>{{ '顶部喷淋运行状态' }}：</strong>
                        <span :title="currentDetail.TopSpray == 1 ? '未运行' : currentDetail.TopSpray == 2 ? '运行' : '未知'">{{ currentDetail.TopSpray == 1 ? '未运行' : currentDetail.TopSpray == 2 ? '运行' : '未知' }}</span>
                    </div>
                    
                </div>

                <div v-if="currentDetail.ModuleCode == 'Camera'">
                    <div class="detail-row detail-row-split">
                        <strong>{{ '设备在线状态' }}：</strong>
                        <span :title="currentDetail.NetState == 1 ? '在线' : currentDetail.NetState == 2 ? '离线' : '未知'">{{ currentDetail.NetState == 1 ? '在线' : currentDetail.NetState == 2 ? '离线' : '未知' }}</span>
                    </div>
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
  0:'初始',
  1:'在线',
  2:'离线', 
};
const fireDataVisible = ref(false);
const currentDetail = ref(null);
const isOnline = ref(false);
const isOffline = ref(false);
const FaultCode = {
  0:'无故障',
  // 1:'摇臂故障',
  // 2:'电池电量不足',
  // 3:'地磁故障',
  // 4:'超声波故障',
  // 5:'电机故障',
  255:'其他故障',
};
const WarningCode = {
  0:'无预警',
  // 1:'低电量预警',
  // 2:'地锁受外力压迫',
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
    Funcs.Notify('提示', '当设备状态为在线时才允许进行操作！', 'error');
    return;
  }
  const actionText = actionType == 1 ? '关闭' : '打开';
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
      Funcs.Notify('提示', '设备操作有误', 'error');
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