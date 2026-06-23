//商城我的订单
const isMine = TFF.common.api.Url.getUrlQuery("isMine") == "true";
//商城购买商品 订单确认
const isConfig = TFF.common.api.Url.getUrlQuery("isConfig") == "true";


const setButtonVisible = (buttonName, visible) => {
  Widget[buttonName] && (Widget[buttonName].visible = visible);
};

const applyActionButtonsVisibility = (order) => {
  const orderStatus = Number(order.order_status);
  const contractStatus = Number(order.contract_status);
  const paymentStatus = Number(order.payment_status);
  const paidType = Number(order.priceprice_paidtype);
  const merchantConfirmStatus = Number(order.merchantconfirm_status);
  const platformConfirmStatus = Number(order.platformconfirm_status);

  /* 已签署  || 无需签署 && 已付款 不能编辑 */
  let editVisible = !isMine && (order.order_contractname == '未签署' || (order.order_contractname == '无需签署' && order.order_paymentname == '未付款'));
  /* "已终止" 不能编辑 */
  if (orderStatus == 30) {
    editVisible = false;
  }

  let configVisible = false;
  /* 商户确认 */
  if ((isConfig || isMine) && merchantConfirmStatus == 1 && isShowConfirmNode(order)) {
    configVisible = true;
  }
  /* 平台确认 */
  if (!isConfig && !isMine && platformConfirmStatus == 1 && isShowConfirmNode(order)) {
    configVisible = true;
  }

  /* 签约按钮展示 */
  let signedVisible = isMine && (contractStatus == 10 || contractStatus == 20) && orderStatus != 30;
  /* 付款按钮展示 */
  let playVisible = isMine && (paymentStatus == 10 || paymentStatus == 15) && orderStatus != 30;

  if (signedVisible) {
    playVisible = false;
  }
  /* 后付费 无需支付 */
  if (paidType == 2) {
    playVisible = false;
  }
  /* 如果有确认按钮展示 其他的都隐藏 */
  if (configVisible) {
    playVisible = false;
    signedVisible = false;
  }

  setButtonVisible('fas_editButton', editVisible);
  setButtonVisible('fasr_button_editM', editVisible);
  setButtonVisible('fasr_button_config', configVisible);
  setButtonVisible('fasr_button_play', playVisible);
  setButtonVisible('fasr_button_Signed', signedVisible);

  return { editVisible, configVisible, playVisible, signedVisible };
};

LocalVars.callbackurl = `${document.referrer}?pageCode=Page_MineOrder&biId=${LocalVars.vardata.bi_id}`
/**
 * 页面重载函数，获取并更新订单详情信息
 */
window.pageReload = async () => {
  const urlOrderId = TFF.common.api.Url.getUrlQuery("orderId")
  if (urlOrderId) {
    LocalVars.InParam_DataID = urlOrderId
  }
  if (!LocalVars.InParam_DataID) return;

  try {
    if (isConfig) {
      const element = document.querySelector('.Page_MMP_Order_Detail');
      element?.classList.add('isConfig');
    }
    if (isMine) {
      Widget.fasr_contract_gird && (Widget.fasr_contract_gird.enableCmdCol = false)
      setButtonVisible('fas_editButton', false)
      setButtonVisible('fasr_button_editM', false)
      Widget.fasr_div_44fd59.style.display = "none";
      LocalVars.fasr_anchor_StaticItems = LocalVars.fasr_anchor_StaticItems.filter((f) => f.label != "订单流转");
      const element = document.querySelector('.Page_MMP_Order_Detail');
      element?.classList.add('showBottom', 'isMine');
      if (Widget.fasr_data_grid_detail) {
        const scheme = Widget.fasr_data_grid_detail.GetScheme()
        scheme.displayColumns = scheme.displayColumns.filter(f => !['subtotal', 'unit_price'].includes(f.value))
        if (isConfig) {
          scheme.displayColumns = scheme.displayColumns.filter(f => !['delivery_status'].includes(f.value))
        }
        Widget.fasr_data_grid_detail.SetScheme(scheme)
        Widget.fasr_data_grid_detail.columns.find(f => f.field == "actual_subtotal").label = '商品总价'
        Widget.fasr_data_grid_detail.columns.find(f => f.field == "actual_unit_price").label = '商品单价'
      }
    }
    const dataID = LocalVars.InParam_DataID;

    const [orderData, logs] = await Promise.all([
      // // 1. 获取订单基本信息
      // Action.Action_GetMMP_Order_Detail(dataID),
      // // 2. 获取订单详情列表
      // Action.Action_GetorderDetail(dataID),
      // 3获取订单日志
      Action.Action_GetorderDetailBySG({ OrderID: dataID }),
      Action.Action_GetOrderLogs({ OrderID: dataID })
    ]);

    const sgOrderDetail = JSON.parse(orderData.DataContent).data
    const { orderInfo, ...rest } = sgOrderDetail;

    const orderDetail = {
      ...orderInfo,
      ...rest
    };
     
    orderDetail.order_details = orderDetail.detailList.map(item => {
      const {
        starttime,
        endtime,
        pricemode_name,
        pricedetail_name,
        ServiceRange,
        signing_method,
        ...rest
      } = item;

      return {
        ...rest,
        "StartTime": starttime,
        "EndTime": endtime,
        "ServiceRange": String(ServiceRange),
        "signing_method": Number(signing_method),
        "pricemodename": pricemode_name,
        "pricedetailname": pricedetail_name
      };
    });

    /* 日志 */
    const logsdata = JSON.parse(logs.DataContent).data

    orderDetail.order_logs = logsdata.map((log) => ({
      name: log.Name || '--',
      operation_time: log.Operation_Time,
      operator: log.Operator || '--',
      contact_info: log.contact_info || '',
    }));
    if (orderDetail.order_logs.length > 0) {
      orderDetail.createtime = orderDetail.order_logs[0].operation_time
    }


    if (orderDetail.order_details.length == 0) {
      Funcs.Notify('提示', `未获取到订单明细`, 'warning');
      return
    }

    orderDetail.order_details = orderDetail.order_details.map(m => ({
      ...m,
      createtime: orderDetail.createtime,
      delivery_status: orderDetail.delivery_status,
    }));


    for (const detailItem of orderDetail.order_details) {
      if (!detailItem.measure_unit) {
        detailItem.measure_unit = '--';
      }
      if (!detailItem.quantity) {
        detailItem.quantity = '--';
      }
    }

    LocalVars.detailList = orderDetail.order_details.map(item => {
      item.actual_unit_price = item.actual_unit_price || 0
      item.actual_subtotal = item.actual_subtotal || 0
      item.AC_PileActualPrice = item.AC_PileActualPrice || 0
      item.DC_PileActualPrice = item.DC_PileActualPrice || 0

      item.DC_PileCount_src = item.DC_PileCount
      item.AC_PileCount_src = item.AC_PileCount

      item.subtotal_src = item.subtotal;
      item.unit_price_src = item.unit_price;
      item.actual_unit_price_src = item.actual_unit_price;
      item.actual_subtotal_src = item.actual_subtotal;

      item.AC_PileActualPrice_src = item.AC_PileActualPrice;
      item.DC_PileActualPrice_src = item.DC_PileActualPrice;
      let unit = '年';
      let range = item.ServiceRange;

      if (item.pricedetail == 11) {
        unit = '天'
        range = Funcs.DiffDays(item.StartTime, item.EndTime) + 1
      }
      item.ServiceRangeStr = `${range}${unit}（${Funcs.FormatDateTime(item.StartTime, 'yyyy-MM-dd')}~${Funcs.FormatDateTime(item.EndTime, 'yyyy-MM-dd')}）`
      // 将原始属性转换为保留两位小数的浮点数
      item.subtotal = !item.pricemode_unit ? '--' : (item.subtotal.toFixed(2) + item.pricemode_unit);
      item.unit_price = !item.pricemode_unit ? '--' : (item.unit_price.toFixed(2) + item.pricemode_unit);
      item.actual_unit_price = !item.pricemode_unit ? '--' : (item.actual_unit_price.toFixed(2) + item.pricemode_unit);
      item.actual_subtotal = !item.pricemode_unit ? '--' : (item.actual_subtotal.toFixed(2) + item.pricemode_unit);

      item.AC_PileActualPrice = !item.pricemode_unit ? '--' : (item.AC_PileActualPrice.toFixed(2) + item.pricemode_unit);
      item.DC_PileActualPrice = !item.pricemode_unit ? '--' : (item.DC_PileActualPrice.toFixed(2) + item.pricemode_unit);

      item.DC_PileCount = !item.DC_PileCount ? '--' : (item.DC_PileCount + '个');
      item.AC_PileCount = !item.AC_PileCount ? '--' : (item.AC_PileCount + '个');
      item.New_AC_PileCount = !item.New_AC_PileCount ? '--' : (item.New_AC_PileCount + '个');
      item.New_DC_PileCount = !item.New_DC_PileCount ? '--' : (item.New_DC_PileCount + '个');

      return item;
    });

    /* 终端设备调整表格展示列 */
    const isTerminal = orderDetail.order_details.find(f => f.pricemode_code == 1)
    if (isTerminal) {
      Widget.fasr_data_grid_detail_terminal && (Widget.fasr_data_grid_detail_terminal.visible = true)
      Widget.fasr_data_grid_detail_terminal && (Widget.fasr_data_grid_detail.visible = false)

      Widget.fasr_usercomponent_detail && (Widget.fasr_usercomponent_detail.visible = false)
      Widget.fasr_usercomponent_detail_terminal && (Widget.fasr_usercomponent_detail_terminal.visible = true)
    }

    const isNotShowSubtotal = LocalVars.detailList.find(f => f.pricemode_unit == '%')

    Widget.fasr_div_1696bc.style.display = isNotShowSubtotal ? 'none' : 'flex';


    orderDetail.actualOrderPrice = LocalVars.detailList.reduce((sum, item) => {
      return sum + (item.actual_subtotal_src || 0);
    }, 0);
    //获取订单合同列表
    
    let contractList = orderDetail.contractList.map(item => {
      const {
        Amount,
        State,
        StartDate,
        EndDate,
        SignDate,
        OrderID,
        FilePath,
        DraftFilePath,
        ContractID,
        ...rest
      } = item;

      return {
        ...rest,
        "amount": Number(Amount),   
        "state": Number(State),  
        "startdate": StartDate,
        "enddate": EndDate,
        "signdate": SignDate,
        "orderid": OrderID,
        "Filepath": FilePath,           
        "DraftFilepath": DraftFilePath,     
        "ContractId": ContractID,              
        "Content": item.Content || null       
      };
    });
    

    //获取商品合同列表
    console.log(orderDetail, 'orderDetail')
    let productcontractList = await DataQuery.DQ_GetProductContractInID(orderDetail.order_details[0].product_id, 0, 0, null, null)
    productcontractList = productcontractList.List
    if (productcontractList && productcontractList.length == 2) {
      //商品有两个合同
      //列表上有1个，就把商品的第二个合同给展示出来
      //列表上有0，把商品的两个合同都展示出来
      //列表上有两个不处理
      if (contractList && contractList.length == 0) {
        for (let item of productcontractList) {
          contractList.push({
            ID: Funcs.Guid(),
            Code: '',
            Name: item.Name,
            amount: '',
            state: 10,
            signdate: '--',
            ValidityPeriod: '--'
          })
        }
      } else if (contractList && contractList.length == 1) {
        contractList.push({
          ID: Funcs.Guid(),
          Code: '',
          Name: productcontractList[productcontractList.length - 1].Name,
          amount: '',
          state: 10,
          signdate: '--',
          ValidityPeriod: '--'
        })
      }
    } else if (productcontractList && productcontractList.length == 1) {
      //商品有1个合同
      //列表上有1个，就把商品的第二个合同给展示出来
      //列表上有0，把商品的两个合同都展示出来
      //列表上有两个不处理
      if (contractList && contractList.length == 0) {
        for (let item of productcontractList) {
          contractList.push({
            ID: Funcs.Guid(),
            Code: '',
            Name: item.Name,
            amount: '',
            state: 10,
            signdate: '--',
            ValidityPeriod: '--'
          })
        }
      }
    }

    if (contractList && contractList.length > 0) {
      contractList.forEach(i => {
        i.ValidityPeriod = i.ValidityPeriod ? i.ValidityPeriod : `${i.startdate}~${i.enddate}`
        i.amount = !LocalVars.detailList[0].pricemode_unit ? '--' : (!i.amount ? '--' : (i.amount.toFixed(2) + LocalVars.detailList[0].pricemode_unit))
      })
    }
    LocalVars.ContractList = contractList

    // // 3. 获取收款方信息
    const payeeInfo = await Action.Action_PayeeInfo();
    orderDetail.PayeeInfo = payeeInfo.DataContent;
    LocalVars.vardata = orderDetail;
    if (LocalVars.vardata.payment_status == 15) {
      Widget.fasr_viewRecive.visible = true

    }
    LocalVars.paymentproof = LocalVars.vardata.paymentproof
    LocalVars.order_paymentname = LocalVars.vardata.order_paymentname
    LocalVars.order_statusname = LocalVars.vardata.order_statusname
    // 4. 更新UI状态
    //updateDocumentSigningStatus();
    updatePaymentAndContractStatus();

    console.log('Order detail loaded:', orderDetail);
  } catch (error) {
    Funcs.Notify('提示', `获取订单详情失败: ${error.message}`, 'warning');
  }
};


/**
 * 更新文档签署状态UI
 */
const updateDocumentSigningStatus = () => {
  const hasConfirmationLetter = LocalVars.detailList?.some(item => item.signing_method == 1);
  const hasContractInfo = LocalVars.detailList?.some(item => item.signing_method == 2);

  Widget.fasr_div_e708000_Copyda708000_Copy.style.display = hasConfirmationLetter ? 'flex' : 'none';
  Widget.fasr_div_e842848_Copyda842848_Copy.style.display = hasContractInfo ? 'flex' : 'none';
};

//是否展示确认按钮
function isShowConfirmNode(order) {
  const contractStatus = Number(order.contract_status);
  const paymentStatus = Number(order.payment_status);
  const deliveryStatus = Number(order.delivery_status);
  if (
    contractStatus == 20 || // Signing
    contractStatus == 30 || // Signed
    paymentStatus == 15 ||  // Paying
    paymentStatus == 20 ||  // Paid
    deliveryStatus == 30 || // Delivered
    deliveryStatus == 20    // Delivery
  ) {
    return false;
  }
  return true;
}


/**
 * 更新支付和合同状态UI
 */
const updatePaymentAndContractStatus = () => {

  const {
    LayoutGrid_509861_Copyee509861_Copy: paymentPaidElement,
    LayoutGrid_581839_Copyee581839_Copy: paymentUnpaidElement,
  } = Widget;

  const { order_paymentname, payway } = LocalVars.vardata;
  const { editVisible, configVisible, playVisible, signedVisible } = applyActionButtonsVisibility(LocalVars.vardata);
  const element = document.querySelector('.Page_MMP_Order_Detail');
  if (!signedVisible && !playVisible && !configVisible && !editVisible) {
    element?.classList.remove('showBottom');
  } else {
    element?.classList.add('showBottom');
  }

  // 付款状态
  const isUnpaid = order_paymentname == '未付款' || order_paymentname == '无需付款';
  paymentPaidElement.style.display = isUnpaid ? 'flex' : 'none';
  paymentUnpaidElement.style.display = isUnpaid ? 'none' : 'flex';

  // 合同状态
  // const hasContract = (contract_status == '30')
  // contractSignedElement.style.display = hasContract ? 'flex' : 'none';
  // contractUnsignedElement.style.display = hasContract ? 'none' : 'flex';
  if (payway == 2) {
    Widget.fasr_div_paymentProof.style.display = 'block'
  } else {
    Widget.fasr_div_paymentProof.style.display = 'none'
  }

  // // 确认函
  // const hasAcknowledgment = (contract_status != '10')
  // configSignedElement.style.display = hasAcknowledgment ? 'flex' : 'none';
  // configUnsignedElement.style.display = hasAcknowledgment ? 'none' : 'flex';
};

// 初始化加载
window.pageReload();


const IDs = LocalVars.InParam_IDs
if (IDs) {
  if (IDs.length == 1) {
    if (Widget.fas_btnPre) {
      Widget.fas_btnPre.disable = true
      Widget.fas_btnNext.disable = true
    }
    if (Widget.fas_lblListInfo) {
      Widget.fas_lblListInfo.constValue = Funcs.GetTerms(
        'Schema.Common.CurrentTotal',
        '{0}个(共{1}个)'
      ).format(1, 1)
    }
  } else {
    const currentIndex = IDs.findIndex(id => id == LocalVars.InParam_DataID)
    if (currentIndex > -1) {
      if (currentIndex == 0) {
        if (Widget.fas_btnPre) {
          Widget.fas_btnPre.disable = true
        }
      } else if (currentIndex == IDs.length - 1) {
        if (Widget.fas_btnNext) {
          Widget.fas_btnNext.disable = true
        }
      }
      if (Widget.fas_lblListInfo) {
        Widget.fas_lblListInfo.constValue = Funcs.GetTerms(
          'Schema.Common.CurrentTotal',
          '{0}个(共{1}个)'
        ).format(currentIndex + 1, LocalVars.InParam_IDs.length)
      }
    }
  }
} else {
  if (Widget.fas_btnPre) {
    Widget.fas_btnPre.disable = true
    Widget.fas_btnNext.disable = true
  }
  if (Widget.fas_lblListInfo) Widget.fas_lblListInfo.visible = false
}
