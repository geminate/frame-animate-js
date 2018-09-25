class FrameAnimate {

    constructor({dom, frameNumber = 1, delay = 50, imgPath, imgWidth}) {
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

    _init() {
        this.dom.style.backgroundImage = 'url(' + this.imgPath + ')';
    }

    _changePosition(position) {
        this.dom.style.backgroundPosition = `-${position}px 0px`;
    }

    _changeToFrame(frameNum) {
        this.currentFrame = frameNum;
        this._changePosition(frameNum * this.frameWidth);

    }

    _alertCallBack() {
        this.callBack.forEach(({frameNumber, func}) => {
            if (frameNumber == this.currentFrame) {
                console.log(this.currentFrame);
                console.log(this.callBack);
                func();
            }
        })
    }

    _clearInterval() {
        this.timer && clearInterval(this.timer);
        this.timer = null;
    }

    _play(start, end, order) {
        if (!this.timer) {
            this._changeToFrame(start);
            this.timer = setInterval(() => {
                if (this.currentFrame == end) {
                    this._clearInterval();
                } else {
                    order == 0 && this.currentFrame++;
                    order == 1 && this.currentFrame--;
                    this._changeToFrame(this.currentFrame);
                    this._alertCallBack();
                }
            }, this.delay);
        }
    }

    playForward(start = 0, end = this.frameNumber - 1) {
        this._play(start, end, 0);
    }

    playBack(start = this.frameNumber - 1, end = 0) {
        this._play(start, end, 1);
    }

    reset() {
        this._clearInterval();
        this._changeToFrame(0);
    }

    pause() {
        this.timer && clearInterval(this.timer);
        this.timer = null;
    }

    addFrameCallBack(frameNumber, func) {
        this.callBack.push({frameNumber, func});
        return frameNumber;
    }

    removeFrameCallBack(frameNumber) {
        this.callBack.forEach((item) => {
            if (item.frameNumber == frameNumber) {
                this.callBack.splice(this.callBack.indexOf(item), 1)
            }
        })
    }

    getCurrentFrame() {
        return this.currentFrame;
    }

}

module.exports = FrameAnimate;