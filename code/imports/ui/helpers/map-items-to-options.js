const mapItemsToOptions = (items, nameKey, valueKey) => {
    return items.map((item) => {
        return {
            name: item[nameKey],
            value: item[valueKey]
        };
    });
};

export default mapItemsToOptions;