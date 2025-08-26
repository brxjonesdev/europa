"use client";

import React from "react";
import { Resource } from "@/features/knowledge-base/types";
import { MultiStepForm } from "@/shared/ui/multi-step-form";
import { Input } from "@/shared/ui/input";
import { Textarea } from "@/shared/ui/textarea";
import { Label } from "@/shared/ui/label";

const initialResource: Resource = {
  id: "",
  title: "",
  description: "",
  link: "",
};

export default function ResourcesPage() {
  return (
    <div className="max-w-2xl mx-auto py-8">
      <MultiStepForm<Resource>
        title="Add a New Resource"
        description="Provide details for the new resource you’d like to add."
        initialData={initialResource}
        type="Resource"
        onSubmit={(data) => {
          console.log("Submitted:", data);
          // send to API here
        }}
        successContent={
          <div className="space-y-4 text-center">
            <h2 className="text-2xl font-bold">Resource Added!</h2>
            <p className="text-muted-foreground">
              Your resource has been successfully created.
            </p>
            <button
              className="px-4 py-2 rounded-md bg-primary text-primary-foreground"
              onClick={() => window.location.reload()}
            >
              Add Another
            </button>
          </div>
        }
        steps={[
          {
            title: "Resource Info",
            content: (data, update) => (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={data.title}
                    onChange={(e) => update("title", e.target.value)}
                    placeholder="Enter resource title"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description (optional)</Label>
                  <Textarea
                    id="description"
                    className="resize-none h-28"
                    value={data.description || ""}
                    onChange={(e) => update("description", e.target.value)}
                    placeholder="Add a short description (optional)"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="link">Link</Label>
                  <Input
                    id="link"
                    type="url"
                    value={data.link}
                    onChange={(e) => update("link", e.target.value)}
                    placeholder="https://example.com"
                  />
                </div>
              </div>
            ),
            validate: (data) => !!data.title && !!data.link,
          },
          {
            title: "Summary",
            content: (data) => (
              <div className="space-y-4">
                <div>
                  <Label>Title</Label>
                  <p className="font-medium">{data.title}</p>
                </div>
                {data.description && (
                  <div>
                    <Label>Description</Label>
                    <p className="text-muted-foreground whitespace-pre-line">
                      {data.description}
                    </p>
                  </div>
                )}
                <div>
                  <Label>Link</Label>
                  <p className="text-blue-600 underline">{data.link}</p>
                </div>
              </div>
            ),
            validate: (data) => !!data.title && !!data.link,
          },
        ]}
      />
    </div>
  );
}
