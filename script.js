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

        
        // Фильтр для Москва Восток
        const moscowLoads = Object.values(jsonData)[0].filter(item => item.title === 'Москва Восток');



// Получите массив филиалов из JSON
const branches = jsonData.branches;

// Создайте массив для хранения всех складов
const allWarehouses = [];

// Пройдитесь по каждому филиалу
branches.forEach(branch => {
  // Получите массив складов (warehouses) для текущего филиала
  const warehouses = branch.divisions.map(division => division.warehouses);

  // Добавьте склады в массив всех складов
  allWarehouses.push(...warehouses);
});

// Создайте объект, содержащий массив всех складов
const warehousesJSON = {
  warehouses: allWarehouses
};

// Преобразуйте объект в JSON-строку с отступами для более читаемого вида
const warehousesJSONString = JSON.stringify(warehousesJSON, null, 2);

// Выведите JSON-строку в консоль
console.log(allWarehouses);

// Выведите JSON-строку на веб-страницу
const jsonOutputContainer = document.getElementById('jsonOutput');
jsonOutputContainer.textContent = warehousesJSONString;

        
        
        
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
      



      // Получите массив филиалов из JSON
    const branches = jsonData;
  
    // Создайте карту на вашей странице
    ymaps.ready(function () {
      var myMap = new ymaps.Map('map', {
        center: [55.755814, 37.617635], // Координаты центра карты
        zoom: 10 // Масштаб карты
      });
  
      // Пройдитесь по каждому филиалу
      branches.forEach(branch => {
        // Получите массив складов (warehouses) для текущего филиала
        const warehouses = branch.divisions.map(division => division.warehouses).flat();
  
        // Пройдитесь по каждому складу и добавьте маркер на карту
        warehouses.forEach(warehouse => {
          var coordinates = warehouse.coordinates.split(',').map(Number); // Преобразуйте строку координат в массив чисел
  
          // Создайте маркер для склада
          var myPlacemark = new ymaps.Placemark(
            coordinates, // Координаты маркера
            {
              // Дополнительная информация о маркере
              name: warehouse.name,
              phone: warehouse.telephone
            }
          );
  
          // Добавьте маркер на карту
          myMap.geoObjects.add(myPlacemark);
        });
      });
    });
    });


  //   ymaps.ready(function () {
  //     var myMap = new ymaps.Map('map', {
  //       center: [55.755814, 37.617635], // Координаты центра карты
  //       zoom: 10 // Масштаб карты
  //     });
  

  //     // Создаем маркер
  //     var myPlacemark = new ymaps.Placemark(
  //         coordinates, // Координаты маркера
  //         {
  //             // Дополнительная информация о маркере
  //             name: warehouse.name,
  //             phone: warehouse.telephone
  //         }
  //     );

  //     // Добавляем маркер на карту
  //     myMap.geoObjects.add(myPlacemark);
  // });

