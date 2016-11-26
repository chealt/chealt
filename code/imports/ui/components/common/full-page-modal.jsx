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
        <div className='header bottom separated'>
            {renderTitle(title)}
            <IconButton
                type='cross'
                action={closeMethod}
                additionalClasses='close' />
        </div>
        <div className='content'>
            {children}
        </div>
    </div>
);

export default FullPageModal;

FullPageModal.propTypes = {
    children: React.PropTypes.element.isRequired,
    closeMethod: React.PropTypes.func.isRequired,
    title: React.PropTypes.string
};
