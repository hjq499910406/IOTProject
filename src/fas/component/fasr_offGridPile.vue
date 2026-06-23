<template>
    <div v-show='mappingProps && mappingProps.visible'>
        <div :ref='el => Widget["fasr_div_625153_Copydc625153_Copy"] = el' v-show="!LocalVars.isDetail"
            style='flex-direction:column;  position: relative;   flex-wrap:nowrap;    display:flex;  padding-bottom:16px;  padding-top:16px;  width:100%;    row-gap:16px;        border-color:#e0e0e0;      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);  border-style:solid;    border-top-width:1px;    border-left-width:1px;    border-right-width:1px;    border-bottom-width:1px;    border-radius:8px;    outline:0!important'
            class='fasr_div_625153_Copydc625153_Copy tr-div-default' :tabIndex='-1'
            instanceCode='fasr_div_625153_Copydc625153_Copy' @mouseover.stop='iconOver' @mouseleave='iconLeave'
            @click.stop='iconClick'>


            <div :ref='el => Widget["fasr_div_a625299_Copyaff625299_Copy"] = el'
                style='flex-direction:column;    flex-wrap:nowrap;    justify-content:flex-start;      display:flex; gap:12px;'
                class='fasr_div_a625299_Copyaff625299_Copy' :tabIndex='-1'
                instanceCode='fasr_div_a625299_Copyaff625299_Copy'>
                <div>
                    <span
                        style="padding: 2px 4px;border-radius: 4px;background: #F0F2F5;color: rgba(0, 0, 0, 0.80);font-size: 12px;margin-left: 10px;margin-right: 8px;">离网</span>
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
                            <rect width="42" height="42" rx="21" fill="#F0F2F5" />
                            <path d="M17.325 29.0324L18.8265 25.4414H15.624L20.9055 20.3594L19.4355 23.8874H22.386L17.325 29.0324ZM15.771 13.5134C15.771 13.0514 16.17 12.6734 16.6635 12.6734H21.672C22.1655 12.6734 22.5645 13.0514 22.5645 13.5134V18.2069C22.5645 18.6689 22.1655 19.0469 21.672 19.0469H16.653C16.1595 19.0469 15.7605 18.6689 15.7605 18.2069C15.771 18.2069 15.771 13.5134 15.771 13.5134ZM29.316 14.7944C28.644 14.2274 27.51 13.2929 27.174 12.9674C26.985 12.7889 26.5335 12.6734 26.2395 12.9674C25.9455 13.2509 26.082 13.6184 26.292 13.8074C26.5965 14.0804 27.258 14.6054 27.6465 14.9939C27.3315 15.3614 26.796 15.7499 26.4705 16.0964C26.4285 16.1384 26.4285 16.1909 26.4285 16.2119C26.4285 16.4114 26.439 16.5374 26.439 16.6214C26.439 16.6949 26.5335 16.7264 26.565 16.7264H28.2345C28.3395 16.7264 28.371 16.8314 28.371 16.8314V26.9219C28.371 27.4889 28.0455 27.6569 27.7095 27.6569C27.3735 27.6569 27.0165 27.4784 27.0165 26.9219V18.6794C27.0165 17.9339 26.922 17.5874 26.0295 17.5559C25.809 17.5454 24.927 17.5559 24.444 17.5559V12.2849C24.444 11.5919 23.8455 11.0249 23.1105 11.0249H15.0045C14.2695 11.0249 13.671 11.5814 13.671 12.2849V29.1584H12.9045C12.6 29.1584 12.3585 29.3894 12.3585 29.6729V30.4289C12.3585 30.7229 12.6105 30.9644 12.9045 30.9644H25.179C25.473 30.9644 25.725 30.7019 25.725 30.4289V29.6729C25.725 29.3789 25.473 29.1584 25.179 29.1584H24.444V18.7529H25.3575C25.683 18.7529 25.7145 19.0574 25.7145 19.0574V27.0059C25.7145 29.0324 27.4995 29.0534 27.699 29.0534C27.972 29.0534 29.6415 29.0534 29.6415 27.0269V15.3614C29.652 15.3614 29.6625 15.0884 29.316 14.7944Z" fill="#6F7173"/>
                        </svg>

                    </div>
                    <div :ref='el => Widget["fasr_div_aca399422_Copybc"] = el'
                        style='flex-direction:column;    flex-wrap:nowrap; max-width: calc(100% - 77px);   display:flex;    row-gap:4px;        outline:0!important;    flex-grow: 1'
                        class='fasr_div_aca399422_Copybc tr-div-default' :tabIndex='-1'
                        instanceCode='fasr_div_aca399422_Copybc'>
                        <div :ref='el => Widget["fasr_div_935156_Copye"] = el'
                            style='flex-direction:row;    flex-wrap:nowrap;    justify-content:space-between; gap: 4px;        align-items:center;    display:flex;        outline:0!important'
                            class='fasr_div_935156_Copye tr-div-default' :tabIndex='-1'
                            instanceCode='fasr_div_935156_Copye'>
                            <div :ref='el => Widget["fasr_div_611325_Copye611325_Copy"] = el'
                                v-if='LocalVars.pile.OffTime != "无"'
                                style='flex-direction:row;    flex-wrap:nowrap;    justify-content:flex-start;    align-items:center;    display:flex;    padding-top:1px;    padding-bottom:1px;        background:linear-gradient(90deg, rgba(253, 32, 32, 0.4) 0%, rgba(253, 32, 32, 0) 100%);    border-top-left-radius:6px;    border-bottom-left-radius:6px;    outline:0!important'
                                class='fasr_div_611325_Copye611325_Copy tr-div-default' :tabIndex='-1'
                                instanceCode='fasr_div_611325_Copye611325_Copy'>
                                <div :ref='el => Widget["fasr_div_730769_Copyab730769_Copyc730769_Copy"] = el'
                                    style='padding-right:4px;    flex-direction:row;    flex-wrap:nowrap;    justify-content:flex-start;    align-items:center;    display:flex;    height:17px;        background:#FFF0EF;    border-top-left-radius:6px;    border-bottom-left-radius:6px;    gap: 4px'
                                    class='fasr_div_730769_Copyab730769_Copyc730769_Copy' :tabIndex='-1'
                                    instanceCode='fasr_div_730769_Copyab730769_Copyc730769_Copy'>
                                    <div :ref='el => Widget["fasr_div_ebf700845_Copyb700845_Copy"] = el'
                                        style='width:17px;    height:17px;    flex-direction:row;    flex-wrap:nowrap;    justify-content:center;    align-items:center;    display:flex;        background:linear-gradient(180deg, #FD2020 0%, #FFAF62 100%);    border-radius:6px;    outline:0!important'
                                        class='fasr_div_ebf700845_Copyb700845_Copy tr-div-default' :tabIndex='-1'
                                        instanceCode='fasr_div_ebf700845_Copyb700845_Copy'>
                                        <t-icon :ref='el => Widget["fasr_icon_226914_Copyd226914_Copyee"] = el'
                                            style='opacity:100%'
                                            class='fasr_icon_226914_Copyd226914_Copyee tr-icon-default'
                                            instanceCode='fasr_icon_226914_Copyd226914_Copyee' size='12px'
                                            color='#FFFFFF' :tabIndex='1' name='fas dx-icon icon-t-wifi'>
                                        </t-icon>
                                    </div>
                                    <t-label :ref='el => Widget["fasr_label_127338_Copye127338_Copyfa127338_Copy"] = el'
                                        style='font-family:AlibabaPuHuiTi;    font-weight:400;    font-size:12px;    line-height:100%;    letter-spacing:0px;    color:rgba(0,0,0,0.80)'
                                        class='fasr_label_127338_Copye127338_Copyfa127338_Copy tr-lable-keyindicatorsname'
                                        instanceCode='fasr_label_127338_Copye127338_Copyfa127338_Copy'
                                        valueType='expression' :showHint='true' :tabIndex='1'
                                        :labelValue="LocalVars.pile.OffTime + ' 离网'">
                                    </t-label>
                                </div>
                            </div>
                        </div>
                        <div :ref='el => Widget["fasr_div_2fd05e"] = el'
                            style='flex-direction:row;    flex-wrap:nowrap;    justify-content:flex-start;    align-items:center;    display:flex;        outline:0!important'
                            class='fasr_div_2fd05e tr-div-default' :tabIndex='-1' instanceCode='fasr_div_2fd05e'>
                            <div :ref='el => Widget["fasr_div_868038_Copye"] = el'
                                style='flex-direction:row;    flex-wrap:nowrap;    justify-content:flex-start;    align-items:center;    display:flex;        outline:0!important;    flex-grow: 1'
                                class='fasr_div_868038_Copye tr-div-default' :tabIndex='-1'
                                instanceCode='fasr_div_868038_Copye'>
                                <div :ref='el => Widget["fasr_div_efb244848_Copy"] = el'
                                    style='padding-top:2px;    padding-bottom:2px;    padding-left:6px;    padding-right:6px;    flex-direction:row;    flex-wrap:nowrap;    justify-content:center;    align-items:center;    display:flex;        border-color:#E4E5E7;    border-style:solid;    border-top-width:1px;    border-left-width:1px;    border-right-width:1px;    border-bottom-width:1px;    border-radius:8px;    outline:0!important'
                                    class='fasr_div_efb244848_Copy tr-div-default' :tabIndex='-1'
                                    instanceCode='fasr_div_efb244848_Copy'>
                                    <t-label :ref='el => Widget["fasr_label_465909_Copycf465909_Copy"] = el'
                                        style='font-family:AlibabaPuHuiTi;    font-weight:500;    font-size:11px;    line-height:100%;    letter-spacing:0px;    color:#6F7173;    vertical-align: middle'
                                        class='fasr_label_465909_Copycf465909_Copy'
                                        instanceCode='fasr_label_465909_Copycf465909_Copy' valueType='expression'
                                        :showHint='true' :tabIndex='1' :labelValue="LocalVars.pile.ChargingName">
                                    </t-label>
                                </div>
                            </div>
                            <div class="item-title" v-if='LocalVars.pile.PileID' @click="showOrderCard"
                                style="position:absolute; top:0px; right:0px;    width: 28px;height: 28px; border-top-right-radius: 14px;border-bottom-left-radius: 50px;display: flex;justify-content: center;">
                                <i class="i-link" style="font-style: normal; padding-left: 4px;">订</i>
                            </div>
                        </div>

                        <div :ref='el => Widget["fasr_div_511973_Copye"] = el'
                            style='flex-direction:row;    flex-wrap:nowrap;  max-width: 220px; gap:4px; justify-content:flex-start;    align-items:center;    display:flex;        outline:0!important'
                            class='fasr_div_511973_Copye tr-div-default' :tabIndex='-1'
                            instanceCode='fasr_div_511973_Copye'>
                            <t-label :ref='el => Widget["fasr_label_e892693_Copy"] = el'
                                style='    font-family:AlibabaPuHuiTi;    font-size:12px;    color:#FD2020'
                                class='fasr_label_e892693_Copy' instanceCode='fasr_label_e892693_Copy'
                                valueType='static' :showHint='true' :tabIndex='1'
                                :constValue="$t('Schema.Page.UCOffGridTerminals.Controls.fasr_label_e892693_Copy.ConstValue', '离网时长:')">
                            </t-label>
                            <t-label :ref='el => Widget["fasr_label_e973404_Copy"] = el'
                                style='    font-family:AlibabaPuHuiTi;    font-size:12px;    color:rgba(0,0,0,0.80)'
                                class='fasr_label_e973404_Copy' instanceCode='fasr_label_e973404_Copy'
                                valueType='expression' :showHint='true' :tabIndex='1'
                                :labelValue="LocalVars.pile.OffLength">
                            </t-label>

                        </div>
                    </div>
                </div>

            </div>
            <div :ref='el => Widget["fasr_div_740147_Copye740147_Copyab"] = el'
                style='padding-left:10px;    padding-right:10px;    flex-direction:row;  height:26px;  flex-wrap:nowrap;    display:flex;    column-gap:10px;        outline:0!important'
                class='fasr_div_740147_Copye740147_Copyab tr-div-default' :tabIndex='-1'
                instanceCode='fasr_div_740147_Copye740147_Copyab'>

            </div>
        </div>

        <div :ref='el => Widget["fasr_div_7dc379"] = el' v-show="LocalVars.isDetail"
            style='flex-direction:column; position: relative;    flex-wrap:nowrap;  padding-top:16px;  display:flex;  height:100% ;  min-height:240px; width:100%;    row-gap:16px;    padding-bottom:16px;        border-color:#e0e0e0;     box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);   border-style:solid;    border-top-width:1px;    border-left-width:1px;    border-right-width:1px;    border-bottom-width:1px;    border-radius:8px;    outline:0!important'
            class='fasr_div_7dc379 tr-div-default' :tabIndex='-1' instanceCode='fasr_div_7dc379'>
            <div :ref='el => Widget["fasr_div_a625299_Copyaff625299_Copy"] = el'
                style='flex-direction:column;    flex-wrap:nowrap;    justify-content:flex-start;      display:flex; gap:12px;'
                class='fasr_div_a625299_Copyaff625299_Copy' :tabIndex='-1'
                instanceCode='fasr_div_a625299_Copyaff625299_Copy'>
                <div>
                    <span
                        style="padding: 2px 4px;border-radius: 4px;background: #F0F2F5;color: rgba(0, 0, 0, 0.80);font-size: 12px;margin-left: 10px;margin-right: 8px;">离网</span>
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
                            <rect width="42" height="42" rx="21" fill="#F0F2F5" />
                            <path d="M17.325 29.0324L18.8265 25.4414H15.624L20.9055 20.3594L19.4355 23.8874H22.386L17.325 29.0324ZM15.771 13.5134C15.771 13.0514 16.17 12.6734 16.6635 12.6734H21.672C22.1655 12.6734 22.5645 13.0514 22.5645 13.5134V18.2069C22.5645 18.6689 22.1655 19.0469 21.672 19.0469H16.653C16.1595 19.0469 15.7605 18.6689 15.7605 18.2069C15.771 18.2069 15.771 13.5134 15.771 13.5134ZM29.316 14.7944C28.644 14.2274 27.51 13.2929 27.174 12.9674C26.985 12.7889 26.5335 12.6734 26.2395 12.9674C25.9455 13.2509 26.082 13.6184 26.292 13.8074C26.5965 14.0804 27.258 14.6054 27.6465 14.9939C27.3315 15.3614 26.796 15.7499 26.4705 16.0964C26.4285 16.1384 26.4285 16.1909 26.4285 16.2119C26.4285 16.4114 26.439 16.5374 26.439 16.6214C26.439 16.6949 26.5335 16.7264 26.565 16.7264H28.2345C28.3395 16.7264 28.371 16.8314 28.371 16.8314V26.9219C28.371 27.4889 28.0455 27.6569 27.7095 27.6569C27.3735 27.6569 27.0165 27.4784 27.0165 26.9219V18.6794C27.0165 17.9339 26.922 17.5874 26.0295 17.5559C25.809 17.5454 24.927 17.5559 24.444 17.5559V12.2849C24.444 11.5919 23.8455 11.0249 23.1105 11.0249H15.0045C14.2695 11.0249 13.671 11.5814 13.671 12.2849V29.1584H12.9045C12.6 29.1584 12.3585 29.3894 12.3585 29.6729V30.4289C12.3585 30.7229 12.6105 30.9644 12.9045 30.9644H25.179C25.473 30.9644 25.725 30.7019 25.725 30.4289V29.6729C25.725 29.3789 25.473 29.1584 25.179 29.1584H24.444V18.7529H25.3575C25.683 18.7529 25.7145 19.0574 25.7145 19.0574V27.0059C25.7145 29.0324 27.4995 29.0534 27.699 29.0534C27.972 29.0534 29.6415 29.0534 29.6415 27.0269V15.3614C29.652 15.3614 29.6625 15.0884 29.316 14.7944Z" fill="#6F7173"/>
                        </svg>

                    </div>
                    <div :ref='el => Widget["fasr_div_aca399422_Copybc"] = el'
                        style='flex-direction:column;    flex-wrap:nowrap; max-width: calc(100% - 77px);   display:flex;    row-gap:4px;        outline:0!important;    flex-grow: 1'
                        class='fasr_div_aca399422_Copybc tr-div-default' :tabIndex='-1'
                        instanceCode='fasr_div_aca399422_Copybc'>
                        <div :ref='el => Widget["fasr_div_935156_Copye"] = el'
                            style='flex-direction:row;    flex-wrap:nowrap;    justify-content:space-between; gap: 4px;        align-items:center;    display:flex;        outline:0!important'
                            class='fasr_div_935156_Copye tr-div-default' :tabIndex='-1'
                            instanceCode='fasr_div_935156_Copye'>
                            <div :ref='el => Widget["fasr_div_611325_Copye611325_Copy"] = el'
                                v-if='LocalVars.pile.OffTime != "无"'
                                style='flex-direction:row;    flex-wrap:nowrap;    justify-content:flex-start;    align-items:center;    display:flex;    padding-top:1px;    padding-bottom:1px;        background:linear-gradient(90deg, rgba(253, 32, 32, 0.4) 0%, rgba(253, 32, 32, 0) 100%);    border-top-left-radius:6px;    border-bottom-left-radius:6px;    outline:0!important'
                                class='fasr_div_611325_Copye611325_Copy tr-div-default' :tabIndex='-1'
                                instanceCode='fasr_div_611325_Copye611325_Copy'>
                                <div :ref='el => Widget["fasr_div_730769_Copyab730769_Copyc730769_Copy"] = el'
                                    style='padding-right:4px;    flex-direction:row;    flex-wrap:nowrap;    justify-content:flex-start;    align-items:center;    display:flex;    height:17px;        background:#FFF0EF;    border-top-left-radius:6px;    border-bottom-left-radius:6px;    gap: 4px'
                                    class='fasr_div_730769_Copyab730769_Copyc730769_Copy' :tabIndex='-1'
                                    instanceCode='fasr_div_730769_Copyab730769_Copyc730769_Copy'>
                                    <div :ref='el => Widget["fasr_div_ebf700845_Copyb700845_Copy"] = el'
                                        style='width:17px;    height:17px;    flex-direction:row;    flex-wrap:nowrap;    justify-content:center;    align-items:center;    display:flex;        background:linear-gradient(180deg, #FD2020 0%, #FFAF62 100%);    border-radius:6px;    outline:0!important'
                                        class='fasr_div_ebf700845_Copyb700845_Copy tr-div-default' :tabIndex='-1'
                                        instanceCode='fasr_div_ebf700845_Copyb700845_Copy'>
                                        <t-icon :ref='el => Widget["fasr_icon_226914_Copyd226914_Copyee"] = el'
                                            style='opacity:100%'
                                            class='fasr_icon_226914_Copyd226914_Copyee tr-icon-default'
                                            instanceCode='fasr_icon_226914_Copyd226914_Copyee' size='12px'
                                            color='#FFFFFF' :tabIndex='1' name='fas dx-icon icon-t-wifi'>
                                        </t-icon>
                                    </div>
                                    <t-label :ref='el => Widget["fasr_label_127338_Copye127338_Copyfa127338_Copy"] = el'
                                        style='font-family:AlibabaPuHuiTi;    font-weight:400;    font-size:12px;    line-height:100%;    letter-spacing:0px;    color:rgba(0,0,0,0.80)'
                                        class='fasr_label_127338_Copye127338_Copyfa127338_Copy tr-lable-keyindicatorsname'
                                        instanceCode='fasr_label_127338_Copye127338_Copyfa127338_Copy'
                                        valueType='expression' :showHint='true' :tabIndex='1'
                                        :labelValue="LocalVars.pile.OffTime + ' 离网'">
                                    </t-label>
                                </div>
                            </div>
                        </div>
                        <div :ref='el => Widget["fasr_div_2fd05e"] = el'
                            style='flex-direction:row;    flex-wrap:nowrap;    justify-content:flex-start;    align-items:center;    display:flex;        outline:0!important'
                            class='fasr_div_2fd05e tr-div-default' :tabIndex='-1' instanceCode='fasr_div_2fd05e'>
                            <div :ref='el => Widget["fasr_div_868038_Copye"] = el'
                                style='flex-direction:row;    flex-wrap:nowrap;    justify-content:flex-start;    align-items:center;    display:flex;        outline:0!important;    flex-grow: 1'
                                class='fasr_div_868038_Copye tr-div-default' :tabIndex='-1'
                                instanceCode='fasr_div_868038_Copye'>
                                <div :ref='el => Widget["fasr_div_efb244848_Copy"] = el'
                                    style='padding-top:2px;    padding-bottom:2px;    padding-left:6px;    padding-right:6px;    flex-direction:row;    flex-wrap:nowrap;    justify-content:center;    align-items:center;    display:flex;        border-color:#E4E5E7;    border-style:solid;    border-top-width:1px;    border-left-width:1px;    border-right-width:1px;    border-bottom-width:1px;    border-radius:8px;    outline:0!important'
                                    class='fasr_div_efb244848_Copy tr-div-default' :tabIndex='-1'
                                    instanceCode='fasr_div_efb244848_Copy'>
                                    <t-label :ref='el => Widget["fasr_label_465909_Copycf465909_Copy"] = el'
                                        style='font-family:AlibabaPuHuiTi;    font-weight:500;    font-size:11px;    line-height:100%;    letter-spacing:0px;    color:#6F7173;    vertical-align: middle'
                                        class='fasr_label_465909_Copycf465909_Copy'
                                        instanceCode='fasr_label_465909_Copycf465909_Copy' valueType='expression'
                                        :showHint='true' :tabIndex='1' :labelValue="LocalVars.pile.ChargingName">
                                    </t-label>
                                </div>
                            </div>
                            <div class="item-title" v-if='LocalVars.pile.PileID' @click="showOrderCard"
                                style="position:absolute; top:0px; right:0px;    width: 28px;height: 28px; border-top-right-radius: 14px;border-bottom-left-radius: 50px;display: flex;justify-content: center;">
                                <i class="i-link" style="font-style: normal; padding-left: 4px;">订</i>
                            </div>
                        </div>

                        <div :ref='el => Widget["fasr_div_511973_Copye"] = el'
                            style='flex-direction:row;    flex-wrap:nowrap;  max-width: 220px; gap:4px; justify-content:flex-start;    align-items:center;    display:flex;        outline:0!important'
                            class='fasr_div_511973_Copye tr-div-default' :tabIndex='-1'
                            instanceCode='fasr_div_511973_Copye'>
                            <t-label :ref='el => Widget["fasr_label_e892693_Copy"] = el'
                                style='    font-family:AlibabaPuHuiTi;    font-size:12px;    color:#FD2020'
                                class='fasr_label_e892693_Copy' instanceCode='fasr_label_e892693_Copy'
                                valueType='static' :showHint='true' :tabIndex='1'
                                :constValue="$t('Schema.Page.UCOffGridTerminals.Controls.fasr_label_e892693_Copy.ConstValue', '离网时长:')">
                            </t-label>
                            <t-label :ref='el => Widget["fasr_label_e973404_Copy"] = el'
                                style='    font-family:AlibabaPuHuiTi;    font-size:12px;    color:rgba(0,0,0,0.80)'
                                class='fasr_label_e973404_Copy' instanceCode='fasr_label_e973404_Copy'
                                valueType='expression' :showHint='true' :tabIndex='1'
                                :labelValue="LocalVars.pile.OffLength">
                            </t-label>

                        </div>
                    </div>
                </div>

            </div>
            <t-separator :ref='el => Widget["fasr_separator_331869"] = el' style='margin: 0px 12px;      opacity:100%'
                class='fasr_separator_331869' instanceCode='fasr_separator_331869' size='1px' spaced='8px'
                color='rgba(150, 150, 150, 0.15)' :tabIndex='1'>
            </t-separator>
            <div :ref='el => Widget["fasr_div_79e6ab"] = el'
                style='padding-left:10px;    padding-right:10px; flex-grow:1;   flex-direction:column;    flex-wrap:nowrap;    justify-content:flex-start;    align-items:flex-start;    display:flex;    row-gap:8px;        outline:0!important'
                class='fasr_div_79e6ab tr-div-default' :tabIndex='-1' instanceCode='fasr_div_79e6ab'>
                <div :ref='el => Widget["fasr_div_a7813d"] = el'
                    style='flex-direction:row;    flex-wrap:nowrap;    justify-content:flex-start;    align-items:flex-start;    display:flex;    column-gap:4px;        outline:0!important'
                    class='fasr_div_a7813d tr-div-default' :tabIndex='-1' instanceCode='fasr_div_a7813d'>
                    <t-label :ref='el => Widget["fasr_label_e314381_Copy"] = el'
                        style='    font-family:AlibabaPuHuiTi;    font-size:12px;    color:#FD2020'
                        class='fasr_label_e314381_Copy' instanceCode='fasr_label_e314381_Copy' valueType='static'
                        :showHint='true' :tabIndex='1'
                        :constValue="$t('Schema.Page.UCOffGridTerminals.Controls.fasr_label_e314381_Copy.ConstValue', '离网时间:')">
                    </t-label>
                    <t-label :ref='el => Widget["fasr_label_e60340"] = el'
                        style='    font-family:AlibabaPuHuiTi;    font-size:12px;    color:rgba(0,0,0,0.80)'
                        class='fasr_label_e60340' instanceCode='fasr_label_e60340' valueType='expression'
                        :showHint='true' :tabIndex='1' :labelValue="LocalVars.pile.OffTime">
                    </t-label>
                </div>
                <!--<div :ref='el=>Widget["fasr_div_a733947_Copyd"]=el'
      style='flex-direction:row;    flex-wrap:nowrap;    justify-content:flex-start;    align-items:flex-start;    display:flex;    column-gap:4px;        outline:0!important'
      class='fasr_div_a733947_Copyd tr-div-default' :tabIndex='-1' instanceCode='fasr_div_a733947_Copyd'>
      <t-label :ref='el=>Widget["fasr_label_e892693_Copy"]=el'
        style='    font-family:AlibabaPuHuiTi;    font-size:12px;    color:#FD2020'
        class='fasr_label_e892693_Copy' instanceCode='fasr_label_e892693_Copy' valueType='static' :showHint='true'
        :tabIndex='1'
        :constValue="$t('Schema.Page.UCOffGridTerminals.Controls.fasr_label_e892693_Copy.ConstValue','离网时长:')">
      </t-label>
      <t-label :ref='el=>Widget["fasr_label_e973404_Copy"]=el'
        style='    font-family:AlibabaPuHuiTi;    font-size:12px;    color:rgba(0,0,0,0.80)'
        class='fasr_label_e973404_Copy' instanceCode='fasr_label_e973404_Copy' valueType='expression' :showHint='true'
        :tabIndex='1' :labelValue="LocalVars.pile.OffLength">
      </t-label>
    </div>
    <div :ref='el=>Widget["fasr_div_a672000_Copyd"]=el'
      style='flex-direction:row;    flex-wrap:nowrap;    justify-content:flex-start;    align-items:flex-start;    display:flex;   column-gap:4px;        outline:0!important'
      class='fasr_div_a672000_Copyd tr-div-default' :tabIndex='-1' instanceCode='fasr_div_a672000_Copyd'>
      <t-label :ref='el=>Widget["fasr_label_e536747_Copy"]=el'
        style='    font-family:AlibabaPuHuiTi;    font-size:12px;    color:#FD2020'
        class='fasr_label_e536747_Copy' instanceCode='fasr_label_e536747_Copy' valueType='static' :showHint='true'
        :tabIndex='1'
        :constValue="$t('Schema.Page.UCOffGridTerminals.Controls.fasr_label_e536747_Copy.ConstValue','离网率(近3天):')">
      </t-label>
      <t-label :ref='el=>Widget["fasr_label_e368478_Copy"]=el'
        style='    font-family:AlibabaPuHuiTi;    font-size:12px;    color:rgba(0,0,0,0.80)'
        class='fasr_label_e368478_Copy' instanceCode='fasr_label_e368478_Copy' valueType='expression' :showHint='true'
        :tabIndex='1' :labelValue="LocalVars.pile.OffRate">
      </t-label>
    </div>-->
            </div>
            <div :ref='el => Widget["fasr_div_740147_Copye740147_Copyab"] = el'
                style='padding-left:10px;    padding-right:10px;    flex-direction:row; height:26px;   flex-wrap:nowrap;    display:flex;    column-gap:10px;        outline:0!important'
                class='fasr_div_740147_Copye740147_Copyab tr-div-default' :tabIndex='-1'
                instanceCode='fasr_div_740147_Copye740147_Copyab'>
                
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
const items = [
  {
    'img': 'https://img0.baidu.com/it/u=362467126,841212354&fm=253&fmt=auto&app=120&f=JPEG?w=200&h=200',
    'label': '工单列表'
  },
  {
    'img': 'https://img0.baidu.com/it/u=362467126,841212354&fm=253&fmt=auto&app=120&f=JPEG?w=200&h=200',
    'label': '待我处理'
  },
  {
    'img': 'https://img0.baidu.com/it/u=362467126,841212354&fm=253&fmt=auto&app=120&f=JPEG?w=200&h=200',
    'label': '施工单位'
  },
  {
    'img': 'https://img0.baidu.com/it/u=362467126,841212354&fm=253&fmt=auto&app=120&f=JPEG?w=200&h=200',
    'label': '统计分析'
  },
  {
    'img': 'https://img0.baidu.com/it/u=362467126,841212354&fm=253&fmt=auto&app=120&f=JPEG?w=200&h=200',
    'label': '我的关注'
  }
];

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
const Widget = {
  FireUCEvent: fireUCEvent
};
const openMenu = ref(false);
const flag = ref(false);
function click(item) {
  console.log(item);
}
function iconOver() {
  if (isPC)
    openMenu.value = true;
}
function iconClick() {
  //这里
  openMenu.value = true;
}
function iconLeave() {
  setTimeout(() => {
    if (!flag.value) {
      openMenu.value = false;
    }
  });
}
function menuStyle() {
  if (window.isPC()) {
    return {
      padding: '12px 16px'
    };
  }
  else {
    return {
      padding: '8px 16px'
    };
  }
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
