function validateName(name) {
  return typeof name === "string" && name.length >= 2;
}

function validateId(id) {
  return typeof id === "string" && id.length === 13;
}

function validatePeriod(period) {
  const num = Number(period);
  return Number.isInteger(num) && num > 0;
}

export function chore(data) {
  return validateName(data.name);
}

export function area(data) {
  return validateName(data.name);
}

export function schedule(data) {
  const nameOk = validateName(data.name);
  const choreOk = validateId(data.choreId);
  const areaOk = validateId(data.areaId);
  const periodOk = validatePeriod(data.period);
  return periodOk && (nameOk || (choreOk && areaOk));
}
