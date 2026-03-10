import {NextResponse} from "next/server";

type RouteContext = {
    params: Promise<{
        uuid: string;
    }>;
};

export async function GET(_request: Request, context: RouteContext) {
    const {uuid} = await context.params;
    const upstream = await fetch(`https://skinmc.net/api/v1/cape/${uuid}`, {
        headers: {
            Accept: "image/*",
        },
        next: {
            revalidate: 3600,
        },
    });

    if (!upstream.ok) {
        return new NextResponse(null, {
            status: upstream.status,
            statusText: upstream.statusText,
        });
    }

    const contentType = upstream.headers.get("content-type") ?? "image/png";
    const cacheControl = upstream.headers.get("cache-control") ?? "public, max-age=3600";

    return new NextResponse(upstream.body, {
        headers: {
            "Content-Type": contentType,
            "Cache-Control": cacheControl,
        },
    });
}
