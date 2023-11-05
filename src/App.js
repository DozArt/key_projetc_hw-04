import React, { useState } from 'react';
import Forecast from './Forecast';

// доступ к API сервиса погоды
const api = {
  key: '7d9d632bc6916a92fc14f219a258a5ae',
  base: 'http://api.openweathermap.org/data/2.5/'
}

function App() {

  // действия при изменении города в поле ввода
  const [city, setCity] = useState('');

  // действия с данными погоды
  const [weather, setWeather] = useState({});	// вся информация в массиве weather

  const [isOneDayMode, setOneDayMode] = useState(true);

  // обработчик, который срабатывает когда нажата клавиша Enter
  const search = evt => {
    if (evt.key === 'Enter') {
      fetch(`${api.base}forecast?q=${city}&units=metric&cnt=40&appid=${api.key}`) // отправляем запрос
        .then(res => res.json())  // ответ преобразуем в json
        .then(result => {         // работаем с результатом
          setWeather(result);
          setCity('');			  // очищаем переменную city
          console.log(result, new Date(0));
        });
    }
  }

  // JSX разметка
  return (
    <div className={(typeof weather.main != 'undefined') ? ((weather.main.temp > 16) ? 'app warm' : 'app') : 'app'}>
      <main>

        <div className='search-box'>
          <input
            type='text'
            className='search-bar'
            placeholder='Поиск...'
            onChange={e => setCity(e.target.value)}
            value={city}
            onKeyUp={search}	// следим за нажатием кнопки
          />
        </div>




        <button onClick={() => setOneDayMode(!isOneDayMode)}>
          {isOneDayMode ? 'Показать на 5 дней' : 'Показать на 1 день'}
        </button>


        <div>

          {(typeof weather.list != 'undefined') ? (
            <div>
              <div className='location'>{weather.city.name}, {weather.city.country}</div>
              {isOneDayMode ? (
                <div>
                  <h2>Прогноз на один день</h2>
                  {weather.list.map(arg => (
                    <h3 key={arg.dt}>{Forecast(arg, weather.city.timezone)}</h3>
                  ))}
                </div>
              ) : (
                <div>
                  <h2>Прогноз на 5 дней</h2>
                  {weather.list.map(arg => (
                    <h3 key={arg.dt}>{Forecast(arg, weather.city.timezone)}</h3>
                  ))}
                </div>
              )}
            </div>
          ) : ('')}
        </div>

      </main>
    </div>
  );
}

export default App;
