import axiosInstance from "./axiosInstance";


export const fetchListDepartment = async (search, order, floor) => {
    const response = await axiosInstance.post("/department/ListDepartment.json",{search, order, floor})

    return response.data
}

export const createNewDepartment = async (department) => {
    const response = await axiosInstance.post("/department/createNewDepartment.json", department);
    return response.data
}
export const getDetailDepartment = async (_id) => {
    const response = await axiosInstance.post("/department/detailDepartment.json", { _id });
    return response.data
}
export const updateDepartment = async (_id, department) => {
    const response = await axiosInstance.put(`/department/updateDepartment.json`, department, {
        params: {
            department_id_mongodb: _id
        }
    });
    return response.data;
};