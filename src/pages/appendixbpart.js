import React from 'react';
import data from '../data/appendix-b';
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
    let content = _.find(data, b => b.id === this.props.match.params.part)
      .content;
    return (
      <div>
        <a href="/ab">AppendixB</a>
        <p dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    );
  }
}

export default AppendixBPart;
