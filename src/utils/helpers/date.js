export const formatDate = (date) => {
    let month = checkDateLeadsZero(date.getMonth() + 1),
        day = checkDateLeadsZero(date.getDate()),
        year = date.getFullYear();

    return [year, month, day].join('-');
}

const checkDateLeadsZero = (value) => {

	return `${ value < 10 ? 0 : '' }${ value }`;
}
