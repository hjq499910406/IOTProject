const DEFAULT_CTRL_OPTION = { label: '全部集控器', value: '' };

function isSuccess(result) {
  return result?.state == '1';
}

function mapCtrlList(ctrlList = []) {
  return [
    DEFAULT_CTRL_OPTION,
    ...ctrlList.map((item) => ({
      label: item.Name,
      value: item.Code,
      Code: item.Code,
      Name: item.Name
    }))
  ];
}

function mapPileCommandItem(item) {
  return {
    PileCode: item.PileCode,
    CtrlAddress: item.CtrlAddress,
    CanAddress: item.CanSN,
    PileId: item.PileId,
    PileRealtimeState: item.TerminalRealtimeState
  };
}

export function createDefaultCtrlList() {
  return [ DEFAULT_CTRL_OPTION ];
}

export function fetchCtrlListByStation(stationId) {
  return TFF.common.ajax.getDataAsync({
    url: TFF.common.ajax.getServiceUrl('SaaS-CM-TPS-GetCtrlListByStaSysAC'),
    type: 'post',
    data: {
      filter: JSON.stringify({
        StaID: stationId,
        CtrlType: '',
        SecondSource: 'PowerDispatchingShow'
      })
    }
  }).then((result) => ({
    success: isSuccess(result),
    ctrlList: isSuccess(result) && result?.data ? mapCtrlList(result.data.CtrlList) : [ DEFAULT_CTRL_OPTION ]
  }));
}

export function fetchTimingOneKeyCharge(staId) {
  return TFF.common.ajax.getDataAsync({
    url: TFF.common.ajax.getServiceUrl('SaaS-CM-TPS-GetTimingOneKeyChargeV2'),
    type: 'post',
    data: {
      StaId: JSON.stringify(staId)
    }
  }).then((result) => {
    if (!isSuccess(result) || !result?.data) {
      return {
        success: false,
        timingList: [],
        defaultChargeTimeList: []
      };
    }

    const { IsExist, TimingOnekeyChargeResult, DefaultTime } = result.data;
    return {
      success: true,
      timingList: IsExist == 1 ? (TimingOnekeyChargeResult || []) : [],
      defaultChargeTimeList: IsExist == 1 || !DefaultTime ? [] : [ { time: DefaultTime } ]
    };
  });
}

export function saveTimingOneKeyChargeApi(stationId, form, chargeTimeList) {
  return TFF.common.ajax.getDataAsync({
    url: TFF.common.ajax.getServiceUrl('SaaS-CM-TPS-SaveTimingOneKeyCharge'),
    type: 'post',
    data: {
      param: JSON.stringify({
        StaId: stationId,
        CustId: '',
        SecondSource: 'PowerDispatchingShow',
        ...form,
        ChargeTimeList: chargeTimeList
      })
    }
  }).then((result) => ({
    success: isSuccess(result),
    errorMessage: result?.errmsg || ''
  }));
}

export function removeTimingOneKeyChargeApi(staId, timingList) {
  return TFF.common.ajax.getDataAsync({
    url: TFF.common.ajax.getServiceUrl('SaaS-CM-TPS-RemoveTimingOnekeyChargeV2'),
    type: 'post',
    data: {
      staId: JSON.stringify(staId),
      jobIdList: JSON.stringify(timingList.map((item) => item.JobId))
    }
  }).then((result) => ({
    success: isSuccess(result),
    errorMessage: result?.errmsg || ''
  }));
}

export function startOneKeyChargeApi(stationId, stationName, availablePiles, unavailablePiles) {
  return TFF.common.ajax.getDataAsync({
    url: TFF.common.ajax.getServiceUrl('SaaS-CM-TPS-OneKeyChargeV2'),
    type: 'post',
    data: {
      param: JSON.stringify({
        CustomerID: '',
        SecondSource: 'PowerDispatchingShow',
        StaID: stationId,
        StaName: stationName,
        IsThirdStation: false,
        ctrlcanAddrList: availablePiles.map(mapPileCommandItem),
        click_AllCount: availablePiles.length,
        PileCodes: availablePiles.map(({ PileCode }) => ({ PileCode })),
        OtherPileCodes: unavailablePiles.map(mapPileCommandItem)
      })
    }
  }).then((result) => ({
    success: isSuccess(result),
    errorMessage: result?.errmsg || ''
  }));
}

export function fetchStopChargeCountApi(stationId, ctrlList) {
  return TFF.common.ajax.getDataAsync({
    url: TFF.common.ajax.getServiceUrl('SaaS-CM-TPS-GetStopChargeWithOneButtonCount'),
    type: 'post',
    data: {
      filter: JSON.stringify({
        CustID: '',
        StaID: stationId,
        CtrlAddressList: ctrlList.map((item) => item.Code).filter((item) => item)
      })
    }
  }).then((result) => ({
    success: isSuccess(result),
    count: isSuccess(result) ? Number(result?.data || 0) : 0,
    errorMessage: result?.errmsg || ''
  }));
}

export function stopOneKeyChargeApi(stationId, ctrlList) {
  return TFF.common.ajax.getDataAsync({
    url: TFF.common.ajax.getServiceUrl('SaaS-CM-TPS-StopChargeWithOneButton'),
    type: 'post',
    data: {
      param: JSON.stringify({
        CustID: '',
        StaID: stationId,
        CtrlAddressList: ctrlList.map((item) => item.Code).filter((item) => item)
      })
    }
  }).then((result) => ({
    success: isSuccess(result),
    errorMessage: result?.errmsg || ''
  }));
}

export function getPileFieldSetProfile() {
  return window.Funcs.GetUserProfile({
    Key: 'Saas_Sta',
    DynamicKey: 'PileFieldSet'
  }).then((result) => {
    if (result?.state != 1 || !result?.data?.length || !result.data[ 0 ]?.ConfigValue) {
      return null;
    }

    try {
      return JSON.parse(result.data[ 0 ].ConfigValue);
    }
    catch (error) {
      return null;
    }
  });
}

export function setPileFieldSetProfile(configValue) {
  return window.Funcs.SetUserProfile(
    { Key: 'Saas_Sta', DynamicKey: 'PileFieldSet' },
    configValue
  );
}
