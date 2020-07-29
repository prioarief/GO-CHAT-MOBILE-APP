import moment from 'moment';

const Date = (date, format) => {
  return moment(date).format(format);
};

export default Date;
