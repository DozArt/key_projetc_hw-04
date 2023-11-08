
  // форматирование даты
  const format_date = (d) => {
    let months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
    let days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];

    let day = days[d.getUTCDay()];
    let date = d.getUTCDate();
    let month = months[d.getUTCMonth()];
    let year = d.getUTCFullYear();
    let hour = d.getUTCHours()

    return `${day} ${date} ${month} ${year} ${hour}`
  }

export default format_date;