import { connect } from 'react-redux';
import Home from '../../components/home/Home';

const mapStateToProps = (state) => ({
    translations: state.translations
});

export default connect(mapStateToProps)(Home);
