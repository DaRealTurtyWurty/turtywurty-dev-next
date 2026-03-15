import Link from "next/link";
import Image from "next/image";
import GitHubStatsGrid from "@/components/GitHubStatsGrid";
import {GitHubIssuesButton, GitHubRepositoryButton} from "@/components/GitHubLinkButtons";

const LANGUAGE_REQUIREMENTS = [
    "No whitespace/indentation requirements.",
    "Braces required for explicit block boundaries.",
    "Semicolons required for statement termination.",
    "Basic standard library functionality.",
    "Familiar C-style language feel for easier onboarding.",
];

const IMPLEMENTATION_OBJECTIVES = [
    "Core components: lexer, parser, analyzer, interpreter/compiler path, runtime support, and STL.",
    "Sample application objective: read current time, append to file, print file contents.",
    "Strong error handling and clear diagnostics for beginner usability.",
];

const RESEARCH_DECISIONS = [
    {
        title: "Grammar and Formalism",
        detail: "Research covered BNF/EBNF approaches, with grammar-first design used to anchor later implementation.",
    },
    {
        title: "Compiled vs Interpreted Trade-off",
        detail: "Performance and flexibility were evaluated; project progressed with an interpreter-first path under time constraints.",
    },
    {
        title: "Tooling Choices",
        detail: "Java + Gradle + JUnit were selected for familiarity, modular project structure, and testability.",
    },
];

const TECHNICAL_FINDINGS = [
    {
        title: "Lexical Analysis",
        points: [
            "Compared regex-driven tokenization with FSM-based approaches (DFA/NFA trade-offs).",
            "Identified token-order sensitivity as a practical lexer pitfall (e.g., overlaps between token classes).",
            "Implemented lexer iteration with explicit EOF handling and comment skipping behavior.",
        ],
    },
    {
        title: "Parsing Strategy",
        points: [
            "Adopted recursive descent parsing for implementation speed and direct grammar mapping.",
            "Researched LL/LR, top-down vs bottom-up parsing, and parser-generator alternatives.",
            "Built AST generation workflow to support downstream semantic and execution phases.",
        ],
    },
    {
        title: "Semantic Analysis",
        points: [
            "Focused on type consistency, scope resolution, and identifier declaration checks.",
            "Explored symbol-table responsibilities (type metadata, scope, downstream compiler data).",
            "Found data-structure constraints in symbol handling that later impacted codegen progress.",
        ],
    },
];

const TOOLING_AND_METHOD = [
    {
        title: "Implementation Stack",
        detail: "Java was selected for familiarity and ecosystem support; Gradle was used for modular sub-project structure and isolated compilation.",
    },
    {
        title: "Testing Approach",
        detail: "JUnit-backed tests were used during development, especially to validate lexer behavior across valid/invalid symbol combinations and edge cases.",
    },
    {
        title: "Sample Program Objective",
        detail: "A measurable objective was defined: read current time, append to a file, then print file content to verify practical language capability.",
    },
];

const RISK_HIGHLIGHTS = [
    "Time pressure and scope drift were treated as high-impact risks; core feature prioritization was used as mitigation.",
    "Parser recursion and lexer edge-case failure were identified as high-likelihood technical risks; test coverage was emphasized early.",
    "Documentation quality was treated as a maintainability risk and addressed continuously during implementation.",
];

const IMPLEMENTATION_TIMELINE = [
    {
        phase: "Lexer",
        summary: "Tokenization implemented as the first complete stage, with tests used to validate valid/invalid symbol combinations.",
    },
    {
        phase: "Parser",
        summary: "Recursive descent parser and AST construction were implemented, heavily informed by compiler engineering resources.",
    },
    {
        phase: "Semantic Analysis",
        summary: "Type/scoping analysis and symbol-table concerns were explored, including design limitations discovered during integration.",
    },
    {
        phase: "LLVM Code Generation Attempt",
        summary: "IR generation work began, but symbol table design and binding complexity made full compilation infeasible within schedule.",
    },
    {
        phase: "Interpreter Delivery",
        summary: "Project finalized with interpreter-focused execution path to ensure a working end-to-end language implementation.",
    },
];

const OUTCOMES = [
    "Successful end-to-end language pipeline from source text to executable behavior via interpreter.",
    "Clear understanding of where architecture decisions (like symbol-table shape) block later compiler stages.",
    "Defined direction for future work: stronger semantic architecture and cleaner compilation backend path.",
];

export default function PepoLangCourseworkPage() {
    return (
        <div className="container mx-auto p-4 max-w-7xl">
            <section className="rounded-xl mb-12 shadow-lg overflow-hidden border border-emerald-200/40 dark:border-emerald-900/50">
                <div className="bg-zinc-900 text-emerald-300 px-4 py-2 text-sm font-mono flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-red-400"/>
                    <span className="h-2.5 w-2.5 rounded-full bg-yellow-400"/>
                    <span className="h-2.5 w-2.5 rounded-full bg-green-400"/>
                    <span className="ml-2 opacity-80">pepolang --report based overview</span>
                </div>
                <div className="bg-gradient-to-br from-emerald-950 via-zinc-900 to-slate-900 p-8 md:p-10 text-white">
                    <p className="text-sm font-semibold uppercase tracking-wide text-emerald-300/80 mb-3">
                        University Coursework
                    </p>
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">PepoLang</h1>
                    <p className="text-emerald-100/90 text-lg md:text-xl max-w-3xl mb-6">
                        A multipurpose language project developed for CI601, intended as a beginner-friendly midpoint
                        between Java-style structure and Python-like accessibility.
                    </p>
                    <div className="mb-6 p-4 rounded-lg bg-black/35 border border-emerald-500/25 font-mono text-sm text-emerald-200/90">
                        <p>&gt; approach: grammar-first language design</p>
                        <p>&gt; stack: Java / Gradle / LLVM exploration</p>
                        <p>&gt; delivery: working interpreter pipeline</p>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        <GitHubRepositoryButton
                            href="https://github.com/DaRealTurtyWurty/PepoLang"
                            className="bg-emerald-500 text-zinc-900 hover:bg-emerald-400"
                        />
                        <GitHubIssuesButton
                            href="https://github.com/DaRealTurtyWurty/PepoLang/issues"
                            className="bg-white/12 text-white hover:bg-white/20"
                        />
                    </div>
                </div>
            </section>

            <GitHubStatsGrid
                owner="DaRealTurtyWurty"
                repo="PepoLang"
                title="Repository Stats"
                enabledStats={["totalCommits", "openIssues", "lastUpdated", "stars", "languages"]}
            />

            <h2 className="text-3xl font-bold mb-6 text-center">Language Requirements</h2>
            <section className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-12">
                <ul className="space-y-3">
                    {LANGUAGE_REQUIREMENTS.map((line, index) => (
                        <li key={line} className="flex items-start gap-3 text-gray-700 dark:text-gray-200">
                            <span className="mt-1 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-slate-600 to-slate-800 dark:from-slate-400 dark:to-slate-600 text-[11px] font-bold text-white shadow-sm">
                                {index + 1}
                            </span>
                            <span>{line}</span>
                        </li>
                    ))}
                </ul>
            </section>

            <h2 className="text-3xl font-bold mb-6 text-center">Project Objectives</h2>
            <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                {IMPLEMENTATION_OBJECTIVES.map((item) => (
                    <article key={item} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                        <p className="text-gray-700 dark:text-gray-200">{item}</p>
                    </article>
                ))}
            </section>

            <h2 className="text-3xl font-bold mb-6 text-center">Research and Design Decisions</h2>
            <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                {RESEARCH_DECISIONS.map((decision) => (
                    <article key={decision.title} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border-l-4 border-l-emerald-500">
                        <h3 className="text-xl font-semibold mb-3">{decision.title}</h3>
                        <p className="text-gray-600 dark:text-gray-300">{decision.detail}</p>
                    </article>
                ))}
            </section>

            <h2 className="text-3xl font-bold mb-6 text-center">Technical Findings from the Report</h2>
            <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                {TECHNICAL_FINDINGS.map((finding) => (
                    <article key={finding.title} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                        <h3 className="text-xl font-semibold mb-3">{finding.title}</h3>
                        <ul className="space-y-2">
                            {finding.points.map((point) => (
                                <li key={point} className="text-gray-600 dark:text-gray-300 flex gap-2">
                                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-emerald-500 shrink-0"/>
                                    <span>{point}</span>
                                </li>
                            ))}
                        </ul>
                    </article>
                ))}
            </section>

            <h2 className="text-3xl font-bold mb-6 text-center">Implementation Timeline</h2>
            <section className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-12">
                <div className="space-y-4">
                    {IMPLEMENTATION_TIMELINE.map((entry) => (
                        <article key={entry.phase} className="rounded-lg border border-gray-200 dark:border-gray-700 p-4">
                            <h3 className="font-semibold mb-1">{entry.phase}</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-300">{entry.summary}</p>
                        </article>
                    ))}
                </div>
            </section>

            <h2 className="text-3xl font-bold mb-6 text-center">Methodology and Validation</h2>
            <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                {TOOLING_AND_METHOD.map((item) => (
                    <article key={item.title} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
                        <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                        <p className="text-gray-600 dark:text-gray-300">{item.detail}</p>
                    </article>
                ))}
            </section>

            <h2 className="text-3xl font-bold mb-6 text-center">Risk Analysis Highlights</h2>
            <section className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-12">
                <ul className="space-y-3">
                    {RISK_HIGHLIGHTS.map((line) => (
                        <li key={line} className="text-gray-700 dark:text-gray-200 flex gap-2">
                            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-emerald-500 shrink-0"/>
                            <span>{line}</span>
                        </li>
                    ))}
                </ul>
            </section>

            <h2 className="text-3xl font-bold mb-6 text-center">Outcome and Next Steps</h2>
            <section className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-12">
                <ul className="space-y-3">
                    {OUTCOMES.map((line) => (
                        <li key={line} className="text-gray-700 dark:text-gray-200">
                            {line}
                        </li>
                    ))}
                </ul>
            </section>

            <section className="mb-12 rounded-xl bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                <div className="p-6 md:p-8">
                    <p className="text-sm font-semibold uppercase tracking-wide text-emerald-600 dark:text-emerald-400">
                        Project Poster
                    </p>
                    <h2 className="text-3xl font-bold mt-2 mb-4">PepoLang Showcase Poster</h2>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 max-w-3xl">
                        The coursework poster captures the project summary, implementation path, and the final interpreter-focused delivery in a single visual artifact.
                    </p>
                    <p className="text-gray-600 dark:text-gray-300">
                        <Link
                            href="/images/PepoLang-Poster.jpg"
                            target="_blank"
                            rel="noreferrer"
                            className="font-medium text-emerald-600 hover:text-emerald-500 dark:text-emerald-400 dark:hover:text-emerald-300"
                        >
                            Open the full-size poster
                        </Link>
                    </p>
                </div>

                <div className="border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/40 p-4 md:p-6">
                    <Link href="/images/PepoLang-Poster.jpg" target="_blank" rel="noreferrer" className="block mx-auto max-w-4xl">
                        <Image
                            src="/images/PepoLang-Poster.jpg"
                            alt="PepoLang project poster"
                            width={1414}
                            height={2000}
                            className="h-auto w-full rounded-lg shadow-md"
                            priority
                        />
                    </Link>
                </div>
            </section>
        </div>
    );
}
