export function humanizeDate(date : Date) : string {

    const monthsAbbreviated = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
  
    const day = date.getDate();
    const monthAbbreviated = monthsAbbreviated[date.getMonth()];
    const year = date.getFullYear();
    // const hours = date.getHours();
    // const minutes = date.getMinutes();
    // const seconds = date.getSeconds();
  
    return `${monthAbbreviated} ${day}, ${year}`;
}