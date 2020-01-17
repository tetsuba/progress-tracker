import React, {Fragment, useContext} from 'react';
import { Modal } from 'react-bootstrap';
import { ModalContext } from './ModalContext';

export const GlobalModal = () => {
    const { modalProps, ModalTemplate } = useContext(ModalContext);
    return (
        <Fragment>
            { ModalTemplate && (
                <Modal {...modalProps}>
                    <ModalTemplate />
                </Modal>
            )}
        </Fragment>
    )
};
