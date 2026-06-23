/**
 * 获取异常终端数量
 * @param {T.Saas.Ops.SPI.OpsMonitoring.GetPowerCharingAbnormalDataInput} input- 
 */
// 异步出码
TFF.fas.Action.ActionClassAsync.prototype.Action_GetPowerCharingAbnormalData = function (input) {
  return TFF.fas.Action.executeAsync('b44b4fd5-a296-424b-ad2e-13274f4332a4', [
    { ParameterName: 'input', ParameterValue: input },
  ]);
};
// 同步出码
TFF.fas.Action.ActionClass.prototype.Action_GetPowerCharingAbnormalData = function (input){
  return TFF.fas.Action.executeAsync('b44b4fd5-a296-424b-ad2e-13274f4332a4', [
    { ParameterName: 'input', ParameterValue: input },
  ]);
};

