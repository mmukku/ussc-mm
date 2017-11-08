import React from 'react';
import data from '../data/appendix-b';
import BookmarkLink from '../components/bookmarkLink';
import { ContentWrapper } from '../components/contentwrapper';
import _ from 'lodash';

export default props => {
  let data_object = _.find(data, b => b.id === props.match.params.part);
  let content = data_object.content;
  let id = data_object.id;
  return (
    <div>
	  <BookmarkLink path={props.location.pathname} title={`Appendix B - ${id}`}/>
	  <ContentWrapper path={props.location.pathname} title={`Appendix B - ${id}`}>
        <a href="/ab">AppendixB</a>
        <p dangerouslySetInnerHTML={{ __html: content }} />
	  </ContentWrapper>
    </div>
  );
};
