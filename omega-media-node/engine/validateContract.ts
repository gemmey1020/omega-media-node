import Ajv from "ajv";
import addFormats from "ajv-formats";
import schema from "../contract/media.contract.schema.v1.json";

const ajv = new Ajv({ allErrors: true, strict: true });
addFormats(ajv);

const validate = ajv.compile(schema);

export function validateContract(contract: any) {
  const ok = validate(contract);
  if (!ok) {
    const errors = validate.errors
      ?.map((e) => `${e.instancePath} ${e.message}`)
      .join("\n");
    throw new Error(`Contract validation failed:\n${errors}`);
  }
}
