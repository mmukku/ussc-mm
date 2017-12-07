import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import HomeLink from '../components/homeLink';
import PartsLink from '../components/partsLink';
import GuideLinesLink from '../components/guidelinesLink';
import BookmarkLink from '../components/bookmarkLink';
import { ContentWrapper } from '../components/contentwrapper';
import SearchGuidelines from '../components/searchGuidelines';
import Sections from '../data/sections.json';
import GuideLines from '../data/guidelines.json';
import Data from '../data/gl.json';
import Chapters from '../data/chapters.json';
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
        let link = `/gl/${gl.id}`;

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
    let title;
    if (thisgl !== undefined) {
      title = thisgl.title;
      content = thisgl.content;
    }
    this.setState({
      imgContent: imgContent,
      guidelineList: guidelineList,
      id: id,
      textTitle: gl.title,
      chapterId: chapterId,
      sectionId: sectionId,
      partId: partId,
      title: title,
      content: content
    });
  }

  render() {
    let section = _.find(
      Sections,
      s =>
        s.chapter === this.state.chapterId &&
        s.part === this.state.partId &&
        s.id === this.state.sectionId
    );
    var intermediateLink;
    if (section) {
      intermediateLink = (
        <li>
          <GuideLinesLink
            chapterId={this.state.chapterId}
            partId={this.state.partId}
            sectionId={this.state.sectionId}
          >
            PART {this.state.partId} - {section.title}
          </GuideLinesLink>
        </li>
      );
    } else {
      intermediateLink = '';
    }
    let thisChapter = _.find(Chapters, c => c.id === this.state.chapterId);
    var thisChapterTitle;
    if (thisChapter !== undefined) {
      thisChapterTitle = thisChapter.title;
    }
    return (
      <div>
        <section className="usa-section usa-section-black">
          <div className="usa-grid">
            <div className="container-title">
              <span className="container-font-dark-B-2">
                Version 3.14-17
                <br />
              </span>
              <span className="container-font-dark-A-2">
                Guidelines Manual
                <br />
              </span>
              <span className="container-font-dark-B-2">2017</span>
            </div>
          </div>
        </section>
        <section className="usa-section search-global-A">
          <div className="usa-grid">
            <div className="usa-width-one-whole">
              <SearchGuidelines />
            </div>
          </div>
        </section>
        <section className="usa-section usa-section-blue">
          <div className="usa-grid">
            <div className="container-title-c">
              <span className="container-font-dark-B-5">
                CHAPTER {this.state.chapterId}
                <br />
              </span>
            </div>
          </div>
        </section>
        <section className="usa-section usa-section-white">
          <div className="usa-grid">
            <div className="container-title-c">
              <span className="container-font-light-Db">
                {thisChapterTitle}
                <br />
              </span>
            </div>
          </div>
        </section>
        <section className="usa-section breadcrumb-global-A">
          <div className="usa-grid breadcrumb-global-A-1">
            <div className="usa-width-one-whole">
              <ol className="breadcrumb-b">
                <li>
                  <Link to="/home">Guidelines Manual</Link>
                </li>
                <li>
                  <PartsLink chapterId={this.state.chapterId}>
                    CHAPTER {this.state.chapterId}
                  </PartsLink>
                </li>
                {intermediateLink}
                <li className="active">
                  {this.state.id} - {this.state.textTitle}
                </li>
              </ol>
            </div>
          </div>
        </section>
        <BookmarkLink
          path={this.props.location.pathname}
          title={`${this.state.id} - ${this.state.textTitle}`}
        />
        <ContentWrapper
          path={this.props.location.pathname}
          title={`${this.state.id} - ${this.state.textTitle}`}
        >
          <section className="usa-section container-04c">
            <div className="usa-grid">
              <div className="container-05-title">
                <div className="container-05-title-A">
                  <div className="container-05-title-A1">
                    <span className="container-font-light-C">
                      {this.state.id} - {this.state.textTitle}
                    </span>
                  </div>
                </div>
              </div>
              <div className="container-05">
                <div className="container-05-A1">
                  <div className="container-05-A1c">
                    {this.state.imgContent}
                    <div
                      className="container-font-light-Ea"
                      dangerouslySetInnerHTML={{ __html: this.state.content }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
        </ContentWrapper>
        <section
          className="usa-section footer"
          style={{
            borderStyle: 'dotted',
            borderWidth: '0px',
            borderColor: 'grey',
            textAlign: 'center'
          }}
        >
          <div className="usa-grid footer-B">
            <div className="usa-width-one-whole">
              <select onChange={e => (window.location = e.target.value)}>
                <option>Go to</option>
                {this.state.guidelineList}
              </select>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default GuideLine;
