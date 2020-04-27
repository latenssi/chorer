import { isPast, isToday, isTomorrow } from "date-fns";

export function enrichScheduleItem(chores, areas, item) {
  const chore = chores.find((c) => c._id === item.choreId);
  const area = areas.find((a) => a._id === item.areaId);

  const labelParts = [];
  if (area) labelParts.push(area.name);
  if (chore) labelParts.push(chore.name);
  if (item.name) labelParts.push(item.name);

  const label = labelParts.join(", ");

  const last = item.events ? item.events[0].time : null;
  const next = last ? last + item.period * 1000 * 3600 * 24 : null;

  const overdue = next ? isPast(next) : false;
  const dueToday = next ? isToday(next) : false;
  const dueTomorrow = next ? isTomorrow(next) : false;

  const status = dueToday
    ? "dueToday"
    : overdue
    ? "overdue"
    : dueTomorrow
    ? "dueTomorrow"
    : null;

  return {
    ...item,
    label,
    chore,
    area,
    last,
    next,
    status,
  };
}
