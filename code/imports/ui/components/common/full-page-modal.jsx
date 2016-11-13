import React        from 'react';

import IconButton   from './buttons/icon-button';

const renderTitle = (title) => {
    if (title) {
        return (
            <h2 className='title'>{title}</h2>
        );
    }
};

const FullPageModal = ({ children, closeMethod, title }) => (
    <div className='full-page-modal'>
        {renderTitle(title)}
        <IconButton
            type='cross'
            action={closeMethod}
            additionalClasses='close absolute top right' />
        <button
            className='close-butotn'
            onClick={closeMethod}></button>
        {children}
    </div>
);

export default FullPageModal;

FullPageModal.propTypes = {
    children: React.PropTypes.element.isRequired,
    closeMethod: React.PropTypes.func.isRequired,
    title: React.PropTypes.string
};
