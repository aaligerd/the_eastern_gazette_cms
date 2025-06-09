const getDateString=(dateInput)=> {
    let d;
    if (typeof dateInput !== 'undefined') {
    d= new Date(dateInput);
    } else {
        d=new Date();
    }
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}
const getDateTimeString=(dateInput) =>{
    let d;
    if (typeof dateInput !== 'undefined') {
    d= new Date(dateInput);
    } else {
        d=new Date();
    }
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')} ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}:${String(d.getSeconds()).padStart(2, '0')}`;
}


module.exports = {
    getDateString,
    getDateTimeString
};