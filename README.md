# trello-clone
Trello clone project
## Start
1. Clone this project
1. ```npm i``` - install packages  
1. ```npm run start``` - start dev server watch mode localhost:3000 

backend server is running on heroku https://trello-clone-bh.herokuapp.com/

## Commands
```npm run start``` - start dev server watch mode localhost:3000 

```npm run build``` - compile project

```npm run lint``` - fix lint errors

## Libs
1. React - позволил разбить приложение на компоненты и настроить их взаимодействие/завязал компоненты стейтами
2. Redux - распутал стейты компонентов
3. Ant design - позволил сделать все в едином стиле/некоторые компоненты сложно кастомизируются
4. i18next - упростил локализацию приложения/не удобно работать с длинным текстом
5. React-beautiful-dnd - позволил красиво показать перетаскивание элементов/вся логика все равно пишется руками
6. React-markdown - добавил возможность форматирования текста/нет highlight code
7. React-router-dom - настроил навигацию по приложению
8. json-web-token - позволил легко настроить авторизацию
9. CORS - использован для кросс-доменных запросов, поскольку бекенд и фронтенд у нас находятся на разных серверах
10. mongoose - удобная библиотека для работы с БД/не совсем очевидная логика для работы с manyToOne связями
11. boom - удобная обертка над http-статусами 
