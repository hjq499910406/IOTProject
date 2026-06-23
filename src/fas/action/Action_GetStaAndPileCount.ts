/**
 * 获取电站终端与实时状态数量
 * @param {T.B.CM.CSM.Models.GetStaAndPileCountParam} param- 
 */
// 异步出码
TFF.fas.Action.ActionClassAsync.prototype.Action_GetStaAndPileCount = function (param) {
  return TFF.fas.Action.executeAsync('d5a3b0bd-4b41-4ca4-a541-46a5ecfe4d62', [
    { ParameterName: 'param', ParameterValue: param },
  ]);
};
// 同步出码
TFF.fas.Action.ActionClass.prototype.Action_GetStaAndPileCount = function (param) {
  return TFF.fas.Action.executeAsync('d5a3b0bd-4b41-4ca4-a541-46a5ecfe4d62', [
    { ParameterName: 'param', ParameterValue: param },
  ]);
};

