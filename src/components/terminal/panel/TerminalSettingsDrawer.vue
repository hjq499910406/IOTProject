<template>
    <t-dialog :ref='el => Widget.fieldSettingsDialog = el' style='opacity:100%' class='fasr_filedSet tr-drawer'
        instanceCode='fasr_filedSet' position='right' :tabIndex='1' :no-backdrop-dismiss='false'
        @before-show='handleBeforeShow' :maximized='true'>
        <div :ref='el => Widget["fasr_div_467b86"] = el'
            style='width:400px; height:100%;background:#FFFFFF;border-radius:0px' class='fasr_div_467b86'
            instanceCode='fasr_div_467b86'>
            <div :ref='el => Widget["fasr_div_462f73"] = el'
                style='flex-direction:row;    justify-content:space-between;    align-items:center;    display:flex;    padding-left:24px;    padding-right:24px;    padding-top:12px;    opacity:100%'
                class='fasr_div_462f73' instanceCode='fasr_div_462f73'>
                <t-label :ref='el => Widget["fasr_label_4643b6"] = el' style='    font-size:16px'
                    class='fasr_label_4643b6' :tabIndex='1' valueType='static' :showHint='true'
                    instanceCode='fasr_label_4643b6'
                    :constValue="tt('terminal.fieldSettings')">
                </t-label>
                <t-button :ref='el => Widget["fasr_button_c1342e"] = el' style='opacity:100%'
                    class='fasr_button_c1342e tr-button-icon-text2' icon='fas dx-icon icon-t-delete-01' :showHint='true'
                    :tabIndex='1' instanceCode='fasr_button_c1342e' @click='closeDrawer'>
                </t-button>
            </div>
            <div :ref='el => Widget["fasr_div_e52e6f"] = el' style='    background:#FFFFFF'
                class='fasr_div_e52e6f tr-div-drawer' instanceCode='fasr_div_e52e6f'>
                <div :ref='el => Widget["fasr_div_105027"] = el'
                    style='flex-direction:column;    flex-wrap:nowrap;    justify-content:space-between;    align-items:flex-start;    display:flex;    height:100%;    row-gap:8px;        outline:0!important'
                    class='fasr_div_105027 tr-div-default' :tabIndex='-1' instanceCode='fasr_div_105027'>
                    <div :ref='el => Widget["fasr_div_a70254"] = el'
                        style='width:100%;    flex-direction:column;    flex-wrap:nowrap;    display:flex;    row-gap:12px;        outline:0!important'
                        class='fasr_div_a70254 tr-div-default' :tabIndex='-1' instanceCode='fasr_div_a70254'>
                        <div :ref='el => Widget["fasr_div_d289dd"] = el'
                            style='padding-top:14px;    padding-bottom:14px;    padding-left:16px;    padding-right:16px;    flex-direction:column;    flex-wrap:nowrap;    display:flex;    row-gap:4px;        background:#F9F9F9;    outline:0!important'
                            class='fasr_div_d289dd' :tabIndex='-1' instanceCode='fasr_div_d289dd'>
                            <div :ref='el => Widget["fasr_div_43481e"] = el'
                                style='flex-direction:row;    flex-wrap:nowrap;    justify-content:space-between;    align-items:center;    display:flex;        outline:0!important'
                                class='fasr_div_43481e' :tabIndex='-1' instanceCode='fasr_div_43481e'>
                                <t-label :ref='el => Widget["fasr_label_ea5b77"] = el'
                                    style='    font-size:14px;    font-family:AlibabaPuHuiTi;    color:rgba(0,0,0,0.80)'
                                    class='fasr_label_ea5b77' instanceCode='fasr_label_ea5b77' valueType='static'
                                    :showHint='true' :tabIndex='1'
                                    :constValue="tt('terminal.vehicleData')">
                                </t-label>
                                <t-toggle :ref='el => Widget["fasr_toggle_782d90"] = el'
                                    style='    background:#F9F9F9' class='fasr_toggle_782d90'
                                    instanceCode='fasr_toggle_782d90'
                                    :label="tt('terminal.vehicleData')"
                                    :hideLabel='true' helpPlacement='bottom' labelPosition='top' :tabIndex='1'
                                    v-model='fieldSettings.one'>
                                </t-toggle>
                            </div>
                            <t-label :ref='el => Widget["fasr_label_23b17a"] = el'
                                style='    color:rgba(0,0,0,0.32);    font-family:AlibabaPuHuiTi;    font-size:12px;    white-space: pre-wrap'
                                class='fasr_label_23b17a' instanceCode='fasr_label_23b17a' valueType='static'
                                :showHint='true' :tabIndex='1'
                                :constValue="tt('terminal.vehicleDataDescription')">
                            </t-label>
                        </div>
                        <div :ref='el => Widget["fasr_div_d397393_Copydd"] = el'
                            style='padding-top:14px;    padding-bottom:14px;    padding-left:16px;    padding-right:16px;    flex-direction:column;    flex-wrap:nowrap;    display:flex;    row-gap:4px;        background:#F9F9F9;    outline:0!important'
                            class='fasr_div_d397393_Copydd' :tabIndex='-1' instanceCode='fasr_div_d397393_Copydd'>
                            <div :ref='el => Widget["fasr_div_675331_Copye"] = el'
                                style='flex-direction:row;    flex-wrap:nowrap;    justify-content:space-between;    align-items:center;    display:flex;        outline:0!important'
                                class='fasr_div_675331_Copye' :tabIndex='-1' instanceCode='fasr_div_675331_Copye'>
                                <t-label :ref='el => Widget["fasr_label_ea251814_Copyb251814_Copy"] = el'
                                    style='    font-size:14px;    font-family:AlibabaPuHuiTi;    color:rgba(0,0,0,0.80)'
                                    class='fasr_label_ea251814_Copyb251814_Copy'
                                    instanceCode='fasr_label_ea251814_Copyb251814_Copy' valueType='static'
                                    :showHint='true' :tabIndex='1'
                                    :constValue="tt('terminal.chargingInfo')">
                                </t-label>
                                <t-toggle :ref='el => Widget["fasr_toggle_639280_Copyd639280_Copy"] = el'
                                    style='    background:#F9F9F9'
                                    class='fasr_toggle_639280_Copyd639280_Copy'
                                    instanceCode='fasr_toggle_639280_Copyd639280_Copy'
                                    :label="tt('terminal.chargingInfo')"
                                    :hideLabel='true' helpPlacement='bottom' labelPosition='top' :tabIndex='1'
                                    v-model='fieldSettings.two'>
                                </t-toggle>
                            </div>
                            <t-label :ref='el => Widget["fasr_label_993591_Copyb993591_Copya"] = el'
                                style='    color:rgba(0,0,0,0.32);    font-family:AlibabaPuHuiTi;    font-size:12px;    white-space: pre-wrap'
                                class='fasr_label_993591_Copyb993591_Copya'
                                instanceCode='fasr_label_993591_Copyb993591_Copya' valueType='static' :showHint='true'
                                :tabIndex='1'
                                :constValue="tt('terminal.chargingInfoDescription')">
                            </t-label>
                        </div>
                        <div :ref='el => Widget["fasr_div_d924306_Copydd"] = el'
                            style='padding-top:14px;    padding-bottom:14px;    padding-left:16px;    padding-right:16px;    flex-direction:column;    flex-wrap:nowrap;    display:flex;    row-gap:4px;        background:#F9F9F9;    outline:0!important'
                            class='fasr_div_d924306_Copydd' :tabIndex='-1' instanceCode='fasr_div_d924306_Copydd'>
                            <div :ref='el => Widget["fasr_div_694030_Copye"] = el'
                                style='flex-direction:row;    flex-wrap:nowrap;    justify-content:space-between;    align-items:center;    display:flex;        outline:0!important'
                                class='fasr_div_694030_Copye' :tabIndex='-1' instanceCode='fasr_div_694030_Copye'>
                                <t-label :ref='el => Widget["fasr_label_ea328212_Copyb328212_Copy"] = el'
                                    style='    font-size:14px;    font-family:AlibabaPuHuiTi;    color:rgba(0,0,0,0.80)'
                                    class='fasr_label_ea328212_Copyb328212_Copy'
                                    instanceCode='fasr_label_ea328212_Copyb328212_Copy' valueType='static'
                                    :showHint='true' :tabIndex='1'
                                    :constValue="tt('terminal.chargingEfficiency')">
                                </t-label>
                                <t-toggle :ref='el => Widget["fasr_toggle_166575_Copyd166575_Copy"] = el'
                                    style='    background:#F9F9F9'
                                    class='fasr_toggle_166575_Copyd166575_Copy'
                                    instanceCode='fasr_toggle_166575_Copyd166575_Copy'
                                    :label="tt('terminal.chargingEfficiency')"
                                    :hideLabel='true' helpPlacement='bottom' labelPosition='top' :tabIndex='1'
                                    v-model='fieldSettings.three'>
                                </t-toggle>
                            </div>
                            <t-label :ref='el => Widget["fasr_label_914195_Copyb914195_Copya"] = el'
                                style='    color:rgba(0,0,0,0.32);    font-family:AlibabaPuHuiTi;    font-size:12px;    white-space: pre-wrap'
                                class='fasr_label_914195_Copyb914195_Copya'
                                instanceCode='fasr_label_914195_Copyb914195_Copya' valueType='static' :showHint='true'
                                :tabIndex='1'
                                :constValue="tt('terminal.chargingEfficiencyDescription')">
                            </t-label>
                        </div>
                    </div>
                    <div :ref='el => Widget["fasr_div_a785349_Copy"] = el'
                        style='width:100%;    padding-bottom:20px;    padding-right:4px;    flex-direction:row;    flex-wrap:nowrap;    justify-content:flex-end;    align-items:center;    display:flex;    column-gap:12px;        outline:0!important'
                        class='fasr_div_a785349_Copy tr-div-default' :tabIndex='-1'
                        instanceCode='fasr_div_a785349_Copy'>
                        <t-button :ref='el => Widget["fasr_button_71fced"] = el' style='opacity:100%'
                            class='fasr_button_71fced tr-button-default'
                            :label="tt('common.reset')"
                            instanceCode='fasr_button_71fced' :showHint='true' :tabIndex='1'
                            @click='resetFieldSettings'>
                        </t-button>
                        <t-button :ref='el => Widget["fasr_button_160069_Copyfced"] = el' style='opacity:100%'
                            class='fasr_button_160069_Copyfced tr-button-primary'
                            :label="tt('common.confirm')"
                            instanceCode='fasr_button_160069_Copyfced' :showHint='true' :tabIndex='1'
                            @click='confirmFieldSettings'>
                        </t-button>
                    </div>
                </div>
            </div>
        </div>
    </t-dialog>
</template>

<script setup>
import { pageText } from '../../../pages/i18n';
import { ref } from 'vue';
const tt = pageText;
const Widget = {
  fieldSettingsDialog: null,
};
window.Widget = Widget;
function handleBeforeShow() {
  if (!window.isPC()) {
    Widget.fieldSettingsDialog.position = 'bottom';
  }
}
const fieldSettings = ref({
  'one': false,
  'two': false,
  'three': false,
  'isDetail': false,
  'oneOld': false,
  'twoOld': false,
  'threeOld': false,
});
function closeDrawer() {
  fieldSettings.value.one = fieldSettings.value.oneOld;
  fieldSettings.value.two = fieldSettings.value.twoOld;
  fieldSettings.value.three = fieldSettings.value.threeOld;

  Widget.fieldSettingsDialog.closeDialog();
}

function resetFieldSettings() {
  fieldSettings.value.one = fieldSettings.value.oneOld;
  fieldSettings.value.two = fieldSettings.value.twoOld;
  fieldSettings.value.three = fieldSettings.value.threeOld;
}

const emit = defineEmits([ 'updateskillsmp' ]);
function confirmFieldSettings() {
  fieldSettings.value.oneOld = fieldSettings.value.one;
  fieldSettings.value.twoOld = fieldSettings.value.two;
  fieldSettings.value.threeOld = fieldSettings.value.three;
  Funcs.SetUserProfile({ Key: 'Saas_Sta', DynamicKey: 'PileFieldSet' }, JSON.stringify({
    one: fieldSettings.value.one,
    two: fieldSettings.value.two,
    three: fieldSettings.value.three,
    isDetail: fieldSettings.value.isDetail
  }));

  Widget.fieldSettingsDialog.closeDialog();
  emit('updateskillsmp', fieldSettings.value);
}

const openDrawer = (value) => {
  if (value) {
    fieldSettings.value.one = value.one;
    fieldSettings.value.two = value.two;
    fieldSettings.value.three = value.three;
    fieldSettings.value.isDetail = !!value.isDetail;
    fieldSettings.value.oneOld = value.oneOld;
    fieldSettings.value.twoOld = value.twoOld;
    fieldSettings.value.threeOld = value.threeOld;
  }
  Widget.fieldSettingsDialog.showDialog();
};
defineExpose({
  openDrawer
});
</script>

<style></style>
