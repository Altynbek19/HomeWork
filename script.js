let jsonData; // Переменная для хранения JSON-данных

    // Функция для отображения всех данных JSON-файла на странице
    function displayAllData() {
      if (!jsonData) {
        alert('JSON-данные не загружены.');
        return;
      }
      document.getElementById('jsonOutput').textContent = JSON.stringify(jsonData, null, 2);
      console.log('Все данные:', jsonData);
    }

    // Функция для фильтрации и отображения грузов из Москвы
    function filterMoscowLoads() {
        if (!jsonData) {
          alert('JSON-данные не загружены.');
          return;
        }
  
        if (typeof jsonData !== 'object') {
          alert('JSON-данные не являются объектом.');
          return;
        }
        
        const moscowLoads = Object.values(jsonData)[0].filter(item => item.title === 'Москва Восток');
        
        
        
        if (moscowLoads.length > 0) {
          console.log('Грузы из Москвы:', moscowLoads);
        } else {
          console.log('Нет грузов из Москвы.');
        }
        
        document.getElementById('jsonOutput').textContent = JSON.stringify(moscowLoads, null, 2);
      }
  

    document.getElementById('jsonFileInput').addEventListener('change', function (event) {
      const file = event.target.files[0];

      if (!file) {
        alert('Файл не выбран.');
        return;
      }

      const reader = new FileReader();

      reader.onload = function (e) {
        const content = e.target.result;

        try {
          jsonData = JSON.parse(content);
          displayAllData(); // Отображение всех данных JSON-файла

          // Добавление обработчика для кнопки "Фильтровать грузы из Москвы"
          document.getElementById('filterButton').addEventListener('click', filterMoscowLoads);
        } catch (error) {
          alert('Произошла ошибка при парсинге JSON: ' + error.message);
        }
      };

      reader.readAsText(file);
    });


    ymaps.ready(function () {
      var myMap = new ymaps.Map('map', {
          center: [55.755814, 37.617635], // Координаты центра карты
          zoom: 10 // Масштаб карты
      });

      // Создаем маркер
      var myPlacemark = new ymaps.Placemark(
          [55.717426,37.757728], // Координаты маркера
          {
              // Дополнительная информация о маркере
              name: 'Москва транзит',
              phone: '8(495) 660-11-11'
          }
      );

      // Добавляем маркер на карту
      myMap.geoObjects.add(myPlacemark);
  });


//   var myPlacemark = new ymaps.Placemark(
//     [55.533308,37.579376], // Координаты маркера
//     {
//         // Дополнительная информация о маркере
//         name: 'Москва Бутово',
//         phone: '8(495) 660-11-11'
//     }
// );
// var myPlacemark = new ymaps.Placemark(
//     [55.882411,37.514837], // Координаты маркера
//     {
//         // Дополнительная информация о маркере
//         name: 'Москва Коровинское',
//         phone: '8(495) 660-11-11'
//     }
// );