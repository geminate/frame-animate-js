'use strict';

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

        /**
         * 播放
         */

    }, {
        key: 'play',
        value: function play() {
            var _this = this;

            !this.timer && (this.timer = setInterval(function () {
                _this._changeToFrame(_this.currentFrame);
                _this.currentFrame++;
            }, this.delay));
        }

        /**
         * 重置
         */

    }, {
        key: 'reset',
        value: function reset() {
            this.timer && clearInterval(this.timer);
            this.timer = null;
            this._changeToFrame(0);
        }

        /**
         * 暂停
         */

    }, {
        key: 'pause',
        value: function pause() {
            this.timer && clearInterval(this.timer);
            this.timer = null;
        }
    }]);

    return FrameAnimate;
}();