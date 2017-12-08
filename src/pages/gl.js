import React, { Component } from 'react';
import ChapterBreadcrumb from '../components/chapterBreadcrumb';
import GuideLinesLink from '../components/guidelinesLink';
import BookmarkLink from '../components/bookmarkLink';
import { ContentWrapper } from '../components/contentwrapper';
import Sections from '../data/sections.json';
import GuideLines from '../data/guidelines.json';
import Data from '../data/gl.json';
import ContentHeader from '../components/contentHeader';
import ChapterIndicator from '../components/chapterIndicator';
import GoToFooter from '../components/goToFooter';
import BreadcrumbsWrapper from '../components/breadcrumbsWrapper';
import GLMBreadcrumb from '../components/glmBreadcrumb';
import Blockset from '../components/blockset';
import TitleBlock from '../components/titleBlock';
import ContentBlock from '../components/contentBlock';
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
    return (
      <div>
        <ContentHeader />
        <ChapterIndicator id={this.state.chapterId} />
        <BreadcrumbsWrapper>
          <GLMBreadcrumb />
          <ChapterBreadcrumb id={this.state.chapterId} />
          {intermediateLink}
          <li className="active">
            {this.state.id} - {this.state.textTitle}
          </li>
        </BreadcrumbsWrapper>
        <BookmarkLink
          path={this.props.location.pathname}
          title={`${this.state.id} - ${this.state.textTitle}`}
        />
        <ContentWrapper
          path={this.props.location.pathname}
          title={`${this.state.id} - ${this.state.textTitle}`}
        >
          <section className="container-04c">
            <Blockset>
              <TitleBlock>
                {this.state.id} - {this.state.textTitle}
              </TitleBlock>
              <ContentBlock>
                {this.state.imgContent}
                <div
                  className="container-font-light-Ea"
                  dangerouslySetInnerHTML={{ __html: this.state.content }}
                />
              </ContentBlock>
            </Blockset>
          </section>
        </ContentWrapper>
        <GoToFooter list={this.state.guidelineList} />
      </div>
    );
  }
}

export default GuideLine;
