import React, { useState } from 'react';
import WeatherToday from './WeatherToday';
import WeatherForecast from './WeatherForecast';

// доступ к API сервиса погоды
const api = {
  key: '7d9d632bc6916a92fc14f219a258a5ae',
  base: 'http://api.openweathermap.org/data/2.5/'
}

function App() {

  // действия при изменении города в поле ввода
  const [city, setCity] = useState('');

  // действия с данными погоды
  const [weather_forecast, setWeatherForecast] = useState({});	// вся информация в массиве weather
  const [weather_today, setWeatherToday] = useState({});	// вся информация в массиве weather

  const [isOneDayMode, setOneDayMode] = useState(true);

  // обработчик, который срабатывает когда нажата клавиша Enter
  const search_forecast = evt => {
    if (evt.key === 'Enter') {
      fetch(`${api.base}forecast?q=${city}&units=metric&cnt=40&appid=${api.key}`) // отправляем запрос на 5 дней
        .then(res => res.json())  // ответ преобразуем в json
        .then(result => {         // работаем с результатом
          setWeatherForecast(result);
          console.log(result);
        });

      fetch(`${api.base}weather?q=${city}&units=metric&appid=${api.key}`) // отправляем запрос на день
        .then(res => res.json())  // ответ преобразуем в json
        .then(result => {         // работаем с результатом
          setWeatherToday(result);
          setCity('');			  // очищаем переменную city
          console.log(result);
        });
      
    }
  }


  // JSX разметка
  return (
    <div className={(typeof weather_forecast.main != 'undefined') ? ((weather_forecast.main.temp > 16) ? 'app warm' : 'app') : 'app'}>
      <main>

        <div className='search-box'>
          <input
            type='text'
            className='search-bar'
            placeholder='Поиск...'
            onChange={e => setCity(e.target.value)}
            value={city}
            onKeyUp={search_forecast}	// следим за нажатием кнопки
          />
        </div>

        


        <div>

          {(typeof weather_forecast.list != 'undefined') ? (
            <div>
              <button onClick={() => setOneDayMode(!isOneDayMode)}>
                {isOneDayMode ? 'Показать на 5 дней' : 'Показать на 1 день'}
              </button>
              <div className='location'>{weather_forecast.city.name}, {weather_forecast.city.country}</div>
              
              {isOneDayMode ? (
                WeatherToday(weather_today)
              ) : (
                <div>
                  <h2>Прогноз на 5 дней</h2>
                  {weather_forecast.list.map(arg => (
                    <h3 key={arg.dt}>{WeatherForecast(arg, weather_forecast.city.timezone)}</h3>
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
