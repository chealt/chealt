import React, { Fragment } from 'react';
import { number, object } from 'prop-types';

const DEFAULT_OPTIONS = {
    day: 'numeric',
    month: 'short'
};

const getFormattedDate = (date, options) =>
    new Intl.DateTimeFormat(undefined, {
        ...DEFAULT_OPTIONS,
        ...options
    }).format(date);

const FormattedDate = ({ date, formatOptions }) => (
    <Fragment>{getFormattedDate(date, formatOptions)}</Fragment>
);

FormattedDate.propTypes = {
    date: number.isRequired,
    formatOptions: object
};

export default FormattedDate;
