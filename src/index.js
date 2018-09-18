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

    /**
     * 播放
     */
    play() {
        !this.timer && (this.timer = setInterval(() => {
            this._changeToFrame(this.currentFrame);
            this.currentFrame++;
        }, this.delay));
    }

    /**
     * 重置
     */
    reset() {
        this.timer && clearInterval(this.timer);
        this.timer = null;
        this._changeToFrame(0);
    }

    /**
     * 暂停
     */
    pause() {
        this.timer && clearInterval(this.timer);
        this.timer = null;
    }

}