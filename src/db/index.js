import { Polybase } from "@polybase/client";

const db = new Polybase({ defaultNamespace: "transcript-chain" });

export default db;
