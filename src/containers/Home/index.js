import React, { PropTypes } from 'react';
import Helmet from 'react-helmet';
import IndexHeader from '../../components/IndexHeader';
import { asyncConnect } from 'redux-connect';
import { connect } from 'react-redux';
import debug from '../../helpers/debug';
import { isAllLoaded, loadAll } from '../../redux/actions/surahs.js';
import SurahList from './SurahList';
import QuickSurahs from './QuickSurahs';
const styles = require('./style.scss');

export function Home(props) {

  debug('component:Index', 'Render');

  return (
    <div className="index-page">
      <Helmet title="The Noble Quran - القرآن الكريم" titleTemplate="%s" />
      <IndexHeader />
      <div className={`container ${styles.list}`}>
        <div className="row">
          <div className="col-md-10 col-md-offset-1">
            <h4 className={`text-muted ${styles.title}`}>
              SURAHS (CHAPTERS)
              <QuickSurahs />
            </h4>
            <div className="row">
              <SurahList surahs={Object.values(props.surahs).slice(0, 38)} />
              <SurahList surahs={Object.values(props.surahs).slice(38, 76)} />
              <SurahList surahs={Object.values(props.surahs).slice(76, 114)} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Home.propTypes = {
  lastVisit: PropTypes.any,
  surahs: PropTypes.object.isRequired
};

const AsyncHome = asyncConnect([{
  promise({ store: { getState, dispatch } }) {
    if (!isAllLoaded(getState())) {
      return dispatch(loadAll());
    }

    return true;
  }
}])(Home);

export default connect(state => ({surahs: state.surahs.entities}))(AsyncHome);
