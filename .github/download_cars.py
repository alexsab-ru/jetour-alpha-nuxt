import xmltodict, json, sys, requests;
url = 'https://export.maxposter.ru/autospot/6372.xml'
response = requests.get(url)

# Проверка успешности запроса
response.raise_for_status()

xml_data = response.text

def transform_values(item):
    if isinstance(item, dict):
        for key, value in item.items():
            if value is None:
                item[key] = ""
            else:
                transform_values(value)
    elif isinstance(item, list):
        for index, item in enumerate(item):
            if item is None:
                item[index] = ""
            else:
                transform_values(item)
    elif item == '' or item is None:
        return ""
    elif isinstance(item, str) and item.isdigit():
        return int(item)
    return item

parsed_data = xmltodict.parse(xml_data, xml_attribs=False, force_list=False, force_cdata=False)
transformed_data = transform_values(parsed_data)

# Конвертация из XML в JSON
print(json.dumps(transformed_data, ensure_ascii=False))