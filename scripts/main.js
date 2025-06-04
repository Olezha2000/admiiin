// Задание 3.1 Проверка подключение скрипта
console.log("Check load script");

// Задание 3.2 Отслеживание событий
buttonHeader = document.getElementById("buttonCallbackHeader");
modalForm = document.getElementById("modalFormFeedback");
buttonModalForm = document.getElementById("modalFormFeedbackClose");

buttonHeader.addEventListener("click", toggleModalForm);
buttonModalForm.addEventListener("click", toggleModalForm);

function toggleModalForm() { // Задание 3.3 Функции
  if (modalForm.classList.contains('d-none')) { // 3.3 Ветвление
    modalForm.classList.remove('d-none');
  } else {
    modalForm.classList.add('d-none'); 
  }
}

// Задание 3.4 Вывод массива заголовков
let array = Array.from(document.querySelectorAll('.header__item'));
array.forEach((item, key) => {
  console.log(`Элемент массива ${key}: значение - ${item.textContent.trim()}`)
})

// Задание 3.5 
/*const cars = [
  {
    title: "МТЗ <span class='text-green'>82.1</span> Беларус",
    image: "images/catalog/tracktor/1.jpg",
    lifting capacity: "3200",
    speed: "34",
    engine: "Д-243S2",
    power: "81",
    dimensions: "3930 х 1970 х 2800"
  },
  {
    title: "K-<span class='text-green'>704</span>P-4P Станислав",
    image: "images/catalog/tracktor/2.jpg",
    lifting capacity: "6000",
    speed: "34",
    engine: "ЯМЗ-238Д",
    power: "330",
    dimensions: "7000 х 2950 х 3500"
  },
  {
    title: "OPTITECH ALCOR TC<span class='text-green'>1304</span>",
    image: "images/catalog/tracktor/3.jpg",
    lifting capacity: "3324",
    speed: "40",
    engine: "Weichai",
    power: "130",
    dimensions: "5000 х 2220 х 3150"
  },
]

let card_list = document.getElementById('catalogCardList');
let html = '';

cars.forEach((item) => {
  html += `<a class="card__item" href="#">
                <div class="card__item-image">
                    <img src="${item.image}" class="image" alt="">
                </div>
                <div class="card__item-description">
                    <h3 class="card__title">AgroTruck ${item.title}</h3>
                    <div class="card__item-list">
                        <div class="item">
                            <div class="item__title">Грузоподъемность</div>
                            <div class="item__value">${item.ladle} кг</div>
                        </div>
                        <div class="item">
                            <div class="item__title">Макс. скорость движения</div>
                            <div class="item__value">${item.depth} км/час</div>
                        </div>
                        <div class="item">
                            <div class="item__title">Двигатель</div>
                            <div class="item__value">${item.engine}</div>
                        </div>
                        <div class="item">
                            <div class="item__title">Мощность двигателя</div>
                            <div class="item__value">${item.power} л.с.</div>
                        </div>
                        <div class="item">
                            <div class="item__title">Габариты</div>
                            <div class="item__value">${item.dimensions} мм</div>
                        </div>
                    </div>
                </div>
            </a>`
});

card_list.insertAdjacentHTML('afterend', html);*/


// Задание 3.6 
fetch('scripts/catalog.json')
  .then(response => {
    if (!response.ok) throw new Error('Ошибка загрузки');
    return response.json();
  })
  .then(data => {
    renderCatalog(data);
  })
  .catch(error => {
    console.error('Error:', error);
  });

function renderCatalog(data) {
  let card_list = document.getElementById('catalogCardList');
  let html = '';

  data.tracktors.forEach((item) => {
    html += `<a class="card__item" href="#">
                  <div class="card__item-image">
                      <img src="${item.image}" class="image" alt="">
                  </div>
                  <div class="card__item-description">
                      <h3 class="card__title">AgroTruck ${item.title}</h3>
                      <div class="card__item-list">
                      ${item.specs.map(spec => `
                        <div class="item">
                          <div class="item__title">${spec.title}</div>
                          <div class="item__value">${spec.value}</div>
                        </div>
                      `).join('')}
                      </div>
                  </div>
              </a>`
  });

  card_list.insertAdjacentHTML('afterend', html);
}

// Задание 3.7
let form = document.getElementById("modalForm");

document.addEventListener('DOMContentLoaded', () => {
  const savedData = localStorage.getItem('feedbackModalForm');
  if (savedData) {
    const formData = JSON.parse(savedData);
    for (const key in formData) {
      if (form.elements[key]) {
        form.elements[key].value = formData[key];
      }
    }
  }
});

form.addEventListener('input', (e) => {
  const formData = {
    name: form.elements.name.value,
    email: form.elements.phone.value
  };
  localStorage.setItem('feedbackModalForm', JSON.stringify(formData));
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  localStorage.removeItem('contactFormData');
  alert('Форма отправлена!');
  form.reset();
});