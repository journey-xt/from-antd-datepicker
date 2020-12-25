'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

require('antd/lib/tag/style/css');
var _Tag = _interopDefault(require('antd/lib/tag'));
var React = require('react');
var React__default = _interopDefault(React);
var styled = _interopDefault(require('styled-components'));
var lodash = require('lodash');
var moment = _interopDefault(require('moment'));
require('antd/lib/input/style/css');
var _Input = _interopDefault(require('antd/lib/input'));
require('antd/lib/popover/style/css');
var _Popover = _interopDefault(require('antd/lib/popover'));
require('antd/lib/button/style/css');
var _Button = _interopDefault(require('antd/lib/button'));
require('antd/lib/date-picker/style/css');
var _DatePicker = _interopDefault(require('antd/lib/date-picker'));
require('antd/lib/row/style/css');
var _Row = _interopDefault(require('antd/lib/row'));
require('antd/lib/col/style/css');
var _Col = _interopDefault(require('antd/lib/col'));
require('moment/locale/zh-cn');

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function __spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
}
function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
}

var PackLayoutTag = styled(_Tag.CheckableTag)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  &.ant-tag {\n    margin-bottom: 5px;\n    background-color: ", ";\n    cursor: ", ";\n    width: 30px;\n    text-align: center;\n  }\n"], ["\n  &.ant-tag {\n    margin-bottom: 5px;\n    background-color: ", ";\n    cursor: ", ";\n    width: 30px;\n    text-align: center;\n  }\n"])), function (props) {
    return props.disabled && "#f5f5f5";
}, function (props) {
    return props.disabled ? "not-allowed" : "pointer";
});
var PackTag = /** @class */function (_super) {
    __extends(PackTag, _super);
    function PackTag(props) {
        var _this = _super.call(this, props) || this;
        // 点击 具体时间回调
        _this.handleOnChange = function (checked) {
            var _a = _this.props,
                onChange = _a.onChange,
                tags = _a.tags,
                disabled = _a.disabled;
            if (onChange && !disabled) {
                onChange(tags.value, checked);
            }
        };
        _this.state = {};
        return _this;
    }
    PackTag.prototype.render = function () {
        var _a = this.props,
            children = _a.children,
            checked = _a.checked,
            disabled = _a.disabled;
        return React__default.createElement(PackLayoutTag, { checked: checked, disabled: disabled, onChange: this.handleOnChange }, children);
    };
    return PackTag;
}(React.PureComponent);
var templateObject_1;

var Warp = styled.div(templateObject_1$1 || (templateObject_1$1 = __makeTemplateObject(["\n  text-align: left;\n  user-select: none;\n  width: 182px;\n"], ["\n  text-align: left;\n  user-select: none;\n  width: 182px;\n"])));
var RowTagWarp = styled.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  & .ant-tag:last-child {\n    margin-right: 0;\n  }\n"], ["\n  & .ant-tag:last-child {\n    margin-right: 0;\n  }\n"])));
var PopoverRender = /** @class */function (_super) {
    __extends(PopoverRender, _super);
    function PopoverRender(props) {
        var _this = _super.call(this, props) || this;
        // 点击 具体时间回调
        _this.handleOnChange = function (tag, checked) {
            var onChange = _this.props.onChange;
            if (onChange) {
                onChange(tag, checked);
            }
        };
        _this.state = {};
        return _this;
    }
    PopoverRender.prototype.render = function () {
        var _this = this;
        var _a = this.props,
            rownum = _a.rownum,
            value = _a.value;
        var chunkRownum = lodash.chunk(rownum, 5);
        return React__default.createElement(Warp, null, chunkRownum.map(function (item, index) {
            return React__default.createElement(RowTagWarp, { key: index }, item.map(function (tag) {
                return React__default.createElement(PackTag, { key: tag.value, tags: tag, disabled: tag.disabled, checked: Number(value) === Number(tag.value), onChange: _this.handleOnChange }, tag.value);
            }));
        }));
    };
    return PopoverRender;
}(React.PureComponent);
var templateObject_1$1, templateObject_2;

/**
 * 传入 一个 时间 格式的 字符串 或者 时间戳  转换为momnet
 */
var transformMoment = function (date) {
    var transformDate = moment(date);
    if (date && transformDate.isValid()) {
        return transformDate;
    }
    return undefined;
};

var ValueType;
(function (ValueType) {
    ValueType["TimeStamp"] = "timeStamp";
    ValueType["TimeString"] = "timeString";
    ValueType["Moment"] = "moment";
})(ValueType || (ValueType = {}));
var ValueStatus;
(function (ValueStatus) {
    ValueStatus["Start"] = "start";
    ValueStatus["End"] = "end";
})(ValueStatus || (ValueStatus = {}));

var pattern = {
    dateFormat: /YYYY([A-Za-z_\- \/])MM\1DD/,
    TimeFormat: /HH((:)(mm\2ss|mm))?/ // 时间部分 正则
};

var matchTimeFormat = lodash.memoize(function (regexp) {
    var match = regexp.match(pattern.TimeFormat);
    return match;
});

// 判断 数字小于 10 加‘0’前缀
var fillTen = function (number) {
    if (number < 10) {
        return "0" + number;
    }
    return String(number);
};

var createArray = function (start, end) {
    var array = [];
    var len = end;
    for (var i = start; i < len; i++) {
        array.push(i);
    }
    return array;
};

var InputWarp = styled.div(templateObject_1$2 || (templateObject_1$2 = __makeTemplateObject(["\n  display: inline-block;\n  min-height: 38px;\n  width: 50px;\n  & .ant-input {\n    padding: 4px 16px;\n  }\n"], ["\n  display: inline-block;\n  min-height: 38px;\n  width: 50px;\n  & .ant-input {\n    padding: 4px 16px;\n  }\n"])));
var PackPopover = styled(_Popover)(templateObject_2$1 || (templateObject_2$1 = __makeTemplateObject([""], [""])));
var TimeInput = /** @class */function (_super) {
    __extends(TimeInput, _super);
    function TimeInput(props) {
        var _this = _super.call(this, props) || this;
        // 输入框变化事件
        _this.handleChange = function (e) {
            var max = _this.props.max;
            var newValue = e.target.value;
            if (Number.isNaN(newValue) || Number(newValue) > max) {
                return;
            }
            var disableArray = _this.getDisabled();
            var isDisable = disableArray.some(function (item) {
                return item === Number(newValue);
            });
            if (isDisable) {
                return;
            }
            var _a = _this.props,
                onChange = _a.onChange,
                format = _a.format;
            if (onChange) {
                onChange(newValue || "0", format);
            }
        };
        // 获取禁止选择的时间段
        _this.getDisabled = function () {
            var _a = _this.props,
                disabledTime = _a.disabledTime,
                hour = _a.hour,
                minute = _a.minute,
                format = _a.format;
            if (disabledTime) {
                return disabledTime();
            }
            return [];
        };
        // 根据最大值和间隔 计算数值
        _this.computeTagNumber = function (max, step) {
            var disableArray = _this.getDisabled();
            var array = [];
            var i = 0;
            while (i < max) {
                /* eslint-disable no-loop-func */
                array.push({
                    value: fillTen(i),
                    disabled: disableArray.some(function (item) {
                        return i === item;
                    })
                });
                /* eslint-enable no-loop-func */
                i += step;
            }
            return array;
        };
        // 获得焦点事件
        _this.onFocus = function () {
            if (_this.inputEle && _this.inputEle.current) {
                _this.inputEle.current.input.select();
            }
        };
        // Tag 点击事件
        _this.tagOnClick = function (time) {
            var _a = _this.props,
                onChange = _a.onChange,
                format = _a.format;
            if (onChange) {
                onChange(time || "00", format);
            }
            _this.onFocus();
        };
        // Popover 显示隐藏回调
        _this.onVisibleChange = function (visible) {
            var timePickerOnOpenChange = _this.props.timePickerOnOpenChange;
            if (timePickerOnOpenChange) {
                timePickerOnOpenChange(visible);
            }
            _this.setState({ visible: visible });
        };
        // Input焦点状态按下 回车键 回调
        _this.onPressEnter = function (e) {
            var _a = _this.props,
                timePickerOnOpenChange = _a.timePickerOnOpenChange,
                datePickerOnOpenChange = _a.datePickerOnOpenChange;
            if (timePickerOnOpenChange) {
                timePickerOnOpenChange(false);
            }
            if (datePickerOnOpenChange) {
                datePickerOnOpenChange(false);
            }
        };
        _this.inputEle = React__default.createRef();
        _this.state = {
            visible: false
        };
        return _this;
    }
    TimeInput.prototype.render = function () {
        var _a = this.props,
            value = _a.value,
            format = _a.format,
            max = _a.max,
            step = _a.step,
            reset = __rest(_a, ["value", "format", "max", "step"]);
        var visible = this.state.visible;
        var rownum = this.computeTagNumber(max, step);
        return React__default.createElement(PackPopover, { trigger: "click", mouseEnterDelay: 50, mouseLeaveDelay: 0, visible: visible, getPopupContainer: function (triggerNode) {
                return triggerNode;
            }, autoAdjustOverflow: true, onVisibleChange: this.onVisibleChange, overlayStyle: { padding: "12px 4px" }, content: React__default.createElement(PopoverRender, __assign({}, reset, { value: value, rownum: rownum, onChange: this.tagOnClick })), placement: format === "HH" ? "topLeft" : "top" }, React__default.createElement(InputWarp, null, React__default.createElement(_Input, { ref: this.inputEle, value: value, onChange: this.handleChange, onFocus: this.onFocus, onPressEnter: this.onPressEnter })));
    };
    return TimeInput;
}(React.PureComponent);
var templateObject_1$2, templateObject_2$1;

var HOUR = "HH";
var MINUTE = "mm";
var SEC = "ss";
var HMS = "HH:mm:ss";
var TIMEFORMAT = [{ format: HOUR, des: "时" }, { format: MINUTE, des: "分" }, { format: SEC, des: "秒" }];

var Warp$1 = styled.div(templateObject_1$3 || (templateObject_1$3 = __makeTemplateObject(["\n  padding: 5px 0;\n"], ["\n  padding: 5px 0;\n"])));
var TimePicker = /** @class */function (_super) {
    __extends(TimePicker, _super);
    function TimePicker(props) {
        var _this = _super.call(this, props) || this;
        // 根据format渲染文字
        _this.formatRender = function (format) {
            var font = TIMEFORMAT.find(function (item) {
                return item.format === format;
            });
            if (font) {
                return font.des;
            }
            return "-";
        };
        // 根据 format获得时间间隔 最大值
        _this.formatStep = function (format) {
            var _a = _this.props,
                _b = _a.hourStep,
                hourStep = _b === void 0 ? 1 : _b,
                _c = _a.minuteStep,
                minuteStep = _c === void 0 ? 5 : _c,
                _d = _a.secondStep,
                secondStep = _d === void 0 ? 10 : _d,
                disabledHours = _a.disabledHours,
                disabledMinutes = _a.disabledMinutes,
                disabledSeconds = _a.disabledSeconds;
            var value = _this.state.value;
            var hour = value.hour();
            var minute = value.minute();
            var second = value.second();
            switch (format) {
                case MINUTE:
                    // 为分钟的input框的值
                    return {
                        step: minuteStep,
                        max: 60,
                        value: fillTen(minute),
                        disabledTime: disabledMinutes,
                        hour: hour,
                        minute: minute
                    };
                case SEC:
                    // 为秒的input框的值
                    return {
                        step: secondStep,
                        max: 60,
                        value: fillTen(second),
                        disabledTime: disabledSeconds,
                        hour: hour,
                        minute: minute
                    };
                case HOUR: // 为小时的input框的值
                default:
                    // 默认为  小时
                    return {
                        step: hourStep,
                        max: 24,
                        value: fillTen(hour),
                        disabledTime: disabledHours,
                        hour: hour,
                        minute: minute
                    };
            }
        };
        /* 单一一项 数值变化
          @params
          timeStr:string
          format:string */
        _this.handleOnChange = function (timeStr, format) {
            var value = _this.state.value;
            var newValue = _this.timeChangeSetTime(format, value, timeStr);
            var timeOnChange = _this.props.timeOnChange;
            if (timeOnChange) {
                timeOnChange(newValue);
            } else {
                _this.setState({ value: newValue });
            }
        };
        // 设置时间 返回时间对象
        _this.timeChangeSetTime = function (format, time, timeStr) {
            switch (format) {
                case HOUR:
                    return time.hour(timeStr);
                case MINUTE:
                    return time.minute(timeStr);
                case SEC:
                    return time.second(timeStr);
                default:
                    return time;
            }
        };
        // 返回分隔符号
        _this.splitSymbol = lodash.memoize(function (format) {
            var match = matchTimeFormat(format);
            if (match && Array.isArray(match)) {
                return match[2];
            }
            return false;
        });
        _this.state = {
            value: props.value
        };
        return _this;
    }
    TimePicker.getDerivedStateFromProps = function (props) {
        var value = props.value;
        if (value) {
            return { value: transformMoment(value) };
        }
        return { value: undefined };
    };
    TimePicker.prototype.render = function () {
        var _this = this;
        var _a = this.props,
            format = _a.format,
            timePickerOnOpenChange = _a.timePickerOnOpenChange,
            datePickerOnOpenChange = _a.datePickerOnOpenChange;
        var splitSymbol = this.splitSymbol(format);
        var splitFormat = format ? format.split(splitSymbol) : [];
        return React__default.createElement(Warp$1, null, splitFormat.map(function (item) {
            return React__default.createElement("span", { key: item }, React__default.createElement(TimeInput, __assign({ format: item }, _this.formatStep(item), { onChange: _this.handleOnChange, timePickerOnOpenChange: timePickerOnOpenChange, datePickerOnOpenChange: datePickerOnOpenChange })), _this.formatRender(item));
        }));
    };
    TimePicker.defaultProps = {
        hourStep: 1,
        minuteStep: 5,
        secondStep: 10,
        format: HMS
    };
    return TimePicker;
}(React.PureComponent);
var templateObject_1$3;

var PackDataPick = styled(_DatePicker)(templateObject_1$4 || (templateObject_1$4 = __makeTemplateObject(["\n  width: 100%;\n"], ["\n  width: 100%;\n"])));
var RenderTimeWarp = styled.div(templateObject_2$2 || (templateObject_2$2 = __makeTemplateObject(["\n  padding-right: 50px;\n  position: relative;\n  .ant-btn {\n    position: absolute;\n    right: 0;\n    top: 50%;\n    margin-top: -12px;\n  }\n"], ["\n  padding-right: 50px;\n  position: relative;\n  .ant-btn {\n    position: absolute;\n    right: 0;\n    top: 50%;\n    margin-top: -12px;\n  }\n"])));
var SingleDatePicker = /** @class */function (_super) {
    __extends(SingleDatePicker, _super);
    function SingleDatePicker(props) {
        var _this = _super.call(this, props) || this;
        // 不可选择时间回调
        _this.disabledDate = function (currentDate) {
            var _a = _this.props,
                disabledDate = _a.disabledDate,
                selectTodayAfter = _a.selectTodayAfter,
                valueStatus = _a.valueStatus;
            // 传递外层API 禁用日期
            if (disabledDate && currentDate) {
                return disabledDate(currentDate, valueStatus);
            }
            if (selectTodayAfter) {
                var compareDate = _this.state.currentDate;
                if (currentDate) {
                    return currentDate.isBefore(compareDate, "second");
                }
                return false;
            }
            return false;
        };
        // 根据传递回来的 moment对象 取得 开始时间戳 和结束时间戳
        _this.timeStampBack = function (date, valueStatus) {
            var _a = _this.props,
                valueType = _a.valueType,
                format = _a.format;
            var timeFormat = _this.state.timeFormat;
            switch (valueType) {
                case ValueType.TimeStamp:
                    if (timeFormat) {
                        return date ? date.valueOf() : null;
                    }
                    switch (valueStatus) {
                        case ValueStatus.Start:
                            return date ? date.startOf("day").valueOf() : null;
                        case ValueStatus.End:
                            return date ? date.endOf("day").valueOf() : null;
                        default:
                            return date ? date.valueOf() : null;
                    }
                case ValueType.TimeString:
                    return date ? date.format(format) : null;
                case ValueType.Moment:
                default:
                    return date;
            }
        };
        // 时间变化回调
        _this.onChange = function (date, dateString) {
            var _a = _this.props,
                valueType = _a.valueType,
                valueStatus = _a.valueStatus,
                onChange = _a.onChange;
            console.log(date);
            var timeFormat = _this.state.timeFormat;
            // 解决 date 组件 隐藏
            if (timeFormat) {
                _this.setState({ dateLayer: true });
            }
            if (onChange) {
                switch (valueType) {
                    case ValueType.TimeStamp:
                        return onChange(_this.timeStampBack(date, valueStatus), valueStatus);
                    case ValueType.TimeString:
                        return onChange(dateString, valueStatus);
                    case ValueType.Moment:
                    default:
                        return onChange(date, valueStatus);
                }
            } else {
                _this.setState({ value: date || undefined });
            }
        };
        // 禁用小时回调
        _this.disabledHours = function () {
            var _a = _this.props,
                disabledHours = _a.disabledHours,
                valueStatus = _a.valueStatus,
                selectTodayAfter = _a.selectTodayAfter;
            var _b = _this.state,
                currentDate = _b.currentDate,
                value = _b.value;
            if (disabledHours) {
                return disabledHours(currentDate, valueStatus);
            }
            if (selectTodayAfter) {
                // 被选中时间
                var selectDate = transformMoment(value);
                // 当前小时数
                var currentHour = currentDate.hour();
                // 如果有选中时间
                if (selectDate) {
                    // 判断选中时间 是否 是当前时间  且是当日
                    var isSameStartCurrent = selectDate.isSame(currentDate, "day");
                    // 同为当日 不可选取 已过时间小时
                    if (isSameStartCurrent) {
                        return __spreadArrays(createArray(0, currentHour));
                    }
                    return [];
                }
                return __spreadArrays(createArray(0, currentHour));
            }
            return [];
        };
        // 禁用分钟回调
        _this.disabledMinutes = function () {
            var _a = _this.props,
                disabledMinutes = _a.disabledMinutes,
                valueStatus = _a.valueStatus,
                selectTodayAfter = _a.selectTodayAfter;
            var _b = _this.state,
                currentDate = _b.currentDate,
                value = _b.value;
            if (disabledMinutes) {
                return disabledMinutes(currentDate, valueStatus);
            }
            if (selectTodayAfter) {
                // 被选中时间
                var selectDate = transformMoment(value);
                // 当前分钟
                var currentMinute = currentDate.minute();
                // 如果有选中时间
                if (selectDate) {
                    // 判断选中时间 是否 是当前时间  且是当日
                    var isSameStartCurrent = selectDate.isSame(currentDate, "hour");
                    // 同为当日 不可选取 已过时间小时
                    if (isSameStartCurrent) {
                        return __spreadArrays(createArray(0, currentMinute));
                    }
                    return [];
                }
                return __spreadArrays(createArray(0, currentMinute));
            }
            return [];
        };
        // 禁用秒回调
        _this.disabledSeconds = function () {
            var _a = _this.props,
                disabledSeconds = _a.disabledSeconds,
                valueStatus = _a.valueStatus,
                selectTodayAfter = _a.selectTodayAfter;
            var _b = _this.state,
                currentDate = _b.currentDate,
                value = _b.value;
            if (disabledSeconds) {
                return disabledSeconds(currentDate, valueStatus);
            }
            if (selectTodayAfter) {
                // 被选中时间
                var selectDate = transformMoment(value);
                // 当前 秒
                var currentSecond = currentDate.second();
                // 如果有选中时间
                if (selectDate) {
                    // 判断选中时间 是否 是当前时间  且是当日
                    var isSameStartCurrent = selectDate.isSame(currentDate, "minute");
                    // 同为当日 不可选取 已过时间小时
                    if (isSameStartCurrent) {
                        return __spreadArrays(createArray(0, currentSecond));
                    }
                    return [];
                }
                return __spreadArrays(createArray(0, currentSecond));
            }
            return [];
        };
        // 添加额外的的页脚render
        // 需要选择 时分秒生成module
        _this.renderExtraFooter = function () {
            var _a = _this.props,
                value = _a.value,
                defaultPickerValue = _a.defaultPickerValue;
            var timeFormat = _this.state.timeFormat;
            if (timeFormat) {
                var currentDate = _this.state.currentDate;
                return React__default.createElement(RenderTimeWarp, null, React__default.createElement(TimePicker, { format: timeFormat, disabledHours: _this.disabledHours, disabledMinutes: _this.disabledMinutes, disabledSeconds: _this.disabledSeconds, timePickerOnOpenChange: _this.timePickOnOpenChange, datePickerOnOpenChange: _this.onOpenChange, timeOnChange: _this.timeOnChange, value: value || defaultPickerValue || currentDate }), React__default.createElement(_Button, { size: "small", type: "primary", onClick: _this.pickerConfirm }, "\u786E\u5B9A"));
            }
            return null;
        };
        // 时间组件 数值变化回调
        _this.timeOnChange = function (time) {
            var format = _this.props.format;
            _this.onChange(time, time.format(format));
        };
        // 组件确认按钮回调
        _this.pickerConfirm = function () {
            _this.setState({ dateLayer: false });
        };
        // 文档写的是 显示面板回调  但是貌似是 获取焦点和失去焦点回调
        _this.onOpenChange = function (status) {
            console.log(status);
            if (_this.timeLayer) {
                return;
            }
            var value = _this.state.value;
            if (!value && status) {
                _this.setState({ dateLayer: status, currentDate: moment() });
            } else {
                _this.setState({ dateLayer: status });
            }
        };
        // 时间组件 面板回调
        _this.timePickOnOpenChange = function (status) {
            _this.timeLayer = status;
        };
        _this.timeLayer = false;
        _this.state = {
            currentDate: moment(),
            value: props.value,
            dateLayer: false,
            timeFormat: ""
        };
        return _this;
    }
    SingleDatePicker.getDerivedStateFromProps = function (props, state) {
        var value = props.value,
            format = props.format;
        var stateValue = state.stateValue;
        var timeFormatMatch = matchTimeFormat(format);
        if (value) {
            return {
                value: value,
                timeFormat: Array.isArray(timeFormatMatch) ? timeFormatMatch[0] : ""
            };
        }
        return {
            value: stateValue || undefined,
            timeFormat: Array.isArray(timeFormatMatch) ? timeFormatMatch[0] : ""
        };
    };
    SingleDatePicker.prototype.render = function () {
        var _a = this.state,
            value = _a.value,
            dateLayer = _a.dateLayer,
            currentDate = _a.currentDate;
        var _b = this.props,
            defaultPickerValue = _b.defaultPickerValue,
            showToday = _b.showToday,
            format = _b.format,
            placeholder = _b.placeholder,
            getCalendarContainer = _b.getCalendarContainer,
            disabled = _b.disabled,
            allowClear = _b.allowClear;
        var extendsPlaceholder = placeholder ? { placeholder: placeholder } : {};
        return React__default.createElement(PackDataPick, __assign({ format: format }, extendsPlaceholder, { value: transformMoment(value), getCalendarContainer: getCalendarContainer, onOpenChange: this.onOpenChange, disabled: disabled, allowClear: allowClear, onChange: this.onChange,
            // @ts-ignore
            disabledDate: this.disabledDate, defaultPickerValue: defaultPickerValue || currentDate, showToday: showToday, renderExtraFooter: this.renderExtraFooter, open: dateLayer }));
    };
    SingleDatePicker.defaultProps = {
        valueType: ValueType.TimeStamp,
        format: "YYYY-MM-DD"
    };
    return SingleDatePicker;
}(React.PureComponent);
var templateObject_1$4, templateObject_2$2;

var LayoutCol = styled(_Col)(templateObject_1$5 || (templateObject_1$5 = __makeTemplateObject(["\n  position: relative;\n"], ["\n  position: relative;\n"])));
var LayoutDiv = styled.div(templateObject_2$3 || (templateObject_2$3 = __makeTemplateObject(["\n  position: absolute;\n  left: 50%;\n  top: 0;\n  bottom: 0;\n"], ["\n  position: absolute;\n  left: 50%;\n  top: 0;\n  bottom: 0;\n"])));
var RelationSpan = styled.div(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  position: relative;\n  height: 100%;\n  right: 50%;\n"], ["\n  position: relative;\n  height: 100%;\n  right: 50%;\n"])));
var DisplayTable = styled.div(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  display: table;\n  height: 100%;\n"], ["\n  display: table;\n  height: 100%;\n"])));
var DisplayTableCell = styled.div(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n  display: table-cell;\n  vertical-align: middle;\n"], ["\n  display: table-cell;\n  vertical-align: middle;\n"])));
var RangePicker = /** @class */function (_super) {
    __extends(RangePicker, _super);
    function RangePicker(props) {
        var _a;
        var _this = _super.call(this, props) || this;
        // 不可选择时间回调
        _this.disabledDate = function (currentDate, valueStatus) {
            var _a = _this.props,
                disabledDate = _a.disabledDate,
                selectTodayAfter = _a.selectTodayAfter;
            // 上层 不可选择时间段 回调
            if (disabledDate) {
                return disabledDate(currentDate, valueStatus);
            }
            var _b = _this.state,
                value = _b.value,
                compareDate = _b.currentDate;
            var startTime = value[ValueStatus.Start];
            var endTime = value[ValueStatus.End];
            switch (valueStatus) {
                case ValueStatus.Start:
                    if (selectTodayAfter) {
                        if (currentDate && !endTime) {
                            return currentDate.isBefore(compareDate);
                        }
                        if (currentDate && endTime) {
                            return currentDate.isBefore(compareDate) || currentDate.isAfter(endTime);
                        }
                        return false;
                    }
                    return currentDate && endTime ? currentDate.isAfter(endTime) : false;
                case ValueStatus.End:
                    if (selectTodayAfter) {
                        if (currentDate && !startTime) {
                            return currentDate.isBefore(compareDate);
                        }
                        if (currentDate && startTime) {
                            return currentDate.isBefore(startTime);
                        }
                        return false;
                    }
                    return currentDate && startTime ? currentDate.isBefore(startTime) : false;
                default:
                    return true;
            }
        };
        //  时间变化回调
        _this.onChange = function (value, valueStatus) {
            var _a, _b, _c, _d, _e;
            var onChange = _this.props.onChange;
            var stateValue = _this.state.value;
            var start = stateValue.start,
                end = stateValue.end;
            if (onChange) {
                switch (valueStatus) {
                    case ValueStatus.Start:
                        if (end && value) {
                            onChange((_a = {}, _a[ValueStatus.Start] = moment(value).isAfter(end) ? end : value, _a[ValueStatus.End] = end, _a));
                            return;
                        }
                        onChange(__assign(__assign({}, stateValue), valueStatus ? (_b = {}, _b[valueStatus] = value || undefined, _b) : {}));
                        break;
                    case ValueStatus.End:
                        if (start && value) {
                            onChange((_c = {}, _c[ValueStatus.Start] = start, _c[ValueStatus.End] = moment(value).isBefore(start) ? start : value, _c));
                            return;
                        }
                        onChange(__assign(__assign({}, stateValue), valueStatus ? (_d = {}, _d[valueStatus] = value || undefined, _d) : {}));
                        break;
                    default:
                        onChange(__assign({}, stateValue));
                }
            } else {
                _this.setState({
                    value: __assign(__assign({}, stateValue), valueStatus ? (_e = {}, _e[valueStatus] = value, _e) : {})
                });
            }
        };
        // 禁用小时
        _this.disabledHours = function (currentDate, valueStatus) {
            var value = _this.state.value;
            var end = value.end,
                start = value.start;
            var selectTodayAfter = _this.props.selectTodayAfter;
            var currentHour = currentDate.hour();
            switch (valueStatus) {
                case ValueStatus.Start:
                    var isSameStartCurrent = (start ? moment(start) : currentDate).isSame(currentDate, "day");
                    if (!end) {
                        return selectTodayAfter && isSameStartCurrent ? __spreadArrays(_this.createArray(0, currentHour)) : [];
                    }
                    var endMonet = moment(end);
                    var statusStartendHour = endMonet.hour();
                    var startIsEnd = (start ? moment(start) : currentDate).isSame(endMonet, "day");
                    return __spreadArrays(selectTodayAfter ? _this.createArray(0, currentHour) : [], startIsEnd ? _this.createArray(statusStartendHour + 1, 24) : []);
                case ValueStatus.End:
                    var isSameEndCurrent = (end ? moment(end) : currentDate).isSame(currentDate, "day");
                    if (!start) {
                        return selectTodayAfter && isSameEndCurrent ? __spreadArrays(_this.createArray(0, currentHour)) : [];
                    }
                    var startMonet = moment(start);
                    var statusEndStartHour = startMonet.hour();
                    var endIsStart = (end ? moment(end) : currentDate).isSame(startMonet, "day");
                    return __spreadArrays(selectTodayAfter && isSameEndCurrent ? _this.createArray(0, currentHour) : [], endIsStart ? __spreadArrays(_this.createArray(0, statusEndStartHour)) : []);
                default:
                    return [];
            }
        };
        // 禁用分钟
        _this.disabledMinutes = function (currentDate, valueStatus) {
            var value = _this.state.value;
            var end = value.end,
                start = value.start;
            var selectTodayAfter = _this.props.selectTodayAfter;
            var currentMinute = currentDate.minute();
            switch (valueStatus) {
                case ValueStatus.Start:
                    var isSameCurrenthour = (start ? moment(start) : currentDate).isSame(currentDate, "hour");
                    if (end) {
                        var endMinute = moment(end).minute();
                        var isSameEndHour = (start ? moment(start) : currentDate).isSame(end, "hour");
                        return __spreadArrays(selectTodayAfter && isSameCurrenthour ? _this.createArray(0, currentMinute) : [], isSameEndHour ? _this.createArray(endMinute + 1, 60) : []);
                    }
                    return __spreadArrays(selectTodayAfter && isSameCurrenthour ? _this.createArray(0, currentMinute) : []);
                case ValueStatus.End:
                    var statusEndisSameCurrentHour = (end ? moment(end) : currentDate).isSame(currentDate, "hour");
                    if (start) {
                        var isSameStartHour = (end ? moment(end) : currentDate).isSame(start, "hour");
                        var startMinute = moment(start).minute();
                        return __spreadArrays(selectTodayAfter && statusEndisSameCurrentHour ? _this.createArray(0, currentMinute) : [], isSameStartHour ? _this.createArray(0, startMinute) : []);
                    }
                    return __spreadArrays(selectTodayAfter && statusEndisSameCurrentHour ? _this.createArray(0, currentMinute) : []);
                default:
                    return [];
            }
        };
        // 禁用秒
        _this.disabledSeconds = function (currentDate, valueStatus) {
            var value = _this.state.value;
            var end = value.end,
                start = value.start;
            var selectTodayAfter = _this.props.selectTodayAfter;
            var currentMinute = currentDate.second();
            switch (valueStatus) {
                case ValueStatus.Start:
                    var isSameCurrenthour = (start ? moment(start) : currentDate).isSame(currentDate, "minute");
                    if (end) {
                        var endMinute = moment(end).second();
                        var isSameEndHour = (start ? moment(start) : currentDate).isSame(end, "minute");
                        return __spreadArrays(selectTodayAfter && isSameCurrenthour ? _this.createArray(0, currentMinute) : [], isSameEndHour ? _this.createArray(endMinute + 1, 60) : []);
                    }
                    return __spreadArrays(selectTodayAfter && isSameCurrenthour ? _this.createArray(0, currentMinute) : []);
                case ValueStatus.End:
                    var statusEndisSameCurrentHour = (end ? moment(end) : currentDate).isSame(currentDate, "minute");
                    if (start) {
                        var isSameStartHour = (end ? moment(end) : currentDate).isSame(start, "minute");
                        var startMinute = moment(start).second();
                        return __spreadArrays(selectTodayAfter && statusEndisSameCurrentHour ? _this.createArray(0, currentMinute) : [], isSameStartHour ? _this.createArray(0, startMinute) : []);
                    }
                    return __spreadArrays(selectTodayAfter && statusEndisSameCurrentHour ? _this.createArray(0, currentMinute) : []);
                default:
                    return [];
            }
        };
        // 生成 对应数组
        _this.createArray = function (start, end) {
            var array = [];
            var len = end;
            for (var i = start; i < len; i++) {
                array.push(i);
            }
            return array;
        };
        // 结束时间 默认面板日期
        _this.timeDefaultPickerValue = function (type) {
            var value = _this.state.value;
            if (value[type]) {
                return moment(value[type]);
            }
            return moment(new Date());
        };
        _this.state = {
            currentDate: moment(),
            value: (_a = {}, _a[ValueStatus.Start] = undefined, _a[ValueStatus.End] = undefined, _a)
        };
        return _this;
    }
    RangePicker.getDerivedStateFromProps = function (props) {
        var _a, _b;
        var value = props.value;
        if (value && (value[ValueStatus.Start] || value[ValueStatus.End])) {
            return {
                value: (_a = {}, _a[ValueStatus.Start] = value[ValueStatus.Start], _a[ValueStatus.End] = value[ValueStatus.End], _a)
            };
        }
        return {
            value: (_b = {}, _b[ValueStatus.Start] = undefined, _b[ValueStatus.End] = undefined, _b)
        };
    };
    RangePicker.prototype.render = function () {
        var value = this.state.value;
        var startTime = value[ValueStatus.Start];
        var endTime = value[ValueStatus.End];
        var _a = this.props,
            showToday = _a.showToday,
            format = _a.format,
            selectTodayAfter = _a.selectTodayAfter,
            valueType = _a.valueType,
            placeholder = _a.placeholder,
            getCalendarContainer = _a.getCalendarContainer,
            disabled = _a.disabled,
            allowClear = _a.allowClear;
        return React__default.createElement(_Row, { gutter: 24 }, React__default.createElement(LayoutCol, { span: 12 }, React__default.createElement(SingleDatePicker, { placeholder: placeholder ? placeholder[0] : undefined, format: format, value: startTime, showToday: showToday, valueType: valueType, valueStatus: ValueStatus.Start, disabled: disabled && Array.isArray(disabled) ? disabled[0] : disabled, allowClear: allowClear && Array.isArray(allowClear) ? allowClear[0] : allowClear, disabledDate: this.disabledDate, disabledHours: this.disabledHours, disabledMinutes: this.disabledMinutes, disabledSeconds: this.disabledSeconds, selectTodayAfter: selectTodayAfter, onChange: this.onChange, defaultPickerValue: endTime ? moment(endTime) : undefined, getCalendarContainer: getCalendarContainer })), React__default.createElement(LayoutDiv, { key: "static" }, React__default.createElement(RelationSpan, null, React__default.createElement(DisplayTable, null, React__default.createElement(DisplayTableCell, null, "~")))), React__default.createElement(_Col, { span: 12 }, React__default.createElement(SingleDatePicker, { placeholder: placeholder ? placeholder[1] : undefined, format: format, value: endTime, showToday: showToday, valueType: valueType, selectTodayAfter: selectTodayAfter, valueStatus: ValueStatus.End, disabled: disabled && Array.isArray(disabled) ? disabled[0] : disabled, allowClear: allowClear && Array.isArray(allowClear) ? allowClear[0] : allowClear, disabledDate: this.disabledDate, disabledHours: this.disabledHours, disabledMinutes: this.disabledMinutes, disabledSeconds: this.disabledSeconds, onChange: this.onChange, defaultPickerValue: startTime ? moment(startTime) : undefined, getCalendarContainer: getCalendarContainer })));
    };
    RangePicker.defaultProps = {
        valueType: ValueType.TimeStamp,
        format: "YYYY-MM-DD",
        valueStatus: ValueStatus.Start,
        showToday: true
    };
    return RangePicker;
}(React.Component);
var templateObject_1$5, templateObject_2$3, templateObject_3, templateObject_4, templateObject_5;

moment.locale("zh-cn");

exports.RangePicker = RangePicker;
exports.default = SingleDatePicker;
//# sourceMappingURL=index.js.map
