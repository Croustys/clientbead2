import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function getEmploymentType(t) {
  switch (t) {
    case "full-time":
      return "Full time";
    case "part-time":
      return "Part time";
    case "internship":
      return "Internship";
    default:
      return "Full time";
  }
}

export function formatSalary(salaryFrom, salaryTo) {
  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1).replace('.0', '') + 'M';
    } else {
      return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    }
  };

  return `${formatNumber(salaryFrom)} - ${formatNumber(salaryTo)} Ft`;
}