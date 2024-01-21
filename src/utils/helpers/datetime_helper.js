function compareTime(timeString1, timeString2){
    let dateTime1 = new DATE(timeString1);
    let dateTime2 = new DATE(timeString2);
    let result = dateTime1.getTime() > dateTime2.getTime();
    return result;
}

module.exports={
    compareTime
}