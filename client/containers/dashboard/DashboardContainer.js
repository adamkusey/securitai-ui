import { connect } from 'react-redux';
import Dashboard from '../../components/dashboard/Dashboard';
import { clearActivity } from '../../redux/actions/activityCreator';

const mapStateToProps = (state) => ({
    translations: state.translations
});

export default connect(mapStateToProps, { clearActivity })(Dashboard);
