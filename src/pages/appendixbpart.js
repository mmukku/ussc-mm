import React from 'react';
import data from '../data/appendix-b';

import BookmarkLink from '../components/bookmarkLink';
import { ContentWrapper } from '../components/contentwrapper';
import scrollToElment from 'scroll-to-element';
import _ from 'lodash';

class AppendixBPart extends React.Component {
  componentDidMount() {
    let hash = this.props.history.location.hash;
    if (hash) {
      scrollToElment(hash, { ease: null, duration: 0 });
    }
  }
  render() {
    let data_object = _.find(data, b => b.id === this.props.match.params.part);
    let content = data_object.content;
    let id = data_object.id;
    return (
      <div>
        <BookmarkLink
          path={this.props.location.pathname}
          title={`Appendix B - ${id}`}
        />
        <ContentWrapper
          path={this.props.location.pathname}
          title={`Appendix B - ${id}`}
        >
          <a href="/ab">AppendixB</a>
          <p dangerouslySetInnerHTML={{ __html: content }} />
        </ContentWrapper>
      </div>
    );
  }
}

export default AppendixBPart;
