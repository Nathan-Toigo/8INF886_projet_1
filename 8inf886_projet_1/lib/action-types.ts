export const ACTION_TYPES = {
  LOGIN: "login",
  LOGOUT: "logout",
  GO_TO_HOME: "go_to_home",
  GO_TO_SETTINGS: "go_to_settings",
  GO_TO_CHAT: "go_to_chat",
  TYPING_IN_CHAT: "typing_in_chat",
  SENT_IN_CHAT: "sent_in_chat",
} as const;

export type ActionType = (typeof ACTION_TYPES)[keyof typeof ACTION_TYPES];

const actionTypeSet = new Set<ActionType>(Object.values(ACTION_TYPES));

export function isActionType(value: unknown): value is ActionType {
  return typeof value === "string" && actionTypeSet.has(value as ActionType);
}
