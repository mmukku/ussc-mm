import React, { Component } from 'react';
import HomeLink from '../components/homeLink';
import PartsLink from '../components/partsLink';
import GuideLinesLink from '../components/guidelinesLink';
import GuideLines from '../data/guidelines.json';
import Remarkable from 'remarkable';

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

    let self = this;
    this.setState({ content: undefined });
    let path = `${process.env.PUBLIC_URL}/${id}.md`;

    fetch(path)
      .then(response => response.text())
      .catch(err => self.setState({ content: err }))
      .then(text => {
        if (!text.startsWith('<!doctype html>')) {
          self.setState({ content: text });
        }
      });

    let imgContent;

    let guideLines = GuideLines.filter(
      gl => gl.chapter === chapterId && gl.part === partId
    );

    if (sectionId !== undefined) {
      guideLines = GuideLines.filter(gl => gl.section === sectionId);
    }

    let gl = GuideLines.find(gl => gl.id === id);

    if (gl !== undefined && gl.img !== undefined) {
      let img = require(`../img/${gl.img}`);
      imgContent = <img src={img} alt="{gl.title}" />;
    }

    let guidelineList = guideLines.map(gl => {
      if (gl.id !== id) {
        let link = `/chapters/${chapterId}/parts/${partId}/guidelines/${gl.id}`;
        if (sectionId !== undefined) {
          link = `/chapters/${chapterId}/parts/${partId}/sections/${sectionId}/guidelines/${gl.id}`;
        }

        return (
          <option key={gl.id} value={link}>
            {gl.id}
          </option>
        );
      }
      return null;
    });

    this.setState({
      imgContent: imgContent,
      guidelineList: guidelineList,
      id: id,
      chapteId: chapterId,
      sectionId: sectionId,
      partId: partId
    });
  }

  getRawMarkup() {
    var md = new Remarkable({ html: true });
    return { __html: md.render(this.state.content) };
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
          <div className="usa-width-one-half">
            <select onChange={e => (window.location = e.target.value)}>
              <option>Go to</option>
              {this.state.guidelineList}
            </select>
          </div>
        </h6>
        <div className="usa-section">
          <h3>
            Chapter {this.state.chapterId} - Part {this.state.partId} -{' '}
            {this.state.sectionId} GuideLine- {this.state.id}
          </h3>
          {this.state.imgContent}
          <div dangerouslySetInnerHTML={this.getRawMarkup()} />
        </div>
      </div>
    );
  }
}

export default GuideLine;
