/* eslint-disable */
TFF.fas.Action.ActionClass.prototype.GetList3 = function () {

      TFF.fas.DQ.execute('93313033-c232-4306-838c-7bd4409ddbaa', [
        { ParameterName: 'DefaultInputFilter', ParameterValue: '' },
        { ParameterName: 'IsCloud', ParameterValue: true },
        { ParameterName: 'PageIndex', ParameterValue: 1 },
        { ParameterName: 'PageSize', ParameterValue: 5 }
      ])
        console.log("GetList3");
}