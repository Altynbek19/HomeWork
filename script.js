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
        
        const moscowLoads = Object.values(jsonData).filter(item => item.cities === 'Москва Восток');
        
        
        
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


    


// Все данные
    // try {
    //     const jsonData = JSON.parse(content);
    //     document.getElementById('jsonOutput').textContent = JSON.stringify(jsonData, null, 2);

    //     // Вывести данные JSON-файла в консоль
    //     console.log(jsonData);
    //   } catch (error) {
    //     alert('Произошла ошибка при парсинге JSON: ' + error.message);
    //   }


// Грузы которые прнимают от москвы
    //   try {
    //     const jsonData = JSON.parse(content);
    //     document.getElementById('jsonOutput').textContent = JSON.stringify(jsonData, null, 2);

    //     // Вывести данные JSON-файла в консоль
    //     console.log(jsonData);

    //     // Функция для фильтрации грузов из Москвы
    //     function filterMoscowLoads() {
    //       const moscowLoads = jsonData.filter(item => item.from === 'Москва');
    //       document.getElementById('jsonOutput').textContent = JSON.stringify(moscowLoads, null, 2);
    //       console.log(moscowLoads);
    //     }

    //     // Добавление обработчика для кнопки фильтрации
    //     document.getElementById('filterButton').addEventListener('click', filterMoscowLoads);
    //   } catch (error) {
    //     alert('Произошла ошибка при парсинге JSON: ' + error.message);
    //   }