import { type ReactNode } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";

interface EmptyStateProps {
  title: string;
  description?: string;
  action?: {
    label: string;
    to: string;
  };
  icon?: ReactNode;
}

export function EmptyState({
  title,
  description,
  action,
  icon,
}: EmptyStateProps) {
  return (
    <div className="container flex items-center justify-center min-h-[400px]">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          {icon && <div className="mx-auto mb-4">{icon}</div>}
          <CardTitle>{title}</CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
        {action && (
          <CardContent>
            <Button asChild>
              <Link to={action.to}>{action.label}</Link>
            </Button>
          </CardContent>
        )}
      </Card>
    </div>
  );
}

