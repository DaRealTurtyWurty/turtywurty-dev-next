import GalleryImageDisplay from "@/components/turtybot/GalleryImageDisplay";
import CollapsibleTagList from "@/components/turtybot/CollapsibleTagList";

interface FeatureCardProps {
    images?: string[];
    title: string;
    description: string;
    tags?: string[];
    tagType?: TagType;
}

export enum TagType {
    Command = "command",
    Feature = "feature",
}

export default function FeatureCard({images = [], title, description, tags = [], tagType = TagType.Feature}: FeatureCardProps) {
    return <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        {(images && images.length > 0) && <GalleryImageDisplay title={title} images={images}/>}
        <div className="p-6">
            <h3 className="text-2xl font-semibold mb-3">{title}</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">{description}</p>
            <CollapsibleTagList tags={tags} nameOfList={tagType} />
        </div>
    </div>;
}