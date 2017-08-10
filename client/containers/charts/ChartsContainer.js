import { connect } from 'react-redux';
import Charts from '../../components/charts/Charts';

const mapStateToProps = (state) => ({
    activity: state.activity,
    translations: state.translations
});

export default connect(mapStateToProps)(Charts);
