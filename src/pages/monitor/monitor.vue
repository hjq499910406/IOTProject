<template>
    <div class='Page_104910'
         :class="IsDispatchMonitor && tabIndex == 0 ? 'DispatchTab' : ''">
        <div v-if="!IsPC"
             class="mobileTitle">
            <i class="icon-t-left-outlined"
               @click='backIconBtn()'>
            </i>
            {{ IsDispatchMonitor ? '监控调度' : '设备监控' }}
        </div>
        <div :ref='el => Widget["LayoutGrid_1c95c5"] = el'
             style='display:flex;align-items: center; '
             class='LayoutGrid_1c95c5 tr-form-background row tabDiv'
             instanceCode='LayoutGrid_1c95c5'
             rowGap=''
             columnGap=''
             responsive='pc-mobile-gear'>
            <t-icon v-if="ShowBackHeader && IsPC"
                    :ref='el=>Widget["fasr_icon_b49a31"]=el'
                    style='opacity:100%;    cursor: pointer;margin-right: 12px;'
                    class='fasr_icon_b49a31 tr-icon-default'
                    instanceCode='fasr_icon_b49a31'
                    size='16px'
                    color='rgba(var(--t-color-rgb),.8)'
                    :tabIndex='1'
                    name='fas dx-icon icon-t-arrow-left-outlined'
                    @click='backIconBtn()'>
            </t-icon>
            <t-select-helper @confirm="searchList()"
                             v-model:text="stationName"
                             v-model:value="stationID"
                             :ref='el => Widget["fasr_select_helper_1ce26a"] = el'
                             style='max-width: 480px;'
                             :class="['fasr_select_helper_1ce26a', 'tr-input-form', !IsPC ? 'tr-input-noborder tr-select-triangleicon' : '']"
                             label='下拉帮助'
                             instanceCode='fasr_select_helper_1ce26a'
                             :hideLabel='true'
                             :searchEnable='true'
                             searchPosition='top'
                             icon='arrow'
                             :simple='false'
                             defaultDisplayValue='请选择'
                             dropDownWidthStatic='100%'
                             :historyEnable='false'
                             :historySaveCount='3'
                             helperCode=''
                             :pagination='true'
                             :countPerPage='10'
                             :maxCountPerPage='10'
                             :multiple='false'
                             :showChecked='true'
                             :maxCheckedLength='10'
                             :isSingle='false'
                             openType='bottom'
                             height='80%'
                             :columns='[
                    {
                        "ID": "6c556c22-7139-aab7-4245-e1bbce85c1d6",
                        "dataField": "ID",
                        "caption": "ID",
                        "dataType": "String",
                        "isShow": false,
                        "groupIndex": "",
                        "ExprExt": {
                            "AttrLength": 0,
                            "AttrIsRequired": false,
                            "AttrPrecision": 0,
                            "AttrDefaultValue": null,
                            "AttributeType": 0
                        },
                        "linkFormat": "",
                        "enumDisp": {},
                        "hintConf": {},
                        "expanded": true,
                        "RefSchemaExpr": "Schema.EO.EO_GetDeviceList.Attrs.ID",
                        "ValueInfo_caption": {
                            "ShowValue": "ID",
                            "ReferenceExpr": "Schema.EO.EO_GetDeviceList.Attrs.ID.Text",
                            "Type": 0
                        },
                        "ValueInfo_dataType": {
                            "ShowValue": "String",
                            "ReferenceExpr": "Schema.EO.EO_GetDeviceList.Attrs.ID.DataType",
                            "Type": 0
                        },
                        "tableAlias": "ID",
                        "originalName": "ID"
                    },
                    {
                        "ID": "2075ccb8-49ca-bde1-d82b-644badbdc589",
                        "dataField": "Code",
                        "caption": "编号",
                        "dataType": "String",
                        "isShow": true,
                        "groupIndex": "",
                        "ExprExt": {
                            "AttrLength": 0,
                            "AttrIsRequired": false,
                            "AttrPrecision": 0,
                            "AttrDefaultValue": null,
                            "AttributeType": 0
                        },
                        "linkFormat": "",
                        "enumDisp": {},
                        "hintConf": {},
                        "expanded": true,
                        "RefSchemaExpr": "Schema.EO.EO_GetDeviceList.Attrs.Code",
                        "ValueInfo_caption": {
                            "ShowValue": "编号",
                            "ReferenceExpr": "Schema.EO.EO_GetDeviceList.Attrs.Code.Text",
                            "Type": 0
                        },
                        "ValueInfo_dataType": {
                            "ShowValue": "String",
                            "ReferenceExpr": "Schema.EO.EO_GetDeviceList.Attrs.Code.DataType",
                            "Type": 0
                        },
                        "tableAlias": "Code",
                        "originalName": "Code",
                        "width": "200"
                    },
                    {
                        "ID": "6f4ef64a-27cd-288d-9e81-d6b24cb67849",
                        "dataField": "Name",
                        "caption": "名称",
                        "dataType": "String",
                        "isShow": true,
                        "groupIndex": "",
                        "ExprExt": {
                            "AttrLength": 0,
                            "AttrIsRequired": false,
                            "AttrPrecision": 0,
                            "AttrDefaultValue": null,
                            "AttributeType": 0
                        },
                        "linkFormat": "",
                        "enumDisp": {},
                        "hintConf": {},
                        "expanded": true,
                        "RefSchemaExpr": "Schema.EO.EO_GetDeviceList.Attrs.Name",
                        "ValueInfo_caption": {
                            "ShowValue": "名称",
                            "ReferenceExpr": "Schema.EO.EO_GetDeviceList.Attrs.Name.Text",
                            "Type": 0
                        },
                        "ValueInfo_dataType": {
                            "ShowValue": "String",
                            "ReferenceExpr": "Schema.EO.EO_GetDeviceList.Attrs.Name.DataType",
                            "Type": 0
                        },
                        "tableAlias": "Name",
                        "originalName": "Name",
                        "width": "200"
                    },
                    ]'
                             labelField='Name'
                             valueField='ID'
                             :iconEnable='false'
                             helpPlacement='bottom'
                             :readonly='false'
                             labelPosition='top'
                             :tabIndex='1'
                             :listDataSource='{
                    "hasValue": true,
                    "DataType": 0,
                    "DataBind": "Action.Action_IDM_GetDeviceList(FasDynamicSort,FasPageCount,FasPageIndex,request).List",
                    "DataSource": "91f96955-248c-4ac7-b42c-4c358dfb2f6d",
                    "ActionType": 2,
                    "RelatedCdoCode": "",
                    "IsMultiLang": false,
                    "DataSourceType": "Action",
                    "Parameters": [
                        {
                            "ID": "96b7bb9b-1492-8f49-6356-fd1a56f203ea",
                            "Code": "FasDynamicSort",
                            "Name": "动态排序",
                            "Value": null,
                            "dataType": "String",
                            "ExprExt": {
                                "ID": null,
                                "DisplayName": null,
                                "RefSchemaExpr": null,
                                "RefSchemaExprValue": null,
                                "Code": null,
                                "Name": null,
                                "EngineType": -1,
                                "ItemType": 0,
                                "DataResultType": null,
                                "ValueType": 0,
                                "HelpInfo": null,
                                "ExprMetaDataID": null,
                                "ExprMetaDataAlias": null,
                                "DataModels": null,
                                "IsLeaf": false,
                                "IsDelete": false,
                                "ExprExt": null,
                                "Children": [
                                    {
                                        "ID": "6c556c22-7139-aab7-4245-e1bbce85c1d6",
                                        "DisplayName": ".ID",
                                        "RefSchemaExpr": "Schema.EO.EO_GetDeviceList.Attrs.ID",
                                        "RefSchemaExprValue": "{\r\n  \"Code\": \"ID\",\r\n  \"Text\": \"ID\",\r\n  \"DataType\": \"String\",\r\n  \"Length\": 0,\r\n  \"Precision\": 0,\r\n  \"IsNullable\": true,\r\n  \"IsList\": false,\r\n  \"DefaultValue\": \"\",\r\n  \"RelatedEntityObjectID\": null\r\n}",
                                        "Code": "ID",
                                        "Name": "ID",
                                        "EngineType": -1,
                                        "ItemType": 8,
                                        "DataResultType": null,
                                        "ValueType": 9,
                                        "HelpInfo": ".ID",
                                        "ExprMetaDataID": null,
                                        "ExprMetaDataAlias": null,
                                        "DataModels": null,
                                        "IsLeaf": true,
                                        "IsDelete": false,
                                        "ExprExt": {
                                            "AttrLength": 0,
                                            "AttrIsRequired": false,
                                            "AttrPrecision": 0,
                                            "AttrDefaultValue": null,
                                            "AttributeType": 0
                                        },
                                        "Children": [],
                                        "ExprFuncItemParamList": []
                                    },
                                    {
                                        "ID": "2075ccb8-49ca-bde1-d82b-644badbdc589",
                                        "DisplayName": ".Code",
                                        "RefSchemaExpr": "Schema.EO.EO_GetDeviceList.Attrs.Code",
                                        "RefSchemaExprValue": "{\r\n  \"Code\": \"Code\",\r\n  \"Text\": \"编号\",\r\n  \"DataType\": \"String\",\r\n  \"Length\": 0,\r\n  \"Precision\": 0,\r\n  \"IsNullable\": true,\r\n  \"IsList\": false,\r\n  \"DefaultValue\": \"\",\r\n  \"RelatedEntityObjectID\": null\r\n}",
                                        "Code": "Code",
                                        "Name": "编号",
                                        "EngineType": -1,
                                        "ItemType": 8,
                                        "DataResultType": null,
                                        "ValueType": 9,
                                        "HelpInfo": ".Code",
                                        "ExprMetaDataID": null,
                                        "ExprMetaDataAlias": null,
                                        "DataModels": null,
                                        "IsLeaf": true,
                                        "IsDelete": false,
                                        "ExprExt": {
                                            "AttrLength": 0,
                                            "AttrIsRequired": false,
                                            "AttrPrecision": 0,
                                            "AttrDefaultValue": null,
                                            "AttributeType": 0
                                        },
                                        "Children": [],
                                        "ExprFuncItemParamList": []
                                    },
                                    {
                                        "ID": "6f4ef64a-27cd-288d-9e81-d6b24cb67849",
                                        "DisplayName": ".Name",
                                        "RefSchemaExpr": "Schema.EO.EO_GetDeviceList.Attrs.Name",
                                        "RefSchemaExprValue": "{\r\n  \"Code\": \"Name\",\r\n  \"Text\": \"名称\",\r\n  \"DataType\": \"String\",\r\n  \"Length\": 0,\r\n  \"Precision\": 0,\r\n  \"IsNullable\": true,\r\n  \"IsList\": false,\r\n  \"DefaultValue\": \"\",\r\n  \"RelatedEntityObjectID\": null\r\n}",
                                        "Code": "Name",
                                        "Name": "名称",
                                        "EngineType": -1,
                                        "ItemType": 8,
                                        "DataResultType": null,
                                        "ValueType": 9,
                                        "HelpInfo": ".Name",
                                        "ExprMetaDataID": null,
                                        "ExprMetaDataAlias": null,
                                        "DataModels": null,
                                        "IsLeaf": true,
                                        "IsDelete": false,
                                        "ExprExt": {
                                            "AttrLength": 0,
                                            "AttrIsRequired": false,
                                            "AttrPrecision": 0,
                                            "AttrDefaultValue": null,
                                            "AttributeType": 0
                                        },
                                        "Children": [],
                                        "ExprFuncItemParamList": []
                                    }
                                ],
                                "ExprFuncItemParamList": []
                            }
                        },
                        {
                            "ID": "fd706991-9bbf-4b6f-e1c4-98f9d3f96df0",
                            "Code": "FasPageCount",
                            "Name": "每页条数",
                            "Value": null,
                            "dataType": "Int",
                            "ExprExt": null
                        },
                        {
                            "ID": "5d2b99df-2c1d-102a-cb21-52420819c288",
                            "Code": "FasPageIndex",
                            "Name": "当前页",
                            "Value": null,
                            "dataType": "Int",
                            "ExprExt": null
                        },
                        {
                            "ID": "2636e1e6-1b64-14df-aa2d-cc15f0714489",
                            "Code": "request",
                            "Name": "",
                            "Value": null,
                            "dataType": "String",
                            "ExprExt": null
                        }
                    ],
                    "LoadDataTime": false
                }'
                             :pageid='PageID'
                             :localvars='LocalVars'
                             :search='fasr_select_helper_1ce26a_select'>
            </t-select-helper>
            <div :ref='el => Widget["LayoutGrid792346"] = el'
                 v-if="IsPC"
                 style='    display:flex;'
                 class='LayoutGrid792346 row col'
                 instanceCode='LayoutGrid792346'
                 rowGap=''
                 columnGap=''
                 responsive='pc-mobile-gear'>
                <div :ref='el => Widget["LayoutGrid711472"] = el'
                     class='LayoutGrid711472 row col'
                     instanceCode='LayoutGrid711472'
                     rowGap=''
                     columnGap=''
                     responsive='pc-mobile-gear'>
                </div>
                <div :ref='el => Widget["LayoutGrid657024"] = el'
                     style='    justify-content:flex-end;    display:flex; position: relative;'
                     class='LayoutGrid657024 row col'
                     instanceCode='LayoutGrid657024'
                     justify='flex-end'
                     rowGap=''
                     columnGap=''
                     responsive='pc-mobile-gear'>
                    <t-button style='margin-right: 8px;'
                              class='tr-button-default'
                              label='手动刷新'
                              :showHint='true'
                              :tabIndex='1'
                              @click="handleManualRefresh">
                    </t-button>
                    <div class="select-wrapper"
                         ref="selectWrapperRef">
                        <t-select instanceCode='fasr_select_77cb3b'
                                  :ref='el => Widget["fasr_select_77cb3b"] = el'
                                  style=' width: 100%;'
                                  class='fasr_select_77cb3b tr-input-editform'
                                  itemsDataSourceType='static'
                                  :clearable='false'
                                  :useInput='true'
                                  helpPlacement='bottom'
                                  :readonly='false'
                                  labelPosition='top'
                                  :tabIndex='1'
                                  :disable='false'
                                  :visible='true'
                                  :staticItems='[
                                { "label": "刷新频率30秒", "value": 30 },
                                { "label": "刷新频率45秒", "value": 45 },
                                { "label": "刷新频率60秒", "value": 60 },
                                { "label": "刷新频率75秒", "value": 75 },
                                { "label": "刷新频率90秒", "value": 90 },
                                { "label": "刷新频率120秒", "value": 120 },
                            ]'
                                  v-model="selectModel">
                        </t-select>
                        <!-- 进度条 -->
                        <div class="refresh-progress-bar"
                             :style="{ width: progressWidth + '%' }"></div>
                    </div>
                </div>
            </div>
        </div>
        <t-tabs :ref='el => Widget["fasr_tabs_494f6b"] = el'
                style='margin: 12px 8px 8px 0;'
                class='fasr_tabs_494f6b tr-tabs-padding-normal'
                instanceCode='fasr_tabs_494f6b'
                :staticItems='tabItems'
                tabPosition='top'
                type='none'
                :tabIndex='0'
                v-model="tabIndex"
                @change="changeTab()">
            <!-- 终端设备 -->
            <t-tab-panel v-if="IsDispatchMonitor"
                         name='terminal'
                         instanceCode='fasr_q_tab_panel_terminal'
                         style='padding:0;'>
                <TerminalPanel ref="terminalPanelRef"
                               :StaId="stationID"
                               :StationName="stationName"
                               :onRefreshCount="updateTerminalTab" />
            </t-tab-panel>
            <!-- 摄像头 -->
            <t-tab-panel v-if="!IsDispatchMonitor"
                         class='fasr_q_tab_panel_photoMonitor'
                         name='photoMonitor'
                         instanceCode='fasr_q_tab_panel_photoMonitor'>
                <div class="filter-item">
                    <t-label :ref='el => Widget["fasr_label_540f81"] = el'
                             style='margin-right: 16px;'
                             class='fasr_label_540f81 tr-label-contenttitlen'
                             instanceCode='fasr_label_540f81'
                             valueType='static'
                             :showHint='true'
                             :tabIndex='1'
                             constValue='设备状态'>
                    </t-label>
                    <span class="status-btn"
                          :class="{ active: photoSelectedStates.online }"
                          @click="() => selectPhotoState('online')">在线 {{ photoNumObj.OnlineDeviceCount }}</span>
                    <span class="status-btn"
                          :class="{ active: photoSelectedStates.offline }"
                          @click="() => selectPhotoState('offline')">离线 {{ photoNumObj.OfflineDeviceCount
                        }}</span>
                </div>
            </t-tab-panel>
            <!-- 智能地锁 -->
            <t-tab-panel v-if="!IsDispatchMonitor"
                         :ref='el => Widget["fasr_q_tab_panel_lockMonitor"] = el'
                         class='fasr_q_tab_panel_lockMonitor'
                         name='lockMonitor'
                         instanceCode='fasr_q_tab_panel_lockMonitor'>
                <div class="filter-item">
                    <t-label :ref='el => Widget["fasr_label_540f81"] = el'
                             style='margin-right: 16px;'
                             class='fasr_label_540f81 tr-label-contenttitlen'
                             instanceCode='fasr_label_540f81'
                             valueType='static'
                             :showHint='true'
                             :tabIndex='1'
                             constValue='设备状态'>
                    </t-label>
                    <span class="status-btn"
                          :class="{ active: lockSelectedStates.online }"
                          @click="() => selectLockState('online')">在线 {{ lockNumObj.OnlineDeviceCount }}</span>
                    <span class="status-btn"
                          :class="{ active: lockSelectedStates.offline }"
                          @click="() => selectLockState('offline')">离线 {{ lockNumObj.OfflineDeviceCount }}</span>
                </div>
                <div class="filter-item">
                    <t-label :ref='el => Widget["fasr_label_540f81"] = el'
                             style='margin-right: 16px;'
                             class='fasr_label_540f81 tr-label-contenttitlen'
                             instanceCode='fasr_label_540f81'
                             valueType='static'
                             :showHint='true'
                             :tabIndex='1'
                             constValue='地锁状态'>
                    </t-label>
                    <span class="status-btn"
                          :class="{ active: lockSelectedStates.raised }"
                          @click="() => selectLockState('raised')">
                        锁升起 {{ lockNumObj.LockedDeviceCount }}</span>
                    <span class="status-btn"
                          :class="{ active: lockSelectedStates.lowered }"
                          @click="() => selectLockState('lowered')">
                        锁降下 {{ lockNumObj.UnlockedDeviceCount }}</span>
                    <span class="status-btn"
                          :class="{ active: lockSelectedStates.unknown }"
                          @click="() => selectLockState('unknown')">
                        未知 {{ lockNumObj.UnknownLockDeviceCount }}</span>
                </div>
            </t-tab-panel>
            <!-- 光伏监控 -->
            <t-tab-panel v-if="canShowPVMTabs"
                         name='pvMonitor'>
                <div class="filter-item">
                    <t-label :ref='el => Widget["fasr_label_540f81"] = el'
                             style='margin-right: 16px;'
                             class='fasr_label_540f81 tr-label-contenttitlen'
                             instanceCode='fasr_label_540f81'
                             valueType='static'
                             :showHint='true'
                             :tabIndex='1'
                             constValue='设备状态'>
                    </t-label>
                    <span class="status-btn"
                          :class="{ active: pvSelectedStates.online }"
                          @click="() => selectPvState('online')">在线 {{ pvMonitorNumObj.OnlineDeviceCount
                        }}</span>
                    <span class="status-btn"
                          :class="{ active: pvSelectedStates.offline }"
                          @click="() => selectPvState('offline')">离线 {{ pvMonitorNumObj.OfflineDeviceCount
                        }}</span>
                    <span class="status-btn"
                          :class="{ active: pvSelectedStates.fault }"
                          @click="() => selectPvState('fault')">故障 {{ pvMonitorNumObj.FaultDeviceCount }}</span>
                </div>
                <div class="filter-item">
                    <t-label :ref='el => Widget["fasr_label_540f81"] = el'
                             style='margin-right: 16px;'
                             class='fasr_label_540f81 tr-label-contenttitlen'
                             instanceCode='fasr_label_540f81'
                             valueType='static'
                             :showHint='true'
                             :tabIndex='1'
                             constValue='光伏工作状态'>
                    </t-label>
                    <span class="status-btn"
                          :class="{ active: pvSelectedStates.generating }"
                          @click="() => selectPvState('generating')">
                        发电中 {{ pvMonitorNumObj.GeneratingDeviceCount }}</span>
                    <span class="status-btn"
                          :class="{ active: pvSelectedStates.sleeping }"
                          @click="() => selectPvState('sleeping')">
                        休眠 {{ pvMonitorNumObj.SleepingDeviceCount }}</span>
                    <span class="status-btn"
                          :class="{ active: pvSelectedStates.unknown }"
                          @click="() => selectPvState('unknown')">
                        未知 {{ pvMonitorNumObj.UnknownDeviceCount }}</span>
                </div>
            </t-tab-panel>
            <!-- 储能监控 -->
            <t-tab-panel v-if="canShowPVMTabs"
                         name='energyMonitor'>
                <div class="filter-item">
                    <t-label :ref='el => Widget["fasr_label_540f81"] = el'
                             style='margin-right: 16px;'
                             class='fasr_label_540f81 tr-label-contenttitlen'
                             instanceCode='fasr_label_540f81'
                             valueType='static'
                             :showHint='true'
                             :tabIndex='1'
                             constValue='设备状态'>
                    </t-label>
                    <span class="status-btn"
                          :class="{ active: energySelectedStates.online }"
                          @click="() => selectEnergyState('online')">在线 {{ energyMonitorNumObj.OnlineDeviceCount
                        }}</span>
                    <span class="status-btn"
                          :class="{ active: energySelectedStates.offline }"
                          @click="() => selectEnergyState('offline')">离线 {{
                            energyMonitorNumObj.OfflineDeviceCount }}</span>
                    <span class="status-btn"
                          :class="{ active: energySelectedStates.fault }"
                          @click="() => selectEnergyState('fault')">故障 {{ energyMonitorNumObj.FaultDeviceCount
                        }}</span>
                </div>
                <div class="filter-item">
                    <t-label :ref='el => Widget["fasr_label_540f81"] = el'
                             style='margin-right: 16px;'
                             class='fasr_label_540f81 tr-label-contenttitlen'
                             instanceCode='fasr_label_540f81'
                             valueType='static'
                             :showHint='true'
                             :tabIndex='1'
                             constValue='储能工作状态'>
                    </t-label>
                    <span class="status-btn"
                          :class="{ active: energySelectedStates.charging }"
                          @click="() => selectEnergyState('charging')">
                        充电中 {{ energyMonitorNumObj.ChargingDeviceCount }}</span>
                    <span class="status-btn"
                          :class="{ active: energySelectedStates.discharging }"
                          @click="() => selectEnergyState('discharging')">
                        放电中 {{ energyMonitorNumObj.DischargingDeviceCount }}</span>
                    <span class="status-btn"
                          :class="{ active: energySelectedStates.sleeping }"
                          @click="() => selectEnergyState('sleeping')">
                        休眠 {{ energyMonitorNumObj.SleepingDeviceCount }}</span>
                    <span class="status-btn"
                          :class="{ active: energySelectedStates.unknown }"
                          @click="() => selectEnergyState('unknown')">
                        未知 {{ energyMonitorNumObj.UnknownDeviceCount }}</span>
                </div>
            </t-tab-panel>
            <!-- 车库消防 -->
            <t-tab-panel :ref='el => Widget["fasr_q_tab_panel_fireMonitor"] = el'
                         class='fasr_q_tab_panel_fireMonitor'
                         name='fireMonitor'
                         instanceCode='fasr_q_tab_panel_fireMonitor'>
                <div class="filter-item">
                    <t-label :ref='el => Widget["fasr_label_540f81"] = el'
                             style='opacity:100%;margin-right: 16px;'
                             class='fasr_label_540f81 tr-label-contenttitlen'
                             instanceCode='fasr_label_540f81'
                             valueType='static'
                             :showHint='true'
                             :tabIndex='1'
                             constValue='设备状态'>
                    </t-label>
                    <span class="status-btn"
                          :class="{ active: fireSelectedStates.online }"
                          @click="() => selectFireState('online')">在线 {{ fireNumObj.OnlineModuleCount }}</span>
                    <span class="status-btn"
                          :class="{ active: fireSelectedStates.offline }"
                          @click="() => selectFireState('offline')">离线 {{ fireNumObj.OfflineModuleCount }}</span>
                </div>
            </t-tab-panel>
        </t-tabs>

        <PhotoMonitorPanel v-if="!IsDispatchMonitor && tabIndex == 0"
                           :photoList="photoList"
                           :independentItems="independentItems"
                           :parentDevices="parentDevices"
                           :childGroups="childGroups"
                           :expanded="expanded"
                           :netStateMap="NetState"
                           :getStatusClass="getStatusClass"
                           :toggleExpand="toggleExpand"
                           :openDetail="openDetail"
                           :openVideoModal="openVideoModal"
                           :openReplay="openReplay"
                           :jumptoLogPage="jumptoLogPage"
                           :btnGroupLockClick="btnGroup_lock_Click_设备日志"
                           :btnGroupLockItemClick="btnGroup_lock_btnGroupItemClick" />
        <LockMonitorPanel v-if="!IsDispatchMonitor && tabIndex == 1"
                          :lockDataValue="lockList"
                          :TenantId="TenantId"
                          @lockListEvent="handleLockEvent"
                          :stationName="stationName"
                          :stationID="stationID">
        </LockMonitorPanel>

        <PVMonitorPanel v-if="canShowPVMTabs && (IsDispatchMonitor ? tabIndex == 1 : tabIndex == 2)"
                        :pvDataValue="pvList"
                        :TenantId="TenantId"
                        :stationName="stationName"
                        @pvListEvent="handlePvAndEnergyEvent"
                        :stationID="stationID">
        </PVMonitorPanel>
        <EnergyMonitorPanel v-if="canShowPVMTabs && (IsDispatchMonitor ? tabIndex == 2 : tabIndex == 3)"
                            :energyDataValue="energyList"
                            :TenantId="TenantId"
                            @energyListEvent="handlePvAndEnergyEvent"
                            :stationName="stationName"
                            :stationID="stationID">
        </EnergyMonitorPanel>
        <FireMonitor v-if="!IsDispatchMonitor && tabIndex == 2 && false"
                     :fireDataValue="fireList"
                     :TenantId="TenantId"
                     @fireEvent="handleFireEvent"
                     :stationName="stationName"
                     :stationID="stationID">
        </FireMonitor>
        <div v-if="detailVisible"
             class="detail-modal">
            <!-- 背景遮罩 -->
            <div class="detail-overlay"
                 @click="closeDetail"></div>
            <!-- 详情面板 -->
            <div class="detail-panel">
                <div class="detail-header">
                    <h3 class="detail-title">设备详情</h3>
                    <button class="close-btn"
                            @click="closeDetail">×</button>
                </div>
                <div class="detail-body">
                    <div class="device-info">
                        <span class="status-indicator"
                              :class="{ online: isOnline, offline: isOffline, unknown: !isOnline && !isOffline }"></span>
                        <span class="statetext"
                              :class="{ online: isOnline, offline: isOffline, unknown: !isOnline && !isOffline }">
                            {{ NetState[currentDetail.NetState] }}
                        </span>
                        <span class="device-name">{{ currentDetail.DeviceName || '未知设备' }}</span>
                    </div>
                    <div class="detail-row">
                        <strong>{{ '设备编号' }}：</strong>
                        <span :title="currentDetail.DeviceKey">{{ currentDetail.DeviceKey }}</span>
                    </div>
                    <div class="detail-row">
                        <strong>{{ '设备类型' }}：</strong>
                        <span :title="DeviceType[currentDetail.DeviceType]">{{ DeviceType[currentDetail.DeviceType]
                            }}</span>
                    </div>
                    <div class="detail-row">
                        <strong>{{ '统一编码' }}：</strong>
                        <span :title="currentDetail.UnifiedId">{{ currentDetail.UnifiedId || '--' }}</span>
                    </div>
                    <div class="detail-row">
                        <strong>{{ '国标设备名称' }}：</strong>
                        <span :title="currentDetail.GbDeviceName">{{ currentDetail.GbDeviceName || '--' }}</span>
                    </div>
                    <div class="detail-row">
                        <strong>{{ '设备制造商' }}：</strong>
                        <span :title="currentDetail.Manufacturer">{{ currentDetail.Manufacturer || '--' }}</span>
                    </div>
                    <div class="detail-row">
                        <strong>{{ '设备型号' }}：</strong>
                        <span :title="currentDetail.Model">{{ currentDetail.Model || '--' }}</span>
                    </div>
                    <div class="detail-row">
                        <strong>{{ '父级设备' }}：</strong>
                        <span :title="currentDetail.ParentID">{{ currentDetail.ParentID || '--' }}</span>
                    </div>
                    <div class="detail-row">
                        <strong>{{ '网络地址' }}：</strong>
                        <span :title="currentDetail.HostAddress">{{ currentDetail.HostAddress || '--' }}</span>
                    </div>
                    <div class="detail-row">
                        <strong>{{ '本地IP' }}：</strong>
                        <span :title="currentDetail.LocalIp">{{ currentDetail.LocalIp || '--' }}</span>
                    </div>
                    <div class="detail-row">
                        <strong>{{ '流传输模式' }}：</strong>
                        <span :title="StreamTransport[currentDetail.StreamTransport]">{{
                            StreamTransport[currentDetail.StreamTransport] || '--' }}</span>
                    </div>
                    <div class="detail-row">
                        <strong>{{ '信令传输模式' }}：</strong>
                        <span :title="SignalTransport[currentDetail.SignalTransport]">{{
                            SignalTransport[currentDetail.SignalTransport] || '--' }}</span>
                    </div>
                    <div class="detail-row">
                        <strong>{{ '最近抓拍图片地址' }}：</strong>
                        <span :title="currentDetail.LastSnapshot">
                            <t-icon style='margin-right: 2px;cursor: pointer;'
                                    class='fasr_icon_95d59d tr-icon-default'
                                    size='14px'
                                    color='rgb(25, 118, 210)'
                                    name='fas dx-icon icon-t-copy'
                                    v-if="currentDetail.LastSnapshot"
                                    @click="copyToClipboard(currentDetail.LastSnapshot)">
                            </t-icon>{{ currentDetail.LastSnapshot || '--' }}</span>
                    </div>
                    <div class="detail-row detail-row-split">
                        <strong>{{ '设备上线时间' }}：</strong>
                        <span :title="currentDetail.OnlineTime">{{ currentDetail.OnlineTime || '--' }}</span>
                    </div>
                    <div class="detail-row">
                        <strong>{{ '设备下线时间' }}：</strong>
                        <span :title="currentDetail.OfflineTime">{{ currentDetail.OfflineTime || '--' }}</span>
                    </div>
                </div>
            </div>
        </div>
        <ReplayModal v-model:visible="replayVisible"
                     :device="currentReplayDevice"
                     v-model:timeRange="replayTimeRange"
                     :TenantId="TenantId"
                     @close="onReplayClose" />
        <Teleport to="body"
                  v-if="videoVisible">
            <div class="replay-overlay"
                 @click="closeVideo"></div>
            <div class="replay-modal">
                <div class="detail-header">
                    <h3>{{ '实时画面' }}</h3>
                    <button class="close-btn"
                            @click="closeVideo">×</button>
                </div>

                <!-- 视频区域 -->
                <div class="video-section">
                    <div class="deviceImgContent"
                         :style="{ height: '100%', backgroundColor: '#000' }">
                        <div style="height: 100%;">
                            <HlsPlayer ref="playerRefs"
                                       :item="currentVideoDevice"
                                       :TenantId="TenantId"
                                       :play="true"
                                       @playVideo="handlePlayEvent" />
                        </div>
                    </div>
                </div>
            </div>
        </Teleport>
    </div>
</template>

<style>
@import './monitor.css';
</style>


<script setup>
import { ref, onBeforeMount, onMounted, computed, onUnmounted, reactive, nextTick, watch, provide, } from 'vue';
import { DataQueryClass } from '../../fas/models/DataQueryClass';
import { DataQueryClassAsync } from '../../fas/models/DataQueryClassAsync';
import { ActionClass } from '../../fas/models/ActionClass';
import { ActionClassAsync } from '../../fas/models/ActionClassAsync';
import HlsPlayer from '../../components/HlsPlayer.vue';
import ReplayModal from '../../components/ReplayModal.vue';
import LockMonitorPanel from '../../components/lockMonitorPanel.vue';
import FireMonitor from '../../components/fireMonitorPanel.vue';
import PhotoMonitorPanel from '../../components/PhotoMonitorPanel.vue';

import PVMonitorPanel from '../../components/PVMonitorPanel.vue';
import EnergyMonitorPanel from '../../components/EnergyMonitorPanel.vue';
import TerminalPanel from '../../components/terminal/panel/TerminalPanel.vue';
let hasPVMProductResult = null;

const IsPC = ref(window.innerWidth >= 768);
provide('IsPC', IsPC);
const updateIsPC = () => {
  IsPC.value = window.innerWidth >= 768;
};

const hasPVMProduct = async () => {
  if (hasPVMProductResult != null) {
    const productCodes = hasPVMProductResult?.Record?.data;
    return Array.isArray(productCodes) && productCodes.includes('PVM');
  }
  try {
    const result = await TFF.fas.Action.executeAsync('a1f51c9a-5fa7-47ac-8cf8-c5ca86949800', []);

    hasPVMProductResult = result;
    const productCodes = result?.Record?.data;
    return Array.isArray(productCodes) && productCodes.includes('PVM');
  }
  catch (e) {
    console.warn('解析 saas_Context 失败:', e);
    return false;
  }
};

/* 是否是调度监控 */

const IsDispatchMonitor = ref(TFF.common.api.Url.getUrlQuery('type') == 'dispatch');
/* 是否加盟商 */
const IsFranchisee = ref(TFF.common.api.Url.getUrlQuery('platformtype') == '1');
const hasPVMProductFlag = ref(false); // 默认不展示
const shouldHidePVMTabs = computed(() => IsDispatchMonitor.value && IsFranchisee.value);
const canShowPVMTabs = computed(() => hasPVMProductFlag.value && !shouldHidePVMTabs.value);

// 异步获取PVM产品权限
const checkPVMPermission = async () => {
  try {
    const hasPermission = await hasPVMProduct();
    hasPVMProductFlag.value = hasPermission;
  }
  catch (error) {
    console.error('检查PVM权限失败:', error);
    hasPVMProductFlag.value = false;
  }
};


const tabItems = computed(() => {
  const items = [];
  if (IsDispatchMonitor.value) {
    items.push({ label: '充电终端', code: 'terminal' });
    if (canShowPVMTabs.value) {
      items.push({ label: '光伏监控', code: 'pvMonitor' });
      items.push({ label: '储能监控', code: 'energyMonitor' });
    }
    return items;
  }
  items.push({ label: '摄像头监控', code: 'photoMonitor' });
  items.push({ label: '智能地锁监控', code: 'lockMonitor' });
  //   items.push({ label: '车库消防', code: 'fireMonitor' });
  if (canShowPVMTabs.value) {
    items.push({ label: '光伏监控', code: 'pvMonitor' });
    items.push({ label: '储能监控', code: 'energyMonitor' });
  }
  return items;
});
const getTabIndex = (key) => {
  if (IsDispatchMonitor.value) {
    return canShowPVMTabs.value ? { terminal: 0, pv: 1, energy: 2 }[ key ] : { terminal: 0 }[ key ];
  }
  return canShowPVMTabs.value
    ? { photo: 0, lock: 1, pv: 2, energy: 3 }[ key ]
    : { photo: 0, lock: 1 }[ key ];
};
const updateTabLabel = (key, label, count) => {
  const tabIndex = getTabIndex(key);
  if (tabIndex !== undefined && Widget.fasr_tabs_494f6b?.staticItems?.[ tabIndex ]) {
    Widget.fasr_tabs_494f6b.staticItems[ tabIndex ].label = count > 0 ? `${ label }（${ count }）` : label;
  }
};
const updateTerminalTab = (count) => {
  updateTabLabel('terminal', '充电终端', count);
};

// 设备详情面板
const Funcs = window.Funcs;
const NetState = {
  0: '初始',
  1: '在线',
  2: '离线',
};
const DeviceType = {
  118: 'NVR',
  132: 'IPC',
};
const SignalTransport = {
  1: 'Udp',
  2: 'Tcp'
};
const StreamTransport = {
  1: 'Udp',
  2: 'Tcp-主动',
  3: 'Tcp-被动'
};
const Widget = {
  LayoutGrid_1c95c5: null,
  LayoutGrid792599: null,
  LayoutGrid779634: null,
  fasr_select_helper_1ce26a: null,
  LayoutGrid241014: null,
  LayoutGrid792346: null,
  LayoutGrid711472: null,
  LayoutGrid657024: null,
  fasr_button_ed5180: null,

  fasr_tabs_494f6b: null,



};
const PageID = ref('fcf626e7-4101-471b-8b32-51ffd8e66111');
const DataQuery = new DataQueryClass();
DataQuery.Promise = new DataQueryClassAsync();
const Action = new ActionClass();
Action.Promise = new ActionClassAsync();
window.addPCStyle();
const LocalVars = reactive({});


window.LocalVars = LocalVars;
window.Widget = Widget;
onBeforeMount(() => {
});


const getFranchiseeCompanyID = () => {
  try {

    const cookieValue = TFF.common.storage.Cookie.read('saas_par_Context');
    const parsed = JSON.parse(decodeURIComponent(cookieValue)) || {};
    const companyId = parsed.Id;
    return companyId;

  }
  catch (error) {
    console.error('获取 CompanyID 出错：', error);
  }
  return '';
};
const getLastStationCacheKey = () => {
  return IsFranchisee.value ? 'lastStation_franchisee' : 'lastStation';
};
const setLastStationCache = (cache) => {
  localStorage.setItem(getLastStationCacheKey(), JSON.stringify(cache));
};
const getLastStationCache = () => {
  return localStorage.getItem(getLastStationCacheKey());
};
const clearLastStationCache = () => {
  localStorage.removeItem(getLastStationCacheKey());
};

async function fasr_select_helper_1ce26a_select (selectHelperPageIndex, selectHelperPageSize, defaultInputFilter) {

  if (IsDispatchMonitor.value) {
    const companyID = getFranchiseeCompanyID();
    return TFF.fas.Action.executeAsync('338fe712-bac6-4202-a749-012364aa2ea6', [
      { ParameterName: 'FasPageCount', ParameterValue: selectHelperPageSize },
      { ParameterName: 'FasPageIndex', ParameterValue: selectHelperPageIndex },
      {
        ParameterName: 'FasDynamicFilter', ParameterValue: {
          'CompanyID': companyID,
          'IncludeFranchiseeSta': '1',
          'PlatformType': IsFranchisee.value ? '1' : '2',
          'AuthType': '1'
        }
      },
      { ParameterName: 'stationName', ParameterValue: defaultInputFilter }
    ]).then((result) => {
      return result;
    });
  }

  // 场站在saas环境和teld环境接口不一致
  const flag = window.TeldWebConfig.ResourceURL.indexOf('teld2.xyz') > -1 || window.TeldWebConfig.ResourceURL.indexOf('teld9.xyz') > -1 || window.TeldWebConfig.ResourceURL.indexOf('teld.cn') > -1;
  let filterData = {};
  if (!flag) {
    filterData = {
      TenantId: TenantId.value, StatName: defaultInputFilter, 'PageIndex': selectHelperPageIndex, 'PageSize': selectHelperPageSize
    };
  }
  else {
    filterData = {
      'FieldName': '', 'FieldValue': defaultInputFilter, 'page': selectHelperPageIndex, 'rows': selectHelperPageSize
    };
  }

  return new Promise((resolve, reject) => TFF.common.ajax.getDataAsync({
    url: TFF.common.ajax.getServiceUrl(!flag ? 'IMonitor-GetStatList_External' : 'CSM-GetChargingStationHelp'),
    type: 'post',
    data: !flag ? { 'request': JSON.stringify(filterData) } : { 'filter': JSON.stringify(filterData) }
  }).then((result) => {
    resolve(
      {
        ActionID: null,
        ActionCode: null,
        ActionName: null,
        ResultType: 11,
        EntityType: 3,
        DataContent: null,
        Record: {},
        List: !flag ? (result.data.Rows || []).map(item => ({
          ID: item.StationId,
          Code: item.StatId,
          Name: item.StatName
        })) : result.data.rows,
        Schema: {},
        Count: !flag ? result.data.Total : result.data.total,
      });
  }).catch((error) => {
    console.error('调用设备动作出错：', error);
  }));
}
const loadFirstStation = async () => {
  try {
    const result = await fasr_select_helper_1ce26a_select(1, 1, '');
    const firstStation = result?.List?.[ 0 ];
    if (!firstStation) {
      return;
    }
    stationID.value = firstStation.ID ?? firstStation.id ?? firstStation.StationId ?? firstStation.StatId ?? firstStation.Code ?? null;
    stationName.value = firstStation.Name ?? firstStation.name ?? firstStation.StatName ?? null;
    if (stationID.value && stationName.value) {
      setLastStationCache({ id: stationID.value, name: stationName.value });
    }
  }
  catch (e) {
    console.error('获取默认电站失败：', e);
  }
};
const verifyCachedStation = async (cachedId, cachedName) => {
  try {
    const result = await fasr_select_helper_1ce26a_select(1, 50, cachedName || '');
    const stationList = result?.List || [];
    const matched = stationList.find((item) => {
      const itemId = item.ID ?? item.id ?? item.StationId ?? item.StatId ?? item.Code;
      return String(itemId) === String(cachedId);
    });
    if (!matched) {
      return false;
    }
    const latestId = matched.ID ?? matched.id ?? matched.StationId ?? matched.StatId ?? matched.Code ?? cachedId;
    const latestName = matched.Name ?? matched.name ?? matched.StatName ?? cachedName;
    stationID.value = latestId;
    stationName.value = latestName;
    setLastStationCache({ id: latestId, name: latestName });
    return true;
  }
  catch (e) {
    console.error('校验缓存电站失败：', e);
    return true;
  }
};
// 获取租户
const getSaaSCookie = () => {
  try {
    let saas_Context = TFF.common.storage.Cookie.read('saas_Context');
    let ptType = TFF.common.api.Url.getUrlQuery('platformtype');
    if (Funcs.IsNullOrEmpty(ptType)) {
      ptType = LocalVars?.InParam_PlatformType;
    }

    if (ptType == '1') {
      saas_Context = TFF.common.storage.Cookie.read('saas_par_Context');
    }
    else if (ptType == '2') {
      saas_Context = TFF.common.storage.Cookie.read('saas_ep_Context');
    }
    else {
      ptType = '0';
    }
    var ctx = JSON.parse(decodeURIComponent(saas_Context)) || {};
    ctx.PlatformType = ptType;
  }
  catch (error) {
    console.error('获取租户出错：', error);
  }
  return ctx;
};

const TenantId = ref('');
const ShowBackHeader = ref(false);
onMounted(async () => {
  updateIsPC();
  window.addEventListener('resize', updateIsPC);
  const monitorParams = JSON.parse(sessionStorage.getItem('monitor_settings_params') || '{}') || {};
  sessionStorage.removeItem('monitor_settings_params');
  ShowBackHeader.value = TFF.common.api.Url.getUrlQuery('ShowBackHeader') || monitorParams.ShowBackHeader || false;
  TenantId.value = getSaaSCookie()?.TenantId;

  // 临时处理tab参数
  const jumpTab = TFF.common.api.Url.getUrlQuery('InParam_Tab') || monitorParams.InParam_Tab;
  if (jumpTab == 1) {
    tabIndex.value = Number(jumpTab);
  }
  const cached = getLastStationCache();
  const jumpStaID = TFF.common.api.Url.getUrlQuery('InParam_StaID') || monitorParams.InParam_StaID;
  const jumpStaName = TFF.common.api.Url.getUrlQuery('InParam_StaName') || monitorParams.InParam_StaName;
  if (jumpStaID && jumpStaName) {
    stationID.value = jumpStaID;
    stationName.value = jumpStaName;
  }
  else if (cached) {
    try {
      const { id, name } = JSON.parse(cached);
      stationID.value = id;
      stationName.value = name;
      if (stationID.value) {
        const verified = await verifyCachedStation(stationID.value, stationName.value);
        if (!verified) {
          stationID.value = null;
          stationName.value = null;
          clearLastStationCache();
        }
      }
    }
    catch (e) {
      clearLastStationCache();
    }
  }
  if (!stationID.value) {
    await loadFirstStation();
  }
  if (!stationID.value) {
    Funcs.Notify('提示', '请先选择电站', 'error');
    return;
  }

  const searchError = TFF.common.api.Url.getUrlQuery('InParam_Error') || monitorParams.InParam_Error;
  if (searchError) {
    if (jumpTab == 1) {
      // 地锁监控错误处理 - 重置选中状态
      Object.keys(lockSelectedStates).forEach(key => {
        lockSelectedStates[ key ] = false;
      });
    }
    else {
      // 摄像头监控错误处理 - 重置选中状态
      Object.keys(photoSelectedStates).forEach(key => {
        photoSelectedStates[ key ] = false;
      });
    }
  }
  resetProgress();

  if (stationID.value) {
    getALLData(true);
  }
});
onUnmounted(async () => {
  window.removeEventListener('resize', updateIsPC);
  if (timer) clearInterval(timer);
});

const backIconBtn = () => {
  Funcs.Goback();
};

/* 获取数据 */
// 电站
const stationID = ref(null);
const stationName = ref(null);
const terminalPanelRef = ref(null);
const searchList = () => {
  if (!stationID.value) {
    // Funcs.Notify('提示', '请先选择场站', "error");
    return;
  }
  const cache = {
    id: stationID.value,
    name: stationName.value
  };
  setLastStationCache(cache);
  getALLData();
  resetProgress();
};
// 列表
const photoList = ref([]);
const originalPhotoList = ref([]);
const lockList = ref([]);
const lockOriginalList = ref({ DeviceList: [] });
const fireList = ref([]);
const fireOriginalList = ref([]);

/* 光伏列表 */
const pvList = ref([]);
const originalPvList = ref([]);
/* 储能列表 */
const energyList = ref([]);
const originalEnergyList = ref([]);

const getPhotoMonitorData = () => {
  const postData = {
    StatId: stationID.value
  };
  TFF.common.ajax.getDataAsync({
    url: TFF.common.ajax.getServiceUrl('IMonitor-GetGbDeviceList_External'),
    type: 'post',
    data: { request: JSON.stringify(postData) }
  }).then(async (result) => {
    if (result.state == 0) {
      Funcs.Notify('提示', result.errmsg, 'error');
      return;
    }

    originalPhotoList.value = result.data.ReturnValue.filter(item => item.NetState != 0);
    photoList.value = result.data.ReturnValue.filter(item => item.NetState != 0);
    const count = { InitialDeviceCount: 0, OnlineDeviceCount: 0, OfflineDeviceCount: 0 };

    (result.data?.ReturnValue || []).forEach(({ NetState }) => {
      NetState === 0 && count.InitialDeviceCount++;
      NetState === 1 && count.OnlineDeviceCount++;
      NetState === 2 && count.OfflineDeviceCount++;
    });
    photoNumObj.value = count;

    badgeNumPhoto.value = originalPhotoList.value.length;
    const photoTabIndex = getTabIndex('photo');
    if (photoTabIndex !== undefined && Widget.fasr_tabs_494f6b?.staticItems?.[ photoTabIndex ]) {
      Widget.fasr_tabs_494f6b.staticItems[ photoTabIndex ].label = badgeNumPhoto.value ? `摄像头监控（${ badgeNumPhoto.value }）` : '摄像头监控';
    }
    refreshPhotoState();
  }).catch((error) => {
    if (tabIndex.value == 0) {
      Funcs.Notify('提示', '摄像头监控暂无数据', 'error');
    }
  });
};


const getLockMonitorPanelData = () => {
  const postData = {
    StatId: stationID.value
  };
  TFF.common.ajax.getDataAsync({
    url: TFF.common.ajax.getServiceUrl('IMonitor-GetGroundLockDeviceDetailsByStationId_External'),
    type: 'post',
    data: { request: JSON.stringify(postData) }
  }).then(async (result) => {
    if (result.state == 0) {
      Funcs.Notify('提示', result.errmsg, 'error');
      return;
    }
    const resultData = result.data.ReturnValue;
    lockOriginalList.value = resultData;
    refreshLockState();
    lockNumObj.value = resultData.Statistics;

    badgeNumLock.value = resultData.Statistics.OnlineDeviceCount + resultData.Statistics.OfflineDeviceCount;
    const lockTabIndex = getTabIndex('lock');
    if (lockTabIndex !== undefined && Widget.fasr_tabs_494f6b?.staticItems?.[ lockTabIndex ]) {
      Widget.fasr_tabs_494f6b.staticItems[ lockTabIndex ].label = badgeNumLock.value ? `智能地锁监控（${ badgeNumLock.value }）` : '智能地锁监控';
    }
  }).catch((error) => {
    if (tabIndex.value == 1) {
      Funcs.Notify('提示', '地锁监控暂无数据', 'error');
    }
  });
};

const getFireMonitorData = () => {
  const postData = {
    StatId: stationID.value
  };
  TFF.common.ajax.getDataAsync({
    url: TFF.common.ajax.getServiceUrl('IMonitor-GetGarageFireSystemDetails_External'),
    type: 'post',
    data: { request: JSON.stringify(postData) }
  }).then(async (result) => {
    if (result.state == 0) {
      Funcs.Notify('提示', result.errmsg, 'error');
      return;
    }
    const resultData = result.data.ReturnValue;
    fireOriginalList.value = resultData;
    refreshFireState();
    fireNumObj.value = resultData.Statistics;

    badgeNumFire.value = resultData.Statistics.OnlineModuleCount + resultData.Statistics.OfflineModuleCount;
    Widget.fasr_tabs_494f6b.staticItems[ 4 ].label = badgeNumFire.value ? `消防监控（${ badgeNumFire.value }）` : '消防监控';
  }).catch((error) => {
    if (tabIndex.value == 1) {
      Funcs.Notify('提示', '消防监控暂无数据', 'error');
    }
  });
};




const applyPvStatus = (item, count) => {
  const { NetState, FaultState, CurModule } = item;
  /* 是否有故障 */

  const isFault = getIsFault(item);
  if (NetState === 1 && isFault) {
    count.FaultDeviceCount++;
    item.NetStateName = '故障';
  }
  if (NetState === 1 && !isFault) {
    count.OnlineDeviceCount++;
    item.NetStateName = '在线';
  }
  if (NetState === 2) {
    count.OfflineDeviceCount++;
    item.NetStateName = '离线';
  }
  if (NetState === 1) {
    if (CurModule.DevicePropertys.work_status == '1') {
      count.GeneratingDeviceCount++;
      item.StateName = '发电中';
    }
    if (CurModule.DevicePropertys.work_status == '0') {
      count.SleepingDeviceCount++;
      item.StateName = '休眠';
    }
  }
  if (!item.StateName) {/* NetState === 2 && FaultState === 2 */
    count.UnknownDeviceCount++;
    item.StateName = '未知';
  }
};

const applyEnergyStatus = (item, count) => {
  const { NetState, FaultState, CurModule } = item;
  /* 是否有故障 */


  if (NetState === 1 && getIsFault(item)) {
    count.FaultDeviceCount++;
    item.NetStateName = '故障';
  }
  if (NetState === 1 && !getIsFault(item)) {
    count.OnlineDeviceCount++;
    item.NetStateName = '在线';
  }
  if (NetState === 2) {
    count.OfflineDeviceCount++;
    item.NetStateName = '离线';
  }
  if (NetState === 1) {
    const p = Number(CurModule.DevicePropertys.p);
    if (p > 0) {
      count.ChargingDeviceCount++;
      item.StateName = '充电中';
    }
    if (p < 0) {
      count.DischargingDeviceCount++;
      item.StateName = '放电中';
    }
    if (p == 0) {
      count.SleepingDeviceCount++;
      item.StateName = '休眠';
    }
  }
  if (!item.StateName) {/* NetState === 2 && !getIsFault(item) */
    count.UnknownDeviceCount++;
    item.StateName = '未知';
  }
};

const getPvANDEnergyMonitorData = () => {
  const postData = {
    StatId: stationID.value,
    ProductTypes: [ '0402', '0401' ]
  };
  TFF.common.ajax.getDataAsync({
    url: TFF.common.ajax.getServiceUrl('IMonitor-GetPvDeviceList_External'),
    type: 'post',
    data: { request: JSON.stringify(postData) }
  }).then(async (result) => {
    if (!result.data.ResultState) {
      Funcs.Notify('提示', result.data.ErrorMessage, 'error');
      return;
    }
    const resultList = result.data.ReturnValue || [];
    resultList.forEach(item => {
      item.LastUpdateDateTime = Funcs.GetDateDiff(formatTime(new Date()));
    });
    const PvData = resultList.filter(item => item.ProductType == '0401' && item.ModuleList.length > 0);
    const pvCount = {
      FaultDeviceCount: 0,
      OnlineDeviceCount: 0,
      OfflineDeviceCount: 0,
      GeneratingDeviceCount: 0,
      SleepingDeviceCount: 0,
      UnknownDeviceCount: 0
    };
    PvData.forEach((item) => {
      item.CurModule = item.ModuleList[ 0 ];
      if (!item.CurModule.DevicePropertys) {
        item.CurModule.DevicePropertys = {};
      }
      if (!item.CurModule.PlatformPropertys) {
        item.CurModule.PlatformPropertys = {};
      }
      applyPvStatus(item, pvCount);
    });
    pvMonitorNumObj.value = pvCount;
    originalPvList.value = PvData;
    const pvBadgeNum = PvData.length;
    updateTabLabel('pv', '光伏监控', pvBadgeNum);

    const energyCount = {
      OnlineDeviceCount: 0,
      OfflineDeviceCount: 0,
      FaultDeviceCount: 0,
      ChargingDeviceCount: 0,
      DischargingDeviceCount: 0,
      SleepingDeviceCount: 0,
      UnknownDeviceCount: 0
    };

    const EnergyData = resultList.filter(item => item.ProductType == '0402' && item.ModuleList.length > 0);
    EnergyData.forEach((item) => {
      item.CurModule = item.ModuleList[ 0 ];
      if (!item.CurModule.DevicePropertys) {
        item.CurModule.DevicePropertys = {};
      }
      if (!item.CurModule.PlatformPropertys) {
        item.CurModule.PlatformPropertys = {};
      }
      applyEnergyStatus(item, energyCount);
    });
    energyMonitorNumObj.value = energyCount;
    originalEnergyList.value = EnergyData;
    refreshPvState();
    refreshEnergyState();
    const energyBadgeNum = EnergyData.length;
    updateTabLabel('energy', '储能监控', energyBadgeNum);

  }).catch((error) => {
    console.error('获取光伏储能监控数据失败：' + error);
  });
};

const getIsFault = (item) => {


  const props = item?.CurModule?.DevicePropertys || {};

  return Object.keys(props)
    .filter(key => key.startsWith('error_code'))
    .some(key => (props[ key ] ?? '0') !== '0');
};
const refreshPvState = () => {
  pvList.value = JSON.parse(JSON.stringify(originalPvList.value));


  const getWorkStatus = (item) => item.CurModule.DevicePropertys.work_status;
  // 分别收集设备状态和光伏状态的选中情况
  const deviceStates = {
    online: pvSelectedStates.online,
    offline: pvSelectedStates.offline,
    fault: pvSelectedStates.fault
  };

  const pvStates = {
    generating: pvSelectedStates.generating,
    sleeping: pvSelectedStates.sleeping,
    unknown: pvSelectedStates.unknown
  };

  // 检查是否有任何状态被选中
  const hasDeviceSelected = Object.values(deviceStates).some(state => state);
  const hasPvSelected = Object.values(pvStates).some(state => state);

  if (hasDeviceSelected || hasPvSelected) {
    // 应用设备状态过滤
    if (hasDeviceSelected) {
      const deviceFiltered = pvList.value.filter(item => {
        // 在线且非故障
        if (deviceStates.online && item.NetState === 1 && !getIsFault(item)) return true;
        // 离线
        if (deviceStates.offline && item.NetState === 2) return true;
        // 故障
        if (deviceStates.fault && item.NetState === 1 && getIsFault(item)) return true;
        return false;
      });
      pvList.value = deviceFiltered;
    }

    // 应用光伏状态过滤（在设备状态过滤的基础上进一步过滤）
    if (hasPvSelected && pvList.value.length > 0) {
      const pvFiltered = pvList.value.filter(item => {
        // 发电中
        if (pvStates.generating && item.NetState === 1 && getWorkStatus(item) === '1') return true;
        // 休眠
        if (pvStates.sleeping && item.NetState === 1 && getWorkStatus(item) === '0') return true;
        // 未知
        if (pvStates.unknown && item.StateName === '未知') return true;
        return false;
      });
      pvList.value = pvFiltered;
    }
  }
  // 如果没有选中任何状态，则显示全部数据（默认状态）
};
async function getALLData (isFirst) {

  if (!IsDispatchMonitor.value) {
    getPhotoMonitorData();
    getLockMonitorPanelData();
    // getFireMonitorData();
  }
  await checkPVMPermission();
  if (canShowPVMTabs.value) {
    getPvANDEnergyMonitorData();
  }
  if (IsDispatchMonitor.value) {
    if (isFirst) {
      // 首次加载时，先获取数据再设置状态
      terminalPanelRef.value?.refresh?.(stationID.value, {
        loading: isFirst,  // 传入loading参数控制加载状态
        onCount: (count) => {
          // 数据获取完成后，再设置默认状态
          terminalPanelRef.value?.selectState?.('all', {
            loading: false,  // 数据已加载完成，不需要显示加载状态
            stationID: stationID.value,
            onCount: updateTerminalTab
          });
        }
      });
    }
    else {
      terminalPanelRef.value?.refresh?.(stationID.value, {
        onCount: updateTerminalTab
      });
    }
  }
}
// 标签页
const badgeNumPhoto = ref(0);
const badgeNumLock = ref(0);
const badgeNumFire = ref(0);
const tabIndex = ref(0);
async function changeTab () {
  await nextTick();
  if (stationID.value) {
    getALLData();
  }
}
// 数据
const photoNumObj = ref({
  InitialDeviceCount: 0,
  OnlineDeviceCount: 0,
  OfflineDeviceCount: 0
});
const lockNumObj = ref({
  InitialDeviceCount: 0,
  OnlineDeviceCount: 0,
  OfflineDeviceCount: 0,
  LockedDeviceCount: 0,
  UnlockedDeviceCount: 0,
  UnknownLockDeviceCount: 0,
});
const fireNumObj = ref({
  OnlineModuleCount: 0,
  OfflineModuleCount: 0,
  FaultDeviceCount: 0,
  UnknownLockDeviceCount: 0,
});
// 光伏
const pvMonitorNumObj = ref({
  /* 设备状态 */
  //在线
  OnlineDeviceCount: 0,
  //离线
  OfflineDeviceCount: 0,
  //故障
  FaultDeviceCount: 0,
  /* 储能状态 */
  //发电中
  GeneratingDeviceCount: 0,
  //休眠
  SleepingDeviceCount: 0,
  //未知
  UnknownDeviceCount: 0,
});
/* 储能 */
const energyMonitorNumObj = ref({
  /* 设备状态 */
  //在线
  OnlineDeviceCount: 0,
  //离线
  OfflineDeviceCount: 0,
  //故障
  FaultDeviceCount: 0,
  /* 储能状态 */
  //充电中
  ChargingDeviceCount: 0,
  //放电中
  DischargingDeviceCount: 0,
  //休眠
  SleepingDeviceCount: 0,
  //未知
  UnknownDeviceCount: 0,
});


// 光伏监控专用的选择状态（默认都不高亮）
const pvSelectedStates = reactive({
  online: false,
  offline: false,
  fault: false,
  generating: false,
  sleeping: false,
  unknown: false,
});

// 摄像头监控专用的选择状态（默认都不高亮）
const photoSelectedStates = reactive({
  online: false,
  offline: false,
});

// 智能地锁监控专用的选择状态（默认都不高亮）
const lockSelectedStates = reactive({
  online: false,
  offline: false,
  raised: false,
  lowered: false,
  unknown: false,
});

// 储能监控专用的选择状态（默认都不高亮）
const energySelectedStates = reactive({
  online: false,
  offline: false,
  fault: false,
  charging: false,
  discharging: false,
  sleeping: false,
  unknown: false,
});

// 消防监控专用的选择状态（默认都不高亮）
const fireSelectedStates = reactive({
  online: false,
  offline: false,
});


// 光伏状态选择方法：支持设备状态和光伏状态同时选中
const selectPvState = (stateKey) => {
  // 切换当前状态的选中状态
  pvSelectedStates[ stateKey ] = !pvSelectedStates[ stateKey ];

  // 刷新光伏数据
  refreshPvState();
};

// 摄像头状态选择方法：支持多选
const selectPhotoState = (stateKey) => {
  // 切换当前状态的选中状态
  photoSelectedStates[ stateKey ] = !photoSelectedStates[ stateKey ];

  // 刷新摄像头数据
  refreshPhotoState();
};

// 地锁状态选择方法：支持多选
const selectLockState = (stateKey) => {
  // 切换当前状态的选中状态
  lockSelectedStates[ stateKey ] = !lockSelectedStates[ stateKey ];

  // 刷新地锁数据
  refreshLockState();
};

// 储能状态选择方法：支持多选
const selectEnergyState = (stateKey) => {
  // 切换当前状态的选中状态
  energySelectedStates[ stateKey ] = !energySelectedStates[ stateKey ];

  // 刷新储能数据
  refreshEnergyState();
};

// 消防状态选择方法：支持多选
const selectFireState = (stateKey) => {
  // 切换当前状态的选中状态
  fireSelectedStates[ stateKey ] = !fireSelectedStates[ stateKey ];

  // 刷新消防数据
  refreshFireState();
};
const refreshPhotoState = () => {
  photoList.value = JSON.parse(JSON.stringify(originalPhotoList.value));

  // 检查是否有任何状态被选中
  const hasAnySelected = Object.values(photoSelectedStates).some(state => state);

  if (hasAnySelected) {
    // 支持多选：显示所有选中状态的数据
    const filtered = photoList.value.filter(item => {
      // 在线
      if (photoSelectedStates.online && item.NetState === 1) return true;
      // 离线
      if (photoSelectedStates.offline && item.NetState === 2) return true;
      return false;
    });
    photoList.value = filtered;
  }
  // 如果没有选中任何状态，则显示全部数据（默认状态）
};
const refreshLockState = () => {
  lockList.value = JSON.parse(JSON.stringify(lockOriginalList.value));
  /* if (!checkedStates.lock.initial) { */
  lockList.value.DeviceList = lockList.value.DeviceList.filter(item => item.NetState != 0);
  /* } */

  // 检查是否有任何状态被选中
  const hasAnySelected = Object.values(lockSelectedStates).some(state => state);

  if (hasAnySelected) {
    // 支持多选：显示所有选中状态的数据
    const filtered = lockList.value.DeviceList.filter(item => {
      // 在线
      if (lockSelectedStates.online && item.NetState === 1) return true;
      // 离线
      if (lockSelectedStates.offline && item.NetState === 2) return true;
      // 锁升起
      if (lockSelectedStates.raised && item.LockState === 1) return true;
      // 锁降下
      if (lockSelectedStates.lowered && item.LockState === 2) return true;
      // 未知
      if (lockSelectedStates.unknown && (item.LockState === '' || item.LockState === 0)) return true;
      return false;
    });
    lockList.value.DeviceList = filtered;
  }
  // 如果没有选中任何状态，则显示全部数据（默认状态）
};

const refreshFireState = () => {
  fireList.value = JSON.parse(JSON.stringify(fireOriginalList.value));

  // 检查是否有任何状态被选中
  const hasAnySelected = Object.values(fireSelectedStates).some(state => state);

  if (hasAnySelected) {
    // 支持多选：显示所有选中状态的数据
    const filtered = fireList.value.ModuleList.filter(item => {
      // 在线
      if (fireSelectedStates.online && item.NetState === 1) return true;
      // 离线
      if (fireSelectedStates.offline && item.NetState === 2) return true;
      return false;
    });
    fireList.value = filtered;
  }
  // 如果没有选中任何状态，则显示全部数据（默认状态）
};

const refreshEnergyState = () => {
  energyList.value = JSON.parse(JSON.stringify(originalEnergyList.value));

  // 检查是否有任何状态被选中
  const hasAnySelected = Object.values(energySelectedStates).some(state => state);

  if (hasAnySelected) {
    // 支持多选：显示所有选中状态的数据
    const filtered = energyList.value.filter(item => {
      // 在线且非故障
      if (energySelectedStates.online && item.NetState === 1 && !getIsFault(item)) return true;
      // 离线
      if (energySelectedStates.offline && item.NetState === 2) return true;
      // 故障
      if (energySelectedStates.fault && item.NetState === 1 && getIsFault(item)) return true;
      // 充电中
      if (energySelectedStates.charging && item.NetState === 1 && item.CurModule?.DevicePropertys?.p > 0) return true;
      // 放电中
      if (energySelectedStates.discharging && item.NetState === 1 && item.CurModule?.DevicePropertys?.p < 0) return true;
      // 休眠
      if (energySelectedStates.sleeping && item.StateName === '休眠') return true;
      // 未知
      if (energySelectedStates.unknown && item.StateName === '未知') return true;
      return false;
    });
    energyList.value = filtered;
  }
  // 如果没有选中任何状态，则显示全部数据（默认状态）
};



// 回放弹窗
const replayVisible = ref(false);
const currentReplayDevice = ref(null);
const replayTimeRange = ref([]);
const openReplay = async (device) => {
  if (device.NetState != 1) {
    Funcs.Notify('提示', '设备离线，无法回放视频', 'error');
    return;
  }

  const today = getTodayYMD();
  const StartTime = today + ' 00:00:00';
  const EndTime = today + ' 23:59:59';
  const postData = {
    TenantId: TenantId.value,
    DeviceKey: device.DeviceKey,
    ProductKey: device.ProductKey,
    ActionId: 'GBRecordQuery',
    WaitForResponse: true,
    Params: [ { 'Name': 'StartTime', 'Value': StartTime }, { 'Name': 'EndTime', 'Value': EndTime } ],
  };
  const result = await TFF.common.ajax.getDataAsync({
    url: TFF.common.ajax.getServiceUrl('IRouter-InvokeDeviceAction_External'),
    type: 'post',
    data: { request: JSON.stringify(postData) }
  });
  if (result.state == 0) {
    Funcs.Notify('提示', result.errmsg, 'error');

  }
  else {
    if (result?.data?.OutputParams.length > 0) {
      const recordList = result?.data?.OutputParams.find(item => item.Name === 'RecordList')?.Value || [];
      if (recordList.length == 0) {
        Funcs.Notify('提示', '暂无可回放视频', 'error');
        return;
      }
      replayTimeRange.value = recordList.map(item => {
        return `${ item.startTime.split(' ')[ 1 ] } ～ ${ item.endTime.split(' ')[ 1 ] }`;
      });
      currentReplayDevice.value = device;
      replayVisible.value = true;
      isPaused = true;
    }
  }
};
const onReplayClose = () => {
  currentReplayDevice.value = null;
  replayVisible.value = false;
  isPaused = false;
};

const videoVisible = ref(false);
const currentVideoDevice = ref(null);
const openVideoModal = (device) => {
  if (device.NetState != 1) {
    Funcs.Notify('提示', '设备离线，无法观看实时画面', 'error');
    return;
  }
  currentVideoDevice.value = device;
  videoVisible.value = true;
};
const closeVideo = () => {
  currentVideoDevice.value = null;
  videoVisible.value = false;
};

// 刷新频率下拉
const selectModel = ref(60);
watch(selectModel, () => {
  resetProgress();
});
const progressWidth = ref(0); // 初始 0%
let timer = null;
let elapsed = 0; // 已经过的时间（秒）
let total = 60; // 总时间
let isPaused = false; // 是否暂停计时
const resetProgress = () => {
  if (timer) clearInterval(timer);
  elapsed = 0;
  total = selectModel.value;
  progressWidth.value = 0; // 从 0% 开始

  timer = setInterval(() => {
    if (isPaused) return;
    elapsed++;
    // 计算进度：已过时间 / 总时间
    const percent = Math.min(100, (elapsed / total) * 100);
    progressWidth.value = percent;

    if (elapsed >= total) {
      clearInterval(timer);
      handleManualRefresh(); // 自动刷新
    }
  }, 1000);
};
const handleManualRefresh = () => {
  if (stationID.value) {
    getALLData();
  }
  else {
    Funcs.Notify('提示', '请先选择场站', 'error');
  }
  isPaused = false;
  resetProgress();
};
const handlePlayEvent = () => {
  if (isPaused) {
    isPaused = false;
  }
  else {
    isPaused = true;
  }
};

// 控制详情面板显示
const detailVisible = ref(false);
const currentDetail = ref(null);
const isOnline = ref(true);
const isOffline = ref(false);
const openDetail = (item) => {
  isPaused = true;
  currentDetail.value = item;
  detailVisible.value = true;
  isOnline.value = item.NetState === 1;
  isOffline.value = item.NetState === 2;
};
const closeDetail = () => {
  isPaused = false;
  detailVisible.value = false;
  currentDetail.value = null;
};

// 设备监控
const jumptoLogPage = (device) => {
  const flag = window.TeldWebConfig.ResourceURL.indexOf('teld2.xyz') > -1 || window.TeldWebConfig.ResourceURL.indexOf('teld9.xyz') > -1 || window.TeldWebConfig.ResourceURL.indexOf('teld.cn') > -1;
  if (flag) {
    window.open(`${ window.TeldWebConfig.ResourceURL.replace('resource', 'fas') }/gencode/dms/Page_LogListStandard?InParam_Tab=${ 0 }&InParam_DeviceInfo=${ device.DeviceKey }&InParam_StaID=${ stationID.value }&InParam_StaName=${ stationName.value }&opertype=1`);
  }
  else {
    Funcs.OpenFasPage({
      fasAppKey: 'dms',
      pageMetaId: 'Page_LogListStandard',
      param: {
        InParam_Tab: 0,
        InParam_DeviceInfo: device.DeviceKey,
        InParam_StaID: stationID.value,
        InParam_StaName: stationName.value,
        ShowHeader: true
      },
      target: 'inline',
      callback: function (res) {

      },
      passThroughData: [ 'platformtype' ],
    });
    // window.open(`${ window.TeldWebConfig.ResourceURL.replace('resource', 'fas') }/gencode/dms/Page_LogListStandard?InParam_Tab=${ 0 }&InParam_DeviceInfo=${ device.DeviceKey }&InParam_StaID=${ stationID.value }&InParam_StaName=${ stationName.value }`);
  }
};
async function btnGroup_lock_Click_设备日志 (item) {
  jumptoLogPage(item);
}
async function btnGroup_lock_btnGroupItemClick (action, row, item) {
  if (!action) return;
  const actions = {
    'Click_设备日志': btnGroup_lock_Click_设备日志,
  };
  actions[ 'Click_' + action.code ] && actions[ 'Click_' + action.code ](item);
}
const handlePvAndEnergyEvent = () => {
  let count = 0;
  const intervalId = setInterval(() => {
    getPvANDEnergyMonitorData();
    count++;
    if (count >= 3) {
      clearInterval(intervalId);
    }
  }, 2000);
};
// 地锁操作后刷新
const handleLockEvent = () => {
  // 地锁状态下发成功后，每1s刷新一次页面，持续5s，至于地锁状态是否真正改变，不关注
  let count = 0;
  const intervalId = setInterval(() => {
    handleManualRefresh();
    count++;
    if (count >= 5) {
      clearInterval(intervalId);
    }
  }, 1000);
};
// 消防刷新
const handleFireEvent = () => {
  let count = 0;
  const intervalId = setInterval(() => {
    handleManualRefresh();
    count++;
    if (count >= 5) {
      clearInterval(intervalId);
    }
  }, 1000);
};

// 获取年月日
const getTodayYMD = function () {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0'); // 月份从0开始
  const day = String(now.getDate()).padStart(2, '0');
  return `${ year }-${ month }-${ day }`;
};
// 复制
const copyToClipboard = async (text) => {
  if (!text || text === '--') {
    Funcs.Notify('提示', '无可复制的内容', 'warning');
    return;
  }

  try {
    await navigator.clipboard.writeText(text);
    Funcs.Notify('成功', '已复制到剪贴板', 'success');
  }
  catch (err) {
    fallbackCopyText(text);
  }
};
const formatTime = (time) => {
  const d = new Date(time);

  const pad = (n) => String(n).padStart(2, '0');

  return `${ d.getFullYear() }-${ pad(d.getMonth() + 1)
  }-${ pad(d.getDate()) } ${ pad(d.getHours())
  }:${ pad(d.getMinutes()) }:${ pad(d.getSeconds()) }`;
};
const fallbackCopyText = (text) => {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  document.body.appendChild(textarea);
  textarea.select();
  try {
    document.execCommand('copy');
    Funcs.Notify('成功', '已复制到剪贴板', 'success');
  }
  catch (err) {
    Funcs.Notify('错误', '复制失败，请手动复制', 'error');
  }
  document.body.removeChild(textarea);
};


// 处理监控的数据结构
// 展开状态：用 parentId 作为 key
const expanded = reactive({});
const parentIds = computed(() => {
  const ids = new Set();
  photoList.value.forEach(item => {
    if (item.ParentID) {
      ids.add(item.ParentID);
    }
  });
  return ids;
});
// 计算属性：分离独立项（无 parentId）
const independentItems = computed(() => {
  const allDeviceKeys = new Set(photoList.value.map(item => item.DeviceKey));
  return photoList.value.filter(item => {
    // ParentID 为空，或者 ParentID 指向的设备不存在（即不在 allDeviceKeys 中）
    const isParentMissing = !item.ParentID || !allDeviceKeys.has(item.ParentID);
    // 自己的 DeviceKey 不是任何其他项的 ParentID
    const isNotAParent = !parentIds.value.has(item.DeviceKey);
    return isParentMissing && isNotAParent;
  });

});

// 子设备分组：parentId -> [子设备...]
const childGroups = computed(() => {
  const groups = {};
  photoList.value.forEach(item => {
    if (item.ParentID) {
      if (!groups[ item.ParentID ]) groups[ item.ParentID ] = [];
      if (item.ParentID != item.DeviceKey) {
        groups[ item.ParentID ].push(item);
      }
    }
  });
  return groups;
});
// 计算属性：按 parentId 分组（仅包含有 parentId 的项）
const parentDevices = computed(() => {
  const parents = [];
  const seen = new Set();
  photoList.value.forEach(item => {
    if (parentIds.value.has(item.DeviceKey) && !seen.has(item.DeviceKey)) {
      parents.push(item);
      seen.add(item.DeviceKey);
    }
  });
  return parents;
});
const toggleExpand = (parentId) => {
  expanded[ parentId ] = !expanded[ parentId ];
};
const getStatusClass = (netState) => {
  if (netState === 1) return 'online';
  if (netState === 2) return 'offline';
  return 'gray';
};
</script>
<style>
.DispatchTab .fasr_tabs_494f6b .q-card {
  background-color: unset;
  border-radius: 12px;
}

.DispatchTab .q-tabs.bg-white {
  border-radius: 12px 12px 0 0;
}

.DispatchTab .q-tab-panels {
  background: unset;
}
.tr-input-noborder .t-input {
  border: none !important;
}
@media (max-width: 768px) {
  .tr-input-default {
    background: transparent;
  }
  .fasr_select_helper_1ce26a .q-field__control {
    background: transparent !important;
  }
  .LayoutGrid_1c95c5 {
    padding-left: 16px;
  }
  .fasr_tabs_494f6b {
    margin: 0 !important;
  }
  .tabs-wrap .bg-white {
    background-color: transparent !important;
  }
}
</style>
<style scoped>
.fasr_select_77cb3b {
  width: 200px !important;
}

.tr-tabs {
  width: auto !important;
}

.q-card.q-card--flat.no-shadow {
  border-radius: 12px;
}
.mobileTitle {
  height: 36px;
  padding-left: 12px;
  padding-right: 12px;
  font-weight: 600;
  font-size: 16px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: flex-end;
}
.mobileTitle .icon-t-left-outlined {
  color: rgba(var(--t-color-rgb), 0.8);
  font-size: 14px;
  color: rgb(50, 51, 53);
  padding: 0 5px;
  position: absolute;
  left: 12px;
  bottom: 0;
  line-height: 1;
}
</style>
