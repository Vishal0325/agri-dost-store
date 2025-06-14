
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function CategoriesPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Admin - Categories</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Manage categories: create/edit/delete categories.</p>
      </CardContent>
    </Card>
  );
}
