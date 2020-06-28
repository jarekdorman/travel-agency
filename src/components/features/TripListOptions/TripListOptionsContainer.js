import { connect } from 'react-redux';
import TripListOptions from './TripListOptions';
import { getAllTags } from '../../../redux/tagsRedux';
import {
  getAllFilters,
  changeSearchPhrase,
  addTag,
  removeTag,
  createAction_changeDuration,
} from '../../../redux/filtersRedux';

const mapStateToProps = (state) => ({
  tags: getAllTags(state),
  filters: getAllFilters(state),
});

const mapDispatchToProps = (dispatch) => ({
  changeSearchPhrase: (phrase) => dispatch(changeSearchPhrase(phrase)),
  addTag: (tag) => dispatch(addTag(tag)),
  removeTag: (tag) => dispatch(removeTag(tag)),
  changeDuration: (type, value) =>
    dispatch(createAction_changeDuration({ type, value })),

  // TODO - add more dispatchers for other filters
});

export default connect(mapStateToProps, mapDispatchToProps)(TripListOptions);
