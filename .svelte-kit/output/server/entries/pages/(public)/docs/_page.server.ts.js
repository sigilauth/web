import { l as listDocs } from "../../../../chunks/docs.js";
async function load() {
  const docs = await listDocs();
  return { docs };
}
export {
  load
};
