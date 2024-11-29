import { FC, useEffect, useRef } from "react";

import "./PhishingEmailCard.css";
import { generateDangerouslySetInnerHTML } from "utils";
import { phishingAttempts } from "store/phishing/actions";
import { useAppDispatch } from "libraries";
import { set } from "lodash";

export interface TPhishingEmailCardProps {
  content: string;
  status: string;
  id: string;
  email: string;
}

export const PhishingEmailCard: FC<TPhishingEmailCardProps> = ({
  status,
  id,
  email,
  content,
}) => {
  const dispatch = useAppDispatch();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleLinkClick = (event: MouseEvent) => {
      event.preventDefault();
      dispatch(phishingAttempts());
      const target = event.target as HTMLAnchorElement | null;

      if (target && target.href) {
        window.open(target.href, "_blank");
      }
    };

    const container = containerRef.current;
    container?.addEventListener("click", handleLinkClick);

    return () => {
      container?.removeEventListener("click", handleLinkClick);
    };
  }, []);

  const modifiedContent = generateDangerouslySetInnerHTML(content);

  return (
    <div className="card">
      <p>
        <span style={{ fontWeight: "bold" }}>ID:</span> {id}
      </p>

      <p className="status">
        <span style={{ fontWeight: "bold" }}>Status:</span>{" "}
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </p>

      <p>
        <span style={{ fontWeight: "bold" }}>Email:</span> {email}
      </p>

      <p>
        <span style={{ fontWeight: "bold" }}>Content:</span>
        <div
          ref={containerRef}
          className="content"
          dangerouslySetInnerHTML={{ __html: modifiedContent }}
        />
      </p>
    </div>
  );
};
