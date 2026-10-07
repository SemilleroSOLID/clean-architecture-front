import dayjs from "dayjs";
import { getTypeRequirement } from "../services/requirement.service";

const MAX_GRADE = 5.0;

// Same rules as the backend (CU-001): start after today, end at least one day after the start.
// When editing, a start date that did not change is accepted even if it already passed (same rule as the backend).
const isSameDay = (date, otherDate) => Boolean(date && otherDate) && date.isSame(otherDate, "day");

export const isNotAfterToday = (date) => Boolean(date) && !date.isAfter(dayjs(), "day");

export const disabledStartDate = (originalStartDate) => (date) =>
  isNotAfterToday(date) && !isSameDay(date, originalStartDate);

export const startDateRule = (originalStartDate) => ({
  validator: (_, value) =>
    isNotAfterToday(value) && !isSameDay(value, originalStartDate)
      ? Promise.reject(new Error("La fecha de inicio debe ser posterior a hoy"))
      : Promise.resolve(),
});

export const endDateRule = ({ getFieldValue }) => ({
  validator: (_, value) => {
    const startDate = getFieldValue("startDate");
    if (value && startDate && value.isBefore(startDate.add(1, "day"), "day")) {
      return Promise.reject(
        new Error("La fecha de fin debe ser al menos un día después de la fecha de inicio")
      );
    }
    return Promise.resolve();
  },
});

const parseNumber = (value) => {
  const number = Number(String(value).trim().replace(",", "."));
  return String(value).trim() !== "" && Number.isFinite(number) ? number : null;
};

// A numeric value must be greater than 0; a grade must be a number between 0 (exclusive) and 5.0.
export const requiredValueRule = ({ getFieldValue }) => ({
  validator: async (_, value) => {
    if (value === undefined || value === null || String(value).trim() === "") return;
    const requirementTypes = await getTypeRequirement();
    const isGrade = requirementTypes.find(({ id }) => id === getFieldValue("requirementId"))?.grade;
    const number = parseNumber(value);
    if (isGrade && number === null) throw new Error("La nota debe ser un número");
    if (number !== null && number <= 0) throw new Error("El valor debe ser mayor a 0");
    if (isGrade && number > MAX_GRADE) throw new Error("La nota no puede ser mayor a 5.0");
  },
});
