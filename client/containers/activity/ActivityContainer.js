import { connect } from 'react-redux';
import Activity from '../../components/activity/Activity';

const mapStateToProps = (state) => {
    return {
        malicious: state.activity.malicious || [],
        translations: state.translations}
    };

export default connect(mapStateToProps)(Activity);
