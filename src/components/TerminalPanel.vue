<template>
    <div class='UC_TerminalList'
         v-show='mappingProps.visible'
         style="width: 100%;">
        <div :ref='el => Widget["fasr_div_8dddfd"] = el'
             style='flex-direction:column;    flex-wrap:nowrap;    display:flex;    row-gap:12px;    height:100%;        outline:0!important'
             class='fasr_div_8dddfd '
             :tabIndex='-1'
             instanceCode='fasr_div_8dddfd'>
            <div v-if="ISPC"
                 :ref='el => Widget["fasr_div_368174"] = el'
                 style='flex-direction:row;    flex-wrap:nowrap;    justify-content:flex-start;    align-items:flex-start;    display:flex;    column-gap:40px;    row-gap:16px;              padding: 16px 24px;  outline:0!important'
                 class='fasr_div_368174 '
                 :tabIndex='-1'
                 instanceCode='fasr_div_368174'>
                <div :ref='el => Widget["fasr_div_d101c8"] = el'
                     style='flex-direction:column;    flex-wrap:nowrap;    justify-content:space-between;    display:flex;    row-gap:10px;    height:100%;    align-items:flex-start;        outline:0!important'
                     class='fasr_div_d101c8 '
                     :tabIndex='-1'
                     instanceCode='fasr_div_d101c8'>
                    <div :ref='el => Widget["fasr_div_ef86b5"] = el'
                         style='flex-direction:row;    flex-wrap:nowrap;    justify-content:flex-start;    display:flex;    align-items:center;    gap:16px;        outline:0!important'
                         class='fasr_div_ef86b5 '
                         :tabIndex='-1'
                         instanceCode='fasr_div_ef86b5'>
                        <t-label :ref='el => Widget["fasr_label_7beac9"] = el'
                                 style='    font-size:14px;    color:rgba(0,0,0,0.80);    white-space: nowrap;'
                                 class='fasr_label_7beac9'
                                 instanceCode='fasr_label_7beac9'
                                 valueType='static'
                                 :showHint='true'
                                 :tabIndex='1'
                                 :constValue="$t('Schema.Page.UCTerminalList.Controls.fasr_label_7beac9.ConstValue', '终端状态')">
                        </t-label>
                        <div :ref='el => Widget["fasr_div_688b40"] = el'
                             style='flex-direction:row;    flex-wrap:wrap;    justify-content:flex-start;    align-items:center;    display:flex;  column-gap: 12px;   row-gap:12px;        outline:0!important'
                             class='fasr_div_688b40 '
                             :tabIndex='-1'
                             instanceCode='fasr_div_688b40'>
                            <!-- 移除了"全部"选项 -->
                            <div :ref='el => Widget["fasr_free"] = el'
                                 style='height:32px;    padding-top:4px;    padding-right:10px;    padding-bottom:4px;    padding-left:10px;    flex-direction:row;    flex-wrap:nowrap;    justify-content:center;    align-items:center;    display:flex;        background:#EDEFF3;    border-radius:4px;    cursor: pointer'
                                 class='fasr_free '
                                 :tabIndex='-1'
                                 instanceCode='fasr_free'
                                 @click='fasr_free_OnClick'>
                                <t-label :ref='el => Widget["fasr_label_f195827_Copyf"] = el'
                                         style='    font-family:AlibabaPuHuiTi;    font-size:14px;    color:rgba(0,0,0,0.80);    user-select: none;'
                                         class='fasr_label_f195827_Copyf'
                                         instanceCode='fasr_label_f195827_Copyf'
                                         valueType='expression'
                                         :showHint='true'
                                         :tabIndex='1'
                                         :labelValue="`空闲 ${LocalVars.pileStates.FreeStatePileCount}`">
                                </t-label>
                            </div>
                            <div :ref='el => Widget["fasr_charging"] = el'
                                 style='height:32px;    padding-top:4px;    padding-right:10px;    padding-bottom:4px;    padding-left:10px;    flex-direction:row;    flex-wrap:nowrap;    justify-content:center;    align-items:center;    display:flex;        background:#EDEFF3;    border-radius:4px;    cursor: pointer'
                                 class='fasr_charging '
                                 :tabIndex='-1'
                                 instanceCode='fasr_charging'
                                 @click='fasr_charging_OnClick'>
                                <t-label :ref='el => Widget["fasr_label_f307732_Copyf"] = el'
                                         style='    font-family:AlibabaPuHuiTi;    font-size:14px;    color:rgba(0,0,0,0.80);    user-select: none;'
                                         class='fasr_label_f307732_Copyf'
                                         instanceCode='fasr_label_f307732_Copyf'
                                         valueType='expression'
                                         :showHint='true'
                                         :tabIndex='1'
                                         :labelValue="`充电中 ${LocalVars.pileStates.ChargingStatePileCount}`">
                                </t-label>
                            </div>
                            <div :ref='el => Widget["fasr_gunInserted"] = el'
                                 style='height:32px;    padding-top:4px;    padding-right:10px;    padding-bottom:4px;    padding-left:10px;    flex-direction:row;    flex-wrap:nowrap;    justify-content:center;    align-items:center;    display:flex;        background:#EDEFF3;    border-radius:4px;    cursor: pointer'
                                 class='fasr_gunInserted '
                                 :tabIndex='-1'
                                 instanceCode='fasr_gunInserted'
                                 @click='fasr_gunInserted_OnClick'>
                                <t-label :ref='el => Widget["fasr_label_f910963_Copyf"] = el'
                                         style='    font-family:AlibabaPuHuiTi;    font-size:14px;    color:rgba(0,0,0,0.80);    user-select: none;'
                                         class='fasr_label_f910963_Copyf'
                                         instanceCode='fasr_label_f910963_Copyf'
                                         valueType='expression'
                                         :showHint='true'
                                         :tabIndex='1'
                                         :labelValue="`已插枪 ${LocalVars.pileStates.ConnectedChargingCount}`">
                                </t-label>
                            </div>
                            <div :ref='el => Widget["fasr_chargeFull"] = el'
                                 style='height:32px;    padding-top:4px;    padding-right:10px;    padding-bottom:4px;    padding-left:10px;    flex-direction:row;    flex-wrap:nowrap;    justify-content:center;    align-items:center;    display:flex;        background:#EDEFF3;    border-radius:4px;    cursor: pointer'
                                 class='fasr_chargeFull '
                                 :tabIndex='-1'
                                 instanceCode='fasr_chargeFull'
                                 @click='fasr_chargeFull_OnClick'>

                                <t-label :ref='el => Widget["fasr_label_f852558_Copyf"] = el'
                                         style='    font-family:AlibabaPuHuiTi;    font-size:14px;    color:rgba(0,0,0,0.80);    user-select: none;'
                                         class='fasr_label_f852558_Copyf'
                                         instanceCode='fasr_label_f852558_Copyf'
                                         valueType='expression'
                                         :showHint='true'
                                         :tabIndex='1'
                                         :labelValue="`已充满 ${LocalVars.pileStates.FullChargingCount}`">
                                </t-label>
                            </div>
                            <div :ref='el => Widget["fasr_offGrid"] = el'
                                 style='height:32px;    padding-top:4px;    padding-right:10px;    padding-bottom:4px;    padding-left:10px;    flex-direction:row;    flex-wrap:nowrap;    justify-content:center;    align-items:center;    display:flex;        background:#EDEFF3;    border-radius:4px;    cursor: pointer'
                                 class='fasr_offGrid '
                                 :tabIndex='-1'
                                 instanceCode='fasr_offGrid'
                                 @click='fasr_offGrid_OnClick'>
                                <t-label :ref='el => Widget["fasr_label_f505041_Copyf"] = el'
                                         style='    font-family:AlibabaPuHuiTi;    font-size:14px;    color:rgba(0,0,0,0.80);    user-select: none;'
                                         class='fasr_label_f505041_Copyf'
                                         instanceCode='fasr_label_f505041_Copyf'
                                         valueType='expression'
                                         :showHint='true'
                                         :tabIndex='1'
                                         :labelValue="`离网 ${LocalVars.pileStates.OffLineStatePileCount}`">
                                </t-label>
                            </div>
                            <div :ref='el => Widget["fasr_faulty"] = el'
                                 style='height:32px;    padding-top:4px;    padding-right:10px;    padding-bottom:4px;    padding-left:10px;    flex-direction:row;    flex-wrap:nowrap;    justify-content:center;    align-items:center;    display:flex;        background:#EDEFF3;    border-radius:4px;    cursor: pointer'
                                 class='fasr_faulty '
                                 :tabIndex='-1'
                                 instanceCode='fasr_faulty'
                                 @click='fasr_faulty_OnClick'>
                                <t-label :ref='el => Widget["fasr_label_f846431_Copyf"] = el'
                                         style='    font-family:AlibabaPuHuiTi;    font-size:14px;    color:rgba(0,0,0,0.80);    user-select: none;'
                                         class='fasr_label_f846431_Copyf'
                                         instanceCode='fasr_label_f846431_Copyf'
                                         valueType='expression'
                                         :showHint='true'
                                         :tabIndex='1'
                                         :labelValue="`故障 ${LocalVars.pileStates.FaultStatePileCount}`">
                                </t-label>
                            </div>
                            <div :ref='el => Widget["fasr_other"] = el'
                                 style='height:32px;    padding-top:4px;    padding-right:10px;    padding-bottom:4px;    padding-left:10px;    flex-direction:row;    flex-wrap:nowrap;    justify-content:center;    align-items:center;    display:flex;        background:#EDEFF3;    border-radius:4px;    cursor: pointer'
                                 class='fasr_other '
                                 :tabIndex='-1'
                                 instanceCode='fasr_other'
                                 @click='fasr_other_OnClick'>
                                <t-label :ref='el => Widget["fasr_label_f287572_Copyf"] = el'
                                         style='    font-family:AlibabaPuHuiTi;    font-size:14px;    color:rgba(0,0,0,0.80);    user-select: none;'
                                         class='fasr_label_f287572_Copyf'
                                         instanceCode='fasr_label_f287572_Copyf'
                                         valueType='expression'
                                         :showHint='true'
                                         :tabIndex='1'
                                         :labelValue="`其他 ${LocalVars.pileStates.OtherStatePileCount}`">
                                </t-label>
                            </div>
                        </div>
                    </div>
                </div>
                <div :ref='el => Widget["fasr_div_ef762420_Copyb762420_Copy"] = el'
                     style='flex-direction:column;    flex-wrap:nowrap;    justify-content:flex-start;    display:flex;    row-gap:8px;    align-items:flex-start;    column-gap:8px;        outline:0!important;    flex-grow: 1'
                     class='fasr_div_ef762420_Copyb762420_Copy '
                     :tabIndex='-1'
                     instanceCode='fasr_div_ef762420_Copyb762420_Copy'>
                    <div :ref='el => Widget["fasr_div_c243f3"] = el'
                         style='flex-direction:row;    flex-wrap:nowrap;    justify-content:flex-start;    align-items:center;    display:flex;    gap:16px;        outline:0!important'
                         class='fasr_div_c243f3 '
                         :tabIndex='-1'
                         instanceCode='fasr_div_c243f3'>
                        <div :ref='el => Widget["fasr_div_6d686d"] = el'
                             style='flex-direction:row;    flex-wrap:nowrap;    justify-content:flex-start;    align-items:center;    display:flex;    column-gap:5px;        outline:0!important'
                             class='fasr_div_6d686d '
                             :tabIndex='-1'
                             instanceCode='fasr_div_6d686d'>
                            <t-label :ref='el => Widget["fasr_label_937101_Copybeac937101_Copy"] = el'
                                     style='    font-size:14px;    color:rgba(0,0,0,0.80);    white-space: nowrap;'
                                     class='fasr_label_937101_Copybeac937101_Copy'
                                     instanceCode='fasr_label_937101_Copybeac937101_Copy'
                                     valueType='static'
                                     :showHint='true'
                                     :tabIndex='1'
                                     :constValue="$t('Schema.Page.UCTerminalList.Controls.fasr_label_937101_Copybeac937101_Copy.ConstValue', '异常终端')">
                            </t-label>
                        </div>
                        <div :ref='el => Widget["fasr_div_400655_Copyb400655_Copy"] = el'
                             style='flex-direction:row;    flex-wrap:nowrap;    justify-content:flex-start;    align-items:center;    display:flex;    column-gap:12px;        outline:0!important'
                             class='fasr_div_400655_Copyb400655_Copy '
                             :tabIndex='-1'
                             instanceCode='fasr_div_400655_Copyb400655_Copy'>
                            <div :ref='el => Widget["fasr_high"] = el'
                                 style='height:32px;    padding-top:4px;    padding-right:10px;    padding-bottom:4px;    padding-left:10px;    flex-direction:row;    flex-wrap:nowrap;    justify-content:center;    align-items:center;    display:flex;        background:#EDEFF3;    border-radius:4px;    cursor: pointer'
                                 class='fasr_high '
                                 :tabIndex='-1'
                                 instanceCode='fasr_high'
                                 @click='fasr_high_OnClick'>
                                <t-label :ref='el => Widget["fasr_label_f390545_Copyf"] = el'
                                         style='   white-space: nowrap;   font-size:14px;    color:rgba(0,0,0,0.80)'
                                         class='fasr_label_f390545_Copyf'
                                         instanceCode='fasr_label_f390545_Copyf'
                                         valueType='expression'
                                         :showHint='true'
                                         :tabIndex='1'
                                         :labelValue="`高异常 ${LocalVars.pileStates.HighAbnormalCount}`">
                                </t-label>
                            </div>
                            <div :ref='el => Widget["fasr_slow"] = el'
                                 style='height:32px;    padding-top:4px;    padding-right:10px;    padding-bottom:4px;    padding-left:10px;    flex-direction:row;    flex-wrap:nowrap;    justify-content:center;    align-items:center;    display:flex;        background:#EDEFF3;    border-radius:4px;    cursor: pointer'
                                 class='fasr_slow '
                                 :tabIndex='-1'
                                 instanceCode='fasr_slow'
                                 @click='fasr_slow_OnClick'>
                                <t-label :ref='el => Widget["fasr_label_f613168_Copyf"] = el'
                                         style='  white-space: nowrap;   font-size:14px;    color:rgba(0,0,0,0.80)'
                                         class='fasr_label_f613168_Copyf'
                                         instanceCode='fasr_label_f613168_Copyf'
                                         valueType='expression'
                                         :showHint='true'
                                         :tabIndex='1'
                                         :labelValue="`充电慢 ${LocalVars.pileStates.ChargeSlowCount}`">
                                </t-label>
                            </div>
                        </div>
                    </div>

                </div>
                <t-select itemsDataSourceType='dynamic'
                          :label="$t('Schema.Page.Page115124.Controls.fasr_select7d4893.label', '集控器')"
                          :useInput='true'
                          helpPlacement='bottom'
                          labelPosition='left'
                          optionsPosition=''
                          valueField="value"
                          displayField="label"
                          :listDataSource='CtrlList'
                          v-model="SelectedCtrlId">
                </t-select>
            </div>
            <div v-if="!ISPC"
                 class="mobile-filters">
                <div class="mobile-filter-section">
                    <div class="mobile-filter-section-title">终端状态</div>
                    <div class="mobile-filter-row">
                        <div :ref='el => Widget["fasr_freeMobile"] = el'
                             class="mobile-filter-item"
                             @click='fasr_freeMobile_OnClick'>
                            空闲 {{ LocalVars.pileStates.FreeStatePileCount }}
                        </div>
                        <div :ref='el => Widget["fasr_chargingMobile"] = el'
                             class="mobile-filter-item"
                             @click='fasr_chargingMobile_OnClick'>
                            充电中 {{ LocalVars.pileStates.ChargingStatePileCount }}
                        </div>
                        <div :ref='el => Widget["fasr_gunInsertedMobile"] = el'
                             class="mobile-filter-item"
                             @click='fasr_gunInsertedMobile_OnClick'>
                            已插枪 {{ LocalVars.pileStates.ConnectedChargingCount }}
                        </div>
                        <div :ref='el => Widget["fasr_chargeFullMobile"] = el'
                             class="mobile-filter-item"
                             @click='fasr_chargeFullMobile_OnClick'>
                            已充满 {{ LocalVars.pileStates.FullChargingCount }}
                        </div>
                        <div :ref='el => Widget["fasr_offGridMobile"] = el'
                             class="mobile-filter-item"
                             @click='fasr_offGridMobile_OnClick'>
                            离网 {{ LocalVars.pileStates.OffLineStatePileCount }}
                        </div>
                        <div :ref='el => Widget["fasr_faultyMobile"] = el'
                             class="mobile-filter-item"
                             @click='fasr_faultyMobile_OnClick'>
                            故障 {{ LocalVars.pileStates.FaultStatePileCount }}
                        </div>
                        <div :ref='el => Widget["fasr_otherMobile"] = el'
                             class="mobile-filter-item"
                             @click='fasr_otherMobile_OnClick'>
                            其他 {{ LocalVars.pileStates.OtherStatePileCount }}
                        </div>
                    </div>
                </div>
                <div class="mobile-filter-section">
                    <div class="mobile-filter-section-title">异常终端</div>
                    <div class="mobile-filter-row">
                        <div :ref='el => Widget["fasr_highMobile"] = el'
                             class="mobile-filter-item"
                             @click='fasr_highMobile_OnClick'>
                            高异常 {{ LocalVars.pileStates.HighAbnormalCount }}
                        </div>
                        <div :ref='el => Widget["fasr_slowMobile"] = el'
                             class="mobile-filter-item"
                             @click='fasr_slowMobile_OnClick'>
                            充电慢 {{ LocalVars.pileStates.ChargeSlowCount }}
                        </div>
                    </div>
                </div>
            </div>
            <div class="111  tab-container"
                 style="min-height: calc(100vh - 206px);padding: 12px; border-radius: 12px 12px 0 0; background: #FFF; display:flex; flex-direction:column; flex:1; ">
                <div class="filter"
                     style="display: flex;justify-content: space-between;margin-bottom: 12px;">
                    <t-label style='opacity:100%'
                             class='lockTitle tr-lable-keyindicatorsname'
                             instanceCode='lockTitle'
                             valueType='static'
                             :showHint='true'
                             :tabIndex='1'
                             constValue='设备列表'>
                    </t-label>
                    <div :ref='el => Widget["fasr_div_9b8faf"] = el'
                         style='flex-direction:row;    flex-wrap:nowrap;    justify-content:flex-end;    align-items:center;    display:flex;    column-gap:10px;           outline:0!important'
                         class='fasr_div_9b8faf '
                         :tabIndex='-1'
                         instanceCode='fasr_div_9b8faf'>
                        <template v-if="ISPC">
                            <t-button :ref='el => Widget["fasr_div_filed"] = el'
                                      v-show=" LocalVars.isDetail"
                                      class="tr-button-default"
                                      label="字段设置"
                                      :showHint="true"
                                      :tabIndex="1"
                                      @click="fasr_div_filed_OnClick">
                            </t-button>
                            <div :ref='el => Widget["fasr_div_94e00c"] = el'
                                 style='flex-direction:row;    flex-wrap:nowrap;    justify-content:flex-end;    align-items:center;    display:flex;    column-gap:4px;        outline:0!important'
                                 class='fasr_div_94e00c '
                                 :tabIndex='-1'
                                 instanceCode='fasr_div_94e00c'>
                                <t-label :ref='el => Widget["fasr_label_288174_Copye288174_Copyc288174_Copy"] = el'
                                         style='    font-family:AlibabaPuHuiTi;    font-size:14px;    color:rgba(0,0,0,0.56)'
                                         class='fasr_label_288174_Copye288174_Copyc288174_Copy'
                                         instanceCode='fasr_label_288174_Copye288174_Copyc288174_Copy'
                                         valueType='static'
                                         :showHint='true'
                                         :tabIndex='1'
                                         :constValue="$t('Schema.Page.UCTerminalList.Controls.fasr_label_288174_Copye288174_Copyc288174_Copy.ConstValue', '详细信息')">
                                </t-label>
                                <t-toggle :ref='el => Widget["fasr_toggle_1a3051"] = el'
                                          style='opacity:100%'
                                          class='fasr_toggle_1a3051'
                                          instanceCode='fasr_toggle_1a3051'
                                          :label="$t('Schema.Page.UCTerminalList.Controls.fasr_toggle_1a3051.Label', '详细信息')"
                                          helpPlacement='bottom'
                                          labelPosition='left'
                                          :tabIndex='1'
                                          :hideLabel='true'
                                          @change='fasr_toggle_1a3051_OnChange'
                                          v-model='LocalVars.isDetail'>
                                </t-toggle>
                            </div>
                            <t-button class="tr-button-primary"
                                      label="一键开启充电"
                                      :showHint="true"
                                      :tabIndex="1"
                                      :loading="LoadingStartOneKeyCharge"
                                      @click="startCharging">
                            </t-button>
                            <t-button class="tr-button-default"
                                      label="一键结束充电"
                                      :showHint="true"
                                      :tabIndex="1"
                                      :loading="LoadingStopOneKeyCharge"
                                      @click="stopCharging">
                            </t-button>
                            <t-button class="tr-button-default"
                                      label="定时充电"
                                      :showHint="true"
                                      :tabIndex="1"
                                      @click="setTimedCharging">
                            </t-button>
                        </template>
                        <i v-if="!ISPC"
                           class="fas icon-t-refresh"
                           @click="handleMobileRefreshIconClick">
                        </i>

                        <div v-if="!ISPC"
                             class="mobile-action-menu-wrapper"
                             ref="mobileActionMenuRef">
                            <button class="mobile-action-trigger"
                                    @click.stop="toggleMobileActionMenu">
                                ⋯
                            </button>
                            <div v-if="mobileActionMenuVisible"
                                 class="mobile-action-menu"
                                 @click.stop>
                                <span class="mobile-action-item"
                                      @click="handleMobileStartCharging">
                                    一键开启充电
                                </span>
                                <span class="mobile-action-item"
                                      @click="handleMobileStopCharging">
                                    一键结束充电
                                </span>
                                <span class="mobile-action-item"
                                      @click="handleMobileSetTimedCharging">
                                    定时充电
                                </span>
                                <span class="mobile-action-item mobile-action-item-toggle">
                                    <span>详细信息</span>
                                    <t-toggle style='opacity:100%'
                                              class='fasr_toggle_1a3051'
                                              :label="$t('Schema.Page.UCTerminalList.Controls.fasr_toggle_1a3051.Label', '详细信息')"
                                              helpPlacement='bottom'
                                              labelPosition='left'
                                              :tabIndex='1'
                                              :hideLabel='true'
                                              @change='fasr_toggle_1a3051_OnChange'
                                              v-model='LocalVars.isDetail'>
                                    </t-toggle>
                                </span>
                                <span v-if="LocalVars.isDetail"
                                      class="mobile-action-item"
                                      @click="handleMobileFiledSetting">
                                    字段设置
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="terminal-list-scroll">
                    <div v-if="LoadingPiles"
                         class="terminal-loading">
                        <div class="terminal-loading-spinner"></div>
                    </div>
                    <fasr_terminals_code :ref='el => Widget["fasr_terminals"] = el'
                                         style='width:100%; height:auto; gap:10px;  border-radius:12px; flex:1; min-height:0;'
                                         class='fasr_terminals .terminal .pile .piles'
                                         instanceCode='fasr_terminals'
                                         :tabIndex='1'
                                         :localVars='LocalVars'
                                         @OnFireEvent='fasr_terminals_OnFireEvent'>
                    </fasr_terminals_code>
                </div>
            </div>

        </div>
        <TerminalSettingsDrawr ref="terminalSettingsDrawrRef"
                               @updateskillsmp="updateSkillsmp" />
        <t-dialog v-model:show="IfShowTimingOneKeyCharge"
                  :position="positionDialog">
            <div style='background:#FFFFFF;width:520px;'>
                <div class='div-top-dialog-title'>
                    <t-label class="div-top-dialog-font"
                             :tabIndex='1'
                             valueType='static'
                             :showHint='true'
                             constValue='定时充电'>
                    </t-label>
                    <t-button class=' tr-button-icon-text2'
                              label=''
                              icon='fas dx-icon icon-t-delete-01'
                              :showHint='true'
                              @click="IfShowTimingOneKeyCharge = false"
                              :tabIndex='1'
                              v-close-popup>
                    </t-button>
                </div>
                <div class='tr-div-dialog'>
                    <div class="m-card"
                         v-if="TimingOneKeyCharge.length > 0">
                        <div class="card">
                            <div class="item">
                                <div class="field">电站</div>
                                <div class="value">{{ _this.CurrentStation.Name }}</div>
                            </div>
                            <div class="item">
                                <div class="field">充电时间</div>
                                <div class="value">
                                    <div class="time-item"
                                         :key="item.ChargeTime"
                                         v-for="item in TimingOneKeyCharge">
                                        {{ item.ChargeTime }}</div>

                                </div>
                            </div>
                            <div class="item">
                                <div class="field">定时类型</div>
                                <div class="value">
                                    <span>{{ TimingOneKeyCharge[0].TimeType == 1 ? '仅定时一次' : '长期定时' }}</span>
                                    <span v-if="TimingOneKeyCharge[0].IsCompensate == 0">（充电失败后3分钟自动重试）</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="m-card"
                         v-else>
                        <div class="card">
                            <div class="item">
                                <div class="field">电站</div>
                                <div class="value">{{ _this.CurrentStation.Name }}</div>
                            </div>
                            <div class="item">
                                <div class="field">充电时间</div>
                                <div class="value"
                                     id="OneCharge">
                                    <div class="time-input"
                                         style="margin-top:8px;display:flex;"
                                         :key="index"
                                         v-for="(item, index) in _this.FmTimingOneKeyCharge.ChargeTimeList">
                                        <!-- 时间控件 -->
                                        <!-- <el-time-picker v-model="item.time" style="max-width: 75%;" format="HH:mm"
                                    value-format="HH:mm" :picker-options="{format: 'HH:mm'}" placeholder="任意时间点" /> -->
                                        <t-date-time style="max-width: 75%;"
                                                     v-model="item.time"
                                                     class='tr-datetime-div'
                                                     :hideLabel='true'
                                                     displayFormatWithTime='HH:mm'
                                                     helpPlacement='bottom'
                                                     dateType='time'
                                                     placeholder="任意时间点">
                                        </t-date-time>
                                        <!-- 减号按钮 -->
                                        <t-button icon="fas dx-icon icon-t-delete-01"
                                                  label=""
                                                  class="tr-button-icon-default"
                                                  :show-hint="true"
                                                  v-show="_this.FmTimingOneKeyCharge.ChargeTimeList.length > 1"
                                                  style="margin-left: 10px"
                                                  @click="removeChargeTimeList(index)" />
                                    </div>

                                    <div v-show="_this.FmTimingOneKeyCharge.ChargeTimeList.length < 6"
                                         style="margin-top:8px;">
                                        <!-- 添加按钮 -->
                                        <t-button label="添加"
                                                  class="tr-button-default"
                                                  :show-hint="true"
                                                  icon="add"
                                                  @click="addChargeTimeList" />
                                        <span>（最多添加6个，仍可添加 {{ 6 - _this.FmTimingOneKeyCharge.ChargeTimeList.length }}
                                            个）</span>
                                    </div>
                                </div>
                            </div>
                            <div class="item">
                                <div class="field">定时类型</div>
                                <div class="value">
                                    <div>
                                        <!-- <el-checkbox v-model=""
                                                 :true-label="0"
                                                 :false-label="1"></el-checkbox> -->
                                        <t-checkbox-group label=""
                                                          v-model="_this.FmTimingOneKeyCharge.IsCompensate"
                                                          displayFiled="label"
                                                          valueFiled="value"
                                                          :readonly="TimingOneKeyCharge.length == 0"
                                                          :options="[
                        { label: '充电失败后3分钟自动重试（仅重试一次）', value: '0' },
                      ]" />
                                    </div>
                                    <div>
                                        <t-radio-group label=""
                                                       labelPosition="left"
                                                       :inline="true"
                                                       v-model="_this.FmTimingOneKeyCharge.TimeType"
                                                       :options="_this.OneKeyChargeTimeType">
                                        </t-radio-group>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <span slot="footer"
                          class="select_helper_popup_foot">
                        <div v-if="TimingOneKeyCharge.length > 0">
                            <t-button flat
                                      label="返回"
                                      class="tr-button-default"
                                      @click="IfShowTimingOneKeyCharge = false" />
                            <t-button flat
                                      label="撤销"
                                      class="tr-button-primary"
                                      :loading="_this.LoadingRemoveTimingOneKeyCharge"
                                      @click="removeTimingOneKeyCharge" />
                        </div>
                        <div v-else>
                            <t-button flat
                                      label="返回"
                                      class="tr-button-default"
                                      @click="IfShowTimingOneKeyCharge = false" />
                            <t-button flat
                                      label="保存"
                                      class="tr-button-primary"
                                      @click="saveTimingOneKeyCharge" />
                        </div>
                    </span>
                </div>
            </div>
        </t-dialog>
    </div>
</template>

<script setup lang="ts">
import {
  ref,
  onBeforeMount,
  onMounted,
  computed,
  onUnmounted,
  reactive,
  nextTick,
  watch,
  provide,
  toRef,
  toRefs
} from 'vue';
import { DataQueryClass } from '../fas/models/DataQueryClass';
import { DataQueryClassAsync } from '../fas/models/DataQueryClassAsync';
import { ActionClass } from '../fas/models/ActionClass';
import { ActionClassAsync } from '../fas/models/ActionClassAsync';
const Funcs = window.Funcs;
import '../fas/action/Action_GetStaPiles.ts';
import '../fas/action/Action_GetStaAndPileCount.ts';
import '../fas/action/Action_GetPowerCharingAbnormalData.ts';
import TerminalSettingsDrawr from './TerminalSettingsDrawr.vue';

const screenWidth = ref(window.innerWidth);
const updateScreenWidth = () => {
  const newWidth = window.innerWidth;
  if (
    1 == 0
    || (newWidth < 768 && screenWidth.value >= 768)
    || (newWidth >= 768 && screenWidth.value < 768)
  ) {
    screenWidth.value = window.innerWidth;
  }
};
const positionDialog = ref('bottom');
if (window.innerWidth >= 768) {
  positionDialog.value = 'standard';
}
const ISPC = computed(() => screenWidth.value > 767);
const mobileActionMenuVisible = ref(false);
const mobileActionMenuRef = ref<HTMLElement | null>(null);
const toggleMobileActionMenu = () => {
  mobileActionMenuVisible.value = !mobileActionMenuVisible.value;
};
const closeMobileActionMenu = () => {
  mobileActionMenuVisible.value = false;
};
const handleMobileStartCharging = () => {
  closeMobileActionMenu();
  startCharging();
};
const handleMobileStopCharging = () => {
  closeMobileActionMenu();
  stopCharging();
};
const handleMobileSetTimedCharging = () => {
  closeMobileActionMenu();
  setTimedCharging();
};
const handleMobileRefreshIconClick = () => {
  CtrlMethod.refresh(LocalVars.StaId, {
    onCount :props.onRefreshCount
  });
};
const handleMobileFiledSetting = () => {
  closeMobileActionMenu();
  fasr_div_filed_OnClick(null);
};
const handleDocumentClick = (event: MouseEvent) => {
  if (!mobileActionMenuVisible.value) return;
  const target = event.target as Node | null;
  if (mobileActionMenuRef.value && target && !mobileActionMenuRef.value.contains(target)) {
    closeMobileActionMenu();
  }
};
import fasr_terminals_code from '../fas/component/fasr_terminals.vue';
const fireUCEvent = defineEmits([ 'OnLoaded', 'FiledSetting' ]);
const Widget = {
  fasr_div_8dddfd: null,
  fasr_div_368174: null,
  fasr_div_d101c8: null,
  fasr_div_ef86b5: null,
  fasr_label_7beac9: null,
  fasr_div_688b40: null,
  fasr_all: null,
  fasr_label_f121250_Copyf: null,
  fasr_label_f2752f: null,
  fasr_free: null,
  fasr_label_f586862_Copyf: null,
  fasr_label_f195827_Copyf: null,
  fasr_charging: null,
  fasr_label_f374990_Copyf: null,
  fasr_label_f307732_Copyf: null,
  fasr_gunInserted: null,
  fasr_label_f976281_Copyf: null,
  fasr_label_f910963_Copyf: null,
  fasr_chargeFull: null,
  fasr_label_f415594_Copyf: null,
  fasr_label_f852558_Copyf: null,
  fasr_offGrid: null,
  fasr_label_f457407_Copyf: null,
  fasr_label_f505041_Copyf: null,
  fasr_faulty: null,
  fasr_label_f372316_Copyf: null,
  fasr_label_f846431_Copyf: null,
  fasr_other: null,
  fasr_label_f105895_Copyf: null,
  fasr_label_f287572_Copyf: null,
  fasr_noCharge: null,
  fasr_noChargeLabel: null,
  fasr_noChargeCount: null,
  fasr_isCharge: null,
  fasr_isChargeLabel: null,
  fasr_noChargeCountMobile847497_Copy: null,
  fasr_unNotice: null,
  fasr_unNoticeLabel: null,
  fasr_unNoticeCount: null,
  fasr_over: null,
  fasr_overLabel: null,
  fasr_overCount: null,
  fasr_div_ef762420_Copyb762420_Copy: null,
  fasr_div_c243f3: null,
  fasr_div_6d686d: null,
  fasr_label_937101_Copybeac937101_Copy: null,
  fasr_div_400655_Copyb400655_Copy: null,
  fasr_high: null,
  fasr_label_f505415_Copyf: null,
  fasr_label_f390545_Copyf: null,
  fasr_slow: null,
  fasr_label_f296101_Copyf: null,
  fasr_label_f613168_Copyf: null,
  fasr_div_9b8faf: null,
  fasr_div_filed: null,
  fasr_icon_786711: null,
  fasr_label_42e9c2: null,
  fasr_div_94e00c: null,
  fasr_label_288174_Copye288174_Copyc288174_Copy: null,
  fasr_toggle_1a3051: null,
  fasr_div_8e3b84: null,
  fasr_div_59764b: null,
  fasr_allMobile: null,
  fasr_allStateMobile: null,
  fasr_allCountMobile: null,
  fasr_freeMobile: null,
  fasr_freeStateMobile: null,
  fasr_freeCountMobile: null,
  fasr_chargingMobile: null,
  fasr_chargingStateMobile: null,
  fasr_chargingCountMobile: null,
  fasr_gunInsertedMobile: null,
  fasr_gunInsertedStateMobile: null,
  fasr_gunInsertedCountMobile: null,
  fasr_chargeFullMobile: null,
  fasr_chargeFullStateMobile: null,
  fasr_chargeFullCountMobile: null,
  fasr_divState: null,
  fasr_div_884874_Copyb: null,
  fasr_offGridMobile: null,
  fasr_offGridStateMobile: null,
  fasr_offGridCountMobile: null,
  fasr_faultyMobile: null,
  fasr_faultyStateMobile: null,
  fasr_faultyCountMobile: null,
  fasr_otherMobile: null,
  fasr_otherStateMobile: null,
  fasr_otherCountMobile: null,
  fasr_highMobile: null,
  fasr_highStateMobile: null,
  fasr_highCountMobile: null,
  fasr_slowMobile: null,
  fasr_slowStateMobile: null,
  fasr_slowCountMobile: null,
  fasr_separator_755599: null,
  fasr_noChargeMobile: null,
  fasr_noChargeStateMobile: null,
  fasr_noChargeCountMobile: null,
  fasr_isChargeMobile: null,
  fasr_isChargeStateMobile: null,
  fasr_isChargeCountMobile: null,
  fasr_unNoticeMobile: null,
  fasr_unNoticeStateMobile: null,
  fasr_unNoticeCountMobile: null,
  fasr_overMobile: null,
  fasr_overStateMobile: null,
  fasr_overCountMobile: null,
  fasr_div_07ce8b: null,
  fasr_div_cd7389: null,
  fasr_div_cf3ff4: null,
  fasr_label_c6f301: null,
  fasr_toggle_30fa8f: null,
  fasr_div_filedMobile: null,
  fasr_icon_b0d14c: null,
  fasr_label_c847760_Copyf847760_Copy: null,
  fasr_div_cf246887_Copyff246887_Copy: null,
  fasr_maskOpen: null,
  fasr_maskClose: null,
  fasr_label_c832074_Copyf832074_Copy: null,
  fasr_div_517aa7: null,
  fasr_label_c353285_Copyf353285_Copy: null,
  fasr_down: null,
  fasr_up: null,
  fasr_terminals: null,
  FireUCEvent: fireUCEvent
};
const PageCode = ref('UC_TerminalList');
const PageID = ref('261ce5c6-25be-4834-9b83-36548229b226');
const PageName = ref('终端列表');
const DataQuery = new DataQueryClass();
DataQuery.Promise = new DataQueryClassAsync();
const Action = new ActionClass();
Action.Promise = new ActionClassAsync();
window.addPCStyle();
interface LocalVariable {
  isDetail: Any
  isMaskOpen: Any
  pileStates: Any
  selected: Any
  upDown: String
  infoSet: any
  isShow: String
  StaId: String
  StationName: String
}
function sgApiPost(sid, param) {
  return new Promise((resolve) => {
    const postData = {};
    Object.entries(param).forEach(([ k, v ]) => (postData[ k ] = JSON.stringify(v)));
    TFF.common.ajax
      .getDataAsync({
        url: TFF.common.ajax.getServiceUrl('SaaS-CM-' + sid),
        type: 'post',
        data: postData
      })
      .then((result) => {
        resolve({ msg: 'success', data: result });
      });
  });
}
const IfShowTimingOneKeyCharge = ref(false);
const TimingOneKeyCharge = ref<any[]>([]);
const _this = reactive({
  CurrentStation: reactive({
    ID: '',
    Name: ''
  }),
  FmTimingOneKeyCharge: reactive({
    ChargeTimeList: [] as { time: string }[],
    TimeType: 1,
    IsCompensate: 0,
    ChargeType: '1'
  }),
  LoadingRemoveTimingOneKeyCharge: ref(false),
  OneKeyChargeTimeType: [
    { label: '仅定时一次', value: 1 },
    { label: '长期定时', value: 2 }
  ]
});
const LoadingStartOneKeyCharge = ref(false);
const LoadingStopOneKeyCharge = ref(false);

const CtrlList = ref([ { label: '全部集控器', value: '' } ]);

function getCtrlList() {
  return new Promise((resolve) => {
    const CtrlInfo = {
      StaID: props.StaId || getRefValue(LocalVars.StaId),
      CtrlType: '',
      SecondSource: 'PowerDispatchingShow'
    };
    sgApiPost('TPS-GetCtrlListByStaSysAC', { filter: CtrlInfo }).then((result) => {
      const {
        msg,
        data: { state, data }
      } = result;
      if (msg == 'success' && state == '1' && data) {
        let tempList = data.CtrlList || [];
        tempList = tempList.map((item) => {
          return {
            label: item.Name,
            value: item.Code,
            Code: item.Code,
            Name: item.Name
          };
        });
        tempList.unshift({ label: '全部集控器', value: '' });

        CtrlList.value = tempList;
      }
      else {
      }
      resolve();
    });
  });
}
const getRefValue = (val) => {
  if (val && typeof val === 'object' && 'value' in val) {
    return val.value;
  }
  return val;
};

const getTimingOneKeyCharge = () => {
  const StaId = _this.CurrentStation.ID || getRefValue(LocalVars.StaId);
  if (!StaId) return;
  sgApiPost('TPS-GetTimingOneKeyChargeV2', { StaId }).then((result) => {
    const {
      msg,
      data: { state, data }
    } = result;
    if (msg == 'success' && state == '1' && data) {
      const { IsExist, TimingOnekeyChargeResult, DefaultTime } = data;
      if (IsExist == 1) {
        TimingOneKeyCharge.value = TimingOnekeyChargeResult || [];
      }
      else {
        TimingOneKeyCharge.value = [];
        _this.FmTimingOneKeyCharge.ChargeTimeList = DefaultTime ? [ { time: DefaultTime } ] : [];
      }
    }
  });
};

const saveTimingOneKeyCharge = () => {
  const StaId = _this.CurrentStation.ID || getRefValue(LocalVars.StaId);
  if (!StaId) return Funcs.Notify('消息', '请先选择电站', 'warning');

  const ChargeTimeList = _this.FmTimingOneKeyCharge.ChargeTimeList.map((v) => v.time);
  if (ChargeTimeList) {
    const timeInterval = 10;
    const ChargeTimeListUnix = ChargeTimeList.map((v) => new Date('2022-01-01 ' + v).getTime());

    for (let i = 0; i < ChargeTimeListUnix.length; i++) {
      for (let j = 0; j < ChargeTimeListUnix.length; j++) {
        if (
          i != j
          && Math.abs(ChargeTimeListUnix[ j ] - ChargeTimeListUnix[ i ]) < 60000 * timeInterval
        ) {
          Funcs.Notify('消息', '时间间隔必须大于等于' + timeInterval + '分钟!', 'warning');
          return;
        }
      }
    }
  }
  const param = {
    StaId,
    CustId: '',
    SecondSource: 'PowerDispatchingShow',
    ..._this.FmTimingOneKeyCharge,
    ChargeTimeList
  };

  sgApiPost('TPS-SaveTimingOneKeyCharge', { param }).then((result) => {
    const {
      msg,
      data: { state, data, errmsg }
    } = result;
    if (msg == 'success' && state == '1') {
      Funcs.Notify('消息', '定时成功', 'success');
      _this.FmTimingOneKeyCharge.ChargeTimeList = [];
      _this.FmTimingOneKeyCharge.TimeType = 1;
      _this.FmTimingOneKeyCharge.IsCompensate = 0;
      _this.FmTimingOneKeyCharge.ChargeType = '1';
      IfShowTimingOneKeyCharge.value = false;
    }
    else {
      Funcs.Notify('消息', errmsg || '定时失败', 'error');
    }
  });
};
const removeTimingOneKeyCharge = () => {
  _this.LoadingRemoveTimingOneKeyCharge.value = true;
  const staId = _this.CurrentStation.ID || getRefValue(LocalVars.StaId);
  sgApiPost('TPS-RemoveTimingOnekeyChargeV2', {
    staId,
    jobIdList: TimingOneKeyCharge.value.map((v) => v.JobId)
  }).then((result) => {
    _this.LoadingRemoveTimingOneKeyCharge.value = false;
    const {
      msg,
      data: { state, data }
    } = result;
    if (msg == 'success' && state == '1') {
      Funcs.Notify('消息', '移除成功', 'success');
      IfShowTimingOneKeyCharge.value = false;
    }
    else {
      Funcs.Notify('消息', result.errmsg || '移除失败', 'error');
    }
  });
};
const addChargeTimeList = () => {
  const { ChargeTimeList } = _this.FmTimingOneKeyCharge;
  if (ChargeTimeList.length === 0) {
    ChargeTimeList.push({ time: '00:00' });
    return;
  }
  const lastTime = ChargeTimeList[ ChargeTimeList.length - 1 ].time || '00:00';
  const newTime = new Date(new Date('2020-01-01 ' + lastTime).getTime() + 10 * 60 * 1000);
  const time = newTime.format('hh:mm');
  ChargeTimeList.push({ time });
};
const removeChargeTimeList = (index) => {
  _this.FmTimingOneKeyCharge.ChargeTimeList.splice(index, 1);
};
const startCharging = () => {
  if (LoadingStartOneKeyCharge.value) return;
  const List = LocalVars.Piles.filter((f) =>
    [ '已插枪', '已充电', '空闲' ].includes(f.PileRealTimeState)
  );
  const unList = LocalVars.Piles.filter(
    (f) => ![ '已插枪', '已充电', '空闲' ].includes(f.PileRealTimeState)
  );
  if (List.length == 0) {
    Funcs.Notify('消息', '当前没有处于\'已插枪或已充电或空闲（可启动充电）\'的终端', 'warning');
    return;
  }
  Funcs.Confirm(
    '提示',
    `确定要给本次${ List.length }个已插枪或已充电或空闲（可启动充电）的终端充电吗?`,
    () => {
      const param = {
        CustomerID: '', //客户ID
        SecondSource: 'PowerDispatchingShow',
        StaID: LocalVars.StaId,
        StaName: LocalVars.StationName,
        IsThirdStation: false,

        ctrlcanAddrList: List.map(
          ({
            PileCode,
            CtrlAddress,
            CanSN: CanAddress,
            PileId,
            TerminalRealtimeState: PileRealtimeState
          }) => ({ PileCode, CtrlAddress, CanAddress, PileId, PileRealtimeState })
        ), //集控器
        click_AllCount: List.length,
        PileCodes: List.map(({ PileCode }) => ({ PileCode })),
        OtherPileCodes: unList.map(
          ({
            PileCode,
            CtrlAddress,
            CanSN: CanAddress,
            PileId,
            TerminalRealtimeState: PileRealtimeState
          }) => ({ PileCode, CtrlAddress, CanAddress, PileId, PileRealtimeState })
        )
      };

      const sid = 'TPS-OneKeyChargeV2';

      LoadingStartOneKeyCharge.value = true;
      sgApiPost(sid, { param })
        .then((result) => {
          const {
            msg,
            data: { state, data, errmsg }
          } = result;
          if (msg == 'success' && state == '1') {
            Funcs.Notify('消息', '指令下发成功', 'success');
          }
          else {
            Funcs.Notify('消息', errmsg || '一键充电失败', 'warning');
          }
        })
        .finally(() => {
          LoadingStartOneKeyCharge.value = false;
        });
    }
  );
};
const setTimedCharging = () => {
  const staId = getRefValue(LocalVars.StaId);
  if (!staId) {
    Funcs.Notify('消息', '请先选择电站', 'warning');
    return;
  }
  _this.CurrentStation.ID = staId;
  _this.CurrentStation.Name = getRefValue(LocalVars.StationName) || _this.CurrentStation.Name;
  getTimingOneKeyCharge();
  IfShowTimingOneKeyCharge.value = true;
};

const stopCharging = () => {
  if (LoadingStopOneKeyCharge.value) return;
  if (LocalVars.Piles.length == 0) return Funcs.Notify('消息', '当前电站没有集控', 'warning');
    
  const param = {
    CustID: '', //客户ID
    StaID: LocalVars.StaId,
    CtrlAddressList: CtrlList.value.map((v) => v.Code).filter((v) => v) //集控器
  };

  const sid = 'TPS-GetStopChargeWithOneButtonCount';

  LoadingStopOneKeyCharge.value = true;
  sgApiPost(sid, { filter: param })
    .then((result) => {
      const {
        msg,
        data: { state, data, errmsg }
      } = result;
      if (msg == 'success' && state == '1') {
        if (data == 0) {
          Funcs.Notify('消息', '当前电站或所选集控没有需要停止充电的终端', 'warning');
        }
        else if (data > 0) {
          Funcs.Confirm(
            '提示',
            `目前总共 ${ data } 个正在充电的终端，确认全部停止充电吗？`,
            function () {
              stopOneKeyCharge();
            }
          );
        }
      }
      else {
        Funcs.Notify('消息', errmsg || '结束一键充电失败', 'error');
      }
    })
    .finally(() => {
      LoadingStopOneKeyCharge.value = false;
    });
};
const stopOneKeyCharge = () => {
  const param = {
    CustID: '', //客户ID
    StaID: LocalVars.StaId,
    CtrlAddressList: CtrlList.value.map((v) => v.Code).filter((v) => v) //集控器
  };

  const sid = 'TPS-StopChargeWithOneButton';

  LoadingStopOneKeyCharge.value = true;
  sgApiPost(sid, { param })
    .then((result) => {
      const {
        msg,
        data: { state, errmsg }
      } = result;
      if (msg == 'success' && state == '1') {
        Funcs.Notify('消息', '指令下发成功', 'success');
      }
      else {
        Funcs.Notify('消息', errmsg || '指令下发失败', 'error');
      }
    })
    .finally(() => {
      LoadingStopOneKeyCharge.value = false;
    });
};
const props = defineProps({
  infoSet: {
    type: Object,
    default: () => ({
      one: false,
      two: false,
      three: false,
      isDetail: false,
      oneOld: false,
      twoOld: false,
      threeOld: false
    })
  },
  isShow: { type: String, default: false },
  StaId: { type: String, default: '' },
  StationName: { type: String, default: '' },
  onRefreshCount: { type: Function, default: null },
  visible: { type: Boolean, default: true }
});
watch(
  () => props.StaId,
  (newStaId) => {
    if (newStaId) {
      getCtrlList();
      return;
    }
    CtrlList.value = [ { label: '全部集控器', value: '' } ];
  },
  { immediate: true }
);
let routeParam = TFF.common.api.Url.getParams();
const skey = TFF.common.api.Url.getUrlQuery('skey');
if (skey) {
  routeParam = JSON.parse(TFF.common.storage.LocalStorage.getItem(skey));
}
const SelectedCtrlId = ref('');
const LoadingPiles = ref(false);
const filterBySelectedCtrl = (list) => {
  const selectedId = getRefValue(SelectedCtrlId);
  if (!selectedId) return list;
  return list.filter((item) => item.CtrlAddress === selectedId);
};
const parseOccupyMinutes = (value) => {
  if (!value && value !== 0) return 0;
  if (typeof value === 'number') return value;
  const text = String(value);
  if (text.includes(':')) {
    const parts = text
      .split(':')
      .map((item) => parseInt(item, 10))
      .filter((item) => !Number.isNaN(item));
    if (parts.length >= 2) return parts[ 0 ] * 60 + parts[ 1 ];
  }
  const match = text.match(/\d+/);
  return match ? parseInt(match[ 0 ], 10) : 0;
};
const updatePileStatesByList = (list) => {
  const result = {
    AllCount: list.length,
    FreeStatePileCount: list.filter((pile) => pile.PileRealTimeState == '空闲').length,
    ChargingStatePileCount: list.filter((pile) => pile.PileRealTimeState == '充电中').length,
    ConnectedChargingCount: list.filter((pile) => pile.PileRealTimeState == '已插枪').length,
    FullChargingCount: list.filter((pile) => pile.PileRealTimeState == '已充满').length,
    OffLineStatePileCount: list.filter((pile) => pile.PileRealTimeState == '离网').length,
    FaultStatePileCount: list.filter(
      (pile) => pile.PileRealTimeState && pile.PileRealTimeState.includes('故障')
    ).length,
    OtherStatePileCount: list.filter(
      (pile) =>
        ![ '空闲', '充电中', '已插枪', '已充满', '离网', '故障' ].includes(pile.PileRealTimeState)
        && !String(pile.PileRealTimeState || '').includes('故障')
    ).length,
    HighAbnormalCount: list.filter((pile) => pile.IsHighAbnormal).length,
    ChargeSlowCount: list.filter((pile) => pile.IsChargeSlow).length,
    Occupy30mCount: list.filter((pile) => parseOccupyMinutes(pile.OccupyTime) >= 30).length,
    OccupyUnNoticeCount: list.filter((pile) => pile.IsNoGunOccupancy).length
  };
  Object.assign(LocalVars.pileStates, result);
};
watch(SelectedCtrlId, () => {
  CtrlMethod.refresh();
});
const LocalVars = reactive<LocalVariable>({
  isDetail: false,
  isMaskOpen: false,
  pileStates: {
    AllCount: 0,
    StaCount: 0,
    DCCount: 0,
    ACCount: 0,
    SuspendStaCount: 0,
    ChargingStatePileCount: 0,
    FreeStatePileCount: 0,
    OtherStatePileCount: 0,
    OffLineStatePileCount: 0,
    FaultStatePileCount: 0,
    NoChargingStatePileCount: 0,
    ConnectedChargingCount: 0,
    FullChargingCount: 0,
    FastChargingCount: 0,
    FastChargingFreeCount: 0,
    SlowChargingCount: 0,
    SlowChargingFreeCount: 0,
    SuddenStopCount: 0,
    HighAbnormalCount: 0,
    ChargeSlowCount: 0
  },
  selected: {
    all: false, // 默认不选中全部
    free: false,
    charging: false,
    gunInserted: false,
    chargeFull: false,
    offGrid: false,
    faulty: false,
    other: false,
    high: false,
    slow: false,

    noCharge: false,
    isCharge: false,
    unNotice: false,
    over: false
  },
  cachedPiles: [], // 缓存的原始数据，用于前端过滤
  infoSet: {
    one: false,
    two: false,
    three: false,
    isDetail: false,
    oneOld: false,
    twoOld: false,
    threeOld: false
  },
  upDown: '展开'
});

window.asd = LocalVars;
class CtrlMethods {
  refresh(stationID = LocalVars.StaId, { loading = false, onCount } = {}) {
    console.log('=== REFRESH METHOD CALLED ===');
    console.log('stationID:', stationID);
    console.log('loading:', loading);
    console.log('onCount callback:', !!onCount);
    console.log('Current selected states:', LocalVars.selected);
    console.log('About to call Action.Action_GetStaPiles...');

    // 根据传入的loading参数设置加载状态
    if (loading) {
      LoadingPiles.value = true;
    }

    const stateList = [
      'free',
      'charging',
      'gunInserted',
      'chargeFull',
      'offGrid',
      'faulty',
      'other',
      'high',
      'slow',
      'noCharge',
      'isCharge',
      'unNotice',
      'over'
    ];

    const count = Array.isArray(LocalVars.Piles) ? LocalVars.Piles.length : 0;
    Action.Action_GetStaPiles(stationID)
      .then((req) => {
        console.log('Action.Action_GetStaPiles response received:', !!req);
        
        if (req && req.Record && req.Record.Data) {
          console.log('Valid data received from server');
          const piles = _.cloneDeep(req.Record.Data.Piles);
          const basePiles = filterBySelectedCtrl(piles);
          console.log('Base piles after ctrl filter:', basePiles.length);

          // 缓存原始数据用于后续的前端过滤
          LocalVars.cachedPiles = basePiles;
          const hasSelectedCtrl = !!getRefValue(SelectedCtrlId);
          if (hasSelectedCtrl) {
            updatePileStatesByList(basePiles);
          }
          else {
            LocalVars.pileStates.FreeStatePileCount = req.Record.Data.FreeStatePileCount
              ? req.Record.Data.FreeStatePileCount
              : 0;
            LocalVars.pileStates.ChargingStatePileCount = req.Record.Data.ChargingStatePileCount
              ? req.Record.Data.ChargingStatePileCount
              : 0;
            LocalVars.pileStates.ConnectedChargingCount = req.Record.Data.ConnectedChargingCount
              ? req.Record.Data.ConnectedChargingCount
              : 0;
            LocalVars.pileStates.FullChargingCount = req.Record.Data.FullChargingCount
              ? req.Record.Data.FullChargingCount
              : 0;
            LocalVars.pileStates.OffLineStatePileCount = req.Record.Data.OffLineStatePileCount
              ? req.Record.Data.OffLineStatePileCount
              : 0;
            LocalVars.pileStates.FaultStatePileCount = req.Record.Data.FaultStatePileCount
              ? req.Record.Data.FaultStatePileCount
              : 0;
            LocalVars.pileStates.OtherStatePileCount = req.Record.Data.OtherStatePileCount
              ? req.Record.Data.OtherStatePileCount
              : 0;
            LocalVars.pileStates.AllCount = req.Record.Data.PileSum ? req.Record.Data.PileSum : 0;
            LocalVars.pileStates.HighAbnormalCount = req.Record.Data.HighAbnormalCount
              ? req.Record.Data.HighAbnormalCount
              : 0;
            LocalVars.pileStates.ChargeSlowCount = req.Record.Data.ChargeSlowCount
              ? req.Record.Data.ChargeSlowCount
              : 0;
            LocalVars.pileStates.Occupy30mCount = req.Record.Data.Occupy30mCount
              ? req.Record.Data.Occupy30mCount
              : 0;
            LocalVars.pileStates.OccupyUnNoticeCount = req.Record.Data.OccupyUnNoticeCount
              ? req.Record.Data.OccupyUnNoticeCount
              : 0;
          }
          // 执行过滤
          CtrlMethod.filterPiles(basePiles, onCount);
        }
      })
      .finally(() => {
        // 只有当最初设置了loading状态时，才清除它
        if (loading) {
          LoadingPiles.value = false;
        }
        if (onCount) {
          onCount(count);
        }
      });
  }

  // 新增：仅进行前端过滤的方法
  filterPiles(basePiles = null, onCount) {
    console.log('filterPiles called');
    console.log('Current selected states:', LocalVars.selected);

    const stateList = [
      'free',
      'charging',
      'gunInserted',
      'chargeFull',
      'offGrid',
      'faulty',
      'other',
      'high',
      'slow',
      'noCharge',
      'isCharge',
      'unNotice',
      'over'
    ];

    // 如果没有传入basePiles，使用缓存的数据
    const pilesToFilter = basePiles || LocalVars.cachedPiles || [];
    console.log('Piles to filter:', pilesToFilter.length);

    let filterPiles = [];
    let newPiles = [];

    // 检查是否有任何主状态被选中
    const hasMainStateSelected = stateList
      .filter((state) => ![ 'noCharge', 'isCharge', 'unNotice', 'over' ].includes(state))
      .some((state) => LocalVars.selected[ state ]);

    console.log('Has main state selected:', hasMainStateSelected);
    console.log(
      'Selected main states:',
      stateList
        .filter((state) => ![ 'noCharge', 'isCharge', 'unNotice', 'over' ].includes(state))
        .filter((state) => LocalVars.selected[ state ])
    );

    // 如果没有选中任何主状态，则显示所有数据
    if (!hasMainStateSelected) {
      newPiles = [ ...pilesToFilter ];
      console.log('No states selected, showing all piles:', newPiles.length);
    }
    else {
      // 否则按选中的状态过滤
      for (let i = 0; i < stateList.length; i++) {
        if (
          ![ 'noCharge', 'isCharge', 'unNotice', 'over' ].includes(stateList[ i ])
          && LocalVars.selected[ stateList[ i ] ]
        ) {
          console.log('Filtering by state:', stateList[ i ]);
          switch (stateList[ i ]) {
          case 'free':
            filterPiles = pilesToFilter.filter((pile) => pile.PileRealTimeState == '空闲');
            console.log('Free state piles found:', filterPiles.length);
            break;
          case 'charging':
            filterPiles = pilesToFilter.filter((pile) => pile.PileRealTimeState == '充电中');
            break;
          case 'gunInserted':
            filterPiles = pilesToFilter.filter((pile) => pile.PileRealTimeState == '已插枪');
            break;
          case 'chargeFull':
            filterPiles = pilesToFilter.filter((pile) => pile.PileRealTimeState == '已充满');
            break;
          case 'offGrid':
            filterPiles = pilesToFilter.filter((pile) => pile.PileRealTimeState == '离网');
            break;
          case 'faulty':
            filterPiles = pilesToFilter.filter((pile) => pile.PileRealTimeState.includes('故障'));
            break;
          case 'other':
            filterPiles = pilesToFilter.filter(
              (pile) =>
                ![ '空闲', '充电中', '已插枪', '已充满', '离网', '故障' ].includes(
                  pile.PileRealTimeState
                ) && !pile.PileRealTimeState.includes('故障')
            );
            break;
          case 'high':
            filterPiles = pilesToFilter.filter((pile) => pile.IsHighAbnormal);
            break;
          case 'slow':
            filterPiles = pilesToFilter.filter((pile) => pile.IsChargeSlow);
            break;
          }
          newPiles = [ ...newPiles, ...filterPiles ];
        }
      }

      // 去重
      const uniqueIds = new Set(newPiles.map((item) => item.PileID));
      newPiles = newPiles.filter((item) => {
        return uniqueIds.has(item.PileID) && uniqueIds.delete(item.PileID);
      });
      console.log('Filtered piles after deduplication:', newPiles.length);
    }

    // 处理子状态过滤
    let filterPiles1 = [];
    let newPiles1 = [];
    let isFilter = false;

    for (let i = 0; i < stateList.length; i++) {
      if (
        [ 'noCharge', 'isCharge', 'unNotice', 'over' ].includes(stateList[ i ])
        && LocalVars.selected[ stateList[ i ] ]
      ) {
        isFilter = true;
        switch (stateList[ i ]) {
        case 'noCharge':
          filterPiles1 = newPiles.filter((pile) => !pile.IsCharged);
          break;
        case 'isCharge':
          filterPiles1 = newPiles.filter((pile) => pile.IsCharged);
          break;
        case 'unNotice':
          break;
        case 'over':
          break;
        }
      }
      newPiles1 = [ ...newPiles1, ...filterPiles1 ];
    }

    if (isFilter) {
      const uniqueIds = new Set(newPiles1.map((item) => item.PileID));
      newPiles1 = newPiles1.filter((item) => {
        return uniqueIds.has(item.PileID) && uniqueIds.delete(item.PileID);
      });
      LocalVars.Piles = newPiles1;
    }
    else {
      LocalVars.Piles = newPiles;
    }

    console.log('Final filtered piles:', LocalVars.Piles.length);

    // 更新计数
    const count = Array.isArray(LocalVars.Piles) ? LocalVars.Piles.length : 0;
    if (onCount) {
      onCount(count);
    }
  }
  refreshStatePiles() {}
  async selectState(state, { loading = false, stationID = LocalVars.StaId, onCount } = {}) {
    console.log('selectState called with:', state);
    console.log('Current selected states:', LocalVars.selected);

    LoadingPiles.value = loading;
    const isPC = window.isPC ? window.isPC() : window.innerWidth >= 768;
    console.log('isPC:', isPC);

    // 通知计数回调
    const notifyCount = () => {
      if (onCount) {
        const count = Array.isArray(LocalVars.Piles) ? LocalVars.Piles.length : 0;
        onCount(count);
      }
    };

    // 只处理有效的状态
    const validStates = [
      'free',
      'charging',
      'gunInserted',
      'chargeFull',
      'offGrid',
      'faulty',
      'other',
      'high',
      'slow',
      'noCharge',
      'isCharge',
      'unNotice',
      'over'
    ];
    if (state && validStates.includes(state)) {
      // 切换当前状态的选中状态（支持多选）
      LocalVars.selected[ state ] = !LocalVars.selected[ state ];
      console.log('Toggled state:', state, 'New value:', LocalVars.selected[ state ]);

      // 更新UI样式
      const widgetKey = isPC ? `fasr_${ state }` : `fasr_${ state }Mobile`;
      const widget = Widget[ widgetKey ];
      console.log('Widget key:', widgetKey, 'Widget found:', !!widget);

      if (widget) {
        if (LocalVars.selected[ state ]) {
          widget.classList?.add('stateSelected');
        }
        else {
          widget.classList?.remove('stateSelected');
        }
      }
    }

    // 处理互斥状态逻辑
    const n = isPC ? '' : 'Mobile';
    const selectList = Object.entries(LocalVars.selected)
      .filter(([ key, value ]) => value === true)
      .map(([ key, value ]) => key);
    console.log('Currently selected list:', selectList);

    // 特殊状态显示控制逻辑
    if (!selectList.includes('gunInserted') && !selectList.includes('chargeFull')) {
      // 如果没有选中枪已插或充电满，则隐藏相关子状态
      LocalVars.selected[ 'noCharge' ] = false;
      Widget[ 'fasr_noCharge' + n ]?.classList?.remove('stateSelected');
      LocalVars.selected[ 'isCharge' ] = false;
      Widget[ 'fasr_isCharge' + n ]?.classList?.remove('stateSelected');
      LocalVars.selected[ 'unNotice' ] = false;
      Widget[ 'fasr_unNotice' + n ]?.classList?.remove('stateSelected');
      LocalVars.selected[ 'over' ] = false;
      Widget[ 'fasr_over' + n ]?.classList?.remove('stateSelected');
    }
    else {
      const unNoticeWidget = Widget[ 'fasr_unNotice' + n ];
      const overWidget = Widget[ 'fasr_over' + n ];
      const noChargeWidget = Widget[ 'fasr_noCharge' + n ];
      const isChargeWidget = Widget[ 'fasr_isCharge' + n ];
      if (unNoticeWidget?.style) unNoticeWidget.style.display = 'flex';
      if (overWidget?.style) overWidget.style.display = 'flex';
      if (noChargeWidget?.style) noChargeWidget.style.display = 'flex';
      if (isChargeWidget?.style) isChargeWidget.style.display = 'flex';

      if (!selectList.includes('gunInserted')) {
        if (noChargeWidget?.style) noChargeWidget.style.display = 'none';
        if (isChargeWidget?.style) isChargeWidget.style.display = 'none';
        LocalVars.selected[ 'noCharge' ] = false;
        Widget[ 'fasr_noCharge' + n ]?.classList?.remove('stateSelected');
        LocalVars.selected[ 'isCharge' ] = false;
        Widget[ 'fasr_isCharge' + n ]?.classList?.remove('stateSelected');
      }
      else {
        if (LocalVars.selected[ 'isCharge' ]) {
          if (unNoticeWidget?.style) unNoticeWidget.style.display = 'none';
          if (overWidget?.style) overWidget.style.display = 'none';
          LocalVars.selected[ 'unNotice' ] = false;
          Widget[ 'fasr_unNotice' + n ]?.classList?.remove('stateSelected');
          LocalVars.selected[ 'over' ] = false;
          Widget[ 'fasr_over' + n ]?.classList?.remove('stateSelected');
        }
      }
    }

    // 刷新数据 - 使用前端过滤而不是重新请求服务器
    console.log('Calling filterPiles for state change');
    CtrlMethod.filterPiles(null, onCount);
  }
}
const CtrlMethod = new CtrlMethods();
async function Page_OnError(e) {
  Funcs.HandleError(e);
}

async function fasr_free_OnClick(e) {
  CtrlMethod.selectState('free');
}
async function fasr_charging_OnClick(e) {
  CtrlMethod.selectState('charging');
}
async function fasr_gunInserted_OnClick(e) {
  CtrlMethod.selectState('gunInserted');
}
async function fasr_chargeFull_OnClick(e) {
  CtrlMethod.selectState('chargeFull');
}
async function fasr_offGrid_OnClick(e) {
  CtrlMethod.selectState('offGrid');
}
async function fasr_faulty_OnClick(e) {
  CtrlMethod.selectState('faulty');
}
async function fasr_other_OnClick(e) {
  CtrlMethod.selectState('other');
}
async function fasr_high_OnClick(e) {
  CtrlMethod.selectState('high');
}
async function fasr_slow_OnClick(e) {
  CtrlMethod.selectState('slow');
}
async function fasr_noCharge_OnClick(e) {
  CtrlMethod.selectState('noCharge');
}
async function fasr_isCharge_OnClick(e) {
  CtrlMethod.selectState('isCharge');
}
async function fasr_unNotice_OnClick(e) {
  CtrlMethod.selectState('unNotice');
}
async function fasr_over_OnClick(e) {
  CtrlMethod.selectState('over');
}
async function fasr_freeMobile_OnClick(e) {
  CtrlMethod.selectState('free');
}
async function fasr_chargingMobile_OnClick(e) {
  CtrlMethod.selectState('charging');
}
async function fasr_gunInsertedMobile_OnClick(e) {
  CtrlMethod.selectState('gunInserted');
}
async function fasr_chargeFullMobile_OnClick(e) {
  CtrlMethod.selectState('chargeFull');
}
async function fasr_offGridMobile_OnClick(e) {
  CtrlMethod.selectState('offGrid');
}
async function fasr_faultyMobile_OnClick(e) {
  CtrlMethod.selectState('faulty');
}
async function fasr_otherMobile_OnClick(e) {
  CtrlMethod.selectState('other');
}
async function fasr_highMobile_OnClick(e) {
  CtrlMethod.selectState('high');
}
async function fasr_slowMobile_OnClick(e) {
  CtrlMethod.selectState('slow');
}
async function fasr_noChargeMobile_OnClick(e) {
  CtrlMethod.selectState('noCharge');
}
async function fasr_isChargeMobile_OnClick(e) {
  CtrlMethod.selectState('isCharge');
}
async function fasr_unNoticeMobile_OnClick(e) {
  CtrlMethod.selectState('unNotice');
}
async function fasr_overMobile_OnClick(e) {
  CtrlMethod.selectState('over');
}
async function Portlet_isShow_OnChanged(e) {
  LocalVars.isMaskOpen = LocalVars.isShow;
  if (!window.isPC()) {
    Widget.fasr_maskClose.visible = !LocalVars.isMaskOpen;
    Widget.fasr_maskOpen.visible = LocalVars.isMaskOpen;
  }
}
async function fasr_div_517aa7_OnClick(e) {
  if (LocalVars.upDown == '展开') {
    LocalVars.upDown = '收起';
    Widget.fasr_up.visible = true;
    Widget.fasr_down.visible = false;
    Widget.fasr_divState.style.display = 'flex';
  }
  else if (LocalVars.upDown == '收起') {
    LocalVars.upDown = '展开';
    Widget.fasr_up.visible = false;
    Widget.fasr_down.visible = true;
    Widget.fasr_divState.style.display = 'none';
  }
}
const updateSkillsmp = (e) => {
  Object.assign(LocalVars.infoSet, e);
};
async function fasr_div_cf246887_Copyff246887_Copy_OnClick(e) {
  LocalVars.isMaskOpen = !LocalVars.isMaskOpen;
  Widget.fasr_maskClose.visible = !LocalVars.isMaskOpen;
  Widget.fasr_maskOpen.visible = LocalVars.isMaskOpen;
}
const terminalSettingsDrawrRef = ref(null);
async function fasr_div_filed_OnClick(e) {
  terminalSettingsDrawrRef.value.openDrawer(LocalVars.infoSet);
}
async function fasr_div_filedMobile_OnClick(e) {
  terminalSettingsDrawrRef.value.openDrawer(LocalVars.infoSet);
}

async function fasr_toggle_1a3051_OnChange(e) {
  Funcs.SetUserProfile({ Key: 'Saas_Sta', DynamicKey: 'PileFieldSet' }, JSON.stringify({
    one: LocalVars.infoSet.one,
    two: LocalVars.infoSet.two,
    three: LocalVars.infoSet.three,
    isDetail: LocalVars.isDetail
  }));
}
async function fasr_toggle_30fa8f_OnChange(e) {
  if (LocalVars.isDetail) {
    Widget.fasr_div_filedMobile.style.display = 'flex';
  }
  else {
    Widget.fasr_div_filedMobile.style.display = 'none';
  }
}
async function fasr_terminals_OnFireEvent(e) {
  CtrlMethod.refresh();
}
Object.assign(LocalVars.infoSet, props.infoSet || {});
LocalVars.isShow = toRef(props, 'isShow');
watch(
  () => LocalVars.isShow,
  (newV, oldV) => {
    Portlet_isShow_OnChanged();
  },
  { deep: true }
);
watch(ISPC, (isPC) => {
  if (isPC) {
    closeMobileActionMenu();
  }
});

LocalVars.StaId = toRef(props, 'StaId');
LocalVars.StationName = toRef(props, 'StationName');
onBeforeMount(() => {});
onMounted(async () => {
  Widget.Root = {};

  Widget.FireUCEvent('OnLoaded');
  await nextTick();
  TFF.core.monitor.error.onError(Page_OnError);
  window.addEventListener('resize', updateScreenWidth);
  document.addEventListener('click', handleDocumentClick);
});
onUnmounted(async () => {
  window.removeEventListener('resize', updateScreenWidth);
  document.removeEventListener('click', handleDocumentClick);
});

Funcs.GetUserProfile({
  Key: 'Saas_Sta',
  DynamicKey: 'PileFieldSet'
}).then((data) => {
  if (data.state == 1 && data.data.length > 0 && !!data.data[ 0 ].ConfigValue) {
    const config = JSON.parse(data.data[ 0 ].ConfigValue);
    if (config) {
      LocalVars.infoSet.one = config.one;
      LocalVars.infoSet.two = config.two;
      LocalVars.infoSet.three = config.three;
      LocalVars.infoSet.isDetail = !!config.isDetail;
      LocalVars.infoSet.oneOld = config.one;
      LocalVars.infoSet.twoOld = config.two;
      LocalVars.infoSet.threeOld = config.three;
      LocalVars.isDetail = !!config.isDetail;
    }
  }
});
const mappingProps = reactive({ ...props });
const mappingExpose = toRefs(reactive({ ...props }));
watch(mappingExpose.visible, (newValue, oldValue) => (mappingProps.visible = newValue));
watch(
  () => props.visible,
  (newValue, oldValue) => (mappingProps.visible = newValue)
);
const {
  fasr_div_8dddfd,
  fasr_div_368174,
  fasr_div_d101c8,
  fasr_div_ef86b5,
  fasr_label_7beac9,
  fasr_div_688b40,
  fasr_label_f121250_Copyf,
  fasr_label_f2752f,
  fasr_free,
  fasr_label_f586862_Copyf,
  fasr_label_f195827_Copyf,
  fasr_charging,
  fasr_label_f374990_Copyf,
  fasr_label_f307732_Copyf,
  fasr_gunInserted,
  fasr_label_f976281_Copyf,
  fasr_label_f910963_Copyf,
  fasr_chargeFull,
  fasr_label_f415594_Copyf,
  fasr_label_f852558_Copyf,
  fasr_offGrid,
  fasr_label_f457407_Copyf,
  fasr_label_f505041_Copyf,
  fasr_faulty,
  fasr_label_f372316_Copyf,
  fasr_label_f846431_Copyf,
  fasr_other,
  fasr_label_f105895_Copyf,
  fasr_label_f287572_Copyf,
  fasr_noCharge,
  fasr_noChargeLabel,
  fasr_noChargeCount,
  fasr_isCharge,
  fasr_isChargeLabel,
  fasr_noChargeCountMobile847497_Copy,
  fasr_unNotice,
  fasr_unNoticeLabel,
  fasr_unNoticeCount,
  fasr_over,
  fasr_overLabel,
  fasr_overCount,
  fasr_div_ef762420_Copyb762420_Copy,
  fasr_div_c243f3,
  fasr_div_6d686d,
  fasr_label_937101_Copybeac937101_Copy,
  fasr_div_400655_Copyb400655_Copy,
  fasr_high,
  fasr_label_f505415_Copyf,
  fasr_label_f390545_Copyf,
  fasr_slow,
  fasr_label_f296101_Copyf,
  fasr_label_f613168_Copyf,
  fasr_div_9b8faf,
  fasr_div_filed,
  fasr_icon_786711,
  fasr_label_42e9c2,
  fasr_div_94e00c,
  fasr_label_288174_Copye288174_Copyc288174_Copy,
  fasr_toggle_1a3051,
  fasr_div_8e3b84,
  fasr_div_59764b,
  fasr_freeMobile,
  fasr_freeStateMobile,
  fasr_freeCountMobile,
  fasr_chargingMobile,
  fasr_chargingStateMobile,
  fasr_chargingCountMobile,
  fasr_gunInsertedMobile,
  fasr_gunInsertedStateMobile,
  fasr_gunInsertedCountMobile,
  fasr_chargeFullMobile,
  fasr_chargeFullStateMobile,
  fasr_chargeFullCountMobile,
  fasr_divState,
  fasr_div_884874_Copyb,
  fasr_offGridMobile,
  fasr_offGridStateMobile,
  fasr_offGridCountMobile,
  fasr_faultyMobile,
  fasr_faultyStateMobile,
  fasr_faultyCountMobile,
  fasr_otherMobile,
  fasr_otherStateMobile,
  fasr_otherCountMobile,
  fasr_highMobile,
  fasr_highStateMobile,
  fasr_highCountMobile,
  fasr_slowMobile,
  fasr_slowStateMobile,
  fasr_slowCountMobile,
  fasr_separator_755599,
  fasr_noChargeMobile,
  fasr_noChargeStateMobile,
  fasr_noChargeCountMobile,
  fasr_isChargeMobile,
  fasr_isChargeStateMobile,
  fasr_isChargeCountMobile,
  fasr_unNoticeMobile,
  fasr_unNoticeStateMobile,
  fasr_unNoticeCountMobile,
  fasr_overMobile,
  fasr_overStateMobile,
  fasr_overCountMobile,
  fasr_div_07ce8b,
  fasr_div_cd7389,
  fasr_div_cf3ff4,
  fasr_label_c6f301,
  fasr_toggle_30fa8f,
  fasr_div_filedMobile,
  fasr_icon_b0d14c,
  fasr_label_c847760_Copyf847760_Copy,
  fasr_div_cf246887_Copyff246887_Copy,
  fasr_maskOpen,
  fasr_maskClose,
  fasr_label_c832074_Copyf832074_Copy,
  fasr_div_517aa7,
  fasr_label_c353285_Copyf353285_Copy,
  fasr_down,
  fasr_up,
  fasr_terminals
} = toRefs(reactive(Widget));
defineExpose({
  fasr_div_8dddfd,
  fasr_div_368174,
  fasr_div_d101c8,
  fasr_div_ef86b5,
  fasr_label_7beac9,
  fasr_div_688b40,
  fasr_label_f121250_Copyf,
  fasr_label_f2752f,
  fasr_free,
  fasr_label_f586862_Copyf,
  fasr_label_f195827_Copyf,
  fasr_charging,
  fasr_label_f374990_Copyf,
  fasr_label_f307732_Copyf,
  fasr_gunInserted,
  fasr_label_f976281_Copyf,
  fasr_label_f910963_Copyf,
  fasr_chargeFull,
  fasr_label_f415594_Copyf,
  fasr_label_f852558_Copyf,
  fasr_offGrid,
  fasr_label_f457407_Copyf,
  fasr_label_f505041_Copyf,
  fasr_faulty,
  fasr_label_f372316_Copyf,
  fasr_label_f846431_Copyf,
  fasr_other,
  fasr_label_f105895_Copyf,
  fasr_label_f287572_Copyf,
  fasr_noCharge,
  fasr_noChargeLabel,
  fasr_noChargeCount,
  fasr_isCharge,
  fasr_isChargeLabel,
  fasr_noChargeCountMobile847497_Copy,
  fasr_unNotice,
  fasr_unNoticeLabel,
  fasr_unNoticeCount,
  fasr_over,
  fasr_overLabel,
  fasr_overCount,
  fasr_div_ef762420_Copyb762420_Copy,
  fasr_div_c243f3,
  fasr_div_6d686d,
  fasr_label_937101_Copybeac937101_Copy,
  fasr_div_400655_Copyb400655_Copy,
  fasr_high,
  fasr_label_f505415_Copyf,
  fasr_label_f390545_Copyf,
  fasr_slow,
  fasr_label_f296101_Copyf,
  fasr_label_f613168_Copyf,
  fasr_div_9b8faf,
  fasr_div_filed,
  fasr_icon_786711,
  fasr_label_42e9c2,
  fasr_div_94e00c,
  fasr_label_288174_Copye288174_Copyc288174_Copy,
  fasr_toggle_1a3051,
  fasr_div_8e3b84,
  fasr_div_59764b,
  fasr_freeMobile,
  fasr_freeStateMobile,
  fasr_freeCountMobile,
  fasr_chargingMobile,
  fasr_chargingStateMobile,
  fasr_chargingCountMobile,
  fasr_gunInsertedMobile,
  fasr_gunInsertedStateMobile,
  fasr_gunInsertedCountMobile,
  fasr_chargeFullMobile,
  fasr_chargeFullStateMobile,
  fasr_chargeFullCountMobile,
  fasr_divState,
  fasr_div_884874_Copyb,
  fasr_offGridMobile,
  fasr_offGridStateMobile,
  fasr_offGridCountMobile,
  fasr_faultyMobile,
  fasr_faultyStateMobile,
  fasr_faultyCountMobile,
  fasr_otherMobile,
  fasr_otherStateMobile,
  fasr_otherCountMobile,
  fasr_highMobile,
  fasr_highStateMobile,
  fasr_highCountMobile,
  fasr_slowMobile,
  fasr_slowStateMobile,
  fasr_slowCountMobile,
  fasr_separator_755599,
  fasr_noChargeMobile,
  fasr_noChargeStateMobile,
  fasr_noChargeCountMobile,
  fasr_isChargeMobile,
  fasr_isChargeStateMobile,
  fasr_isChargeCountMobile,
  fasr_unNoticeMobile,
  fasr_unNoticeStateMobile,
  fasr_unNoticeCountMobile,
  fasr_overMobile,
  fasr_overStateMobile,
  fasr_overCountMobile,
  fasr_div_07ce8b,
  fasr_div_cd7389,
  fasr_div_cf3ff4,
  fasr_label_c6f301,
  fasr_toggle_30fa8f,
  fasr_div_filedMobile,
  fasr_icon_b0d14c,
  fasr_label_c847760_Copyf847760_Copy,
  fasr_div_cf246887_Copyff246887_Copy,
  fasr_maskOpen,
  fasr_maskClose,
  fasr_label_c832074_Copyf832074_Copy,
  fasr_div_517aa7,
  fasr_label_c353285_Copyf353285_Copy,
  fasr_down,
  fasr_up,
  fasr_terminals,
  refresh: CtrlMethod[ 'refresh' ],
  refreshStatePiles: CtrlMethod[ 'refreshStatePiles' ],
  selectState: CtrlMethod[ 'selectState' ],
  LocalVars,
  visible: mappingExpose.visible
});
</script>

<style>
@media screen and (min-width: 768px) {
  .fasr_div_8e3b84 {
  }
}

@media screen and (max-width: 767px) {
  .fasr_div_368174 {
  }
}

.fasr_div_368174 {
  background-color: #fff;
  border-radius: 0 0 12px 12px;
}

.stateSelected {
  background-color: rgba(var(--t-color-rgb), 0.05) !important;
  border-color: rgba(var(--t-color-rgb), 0.1) !important;
  @media screen and (max-width: 767px) {
    color: rgba(var(--t-color-rgb), 1) !important;
    background-color: #edeff3;
  }
}

.stateSelected span.t-label.no-outline {
  color: rgba(var(--t-color-rgb), 1) !important;
}

.terminal-loading {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.6);
  z-index: 1;
}

.terminal-loading-spinner {
  width: 32px;
  height: 32px;
  border: 3px solid rgba(var(--t-color-rgb), 0.2);
  border-top-color: var(--t-color);
  border-radius: 50%;
  animation: terminal-spin 1s linear infinite;
}

.terminal-list-scroll {
  flex: 1;
  min-height: 0;
  position: relative;
  overflow-y: auto;
  overflow-x: hidden;
}

@keyframes terminal-spin {
  to {
    transform: rotate(360deg);
  }
}

.selectLabel {
  color: rgba(var(--t-color-rgb), 1) !important;
}

.mobile-filters {
  display: flex;
  flex-direction: column;
  padding: 0px 12px 8px 12px;
  gap: 2px;
}

.mobile-filter-section {
  display: flex;
  height: 32px;
  gap: 6px;
}

.mobile-filter-section-title {
  font-size: 12px;
  color: rgba(0, 0, 0, 0.56);
  white-space: nowrap;
  display: flex;
  align-items: center;
  height: 100%;
}

.mobile-filter-row {
  display: flex;
  align-items: center;
  gap: 12px;
  overflow-x: auto;
  overflow-y: hidden;
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.mobile-filter-row::-webkit-scrollbar {
  display: none;
}

.mobile-filter-item {
  border-radius: 100px;
  background: #edeff3;
  display: flex;
  height: 25px;
  padding: 4px 8px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  color: rgba(0, 0, 0, 0.8);
  white-space: nowrap;
  flex-shrink: 0;
  cursor: pointer;
  font-size: 12px;
  line-height: 1;
}

.mobile-action-menu-wrapper {
  position: relative;
}

.mobile-action-trigger {
  font-weight: bold;
  border: none;
  background: transparent;
  height: 21px;
  border-radius: 6px;
  color: rgba(0, 0, 0, 0.8);
  font-size: 18px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.mobile-action-menu {
  position: absolute;
  right: 0;
  top: calc(100% + 8px);
  min-width: 128px;
  padding: 4px 0;
  z-index: 10;
  border-radius: 12px;
  background: #fff;
  box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.12);
}
.mobile-action-menu .tr-toggle-small {
  min-height: 21px;
  height: 21px;
}

.mobile-action-item {
  color: rgba(0, 0, 0, 0.8);
  font-size: 14px;
  display: flex;
  padding: 8px 16px;
  justify-content: center;
  align-items: center;
}

.mobile-action-item-toggle {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

@media screen and (max-width: 767px) {
  .pile {
    width: 100%;
    padding: 0px !important;
  }

  .piles {
    gap: 12px;
  }

  .fasr_div_8e3b84 {
    background: #fff;
    padding: 12px;
    padding-bottom: 0;
    row-gap: 0 !important;
  }

  .filter {
    align-items: flex-start;
  }

  .fasr_div_9b8faf {
    align-self: flex-end;
  }

  .mobile-action-menu .t-toggle {
    min-height: unset;
  }

  .terminal-list-scroll {
    max-height: calc(100vh - 250px);
    -webkit-overflow-scrolling: touch;
  }
}

.div-top-dialog-title {
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  display: flex;
  padding-top: 16px;
  padding-left: 24px;
  padding-right: 24px;
}

.div-top-dialog-font {
  opacity: 100%;
  font-size: 16px;
}

.tr-div-dialog {
  height: auto;
  overflow-y: auto;
  max-height: calc(100vh - 60px);
}

.m-card .item {
  display: flex;
  line-height: 32px;
}

.m-card .item:last-of-type {
  margin-top: 12px;
}

.m-card .item .field {
  min-width: 120px;
}
@media screen and (max-width: 767px) {
  .tab-container {
    padding-top: 0 !important;
    background: transparent !important;
  }
}
.filter .icon-t-refresh {
  color: rgba(0, 0, 0, 0.56);
}
</style>
