import type { IArticlesAPI, IArticlesAPIArticle } from "@ali/src/types";
import Link from "next/link";
import { Button, Grid, IconCaretInCircle, Section, Text } from "../elements";
import BannerRenderer from "./BannerRenderer";

export default function ArticlesSection({
  articles,
  layout = "flex",
}: {
  articles?: IArticlesAPI["articles"];
  layout?: "flex" | "grid";
}) {
  const style = {
    flex: "tablet:items-start tablet:flex-row tablet:justify-center flex-col justify-center items-center flex-wrap",
    grid: "grid-flow-col justify-center align-items-center",
  };
  return (
    <Section
      as={"section"}
      padding="none"
      display={layout}
      className={` ${style[layout]} py-8 px-2  justify-center items-center  gap-8 w-full `}
    >
      {layout === "flex" ? (
        <>
          {articles?.slice(0, 4).map((item, idx) => {
            return <ArticleItem key={item._id} item={item} idx={idx} />;
          })}
        </>
      ) : (
        <Grid>
          {articles?.map((item, idx) => {
            return <ArticleItem key={item._id} item={item} idx={idx} />;
          })}
        </Grid>
      )}
      {articles !== undefined && layout === "flex" && (
        <div className="w-full flex justify-center items-center">
          <Button
            variant="link"
            href="/blog"
            className=" bg-primary p-2 gap-1 w-fit rounded-md"
          >
            <Text>View All Posts</Text>
            <IconCaretInCircle />
          </Button>
        </div>
      )}
    </Section>
  );
}

export function ArticleItem({
  item,
  idx,
}: {
  item: IArticlesAPIArticle;
  idx: number;
}) {
  return (
    <Link
      href={`blog/${item.slug.current}`}
      key={`${item.image.alt_text}-${idx}`}
      className="flex flex-col gap-4 bg-tertiary/20 p-4 rounded-lg  justify-start items-left px-4 max-w-sm border hover:border-primary hover:border-[1px] "
    >
      <div className="w-full justify-center items-center flex">
        {/* <Image src={item.image.desktop_image.} alt={item.image.alt_text} width={300} height={300} className=" object-cover aspect-square w-full min-h-[400px]" /> */}
        {/* <HeroBannerRenderer heroBanner={item.image} type="small"  /> */}
        <BannerRenderer image={item.image} className="h-[300px] rounded-md " />
        {/* <BannerRenderer image={item.image} /> */}
      </div>
      <div className=" w-fullflex flex-col gap-2   ">
        <Text size="small" fontWeight="light" className="capitalize">
          {item.subcategory}
        </Text>
        <Text size="lead" fontWeight="semibold" className="capitalize">
          {item.title}
        </Text>
        <Text
          size="small"
          fontWeight="light"
          className="leading-snug text-ellipsis"
        >
          {item.description}
        </Text>
      </div>
    </Link>
  );
}
