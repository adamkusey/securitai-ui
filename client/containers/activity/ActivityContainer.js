import { connect } from 'react-redux';
import Activity from '../../components/activity/Activity';
import { loadActivity } from '../../redux/actions/activityCreator';
import { blacklistIp, safeRequest } from '../../redux/actions/quarantineCreator';
import { publishNotification } from '../../redux/actions/notificationCreator';

const mapStateToProps = (state) => ({
    activity: state.activity && state.activity.bad,
    translations: state.translations
});

export default connect(mapStateToProps, { loadActivity, blacklistIp, publishNotification, safeRequest })(Activity);
