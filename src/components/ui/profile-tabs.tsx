import * as React from "react";
import { cn } from "@/lib/utils";

interface ProfileTabsProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  className?: string;
}

interface ProfileTabsContextValue {
  value: string;
  onValueChange: (value: string) => void;
}

const ProfileTabsContext = React.createContext<
  ProfileTabsContextValue | undefined
>(undefined);

export const ProfileTabs = React.forwardRef<HTMLDivElement, ProfileTabsProps>(
  (
    { defaultValue, value, onValueChange, className, children, ...props },
    ref
  ) => {
    const [tabValue, setTabValue] = React.useState(value || defaultValue || "");

    const handleValueChange = React.useCallback(
      (newValue: string) => {
        setTabValue(newValue);
        onValueChange?.(newValue);
      },
      [onValueChange]
    );

    const contextValue = React.useMemo(
      () => ({
        value: value !== undefined ? value : tabValue,
        onValueChange: handleValueChange,
      }),
      [value, tabValue, handleValueChange]
    );

    return (
      <ProfileTabsContext.Provider value={contextValue}>
        <div ref={ref} className={cn("w-full", className)} {...props}>
          {children}
        </div>
      </ProfileTabsContext.Provider>
    );
  }
);

ProfileTabs.displayName = "ProfileTabs";

interface ProfileTabsListProps extends React.HTMLAttributes<HTMLDivElement> {}

export const ProfileTabsList = React.forwardRef<
  HTMLDivElement,
  ProfileTabsListProps
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center w-full bg-white rounded-lg p-1 mb-6",
        className
      )}
      {...props}
    />
  );
});

ProfileTabsList.displayName = "ProfileTabsList";

interface ProfileTabsTriggerProps
  extends React.HTMLAttributes<HTMLButtonElement> {
  value: string;
  disabled?: boolean;
  icon?: React.ReactNode;
}

export const ProfileTabsTrigger = React.forwardRef<
  HTMLButtonElement,
  ProfileTabsTriggerProps
>(({ className, value, disabled, icon, children, ...props }, ref) => {
  const context = React.useContext(ProfileTabsContext);

  if (!context) {
    throw new Error("ProfileTabsTrigger must be used within ProfileTabs");
  }

  const isActive = context.value === value;

  return (
    <button
      ref={ref}
      role="tab"
      aria-selected={isActive}
      disabled={disabled}
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap px-4 py-2 text-sm font-normal ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 flex-1 rounded-md",
        isActive
          ? "bg-[#94cae1] text-white shadow-sm"
          : "text-uae-dark hover:bg-gray-100",
        className
      )}
      onClick={() => context.onValueChange(value)}
      {...props}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </button>
  );
});

ProfileTabsTrigger.displayName = "ProfileTabsTrigger";

interface ProfileTabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
}

export const ProfileTabsContent = React.forwardRef<
  HTMLDivElement,
  ProfileTabsContentProps
>(({ className, value, children, ...props }, ref) => {
  const context = React.useContext(ProfileTabsContext);

  if (!context) {
    throw new Error("ProfileTabsContent must be used within ProfileTabs");
  }

  const isActive = context.value === value;

  if (!isActive) return null;

  return (
    <div
      ref={ref}
      role="tabpanel"
      className={cn("animate-fade-in", className)}
      {...props}
    >
      {children}
    </div>
  );
});

ProfileTabsContent.displayName = "ProfileTabsContent";
