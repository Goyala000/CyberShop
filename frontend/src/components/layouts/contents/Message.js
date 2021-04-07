import React from 'react';

const Message = ({ variant, message }) => {
    return (
        <div className={`alert alert-dismissible alert-${variant}`}>
            {message}
        </div>
    )
}

Message.defaltProps = {
    variant: 'info'
}

export default Message;
