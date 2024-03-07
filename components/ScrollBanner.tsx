import { Children, cloneElement } from "react";

export default function ScrollBanner({
  children,
}: {
  children: React.ReactNode;
}) {
  const ariaHiddenChildren = Children.map(children, (child) => {
    return cloneElement(child as React.ReactElement, {
      "aria-hidden": true,
    });
  });

  return (
    <div className="inline-flex w-full gap-x-6 overflow-x-hidden py-3">
      {children}
      {ariaHiddenChildren}
      {ariaHiddenChildren}
    </div>
  );
}
