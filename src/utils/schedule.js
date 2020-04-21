export function enrichScheduleItem(chores, areas, item) {
  const chore = chores.find((c) => c._id === item.choreId);
  const area = areas.find((a) => a._id === item.areaId);

  const labelParts = [];
  if (chore) labelParts.push(chore.name);
  if (area) labelParts.push(area.name);
  if (item.name) labelParts.push(item.name);

  const label = labelParts.join(", ");

  return { ...item, label, chore, area };
}
