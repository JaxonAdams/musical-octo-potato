import React from 'react';

const Modal = ({ showAddModal, setShowAddModal, children }) => {
    return(
        <div className={`modal ${!showAddModal && 'hide'}`}>
            <section className='modal-main'>
                {children}
                <button onClick={() => setShowAddModal(false)} className='modal-close'>Close</button>
            </section>
        </div>
    );
};

export default Modal;