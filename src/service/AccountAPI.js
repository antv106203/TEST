/* eslint-disable no-unused-vars */
import { current } from "@reduxjs/toolkit";
import axiosInstance from "./axiosInstance";

export const loginAccount = async (email, password) =>{
    const response = await axiosInstance.post(`/account/login`, {
        email,
        password
    });
    return response.data;
}

export const getListAccount = async (page, limit, email, role, status) => {
    const response = await axiosInstance.post("/account/listAccount.json", {
        page, limit, email, role, status
    });
    return response.data;
}

export const blockAccount = async (email) => {
    const response = await axiosInstance.post("/account/blockAccount.json", {
        email
    });
    return response.data;
}

export const unblockAccount = async (email) => {
    const response = await axiosInstance.post("/account/unblockAccount.json", {
        email
    });
    return response.data;
}

export const deleteAccount = async (email) => {
    const response = await axiosInstance.post("/account/deleteAccount.json", {
        email
    });
    return response.data;
}

export const resetPasswordByAdmin = async (email) => {
    const response = await axiosInstance.post("/account/resetPasswordByAdmin.json", {
        email
    });
    return response.data;
}

export const registerAccount = async (email, role) => {
    const response = await axiosInstance.post("/account/register", {
        email, role
    });
    return response.data;
}

export const getAccountByEmail = async (email) => {
    const response = await axiosInstance.post("/account/getAccountByEmail.json", {
        email
    });
    return response.data;
}

export const requestPasswordChange = async (email, currentPassword) => {
    const response = await axiosInstance.post("/account/reqquestChangePassword.json", {
        email, currentPassword
    });
    return response.data;
}

export const changePasswordByUser = async (email, newPassword, otp) => {
    const response = await axiosInstance.post("/account/changePassword.json", {
        email, newPassword, otp
    })
    return response.data
}