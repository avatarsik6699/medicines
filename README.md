# Drug Search Application
  ## forkflow and goals.

  * Pref.
      - Изначально фулл разработка бекенда.
      - Разработка под desktop/mobile first в рамках отдельного сайта.
      ...
      - Интеграция в tg mini apps. 

  * Stack.
    - Backend
      - NestJS.
      - PostgreSQL + TypeORM.
      - SwaggerUI.
      - Playwright as scrapper.
    - Frontend
      - [Укажите стек фронтенда]
    - Infra
      - Nginx.
      - Docker + Docker-Desktop.
    
  * Function requirements.
      - [ search drugs ] Я хочу иметь возможность быстро искать нужные мне лекарственные средства в Лен. Области.
      - [ filters ] Для более быстрого поиска осуществляется поиск по ключ. словам + фильтры для сужения области поиска.
      - [ map of drugs ] Иметь возможность искать препараты визуально на карте относительно моего текущего местоположения.

  * Non-Func. reqs.
      - Авторизация пользователя в системе.
      - Сбор статистики о том, какие препараты чаще ищут, какой пол, возраст и т.д.
      - сохранение информации для быстрого поиска.
      - [ events + periodic tasks ] уведомления в тг о появлении нужных препаратов.
  
  ## Entities.

    ```typescript
      interface BaseEntityFields {
        id: PrimaryKey;
        createdAt: Date;
        updatedAt: Date;
      }

      // Фармакологическая группа
      interface PharmacologicalGroup {
        ...BaseEntityFields
        name: varchar(255);// НПВС, антибиотики, антигистаминные и т.д.
        description: text; // Описание группы препаратов. 
      }

      // Действующее вещество - МНН 
      interface ActiveSubstance {
        ...BaseEntityFields
        name: varchar(255); // МНН флуоксетин, анальгин и тд
        description: text; // Конкретные характеристики и описание препарата.

        pharmacologicalGroupId: ForeignKey; // группа к которой относится преп.

        // chemicalFormula?: text;


      }

      // Торговое наименование - ТН
      interface TradeName {
        ...BaseEntityFields
        name: varchar(255); // ТН Прозак, металгин и тд
        description: text; // Конкретные характеристики и описание препарата.
        originCountry: varchar(255) // страна производитель

        activeSubstanceId: ForeignKey -> ActiveSubstance

        isOriginal?: Bool // является ли оригинальным препом 
      }

      // Лек. препарат - ТН 
      interface Drug {
        ...BaseEntityFields;

        tradeNameId: ForeignKey -> TradeName;
        dosage: varchar(255);// дозировка
      }

      // Сеть аптек
      interface PharmacyChain {
        ...BaseEntityFields
        name: varchar(255) // "Аптека №1", "36.6", "Ригла" и т.д.
        description: text // Описание сети

        logoLink?: Link -> Image ; // логотип сети
        websiteLink?: Link -> Website // сайт сети
      }

      // Конкретный филиал аптеки
      interface Pharmacy {
        ...BaseEntityFields;

        contact: {
          phone: string;       // телефон
          email?: string;      // email
          whatsapp?: string;   // whatsapp
        };

        workingHours: {
          is24Hours: boolean;  // круглосуточная ли
          daysOfWeeks: {
            openTime: string, closeTime: string
          }[];   // день недели (0-6)
        };

        address: {
          street: string;      // улица
          house: string;       // дом
          building?: string;   // корпус
          apartment?: string;  // помещение
          city: string;        // город
          region: string;      // регион
          postalCode: string;  // почтовый индекс
          coordinates: {       // координаты для карты
            latitude: number;
            longitude: number;
            };
        };
      }

      // Связь аптека - препараты (цена, кол-во).
      interface DrugAvailableInPharmacy {
        ...BaseEntityFields;

        drugId: ForeignKey -> Drug
        pharmacyId: ForeignKey -> Pharmacy
        price: Int
        quantity: Int
      }

    ### Structure.
      
      src/
      ├── core/                    # Ядро приложения
      │   ├── domain/             # Доменные сущности и логика
      │   │   ├── drug/          # Модуль препаратов
      │   │   ├── pharmacy/      # Модуль аптек
      │   │   └── search/        # Модуль поиска
      │   ├── shared/            # Общие компоненты
      │   │   ├── interfaces/    # Интерфейсы
      │   │   ├── types/        # Типы
      │   │   └── utils/        # Утилиты
      │   └── core.module.ts     # Основной модуль
      │
      ├── scraping/              # Модуль скрапинга
      │   ├── parsers/          # Парсеры для разных сайтов
      │   │   ├── apteka.ru/
      │   │   ├── 366.ru/
      │   │   └── rigla.ru/
      │   ├── services/         # Сервисы скрапинга
      │   │   ├── playwright.service.ts
      │   │   └── axios.service.ts
      │   └── scraping.module.ts
      ├── auth/                   # Модуль авторизации
      │   ├── domain/            # Доменные сущности авторизации
      │   │   ├── user/         # Пользователь
      │   │   ├── role/         # Роли
      │   │   └── permission/   # Разрешения
      │   ├── infrastructure/    # Инфраструктурный слой
      │   │   ├── jwt/          # JWT стратегия
      │   │   ├── guards/       # Гварды
      │   │   └── decorators/   # Декораторы
      │   ├── application/      # Прикладной слой
      │   │   ├── services/     # Сервисы
      │   │   ├── dto/         # DTO
      │   │   └── interfaces/  # Интерфейсы
      │   └── auth.module.ts
      ├── admin/                # Админ панель
      │   ├── controllers/     # Контроллеры админки
      │   ├── services/       # Сервисы админки
      │   ├── dto/           # DTO для админки
      │   └── admin.module.ts
      │
      └── app.module.ts        # Корневой модуль

      Как хранить дозировку? 

      Аналог - препарат из той же PharmacologicalGroup, но с друим ActiveSubstance
      Синоним - дженерик с тем же ActiveSubstance, но с другим TradeName

    Backend TODO:
      [] Работа с миграциями описана костыльно + необходимо предварительно билдить код, т.к. миграции
      применяются на директории /dist. 
        - нужно доработать скрипт так, чтобы при применении миграций выполнялся npm run build.
        - далее происходит подключение к data-source (отдельный файл сделать по хорошему нужно).
        - после этого на сбилженной директории генерятся миграции.
        - можно добавить флаг, который тут же их применяет после генерации.
        
      [] Реализовать декларативную библиотеку для сидирования данных.
      [] Логгирование данных, собранных сущностей/миграций в data-source. Разобраться с работой путей в разных ОС и в Node.js. 
      [] Улучшение дебаггинга



CORE FEATURES:
  1. [+]Поиск препарата - ввожу запрос в поисковую строку:
     - [+-]Показываются все совпадения по TRADE_NAMES [+] / ACTIVE_SUBSTANCES [-], которые есть. Нужна функция для выдачи подсказок по TN/AS.
       [+]Надо понять какой sql запрос позволяет это сделать с выдачей списка подсказок.
     - [+]Выбираю из списка TN, что мне подходит на данный момент
     - [-]Выбираю из списка AS, что мне подходит на данный момент
       - показываю доп. список доступных TN с выбранным AS.
       - выбираю TN.
     - [+]Показываю AvailableDrugs + дозировка в связке с аптекой, где есть данный препрат.
       - [-]Список отображается в пагинированном виде / бесконечная прокрутка.
  2. Фильтры (сужение поиска).
     - Фильтрация по региону, по району, метро, сети аптек. Может быть выставлено в самом начале перед поиском.
     - По дозировке, если есть вариации дозировок для Drug на шаге, когда получили список AvailableDrugs.
        

        
    ```
    
  
  
  

