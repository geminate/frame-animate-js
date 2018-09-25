## Introduction

A javascript lib to create frame-by-frame animation.

## Install

You can install frame-animate by npm.

```javascript
$ npm install frame-animate-js
```

or use script label

```html
<script src="../dist/index.js"></script>
```

## Config

| config      |  instruction                 |  example
| --------    | -----                        |  -----
| dom         | animate container            |  document.querySelector("#test")
| frameNumber | total number of frames       |  16
| delay       | interval between two frames  |  70
| imgPath     | source image path            |  './app-download.png'
| imgWidth    | source image width           |  1280

## Api

#### 1. playForward(start, end)

Start animate and play forward from one frame to another.

#### 2. playBack(start, end)

Start animate and play back from one frame to another.

#### 3. reset()

Reset animate, stop animate and move to first frame.

#### 4. pause()

Pause animate.

#### 5. addFrameCallBack(frameNumber, func)

Call the function when the animation is playing to the specified frame.

#### 6. removeFrameCallBack(callback)

Remove a callback.

#### 7. getCurrentFrame()

Return current frame number.

## Example

All the following examples use this picture as material.(from bilibili.com)

![image](https://raw.githubusercontent.com/geminate/frame-animate-js/master/blob/app-download.png)

### Basic

![image](https://raw.githubusercontent.com/geminate/frame-animate-js/master/blob/basic.gif)

```javascript
import FrameAnimate from 'frame-animate-js';

const config = {
    dom: document.querySelector("#test"),
    frameNumber: 16,
    delay: 70,
    imgPath: './app-download.png',
    imgWidth: 1280
};
const frame = new FrameAnimate(config);
frame.playForward();
```

### Loop playback

![image](https://raw.githubusercontent.com/geminate/frame-animate-js/master/blob/loop.gif)

```javascript
import FrameAnimate from 'frame-animate-js';

const config = {
    dom: document.querySelector("#test"),
    frameNumber: 16,
    delay: 70,
    imgPath: './app-download.png',
    imgWidth: 1280
};
const frame = new FrameAnimate(config);
frame.playForward();

frame.addFrameCallBack(0, function () {
    frame.pause();
    frame.playForward();
});

frame.addFrameCallBack(15, function () {
    frame.pause();
    frame.playBack();
});
```

### Complex

![image](https://raw.githubusercontent.com/geminate/frame-animate-js/master/blob/complex.gif)

```javascript
import FrameAnimate from 'frame-animate-js';

const config = {
    dom: document.querySelector("#test"),
    frameNumber: 16,
    delay: 70,
    imgPath: './app-download.png',
    imgWidth: 1280
};
const frame = new FrameAnimate(config);

let callback15, callback9;

document.querySelector("#test").addEventListener("mouseenter", function () {

    callback9 = frame.addFrameCallBack(9, function () {
        frame.pause();
        frame.playForward(9, 15);
    });

    callback15 = frame.addFrameCallBack(15, function () {
        frame.pause();
        frame.playBack(15, 0);
    });

    frame.pause();
    frame.playForward(frame.getCurrentFrame());
});

document.querySelector("#test").addEventListener("mouseleave", function () {
    frame.removeFrameCallBack(callback9);
    frame.removeFrameCallBack(callback15);
    frame.pause();
    frame.playBack(frame.getCurrentFrame(), 0);
});
```

