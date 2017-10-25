import React, { Component } from 'react';
import HomeLink from '../components/homeLink';
import PartsLink from '../components/partsLink';
import GuideLinesLink from '../components/guidelinesLink';
import BookmarkLink from '../components/bookmarkLink';
import GuideLines from '../data/guidelines.json';
import Data from '../data/gl.json';
import _ from 'lodash';

class GuideLine extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    this.saveParams(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.saveParams(nextProps);
  }

  saveParams(props) {
    let chapterId = props.match.params.chapterId;
    let partId = props.match.params.part;
    let sectionId = props.match.params.sectionId;
    let id = props.match.params.id;
    if (chapterId === undefined) {
      chapterId = id[1];
      partId = id[2];
      sectionId = id[3];
    }

    let imgContent;

    let guideLines = _.filter(
      GuideLines,
      gl => gl.chapter === chapterId && gl.part === partId
    );

    if (sectionId !== undefined) {
      guideLines = _.filter(GuideLines, gl => gl.section === sectionId);
    }

    let gl = _.find(GuideLines, gl => gl.id === id);

    if (gl !== undefined && gl.img !== undefined) {
      let img = require(`../img/${gl.img}`);
      imgContent = <img src={img} alt="{gl.title}" />;
    }

    let guidelineList = _.map(guideLines, gl => {
      if (gl.id !== id) {
        let link = `/guidelines/${gl.id}`;

        return (
          <option key={gl.id} value={link}>
            {gl.id}
          </option>
        );
      }
      return null;
    });
    let thisgl = _.find(Data, gl => gl.id === id);
    let content;
    if (thisgl != undefined) {
      content = thisgl.content;
    }
    this.setState({
      imgContent: imgContent,
      guidelineList: guidelineList,
      id: id,
      chapterId: chapterId,
      sectionId: sectionId,
      partId: partId,
      content: content
    });
  }

  render() {
    return (
      <div>
        <h6>
          <div className="usa-width-one-half">
            <HomeLink />&nbsp; > &nbsp;<PartsLink
              chapterId={this.state.chapterId}
            >
              Chapter {this.state.chapterId}
            </PartsLink>&nbsp; > &nbsp;
            <GuideLinesLink
              chapterId={this.state.chapterId}
              partId={this.state.partId}
              sectionId={this.state.sectionId}
            >
              Part {this.state.partId}
            </GuideLinesLink>
            &nbsp; > &nbsp; {this.state.id}
          </div>
		  <BookmarkLink path={this.props.location.pathname} />
          <div className="usa-width-one-half">
            <select onChange={e => (window.location = e.target.value)}>
              <option>Go to</option>
              {this.state.guidelineList}
            </select>
          </div>
        </h6>
        <div className="usa-section">
          {this.state.imgContent}
          <div dangerouslySetInnerHTML={{ __html: this.state.content }} />
        </div>
      </div>
    );
  }
}

export default GuideLine;
