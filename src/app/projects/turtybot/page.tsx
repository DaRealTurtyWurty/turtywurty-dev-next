import FeatureCard, {TagType} from "@/components/turtybot/FeatureCard";
import FooterCTA from "@/components/turtybot/FooterCTA";
import GitHubStatsGrid from "@/components/GitHubStatsGrid";
import GitHubContributorsCarousel from "@/components/GitHubContributorsCarousel";
import HeroSection from "@/components/turtybot/HeroSection";

export default function TurtyBotPage() {
    return <div className="container mx-auto p-4 max-w-7xl">
        <HeroSection/>
        <GitHubStatsGrid
            owner="DaRealTurtyWurty"
            repo="SuperTurtyBot"
            enabledStats={["totalCommits", "openIssues", "lastUpdated", "stars", "languages"]}
        />
        <GitHubContributorsCarousel owner="DaRealTurtyWurty" repo="SuperTurtyBot" />
        <h2 className="text-3xl font-bold mb-8 text-center">Commands</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            <FeatureCard
                images={["/images/turtybot/moderation/ban.png", "/images/turtybot/moderation/kick.png", "/images/turtybot/moderation/purge.png", "/images/turtybot/moderation/warn.png", "/images/turtybot/moderation/unban.png", "/images/turtybot/moderation/timeout.png", "/images/turtybot/moderation/removetimeout.png", "/images/turtybot/moderation/removewarn.png", "/images/turtybot/moderation/purge.png"]}
                title="Moderation"
                description="Keep your server safe and clean with powerful moderation tools."
                tags={["/ban", "/kick", "/purge", "/warn", "/unban", "/timeout", "/removetimeout", "/removewarn", "/purge", "/addroletothread", "/slowmode", "/clearwarns", "/report", "/reports", "/warnings"]}
                tagType={TagType.Command}
            />
            <FeatureCard
                images={["/images/turtybot/fun/love.png", "/images/turtybot/fun/wouldyourather.png", "/images/turtybot/fun/petpetgif.png", "/images/turtybot/fun/eightball.png"]}
                title="Fun"
                description="Entertain your server members with a variety of fun commands."
                tags={["/love", "/wouldyourather", "/petpetgif", "/eightball", "/advice", "/coinflip", "/internetrule", "/reversetext", "/smashorpass", "/upsidedowntext", "/urban"]}
                tagType={TagType.Command}
            />
            <FeatureCard
                images={["/images/turtybot/utility/quote.png", "/images/turtybot/utility/periodictable.png", "/images/turtybot/utility/weather.png", "/images/turtybot/utility/wikipedia.png"]}
                title="Utility"
                description="Helpful commands to manage your server and provide information."
                tags={["/quote", "/periodic-table", "/weather", "/wikipedia", "/curseforge", "/embed", "/fact", "/github", "/highlight", "/latest", "/minecraft", "/poll", "/r6status", "/reminder", "/roblox", "/roles", "/steam", "/strawpoll", "/strawpollresults", "/topic"]}
                tagType={TagType.Command}
            />
            <FeatureCard
                images={["/images/turtybot/levelling/rank.png", "/images/turtybot/levelling/leaderboard.png"]}
                title="Levelling"
                description="Track and reward user activity with an engaging level system."
                tags={["/rank", "/leaderboard"]}
                tagType={TagType.Command}
            />
            <FeatureCard
                images={["/images/turtybot/economy/balance.png", "/images/turtybot/economy/heist.png", "/images/turtybot/economy/work.png", "/images/turtybot/economy/rob.png"]}
                title="Economy"
                description="Create an engaging server economy with currency and rewards."
                tags={["/balance", "/heist", "/work", "/rob", "/crash", "/crime", "/deposit", "/donate", "/loan", "/reward", "/slots", "/withdraw"]}
                tagType={TagType.Command}
            />
            <FeatureCard
                images={["/images/turtybot/minigames/connect4.png", "/images/turtybot/minigames/chess.png", "/images/turtybot/minigames/wordle.png", "/images/turtybot/minigames/hangman.png"]}
                title="Minigames"
                description="Play fun minigames with your friends and server members."
                tags={["/2048", "/checkers", "/chess", "/connect4", "/guess", "/hangman", "/higherlower", "/tictactoe", "/trivia", "/wordle", "/wordsearch"]}
                tagType={TagType.Command}
            />
            <FeatureCard
                images={["/images/turtybot/core/userinfo.png", "/images/turtybot/core/commands.png", "/images/turtybot/core/ping.png", "/images/turtybot/core/uptime.png"]}
                title="Core Commands"
                description="Basic commands to manage your server and provide information."
                tags={["/birthday", "/botinfo", "/commands", "/help", "/notifier", "/opt", "/ping", "/role-selection", "/serverconfig", "/serverinfo", "/suggest", "/tag", "/tokens", "/uptime", "/userconfig", "/userinfo"]}
                tagType={TagType.Command}
            />
        </div>
        <h2 className="text-3xl font-bold mb-8 text-center">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            <FeatureCard
                images={[]}
                title="AI Chatbot"
                description="Engage with your server members using an AI-powered chatbot."
            />
            <FeatureCard
                title="Thread Management"
                description="Automatically create threads in a specified set of channels, and add moderators to the thread."
            />
            <FeatureCard
                title="Starboard"
                description="Create a channel where users can add reactions to messages and when a specified threshold is reached, the message will be sent to the starboard channel."
            />
            <FeatureCard
                title="Collectables"
                description="Collect collectables to try and complete your collection and compete with your friends to see who can collect the rarest."
            />
            <FeatureCard
                title="Logging"
                description="Log all actions performed in the server, ranging from message deletions to channel renames."
            />
            <FeatureCard
                title="Mod Logging"
                description="Log all moderation actions performed in the server, ranging from warnings to bans."
            />
            <FeatureCard
                title="Join & Leave Messages"
                description="Send a message to a specified channel when a user joins and/or leaves the server."
            />
            <FeatureCard
                title="Gist Creation"
                description="React to a message with a specified emoji to create a gist of the message attachment."
            />
            <FeatureCard
                title="Levelling"
                description="Track and reward user activity with an engaging level system."
            />
        </div>
        <FooterCTA/>
    </div>;
}
