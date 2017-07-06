import { connect } from 'react-redux';
import Activity from '../../components/activity/Activity';
import { loadActivity, clearActivity } from '../../redux/actions/activityCreator';

const mapStateToProps = (state) => ({
    activity: state.activity,
    translations: state.translations
});

export default connect(mapStateToProps, { loadActivity, clearActivity })(Activity);
