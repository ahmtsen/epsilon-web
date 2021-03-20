export const getQuestionnaireResult = (
  data: Record<string, unknown>
): boolean => {
  if (Array.isArray(data.q1) && !data?.q1.includes("none")) return true;
  if (Array.isArray(data.q2) && !data?.q2.includes("none")) return true;
  if (!!data?.q4 && Array.isArray(data.q4) && !data?.q4.includes("none"))
    return true;
  if (data?.q5 === "Yes") return true;
  if (data?.q6 === true) return true;
  return false;
};
