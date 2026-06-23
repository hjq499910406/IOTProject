<template>
  <div class="hls-player">
        <video
            ref="videoRef"
            controls
            muted
            playsinline
            webkit-playsinline
            :poster="poster"
            class="video-element"
            :class="{ play: props.play }"
            >
            您的浏览器不支持 video 标签。
        </video>
    <!-- 👇 新增：离线标签 -->
    <div v-if="props.item.NetState != 1" class="offline-tag">设备离线</div>

    <!-- 点击提示 (播放图标) -->
    <div v-if="!hasPlayed && !loading" class="overlay" @click.stop="handleClick">
        <div class="play-icon">▶</div>
    </div>

    <!-- 加载中 (可点击取消) -->
    <div v-if="loading" class="overlay loading" @click.stop="handleCancel">
        <div class="spinner"></div>
    </div>

    <!-- 错误提示 -->
    <div v-if="error" class="error">{{ error }}</div>
  </div>
</template>

<script setup>
import { ref, onBeforeUnmount, computed } from 'vue';
import Hls from 'hls.js';

const props = defineProps({
  item: {
    type: Object,
    required: true
  },
  TenantId: {
    type: String,
    required: true
  },
  play:{
    type: Boolean,
    default: true
  },
  timeValue: {
    type: String,
    required: false
  }
});

const poster = computed(() => props.item.LastSnapshot || 'https://resource.teld.org/teldimage/101/default_cover.jpg');

const videoRef = ref(null);
const hasPlayed = ref(false);
const loading = ref(false);
const error = ref('');

let hls = null;
const MAX_RETRY = 8;
const RETRY_DELAY = 2000;

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const timeRange = computed(() => {
  if (!props.timeValue) return { start: '', end: '' };
    
  const parts = props.timeValue.split(' ～ ');
  if (parts.length !== 2) return { start: '', end: '' };

  const start = parts[ 0 ].trim();
  const endTime = parts[ 1 ].trim();
  const datePart = start.split(' ')[ 0 ]; // "2026-01-06"
  const end = `${ datePart } ${ endTime }`;

  return { start, end };
});
// 并加入取消检查
const fetchStreamUrlWithRetry = async () => {
  for (let i = 1; i <= MAX_RETRY; i++) {
    // 每次循环开始时检查是否被取消
    if (!loading.value) {
      console.log(`[HLS] 在第 ${ i } 次重试开始前检测到取消`);
      throw new Error('USER_CANCELLED');
    }
    // --- 检查结束 ---

    try {
      const deviceKey = String(props.item.DeviceKey ?? '').trim();
      const productKey = String(props.item.ProductKey ?? '').trim();

      if (!deviceKey || !productKey) {
        throw new Error('设备信息不完整');
      }
      let postData = {};
      let result = null;
      if(props.play){
        postData = {
          TenantId: props.TenantId,
          DeviceKey: deviceKey,
          ProductKey: productKey,
          ActionId: 'Play',
          WaitForResponse: true,
          Params: [],
        };
        result = await TFF.common.ajax.getDataAsync({
          url: TFF.common.ajax.getServiceUrl('IRouter-InvokeDeviceAction_External'),
          type: 'post',
          data: { request: JSON.stringify(postData) }
        });
      }
      else{
        postData = {
          TenantId: props.TenantId,
          DeviceKey: deviceKey,
          ProductKey: productKey,
          ActionId: 'Playback',
          WaitForResponse: true,
          Params:[ { 'Name':'StartTime','Value':timeRange.value.start },{ 'Name':'EndTime','Value':timeRange.value.end } ],
        };
        result = await TFF.common.ajax.getDataAsync({
          url: TFF.common.ajax.getServiceUrl('IRouter-InvokeDeviceAction_External'),
          type: 'post',
          data: { request: JSON.stringify(postData) }
        });
      }

      // --- 核心：请求成功后检查是否被取消 ---
      if (!loading.value) {
        console.log(`[HLS] 第 ${ i } 次请求成功，但在返回后检测到取消`);
        throw new Error('USER_CANCELLED');
      }
      // --- 检查结束 ---
      const url = result?.data?.OutputParams?.[ 0 ]?.Value;
      if (url && typeof url === 'string' && url.indexOf('.m3u8') > -1) {
        return url;
      }

      if (i < MAX_RETRY) {
        console.log(`[HLS] 第 ${ i } 次未获取到有效地址，${ RETRY_DELAY / 1000 }s 后重试...`);
        // --- 核心：延迟前检查是否被取消 ---
        if (!loading.value) {
          console.log(`[HLS] 在第 ${ i } 次重试延迟前检测到取消`);
          throw new Error('USER_CANCELLED');
        }
        // --- 检查结束 ---
        await delay(RETRY_DELAY);
        // --- 核心：延迟后检查是否被取消 ---
        if (!loading.value) {
          console.log(`[HLS] 在第 ${ i } 次重试延迟后检测到取消`);
          throw new Error('USER_CANCELLED');
        }
        // --- 检查结束 ---
      }
    }
    catch (err) {
      // --- 核心：优先判断是否是用户取消 ---
      if (err.message === 'USER_CANCELLED') {
        console.log(`[HLS] 在第 ${ i } 次重试中检测到用户取消`);
        // 向上抛出取消信号
        throw err;
      }
      // --- 判断结束 ---

      console.error(`[HLS] 第 ${ i } 次请求失败:`, err.message || err);
      if (i < MAX_RETRY) {
        // --- 核心：失败后延迟前检查是否被取消 ---
        if (!loading.value) {
          console.log(`[HLS] 在第 ${ i } 次失败后延迟前检测到取消`);
          throw new Error('USER_CANCELLED');
        }
        // --- 检查结束 ---
        await delay(RETRY_DELAY);
        // --- 核心：失败后延迟后检查是否被取消 ---
        if (!loading.value) {
          console.log(`[HLS] 在第 ${ i } 次失败后延迟后检测到取消`);
          throw new Error('USER_CANCELLED');
        }
        // --- 检查结束 ---
      }
      else {
        // 达到最大重试次数
        throw new Error(`网络或服务异常，已达到最大重试次数 (${ MAX_RETRY })`);
      }
    }
  }
  throw new Error('获取视频流失败');
};

const emit = defineEmits([ 'playVideo' ]);

const sendToParentPaused = () => {
  emit('playVideo');
};

// --- 新增：处理取消的函数 ---
const handleCancel = () => {
  console.log('[HLS] 用户触发取消');
  resetToInitialState(); // 直接重置状态
  // fetchStreamUrlWithRetry 函数会在下一次检查 loading.value 时发现自己被取消
};

const handleClick = async () => {
  if(props.item.NetState != 1){
    Funcs.Notify('提示', '设备离线，无法播放视频', 'error');
    return;
  }
  // 防止重复点击或在加载/已播放时再次触发
  if (hasPlayed.value || loading.value){
    resetToInitialState();
  }

  hasPlayed.value = true;
  loading.value = true;
  error.value = '';

  try {
    const url = await fetchStreamUrlWithRetry(); // ✅ 这里现在可以被取消

    // --- 核心：获取URL后再次检查是否被取消 ---
    if (!loading.value) {
      console.log('[HLS] 成功获取URL后检测到取消，不进行播放');
      resetToInitialState(); // 确保彻底重置
      return; // 不继续执行播放逻辑
    }
    // --- 检查结束 ---

    const video = videoRef.value;
    if (!video) {
      resetToInitialState();
      return;
    }

    // 成功获取URL，关闭loading
    loading.value = false;

    // if (video.canPlayType('application/vnd.apple.mpegurl')) {
    //     video.src = url
    //     video.load()
    //     await video.play().catch(() => showErrorAndReset('播放被阻止'))
    //     sendToParentPaused();
    //     video.addEventListener('error', () => showErrorAndReset('Safari 播放失败'), { once: true })
    //     return
    // }

    if (Hls.isSupported()) {
      hls = new Hls({ enableWorker: true, lowLatencyMode: true, backBufferLength: 90 });
      hls.loadSource(url);
      hls.attachMedia(video);

      hls.on(Hls.Events.ERROR, (event, data) => {
        if (data.fatal) {
          showErrorAndReset(data.type === Hls.ErrorTypes.NETWORK_ERROR ? '网络错误' : '媒体加载失败');
        }
      });

      video.play().catch(() => showErrorAndReset('播放被阻止'));
      sendToParentPaused();
    }
    else {
      showErrorAndReset('浏览器不支持 HLS');
    }
  }
  catch (err) {
    console.error('[HLS] 最终获取视频流失败或被取消:', err);

    // --- 核心：区分取消和其他错误 ---
    if (err.message === 'USER_CANCELLED') {
      console.log('[HLS] 检测到用户取消操作');
      // 因为 resetToInitialState 已经在 handleCancel 中调用过了，
      // 或者是因为 loading.value 被外部设为 false 导致的，
      // 所以这里只需要确保 loading 状态是 false 即可。
      // 通常不需要额外操作，因为我们已经在 handleCancel/resetToInitialState 中处理了。
      // 但如果担心状态不同步，可以再调用一次 resetToInitialState()
      // resetToInitialState(); // 保险起见也可以加，但一般 handleCancel 已足够
      return; // 是取消，所以不显示错误信息，也不再调用 resetToInitialState
    }
    // --- 区分结束 ---

    // 是其他类型的错误
    loading.value = false; // 确保 loading 关闭
    resetToInitialState(); // 重置状态
    error.value = err.message || '无法获取视频流';
    setTimeout(() => {
      error.value = '';
    }, 5000);
  }
};

const showErrorAndReset = (msg) => {
  error.value = msg;
  setTimeout(() => error.value = '', 5000);
  resetToInitialState();
};

const resetToInitialState = () => {
  destroyHls();
  hasPlayed.value = false;
  loading.value = false; // ✅ 关键：设置 loading 为 false，作为取消/重置信号
};

const destroyHls = () => {
  if (hls) {
    hls.destroy();
    hls = null;
  }
  if (videoRef.value) {
    videoRef.value.src = '';
    videoRef.value.load();
  }
};

onBeforeUnmount(() => {
  destroyHls();
});

defineExpose({
  handleClick,handleCancel
});
</script>
<style scoped>
.hls-player {
  position: relative;
  width: 100%;
  height: 100%;
  background: #000;
  /* cursor: pointer; */ /* 移除了全局指针，因为只有特定区域可点击 */
}

.video-element {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: contain;
}
.play.video-element::-webkit-media-controls-timeline {
  display: none !important;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.2);
  opacity: 0.8;
  transition: opacity 0.2s;
  cursor: pointer; /* 明确指示可点击区域 */
}

.overlay:hover {
  opacity: 1;
}

.play-icon {
  font-size: 48px;
  color: white;
  text-shadow: 0 0 10px rgba(0, 0, 0, 0.6);
}

.loading {
  background: rgba(0, 0, 0, 0.5);
  cursor: pointer; /* 明确指示可点击区域 (用于取消) */
}

.spinner {
  width: 32px;
  height: 32px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-top: 3px solid white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.error {
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.7);
  color: #ff6b6b;
  padding: 4px 12px;
  border-radius: 4px;
  font-size: 12px;
  white-space: nowrap;
  z-index: 2;
}

.offline-tag {
  position: absolute;
  top: 8px;
  left: 8px;
  background-color: #faad14;
  color: #141414;
  font-size: 12px;
  padding: 2px 6px;
  border-radius: 3px;
  z-index: 3;
  font-weight: bold;
  pointer-events: none;
}
</style>