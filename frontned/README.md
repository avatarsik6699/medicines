* Определяем domain -> выделаем entities, взаимодействие между ними.

* Первично реализуем модели. Манипуляцию с данными через консоль (без ui).
* Первичная реализация сырого ui без стилизации для манипулирования данными через ui.

[] products
[] product
[] create-product
[] edit-product


* Анализ дизайна из Figma
Перед началом работы важно тщательно проанализировать дизайн:

  [Цветовая палитра] -> Определите основные цвета (primary, secondary, success, error и т.д.) и их оттенки (например, light, dark, hover, active).

  [Типографика] -> Узнайте, какие шрифты используются (font-family), их размеры (font-size), межстрочный интервал (line-height) и веса (font-weight).

  [Сетка и spacing] ->  Определите базовый размер сетки (например, 4px или 8px) и все используемые отступы (padding, margin).

  [Компоненты] -> Просмотрите повторяющиеся элементы (кнопки, карточки, формы и т.д.) и их состояния (default, hover, focus, disabled).

  [Темизация] -> Если дизайн поддерживает светлую и темную темы, убедитесь, что вы знаете, как цвета и стили меняются между ними.
  Эта информация будет основой для настройки Tailwind CSS и shadcn/ui.


[] feature
  1. Добавить отображение товаров в виде карточек.
  2. Добавить фильтры
    - булевые: только с фото, только со скидками...
    - поиск по названию.
    - по диапазону цен.