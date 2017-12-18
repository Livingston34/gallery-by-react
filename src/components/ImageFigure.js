import React, { Component } from 'react';

export default class ImageFigure extends Component {

  render() {
    var styleObj = {};

    if (this.props.arrange.pos) {
      styleObj = this.props.arrange.pos;
    }
    console.log(this.props)
    return (
      <figure className="img-figure" style={styleObj}>
        <img src={this.props.data.imageURL}
             alt={this.props.data.title}/>
        <figcaption>
          <h2 className="img-title">{this.props.data.title}</h2>
        </figcaption>
      </figure>
    );
  }
}
