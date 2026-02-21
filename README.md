### Hexlet tests and linter status:
[![Actions Status](https://github.com/KorotchenkoSV/frontend-project-46/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/KorotchenkoSV/frontend-project-46/actions)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=KorotchenkoSV_frontend-project-46&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=KorotchenkoSV_frontend-project-46)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=KorotchenkoSV_frontend-project-46&metric=coverage)](https://sonarcloud.io/summary/new_code?id=KorotchenkoSV_frontend-project-46)

# gendiff

Утилита для сравнения конфигурационных файлов.

## Пример работы

**Сравнение JSON-файлов/YAML-файлов:**
```bash

npm run gendiff [options] <filepath1> <filepath2>

Доступные варианты:
-f, --format [type] - укажите формат вывода (по умолчанию stylish)
-h, --help - отображение справочной информации
```
###Демонстрация интерфейса

![Сравнение JSON-файлов](test-json.png)
![Сравнение YAML-файлов](test-yaml.png)
![Простой формат](simple-format.png)
