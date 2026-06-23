<template>
    <div v-show='visible'>
        <div class='tr-div-default pile piles fasr-terminals' :tabIndex='-1'>
            <div v-for='pile in localVars.Piles' :key="pile.PileID || pile.PileCode || pile.PileName"
                class='tr-div-default pile fasr-terminals__item' :tabIndex='-1'>
                <UCTerminalCard :stateType="getTerminalStateType(pile.PileState)" v-bind="getTerminalCardProps(pile)"
                    @closeCharge="refreshPileList" @openCharge="refreshPileList" />
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { toRef } from 'vue';
import UCTerminalCard from '../../fas/uicontrol/UC_TerminalCard.vue';

type TerminalLocalVars = {
  Piles: any[],
  isMaskOpen: boolean,
  isDetail: boolean,
  infoSet: any
};

const props = defineProps({
  localVars: {
    type: Object as () => TerminalLocalVars,
    required: true
  },
  visible: {
    type: Boolean,
    default: true
  },
});
const visible = toRef(props, 'visible');
const localVars = props.localVars;
const fireUCEvent = defineEmits([ 'OnFireEvent' ]);
const getTerminalCardProps = (pile) => ({
  pileData: pile,
  isShow: localVars.isMaskOpen,
  isDetail: localVars.isDetail,
  infoSet: localVars.infoSet
});
const getTerminalStateType = (pileState: number) => {
  if ([ 8, 12 ].includes(pileState)) return 'faulty';
  if (pileState === 1) return 'offGrid';
  if (pileState === 3) return 'gunsInserted';
  if (pileState === 6) return 'charging';
  if (pileState === 4) return 'chargeFull';
  if (pileState === 2) return 'free';
  return 'other';
};

function refreshPileList() {
  fireUCEvent('OnFireEvent', 'refresh');
}

</script>
<style scoped>
.fasr-terminals {
    display: flex;
    padding: 12px;
    padding-top: 0;
    border-radius: 12px;
    flex-direction: row;
    justify-content: flex-start;
    flex-wrap: wrap;
    gap: 10px;
    outline: 0 !important;
}

.fasr-terminals__item {
    outline: 0 !important;
}
</style>
