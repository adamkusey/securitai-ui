import React, {Component} from 'react';
import { Modal, Button } from 'react-bootstrap';
require('./modal.scss');

class MyModal extends Component {

    render() {
        const { modalVisible, text, closeModal } = this.props;

        return (
            <Modal show={modalVisible} onHide={closeModal}>
                <Modal.Body>{text}</Modal.Body>

                <Modal.Footer>
                    <Button onClick={closeModal}>Close</Button>
                </Modal.Footer>

            </Modal>
        );
    }
}

export default MyModal;
