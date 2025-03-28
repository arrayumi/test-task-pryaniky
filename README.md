# Реализовать небольшое SPA-приложение взаимодействующее с сервером.

## Stack: 
JavaScript, React, Redux, Axios, Material UI, React hook form + zod

## Task:

Использование React обязательно. 

Использование Redux, TypeScript желательно.

Желательно использование Material UI [https://mui.com/](https://mui.com/)

Приложение должно состоять из:

1. Страница авторизации  
2. Таблица с данными полученными с сервера  
3. Таблица должна предоставлять CRUD операции

Описание поведения функций приложения:

1. Неавторизованный пользователь, открывая приложения должен получить предложение авторизоваться  
2. После успешной авторизации пользователь должен увидеть таблицу с данными.  
3. После перезагрузки страницы пользователь должен оставаться авторизован  
4. Возможность добавить в таблицу новую запись  
5. Новая записать в таблице должна появляться сразу  
6. Возможность удалить запись  
7. Удаленная записать должна сразу исчезнуть из таблицы  
8. Возможность изменить запись  
9. Изменения должны сразу отображаться в таблице  
10. Приложение должно корректно сообщать пользователю об ошибках заполнения форм или неудачных запросах к серверу  
11. Во время получения и отправки данных на сервер пользователю должны быть показаны индикаторы процесса загрузки/отправки (прогресс бары, спиннеры) данных

Хочется увидеть в выполненное задании не только работающее приложение, но и идеи по архитектуре, расширяемости приложения. Внешний вид приложения полностью свободен для креативности исполнителя.

Исходный код выполненного задание нужно выложить в публичный репозиторий на GitHub. Так же нам будет очень приятно, если собранное приложение будет доступно на GitHub Pages.

# Документация к API-сервера

**Данные для авторизации:**

"username": user{N}

"password": password

*user{N}* – где вместо N нужно ввести число, например user1, user2… user33. Данные в таблице для каждого сохраняются индивидуально.

*password* – одинаков для всех логинов, в случае его отличия сервер вернёт ошибку.

**Хост**:

HOST \= 'https://test.v5.pryaniky.com'

**Запрос для авторизации (метод \- POST):**

{HOST}/ru/data/v3/testmethods/docs/login

Данные передаются в JSON формате:

{ username: “ **user13**”, password: “**password**” }

username \- логин

password – пароль

В ответе к запросу сервер вернет токен для аутенфикации.

**Аутенфикация запросов:**

В заголовках запроса для аутенфикации необходимо передавать токен полученный при авторизации.

'x-auth': 'token'

Например:

**x-auth:** supersecrettoken\_for\_user8

*Токен не имеет срока действия.*

**Запрос для получения массива данных для таблицы (метод \- GET):**

{HOST}/ru/data/v3/testmethods/docs/userdocs/get

В случае успешного выполнения запроса в ответе будут данные об ошибке и массив с данными для таблицы. Массив с данными находится в свойстве data.

Свойство id – уникальный id записи 

Вывести необходимо свойства:

    'companySigDate',  
    'companySignatureName',  
    'documentName',  
    'documentStatus',  
    'documentType',  
    'employeeNumber',  
    'employeeSigDate',  
    'employeeSignatureName'

Запрос требует аутенфикации.

**Запрос для добавления записи (метод \- POST):**

{HOST}/ru/data/v3/testmethods/docs/userdocs/create

Данные передаются в JSON формате:

{   
    "companySigDate": "2022-12-23T11:19:27.017Z\\t",   
    "companySignatureName": "test",   
    "documentName": "test",   
    "documentStatus": "test",   
    "documentType": "test",   
    "employeeNumber": "test",   
    "employeeSigDate": "2022-12-23T11:19:27.017Z\\t",   
    "employeeSignatureName": "test"   
}

* "companySigDate" \- строка содержащая дату и время в ISO формате\*   
* "companySignatureName" – произвольная строка  
* "documentName" – произвольная строка  
* "documentStatus" – произвольная строка  
* "documentType" – произвольная строка  
* "employeeNumber" \- произвольная строка  
* "employeeSigDate" \- строка содержащая дату и время в ISO формате\*  
* "employeeSignatureName" \- произвольная строка

\* [https://en.wikipedia.org/wiki/ISO\_8601](https://en.wikipedia.org/wiki/ISO_8601) 

\* [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global\_Objects/Date/toISOString](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString) 


В случае успешного выполнения запроса ответ будет содержать созданную запись и иметь  HTTP STATUS CODE 200\.

Запрос требует аутенфикации.

**Запрос для удаления записи(метод \- POST):**

{HOST}/ru/data/v3/testmethods/docs/userdocs/delete/{id}

Где id – это id записи, который получен с данными

В случае успешного выполнения запроса в ответе свойство error\_code будет иметь значение 0\.

Запрос требует аутенфикации.

**Запрос для изменения записи(метод POST):**

{HOST}/ru/data/v3/testmethods/docs/userdocs/set/{id}

Где id – это id записи, который получен с данными

Данные передаются в JSON формате.

Передаваемые данные аналогичны тем, что передаются при создании записи.

В случае успешного выполнения запроса в ответе свойство error\_code будет иметь значение 0, а свойство data будет содержать измененный объект.

Запрос требует аутенфикации.

