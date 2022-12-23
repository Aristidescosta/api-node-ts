import { Request, RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";
import { validation } from "../../shared/middlewares";

interface ICidade {
  nome: string;
  state: string;
}

const bodyValidation: yup.SchemaOf<ICidade> = yup.object().shape({
  nome: yup.string().required().min(3),
  state: yup.string().required(),
});

interface IFilter {
  filter?: string;
}

const filterValidation: yup.SchemaOf<IFilter> = yup.object().shape({
  filter: yup.string().required().min(3),
});

export const createBodyValidation: RequestHandler = async (req, res, next) => {
  try {
    await bodyValidation.validate(req.body, { abortEarly: false });
    return next();
  } catch (error) {
    const yupError = error as yup.ValidationError;
    const validationError: Record<string, string> = {};

    yupError.inner.forEach((error) => {
      if (!error.path) return;
      validationError[error.path] = error.message;
    });

    return res.status(StatusCodes.BAD_REQUEST).json({ validationError });
  }
};

export const createQueryValidation: RequestHandler = async (req, res, next) => {
  try {
    await filterValidation.validate(req.query, { abortEarly: false });
    return next();
  } catch (error) {
    const yupError = error as yup.ValidationError;
    const validationError: Record<string, string> = {};

    yupError.inner.forEach((error) => {
      if (!error.path) return;
      validationError[error.path] = error.message;
    });

    return res.status(StatusCodes.BAD_REQUEST).json({ validationError });
  }
};

export const createValidation = validation();

export const create: RequestHandler = async (
  req: Request<{}, {}, ICidade>,
  res: Response
) => {
  res.send("Criado");
};
