export const generateRealisticPlan = (missingSkills, availability, score) => {
  if (!missingSkills || missingSkills.length === 0) {
    return {
      suggestion:
        "Excellent — you already meet all prerequisite skills. You can confidently proceed with the course.",
      plan: "Recommended action: Begin the course immediately and focus on advanced project work for deeper mastery.",
    };
  }

  const introVariants = [
    "Your current skill profile shows strong potential for this course.",
    "You're on a promising path toward this learning goal.",
    "Your background indicates a solid foundation to build upon.",
  ];

  const intensity =
    score > 70
      ? "This gap is small and can be closed quickly."
      : score > 40
        ? "This gap is moderate and requires structured learning."
        : "This gap is significant, but absolutely achievable with consistency.";

  const timeHint = availability
    ? `With approximately ${availability} of daily study, steady progress is very realistic.`
    : "With consistent daily effort, steady progress is very realistic.";

  const orderedSkills = missingSkills.slice(0, 3).join(", ");

  return {
    suggestion: `${introVariants[Math.floor(Math.random() * introVariants.length)]} ${intensity}`,
    plan: `Focus first on strengthening ${orderedSkills}. Avoid rushing — aim for clarity and hands-on practice. ${timeHint}`,
  };
};
