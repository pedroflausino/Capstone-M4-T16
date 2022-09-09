import { Request, Response } from "express";
import { AppError, handleError } from "../errors/AppError";
import createCompanyService from "../services/companies/createCompany.service";
import deleteCompanyService from "../services/companies/deleteCompany.service";
import listCompaniesService from "../services/companies/listCompanies.service";
import listCompanyService from "../services/companies/listCompany.service";
import updateCompanyService from "../services/companies/updateCompany.service";

export const createCompanyController = async (req: Request, res: Response) => {
    try {
        const { name, email, password, address } = req.body;

        const newCompany = await createCompanyService({
            name,
            email,
            password,
            address,
        });

        return res.status(201).json(newCompany);
    } catch (err) {
        if (err instanceof AppError) {
            handleError(err, res);
        }
    }
};

export const listCompanyController = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const company = await listCompanyService(id);

        res.status(200).json(company);
    } catch (err) {
        if (err instanceof AppError) {
            handleError(err, res);
        }
    }
};

export const updateCompanyController = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { name, email, password, address } = req.body;
        const company = await updateCompanyService(id, {
            name,
            email,
            password,
            address,
        });

        res.status(201).json(company);
    } catch (err) {
        if (err instanceof AppError) {
            handleError(err, res);
        }
    }
};

export const deleteCompanyController = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const isDeleted = await deleteCompanyService(id);

        return res.status(200);
    } catch (err) {
        if (err instanceof AppError) {
            handleError(err, res);
        }
    }
};

export const listCompaniesController = async (req: Request, res: Response) => {
    try {
        const companies = await listCompaniesService();
    } catch (err) {
        if (err instanceof AppError) {
            handleError(err, res);
        }
    }
};
