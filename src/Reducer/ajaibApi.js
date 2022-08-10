import Axios from "axios";

const getData = async(data = {}) => {
    const targetUrl = formatParameter(data.gender, data.searchValue, data.sortedColumn, data.page);
    const resp = await Axios.get(targetUrl);
    const result = resp.data;

    if (result.error) {
        throw Error (result.error);
    }
    return formatResult(result.results);
};

const formatResult = (results) => {
    if (!Array.isArray(results)) return results;
    return results.map(res => ({
        username: res.login.username,
        name: `${res.name.title} ${res.name.first} ${res.name.last}`,
        email: res.email,
        gender: res.gender,
        registered_date: res.registered.date
    }))
}

const formatParameter = (gender, searchValue, sortedColumn, page) => {
    page = page || 1;
    // const maxresults = 10;

    const url = new URL("https://randomuser.me/api/");
    // url.searchParams.set("seed", "abc");
    url.searchParams.set("page", page);
    url.searchParams.set("pageSize", 10);
    url.searchParams.set("results", 10);

    if (gender) {
        url.searchParams.set("gender", gender);
    }

    if (searchValue) {
        url.searchParams.set("keyword", searchValue);
    }

    if (sortedColumn && sortedColumn.sortBy && sortedColumn.order) {
        url.searchParams.set("sortBy", sortedColumn.sortBy);
        url.searchParams.set("sortOrder", sortedColumn.order);
    }

    return url.toString();
};

export {
    getData,
}