const formatDateDDMMYYYYHHmm = (date) => {
    if (!date) return "";
    const tempDate = new Date(date);

    const dates = tempDate.getDate() < 10 ? "0" + tempDate.getDate() : tempDate.getDate();
    const month = (tempDate.getMonth() + 1) < 10 ? "0" + (tempDate.getMonth() + 1) : tempDate.getMonth() + 1;
    const year = tempDate.getFullYear();
    const hour = tempDate.getHours() < 10 ? "0" + tempDate.getHours() : tempDate.getHours();
    const minute = tempDate.getMinutes() < 10 ? "0" + tempDate.getMinutes() : tempDate.getMinutes();

    return `${dates}-${month}-${year} ${hour}:${minute}`
};

const filterArrayOfObj = (datas=[{}], search="") => {
    if (!Array.isArray(datas) || !search) return datas;

    search = search.toLowerCase();

    return datas.filter(data => {
        return Object.values(data).some(value => {
            return value.toLowerCase().includes(search);
        })
    })
};

const sortArrayOfObj = (datas = [], sortBy="", order="") => {
    if (!Array.isArray(datas) || !sortBy || !order) return datas;

    return datas.sort((a, b) => {
        if (!a[sortBy]) return 0;

        if (sortBy === "registered_date") {
            const da = new Date(a[sortBy]);
            const db = new Date(b[sortBy]);

            if (order === "ascend") {
                return (da - db);
            } else if (order === 'descend') {
                return (db - da);
            }
        }

        if (order === "ascend") {
            return ((a[sortBy] > b[sortBy]) ? 1 : (a[sortBy] < b[sortBy]) ? -1 : 0)
        }
        if (order === "descend") {
            return ((a[sortBy] > b[sortBy]) ? -1 : (a[sortBy] < b[sortBy]) ? 1 : 0)
        }
        return 0;
    })
};

export {
    formatDateDDMMYYYYHHmm,
    filterArrayOfObj,
    sortArrayOfObj
}