import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import './App.css';
import ImageFigure from "./components/ImageFigure.js"

// 获取图片相关数据
import imageDataArr from './data/imageData.json';


class App extends Component {

  constructor(){
    super();
    for (var i = 0, j = imageDataArr.length; i < j; i++) {
      var singleImageData = imageDataArr[i];
      singleImageData.imageURL = require('./images/' + singleImageData.fileName);
      imageDataArr[i] = singleImageData;
      imageDataArr[i] = singleImageData;
    }
    this.Constant = {
      centerPos: {
        left: 0,
        top: 0
      },
      hPosRange: {
        leftSecX: [0, 0],
        rightSecX: [0, 0],
        y: [0, 0]
      },
      vPosRange: {
        x: [0, 0],
        topY: [0, 0]
      }
    }
    this.state = {
      imageArrangeArr: [
      ]
    }
  }

  /**
   * 获取区间内的一个随机值
   * @param low
   * @param high
   */
  getRangeRandom(low, high) {
    return Math.ceil(Math.random() * (high - low) + low);
  }

  /**
   * 重新布局所有图片
   * @param centerIndex 指定居中图片的index
   */
  reArrange(centerIndex) {
    var imageArrangeArr = this.state.imageArrangeArr,
        Constant = this.Constant,
        centerPos = Constant.centerPos,
        hPosRange = Constant.hPosRange,
        vPosRange = Constant.vPosRange,
        hPosRangeLeftSecX = hPosRange.leftSecX,
        hPosRangeRightSecX = hPosRange.rightSecX,
        hPosRangeY = hPosRange.y,
        vPosRangeTopY = vPosRange.topY,
        vPosRangeX = vPosRange.x,

        imageArrangeTopArr = [],
        // 取一个图片或者不取
        topImageNum = Math.ceil(Math.random() * 2),
        topImageSpliceIndex = 0,

        imageArrangeCenterArr = imageArrangeArr.splice(centerIndex, 1);

        // 首先剧中centerIndex的图片
        imageArrangeCenterArr[0].pos = centerPos;

        //  取出布局上侧图片的状态信息
        topImageSpliceIndex = Math.ceil(Math.ceil() * (imageArrangeArr.length - topImageNum))
        imageArrangeTopArr = imageArrangeArr.splice(topImageSpliceIndex, topImageNum);

        // 布局位于上侧的图片
        imageArrangeTopArr.forEach(function (value, index) {
          imageArrangeTopArr[index].pos = {
            top: this.getRangeRandom(vPosRangeTopY[0], vPosRangeTopY[1]),
            left: this.getRangeRandom(vPosRangeX[0], vPosRangeX[1])
          }
        }.bind(this));

        // 布局左右两侧的图片
        for(var i = 0, j = imageArrangeArr.length, k = j / 2 ; i < j; i++) {
          var hPosRangeLORX = null;
          // 前半部分布局左边， 右半部分布局右边
          hPosRangeLORX = i < k ? hPosRangeLeftSecX : hPosRangeRightSecX;

          imageArrangeArr[i].pos = {
            top: this.getRangeRandom(hPosRangeY[0], hPosRangeY[1]),
            left: this.getRangeRandom(hPosRangeLORX[0], hPosRangeLORX[1])
          }
        }

        if (imageArrangeTopArr && imageArrangeTopArr[0]) {
          imageArrangeArr.splice(topImageSpliceIndex, 0, imageArrangeTopArr[0])
        }

        imageArrangeArr.splice(centerIndex, 0, imageArrangeCenterArr[0]);

        this.setState({
          imageArrangeArr: imageArrangeArr
        });
  }

  // 组件加载以后，为每张图片计算位置的范围
  componentDidMount() {
    // 首先拿到舞台大小
    var stageDOM = ReactDOM.findDOMNode(this.refs.stage),
        stageW = stageDOM.scrollWidth,
        stageH = stageDOM.scrollHeight,
        halfStageW = Math.ceil(stageW / 2),
        halfStageH = Math.ceil(stageH / 2);

    // 拿到一个ImageFigure的大小
    var imageFigureDOM = ReactDOM.findDOMNode(this.refs.imageFigure0),
        imageW = imageFigureDOM.scrollWidth,
        imageH = imageFigureDOM.scrollHeight,
        halfImageW = Math.ceil(imageW / 2),
        halfImageH = Math.ceil(imageH / 2);

    // 计算中心图片的位置点
    this.Constant.centerPos = {
      left: halfStageW - halfImageW,
      top: halfStageH - halfImageH
    }

    // 计算左右区域图片的位置范围
    this.Constant.hPosRange.leftSecX[0] = -halfImageW;
    this.Constant.hPosRange.leftSecX[1] = halfStageW - halfImageW * 3;
    this.Constant.hPosRange.rightSecX[0] = halfStageW + halfImageW;
    this.Constant.hPosRange.rightSecX[1] = stageW - halfImageW;
    this.Constant.hPosRange.y[0] = -halfImageH;
    this.Constant.hPosRange.y[1] = stageH - halfImageH;

    // 计算上侧区域图片的位置范围
    this.Constant.vPosRange.topY[0] = -halfImageH;
    this.Constant.vPosRange.topY[1] = halfStageH - halfImageH * 3;
    this.Constant.vPosRange.x[0] = halfStageW - imageW;
    this.Constant.vPosRange.x[1] = halfStageW;

    this.reArrange(0);
  }

  render() {

    var controllerUnits = [],
        imageFigures = [];
    imageDataArr.forEach(function (value, index) {
      var key = 'imageFigure' + index;
      if (!this.state.imageArrangeArr[index]) {
        this.state.imageArrangeArr[index] = {
          pos: {
            left: '0',
            top: '0'
          }
        }
      }

      imageFigures.push(<ImageFigure key={key} ref={'imageFigure' + index} data={value}
                   arrange={this.state.imageArrangeArr[index]}/>)
    }.bind(this));
    return (
      <section className="stage" ref="stage">
        <section className="img-sec">
          {imageFigures}
        </section>
        <nav className="controller-nav">

        </nav>
      </section>
    );
  }
}

export default App;
