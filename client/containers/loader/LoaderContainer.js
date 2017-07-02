import { connect } from 'react-redux';
import Loader from '../../components/loader/Loader';

const mapStateToProps = (state) => ({
    loading: state.loading
});

export default connect(mapStateToProps)(Loader);
