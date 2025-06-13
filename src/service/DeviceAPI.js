import axiosInstance from "./axiosInstance";

export const getListDevice = async (page, limit, search, order, department_id) => {
    const response = await axiosInstance.post("/device/ListDevice.json", {
        page,
        limit,
        search,
        order,
        department_id
    });
    return response.data;
}

export const getUnregisteredDevices = async () => {
    const response = await axiosInstance.get("/device/getUnregisteredDevices.json");
    return response.data;
}

export const createDevice = async (device_name, department_id, mac_address) => {
    const response = await axiosInstance.post("/device/createNewDevice.json", {
        device_name,
        department_id,
        mac_address
    });
    return response.data;
}

export const getDeviceDetail = async (_id) => {
    console.log(_id);
    const response = await axiosInstance.post("/device/detailDevice.json", {
        _id
    });
    return response.data;
}

export const updateDevice = async ( _id, device_name) => {
    const response = await axiosInstance.put("/device/updateDevice.json", {
            device_name
        }, {
            params: {
                _id
            }
        }
    );
    return response.data;
}

export const deleteDevice = async(_id) => {
    const response = await axiosInstance.post("/device/deleteDevice.json", {
            _id
        }
    );
    return response.data;
}