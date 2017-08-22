import { connect } from 'react-redux';
import Modal from '../../components/modal/Modal';
import { closeModal } from '../../redux/actions/modalCreator';

const mapStateToProps = (state) => ({
    ...state.modal
});

export default connect(mapStateToProps, { closeModal })(Modal);
