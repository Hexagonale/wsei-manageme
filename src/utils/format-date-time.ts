import moment from 'moment';

export const formatDateTime = (date: moment.MomentInput) => moment(date).format('YYYY-MM-DD HH:mm:ss');

export const formatDate = (date: moment.MomentInput) => moment(date).format('YYYY-MM-DD');

export const formatTime = (date: moment.MomentInput) => moment(date).format('HH:mm:ss');
