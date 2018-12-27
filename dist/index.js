'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FrameAnimate = function () {
    function FrameAnimate(_ref) {
        var dom = _ref.dom,
            _ref$frameNumber = _ref.frameNumber,
            frameNumber = _ref$frameNumber === undefined ? 1 : _ref$frameNumber,
            _ref$delay = _ref.delay,
            delay = _ref$delay === undefined ? 50 : _ref$delay,
            imgPath = _ref.imgPath,
            imgWidth = _ref.imgWidth;

        _classCallCheck(this, FrameAnimate);

        this.dom = dom;
        this.frameNumber = frameNumber;
        this.delay = delay;
        this.imgPath = imgPath;
        this.imgWidth = imgWidth;

        this.frameWidth = this.imgWidth / this.frameNumber;
        this.currentFrame = 0;
        this.timer = null;
        this.callBack = [];
        this._init();
    }

    _createClass(FrameAnimate, [{
        key: '_init',
        value: function _init() {
            this.dom.style.backgroundImage = 'url(' + this.imgPath + ')';
        }
    }, {
        key: '_changePosition',
        value: function _changePosition(position) {
            this.dom.style.backgroundPosition = '-' + position + 'px 0px';
        }
    }, {
        key: '_changeToFrame',
        value: function _changeToFrame(frameNum) {
            this.currentFrame = frameNum;
            this._changePosition(frameNum * this.frameWidth);
        }
    }, {
        key: '_alertCallBack',
        value: function _alertCallBack() {
            var _this = this;

            this.callBack.forEach(function (_ref2) {
                var frameNumber = _ref2.frameNumber,
                    func = _ref2.func;

                if (frameNumber == _this.currentFrame) {
                    console.log(_this.currentFrame);
                    console.log(_this.callBack);
                    func();
                }
            });
        }
    }, {
        key: '_clearInterval',
        value: function _clearInterval() {
            this.timer && clearInterval(this.timer);
            this.timer = null;
        }
    }, {
        key: '_play',
        value: function _play(start, end, order) {
            var _this2 = this;

            if (!this.timer) {
                this._changeToFrame(start);
                this.timer = setInterval(function () {
                    if (_this2.currentFrame == end) {
                        _this2._clearInterval();
                    } else {
                        order == 0 && _this2.currentFrame++;
                        order == 1 && _this2.currentFrame--;
                        _this2._changeToFrame(_this2.currentFrame);
                        _this2._alertCallBack();
                    }
                }, this.delay);
            }
        }
    }, {
        key: 'playForward',
        value: function playForward() {
            var start = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
            var end = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.frameNumber - 1;

            this._play(start, end, 0);
        }
    }, {
        key: 'playBack',
        value: function playBack() {
            var start = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.frameNumber - 1;
            var end = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

            this._play(start, end, 1);
        }
    }, {
        key: 'reset',
        value: function reset() {
            this._clearInterval();
            this._changeToFrame(0);
        }
    }, {
        key: 'pause',
        value: function pause() {
            this.timer && clearInterval(this.timer);
            this.timer = null;
        }
    }, {
        key: 'addFrameCallBack',
        value: function addFrameCallBack(frameNumber, func) {
            this.callBack.push({ frameNumber: frameNumber, func: func });
            return frameNumber;
        }
    }, {
        key: 'removeFrameCallBack',
        value: function removeFrameCallBack(frameNumber) {
            var _this3 = this;

            this.callBack.forEach(function (item) {
                if (item.frameNumber == frameNumber) {
                    _this3.callBack.splice(_this3.callBack.indexOf(item), 1);
                }
            });
        }
    }, {
        key: 'getCurrentFrame',
        value: function getCurrentFrame() {
            return this.currentFrame;
        }
    }]);

    return FrameAnimate;
}();

if ((typeof module === 'undefined' ? 'undefined' : _typeof(module)) === "object" && module && _typeof(module.exports) === "object") {
    module.exports = FrameAnimate;
} else if (typeof define === "function" && define.amd) {
    define("FrameAnimate", [], function () {
        return FrameAnimate;
    });
} else if ((typeof window === 'undefined' ? 'undefined' : _typeof(window)) === "object" && _typeof(window.document) === "object") {
    window.FrameAnimate = FrameAnimate;
}