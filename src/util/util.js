export const dataFormat = (date, fmt) => {
    //如果是时间戳的话那么转换成Date类型
    if (typeof date === 'number') {
        date = new Date(date)
    } else if (typeof date === 'string') {
        date = new Date(date)
    } else if (!date) {
        return '-';
    }

    let o = {
        //月份
        "M+": date.getMonth() + 1,
        //日
        "d+": date.getDate(),
        //小时
        "h+": date.getHours(),
        //分
        "m+": date.getMinutes(),
        //秒
        "s+": date.getSeconds(),
        //季度
        "q+": Math.floor((date.getMonth() + 3) / 3),
        //毫秒
        "S": date.getMilliseconds()
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length))
    for (let k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)))
    return fmt
}