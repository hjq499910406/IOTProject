/// <reference path="@teld/types/dist/teld-monitor.d.ts" />
/// <reference path="@teld/types/dist/teld-plugin-ajax.d.ts" />
/// <reference path="@teld/types/dist/teld-plugin-api.d.ts" />
/// <reference path="@teld/types/dist/teld-plugin-api-fas.d.ts" />
/// <reference path="@teld/types/dist/teld-plugin-crypt.d.ts" />
/// <reference path="@teld/types/dist/teld-plugin-ctx.d.ts" />
/// <reference path="@teld/types/dist/teld-plugin-jsdk-adapter.d.ts" />
/// <reference path="@teld/types/dist/teld-plugin-storage.d.ts" />

declare namespace TFF {
  namespace core {
    namespace monitor {
      namespace error {
        export { index_d_errorReport as errorReport, index_d_onError as onError };
      }
      namespace report {
        export {
          index_d$1_report as report,
          index_d$1_tobCustomReport as tobCustomReport,
          index_d$1_tobReport as tobReport,
          index_d$1_tocCustomReport as tocCustomReport,
          index_d$1_tocReport as tocReport
        };
      }
    }
  }

  namespace fas {
    namespace Action {
      export {
        action_d_ActionClass as ActionClass,
        action_d_ActionClassAsync as ActionClassAsync,
        action_d_execute as execute,
        action_d_executeAsync as executeAsync
      };
    }
    namespace CDO {
      export {
        cdo_d_BatchCreate as BatchCreate,
        cdo_d_BatchCreate_Async as BatchCreate_Async,
        cdo_d_BatchDelete as BatchDelete,
        cdo_d_BatchDelete_Async as BatchDelete_Async,
        cdo_d_BatchEditUpdate as BatchEditUpdate,
        cdo_d_BatchEditUpdate_Async as BatchEditUpdate_Async,
        cdo_d_BatchUpdate as BatchUpdate,
        cdo_d_BatchUpdate_Async as BatchUpdate_Async,
        cdo_d_ChangeState as ChangeState,
        cdo_d_Create as Create,
        cdo_d_Create_Async as Create_Async,
        cdo_d_Delete as Delete,
        cdo_d_Delete_Async as Delete_Async,
        cdo_d_FireEvent as FireEvent,
        cdo_d_GetDataByID as GetDataByID,
        cdo_d_GetDataByID_Async as GetDataByID_Async,
        cdo_d_GetSMInfo as GetSMInfo,
        cdo_d_GetState as GetState,
        cdo_d_NewInstance as NewInstance,
        cdo_d_Update as Update,
        cdo_d_Update_Async as Update_Async,
        cdo_d_executeCDO as executeCDO,
        cdo_d_executeCDOAsync as executeCDOAsync
      };
    }

    namespace DQ {
      export {
        dq_d_BuildDQAdvFilter as BuildDQAdvFilter,
        dq_d_DataQueryClass as DataQueryClass,
        dq_d_DataQueryClassAsync as DataQueryClassAsync,
        execute$1 as execute,
        executeAsync$1 as executeAsync
      };
    }
  }

  namespace common {
    namespace ajax {
      export {
        queryDataAsync,
        getDataAsync,
        getHLHTDataAsync,
        queryDataAsyncAes,
        getDataAsyncAes,
        getHLHTServiceUrl,
        getServiceUrl
      };
    }
    namespace api {
      declare namespace Math {
        export {
          math_d_abs as abs,
          math_d_bankersRounding as bankersRounding,
          math_d_max as max,
          math_d_min as min,
          math_d_mod as mod,
          math_d_power as power,
          math_d_preciseAdd as preciseAdd,
          math_d_preciseDivide as preciseDivide,
          math_d_preciseMultiply as preciseMultiply,
          math_d_preciseSubtract as preciseSubtract,
          math_d_round as round,
          math_d_sign as sign,
          math_d_sqrt as sqrt,
          math_d_trunc as trunc
        };
      }
      declare namespace Format {
        export {
          format_d_formatCurrency as formatCurrency,
          format_d_formatDateTime as formatDateTime,
          format_d_formatDecimal as formatDecimal,
          format_d_formatPercent as formatPercent,
          format_d_formatPhoneNumber as formatPhoneNumber,
          format_d_formatText as formatText
        };
      }
      declare namespace Text {
        export {
          text_d_chr as chr,
          text_d_concat as concat,
          text_d_encodeHtml as encodeHtml,
          text_d_encodeJavaScript as encodeJavaScript,
          text_d_encodeSql as encodeSql,
          text_d_encodeUrl as encodeUrl,
          text_d_index as index,
          text_d_length as length,
          text_d_newLine as newLine,
          text_d_replace as replace,
          text_d_substr as substr,
          text_d_toLower as toLower,
          text_d_toUpper as toUpper,
          text_d_trim as trim,
          text_d_trimEnd as trimEnd,
          text_d_trimStart as trimStart
        };
      }
      declare namespace Url {
        export {
          url_d_getQueryString as getQueryString,
          url_d_getUrlQuery as getUrlQuery,
          url_d_randomUrl as randomUrl
        };
      }
      declare namespace Date {
        export {
          date_d_NewTime as NewTime,
          date_d_addDays as addDays,
          date_d_addHours as addHours,
          date_d_addMinutes as addMinutes,
          date_d_addMonths as addMonths,
          date_d_addSeconds as addSeconds,
          date_d_addYears as addYears,
          date_d_buildDateTime as buildDateTime,
          date_d_currDate as currDate,
          date_d_currDateTime as currDateTime,
          date_d_currTime as currTime,
          date_d_day as day,
          date_d_dayOfWeek as dayOfWeek,
          date_d_diffDays as diffDays,
          date_d_diffHours as diffHours,
          date_d_diffMinutes as diffMinutes,
          date_d_diffSeconds as diffSeconds,
          date_d_getFisrtDayOfTheMonth as getFisrtDayOfTheMonth,
          date_d_getFisrtDayOfTheQuarter as getFisrtDayOfTheQuarter,
          date_d_getFisrtDayOfTheWeek as getFisrtDayOfTheWeek,
          date_d_getFisrtDayOfTheWeekByWeekNo as getFisrtDayOfTheWeekByWeekNo,
          date_d_getFisrtDayOfTheYear as getFisrtDayOfTheYear,
          date_d_getLastDayOfTheMonth as getLastDayOfTheMonth,
          date_d_getLastDayOfTheQuarter as getLastDayOfTheQuarter,
          date_d_getLastDayOfTheWeek as getLastDayOfTheWeek,
          date_d_getLastDayOfTheWeekByWeekNo as getLastDayOfTheWeekByWeekNo,
          date_d_getLastDayOfTheYear as getLastDayOfTheYear,
          date_d_getWeekNum as getWeekNum,
          date_d_hour as hour,
          date_d_minute as minute,
          date_d_minutes as minutes,
          date_d_month as month,
          date_d_newDate as newDate,
          date_d_newDateTime as newDateTime,
          date_d_second as second,
          date_d_seconds as seconds,
          date_d_year as year
        };
      }
      declare namespace DataConvert {
        export {
          dataConvert_d_TimeToString as TimeToString,
          dataConvert_d_booleanToInt as booleanToInt,
          dataConvert_d_booleanToString as booleanToString,
          dataConvert_d_dateTimeToDate as dateTimeToDate,
          dateTimeToString$1 as dateTimeToString,
          dataConvert_d_dateTimeToTime as dateTimeToTime,
          dataConvert_d_dateToDateTime as dateToDateTime,
          dateToString$1 as dateToString,
          dataConvert_d_decimalToBoolean as decimalToBoolean,
          dataConvert_d_decimalToInt as decimalToInt,
          dataConvert_d_decimalToLong as decimalToLong,
          dataConvert_d_decimalToString as decimalToString,
          dataConvert_d_intToBoolean as intToBoolean,
          dataConvert_d_intToDecimal as intToDecimal,
          dataConvert_d_intToString as intToString,
          dataConvert_d_longToInt as longToInt,
          dataConvert_d_longToString as longToString,
          stringToDate$1 as stringToDate,
          stringToDateTime$1 as stringToDateTime,
          dataConvert_d_stringToDecimal as stringToDecimal,
          dataConvert_d_stringToInt as stringToInt,
          dataConvert_d_stringToLong as stringToLong,
          dataConvert_d_stringToTime as stringToTime
        };
      }

      declare namespace Validate {
        export { validate_d_Validate as Validate };
      }

      declare namespace Assert {
        export { assert_d_Assert as Assert };
      }

      declare namespace Map {
        export { map_d_loadGaoDeMap as loadGaoDeMap };
      }

      declare namespace I18N {
        export {
          i18n_d_DEFAULT_LOCALE as DEFAULT_LOCALE,
          i18n_d_dateStringToSgDateString as dateStringToSgDateString,
          i18n_d_dateStringToString as dateStringToString,
          i18n_d_dateTimeStringToSgDateTimeString as dateTimeStringToSgDateTimeString,
          i18n_d_dateTimeStringToString as dateTimeStringToString,
          i18n_d_dateTimeToString as dateTimeToString,
          i18n_d_dateToString as dateToString,
          i18n_d_extractDiscount as extractDiscount,
          i18n_d_getCurrencySymbol as getCurrencySymbol,
          i18n_d_getDetailDiscountRate as getDetailDiscountRate,
          i18n_d_getDiscountRate as getDiscountRate,
          i18n_d_getRegionsPublic as getRegionsPublic,
          i18n_d_isMultilingual as isMultilingual,
          i18n_d_numberToString as numberToString,
          i18n_d_sgDateStringToDateString as sgDateStringToDateString,
          i18n_d_sgDateTimeStringToDateTimeString as sgDateTimeStringToDateTimeString,
          i18n_d_stringToDate as stringToDate,
          i18n_d_stringToDateTime as stringToDateTime,
          i18n_d_stringToNumber as stringToNumber
        };
      }
      declare namespace Pixel {
        export {
          pixelmatch_d_compareImages as compareImages,
          pixelmatch_d_pixelmatch as pixelmatch
        };
      }
    }
    namespace crypt {
      declare namespace aes {
        export {
          aes_d_EncryptInterface as EncryptInterface,
          aes_d_base64ToJson as base64ToJson,
          aes_d_cajess as cajess,
          aes_d_dcajess as dcajess
        };
      }

      declare namespace des {
        export { des_d_desEncrypt as desEncrypt, des_d_desEncryptForSP as desEncryptForSP };
      }

      declare namespace rsa {
        export {
          rsa_d_RSAKeyPair as RSAKeyPair,
          rsa_d_encryptedString as encryptedString,
          rsa_d_setMaxDigits as setMaxDigits
        };
      }
    }
    namespace ctx {
      export {
        env_CLIENT_TYPE as CLIENT_TYPE,
        env_DEVICE_TYPE as DEVICE_TYPE,
        env_GetI18NColumnCode as GetI18NColumnCode,
        env_getClientType as getClientType,
        env_getDeviceSystem as getDeviceSystem,
        env_getI18NCode as getI18NCode,
        env_getLocaleInfo as getLocaleInfo,
        env_getSupportLanguages as getSupportLanguages,
        env_isMobile as isMobile,
        env_isPC as isPC,
        env_isWeb as isWeb
      };
    }
    namespace storage {
      declare namespace LocalStorage {
        export { deleteItem$1 as deleteItem, getItem$1 as getItem, setItem$1 as setItem };
      }

      declare namespace SessionStorage {
        export {
          sessionStorage_d_deleteItem as deleteItem,
          sessionStorage_d_getItem as getItem,
          sessionStorage_d_setItem as setItem
        };
      }

      declare namespace Cookie {
        export { cookie_d_create as create, cookie_d_read as read, cookie_d_remove as remove };
      }
    }
  }
}

declare namespace Funcs {
  export {
    math_d_abs as abs,
    math_d_bankersRounding as bankersRounding,
    math_d_max as max,
    math_d_min as min,
    math_d_mod as mod,
    math_d_power as power,
    math_d_preciseAdd as preciseAdd,
    math_d_preciseDivide as preciseDivide,
    math_d_preciseMultiply as preciseMultiply,
    math_d_preciseSubtract as preciseSubtract,
    math_d_round as round,
    math_d_sign as sign,
    math_d_sqrt as sqrt,
    math_d_trunc as trunc
  };
}
