import axiosInstance from "./axiosInstance";

export const generalInfomation = async () => {
    const response = await axiosInstance.post("/general/generalInfomation.json");
    return response.data;
}
export const recentHistoryAccess = async () => {
    const response = await axiosInstance.post("/general/recentHistoryAccess.json");
    return response.data;
}
export const accessChartData = async (range) => {
    const response = await axiosInstance.post("/general/accessChartData.json", {
        range
    });
    return response.data;
}