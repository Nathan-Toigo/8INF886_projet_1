import { pool } from "@/lib/db";
import { ActionType } from "@/lib/action-types";

const actionIdCache = new Map<ActionType, number>();

async function getActionId(actionName: ActionType): Promise<number> {
  const cachedId = actionIdCache.get(actionName);
  if (cachedId) {
    return cachedId;
  }

  const [rows] = await pool.execute(
    "SELECT id_actions FROM actions WHERE name = ? LIMIT 1",
    [actionName]
  ) as [{ id_actions: number }[], unknown];

  const action = rows[0];
  if (!action) {
    throw new Error(`Unknown action type in DB: ${actionName}`);
  }

  actionIdCache.set(actionName, action.id_actions);
  return action.id_actions;
}

export async function logUserAction(userId: number, actionName: ActionType): Promise<void> {
  const actionId = await getActionId(actionName);

  await pool.execute(
    "INSERT INTO logs (id_actions, id_users, date) VALUES (?, ?, NOW())",
    [actionId, userId]
  );
}
