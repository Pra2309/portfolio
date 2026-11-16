import { useNavigate } from "react-router-dom";
import { personal } from "@/data/content";

// Uses resume PDF when configured; otherwise opens recruiter mode and prints it (save as PDF).
export const ResumeButton = ({ className, children, testId }) => {
  const nav = useNavigate();
  if (personal.resumeUrl) {
    return <a href={personal.resumeUrl} download className={className} data-testid={testId}>{children}</a>;
  }
  const onClick = () => {
    if (window.location.pathname === "/recruiter") { window.print(); return; }
    nav("/recruiter?print=1");
  };
  return <button type="button" onClick={onClick} className={className} data-testid={testId}>{children}</button>;
};
