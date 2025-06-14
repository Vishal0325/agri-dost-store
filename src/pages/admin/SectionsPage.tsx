
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function SectionsPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Admin - App Sections</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <p>This page allows admin to manage app sections. Add, update, or remove sections here.</p>
        </div>
      </CardContent>
    </Card>
  );
}
