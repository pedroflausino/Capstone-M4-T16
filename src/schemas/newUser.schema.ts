import { IUserSchema } from "../interfaces/users";
import * as yup from "yup";
import { SchemaOf } from "yup";

const newUserSchema: SchemaOf<IUserSchema> = yup.object().shape({
  email: yup.string().email().required(),
  name: yup.string().required(),
  password: yup.string().required(),
  address: yup.object({
    district: yup.string().required(),
    zipCode: yup.string().required().max(8, "Invalid zip code"),
    number: yup.string(),
    city: yup.string().required(),
    state: yup.string().required().max(2, "Invalid state"),
  }),
});

export { newUserSchema };
