export default function formatJSON(jsonString, indent, plainOnError) {
  if (!jsonString) return undefined;
  try {
    return JSON.stringify(JSON.parse(jsonString), null, indent || 2);
  } catch (error) {
    if (plainOnError === true) return jsonString;
    throw error;
  }
}
