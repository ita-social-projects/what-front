export function updateMentor(mentors, newMentor) {
  if (!mentors) {
    return false;
  }
  return mentors.map((el) => (el.id === newMentor.id ? { ...mentors, ...newMentor } : el));
}

export function deleteMentor(mentors, id) {
  if (!mentors) {
    return false;
  }
  return mentors.filter((el) => el.id !== id);
}