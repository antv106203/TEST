import axiosInstance from "./axiosInstance";

export const requestCreateFingerprint = async (mac_address) => {
    const response = await axiosInstance.post("/fingerprint/requestCreateFingerprint.json", {
        mac_address
    });
    return response.data;
}

export const createFingerprint = async (fingerprint_id, fingerprint_name, expiry_at, user_id, device_id) => {
    const response = await axiosInstance.post("/fingerprint/createFingerprint.json", {
        fingerprint_id, fingerprint_name, expiry_at, user_id, device_id
    });
    return response.data;
}

export const getListFingerprint = async (page, limit, search,  order , status, user_id, device_id) => {
    const response = await axiosInstance.post("/fingerprint/listFingerprint.json", {
        page, limit, search,  order , status, user_id, device_id
    });
    return response.data;
}

export const getFingerprintDetail = async (_id) => {
    const response = await axiosInstance.post("/fingerprint/getDetailFingerprint.json", {
        _id
    });
    return response.data;
}

export const updateFingerprint = async (fingerprint_id, fingerprint_name, expiry_at) => {
    const response = await axiosInstance.put("/fingerprint/updateFingerprint.json", {
        fingerprint_name, expiry_at
    }, {
        params: {
            _id: fingerprint_id
        }
    });
    return response.data;
}

export const enableFingerprint = async (fingerprint_id, expiry_at) => {
    const response = await axiosInstance.put(
        "/fingerprint/enableFingerprint.json",
        {
            expiry_at
        },
        {
            params: {
                id_fingerprint: fingerprint_id,
            },
        }
    );
    return response.data;
};

export const disableFingerprint = async (fingerprint_id) => {
    const response = await axiosInstance.post(
        "/fingerprint/disableFingerprint.json",
        {id_fingerprint: fingerprint_id}
    );
    return response.data;
}

export const deleteFingerprint = async (fingerprint_id,mac_address, _id) => {
    const response = await axiosInstance.post("/fingerprint/deleteFingerprint.json", {
            fingerprint_id,
            mac_address,
            _id
        }
    );
    return response.data;
}