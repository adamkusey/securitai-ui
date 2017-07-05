import { connect } from 'react-redux';
import Activity from '../../components/activity/Activity';

const mapStateToProps = (state) => ({
    maliciousActivity: state.activity,
    translations: state.translations
});

export default connect(mapStateToProps)(Activity);
