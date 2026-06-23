import { watch } from 'vue';
const watchResult = {};
const FasFunction = {
  changeTrackResultSet: watchResult,
  	changeTrack(watchExp, watchCallback, prepUICallback) {
	  if(!watchExp.startsWith('LocalVars.')) return;
	  const [ targetObjName ] = watchExp.split('.').slice(1);    
	  const oldValue = JSON.parse(JSON.stringify(LocalVars[ targetObjName ]));
	  // 变化后事件的处理器
	  function watchHandler(newVal, oldVal) {
      if (deepCompare(newVal, oldValue)) {
		  watchCallback({ isRollback: true });
		  delete watchResult[ watchExp ];
      }
      else {
		  watchCallback({ isRollback: false });
		  watchResult[ watchExp ] = true;
      }
	  }
	  function deepCompare(obj1, obj2) {
		  if (JSON.stringify(obj1) === JSON.stringify(obj2)) return true;
		  const keys1 = Object.keys(obj1);
		  if (keys1.length !== Object.keys(obj2).length) return false;
		  for (const key of keys1) {
		    if (!Object.prototype.hasOwnProperty.call(obj2, key)) return false;
		    if((obj2[ key ] === null && obj1[ key ] === '')||(obj1[ key ] === null && obj2[ key ] === ''))continue;
		    if (typeof obj1[ key ] === 'object' && typeof obj2[ key ] === 'object') {
		      if (!deepCompare(obj1[ key ], obj2[ key ])) return false;
		    }
        else if (obj1[ key ] !== obj2[ key ]) return false;
		  }
		  return true;
    }
	  
	  // 变化前执行的方法
	  prepUICallback && prepUICallback();
	  // 使用watch来监听变化
	  watch(LocalVars[ targetObjName ], watchHandler, {
      immediate: true,
      deep: true,
	  });
  },
	
  async executeScript(scriptContent) {
	    const response = await new Promise(resolve => {
	    try {
	      const func = new Function(scriptContent);
	      const result = func();      
	      resolve(result);
	    }
      catch(e) {
	      resolve(undefined);
	    }
	  });
	  return response;
  }
};
export default FasFunction;

