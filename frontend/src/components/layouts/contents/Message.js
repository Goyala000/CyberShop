import React from 'react';

const Message = ({message}) => {
    return (
        <div class="alert alert-dismissible alert-danger">
            <a class="alert-link">{message}</a>
        </div>
    )
}

export default Message;
