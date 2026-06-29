<template>
    <div class="tr-div-default monitorDiv" style="min-height: calc(100vh - 200px);">
        <t-label :ref="el => Widget['fasr_label_540f81'] = el" style="opacity:100%"
            class="fasr_label_540f81 tr-lable-keyindicatorsname" instanceCode="fasr_label_540f81" valueType="static"
            :showHint="true" :tabIndex="1" :constValue="tt('device.list', '设备列表')">
        </t-label>
        <div v-if="photoList.length == 0 || (photoList.length > 0 && independentItems.length == 0 && parentDevices.length == 0)" style="text-align: center;margin: 20px 0px;width: 100%;">{{ tt('common.noRecords', '无记录') }}</div>
        <div :ref="el => Widget['fasr_div_8c6106'] = el" style="    outline:0!important;"
            class="fasr_div_8c6106 tr-div-default" :tabIndex="-1" instanceCode="fasr_div_8c6106" v-if="photoList.length > 0 && independentItems.length > 0">
            <div v-if="independentItems.length > 0" class="photoDivChange">
                <div v-for="item in independentItems" style="display: inline-block;">
                    <div class="deviceViewCont">
                        <div class="deviceCardNew">
                            <div class="deviceCardContentNew">
                                <div class="deviceCardStatusCircle circleState"
                                    :class="item.NetState == 1 ? 'greenColor' : item.NetState == 2 ? 'redColor' : 'grayColor'">
                                    {{ netStateMap[item.NetState] }}
                                </div>
                                <div style="width: 100%;">
                                    <div class="deviceCardPhotoTitleRow">
                                        <span class="deviceCardTitleText titleBold">{{ item.DeviceName }}</span>
                                        <span @click.stop="openDetail(item)" class="detail-icon" :title="tt('common.viewDetails', '查看详情')">
                                            详情
                                            <t-icon style="opacity:100%" class="lockIcon tr-icon-default"
                                                instanceCode="lockIcon" size="12px" :tabIndex="1"
                                                name="fas dx-icon icon-t-arrow-right-thin">
                                            </t-icon>
                                        </span>
                                    </div>
                                    <div class="deviceCardTimeStamp">
                                        更新时间: {{ item.LastModifyTime ? item.LastModifyTime.replace('T', ' ') : '' }}
                                    </div>
                                </div>
                            </div>
                            <div class="deviceBtn">
                                <t-button :ref="el => Widget['fasr_button_ed5180'] = el" style="flex: 2;"
                                    class="fasr_button_ed5180 tr-button-default fasr_button_viceColor" :label="tt('video.liveView', '实时画面')"
                                    instanceCode="fasr_button_ed5180" icon="fas dx-icon icon-t-camera" :showHint="true"
                                    :tabIndex="1" @click="openVideoModal(item)">
                                </t-button>
                                <t-button :ref="el => Widget['fasr_button_ed5180'] = el" style="flex: 2;"
                                    class="fasr_button_ed5180 tr-button-default" :label="tt('video.playback', '回看')"
                                    instanceCode="fasr_button_ed5180" icon="fas dx-icon icon-t-undo" :showHint="true"
                                    :tabIndex="1" @click="openReplay(item)">
                                </t-button>
                                <t-btn-group :ref="el => Widget['btnGroup_lock'] = el" style=""
                                    class="btnGroup_lock" instanceCode="btnGroup_lock" :staticItems="[
                                        {
                                            label: '设备日志',
                                            value: '4',
                                            icon: 'fas dx-icon icon-t-file-text',
                                            type: 'default',
                                            hint: '设备日志',
                                            visible: true,
                                            disabled: false,
                                            code: 'btntext'
                                        }
                                    ]" btnSpace="8px" :moreConf="true" :moreMaxCount="0" moreBtnIcon="fas dx-icon icon-t-more"
                                    :btnDropPop="true" :hideBorder="false" :tabIndex="1" @Click_设备日志="btnGroupLockClick"
                                    @btnGroupItemClick="(action) => btnGroupLockItemClick(action, row, item)">
                                </t-btn-group>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="photoList.length == 0" style="text-align: center;margin: 20px 0px;width: 100%;">{{ tt('common.noRecords', '无记录') }}</div>
        </div>
        <div class="accordion-container">
            <div v-for="parent in parentDevices" :key="parent.DeviceKey" class="accordion-item">
                <div class="accordion-header" @click="toggleExpand(parent.DeviceKey)">
                    <div>
                        <span class="status-label" :class="getStatusClass(parent.NetState)">
                            {{ netStateMap[parent.NetState] }}
                        </span>
                        <span class="title">{{ parent.DeviceName }}</span>
                        <span class="detail-link" @click.stop="openDetail(parent)">详情
                            <t-icon style='margin-left: 2px;' class='lockIcon tr-icon-default'
                                instanceCode='topIcon' size='8px' :tabIndex='1'
                                name='fas dx-icon icon-t-arrow-right-thin'>
                            </t-icon>
                        </span>
                        <div class="log-link" @click.stop="jumptoLogPage(parent)">查看设备日志
                            <t-icon style='margin-left: 2px;' class='lockIcon tr-icon-default'
                                instanceCode='topIcon' size='8px' :tabIndex='1'
                                name='fas dx-icon icon-t-arrow-right-thin'>
                            </t-icon>
                        </div>
                    </div>
                    <span class="expand-btn">{{ expanded[parent.DeviceKey] ? '收 起' : '展 开' }}</span>
                    <t-icon v-if="expanded[parent.DeviceKey]" style='margin-left: 8px;'
                        class='lockIcon tr-icon-default' instanceCode='topIcon' size='10px' :tabIndex='1'
                        name='fas dx-icon icon-t-arrow-top-thin'>
                    </t-icon>
                    <t-icon v-else style='margin-left: 8px;' class='lockIcon tr-icon-default'
                        instanceCode='downIcon' size='10px' :tabIndex='1'
                        name='fas dx-icon icon-teld-arrow-bottom-thin'>
                    </t-icon>
                </div>
                <div v-show="expanded[parent.DeviceKey]" class="accordion-content photoDivChange">
                    <div v-for="(item, idx) in childGroups[parent.DeviceKey]"
                        :key="'grp_' + parent.DeviceKey + '_' + idx" style="display: inline-block;">
                        <div class="deviceViewCont">
                            <div class="deviceCardNew">
                                <div class="deviceCardContentNew">
                                    <div class="deviceCardStatusCircle circleState"
                                        :class="item.NetState == 1 ? 'greenColor' : item.NetState == 2 ? 'redColor' : 'grayColor'">
                                        {{ netStateMap[item.NetState] }}
                                    </div>
                                    <div style="width: 100%;">
                                        <div class="deviceCardPhotoTitleRow">
                                            <span class="deviceCardTitleText titleBold">{{ item.DeviceName }}</span>
                                            <span @click.stop="openDetail(item)" class="detail-icon" :title="tt('common.viewDetails', '查看详情')">
                                                详情
                                                <t-icon style="opacity:100%" class="lockIcon tr-icon-default"
                                                    instanceCode="lockIcon" size="12px" :tabIndex="1"
                                                    name="fas dx-icon icon-t-arrow-right-thin"></t-icon>
                                            </span>
                                        </div>
                                        <div class="deviceCardTimeStamp">
                                            更新时间: {{ item.LastModifyTime ? item.LastModifyTime.replace('T', ' ') : '' }}
                                        </div>
                                    </div>
                                </div>
                                <div class="deviceBtn">
                                    <t-button style="flex: 2;"
                                        class="fasr_button_ed5180 tr-button-default fasr_button_viceColor" :label="tt('video.liveView', '实时画面')"
                                        icon="fas dx-icon icon-t-camera" :showHint="true" :tabIndex="1"
                                        @click="openVideoModal(item)"></t-button>
                                    <t-button style="flex: 2;" class="fasr_button_ed5180 tr-button-default"
                                        :label="tt('video.playback', '回看')" icon="fas dx-icon icon-t-undo" :showHint="true" :tabIndex="1"
                                        @click="openReplay(item)"></t-button>
                                    <t-btn-group style="" class="btnGroup_lock" :staticItems="[
                                        {
                                            label: '设备日志',
                                            value: '4',
                                            icon: 'fas dx-icon icon-t-file-text',
                                            type: 'default',
                                            hint: '设备日志',
                                            visible: true,
                                            disabled: false,
                                            code: 'btntext'
                                        }
                                    ]" btnSpace="8px" :moreConf="true" :moreMaxCount="0" moreBtnIcon="fas dx-icon icon-t-more"
                                        :btnDropPop="true" :hideBorder="false" :tabIndex="1"
                                        @Click_设备日志="() => btnGroupLockClick(item)"
                                        @btnGroupItemClick="(action) => btnGroupLockItemClick(action, null, item)"></t-btn-group>
                                </div>
                            </div>
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
const Widget = window.Widget;
defineProps({
  photoList: {
    type: Array,
    required: true
  },
  independentItems: {
    type: Array,
    required: true
  },
  parentDevices: {
    type: Array,
    required: true
  },
  childGroups: {
    type: Object,
    required: true
  },
  expanded: {
    type: Object,
    required: true
  },
  netStateMap: {
    type: Object,
    required: true
  },
  getStatusClass: {
    type: Function,
    required: true
  },
  toggleExpand: {
    type: Function,
    required: true
  },
  openDetail: {
    type: Function,
    required: true
  },
  openVideoModal: {
    type: Function,
    required: true
  },
  openReplay: {
    type: Function,
    required: true
  },
  jumptoLogPage: {
    type: Function,
    required: true
  },
  btnGroupLockClick: {
    type: Function,
    required: true
  },
  btnGroupLockItemClick: {
    type: Function,
    required: true
  }
});
</script>
<style scoped>
.accordion-container {
     font-family: 'Arial', sans-serif;
  /* background-color: #f5f7fa; */
  padding: 0 12px;
  margin-top: 12px;
}

.accordion-item {
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
    margin-bottom: 12px;
    overflow: hidden;
}

.accordion-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px;
    cursor: pointer;
    background-color: rgba(240, 242, 245, 1);
    /* border-bottom: 1px solid #e0e0e0; */
    transition: background-color 0.2s ease;
}

.accordion-header:hover {
    background-color: #e8eaf6;
}

.status-label {
    padding: 0px 4px;
    border-radius: 4px;
    font-size: 12px;
    margin-right: 8px;
}

.status-label.online {
    border: 1px solid;
    color: #52c41a;
    border-color: rgba(82, 196, 26, 0.6);
}

.status-label.offline {
    border: 1px solid;
    color: #f5222d;
    border-color: rgba(245, 34, 45, 0.6);
}

.title {
    font-size: 14px;
    font-weight: 600;
    margin-right: 4px;
}

.detail-link,
.log-link {
    font-size: 12px;
    color: #666;
    text-decoration: none;
    margin-top: 6px;
}

.detail-link:hover,
.log-link:hover{
  color: var(--t-color);
}

.expand-btn {
    font-size: 12px;
    color: #495057;
    margin-left: auto;
    cursor: pointer;
}

.accordion-content {
    padding: 16px;
    /* background-color: rgba(240, 242, 245, 1); */
    /* border-top: 1px solid #e0e0e0; */
    line-height: 1.5;
}
</style>