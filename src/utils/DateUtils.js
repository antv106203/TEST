export const formatAccessTime = (isoTime) => {
    const date = new Date(isoTime);
    
    const pad = (num) => String(num).padStart(2, '0');

    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());
    const seconds = pad(date.getSeconds());

    const day = pad(date.getDate());
    const month = pad(date.getMonth() + 1); // tháng bắt đầu từ 0
    const year = date.getFullYear();

    return `${hours}:${minutes}:${seconds} ${day}/${month}/${year}`;
}

export const formatDateOnly = (isoTime) => {
    const date = new Date(isoTime);

    const pad = (num) => String(num).padStart(2, '0');

    const day = pad(date.getDate());
    const month = pad(date.getMonth() + 1); // tháng bắt đầu từ 0
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
};


