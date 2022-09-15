import { Request, Response } from "express";
import { IAddress } from "../../interfaces/address";
import updateAddressService from "../../services/address/updateAddress.service";

const updateAddressController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { district, zipCode, number, city, state }: IAddress = req.body;

  const newAdress = await updateAddressService(id, {
    district,
    zipCode,
    number,
    city,
    state,
  });

  res.status(201).json(newAdress);
};

export { updateAddressController };
