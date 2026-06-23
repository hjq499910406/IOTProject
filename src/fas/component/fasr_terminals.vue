<template>
    <div v-show='mappingProps && mappingProps.visible'>
        <div style=' display:flex;padding: 12px;padding-top: 0; border-radius: 12px; flex-direction:row;  justify-content:flex-start;  flex-wrap:wrap;  gap:10px;       outline:0!important'
            class='tr-div-default pile piles' :tabIndex='-1'>
            <div v-for='pile in LocalVars.Piles' style='    outline:0!important' class='tr-div-default pile'
                :tabIndex='-1'>
                <component :is="getpageName(pile.PileState)" :PileData="pile" :isShow="LocalVars.isMaskOpen"
                    :isDetail="LocalVars.isDetail" :infoSet="LocalVars.infoSet" @closeCharge="refreshPileList"
                    @openCharge="refreshPileList"></component>

            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { DataQueryClass } from '../models/DataQueryClass';
import { DataQueryClassAsync } from '../models/DataQueryClassAsync';
import { ActionClass } from '../models/ActionClass';
import { ActionClassAsync } from '../models/ActionClassAsync';
import '../action/Action_GetStaPiles.ts';
import '../action/Action_GetStaAndPileCount.ts';
import '../action/Action_GetPowerCharingAbnormalData.ts';
const DataQuery = new DataQueryClass();
DataQuery.Promise = new DataQueryClassAsync();
const Action = new ActionClass();
Action.Promise = new ActionClassAsync();


import { ref, onMounted, reactive, toRefs, watch } from 'vue';
import UC_FaultyTerminal from '../../fas/uicontrol/UC_FaultyTerminal/UC_FaultyTerminal.vue';
import UC_OffGridTerminal from '../../fas/uicontrol/UC_OffGridTerminal/UC_OffGridTerminal.vue';
import UC_GunsInsertedTerminal from '../../fas/uicontrol/UC_GunsInsertedTerminal/UC_GunsInsertedTerminal.vue';  //
import UC_ChargingTerminal from '../../fas/uicontrol/UC_ChargingTerminal/UC_ChargingTerminal.vue';
import UC_ChargeFullTerminal from '../../fas/uicontrol/UC_ChargeFullTerminal/UC_ChargeFullTerminal.vue';
import UC_FreeTerminal from '../../fas/uicontrol/UC_FreeTerminal/UC_FreeTerminal.vue';
import UC_OtherTerminal from '../../fas/uicontrol/UC_OtherTerminal/UC_OtherTerminal.vue';

const UCControl = {
  8: UC_FaultyTerminal,//故障
  12: UC_FaultyTerminal,//故障
  1: UC_OffGridTerminal,//离网        1
  3: UC_GunsInsertedTerminal,//插枪   1
  6: UC_ChargingTerminal,//充电中  
  4: UC_ChargeFullTerminal,//充满   4
  2: UC_FreeTerminal,//空闲   
  5: UC_OtherTerminal,//其他   
};
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


function getpageName(varName) {
  return UCControl[ varName ] ? UCControl[ varName ] : UC_OtherTerminal;
}
function refreshPileList() {
  Widget.FireUCEvent('OnFireEvent', 'refresh');
}
function click(item) {
  console.log(item);
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
</style>
