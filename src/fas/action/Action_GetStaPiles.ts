/**
 * 获取终端列表
 * @param {System.String} staId- 
 */
// 异步出码
TFF.fas.Action.ActionClassAsync.prototype.Action_GetStaPiles = function (staId) {
  return TFF.fas.Action.executeAsync('b1c1db2d-abd3-4032-b2a0-4ea263b33b22', [
    { ParameterName: 'staId', ParameterValue: staId },
  ]);
};
// 同步出码
TFF.fas.Action.ActionClass.prototype.Action_GetStaPiles = function (staId){
  return TFF.fas.Action.executeAsync('b1c1db2d-abd3-4032-b2a0-4ea263b33b22', [
    { ParameterName: 'staId', ParameterValue: staId },
  ]);
};

