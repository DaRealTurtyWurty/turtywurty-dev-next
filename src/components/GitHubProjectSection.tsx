import Link from "next/link";
import Image from "next/image";
import {Button} from "@/shadcn/components/ui/button";
import {gql, GraphQLClient} from "graphql-request";
import SimpleBrandIcon from "@/components/SimpleBrandIcon";

type GitHubProjectSectionProps = {
    org: string;
    projectNumber: number;
    title?: string;
    description?: string;
    revalidateSeconds?: number;
};

type ProjectItem = {
    title: string;
    number?: number;
    url?: string;
    status: string;
    assignees: {
        login: string;
        avatarUrl: string;
    }[];
};

interface StatusOption {
    name: string;
}

interface ProjectV2Field {
    name: string;
    options?: StatusOption[];
}

interface AssigneeNode {
    login: string;
    avatarUrl: string;
}

interface ProjectItemFieldValue {
    name?: string;
    field?: {
        name: string;
    };
}

interface ProjectItemNode {
    content?: {
        title?: string;
        url?: string;
        number?: number;
        assignees?: {
            nodes: AssigneeNode[];
        };
    };
    fieldValues: {
        nodes: ProjectItemFieldValue[];
    };
}

interface GitHubProjectDataResponse {
    organization?: {
        projectV2?: {
            fields: {
                nodes: ProjectV2Field[];
            };
            items: {
                nodes: ProjectItemNode[];
            };
        };
    };
}

const GITHUB_PROJECT_QUERY = gql`
    query($org: String!, $projectNumber: Int!) {
      organization(login: $org) {
        projectV2(number: $projectNumber) {
          fields(first: 20) {
            nodes {
              ... on ProjectV2SingleSelectField {
                name
                options {
                  name
                }
              }
            }
          }
          items(first: 100) {
            nodes {
              content {
                ... on Issue {
                  title
                  url
                  number
                  assignees(first: 5) {
                    nodes {
                      login
                      avatarUrl
                    }
                  }
                }
                ... on PullRequest {
                  title
                  url
                  number
                  assignees(first: 5) {
                    nodes {
                      login
                      avatarUrl
                    }
                  }
                }
                ... on DraftIssue {
                  title
                  assignees(first: 5) {
                    nodes {
                      login
                      avatarUrl
                    }
                  }
                }
              }
              fieldValues(first: 10) {
                nodes {
                  ... on ProjectV2ItemFieldSingleSelectValue {
                    name
                    field {
                      ... on ProjectV2FieldCommon {
                        name
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
`;

async function fetchProjectData(org: string, projectNumber: number, revalidate: number): Promise<{
    items: ProjectItem[],
    statuses: string[]
}> {
    const token = process.env.GITHUB_TOKEN;
    if (!token || token === "your_token_here") {
        console.warn("GITHUB_TOKEN is not set or is the placeholder. Falling back to empty project items.");
        return {items: [], statuses: []};
    }

    const client = new GraphQLClient("https://api.github.com/graphql", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        next: {revalidate},
    });

    try {
        const data = await client.request<GitHubProjectDataResponse>(GITHUB_PROJECT_QUERY, {
            org,
            projectNumber,
        });

        const project = data.organization?.projectV2;
        if (!project) return {items: [], statuses: []};

        // Find the "Status" field and its options
        const statusField = project.fields.nodes.find((field) => field.name === "Status");
        const statuses = statusField?.options?.map((option) => option.name) ?? [];

        const items = project.items.nodes;
        const mappedItems = items.map((item) => {
            const content = item.content;
            const fieldValues = item.fieldValues.nodes;
            const itemStatus = fieldValues.find((fieldValue) => fieldValue.field?.name === "Status");
            const assignees = content?.assignees?.nodes.map((assignee) => ({
                login: assignee.login,
                avatarUrl: assignee.avatarUrl,
            })) ?? [];

            return {
                title: content?.title ?? "Untitled Item",
                number: content?.number,
                url: content?.url,
                status: itemStatus?.name ?? "No Status",
                assignees,
            };
        });

        return {items: mappedItems, statuses};
    } catch (error) {
        console.error("Error fetching GitHub project data:", error);
        return {items: [], statuses: []};
    }
}

function getStatusColor(status: string): string {
    const s = status.toLowerCase();
    if (s.includes("done") || s.includes("closed") || s.includes("completed")) return "bg-emerald-500";
    if (s.includes("progress") || s.includes("current") || s.includes("doing") || s.includes("active")) return "bg-blue-500";
    if (s.includes("todo") || s.includes("backlog")) return "bg-gray-400";
    if (s.includes("review") || s.includes("verify")) return "bg-amber-500";
    return "bg-gray-400";
}

export default async function GitHubProjectSection({
                                                       org,
                                                       projectNumber,
                                                       title = "Project Roadmap",
                                                       description = "Track our progress, upcoming features, and current tasks on our interactive project board.",
                                                       revalidateSeconds = 3600,
                                                   }: GitHubProjectSectionProps) {
    const projectUrl = `https://github.com/orgs/${org}/projects/${projectNumber}`;
    const {items, statuses} = await fetchProjectData(org, projectNumber, revalidateSeconds);

    const groupedItems: Record<string, ProjectItem[]> = {};

    // Initialize groups with known statuses to preserve order
    if (statuses.length > 0) {
        statuses.forEach(status => groupedItems[status] = []);
    } else {
        ["Todo", "In Progress", "Done"].forEach(status => groupedItems[status] = []);
    }

    if (items.length > 0) {
        items.forEach(item => {
            const status = item.status;
            if (!groupedItems[status]) groupedItems[status] = [];
            groupedItems[status].push(item);
        });
    }

    const columns = Object.keys(groupedItems);

    return (
        <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-center">{title}</h2>
            <div
                className="relative overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-xl group transition-all duration-300 hover:shadow-2xl">
                <div className="flex flex-col">
                    <div
                        className="p-8 lg:p-10 border-b border-gray-100 dark:border-gray-800 bg-gray-50/30 dark:bg-gray-900/30 relative z-10">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                            <div className="flex-1">
                                <div
                                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-100 dark:bg-cyan-900/50 text-cyan-700 dark:text-cyan-300 text-xs font-bold uppercase tracking-wider mb-4 w-fit">
                                    <span className="relative flex h-2 w-2">
                                        <span
                                            className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                                    </span>
                                    Live Roadmap
                                </div>
                                <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl">
                                    {description}
                                </p>
                            </div>
                            <div className="flex flex-wrap gap-3 shrink-0">
                                <Button asChild size="lg"
                                        className="bg-cyan-700 hover:bg-cyan-800 text-white shadow-lg shadow-cyan-900/20">
                                    <Link href={projectUrl} target="_blank" rel="noopener noreferrer">
                                        <span className="inline-flex items-center gap-2">
                                            <SimpleBrandIcon brand="github" className="h-5 w-5"/>
                                            Open Full Board
                                        </span>
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </div>

                    <div className="p-6 overflow-x-auto playlist-scrollbar bg-white dark:bg-gray-950">
                        <div className="flex gap-6 min-w-max h-[450px]">
                            {columns.map((status) => (
                                <div key={status} className="w-80 flex flex-col gap-3">
                                    <div className="flex items-center justify-between px-2 py-1">
                                        <div className="flex items-center gap-2">
                                            <div className={`w-2 h-2 rounded-full ${getStatusColor(status)}`}/>
                                            <h3 className="font-bold text-sm text-gray-700 dark:text-gray-300 uppercase tracking-tight">
                                                {status}
                                            </h3>
                                        </div>
                                        <span
                                            className="text-[10px] bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-gray-500 font-mono">
                                            {groupedItems[status].length}
                                        </span>
                                    </div>

                                    <div
                                        className="flex-1 bg-gray-50/50 dark:bg-gray-900/40 rounded-lg p-3 border border-gray-100 dark:border-gray-800/50 flex flex-col gap-3 overflow-y-auto playlist-scrollbar shadow-inner">
                                        {groupedItems[status].map((item, i) => (
                                            <div
                                                key={i}
                                                className="bg-white dark:bg-gray-800 p-3 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm transition-all hover:border-cyan-500/50 hover:shadow-md cursor-default shrink-0"
                                            >
                                                {item.url ? (
                                                    <Link href={item.url} target="_blank" rel="noopener noreferrer"
                                                          className="hover:underline block group/title">
                                                        <h4 className="text-sm font-medium mb-1 line-clamp-2 leading-snug group-hover/title:text-cyan-600 dark:group-hover/title:text-cyan-400">
                                                            {item.title}
                                                        </h4>
                                                    </Link>
                                                ) : (
                                                    <h4 className="text-sm font-medium mb-1 line-clamp-2 leading-snug">{item.title}</h4>
                                                )}
                                                <div
                                                    className="flex items-center justify-between mt-2 pt-2 border-t border-gray-50 dark:border-gray-700/50">
                                                    <span
                                                        className="text-[10px] text-gray-400 dark:text-gray-500 font-mono">
                                                        {item.number ? `#${item.number}` : `#${100 + i}`}
                                                    </span>
                                                    <div className="flex -space-x-1.5">
                                                        {item.assignees.length > 0 ? (
                                                            item.assignees.map((assignee, idx) => (
                                                                <div key={idx}
                                                                     className="relative w-5 h-5 rounded-full border border-white dark:border-gray-800 overflow-hidden bg-gray-200 dark:bg-gray-700">
                                                                    <Image
                                                                        src={assignee.avatarUrl}
                                                                        alt={assignee.login}
                                                                        fill
                                                                        sizes="20px"
                                                                        className="object-cover"
                                                                    />
                                                                </div>
                                                            ))
                                                        ) : (
                                                            <div
                                                                className="w-5 h-5 rounded-full border border-white dark:border-gray-800 bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
                                                                <svg viewBox="0 0 24 24"
                                                                     className="w-3 h-3 text-gray-300 dark:text-gray-600 fill-current">
                                                                    <path
                                                                        d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                                                                </svg>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                        {groupedItems[status].length === 0 && (
                                            <div
                                                className="flex-1 flex items-center justify-center border-2 border-dashed border-gray-100 dark:border-gray-800/50 rounded-lg">
                                                <span className="text-xs text-gray-400">Empty</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div
                        className="px-6 py-4 bg-gray-50/50 dark:bg-gray-900/50 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between text-[11px] text-gray-500 dark:text-gray-400">
                        <div className="flex items-center gap-2">
                            <span className="relative flex h-1.5 w-1.5">
                                <span
                                    className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                            </span>
                            Syncing live with GitHub Projects
                        </div>
                        <div className="hidden sm:block">
                            Click item titles to view details on GitHub
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
