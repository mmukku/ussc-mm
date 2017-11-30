import React from 'react';
import { Link } from 'react-router-dom';
import data from '../data/appendix-b';

import BookmarkLink from '../components/bookmarkLink';
import { ContentWrapper } from '../components/contentwrapper';
import SearchGuidelines from '../components/searchGuidelines';
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
    var breadcrumb_structure = [
      <li>
        <Link to="/ab">Appendix B</Link>
      </li>
    ];
    let breadcrumb_search_function = b => b.id === data_object.breadcrumbs[i];
    for (var i = 0; i < data_object.breadcrumbs.length; i++) {
      let breadcrumb_data_object = _.find(data, breadcrumb_search_function);
      var breadcrumb_title;
      if ('title' in breadcrumb_data_object) {
        breadcrumb_title = breadcrumb_data_object.title;
      } else {
        breadcrumb_title = breadcrumb_data_object.id;
      }
      breadcrumb_structure.push(
        <li>
          <Link to={`/ab/${breadcrumb_data_object.id}`}>
            {breadcrumb_title}
          </Link>
        </li>
      );
    }
    breadcrumb_structure.push(<li className="active">{title}</li>);
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
                Appendix B
                <br />
              </span>
              <span className="container-font-dark-B-2">
                Selected Sentencing Statutes
              </span>
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
        <section className="usa-section breadcrumb-global-A">
          <div className="usa-grid breadcrumb-global-A-1">
            <div className="usa-width-one-whole">
              <ol className="breadcrumb-b">{breadcrumb_structure}</ol>
            </div>
          </div>
        </section>
        <BookmarkLink
          path={this.props.location.pathname}
          title={`Appendix B - ${id}`}
        />
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
                      className="container-05-A1c container-font-light-Ea ab-content"
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
