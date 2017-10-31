import React from 'react';
import chapters from '../data/chapters.json';
import parts from '../data/parts.json';
import PartsLink from '../components/partsLink';
import GuideLines from '../data/guidelines.json';
import { ContentWrapper } from '../components/contentwrapper';
import sections from '../data/sections.json';
import Data from '../data/gl.json';

const chapterList = chapters.map(c => (
  <p key={c.id}>
    <PartsLink chapterId={c.id}>
      Chapter {c.id} - {c.title}
    </PartsLink>
  </p>
));
const lp = parts.length;
const lg = GuideLines.length;
const ls = sections.length;
const ld = Data.length;
export default (props) => (
  <ContentWrapper path={props.location.pathname}>
    <h3>Guidelines</h3>
    {chapterList}
  </ContentWrapper>
);
