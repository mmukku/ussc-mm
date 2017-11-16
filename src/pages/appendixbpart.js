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
    var title, titleblock;
    if ('title' in data_object) {
      title = data_object.title;
    } else {
      title = data_object.id;
    }
    if ('titleblock' in data_object) {
      titleblock = (
        <div className="container-05-title-2">
          <div className="container-05-title-B">
            <div
              className="container-05-title-B1"
              dangerouslySetInnerHTML={{ __html: data_object.titleblock }}
            />
          </div>
        </div>
      );
    } else {
      titleblock = '';
    }
    return (
      <div>
        <BookmarkLink
          path={this.props.location.pathname}
          title={`Appendix B - ${id}`}
        />
        <p>
          <a href="/ab">AppendixB</a>
        </p>
        <ContentWrapper
          path={this.props.location.pathname}
          title={`Appendix B - ${id}`}
        >
          <section className="usa-section">
            <div className="usa-grid">
              <div className="container-05-title">
                <div className="container-05-title-A">
                  <div className="container-05-title-A1">
                    <span className="container-font-light-C">{title}</span>
                  </div>
                </div>
              </div>
              {titleblock}
              <div className="container-05">
                <div className="container-05-A">
                  <div className="container-05-A1">
                    <div
                      className="container-05-A1c container-font-light-Ea"
                      dangerouslySetInnerHTML={{ __html: content }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
        </ContentWrapper>
      </div>
    );
  }
}

export default AppendixBPart;
