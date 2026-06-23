<template>
    <div v-show='mappingProps && mappingProps.visible'>
        <div :ref='el => Widget["fasr_div_625153_Copydc625153_Copy"] = el' v-show="!LocalVars.isDetail"
            style='flex-direction:column;  position: relative;   flex-wrap:nowrap;    display:flex;  padding-bottom:16px;  padding-top:16px;  width:100%;   row-gap:16px;        border-color:#e0e0e0;      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);  border-style:solid;    border-top-width:1px;    border-left-width:1px;    border-right-width:1px;    border-bottom-width:1px;    border-radius:8px;    outline:0!important'
            class='fasr_div_625153_Copydc625153_Copy tr-div-default' :tabIndex='-1'
            instanceCode='fasr_div_625153_Copydc625153_Copy' @mouseover.stop='iconOver' @mouseleave='iconLeave'
            @click.stop='iconClick'>

            <div :ref='el => Widget["fasr_div_a625299_Copyaff625299_Copy"] = el'
                style='flex-direction:column;    flex-wrap:nowrap;    justify-content:flex-start;      display:flex; gap:12px;'
                class='fasr_div_a625299_Copyaff625299_Copy' :tabIndex='-1'
                instanceCode='fasr_div_a625299_Copyaff625299_Copy'>
                <div>
                    <span
                        style="padding: 2px 4px;border-radius: 4px;background: #EBF4FC;color: #3656FF;font-size: 12px;margin-left: 10px;margin-right: 8px;">充电中</span>
                    <t-label :ref='el => Widget["fasr_label_901216_Copycf901216_Copy"] = el'
                        style='font-family:AlibabaPuHuiTi;    font-weight:500;    font-size:14px;    line-height:100%;    letter-spacing:0px;    color:rgba(0,0,0,0.80);    vertical-align: middle'
                        class='fasr_label_901216_Copycf901216_Copy' instanceCode='fasr_label_901216_Copycf901216_Copy'
                        valueType='expression' :showHint='true' :tabIndex='1' :labelValue="LocalVars.pile.PileName">
                    </t-label>
                </div>
                <div
                    style=' flex-wrap:nowrap;    justify-content:flex-start;    align-items:center;    display:flex;       column-gap:10px;    height:42px;           outline:0!important'>
                    <div :ref='el => Widget["fasr_div_cd427103_Copyc427103_Copy"] = el'
                        style='padding-left:10px;        outline:0!important'
                        class='fasr_div_cd427103_Copyc427103_Copy tr-div-default' :tabIndex='-1'
                        instanceCode='fasr_div_cd427103_Copyc427103_Copy'>
                        <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="42" height="42" rx="21" fill="#3656FF" fill-opacity="0.05" />
                            <path d="M28 12H12C11.4477 12 11 12.4477 11 13V21C11 21.5523 11.4477 22 12 22H28C28.5523 22 29 21.5523 29 21V13C29 12.4477 28.5523 12 28 12Z"
                                  stroke="black"
                                  stroke-opacity="0.32"
                                  stroke-width="1.33333"
                                  stroke-linecap="round"
                                  stroke-linejoin="round" />
                            <path d="M30 15H31C31.5523 15 32 15.4477 32 16V18C32 18.5523 31.5523 19 31 19H30V15Z"
                                  fill="black"
                                  fill-opacity="0.32" />
                            <rect x="12" y="13" :width="socBatteryFillWidth" height="8" rx="1" :fill="socBatteryFillColor" />
                            <text x="21"
                                  y="33"
                                  text-anchor="middle"
                                  font-size="10"
                                  font-family="AlibabaPuHuiTi"
                                  fill="rgba(0,0,0,0.8)">{{ socDisplayText }}</text>
                        </svg>
                    </div>
                    <div :ref='el => Widget["fasr_div_aca399422_Copybc"] = el'
                        style='flex-direction:column;    flex-wrap:nowrap;   max-width: calc(100% - 77px); display:flex;    row-gap:4px;        outline:0!important;    flex-grow: 1'
                        class='fasr_div_aca399422_Copybc tr-div-default' :tabIndex='-1'
                        instanceCode='fasr_div_aca399422_Copybc'>
                        <div :ref='el => Widget["fasr_div_2fd05e"] = el'
                            style='flex-direction:row;    flex-wrap:nowrap;    justify-content:flex-start;    align-items:center;    display:flex;        outline:0!important'
                            class='fasr_div_2fd05e tr-div-default' :tabIndex='-1' instanceCode='fasr_div_2fd05e'>
                            <div :ref='el => Widget["fasr_div_174316_Copye"] = el'
                                style='flex-direction:row;    flex-wrap:nowrap;    justify-content:flex-start;    align-items:center;    display:flex;    column-gap:4px;        outline:0!important;    flex-grow: 1'
                                class='fasr_div_174316_Copye tr-div-default' :tabIndex='-1'
                                instanceCode='fasr_div_174316_Copye'>
                                <div :ref='el => Widget["fasr_div_efb150513_Copy"] = el'
                                    style='padding-top:2px;    padding-bottom:2px;    padding-left:6px;    padding-right:6px;    flex-direction:row;    flex-wrap:nowrap;    justify-content:center;    align-items:center;    display:flex;        border-color:#E4E5E7;    border-style:solid;    border-top-width:1px;    border-left-width:1px;    border-right-width:1px;    border-bottom-width:1px;    border-radius:8px;    outline:0!important'
                                    class='fasr_div_efb150513_Copy tr-div-default' :tabIndex='-1'
                                    instanceCode='fasr_div_efb150513_Copy'>
                                    <t-label :ref='el => Widget["fasr_label_774408_Copycf774408_Copy"] = el'
                                        style='font-family:AlibabaPuHuiTi;    font-weight:500;    font-size:11px;    line-height:100%;    letter-spacing:0px;    color:#6F7173;    vertical-align: middle'
                                        class='fasr_label_774408_Copycf774408_Copy'
                                        instanceCode='fasr_label_774408_Copycf774408_Copy' valueType='expression'
                                        :showHint='true' :tabIndex='1' :labelValue="LocalVars.pile.ChargingName">
                                    </t-label>
                                </div>

                            </div>
                            <div class="item-title" v-if='LocalVars.pile.PileID'
                                style="position:absolute; top:0px; right:0px;    width: 28px;height: 28px; border-top-right-radius: 14px;border-bottom-left-radius: 50px;display: flex;justify-content: center;">
                                <i class="i-link" style="font-style: normal; padding-left: 4px;"
                                    @click="showOrderCard">订</i>
                            </div>
                        </div>
                        <div :ref='el => Widget["fasr_div_511973_Copye"] = el'
                            style='flex-direction:row;    flex-wrap:nowrap;  max-width: 220px; gap:4px; justify-content:flex-start;    align-items:center;    display:flex;        outline:0!important'
                            class='fasr_div_511973_Copye tr-div-default' :tabIndex='-1'
                            instanceCode='fasr_div_511973_Copye'>
                            <t-label :ref='el => Widget["fasr_label_322033_Copydd322033_Copyf"] = el'
                                style='    font-family:AlibabaPuHuiTi;    font-size:12px;    color:rgba(0,0,0,0.32);    text-overflow: clip;    overflow: visible'
                                class='fasr_label_322033_Copydd322033_Copyf'
                                instanceCode='fasr_label_322033_Copydd322033_Copyf' valueType='static' :showHint='true'
                                :tabIndex='1'
                                :constValue="$t('Schema.Page.UCOtherTerminal.Controls.fasr_label_322033_Copydd322033_Copyf.ConstValue', '预计充满时间:')">
                            </t-label>
                            <t-label :ref='el => Widget["fasr_label_f400494_Copya"] = el'
                                style='    font-family:AlibabaPuHuiTi;    font-size:12px;    color:rgba(0,0,0,0.80)'
                                class='fasr_label_f400494_Copya' instanceCode='fasr_label_f400494_Copya'
                                valueType='expression' :showHint='true' :tabIndex='1'
                                :labelValue="LocalVars.pile.EstimatedFillingTime">
                            </t-label>

                        </div>
                    </div>
                </div>
            </div>
            <div :ref='el => Widget["fasr_div_740147_Copye740147_Copyab"] = el'
                style='padding-left:10px;    padding-right:10px;    flex-direction:row;  height:31px;  flex-wrap:nowrap;    display:flex;    column-gap:10px;        outline:0!important'
                class='fasr_div_740147_Copye740147_Copyab tr-div-default' :tabIndex='-1'
                instanceCode='fasr_div_740147_Copye740147_Copyab'>

                <t-button :ref='el => Widget["fasr_button_592685_Copya592685_Copycf"] = el'
                    v-loading="_this.LoadingCloseCharge"
                    style='margin-left: auto;        border-radius:2px;    border-color:#FD2020; background-color:#FD2020; color: #FFFFFF;  border-style:solid;    border-top-width:1px;    border-left-width:1px;    border-right-width:1px;    border-bottom-width:1px'
                    class='fasr_button_592685_Copya592685_Copycf tr-button-default '
                    :label="$t('Schema.Page.UCChargeFullTerminal.Controls.fasr_button_592685_Copya592685_Copycf.Label', '结束充电')"
                    instanceCode='fasr_button_592685_Copya592685_Copycf' :showHint='true' :tabIndex='1'
                    @click="confirmCloseCharge">
                </t-button>
            </div>
        </div>

        <div :ref='el => Widget["fasr_div_7dc379"] = el' v-show="LocalVars.isDetail"
            style='flex-direction:column;  position: relative;    flex-wrap:nowrap;  padding-top:16px;  display:flex;  min-height: 240px;  width:100%;    row-gap:16px;    padding-bottom:16px;        border-color:#e0e0e0;      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);  border-style:solid;    border-top-width:1px;    border-left-width:1px;    border-right-width:1px;    border-bottom-width:1px;    border-radius:8px;    outline:0!important'
            class='fasr_div_7dc379 tr-div-default' :tabIndex='-1' instanceCode='fasr_div_7dc379'>
            <div :ref='el => Widget["fasr_div_a625299_Copyaff625299_Copy"] = el'
                style='flex-direction:column;    flex-wrap:nowrap;    justify-content:flex-start;      display:flex; gap:12px;'
                class='fasr_div_a625299_Copyaff625299_Copy' :tabIndex='-1'
                instanceCode='fasr_div_a625299_Copyaff625299_Copy'>
                <div>
                    <span
                        style="padding: 2px 4px;border-radius: 4px;background: #EBF4FC;color: #3656FF;font-size: 12px;margin-left: 10px;margin-right: 8px;">充电中</span>
                    <t-label :ref='el => Widget["fasr_label_901216_Copycf901216_Copy"] = el'
                        style='font-family:AlibabaPuHuiTi;    font-weight:500;    font-size:14px;    line-height:100%;    letter-spacing:0px;    color:rgba(0,0,0,0.80);    vertical-align: middle'
                        class='fasr_label_901216_Copycf901216_Copy' instanceCode='fasr_label_901216_Copycf901216_Copy'
                        valueType='expression' :showHint='true' :tabIndex='1' :labelValue="LocalVars.pile.PileName">
                    </t-label>
                </div>
                <div
                    style=' flex-wrap:nowrap;    justify-content:flex-start;    align-items:center;    display:flex;       column-gap:10px;    height:42px;           outline:0!important'>
                    <div :ref='el => Widget["fasr_div_cd427103_Copyc427103_Copy"] = el'
                        style='padding-left:10px;        outline:0!important'
                        class='fasr_div_cd427103_Copyc427103_Copy tr-div-default' :tabIndex='-1'
                        instanceCode='fasr_div_cd427103_Copyc427103_Copy'>
                        <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="42" height="42" rx="21" fill="#3656FF" fill-opacity="0.05" />
                            <path d="M28 12H12C11.4477 12 11 12.4477 11 13V21C11 21.5523 11.4477 22 12 22H28C28.5523 22 29 21.5523 29 21V13C29 12.4477 28.5523 12 28 12Z"
                                  stroke="black"
                                  stroke-opacity="0.32"
                                  stroke-width="1.33333"
                                  stroke-linecap="round"
                                  stroke-linejoin="round" />
                            <path d="M30 15H31C31.5523 15 32 15.4477 32 16V18C32 18.5523 31.5523 19 31 19H30V15Z"
                                  fill="black"
                                  fill-opacity="0.32" />
                            <rect x="12" y="13" :width="socBatteryFillWidth" height="8" rx="1" :fill="socBatteryFillColor" />
                            <text x="21"
                                  y="33"
                                  text-anchor="middle"
                                  font-size="10"
                                  font-family="AlibabaPuHuiTi"
                                  fill="rgba(0,0,0,0.8)">{{ socDisplayText }}</text>
                        </svg>
                    </div>
                    <div :ref='el => Widget["fasr_div_aca399422_Copybc"] = el'
                        style='flex-direction:column;    flex-wrap:nowrap;   max-width: calc(100% - 77px); display:flex;    row-gap:4px;        outline:0!important;    flex-grow: 1'
                        class='fasr_div_aca399422_Copybc tr-div-default' :tabIndex='-1'
                        instanceCode='fasr_div_aca399422_Copybc'>
                        <div :ref='el => Widget["fasr_div_2fd05e"] = el'
                            style='flex-direction:row;    flex-wrap:nowrap;    justify-content:flex-start;    align-items:center;    display:flex;        outline:0!important'
                            class='fasr_div_2fd05e tr-div-default' :tabIndex='-1' instanceCode='fasr_div_2fd05e'>
                            <div :ref='el => Widget["fasr_div_174316_Copye"] = el'
                                style='flex-direction:row;    flex-wrap:nowrap;    justify-content:flex-start;    align-items:center;    display:flex;    column-gap:4px;        outline:0!important;    flex-grow: 1'
                                class='fasr_div_174316_Copye tr-div-default' :tabIndex='-1'
                                instanceCode='fasr_div_174316_Copye'>
                                <div :ref='el => Widget["fasr_div_efb150513_Copy"] = el'
                                    style='padding-top:2px;    padding-bottom:2px;    padding-left:6px;    padding-right:6px;    flex-direction:row;    flex-wrap:nowrap;    justify-content:center;    align-items:center;    display:flex;        border-color:#E4E5E7;    border-style:solid;    border-top-width:1px;    border-left-width:1px;    border-right-width:1px;    border-bottom-width:1px;    border-radius:8px;    outline:0!important'
                                    class='fasr_div_efb150513_Copy tr-div-default' :tabIndex='-1'
                                    instanceCode='fasr_div_efb150513_Copy'>
                                    <t-label :ref='el => Widget["fasr_label_774408_Copycf774408_Copy"] = el'
                                        style='font-family:AlibabaPuHuiTi;    font-weight:500;    font-size:11px;    line-height:100%;    letter-spacing:0px;    color:#6F7173;    vertical-align: middle'
                                        class='fasr_label_774408_Copycf774408_Copy'
                                        instanceCode='fasr_label_774408_Copycf774408_Copy' valueType='expression'
                                        :showHint='true' :tabIndex='1' :labelValue="LocalVars.pile.ChargingName">
                                    </t-label>
                                </div>

                            </div>
                            <div class="item-title" v-if='LocalVars.pile.PileID'
                                style="position:absolute; top:0px; right:0px;    width: 28px;height: 28px; border-top-right-radius: 14px;border-bottom-left-radius: 50px;display: flex;justify-content: center;">
                                <i class="i-link" style="font-style: normal; padding-left: 4px;"
                                    @click="showOrderCard">订</i>
                            </div>
                        </div>
                        <div :ref='el => Widget["fasr_div_511973_Copye"] = el'
                            style='flex-direction:row;    flex-wrap:nowrap;  max-width: 220px; gap:4px; justify-content:flex-start;    align-items:center;    display:flex;        outline:0!important'
                            class='fasr_div_511973_Copye tr-div-default' :tabIndex='-1'
                            instanceCode='fasr_div_511973_Copye'>
                            <t-label :ref='el => Widget["fasr_label_322033_Copydd322033_Copyf"] = el'
                                style='    font-family:AlibabaPuHuiTi;    font-size:12px;    color:rgba(0,0,0,0.32);    text-overflow: clip;    overflow: visible'
                                class='fasr_label_322033_Copydd322033_Copyf'
                                instanceCode='fasr_label_322033_Copydd322033_Copyf' valueType='static' :showHint='true'
                                :tabIndex='1'
                                :constValue="$t('Schema.Page.UCOtherTerminal.Controls.fasr_label_322033_Copydd322033_Copyf.ConstValue', '预计充满时间:')">
                            </t-label>
                            <t-label :ref='el => Widget["fasr_label_f400494_Copya"] = el'
                                style='    font-family:AlibabaPuHuiTi;    font-size:12px;    color:rgba(0,0,0,0.80)'
                                class='fasr_label_f400494_Copya' instanceCode='fasr_label_f400494_Copya'
                                valueType='expression' :showHint='true' :tabIndex='1'
                                :labelValue="LocalVars.pile.EstimatedFillingTime">
                            </t-label>

                        </div>
                    </div>
                </div>
            </div>
            <t-separator :ref='el => Widget["fasr_separator_331869"] = el' style='margin: 0px 12px;     opacity:100%'
                class='fasr_separator_331869' instanceCode='fasr_separator_331869' size='1px' spaced='8px'
                color='rgba(150, 150, 150, 0.15)' :tabIndex='1'>
            </t-separator>
            <div :ref='el => Widget["fasr_div_70e41f"] = el'
                style='  padding-left:10px;    padding-right:10px;  outline:0!important'
                class='fasr_div_70e41f tr-div-default' :tabIndex='-1' instanceCode='fasr_div_70e41f'>
                <div :ref='el => Widget["fasr_div_79e6ab"] = el'
                    style='    flex-direction:column;    flex-wrap:nowrap;    justify-content:flex-start;    align-items:flex-start;    display:flex;    row-gap:8px;        outline:0!important'
                    class='fasr_div_79e6ab tr-div-default' :tabIndex='-1' instanceCode='fasr_div_79e6ab'>
                    <div :ref='el => Widget["fasr_div_a7813d"] = el'
                        style='flex-direction:row;    flex-wrap:nowrap;    justify-content:flex-start;    align-items:flex-start;    display:flex;    column-gap:8px;        outline:0!important'
                        class='fasr_div_a7813d tr-div-default' :tabIndex='-1' instanceCode='fasr_div_a7813d'>
                        <t-label :ref='el => Widget["fasr_label_e314381_Copy"] = el'
                            style='    font-family:AlibabaPuHuiTi;    font-size:12px;    color:rgba(0,0,0,0.32)'
                            class='fasr_label_e314381_Copy' instanceCode='fasr_label_e314381_Copy' valueType='static'
                            :showHint='true' :tabIndex='1'
                            :constValue="$t('Schema.Page.UCChargingTerminal.Controls.fasr_label_e314381_Copy.ConstValue', '客户名称')">
                        </t-label>
                        <t-label :ref='el => Widget["fasr_label_e60340"] = el'
                            style='    font-family:AlibabaPuHuiTi;    font-size:12px;    color:rgba(0,0,0,0.80)'
                            class='fasr_label_e60340' instanceCode='fasr_label_e60340' valueType='expression'
                            :showHint='true' :tabIndex='1' :labelValue="LocalVars.pile.CustomerPhone">
                        </t-label>
                        <div :ref='el => Widget["fasr_div_efb769538_Copy"] = el' v-if='LocalVars.pile.CustomerType'
                            style='padding-top:2px;    padding-bottom:2px;    padding-left:4px;    padding-right:4px;    flex-direction:row;    flex-wrap:nowrap;    justify-content:center;    align-items:center;    display:flex;        border-color:#F0F2F5;    border-style:solid;    border-top-width:1px;    border-left-width:1px;    border-right-width:1px;    border-bottom-width:1px;    border-radius:4px;    outline:0!important'
                            class='fasr_div_efb769538_Copy tr-div-default' :tabIndex='-1'
                            instanceCode='fasr_div_efb769538_Copy'>
                            <t-label :ref='el => Widget["fasr_label_187366_Copycf187366_Copy"] = el'
                                style='font-family:AlibabaPuHuiTi;    font-weight:500;    font-size:11px;    line-height:100%;    letter-spacing:0px;    color:rgba(0,0,0,0.56);    vertical-align: middle'
                                class='fasr_label_187366_Copycf187366_Copy'
                                instanceCode='fasr_label_187366_Copycf187366_Copy' valueType='expression'
                                :showHint='true' :tabIndex='1' :labelValue="LocalVars.pile.CustomerType">
                            </t-label>
                        </div>
                        <div :ref='el => Widget["fasr_div_efb939451_Copy"] = el'
                            v-if='LocalVars.pile.CustomerClassification'
                            style='padding-top:2px;    padding-bottom:2px;    padding-left:4px;    padding-right:4px;    flex-direction:row;    flex-wrap:nowrap;    justify-content:center;    align-items:center;    display:flex;        border-color:#F0F2F5;    border-style:solid;    border-top-width:1px;    border-left-width:1px;    border-right-width:1px;    border-bottom-width:1px;    border-radius:4px;    outline:0!important'
                            class='fasr_div_efb939451_Copy tr-div-default' :tabIndex='-1'
                            instanceCode='fasr_div_efb939451_Copy'>
                            <t-label :ref='el => Widget["fasr_label_155726_Copycf155726_Copy"] = el'
                                style='font-family:AlibabaPuHuiTi;    font-weight:500;    font-size:11px;    line-height:100%;    letter-spacing:0px;    color:rgba(0,0,0,0.56);    vertical-align: middle'
                                class='fasr_label_155726_Copycf155726_Copy'
                                instanceCode='fasr_label_155726_Copycf155726_Copy' valueType='expression'
                                :showHint='true' :tabIndex='1' :labelValue="LocalVars.pile.CustomerClassification">
                            </t-label>
                        </div>
                    </div>
                    <div :ref='el => Widget["fasr_div_a1486a"] = el'
                        style='flex-direction:row;  width:100%;  flex-wrap:nowrap;    justify-content:flex-start;    display:flex;            outline:0!important'
                        class='fasr_div_a1486a tr-div-default' :tabIndex='-1' instanceCode='fasr_div_a1486a'>
                        <div :ref='el => Widget["fasr_div_3fd328"] = el'
                            style='flex-direction:column;  width:50%;  flex-wrap:nowrap;    justify-content:flex-start;    display:flex;    row-gap:8px;        outline:0!important'
                            class='fasr_div_3fd328 tr-div-default' :tabIndex='-1' instanceCode='fasr_div_3fd328'>
                            <div :ref='el => Widget["fasr_div_d7f8d1"] = el'
                                style='flex-direction:row;    flex-wrap:nowrap;    justify-content:flex-start;    align-items:center;    display:flex;    column-gap:4px;        outline:0!important'
                                class='fasr_div_d7f8d1 tr-div-default' :tabIndex='-1' instanceCode='fasr_div_d7f8d1'>
                                <t-label :ref='el => Widget["fasr_label_e719153_Copy"] = el'
                                    style='    font-family:AlibabaPuHuiTi;    font-size:12px;    color:rgba(0,0,0,0.32);    white-space: nowrap'
                                    class='fasr_label_e719153_Copy' instanceCode='fasr_label_e719153_Copy'
                                    valueType='static' :showHint='true' :tabIndex='1'
                                    :constValue="$t('Schema.Page.UCChargingTerminal.Controls.fasr_label_e719153_Copy.ConstValue', '充电开始时间')">
                                </t-label>
                                <t-label :ref='el => Widget["fasr_label_e765029_Copy"] = el'
                                    style='    font-family:AlibabaPuHuiTi;    font-size:12px;    color:rgba(0,0,0,0.80)'
                                    class='fasr_label_e765029_Copy' instanceCode='fasr_label_e765029_Copy'
                                    valueType='expression' :showHint='true' :tabIndex='1'
                                    :labelValue="LocalVars.pile.ChargingBeginTime">
                                </t-label>
                            </div>
                            <div :ref='el => Widget["fasr_div_d283976_Copyf283976_Copyd283976_Copy"] = el'
                                style='flex-direction:row;    flex-wrap:nowrap;    justify-content:flex-start;    align-items:center;    display:flex;    column-gap:4px;        outline:0!important'
                                class='fasr_div_d283976_Copyf283976_Copyd283976_Copy tr-div-default' :tabIndex='-1'
                                instanceCode='fasr_div_d283976_Copyf283976_Copyd283976_Copy'>
                                <t-label :ref='el => Widget["fasr_label_e351115_Copy"] = el'
                                    style='    font-family:AlibabaPuHuiTi;    font-size:12px;    color:rgba(0,0,0,0.32)'
                                    class='fasr_label_e351115_Copy' instanceCode='fasr_label_e351115_Copy'
                                    valueType='static' :showHint='true' :tabIndex='1'
                                    :constValue="$t('Schema.Page.UCChargingTerminal.Controls.fasr_label_e351115_Copy.ConstValue', '已充时长')">
                                </t-label>
                                <t-label :ref='el => Widget["fasr_label_e963943_Copy"] = el'
                                    style='    font-family:AlibabaPuHuiTi;    font-size:12px;    color:rgba(0,0,0,0.80)'
                                    class='fasr_label_e963943_Copy' instanceCode='fasr_label_e963943_Copy'
                                    valueType='expression' :showHint='true' :tabIndex='1'
                                    :labelValue="LocalVars.pile.ChargingTime">
                                </t-label>
                            </div>
                        </div>
                        <div :ref='el => Widget["fasr_div_478252_Copyfd478252_Copy"] = el'
                            style='flex-direction:column;    flex-wrap:nowrap;    justify-content:flex-start;  padding-left: 8px;   display:flex;    row-gap:8px;        outline:0!important'
                            class='fasr_div_478252_Copyfd478252_Copy tr-div-default' :tabIndex='-1'
                            instanceCode='fasr_div_478252_Copyfd478252_Copy'>
                            <div :ref='el => Widget["fasr_div_d572769_Copyf572769_Copyd572769_Copy"] = el'
                                style='flex-direction:row;    flex-wrap:nowrap;    justify-content:flex-start;    align-items:center;    display:flex;    column-gap:4px;        outline:0!important'
                                class='fasr_div_d572769_Copyf572769_Copyd572769_Copy tr-div-default' :tabIndex='-1'
                                instanceCode='fasr_div_d572769_Copyf572769_Copyd572769_Copy'>
                                <t-label :ref='el => Widget["fasr_label_e966623_Copy"] = el'
                                    style='    font-family:AlibabaPuHuiTi;    font-size:12px;    color:rgba(0,0,0,0.32)'
                                    class='fasr_label_e966623_Copy' instanceCode='fasr_label_e966623_Copy'
                                    valueType='static' :showHint='true' :tabIndex='1'
                                    :constValue="$t('Schema.Page.UCChargingTerminal.Controls.fasr_label_e966623_Copy.ConstValue', '充电费用')">
                                </t-label>
                                <t-label :ref='el => Widget["fasr_label_e550574_Copy"] = el'
                                    style='    font-family:AlibabaPuHuiTi;    font-size:12px;    color:rgba(0,0,0,0.80)'
                                    class='fasr_label_e550574_Copy' instanceCode='fasr_label_e550574_Copy'
                                    valueType='expression' :showHint='true' :tabIndex='1'
                                    :labelValue="LocalVars.pile.ChargingMoney">
                                </t-label>
                            </div>
                            <div :ref='el => Widget["fasr_div_d501803_Copyf501803_Copyd501803_Copy"] = el'
                                style='flex-direction:row;    flex-wrap:nowrap;    justify-content:flex-start;    align-items:center;    display:flex;    column-gap:4px;        outline:0!important'
                                class='fasr_div_d501803_Copyf501803_Copyd501803_Copy tr-div-default' :tabIndex='-1'
                                instanceCode='fasr_div_d501803_Copyf501803_Copyd501803_Copy'>
                                <t-label :ref='el => Widget["fasr_label_e848877_Copy"] = el'
                                    style='    font-family:AlibabaPuHuiTi;    font-size:12px;    color:rgba(0,0,0,0.32)'
                                    class='fasr_label_e848877_Copy' instanceCode='fasr_label_e848877_Copy'
                                    valueType='static' :showHint='true' :tabIndex='1'
                                    :constValue="$t('Schema.Page.UCChargingTerminal.Controls.fasr_label_e848877_Copy.ConstValue', '充电量')">
                                </t-label>
                                <t-label :ref='el => Widget["fasr_label_e477747_Copy"] = el'
                                    style='    font-family:AlibabaPuHuiTi;    font-size:12px;    color:rgba(0,0,0,0.80)'
                                    class='fasr_label_e477747_Copy' instanceCode='fasr_label_e477747_Copy'
                                    valueType='expression' :showHint='true' :tabIndex='1'
                                    :labelValue="LocalVars.pile.ChargingPower">
                                </t-label>
                                <!--<t-label :ref='el=>Widget["fasr_label_e343214_Copy"]=el'
            style='    font-family:AlibabaPuHuiTi;    font-size:12px;    color:rgba(0,0,0,0.32)'
            class='fasr_label_e343214_Copy' instanceCode='fasr_label_e343214_Copy' valueType='static' :showHint='true'
            :tabIndex='1'
            :constValue="$t('Schema.Page.UCChargingTerminal.Controls.fasr_label_e343214_Copy.ConstValue','度')">
          </t-label>-->
                            </div>
                        </div>
                    </div>
                </div>
                <div :ref='el => Widget["fasr_div_8be150"] = el' v-show="LocalVars.infoSet.oneOld"
                    style='flex-direction:column;    flex-wrap:nowrap;    display:flex;    row-gap:6px;    padding-top:16px;    height:104px;        outline:0!important'
                    class='fasr_div_8be150 tr-div-default' :tabIndex='-1' instanceCode='fasr_div_8be150'>
                    <div :ref='el => Widget["fasr_div_e2661c"] = el'
                        style='flex-direction:row;    flex-wrap:nowrap;    justify-content:flex-start;    align-items:center;    display:flex;           outline:0!important'
                        class='fasr_div_e2661c tr-div-default' :tabIndex='-1' instanceCode='fasr_div_e2661c'>
                        <div :ref='el => Widget["fasr_div_fede55"] = el'
                            style='width:50%;    flex-direction:row;    flex-wrap:nowrap;    justify-content:flex-start;    align-items:center;    display:flex;    column-gap:4px;        outline:0!important'
                            class='fasr_div_fede55 tr-div-default' :tabIndex='-1' instanceCode='fasr_div_fede55'>
                            <t-label :ref='el => Widget["fasr_label_7dd81f"] = el'
                                style='    font-family:AlibabaPuHuiTi;    font-size:12px;    color:rgba(0,0,0,0.32);    text-overflow: clip;    overflow: visible'
                                class='fasr_label_7dd81f' instanceCode='fasr_label_7dd81f' valueType='static'
                                :showHint='true' :tabIndex='1'
                                :constValue="$t('Schema.Page.UCOtherTerminal.Controls.fasr_label_7dd81f.ConstValue', '判定车系')">
                            </t-label>
                            <t-label :ref='el => Widget["fasr_label_f1264a"] = el'
                                style='    font-family:AlibabaPuHuiTi;    font-size:12px;    color:rgba(0,0,0,0.80)'
                                class='fasr_label_f1264a' instanceCode='fasr_label_f1264a' valueType='expression'
                                :showHint='true' :tabIndex='1' :labelValue="LocalVars.pile.CarSeriesName">
                            </t-label>
                        </div>
                        <div :ref='el => Widget["fasr_div_fede681921_Copy"] = el'
                            style='width:50%;    flex-direction:row;    flex-wrap:nowrap;      padding-left: 8px;  justify-content:flex-start;    align-items:center;    display:flex;    column-gap:4px;        outline:0!important'
                            class='fasr_div_fede681921_Copy tr-div-default' :tabIndex='-1'
                            instanceCode='fasr_div_fede681921_Copy'>
                            <t-label :ref='el => Widget["fasr_label_247335_Copydd247335_Copyf"] = el'
                                style='    font-family:AlibabaPuHuiTi;    font-size:12px;    color:rgba(0,0,0,0.32);    text-overflow: clip;    overflow: visible'
                                class='fasr_label_247335_Copydd247335_Copyf'
                                instanceCode='fasr_label_247335_Copydd247335_Copyf' valueType='static' :showHint='true'
                                :tabIndex='1'
                                :constValue="$t('Schema.Page.UCOtherTerminal.Controls.fasr_label_247335_Copydd247335_Copyf.ConstValue', '车牌号')">
                            </t-label>
                            <t-label :ref='el => Widget["fasr_label_f571178_Copya"] = el'
                                style='    font-family:AlibabaPuHuiTi;    font-size:12px;    color:rgba(0,0,0,0.80)'
                                class='fasr_label_f571178_Copya' instanceCode='fasr_label_f571178_Copya'
                                valueType='expression' :showHint='true' :tabIndex='1'
                                :labelValue="LocalVars.pile.CarNumber">
                            </t-label>
                        </div>
                    </div>
                    <div :ref='el => Widget["fasr_div_e102943_Copyc"] = el'
                        style='flex-direction:row;    flex-wrap:nowrap;    justify-content:flex-start;    align-items:center;    display:flex;          outline:0!important'
                        class='fasr_div_e102943_Copyc tr-div-default' :tabIndex='-1'
                        instanceCode='fasr_div_e102943_Copyc'>
                        <div :ref='el => Widget["fasr_div_fede562011_Copy"] = el'
                            style='width:100%;    flex-direction:row;    flex-wrap:nowrap;    justify-content:flex-start;    align-items:center;    display:flex;    column-gap:4px;        outline:0!important'
                            class='fasr_div_fede562011_Copy tr-div-default' :tabIndex='-1'
                            instanceCode='fasr_div_fede562011_Copy'>
                            <t-label :ref='el => Widget["fasr_label_386241_Copydd386241_Copyf"] = el'
                                style='    font-family:AlibabaPuHuiTi;    font-size:12px;    color:rgba(0,0,0,0.32);    text-overflow: clip;    overflow: visible'
                                class='fasr_label_386241_Copydd386241_Copyf'
                                instanceCode='fasr_label_386241_Copydd386241_Copyf' valueType='static' :showHint='true'
                                :tabIndex='1'
                                :constValue="$t('Schema.Page.UCOtherTerminal.Controls.fasr_label_386241_Copydd386241_Copyf.ConstValue', '车架号')">
                            </t-label>
                            <t-label :ref='el => Widget["fasr_label_f511049_Copya"] = el'
                                style='    font-family:AlibabaPuHuiTi;    font-size:12px;    color:rgba(0,0,0,0.80)'
                                class='fasr_label_f511049_Copya' instanceCode='fasr_label_f511049_Copya'
                                valueType='expression' :showHint='true' :tabIndex='1' :labelValue="LocalVars.pile.VIN">
                            </t-label>
                        </div>
                    </div>
                    <div :ref='el => Widget["fasr_div_e529349_Copyc"] = el'
                        style='flex-direction:row;    flex-wrap:nowrap;    justify-content:flex-start;    align-items:center;    display:flex;    column-gap:8px;        outline:0!important'
                        class='fasr_div_e529349_Copyc tr-div-default' :tabIndex='-1'
                        instanceCode='fasr_div_e529349_Copyc'>
                        <div :ref='el => Widget["fasr_div_fede267191_Copy"] = el'
                            style='width:50%;    flex-direction:row;    flex-wrap:nowrap;    justify-content:flex-start;    align-items:center;    display:flex;    column-gap:4px;        outline:0!important'
                            class='fasr_div_fede267191_Copy tr-div-default' :tabIndex='-1'
                            instanceCode='fasr_div_fede267191_Copy'>
                            <t-label :ref='el => Widget["fasr_label_695984_Copydd695984_Copyf"] = el'
                                style='    font-family:AlibabaPuHuiTi;    font-size:12px;    color:rgba(0,0,0,0.32);    text-overflow: clip;    overflow: visible'
                                class='fasr_label_695984_Copydd695984_Copyf'
                                instanceCode='fasr_label_695984_Copydd695984_Copyf' valueType='static' :showHint='true'
                                :tabIndex='1'
                                :constValue="$t('Schema.Page.UCOtherTerminal.Controls.fasr_label_695984_Copydd695984_Copyf.ConstValue', '车辆自编号')">
                            </t-label>
                            <t-label :ref='el => Widget["fasr_label_f508715_Copya"] = el'
                                style='    font-family:AlibabaPuHuiTi;    font-size:12px;    color:rgba(0,0,0,0.80)'
                                class='fasr_label_f508715_Copya' instanceCode='fasr_label_f508715_Copya'
                                valueType='expression' :showHint='true' :tabIndex='1'
                                :labelValue="LocalVars.pile.VehicleCode">
                            </t-label>
                        </div>
                        <div :ref='el => Widget["fasr_div_fede119668_Copy"] = el'
                            style='width:50%;    flex-direction:row;    flex-wrap:nowrap;      padding-left: 8px;  justify-content:flex-start;    align-items:center;    display:flex;    column-gap:4px;        outline:0!important'
                            class='fasr_div_fede119668_Copy tr-div-default' :tabIndex='-1'
                            instanceCode='fasr_div_fede119668_Copy'>
                            <t-label :ref='el => Widget["fasr_label_384687_Copydd384687_Copyf"] = el'
                                style='    font-family:AlibabaPuHuiTi;    font-size:12px;    color:rgba(0,0,0,0.32);    text-overflow: clip;    overflow: visible'
                                class='fasr_label_384687_Copydd384687_Copyf'
                                instanceCode='fasr_label_384687_Copydd384687_Copyf' valueType='static' :showHint='true'
                                :tabIndex='1'
                                :constValue="$t('Schema.Page.UCOtherTerminal.Controls.fasr_label_384687_Copydd384687_Copyf.ConstValue', '路线')">
                            </t-label>
                            <t-label :ref='el => Widget["fasr_label_f505957_Copya"] = el'
                                style='    font-family:AlibabaPuHuiTi;    font-size:12px;    color:rgba(0,0,0,0.80)'
                                class='fasr_label_f505957_Copya' instanceCode='fasr_label_f505957_Copya'
                                valueType='expression' :showHint='true' :tabIndex='1'
                                :labelValue="LocalVars.pile.Route">
                            </t-label>
                        </div>
                    </div>
                    <div :ref='el => Widget["fasr_div_e524473_Copyc"] = el'
                        style='flex-direction:row;    flex-wrap:nowrap;    justify-content:flex-start;    align-items:center;    display:flex;          outline:0!important'
                        class='fasr_div_e524473_Copyc tr-div-default' :tabIndex='-1'
                        instanceCode='fasr_div_e524473_Copyc'>
                        <div :ref='el => Widget["fasr_div_fede559299_Copy"] = el'
                            style='width:50%;    flex-direction:row;    flex-wrap:nowrap;    justify-content:flex-start;    align-items:center;    display:flex;    column-gap:4px;        outline:0!important'
                            class='fasr_div_fede559299_Copy tr-div-default' :tabIndex='-1'
                            instanceCode='fasr_div_fede559299_Copy'>
                            <t-label :ref='el => Widget["fasr_label_779803_Copydd779803_Copyf"] = el'
                                style='    font-family:AlibabaPuHuiTi;    font-size:12px;    color:rgba(0,0,0,0.32);    text-overflow: clip;    overflow: visible'
                                class='fasr_label_779803_Copydd779803_Copyf'
                                instanceCode='fasr_label_779803_Copydd779803_Copyf' valueType='static' :showHint='true'
                                :tabIndex='1'
                                :constValue="$t('Schema.Page.UCOtherTerminal.Controls.fasr_label_779803_Copydd779803_Copyf.ConstValue', '电池最高温度')">
                            </t-label>
                            <t-label :ref='el => Widget["fasr_label_f503367_Copya"] = el'
                                style='    font-family:AlibabaPuHuiTi;    font-size:12px;    color:rgba(0,0,0,0.80)'
                                class='fasr_label_f503367_Copya' instanceCode='fasr_label_f503367_Copya'
                                valueType='expression' :showHint='true' :tabIndex='1'
                                :labelValue="LocalVars.pile.MaxTemperature">
                            </t-label>
                        </div>
                        <div :ref='el => Widget["fasr_div_fede521820_Copy"] = el'
                            style='width:50%;    flex-direction:row;    flex-wrap:nowrap;     padding-left: 8px;   justify-content:flex-start;    align-items:center;    display:flex;    column-gap:4px;        outline:0!important'
                            class='fasr_div_fede521820_Copy tr-div-default' :tabIndex='-1'
                            instanceCode='fasr_div_fede521820_Copy'>
                            <t-label :ref='el => Widget["fasr_label_955825_Copydd955825_Copyf"] = el'
                                style='    font-family:AlibabaPuHuiTi;    font-size:12px;    color:rgba(0,0,0,0.32);    text-overflow: clip;    overflow: visible'
                                class='fasr_label_955825_Copydd955825_Copyf'
                                instanceCode='fasr_label_955825_Copydd955825_Copyf' valueType='static' :showHint='true'
                                :tabIndex='1'
                                :constValue="$t('Schema.Page.UCOtherTerminal.Controls.fasr_label_955825_Copydd955825_Copyf.ConstValue', '电池最低温度')">
                            </t-label>
                            <t-label :ref='el => Widget["fasr_label_f612408_Copya"] = el'
                                style='    font-family:AlibabaPuHuiTi;    font-size:12px;    color:rgba(0,0,0,0.80)'
                                class='fasr_label_f612408_Copya' instanceCode='fasr_label_f612408_Copya'
                                valueType='expression' :showHint='true' :tabIndex='1'
                                :labelValue="LocalVars.pile.MinTemperature">
                            </t-label>
                        </div>
                    </div>
                </div>
                <div :ref='el => Widget["fasr_div_912827_Copybe912827_Copy"] = el' v-show="LocalVars.infoSet.twoOld"
                    style='flex-direction:column;    flex-wrap:nowrap;    display:flex;    row-gap:6px;    padding-top:16px;    height:84px;        outline:0!important'
                    class='fasr_div_912827_Copybe912827_Copy tr-div-default' :tabIndex='-1'
                    instanceCode='fasr_div_912827_Copybe912827_Copy'>
                    <div :ref='el => Widget["fasr_div_e923776_Copyc"] = el'
                        style='flex-direction:row;    flex-wrap:nowrap;    justify-content:flex-start;    align-items:center;    display:flex;           outline:0!important'
                        class='fasr_div_e923776_Copyc tr-div-default' :tabIndex='-1'
                        instanceCode='fasr_div_e923776_Copyc'>
                        <div :ref='el => Widget["fasr_div_fede210993_Copy"] = el'
                            style='width:50%;    flex-direction:row;    flex-wrap:nowrap;    justify-content:flex-start;    align-items:center;    display:flex;    column-gap:4px;        outline:0!important'
                            class='fasr_div_fede210993_Copy tr-div-default' :tabIndex='-1'
                            instanceCode='fasr_div_fede210993_Copy'>
                            <t-label :ref='el => Widget["fasr_label_796168_Copydd796168_Copyf"] = el'
                                style='    font-family:AlibabaPuHuiTi;    font-size:12px;    color:rgba(0,0,0,0.32);    text-overflow: clip;    overflow: visible'
                                class='fasr_label_796168_Copydd796168_Copyf'
                                instanceCode='fasr_label_796168_Copydd796168_Copyf' valueType='static' :showHint='true'
                                :tabIndex='1'
                                :constValue="$t('Schema.Page.UCOtherTerminal.Controls.fasr_label_796168_Copydd796168_Copyf.ConstValue', '插枪时间')">
                            </t-label>
                            <t-label :ref='el => Widget["fasr_label_f314340_Copya"] = el'
                                style='    font-family:AlibabaPuHuiTi;    font-size:12px;    color:rgba(0,0,0,0.80)'
                                class='fasr_label_f314340_Copya' instanceCode='fasr_label_f314340_Copya'
                                valueType='expression' :showHint='true' :tabIndex='1'
                                :labelValue="LocalVars.pile.GunInsertionTime">
                            </t-label>
                        </div>
                        <div :ref='el => Widget["fasr_div_fede487222_Copy"] = el'
                            style='width:50%;    flex-direction:row;    flex-wrap:nowrap;     padding-left: 8px;   justify-content:flex-start;    align-items:center;    display:flex;    column-gap:4px;        outline:0!important'
                            class='fasr_div_fede487222_Copy tr-div-default' :tabIndex='-1'
                            instanceCode='fasr_div_fede487222_Copy'>
                            <t-label :ref='el => Widget["fasr_label_775321_Copydd775321_Copyf"] = el'
                                style='    font-family:AlibabaPuHuiTi;    font-size:12px;    color:rgba(0,0,0,0.32);    text-overflow: clip;    overflow: visible'
                                class='fasr_label_775321_Copydd775321_Copyf'
                                instanceCode='fasr_label_775321_Copydd775321_Copyf' valueType='static' :showHint='true'
                                :tabIndex='1'
                                :constValue="$t('Schema.Page.UCOtherTerminal.Controls.fasr_label_775321_Copydd775321_Copyf.ConstValue', '启动方式')">
                            </t-label>
                            <t-label :ref='el => Widget["fasr_label_f881760_Copya"] = el'
                                style='    font-family:AlibabaPuHuiTi;    font-size:12px;    color:rgba(0,0,0,0.80)'
                                class='fasr_label_f881760_Copya' instanceCode='fasr_label_f881760_Copya'
                                valueType='expression' :showHint='true' :tabIndex='1'
                                :labelValue="LocalVars.pile.ChargeNames">
                            </t-label>
                        </div>
                    </div>
                    <div :ref='el => Widget["fasr_div_e436925_Copyc"] = el'
                        style='flex-direction:row;    flex-wrap:nowrap;    justify-content:flex-start;    align-items:center;    display:flex;           outline:0!important'
                        class='fasr_div_e436925_Copyc tr-div-default' :tabIndex='-1'
                        instanceCode='fasr_div_e436925_Copyc'>
                        <div :ref='el => Widget["fasr_div_fede130481_Copy"] = el'
                            style='width:50%;    flex-direction:row;    flex-wrap:nowrap;    justify-content:flex-start;    align-items:center;    display:flex;    column-gap:4px;        outline:0!important'
                            class='fasr_div_fede130481_Copy tr-div-default' :tabIndex='-1'
                            instanceCode='fasr_div_fede130481_Copy'>
                            <t-label :ref='el => Widget["fasr_label_424176_Copydd424176_Copyf"] = el'
                                style='    font-family:AlibabaPuHuiTi;    font-size:12px;    color:rgba(0,0,0,0.32);    text-overflow: clip;    overflow: visible'
                                class='fasr_label_424176_Copydd424176_Copyf'
                                instanceCode='fasr_label_424176_Copydd424176_Copyf' valueType='static' :showHint='true'
                                :tabIndex='1'
                                :constValue="$t('Schema.Page.UCOtherTerminal.Controls.fasr_label_424176_Copydd424176_Copyf.ConstValue', '充电入口')">
                            </t-label>
                            <t-label :ref='el => Widget["fasr_label_f231034_Copya"] = el'
                                style='    font-family:AlibabaPuHuiTi;    font-size:12px;    color:rgba(0,0,0,0.80)'
                                class='fasr_label_f231034_Copya' instanceCode='fasr_label_f231034_Copya'
                                valueType='expression' :showHint='true' :tabIndex='1'
                                :labelValue="LocalVars.pile.ChargeEnter">
                            </t-label>
                        </div>
                        <div :ref='el => Widget["fasr_div_fede814869_Copy"] = el'
                            style='width:50%;    flex-direction:row;    flex-wrap:nowrap;     padding-left: 8px;   justify-content:flex-start;    align-items:center;    display:flex;    column-gap:4px;        outline:0!important'
                            class='fasr_div_fede814869_Copy tr-div-default' :tabIndex='-1'
                            instanceCode='fasr_div_fede814869_Copy'>
                            <t-label :ref='el => Widget["fasr_label_360184_Copydd360184_Copyf"] = el'
                                style='    font-family:AlibabaPuHuiTi;    font-size:12px;    color:rgba(0,0,0,0.32);    text-overflow: clip;    overflow: visible'
                                class='fasr_label_360184_Copydd360184_Copyf'
                                instanceCode='fasr_label_360184_Copydd360184_Copyf' valueType='static' :showHint='true'
                                :tabIndex='1'
                                :constValue="$t('Schema.Page.UCOtherTerminal.Controls.fasr_label_360184_Copydd360184_Copyf.ConstValue', '初始SOC')">
                            </t-label>
                            <t-label :ref='el => Widget["fasr_label_f207935_Copya"] = el'
                                style='    font-family:AlibabaPuHuiTi;    font-size:12px;    color:rgba(0,0,0,0.80)'
                                class='fasr_label_f207935_Copya' instanceCode='fasr_label_f207935_Copya'
                                valueType='expression' :showHint='true' :tabIndex='1'
                                :labelValue="LocalVars.pile.InitSOC">
                            </t-label>
                        </div>
                    </div>
                    <div :ref='el => Widget["fasr_div_e759346_Copyc"] = el'
                        style='flex-direction:row;    flex-wrap:nowrap;    justify-content:flex-start;    align-items:center;    display:flex;           outline:0!important'
                        class='fasr_div_e759346_Copyc tr-div-default' :tabIndex='-1'
                        instanceCode='fasr_div_e759346_Copyc'>
                        <div :ref='el => Widget["fasr_div_fede869312_Copy"] = el'
                            style='width:50%;    flex-direction:row;    flex-wrap:nowrap;    justify-content:flex-start;    align-items:center;    display:flex;    column-gap:4px;        outline:0!important'
                            class='fasr_div_fede869312_Copy tr-div-default' :tabIndex='-1'
                            instanceCode='fasr_div_fede869312_Copy'>
                            <t-label :ref='el => Widget["fasr_label_125853_Copydd125853_Copyf"] = el'
                                style='    font-family:AlibabaPuHuiTi;    font-size:12px;    color:rgba(0,0,0,0.32);    text-overflow: clip;    overflow: visible'
                                class='fasr_label_125853_Copydd125853_Copyf'
                                instanceCode='fasr_label_125853_Copydd125853_Copyf' valueType='static' :showHint='true'
                                :tabIndex='1'
                                :constValue="$t('Schema.Page.UCOtherTerminal.Controls.fasr_label_125853_Copydd125853_Copyf.ConstValue', '预计剩余时间')">
                            </t-label>
                            <t-label :ref='el => Widget["fasr_label_f470608_Copya"] = el'
                                style='    font-family:AlibabaPuHuiTi;    font-size:12px;    color:rgba(0,0,0,0.80)'
                                class='fasr_label_f470608_Copya' instanceCode='fasr_label_f470608_Copya'
                                valueType='expression' :showHint='true' :tabIndex='1'
                                :labelValue="LocalVars.pile.ChargingLastTime">
                            </t-label>
                        </div>
                        <div :ref='el => Widget["fasr_div_fede748765_Copy"] = el'
                            style='width:50%;    flex-direction:row;    flex-wrap:nowrap;     padding-left: 8px;   justify-content:flex-start;    align-items:center;    display:flex;    column-gap:4px;        outline:0!important'
                            class='fasr_div_fede748765_Copy tr-div-default' :tabIndex='-1'
                            instanceCode='fasr_div_fede748765_Copy'>
                            <t-label :ref='el => Widget["fasr_label_780108_Copydd780108_Copyf"] = el'
                                style='    font-family:AlibabaPuHuiTi;    font-size:12px;    color:rgba(0,0,0,0.32);    text-overflow: clip;    overflow: visible'
                                class='fasr_label_780108_Copydd780108_Copyf'
                                instanceCode='fasr_label_780108_Copydd780108_Copyf' valueType='static' :showHint='true'
                                :tabIndex='1'
                                :constValue="$t('Schema.Page.UCOtherTerminal.Controls.fasr_label_780108_Copydd780108_Copyf.ConstValue', '充电结束时间')">
                            </t-label>
                            <t-label :ref='el => Widget["fasr_label_f308661_Copya"] = el'
                                style='    font-family:AlibabaPuHuiTi;    font-size:12px;    color:rgba(0,0,0,0.80)'
                                class='fasr_label_f308661_Copya' instanceCode='fasr_label_f308661_Copya'
                                valueType='expression' :showHint='true' :tabIndex='1'
                                :labelValue="LocalVars.pile.ChargingEndTime">
                            </t-label>
                        </div>
                    </div>
                </div>
                <div :ref='el => Widget["fasr_div_793983_Copybe793983_Copy"] = el' v-show="LocalVars.infoSet.threeOld"
                    style='flex-direction:column;    flex-wrap:nowrap;    display:flex;    row-gap:6px;    padding-top:16px;    height:104px;        outline:0!important'
                    class='fasr_div_793983_Copybe793983_Copy tr-div-default' :tabIndex='-1'
                    instanceCode='fasr_div_793983_Copybe793983_Copy'>
                    <div :ref='el => Widget["fasr_div_e815185_Copyc"] = el'
                        style='flex-direction:row;    flex-wrap:nowrap;    justify-content:flex-start;    align-items:center;    display:flex;            outline:0!important'
                        class='fasr_div_e815185_Copyc tr-div-default' :tabIndex='-1'
                        instanceCode='fasr_div_e815185_Copyc'>
                        <div :ref='el => Widget["fasr_div_fede106145_Copy"] = el'
                            style='width:50%;    flex-direction:row;    flex-wrap:nowrap;    justify-content:flex-start;    align-items:center;    display:flex;    column-gap:4px;        outline:0!important'
                            class='fasr_div_fede106145_Copy tr-div-default' :tabIndex='-1'
                            instanceCode='fasr_div_fede106145_Copy'>
                            <t-label :ref='el => Widget["fasr_label_123557_Copydd123557_Copyf"] = el'
                                style='    font-family:AlibabaPuHuiTi;    font-size:12px;    color:rgba(0,0,0,0.32);    text-overflow: clip;    overflow: visible'
                                class='fasr_label_123557_Copydd123557_Copyf'
                                instanceCode='fasr_label_123557_Copydd123557_Copyf' valueType='static' :showHint='true'
                                :tabIndex='1'
                                :constValue="$t('Schema.Page.UCOtherTerminal.Controls.fasr_label_123557_Copydd123557_Copyf.ConstValue', '实际电流')">
                            </t-label>
                            <t-label :ref='el => Widget["fasr_label_f577711_Copya"] = el'
                                style='    font-family:AlibabaPuHuiTi;    font-size:12px;    color:rgba(0,0,0,0.80)'
                                class='fasr_label_f577711_Copya' instanceCode='fasr_label_f577711_Copya'
                                valueType='expression' :showHint='true' :tabIndex='1' :labelValue="LocalVars.pile.AP">
                            </t-label>
                        </div>
                        <div :ref='el => Widget["fasr_div_fede155251_Copy"] = el'
                            style='width:50%;    flex-direction:row;    flex-wrap:nowrap;  padding-left: 8px;   justify-content:flex-start;    align-items:center;    display:flex;    column-gap:4px;        outline:0!important'
                            class='fasr_div_fede155251_Copy tr-div-default' :tabIndex='-1'
                            instanceCode='fasr_div_fede155251_Copy'>
                            <t-label :ref='el => Widget["fasr_label_632675_Copydd632675_Copyf"] = el'
                                style='    font-family:AlibabaPuHuiTi;    font-size:12px;    color:rgba(0,0,0,0.32);    text-overflow: clip;    overflow: visible'
                                class='fasr_label_632675_Copydd632675_Copyf'
                                instanceCode='fasr_label_632675_Copydd632675_Copyf' valueType='static' :showHint='true'
                                :tabIndex='1'
                                :constValue="$t('Schema.Page.UCOtherTerminal.Controls.fasr_label_632675_Copydd632675_Copyf.ConstValue', '实际功率')">
                            </t-label>
                            <t-label :ref='el => Widget["fasr_label_f624145_Copya"] = el'
                                style='    font-family:AlibabaPuHuiTi;    font-size:12px;    color:rgba(0,0,0,0.80)'
                                class='fasr_label_f624145_Copya' instanceCode='fasr_label_f624145_Copya'
                                valueType='expression' :showHint='true' :tabIndex='1' :labelValue="LocalVars.pile.DP">
                            </t-label>
                        </div>
                    </div>
                    <div :ref='el => Widget["fasr_div_e714114_Copyc"] = el'
                        style='flex-direction:row;    flex-wrap:nowrap;    justify-content:flex-start;    align-items:center;    display:flex;         outline:0!important'
                        class='fasr_div_e714114_Copyc tr-div-default' :tabIndex='-1'
                        instanceCode='fasr_div_e714114_Copyc'>
                        <div :ref='el => Widget["fasr_div_fede951545_Copy"] = el'
                            style='width:50%;    flex-direction:row;    flex-wrap:nowrap;    justify-content:flex-start;    align-items:center;    display:flex;    column-gap:4px;        outline:0!important'
                            class='fasr_div_fede951545_Copy tr-div-default' :tabIndex='-1'
                            instanceCode='fasr_div_fede951545_Copy'>
                            <t-label :ref='el => Widget["fasr_label_258866_Copydd258866_Copyf"] = el'
                                style='    font-family:AlibabaPuHuiTi;    font-size:12px;    color:rgba(0,0,0,0.32);    text-overflow: clip;    overflow: visible'
                                class='fasr_label_258866_Copydd258866_Copyf'
                                instanceCode='fasr_label_258866_Copydd258866_Copyf' valueType='static' :showHint='true'
                                :tabIndex='1'
                                :constValue="$t('Schema.Page.UCOtherTerminal.Controls.fasr_label_258866_Copydd258866_Copyf.ConstValue', '平均需求电流')">
                            </t-label>
                            <t-label :ref='el => Widget["fasr_label_f504033_Copya"] = el'
                                style='    font-family:AlibabaPuHuiTi;    font-size:12px;    color:rgba(0,0,0,0.80)'
                                class='fasr_label_f504033_Copya' instanceCode='fasr_label_f504033_Copya'
                                valueType='expression' :showHint='true' :tabIndex='1'
                                :labelValue="LocalVars.pile.AvgAP">
                            </t-label>
                        </div>
                        <div :ref='el => Widget["fasr_div_fede922259_Copy"] = el'
                            style='width:50%;    flex-direction:row;    flex-wrap:nowrap;  padding-left: 8px;   justify-content:flex-start;    align-items:center;    display:flex;    column-gap:4px;        outline:0!important'
                            class='fasr_div_fede922259_Copy tr-div-default' :tabIndex='-1'
                            instanceCode='fasr_div_fede922259_Copy'>
                            <t-label :ref='el => Widget["fasr_label_113155_Copydd113155_Copyf"] = el'
                                style='    font-family:AlibabaPuHuiTi;    font-size:12px;    color:rgba(0,0,0,0.32);    text-overflow: clip;    overflow: visible'
                                class='fasr_label_113155_Copydd113155_Copyf'
                                instanceCode='fasr_label_113155_Copydd113155_Copyf' valueType='static' :showHint='true'
                                :tabIndex='1'
                                :constValue="$t('Schema.Page.UCOtherTerminal.Controls.fasr_label_113155_Copydd113155_Copyf.ConstValue', '平均需求功率')">
                            </t-label>
                            <t-label :ref='el => Widget["fasr_label_f413512_Copya"] = el'
                                style='    font-family:AlibabaPuHuiTi;    font-size:12px;    color:rgba(0,0,0,0.80)'
                                class='fasr_label_f413512_Copya' instanceCode='fasr_label_f413512_Copya'
                                valueType='expression' :showHint='true' :tabIndex='1'
                                :labelValue="LocalVars.pile.AvgDP">
                            </t-label>
                        </div>
                    </div>
                    <div :ref='el => Widget["fasr_div_e149294_Copyc"] = el'
                        style='flex-direction:row;    flex-wrap:nowrap;    justify-content:flex-start;    align-items:center;    display:flex;           outline:0!important'
                        class='fasr_div_e149294_Copyc tr-div-default' :tabIndex='-1'
                        instanceCode='fasr_div_e149294_Copyc'>
                        <div :ref='el => Widget["fasr_div_fede634480_Copy"] = el'
                            style='width:50%;    flex-direction:row;    flex-wrap:nowrap;    justify-content:flex-start;    align-items:center;    display:flex;    column-gap:4px;        outline:0!important'
                            class='fasr_div_fede634480_Copy tr-div-default' :tabIndex='-1'
                            instanceCode='fasr_div_fede634480_Copy'>
                            <t-label :ref='el => Widget["fasr_label_128287_Copydd128287_Copyf"] = el'
                                style='    font-family:AlibabaPuHuiTi;    font-size:12px;    color:rgba(0,0,0,0.32);    text-overflow: clip;    overflow: visible'
                                class='fasr_label_128287_Copydd128287_Copyf'
                                instanceCode='fasr_label_128287_Copydd128287_Copyf' valueType='static' :showHint='true'
                                :tabIndex='1'
                                :constValue="$t('Schema.Page.UCOtherTerminal.Controls.fasr_label_128287_Copydd128287_Copyf.ConstValue', '最大需求电流')">
                            </t-label>
                            <t-label :ref='el => Widget["fasr_label_f919840_Copya"] = el'
                                style='    font-family:AlibabaPuHuiTi;    font-size:12px;    color:rgba(0,0,0,0.80)'
                                class='fasr_label_f919840_Copya' instanceCode='fasr_label_f919840_Copya'
                                valueType='expression' :showHint='true' :tabIndex='1'
                                :labelValue="LocalVars.pile.MaxAP">
                            </t-label>
                        </div>
                        <div :ref='el => Widget["fasr_div_fede282728_Copy"] = el'
                            style='width:50%;    flex-direction:row;    flex-wrap:nowrap;  padding-left: 8px;   justify-content:flex-start;    align-items:center;    display:flex;    column-gap:4px;        outline:0!important'
                            class='fasr_div_fede282728_Copy tr-div-default' :tabIndex='-1'
                            instanceCode='fasr_div_fede282728_Copy'>
                            <t-label :ref='el => Widget["fasr_label_989798_Copydd989798_Copyf"] = el'
                                style='    font-family:AlibabaPuHuiTi;    font-size:12px;    color:rgba(0,0,0,0.32);    text-overflow: clip;    overflow: visible'
                                class='fasr_label_989798_Copydd989798_Copyf'
                                instanceCode='fasr_label_989798_Copydd989798_Copyf' valueType='static' :showHint='true'
                                :tabIndex='1'
                                :constValue="$t('Schema.Page.UCOtherTerminal.Controls.fasr_label_989798_Copydd989798_Copyf.ConstValue', '最大需求功率')">
                            </t-label>
                            <t-label :ref='el => Widget["fasr_label_f664082_Copya"] = el'
                                style='    font-family:AlibabaPuHuiTi;    font-size:12px;    color:rgba(0,0,0,0.80)'
                                class='fasr_label_f664082_Copya' instanceCode='fasr_label_f664082_Copya'
                                valueType='expression' :showHint='true' :tabIndex='1'
                                :labelValue="LocalVars.pile.MaxDP">
                            </t-label>
                        </div>
                    </div>
                    <div :ref='el => Widget["fasr_div_e564386_Copyc"] = el'
                        style='flex-direction:row;    flex-wrap:nowrap;    justify-content:flex-start;    align-items:center;    display:flex;           outline:0!important'
                        class='fasr_div_e564386_Copyc tr-div-default' :tabIndex='-1'
                        instanceCode='fasr_div_e564386_Copyc'>
                        <div :ref='el => Widget["fasr_div_fede396082_Copy"] = el'
                            style='width:50%;    flex-direction:row;    flex-wrap:nowrap;    justify-content:flex-start;    align-items:center;    display:flex;    column-gap:4px;        outline:0!important'
                            class='fasr_div_fede396082_Copy tr-div-default' :tabIndex='-1'
                            instanceCode='fasr_div_fede396082_Copy'>
                            <t-label :ref='el => Widget["fasr_label_159984_Copydd159984_Copyf"] = el'
                                style='    font-family:AlibabaPuHuiTi;    font-size:12px;    color:rgba(0,0,0,0.32);    text-overflow: clip;    overflow: visible'
                                class='fasr_label_159984_Copydd159984_Copyf'
                                instanceCode='fasr_label_159984_Copydd159984_Copyf' valueType='static' :showHint='true'
                                :tabIndex='1'
                                :constValue="$t('Schema.Page.UCOtherTerminal.Controls.fasr_label_159984_Copydd159984_Copyf.ConstValue', '电流满足率')">
                            </t-label>
                            <t-label :ref='el => Widget["fasr_label_f942212_Copya"] = el'
                                style='    font-family:AlibabaPuHuiTi;    font-size:12px;    color:rgba(0,0,0,0.80)'
                                class='fasr_label_f942212_Copya' instanceCode='fasr_label_f942212_Copya'
                                valueType='expression' :showHint='true' :tabIndex='1'
                                :labelValue="LocalVars.pile.ElectricRate">
                            </t-label>
                        </div>
                        <div :ref='el => Widget["fasr_div_fede670079_Copy"] = el'
                            style='width:50%;    flex-direction:row;    flex-wrap:nowrap; padding-left: 8px;    justify-content:flex-start;    align-items:center;    display:flex;    column-gap:4px;        outline:0!important'
                            class='fasr_div_fede670079_Copy tr-div-default' :tabIndex='-1'
                            instanceCode='fasr_div_fede670079_Copy'>
                            <t-label :ref='el => Widget["fasr_label_873150_Copydd873150_Copyf"] = el'
                                style='    font-family:AlibabaPuHuiTi;    font-size:12px;    color:rgba(0,0,0,0.32);    text-overflow: clip;    overflow: visible'
                                class='fasr_label_873150_Copydd873150_Copyf'
                                instanceCode='fasr_label_873150_Copydd873150_Copyf' valueType='static' :showHint='true'
                                :tabIndex='1'
                                :constValue="$t('Schema.Page.UCOtherTerminal.Controls.fasr_label_873150_Copydd873150_Copyf.ConstValue', '功率满足率')">
                            </t-label>
                            <t-label :ref='el => Widget["fasr_label_f516478_Copya"] = el'
                                style='    font-family:AlibabaPuHuiTi;    font-size:12px;    color:rgba(0,0,0,0.80)'
                                class='fasr_label_f516478_Copya' instanceCode='fasr_label_f516478_Copya'
                                valueType='expression' :showHint='true' :tabIndex='1'
                                :labelValue="LocalVars.pile.PowerRate">
                            </t-label>
                        </div>
                    </div>
                </div>
            </div>
            <div :ref='el => Widget["fasr_div_740147_Copye740147_Copyab"] = el'
                style='padding-left:10px;    padding-right:10px;    flex-direction:row; height:31px;   flex-wrap:nowrap;    display:flex;    column-gap:10px;        outline:0!important'
                class='fasr_div_740147_Copye740147_Copyab tr-div-default' :tabIndex='-1'
                instanceCode='fasr_div_740147_Copye740147_Copyab'>

                <t-button :ref='el => Widget["fasr_button_592685_Copya592685_Copycf"] = el'
                    v-loading="_this.LoadingCloseCharge"
                    style='width:100%;        border-radius:2px;     border-color:#FD2020; background-color:#FD2020; color: #FFFFFF;  border-style:solid;    border-top-width:1px;    border-left-width:1px;    border-right-width:1px;    border-bottom-width:1px'
                    class='fasr_button_592685_Copya592685_Copycf tr-button-default '
                    :label="$t('Schema.Page.UCChargeFullTerminal.Controls.fasr_button_592685_Copya592685_Copycf.Label', '结束充电')"
                    instanceCode='fasr_button_592685_Copya592685_Copycf' :showHint='true' :tabIndex='1'
                    @click="confirmCloseCharge">
                </t-button>
            </div>
        </div>

        <!-- 订单详情 -->
        <t-dialog v-model:show="isShowOrderCard">
            <div style='background:#FFFFFF;width:520px;'>
                <div class='div-top-dialog-title'>
                    <t-label class="div-top-dialog-font" :tabIndex='1' valueType='static' :showHint='true'
                        :constValue='orderCardTitle'>
                    </t-label>
                    <t-button class=' tr-button-icon-text2' label='' icon='fas dx-icon icon-t-delete-01'
                        :showHint='true' @click="isShowOrderCard = false" :tabIndex='1' v-close-popup>
                    </t-button>
                </div>
                <div class='tr-div-dialog'>
                    <div class="m-info">
                        <div class="ul">
                            <div class="li">
                                <div class="field">订单编号：</div>
                                <div class="value" @click="toOrderPage">
                                    <span :class="TeldProductVersionType != 'Standard' ? 'link' : ''">{{
                                        orderCardInfo.Code
                                        || '--' }}</span>
                                </div>
                            </div>
                            <div class="li">
                                <div class="field">开始时间：</div>
                                <div class="value">{{ orderCardInfo.BeginTime_Str || '--' }}</div>
                            </div>
                            <div class="li">
                                <div class="field">结束时间：</div>
                                <div class="value">{{ orderCardInfo.EndTime_Str || '--' }}</div>
                            </div>
                            <div class="li">
                                <div class="field">总电量（度）：</div>
                                <div class="value">{{ orderCardInfo.Power_Str || '--' }}</div>
                            </div>
                            <div class="li">
                                <div class="field">充电费用（元）：</div>
                                <div class="value">{{ TotalPriceStr }}</div>
                            </div>
                            <div class="li">
                                <div class="field">充电人：</div>
                                <div class="value">{{ orderCardInfo.CustName || '--' }}</div>
                            </div>
                        </div>
                        <t-table flat bordered title="" :rows="orderCardTableData" :columns="orderCardColumn"
                            :hide-pagination="true" row-key="sd" separator="cell" />
                    </div>

                    <span slot="footer" class="select_helper_popup_foot">
                        <t-button flat label="关闭" class="tr-button-default" @click="isShowOrderCard = false" />
                    </span>
                </div>
            </div>
        </t-dialog>
    </div>
</template>
<script setup lang="ts">
import { DataQueryClass } from '../models/DataQueryClass';
import { DataQueryClassAsync } from '../models/DataQueryClassAsync';
import { ActionClass } from '../models/ActionClass';
import { ActionClassAsync } from '../models/ActionClassAsync';
const DataQuery = new DataQueryClass();
DataQuery.Promise = new DataQueryClassAsync();
const Action = new ActionClass();
Action.Promise = new ActionClassAsync();


import { ref, onMounted, reactive, toRefs, watch, computed } from 'vue';

const props = defineProps({
  localVars: Object,
  visible: {
    type: Boolean,
    default: true
  },
});
const mappingProps = reactive({ ...props });
const mappingExpose = toRefs(reactive({ ...props }));
watch(mappingExpose.visible, (newValue, oldValue) => {
  mappingProps.visible = newValue;
});
watch(props.visible, (newValue, oldValue) => {
  mappingProps.visible = newValue;
});
defineExpose({
  visible: mappingExpose.visible
});
const LocalVars = props.localVars;
const fireUCEvent = defineEmits([ 'OnFireEvent' ]);
const pileSocValue = computed(() => {
  const rawSoc = LocalVars?.pile?.PileSOC;
  if (rawSoc === null || rawSoc === undefined || rawSoc === '') return 0;
  const soc = typeof rawSoc === 'number' ? rawSoc : parseFloat(String(rawSoc).replace('%', ''));
  return Number.isFinite(soc) ? Math.min(Math.max(soc, 0), 100) : 0;
});
const socLevel = computed<'low' | 'middle' | 'high'>(() => {
  if (pileSocValue.value <= 20) return 'low';
  if (pileSocValue.value >= 80) return 'high';
  return 'middle';
});
const socBatteryFillColor = computed(() => {
  if (socLevel.value === 'low') return '#DC143C';
  if (socLevel.value === 'high') return '#17B26A';
  return '#FF8C00';
});
const socBatteryFillWidth = computed(() => {
  if (pileSocValue.value <= 0) return 0;
  return Math.max(1, Math.round((pileSocValue.value / 100) * 16));
});
const socDisplayText = computed(() => `${ Math.round(pileSocValue.value) }%`);
const Widget = {
  FireUCEvent: fireUCEvent
};
const _this = {
  LoadingStartCharge: ref(false),

  // 结束充电
  LoadingCloseCharge: ref(false),
};
function confirmCloseCharge() {
  Funcs.Confirm('提示', `确认要给终端[${ LocalVars.pile.PileName }]结束充电吗?`, function () {
    closeCharge();
  });
}
// 真正结束充电 单个的
function closeCharge() {
  _this.LoadingCloseCharge.value = true;
  if (!LocalVars.pile.PileCode) return;
  const param = {
    CustomerID: LocalVars.pile.CustomerID, //客户ID
    SecondSource: 'PowerDispatchingShow',
    StaID: LocalVars.pile.StaID,
    StaName: LocalVars.pile.StaName,
    CtrlAddress: LocalVars.pile.CtrlAddress, //集控器
    CanAddress: LocalVars.pile.CanSN, // 这是啥？
    PileCode: LocalVars.pile.PileCode,
    AffordAccountId: LocalVars.pile.AffordAccountId, //支付账户
    IsThirdStation: LocalVars.pile.IsThirdStation || false,
  };

  const sid = 'TPS-EndChargeV2';

  sgApiPost(
    sid,
    { param }
  ).then(result => {
    const { msg, data: { state, data, errmsg } } = result;
    _this.LoadingCloseCharge.value = false;

    if (msg == 'success' && state == '1') {
      Funcs.Notify('消息', '结束充电成功', 'success');
      LocalVars.isDetail = false;

      Widget.FireUCEvent('OnFireEvent', 'refresh');
    }
    else {
      Funcs.Notify('警告', errmsg || '结束充电失败', 'error');
    }
  });

}

const isShowOrderCard = ref(false);
let orderCardInfo = reactive([]);
const orderCardTitle = ref('');
const orderCardColumn = [ { name: 'sd', label: '时段', field: 'sd', align: 'left' },
  { name: 'dfdj', label: '电费单价（元/度）', field: 'dfdj' },
  { name: 'fwfdj', label: '服务费单价（元/度）', field: 'fwfdj' },
  { name: 'dl', label: '电量（元/度）', field: 'dl' } ];
const TotalPriceStr = computed(() => {
  const { ECTaxInFee_Str = 0, SCTaxInFee_Str = 0 } = orderCardInfo;
  const extNumber = parseFloat(ECTaxInFee_Str);
  const sctNumber = parseFloat(SCTaxInFee_Str);
  const total = (extNumber + sctNumber).toFixed(2);
  return `${ ECTaxInFee_Str }(电费)+${ SCTaxInFee_Str }(服务费)=${ total }`;
});
const orderCardTableData = computed(() => {

  const { ChargeBillDetailList = [] } = orderCardInfo;
  return ChargeBillDetailList.map(item => {
    return {
      sd: item.TimeRange,
      dfdj: item.EcTaxInPrice_Str,
      fwfdj: item.ScTaxInPrice_Str,
      dl: item.Power_Str,
    };
  });
});
function showOrderCard() {

  if (!LocalVars.pile.PileID) return;
  //增加一个加载中效果 loading
  orderCardTitle.value = `上次充电订单（${ LocalVars.pile.PileName }）`;
  const filter = {
    PillID: LocalVars.pile.PileID, CustomerID: LocalVars.pile.CustomerID
  };
  sgApiPost(
    'TPS-ViewChargeList',
    { filter }
  ).then(result => {
    const { msg, data: { state, data } } = result;
    if (msg == 'success' && state == '1' && data) {
      if (data.IsNull == '1') {
        Funcs.Notify('消息', '无上次充电订单记录', 'warning');
      }
      else {
        orderCardInfo = data;
        isShowOrderCard.value = true;
      }
    }
    else {
      Funcs.Notify('消息', msg || '查看上次充电订单异常', 'warning');
    }
  });
}
function toOrderPage() {
  Funcs.OpenFasPage({
    fasAppKey: 'hhrs',
    pageMetaId: 'Page_OrderDetails',
    param: {
      OrderID: orderCardInfo.Id,
      TransactionNumber: orderCardInfo.Code,
    },
    target: 'inline',
    callback: function (res) {

    },
    passThroughData: [ 'platformtype' ],
  });
}
function sgApiPost(sid, param) {
  return new Promise((resolve) => {
    const postData = {};
    Object.entries(param).forEach(([ k, v ]) => (postData[ k ] = JSON.stringify(v)));
    TFF.common.ajax.getDataAsync({
      url: TFF.common.ajax.getServiceUrl('SaaS-CM-' + sid),
      type: 'post',
      data: postData,
    }).then((result) => {
      resolve({ msg: 'success', data: result });
    });
  });
}
onMounted(() => {
});


</script>
<style scoped>
.item {
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 12px;
    width: 25%;
}

.item img {
    width: 40px;
    height: 40px;
}

.tr-div-dialog {
    height: auto;
    overflow-y: auto;
    max-height: calc(100vh - 60px);
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
    font-size: 16px
}


.m-info .li {
    display: flex;
    padding: 10px;
    align-items: center;
}

.m-info .li .field {
    width: 120px;
}

.m-info .li .value {
    font-weight: bold;
}

.m-info .li .value .link {
    cursor: pointer;
    color: #409eff;
}

.div-link {
    cursor: pointer;
}


.item-title {
    background-color: #e1ffe6;
    color: #4dc238;
    transition: all .3s;
    cursor: pointer;
    user-select: none;
    overflow: hidden
}

.item-title:hover {
    background-color: #c1eec6;
    color: #1db248
}
</style>
