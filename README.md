Test task
===============


System requirements
----------------

- PHP 7.2
- Composer
- node.js
- npm
- MySQL

Installation
----------------

- git clone https://github.com/shm-vadim/test_task_2019_05_13
- cd test_task_2019_05_13
- composer install --no-scripts
- Create .env.local and set there your own DATABASE_URL like in .env
- bin/console doctrine:database:create && bin/console doctrine:migrations:migrate -n
- bin/console sync-projects
- composer run-script auto-scripts
- npm install
- npm run dev
- bin/console server:run
- Open http://localhost:8000 in yor browser.

Task description
----------------

Создать одностраничное SPA приложение, отображающее список проектов с возможностью фильтровать выборку, а также  карточку с информацией о проекте. 

Фильтров достаточно 2х - строка простого поиска по названию проекта (subject) и по дате обновления (updated_on). 
Фильтрация должна происходить на сервере, не на клиенте. Все действия на странице не должны вызвать ее перезагрузку. 
Можно использовать ES6, JS, jquery, axios. JS фреймворки нельзя, шаблонизатор можно. 
Symfony поддерживает компиляцию ES6 в JS практически из коробки с помощью symfony/encore. 

Для бэкэнда разверните базовое приложение Symfony 4. 
Импортируйте  проекты в БД из условного API http://bravik.ru/dev/projects и сохраните в БД. 
Проектируя этот код исходите из того, что это не разовый импорт, а приложение будет регулярно подгружать/синхронизировать данные из внешнего источника.

Создайте необходимые для SPA экшны.
Создайте простой SPA с требуемым интерфейсом. Сделайте интерфейс эстетичным в вашем понимании. Можно использовать bootstrap для красоты. 
