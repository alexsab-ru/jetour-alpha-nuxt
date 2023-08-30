import xmltodict, json, sys, requests;
url = 'https://export.maxposter.ru/autospot/6372.xml'
response = requests.get(url)

# Проверка успешности запроса
response.raise_for_status()

xml_data = response.text

def transform_values(data):
    if isinstance(data, dict):
        for key, value in data.items():
            if value is None:
                data[key] = ""
            else:
                data[key] = transform_values(value)
    elif isinstance(data, list):
        for index, item in enumerate(data):
            if item is None:
                data[index] = ""
            else:
                data[index] = transform_values(item)
    elif isinstance(data, str):
        if data.isdigit():
            return int(data)
        return data
    return data

parsed_data = xmltodict.parse(xml_data, xml_attribs=False, force_list=False, force_cdata=False)
transformed_data = transform_values(parsed_data)

# Конвертация из XML в JSON
print(json.dumps(transformed_data, ensure_ascii=False))