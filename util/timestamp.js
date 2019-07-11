module.exports = d => {
    let year = d.getFullYear();
    let month = d.getMonth() + 1;
    let day = d.getDate();
    let hour = d.getHours();
    let min = d.getMinutes();
    let sec = d.getSeconds();

    month.toString().length < 2 ? month = ('0' + month) : month;
    day.toString().length < 2 ? day = ('0' + day) : day;
    hour.toString().length < 2 ? hour = ('0' + hour) : hour;
    min.toString().length < 2 ? min = ('0' + min) : min;
    sec.toString().length < 2 ? sec = ('0' + sec) : sec;

    return `${year}-${month}-${day} ${hour}:${min}:${sec}`;
}