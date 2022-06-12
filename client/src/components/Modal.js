import React from 'react';

const Modal = ({ showAddModal, setShowAddModal, children }) => {
    return(
        <div className={`modal ${!showAddModal && 'hide'}`}>
            <section className='modal-main'>
                <button onClick={() => setShowAddModal(false)} className='modal-close close'>Close</button>
                {children}
            </section>
        </div>
    );
};

export default Modal;