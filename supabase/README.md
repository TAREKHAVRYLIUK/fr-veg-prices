
# Інструкції для налаштування Supabase Edge Function

## Структура бази даних

1. Створіть таблицю `vegetable_prices`:

```sql
CREATE TABLE public.vegetable_prices (
    id bigint NOT NULL,
    name text NOT NULL,
    metro numeric NOT NULL,
    silpo numeric NOT NULL,
    atb numeric NOT NULL,
    unit text NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);

ALTER TABLE public.vegetable_prices ADD CONSTRAINT vegetable_prices_pkey PRIMARY KEY (id);
```

2. Створіть таблицю `update_info`:

```sql
CREATE TABLE public.update_info (
    id integer DEFAULT 1 NOT NULL,
    last_updated timestamp with time zone DEFAULT now() NOT NULL
);

ALTER TABLE public.update_info ADD CONSTRAINT update_info_pkey PRIMARY KEY (id);
```

3. Вставте початкові дані:

```sql
INSERT INTO public.vegetable_prices (id, name, metro, silpo, atb, unit)
VALUES
  (1, 'Картопля', 16.50, 15.90, 14.50, 'кг'),
  (2, 'Морква', 12.90, 11.50, 10.90, 'кг'),
  (3, 'Буряк', 14.20, 13.90, 12.50, 'кг'),
  (4, 'Цибуля', 18.90, 17.50, 16.90, 'кг'),
  (5, 'Часник', 89.90, 86.50, 82.90, 'кг'),
  (6, 'Помідори', 42.90, 39.90, 38.50, 'кг'),
  (7, 'Огірки', 38.50, 37.90, 36.50, 'кг'),
  (8, 'Перець', 65.90, 62.50, 59.90, 'кг'),
  (9, 'Капуста', 16.90, 15.90, 14.50, 'кг'),
  (10, 'Кабачки', 28.90, 26.50, 24.90, 'кг');

INSERT INTO public.update_info (id, last_updated)
VALUES (1, now());
```

## Створення Edge Function для скрапінгу

1. Створіть нову Edge Function з назвою `update-prices`:

```bash
npx supabase functions new update-prices
```

2. Вміст файлу `update-prices/index.ts`:

```typescript
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { load } from 'https://esm.sh/cheerio@1.0.0-rc.12';
import { DOMParser } from 'https://deno.land/x/deno_dom/deno-dom-wasm.ts';

// Потрібні для роботи змінні середовища Supabase
const supabaseUrl = Deno.env.get('SUPABASE_URL') as string;
const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') as string;

// Функція для скрапінгу сайту Metro
async function scrapeMetro() {
  // Тут буде логіка скрапінгу сайту Metro
  // Для прикладу повертаємо тестові дані з невеликими змінами
  return {
    'Картопля': 16.90,
    'Морква': 12.50,
    'Буряк': 14.50,
    'Цибуля': 19.20,
    'Часник': 88.50,
    'Помідори': 41.90,
    'Огірки': 39.90,
    'Перець': 66.50,
    'Капуста': 17.20,
    'Кабачки': 29.90
  };
}

// Функція для скрапінгу сайту Silpo
async function scrapeSilpo() {
  // Тут буде логіка скрапінгу сайту Silpo
  // Для прикладу повертаємо тестові дані з невеликими змінами
  return {
    'Картопля': 15.50,
    'Морква': 11.90,
    'Буряк': 13.50,
    'Цибуля': 17.90,
    'Часник': 85.90,
    'Помідори': 40.50,
    'Огірки': 38.20,
    'Перець': 63.90,
    'Капуста': 16.50,
    'Кабачки': 27.90
  };
}

// Функція для скрапінгу сайту ATB
async function scrapeATB() {
  // Тут буде логіка скрапінгу сайту ATB
  // Для прикладу повертаємо тестові дані з невеликими змінами
  return {
    'Картопля': 14.90,
    'Морква': 10.50,
    'Буряк': 12.90,
    'Цибуля': 16.50,
    'Часник': 83.50,
    'Помідори': 37.90,
    'Огірки': 35.90,
    'Перець': 58.50,
    'Капуста': 14.90,
    'Кабачки': 24.50
  };
}

// Головна функція обробки запиту
Deno.serve(async (req) => {
  try {
    // Перевірка на тільки POST запити
    if (req.method !== 'POST') {
      return new Response(JSON.stringify({ error: 'Тільки POST запити дозволені' }), {
        status: 405,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Ініціалізація Supabase клієнта
    const supabase = createClient(supabaseUrl, serviceKey);

    // Отримуємо дані зі скрапінгу
    const [metroData, silpoData, atbData] = await Promise.all([
      scrapeMetro(),
      scrapeSilpo(),
      scrapeATB()
    ]);

    // Отримуємо всі овочі з бази даних
    const { data: vegetables, error: fetchError } = await supabase
      .from('vegetable_prices')
      .select('id, name');

    if (fetchError) {
      throw new Error(`Помилка отримання овочів: ${fetchError.message}`);
    }

    // Оновлюємо ціни для кожного овочу
    const updates = vegetables.map(veggie => {
      const name = veggie.name;
      
      return supabase
        .from('vegetable_prices')
        .update({
          metro: metroData[name] || 0,
          silpo: silpoData[name] || 0,
          atb: atbData[name] || 0,
          updated_at: new Date().toISOString()
        })
        .eq('id', veggie.id);
    });

    // Виконуємо всі оновлення паралельно
    await Promise.all(updates);

    // Оновлюємо час останнього оновлення
    await supabase
      .from('update_info')
      .update({ last_updated: new Date().toISOString() })
      .eq('id', 1);

    return new Response(JSON.stringify({ success: true, message: 'Ціни успішно оновлено' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Помилка оновлення цін:', error);
    
    return new Response(JSON.stringify({ error: `Помилка оновлення цін: ${error.message}` }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
});
```

## Налаштування планувальника

1. Встановіть планувальник Supabase у вашому проєкті, що викликатиме Edge Function щодня о 09:00:

```
функція cron:
0 9 * * * curl -X POST https://yoursupabaseproject.supabase.co/functions/v1/update-prices -H "Authorization: Bearer YOUR_ANON_KEY"
```

2. Не забудьте змінити URL на власний проєкт Supabase.
