export const formatDateYMDUTC = (input: Date | string | number) => {
  const d = input instanceof Date ? input : new Date(input);
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: "UTC",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(d); 
};

export const safeText = (v: unknown) => String(v ?? "");