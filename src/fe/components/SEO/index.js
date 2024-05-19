import React from "react";
import Head from "next/head";

const socialTags = ({
    openGraphType,
    url,
    title,
    description,
    image,
    createdAt,
    updatedAt,
}) => {
    const metaTags = [
        { name: "twitter:card", content: "summary_large_image" },
        {
            name: "twitter:site",
            content:'UETegame',
        },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
        {
            name: "twitter:creator",
            content: '@NhtMinh09692640',
        },
        { name: "twitter:image:src", content: image },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "og:title", content: title },
        { name: "og:type", content: openGraphType },
        { name: "og:url", content: url },
        { name: "og:image", content: image },
        { name: "og:description", content: description },
        {
            name: "og:site_name",
            content: 'UETegame',
        },
        {
            name: "og:published_time",
            content: createdAt || new Date().toISOString(),
        },
        {
            name: "og:modified_time",
            content: updatedAt || new Date().toISOString(),
        },
    ];

    return metaTags;
};

export const SEO = (props) => {
    const { url, title, description, image, schemaType } = props;

    return (
        <Head>
            <title>{title + ' | UETegame'}</title>
            <meta name="description" content={description} />
            <meta itemProp="name" content={title} />
            <meta itemProp="description" content={description} />
            <meta itemProp="image" content={image} />
            {socialTags(props).map(({ name, content }) => {
                return <meta key={name} name={name} content={content} />;
            })}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "http://schema.org",
                        "@type": schemaType,
                        name: title,
                        about: description,
                        url: url,
                    }),
                }}
            />
        </Head>
    );
};

SEO.defaultProps = {
    url: "/",
    openGraphType: "website",
    schemaType: "Article",
    title: 'UETegame',
    description: 'UETegame là một sản phẩm nhắm tới mục đích tự động hóa việc chuyển những file câu hỏi nhàm chán thành những game RPG đầy sự thú vị và hứng thú. Thử UETegame ngay hôm nay.',
    image: 'https://images.unsplash.com/photo-1656312193617-b8d43d0b9535?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=686&q=80',
};


