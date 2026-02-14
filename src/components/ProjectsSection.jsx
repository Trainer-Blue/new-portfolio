
import React from "react";
import { PORFOLIO_DATA } from "../data/portfolio";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { GlobeIcon, GithubIcon } from "lucide-react";
import Markdown from "react-markdown";

export const ProjectsSection = () => {
  const { projects } = PORFOLIO_DATA;
  return (
    <div className="flex flex-col gap-y-3">
      <h2 className="text-xl font-bold">Projects</h2>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 max-w-[800px] mx-auto">
        {projects.map((project) => (
          <Card
            key={project.title}
            className="flex flex-col overflow-hidden hover:shadow-lg transition-all duration-300 ease-out h-full"
          >
            <a
              href={project.link || "#"}
              className="block cursor-pointer"
            >
              {project.image && (
                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  className="w-full overflow-hidden object-cover object-top aspect-video"
                />
              )}
            </a>
            <CardHeader className="px-2">
              <div className="space-y-1">
                <CardTitle className="mt-1 text-base">{project.title}</CardTitle>
                <div className="prose max-w-full text-pretty font-sans text-xs text-muted-foreground dark:prose-invert">
                  <Markdown>{project.description}</Markdown>
                </div>
              </div>
            </CardHeader>
            <CardContent className="mt-auto flex flex-col px-2">
              {project.techStack && project.techStack.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1">
                  {project.techStack.map((tag) => (
                    <Badge
                      className="px-1 py-0 text-[10px]"
                      variant="secondary"
                      key={tag}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </CardContent>
            <CardFooter className="px-2 pb-2 gap-2">
              {project.link && (
                <a href={project.link} target="_blank" rel="noopener noreferrer">
                  <Badge className="flex gap-2 px-2 py-1 text-[10px]">
                    <GlobeIcon className="size-3" />
                    Website
                  </Badge>
                </a>
              )}
              {project.github && (
                <a href={project.github} target="_blank" rel="noopener noreferrer">
                  <Badge className="flex gap-2 px-2 py-1 text-[10px]">
                    <GithubIcon className="size-3" />
                    Source
                  </Badge>
                </a>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProjectsSection;
