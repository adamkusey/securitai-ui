import { connect } from 'react-redux';
import Header from '../../components/header/Header';

const mapStateToProps = (state) => ({
    translations: state.translations
});

export default connect(mapStateToProps)(Header);
