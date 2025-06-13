import axiosInstance from "./axiosInstance";

export const fetchListStaff = async(id_department,page, limit, full_name, user_code, order, status) =>{
    const res = await axiosInstance.post("/user/listUser.json", {id_department,page, limit, full_name, user_code, order, status});
    return res.data
}

export const deletePreStaff = async(_idUser) => {
    const res  = await axiosInstance.post("/user/deletePre.json", {_idUser});
    return res.data
}

export const restoreStaff = async(_idUser) => {
    const res  = await axiosInstance.post("/user/restoreUser.json", {_idUser});
    return res.data
}

export const createNewUser = async(userData) => {

    // userData là một đối tượng chứa thông tin của người dùng mới
    // ví dụ: { full_name: "Nguyen Van A", user_code: "123
    // Tạo một đối tượng FormData để gửi dữ liệu
    // FormData là một đối tượng cho phép bạn xây dựng một tập hợp các cặp key/value để gửi dữ liệu qua HTTP
    // trong trường hợp này là gửi dữ liệu đến máy chủ
    // thông qua một yêu cầu POST
    // với kiểu dữ liệu là multipart/form-data
    // thường được sử dụng để tải lên tệp (file upload)
    // hoặc gửi dữ liệu không phải là JSON
    // trong trường hợp này là gửi dữ liệu không phải là JSON
    // và có thể bao gồm cả tệp (file) như ảnh đại diện (avatar)

    const res = await axiosInstance.post("/user/createNewUser.json", userData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });

    return res.data;
}

export const updateStaff = async (formData, id) => {
    const res = await axiosInstance.put("/user/updateUser.json", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
        params: {
            id: id,
        },
    });
    return res.data;
};

export const getDetailStaff = async(_idUser) => {
    const res = await axiosInstance.post("/user/detailUser.json", {_idUser});
    return res.data;
}

export const deleteStaff = async (_idUser) => {
    const res = await axiosInstance.post("/user/delereSec.json", {_idUser});
    return res.data;
}