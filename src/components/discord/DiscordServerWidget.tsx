import "server-only";

import Image from "next/image";
import Link from "next/link";
import {unstable_cache, unstable_noStore as noStore} from "next/cache";
import {REST} from "@discordjs/rest";
import {ChannelType, OverwriteType, PermissionFlagsBits, Routes} from "discord-api-types/v10";
import {Button} from "@/shadcn/components/ui/button";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/shadcn/components/ui/tooltip";
import SimpleBrandIcon from "@/components/SimpleBrandIcon";

type DiscordWidgetMember = {
    id: string;
    username: string;
    status: "online" | "idle" | "dnd" | "offline";
    avatar_url?: string;
};

type DiscordWidgetData = {
    id: string;
    name: string;
    instant_invite?: string;
    presence_count: number;
    members: DiscordWidgetMember[];
};

type DiscordGuildData = {
    id: string;
    name: string;
    icon?: string | null;
    approximate_presence_count?: number;
    approximate_member_count?: number;
};

type DiscordRoleData = {
    id: string;
    permissions: string;
};

type DiscordPermissionOverwriteData = {
    id: string;
    allow: string;
    deny: string;
    type: 0 | 1;
};

type DiscordGuildChannelData = {
    id: string;
    name: string;
    type: number;
    parent_id?: string | null;
    position: number;
    permission_overwrites?: DiscordPermissionOverwriteData[];
};

type PublicChannelEntry = {
    id: string;
    name: string;
    type: number;
    position: number;
    parentId: string | null;
};

type PublicChannelGroup = {
    id: string;
    name: string;
    position: number;
    channels: PublicChannelEntry[];
};

type DiscordServerData = {
    guild: DiscordGuildData | null;
    groups: PublicChannelGroup[];
    ungroupedChannels: PublicChannelEntry[];
};

type DiscordServerWidgetProps = {
    guildId: string;
    fallbackName: string;
    revalidateSeconds?: number;
};

const STATUS_CLASS_NAMES: Record<DiscordWidgetMember["status"], string> = {
    online: "bg-emerald-500",
    idle: "bg-amber-400",
    dnd: "bg-red-500",
    offline: "bg-gray-400",
};

const CHANNEL_TYPE_LABELS: Record<number, string> = {
    [ChannelType.GuildText]: "Text",
    [ChannelType.GuildAnnouncement]: "News",
    [ChannelType.GuildVoice]: "Voice",
    [ChannelType.GuildStageVoice]: "Stage",
    [ChannelType.GuildForum]: "Forum",
    [ChannelType.GuildMedia]: "Media",
};

const ONE_DAY_IN_SECONDS = 60 * 60 * 24;
const DISCORD_INVITE_URL = "https://discord.turtywurty.dev";

function getDiscordRestClient(): REST | null {
    const token = process.env.DISCORD_BOT_TOKEN;
    return token ? new REST({version: "10"}).setToken(token) : null;
}

async function fetchDiscordWidgetData(
    guildId: string,
    revalidateSeconds: number,
): Promise<DiscordWidgetData | null> {
    try {
        const response = await fetch(
            `https://discord.com/api/guilds/${guildId}/widget.json`,
            {
                next: {revalidate: revalidateSeconds},
            }
        );

        if (!response.ok) {
            return null;
        }

        return await response.json() as DiscordWidgetData;
    } catch {
        return null;
    }
}

function formatPresenceCount(value: number): string {
    return `${new Intl.NumberFormat("en-GB").format(value)} online`;
}

function formatMemberCount(value: number): string {
    return `${new Intl.NumberFormat("en-GB").format(value)} members`;
}

function formatServerCountSummary(onlineCount?: number, memberCount?: number): string {
    if (typeof onlineCount === "number" && typeof memberCount === "number") {
        return `${formatPresenceCount(onlineCount)} · ${formatMemberCount(memberCount)}`;
    }

    if (typeof onlineCount === "number") {
        return formatPresenceCount(onlineCount);
    }

    if (typeof memberCount === "number") {
        return formatMemberCount(memberCount);
    }

    return "Server data unavailable";
}

function buildDiscordGuildIconUrl(guildId: string, iconHash: string): string {
    const extension = iconHash.startsWith("a_") ? "gif" : "webp";
    return `https://cdn.discordapp.com/icons/${guildId}/${iconHash}.${extension}?size=128&quality=lossless`;
}

function isDisplayableChannelType(type: number): boolean {
    return type === ChannelType.GuildCategory
        || type === ChannelType.GuildText
        || type === ChannelType.GuildAnnouncement
        || type === ChannelType.GuildVoice
        || type === ChannelType.GuildStageVoice
        || type === ChannelType.GuildForum
        || type === ChannelType.GuildMedia;
}

function applyEveryoneOverwrite(
    basePermissions: bigint,
    channel: DiscordGuildChannelData,
    guildId: string,
): bigint {
    const everyoneOverwrite = channel.permission_overwrites?.find((overwrite) => overwrite.id === guildId && overwrite.type === OverwriteType.Role);

    if (!everyoneOverwrite) {
        return basePermissions;
    }

    const denied = BigInt(everyoneOverwrite.deny);
    const allowed = BigInt(everyoneOverwrite.allow);

    return (basePermissions & ~denied) | allowed;
}

function isPublicChannel(
    channel: DiscordGuildChannelData,
    basePermissions: bigint,
    guildId: string,
): boolean {
    if (!isDisplayableChannelType(channel.type)) {
        return false;
    }

    const permissions = applyEveryoneOverwrite(basePermissions, channel, guildId);
    return (permissions & PermissionFlagsBits.ViewChannel) === PermissionFlagsBits.ViewChannel;
}

function getChannelTypeLabel(type: number): string {
    return CHANNEL_TYPE_LABELS[type] ?? "Channel";
}

function getChannelSortPriority(type: number): number {
    if (type === ChannelType.GuildVoice || type === ChannelType.GuildStageVoice) {
        return 1;
    }

    return 0;
}

function sortChannels<T extends {position: number; name: string}>(left: T, right: T): number {
    if (left.position !== right.position) {
        return left.position - right.position;
    }

    return left.name.localeCompare(right.name, "en-GB");
}

function sortPublicChannelEntries(left: PublicChannelEntry, right: PublicChannelEntry): number {
    const priorityDifference = getChannelSortPriority(left.type) - getChannelSortPriority(right.type);
    if (priorityDifference !== 0) {
        return priorityDifference;
    }

    return sortChannels(left, right);
}

async function fetchDiscordServerData(guildId: string): Promise<DiscordServerData | null> {
    const rest = getDiscordRestClient();
    if (!rest) {
        return null;
    }

    try {
        const [guild, roles, channels] = await Promise.all([
            rest.get(`${Routes.guild(guildId)}?with_counts=true`) as Promise<DiscordGuildData>,
            rest.get(Routes.guildRoles(guildId)) as Promise<DiscordRoleData[]>,
            rest.get(Routes.guildChannels(guildId)) as Promise<DiscordGuildChannelData[]>,
        ]);

        const everyoneRole = roles.find((role) => role.id === guildId);
        if (!everyoneRole) {
            return {
                guild,
                groups: [],
                ungroupedChannels: [],
            };
        }

        const everyonePermissions = BigInt(everyoneRole.permissions);
        const publicCategories = channels
            .filter((channel) => channel.type === ChannelType.GuildCategory && isPublicChannel(channel, everyonePermissions, guildId))
            .sort(sortChannels);
        const publicChannels = channels
            .filter((channel) => channel.type !== ChannelType.GuildCategory && isPublicChannel(channel, everyonePermissions, guildId))
            .map((channel) => ({
                id: channel.id,
                name: channel.name,
                type: channel.type,
                position: channel.position,
                parentId: channel.parent_id ?? null,
            }))
            .sort(sortPublicChannelEntries);
        const publicCategoryIds = new Set(publicCategories.map((category) => category.id));
        const channelsByCategory = new Map<string, PublicChannelEntry[]>();
        const ungroupedChannels: PublicChannelEntry[] = [];

        for (const channel of publicChannels) {
            if (channel.parentId && publicCategoryIds.has(channel.parentId)) {
                const groupChannels = channelsByCategory.get(channel.parentId) ?? [];
                groupChannels.push(channel);
                channelsByCategory.set(channel.parentId, groupChannels);
            } else {
                ungroupedChannels.push(channel);
            }
        }

        const groups = publicCategories
            .map((category) => ({
                id: category.id,
                name: category.name,
                position: category.position,
                channels: (channelsByCategory.get(category.id) ?? []).sort(sortPublicChannelEntries),
            }))
            .filter((group) => group.channels.length > 0);

        return {
            guild,
            groups,
            ungroupedChannels: ungroupedChannels.sort(sortPublicChannelEntries),
        };
    } catch {
        return null;
    }
}

function getCachedDiscordWidgetData(guildId: string, revalidateSeconds: number): Promise<DiscordWidgetData | null> {
    const getCachedData = unstable_cache(
        async () => {
            const data = await fetchDiscordWidgetData(guildId, revalidateSeconds);

            if (!data) {
                throw new Error(`Discord widget data is unavailable for guild "${guildId}".`);
            }

            return data;
        },
        [`discord-widget-data:${guildId}`],
        {revalidate: revalidateSeconds},
    );

    return getCachedData().catch(async () => {
        noStore();
        return fetchDiscordWidgetData(guildId, revalidateSeconds);
    });
}

function getCachedDiscordServerData(guildId: string, revalidateSeconds: number): Promise<DiscordServerData | null> {
    const getCachedData = unstable_cache(
        async () => {
            const data = await fetchDiscordServerData(guildId);

            if (!data) {
                throw new Error(`Discord server data is unavailable for guild "${guildId}".`);
            }

            return data;
        },
        [`discord-server-data:${guildId}`],
        {revalidate: revalidateSeconds},
    );

    return getCachedData().catch(async () => {
        noStore();
        return fetchDiscordServerData(guildId);
    });
}

function renderChannel(channel: PublicChannelEntry) {
    return (
        <div
            key={channel.id}
            className="flex items-center justify-between gap-3 rounded-md bg-gray-50 px-3 py-2 text-sm text-gray-700 dark:bg-gray-900 dark:text-gray-200"
        >
            <span className="min-w-0 truncate"># {channel.name}</span>
            <span className="shrink-0 text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                {getChannelTypeLabel(channel.type)}
            </span>
        </div>
    );
}

export default async function DiscordServerWidget({
    guildId,
    fallbackName,
    revalidateSeconds = ONE_DAY_IN_SECONDS,
}: DiscordServerWidgetProps) {
    const [widgetData, serverData] = await Promise.all([
        getCachedDiscordWidgetData(guildId, revalidateSeconds),
        getCachedDiscordServerData(guildId, revalidateSeconds),
    ]);

    const serverName = serverData?.guild?.name ?? widgetData?.name ?? fallbackName;
    const members = widgetData?.members ?? [];
    const onlineCount = serverData?.guild?.approximate_presence_count ?? widgetData?.presence_count;
    const memberCount = serverData?.guild?.approximate_member_count;
    const serverIconUrl = serverData?.guild?.icon
        ? buildDiscordGuildIconUrl(guildId, serverData.guild.icon)
        : null;
    const groups = serverData?.groups ?? [];
    const ungroupedChannels = serverData?.ungroupedChannels ?? [];
    const hasPublicChannels = groups.length > 0 || ungroupedChannels.length > 0;

    if (!widgetData || !serverData) {
        noStore();
    }

    return (
        <section className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-3">
                        <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full bg-indigo-100 dark:bg-indigo-950/50">
                            {serverIconUrl ? (
                                <Image
                                    src={serverIconUrl}
                                    alt={`${serverName} server icon`}
                                    className="h-full w-full object-cover"
                                    width={48}
                                    height={48}
                                />
                            ) : (
                                <div className="flex h-full w-full items-center justify-center">
                                    <SimpleBrandIcon brand="discord" colored className="h-6 w-6"/>
                                </div>
                            )}
                        </div>
                        <div className="min-w-0">
                            <h3 className="text-2xl font-semibold">
                                {serverName}
                            </h3>
                            <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                                {formatServerCountSummary(onlineCount, memberCount)}
                            </p>
                        </div>
                    </div>
                    <p className="mt-4 text-gray-600 dark:text-gray-300">
                        Community server for my projects, YouTube channel, general discussion, and modding support.
                    </p>
                </div>

                <Button asChild variant="outline">
                    <Link href={DISCORD_INVITE_URL} target="_blank" rel="noopener noreferrer">
                        <SimpleBrandIcon brand="discord" colored/>
                        Join Server
                    </Link>
                </Button>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-[280px_minmax(0,1.8fr)]">
                <div>
                    <div className="flex items-center gap-2">
                        <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                            Channels
                        </p>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <button
                                        type="button"
                                        className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-gray-300 text-[11px] font-semibold text-gray-500 hover:text-gray-700 dark:border-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                                        aria-label="Which channels are shown?"
                                    >
                                        ?
                                    </button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p className="max-w-56 text-sm">
                                        Only channels viewable by everyone are shown here.
                                    </p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>

                    {hasPublicChannels ? (
                        <div className="mt-3 max-h-[28rem] space-y-4 overflow-y-auto playlist-scrollbar pr-1">
                            {ungroupedChannels.length > 0 ? (
                                <div className="space-y-2">
                                    {groups.length > 0 ? (
                                        <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                                            General
                                        </p>
                                    ) : null}
                                    {ungroupedChannels.map(renderChannel)}
                                </div>
                            ) : null}

                            {groups.map((group) => (
                                <div key={group.id} className="space-y-2">
                                    <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                                        {group.name}
                                    </p>
                                    {group.channels.map(renderChannel)}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
                            Public channel data unavailable right now.
                        </p>
                    )}
                </div>

                <div>
                    <div className="flex items-center gap-2">
                        <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                            Online Members
                        </p>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <button
                                        type="button"
                                        className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-gray-300 text-[11px] font-semibold text-gray-500 hover:text-gray-700 dark:border-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                                        aria-label="How is the online member list sourced?"
                                    >
                                        ?
                                    </button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p className="max-w-56 text-sm">
                                        This list comes from Discord&apos;s public widget API and may not include every online member.
                                    </p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                    {members.length > 0 ? (
                        <div className="mt-3 max-h-[28rem] overflow-y-auto playlist-scrollbar pr-1">
                            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 2xl:grid-cols-3">
                                {members.map((member) => (
                                    <article
                                        key={member.id}
                                        className="flex items-center gap-3 rounded-lg bg-gray-50 p-3 dark:bg-gray-900"
                                    >
                                        <div className="relative h-11 w-11 shrink-0">
                                            {member.avatar_url ? (
                                                <Image
                                                    src={member.avatar_url}
                                                    alt={member.username}
                                                    className="h-full w-full rounded-full object-cover"
                                                    width={44}
                                                    height={44}
                                                />
                                            ) : (
                                                <div className="flex h-full w-full items-center justify-center rounded-full bg-gray-200 text-sm font-semibold text-gray-700 dark:bg-gray-700 dark:text-gray-200">
                                                    {member.username.slice(0, 1).toUpperCase()}
                                                </div>
                                            )}
                                            <span
                                                className={`absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-white dark:border-gray-900 ${STATUS_CLASS_NAMES[member.status]}`}
                                            />
                                        </div>
                                        <div className="min-w-0">
                                            <p className="truncate font-medium text-gray-900 dark:text-gray-100">
                                                {member.username}
                                            </p>
                                            <p className="text-sm capitalize text-gray-500 dark:text-gray-400">
                                                {member.status}
                                            </p>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
                            Online member data unavailable right now.
                        </p>
                    )}
                </div>
            </div>
        </section>
    );
}
