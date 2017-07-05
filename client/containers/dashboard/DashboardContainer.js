import { connect } from 'react-redux';
import Dashboard from '../../components/dashboard/Dashboard';

const mapStateToProps = (state) => ({
    translations: state.translations
});

export default connect(mapStateToProps)(Dashboard);
